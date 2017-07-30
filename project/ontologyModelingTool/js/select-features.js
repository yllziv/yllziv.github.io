

var currentFloor = 2;

var selectFuncAreaWFS = function (levelNumber,roomNumber) {
    document.getElementById("map").innerHTML = "";
    currentFloor = levelNumber;
    $.get("http://202.114.114.34:7080/geoserver/lc/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lc:polygon_r_" + levelNumber + "&maxFeatures=500&outputFormat=application/json", function (data) {
        var styles = {

            'MultiPolygon': [new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: 'black',
                    width: 1
                }),
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 0, 0.1)'
                })
            })]
        };
        var styleFunction = function (feature, resolution) {
            return styles[feature.getGeometry().getType()];
        };

        var raster = new ol.layer.Tile({
            source: new ol.source.TileWMS(/** @type {olx.source.TileWMSOptions} */ ({
                url: 'http://202.114.114.34:7080/geoserver/lc/wms',
                params: {'LAYERS': 'lc:polygon_r_' + levelNumber, 'TILED': true},
                serverType: 'geoserver',
                projection: 'EPSG:4326'
            }))
        });

        funcArea4 = data;

        var vectorSource = new ol.source.GeoJSON(
            /** @type {olx.source.GeoJSONOptions} */ ({
                object: funcArea4,
                projection: "EPSG:3857"//添加该投影后成功转换坐标系
            }));

        var vector = new ol.layer.Vector({
            source: vectorSource,
            style: styleFunction
        });
        var mousePositionControl = new ol.control.MousePosition({
            coordinateFormat: ol.coordinate.createStringXY(4),
            projection: 'EPSG:4326',
            className: 'custom-mouse-position',
            target: document.getElementById('mouse-position'),
            undefinedHTML: '&nbsp;'
        });

        var map = new ol.Map({
            controls: ol.control.defaults({
                attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
                    collapsible: false
                })
            }).extend([mousePositionControl]),
            renderer: exampleNS.getRendererFromQueryString(),
            layers: [raster, vector],
            target: 'map',
            view: new ol.View({
                center: [-14, 8],
                zoom: 3.3
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

        var changeInteraction = function () {
            map.addInteraction(selectMouseMove);
        };

        changeInteraction();

        var displayFeatureInfo = function (pixel) {
            var feature = map.forEachFeatureAtPixel(pixel, function (feature, layer) {
                return feature;
            });
            console.log(feature.get('Name'))
            var funcName = dc_GBK(escape(feature.get('Name')));//使用自定义函数对GBK进行编码，得到“二楼会议室” ;
            var info = document.getElementById('info');
            if (feature) {
                info.innerHTML = feature.getId() + ': ' + feature.get('Floor') + "   " + feature.get('Name').match(/\d+/) + '' + "   " + funcName + "   " + feature.get('X_Descript') + "   " + feature.get('Y_Descript');
            } else {
                info.innerHTML = '&nbsp;';
            }
        }
        $(map.getViewport()).on('mousemove', function (evt) {
            var pixel = map.getEventPixel(evt.originalEvent);
            displayFeatureInfo(pixel);
        });
//
        map.on('click', function (evt) {
            displayFeatureInfo(evt.pixel);
        });

        //从WFS中查询某个空间对象
        function heredoc(fn) {
            return fn.toString().split('\n').slice(1, -1).join('\n') + '\n'
        }

        var wfsFilterStr = heredoc(function () {/*
         FILTER=<Filter><And><PropertyIsEqualTo><PropertyName>Name</PropertyName><Literal>·¿¼ä219</Literal></PropertyIsEqualTo></And></Filter>
         */
        });
        var WFSaddressSelect = "http://202.114.114.34:7080/geoserver/lc/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=lc:polygon_r_"
            + levelNumber + "&maxFeatures=500&outputFormat=application/json"
            + "&FILTER=\<Filter\>\<And\>\<PropertyIsEqualTo\>\<PropertyName\>Name\</PropertyName\>\<Literal\>" + unescape(ec_GBK("房间"+roomNumber)) + "\</Literal\>\</PropertyIsEqualTo\>\</And\>\</Filter\>"
        var styles1 = {

            'MultiPolygon': [new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: 'yellow',
                    width: 3
                }),
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 0, 0.1)'
                })
            })]
        };
        var styleFunction = function (feature, resolution) {
            return styles1[feature.getGeometry().getType()];
        };
        map.removeLayer();
        $.post(WFSaddressSelect, function (data) {
            funcAreaSelect = data;
            var vectorLayerSelect = new ol.layer.Vector({
                source: new ol.source.GeoJSON(/** @type {olx.source.GeoJSONOptions} */ ({
                    object: funcAreaSelect,
                    projection: "EPSG:3857"//添加该投影后成功转换坐标系
                })),
                style: styleFunction
            });
            map.addLayer(vectorLayerSelect);
        })
    })
}

//会议室，卫生间
var selectFuncTypeWFS = function (levelNumber,propertyName,featureType) {
    document.getElementById("map").innerHTML = "";
    currentFloor = levelNumber;
    $.post("http://202.114.114.34:7080/geoserver/lc/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lc:polygon_r_" + levelNumber + "&maxFeatures=500&outputFormat=application/json", function (data) {
        var styles = {

            'MultiPolygon': [new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: 'black',
                    width: 1
                }),
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 0, 0.1)'
                })
            })]
        };
        var styleFunction = function (feature, resolution) {
            return styles[feature.getGeometry().getType()];
        };

        var raster = new ol.layer.Tile({
            source: new ol.source.TileWMS(/** @type {olx.source.TileWMSOptions} */ ({
                url: 'http://202.114.114.34:7080/geoserver/lc/wms',
                params: {'LAYERS': 'lc:polygon_r_' + levelNumber, 'TILED': true},
                serverType: 'geoserver',
                projection: 'EPSG:4326'
            }))
        });

        funcArea4 = data;

        var vectorSource = new ol.source.GeoJSON(
            /** @type {olx.source.GeoJSONOptions} */ ({
                object: funcArea4,
                projection: "EPSG:3857"//添加该投影后成功转换坐标系
            }));

        var vector = new ol.layer.Vector({
            source: vectorSource,
            style: styleFunction
        });
        var mousePositionControl = new ol.control.MousePosition({
            coordinateFormat: ol.coordinate.createStringXY(4),
            projection: 'EPSG:4326',
            className: 'custom-mouse-position',
            target: document.getElementById('mouse-position'),
            undefinedHTML: '&nbsp;'
        });

        var map = new ol.Map({
            controls: ol.control.defaults({
                attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
                    collapsible: false
                })
            }).extend([mousePositionControl]),
            renderer: exampleNS.getRendererFromQueryString(),
            layers: [raster, vector],
            target: 'map',
            view: new ol.View({
                center: [-14, 8],
                zoom: 3.3
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

        var changeInteraction = function () {
            map.addInteraction(selectMouseMove);
        };

        changeInteraction();

        var displayFeatureInfo = function (pixel) {
            var feature = map.forEachFeatureAtPixel(pixel, function (feature, layer) {
                return feature;
            });
            console.log(feature.get('Name'))
            var funcName = dc_GBK(escape(feature.get('Name')));//使用自定义函数对GBK进行编码，得到“二楼会议室” ;            alert()
            var info = document.getElementById('info');
            if (feature) {
                info.innerHTML = feature.getId() + ': ' + feature.get('Floor') + "   " + feature.get('Name').match(/\d+/) + '' + "   " + funcName + "   " + feature.get('X_Descript') + "   " + feature.get('Y_Descript');
            } else {
                info.innerHTML = '&nbsp;';
            }
        }
        $(map.getViewport()).on('mousemove', function (evt) {
            var pixel = map.getEventPixel(evt.originalEvent);
            displayFeatureInfo(pixel);
        });
//
        map.on('click', function (evt) {
            displayFeatureInfo(evt.pixel);
        });

        //从WFS中查询某个空间对象
        function heredoc(fn) {
            return fn.toString().split('\n').slice(1, -1).join('\n') + '\n'
        }

        var wfsFilterStr = heredoc(function () {/*
         FILTER=<Filter><And><PropertyIsEqualTo><PropertyName>Name</PropertyName><Literal>·¿¼ä219</Literal></PropertyIsEqualTo></And></Filter>
         */
        });

        var WFSaddressSelect = "http://202.114.114.34:7080/geoserver/lc/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=lc:polygon_r_"
            + levelNumber + "&maxFeatures=50&outputFormat=application/json"
            + "&FILTER=\<Filter\>\<And\>\<PropertyIsEqualTo\>\<PropertyName\>"+propertyName+"\</PropertyName\>\<Literal\>" + featureType + "\</Literal\>\</PropertyIsEqualTo\>\</And\>\</Filter\>"
        var styles1 = {

            'MultiPolygon': [new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: 'yellow',
                    width: 3
                }),
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 0, 0.1)'
                })
            })]
        };
        var styleFunction = function (feature, resolution) {
            return styles1[feature.getGeometry().getType()];
        };
        map.removeLayer();
        $.post(WFSaddressSelect, function (data) {
            funcAreaSelect = data;
            var vectorLayerSelect = new ol.layer.Vector({
                source: new ol.source.GeoJSON(/** @type {olx.source.GeoJSONOptions} */ ({
                    object: funcAreaSelect,
                    projection: "EPSG:3857"//添加该投影后成功转换坐标系
                })),
                style: styleFunction
            });
            map.addLayer(vectorLayerSelect);
        })
    })
}
//房间
var selectFuncAreaMWS = function (levelNumber) {
    document.getElementById("map").innerHTML = "";
    currentFloor = levelNumber;
    $.post("http://202.114.114.34:7080/geoserver/lc/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lc:polygon_r_" + levelNumber + "&maxFeatures=500&outputFormat=application/json", function (data) {
        var styles = {

            'MultiPolygon': [new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: 'black',
                    width: 1
                }),
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 0, 0.1)'
                })
            })]
        };
        var styleFunction = function (feature, resolution) {
            return styles[feature.getGeometry().getType()];
        };

        var raster = new ol.layer.Tile({
            source: new ol.source.TileWMS(/** @type {olx.source.TileWMSOptions} */ ({
                url: 'http://202.114.114.34:7080/geoserver/lc/wms',
                params: {'LAYERS': 'lc:polygon_r_' + levelNumber, 'TILED': true},
                serverType: 'geoserver',
                projection: 'EPSG:4326'
            }))
        });

        funcArea4 = data;

        var vectorSource = new ol.source.GeoJSON(
            /** @type {olx.source.GeoJSONOptions} */ ({
                object: funcArea4,
                projection: "EPSG:3857"//添加该投影后成功转换坐标系
            }));

        var vector = new ol.layer.Vector({
            source: vectorSource,
            style: styleFunction
        });
        var mousePositionControl = new ol.control.MousePosition({
            coordinateFormat: ol.coordinate.createStringXY(4),
            projection: 'EPSG:4326',
            className: 'custom-mouse-position',
            target: document.getElementById('mouse-position'),
            undefinedHTML: '&nbsp;'
        });

        var map = new ol.Map({
            controls: ol.control.defaults({
                attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
                    collapsible: false
                })
            }).extend([mousePositionControl]),
            renderer: exampleNS.getRendererFromQueryString(),
            layers: [raster, vector],
            target: 'map',
            view: new ol.View({
                center: [-14, 8],
                zoom: 3.3
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

        var changeInteraction = function () {
            map.addInteraction(selectMouseMove);
        };

        changeInteraction();

        var displayFeatureInfo = function (pixel) {
            var feature = map.forEachFeatureAtPixel(pixel, function (feature, layer) {
                return feature;
            });
            console.log(feature.get('Name'))
            var funcName = dc_GBK(escape(feature.get('Name')));//使用自定义函数对GBK进行编码，得到“二楼会议室” ;
            var info = document.getElementById('info');
            if (feature) {
                info.innerHTML = feature.getId() + ': ' + feature.get('Floor') + "   " + feature.get('Name').match(/\d+/) + '' + "   " + funcName + "   " + feature.get('X_Descript') + "   " + feature.get('Y_Descript');
            } else {
                info.innerHTML = '&nbsp;';
            }
        }
        $(map.getViewport()).on('mousemove', function (evt) {
            var pixel = map.getEventPixel(evt.originalEvent);
            displayFeatureInfo(pixel);
        });
//
        map.on('click', function (evt) {
            displayFeatureInfo(evt.pixel);
        });

})
}

var floorOneClick = function () {
    selectFuncAreaMWS('1');
    currentFloor = 1;
}
var floorTwoClick = function () {
    selectFuncAreaMWS('2');
    currentFloor = 2;
}
var floorThreeClick = function () {
    selectFuncAreaMWS('3');
    currentFloor = 3;
}
var floorFourClick = function () {
    selectFuncAreaMWS('4');
    currentFloor = 4;
}

var selectMeetingRoom = function () {
    selectFuncTypeWFS(currentFloor,"Layer",getChaos("会议室"))
}
var selectOfficeRoom = function () {
    selectFuncTypeWFS(currentFloor,"Layer",getChaos("办公室"))
}
var selectToiletRoom = function () {
    selectFuncTypeWFS(currentFloor,"Layer",getChaos("卫生间"))
}
var selectPassage = function () {
    selectFuncTypeWFS(currentFloor,"Layer",getChaos("走廊"))
}
var selectLobby = function () {
    selectFuncTypeWFS(currentFloor,"Layer",getChaos("大厅"))
}
var selectDoor = function () {
    switch(currentFloor){
        case "1":    selectFuncTypeWFS(currentFloor,"Color","7");  break;
        case "2":    selectFuncTypeWFS(currentFloor,"Color","5");  break;
        case "3":    selectFuncTypeWFS(currentFloor,"Color","10");  break;
        case "4":    selectFuncTypeWFS(currentFloor,"Color","10");  break;
    }
}
var selectWindow = function () {
    selectFuncTypeWFS(currentFloor,"Color","4");
}
var selectStairs = function () {
    selectFuncTypeWFS(currentFloor,"Layer","楼梯间")
}
var selectDoorOpen = function () {
    selectFuncTypeWFS(currentFloor,"Layer","门洞")
}

var getChaos = function(a){
    return unescape(ec_GBK(a));
}
