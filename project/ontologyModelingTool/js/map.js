/**
 * Created by yll on 2014/12/18.
 */
/********************************
 * openLayers中显示wms和wfs
 *********************************/
function loadMap() {
    var raster = new ol.layer.Tile({
        source: new ol.source.TileWMS(/** @type {olx.source.TileWMSOptions} */ ({
            url: 'http://202.114.114.34:7080/geoserver/lc/wms',
            params: {'LAYERS': 'lc:funcare_3_relative', 'TILED': true},
            serverType: 'geoserver',
            projection: 'EPSG:4326'
        }))
    });

    var vectorSource = new ol.source.ServerVector({
        format: new ol.format.WFS({
            featureType: "funcare_3_relative", //geoserver Layer Name
            featureNS: "http://www.metarnet.com/gis", // Edit Workspace Namespace URI
            geometryName: "geometry"
        }),
        loader: function(extent, resolution, projection) {
            var url = 'http://202.114.114.34:7080/geoserver/lc/ows?service=WFS&request=GetFeature&version=1.1.0&typename=lc:funcare_3_relative&srsname=EPSG:4326&'+
                'bbox=' + extent.join(',');
            $.ajax({
                url: url
            })
                .done(function(response) {
                    vectorSource.addFeatures(vectorSource.readFeatures(response));
                });
        },
        strategy: ol.loadingstrategy.createTile(new ol.tilegrid.XYZ({
            maxZoom: 19
        }))
    });

    var vector = new ol.layer.Vector({
        source: vectorSource
    });

    var map = new ol.Map({
        layers: [raster,vector],
        target: 'map2D',
        view: new ol.View({
            center: ol.proj.transform([0, 0], 'EPSG:4326', 'EPSG:3857'),
            zoom: 3.5
        })
    });
    var select = null;  // ref to currently selected interaction

// select interaction working on "singleclick"
    var selectSingleClick = new ol.interaction.Select();

// select interaction working on "click"
    var selectClick = new ol.interaction.Select({
        condition: ol.events.condition.click
    });

// select interaction working on "mousemove"
    var selectMouseMove = new ol.interaction.Select({
        condition: ol.events.condition.mouseMove
    });

    var selectElement = document.getElementById('type');

    var changeInteraction = function() {
        if (select !== null) {
            map.removeInteraction(select);
        }
        var value = selectElement.value;
        if (value == 'singleclick') {
            select = selectSingleClick;
        } else if (value == 'click') {
            select = selectClick;
        } else if (value == 'mousemove') {
            select = selectMouseMove;
        } else {
            select = null;
        }
        if (select !== null) {
            map.addInteraction(select);
        }
    };


    /**
     * onchange callback on the select element.
     */
    selectElement.onchange = changeInteraction;
    changeInteraction();
}
/********************************
 * openlayers显示天地图和wms
 *********************************/
//function loadMap() {
//    /***************************************
//     * 显示在OpenLayers中的天地图
//     *************************************/
//    var tidituMap = new OpenLayers.Map("map2D", {});
//    var tdt1 = new OpenLayers.Layer.WMTS({
//        name: "中国底图(矢量)",
//        url: "http://t0.tianditu.com/vec_c/wmts", //中国底图
//        layer: "vec",
//        style: "default",
//        matrixSet: "c",
//        format: "tiles",
//        isBaseLayer: true,
//        numZoomLevels:19
//    });
//    var tdt2 = new OpenLayers.Layer.WMTS({
//        name: "中国底图注记",
//        url: "http://t0.tianditu.com/cva_c/wmts", //中国底图注记
//        layer: "cva",
//        style: "default",
//        matrixSet: "c",
//        format: "tiles",
//        isBaseLayer: false,
//        numZoomLevels:19
//    });
//    var labWMSLayer = new OpenLayers.Layer.WMS(
//        '实验室楼层数据',
//        'http://202.114.114.34:7080/geoserver/lc/wms',
//        {layers:'cq:FuncAre_2', transparent:"true"},
//        {
//            buffer:0
//        }
//    );
//    tidituMap.addLayers([tdt1, tdt2,labWMSLayer]);
//    tidituMap.setCenter(new OpenLayers.LonLat(114.3548172712326,30.52938993630498),18);
//    tidituMap.addControl(new OpenLayers.Control.MousePosition());
//}

/***************************************
 * 在Openlayers单独显示WMS
 *************************************/
//function loadMap() {
//    var map = new OpenLayers.Map("map2D", {});
//    var raster = new OpenLayers.Layer.WMS(
//        'funcare_3_relative',
//        'http://202.114.114.34:7080/geoserver/lc/wms',
//        {layers: 'lc:funcare_3_relative'},
//        {isBaseLayer: true}
//    );
//
//    map.addLayers([raster]);
//    map.setCenter(new OpenLayers.LonLat(-10, 0), 3.4);
//    map.addControl(new OpenLayers.Control.MousePosition());
//
//}
/***************************************
 * 在Openlayers单独显示WFS
 *************************************/
//function loadMap() {
//    var map = new OpenLayers.Map("map2D", {});
//    var labWMSLayer =  new OpenLayers.Layer.Vector( "WFS",{
//        strategies: [new OpenLayers.Strategy.Fixed()],
//        projection: new OpenLayers.Projection("EPSG:4326"),
//        protocol: new OpenLayers.Protocol.WFS({
//            version : "1.0.0",
//            url: "http://localhost:8080/geoserver/tiger/wfs",
//            featureType: "Atiger_roads",
//            featurePrefix : "tiger",
//            featureNS: "http://www.census.gov",
//            srsName : "EPSG:4326"
//        })
//    });
//    map.baseLayer = labWMSLayer;
//    map.addLayers([labWMSLayer]);
//    map.setCenter(new OpenLayers.LonLat(-73.96055, 40.59406),5);
//    map.addControl(new OpenLayers.Control.MousePosition());
//}








//****************************************以下代码通过mapbox来调用地图WMS服务，并通过楼层切换来调用不同楼层的地图******************************
/**
 * Created by yll on 2014/12/18.
 */
/********************************
 * 楼层地图显示
 *********************************/

//var map = L.mapbox.map('map2D');
//var stamenLayer;
//
//function loadMap(floorNum) {
//    map.remove();
//    map = L.mapbox.map('map2D');
//    stamenLayer = L.tileLayer.wms('http://202.114.114.34:7080/geoserver/lc/wms', {
//        maxZoom: 20,
//        version: '1.1.0',	//请求服务的版本
//        SERVICE: "WMS",
//        layers: floorNum,
//        transparent: true,	//输出图像背景是否透明
//        styles: "",			//每个请求图层的用","分隔的描述样式
//        format: 'image/png'	//输出图像的类型
//    }).addTo(map);
//    stamenLayer = L.tileLayer.wms('http://202.114.114.34:7080/geoserver/lc/wms', {
//        maxZoom: 20,
//        version:'1.1.0',	//请求服务的版本
//        SERVICE:"WMS",
//        layers:'lc:polygon_r_2,lc:point_of_floor2',
////        layers:'yll1:FuncAre_2_Fe11',
//        transparent: true,	//输出图像背景是否透明
//        styles:"",			//每个请求图层的用","分隔的描述样式
//        format: 'image/png'	//输出图像的类型
//
//    }).addTo(map);
//
////        map.setView([-21,2.25],3);
//    map.setView([5, -15], 3.8);
//
//}
//
//
///********************************
// * 楼层切换函数
// *********************************/
//function floorOneClick() {
//    loadMap('lc:polygon_r_1');
//}
//function floorTwoClick() {
//    loadMap('lc:polygon_r_2');
//}
//function floorThreeClick() {
//    loadMap('lc:polygon_r_3');
//}
//function floorFourClick() {
//    loadMap('lc:polygon_r_4');
//}
//
