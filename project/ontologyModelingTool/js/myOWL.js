/**
 * Created by yll on 2014/12/15.
 */

var myAlertString = "";//警告框字符串
var insertText1 = "";//提示符
var deleteNodeString = false;
/********************************
 * 本体数据
 *********************************/
function heredoc(fn) {
    return fn.toString().split('\n').slice(1, -1).join('\n') + '\n'
}
//从服务器传递过来本体类字符串
var myStringDate = heredoc(function () {
    /*1Thing
     11Surface
     111BoudarySurface
     1111Ceiling
     1112Wall
     1113Roof
     1114Ground
     1115ClosureSurface
     12ControlDevice
     13People
     131Student
     132Teacher
     14BuildingFurniture
     141Bookcase
     142Chair
     143Sofa
     144Table
     145OfficeDesk
     15BuildingPart
     151Passage
     1511VerticalPassage
     15111Escalator
     15112Elevator
     15113EscapeLadder
     15114Stairway
     1512Corridor
     1513Lobby
     1514MovingWalkway
     1515Ramp
     152Parition
     153Room
     1531ComputerRoom
     1532Laboratory
     1533MeetingRoom
     1534Toilet
     1535Office
     1536FunctionRoom
     16Storey
     17Container
     171Building
     172Passage
     1721VerticalPassage
     17211Escalator
     17212Elevator
     17213EscapeLadder
     17214Stairway
     1722Corridor
     1723Lobby
     1724MovingWalkway
     1725Ramp
     173Room
     1731ComputerRoom
     1732Laboratory
     1733MeetingRoom
     1734Toilet
     1735Office
     1736FunctionRoom
     18PointOfInterest
     181Object
     182Area
     19Portal
     191Opening
     1911Window
     1912Doorway
     19121ExitEntrance
     19122Entrance
     19123Exit
     20BuildingInstallation
     201Pipe
     202Rafter
     203Balcony
     204Radiator
     205Chimney
     206Pillar
     207Lamp
     21Obstacle
     211ConstructionWork
     212Barrier
     2121Window
     2122Wall
     2123Doorway
     21231ExitEntrance
     21232Entrance
     21233Exit
     2124ClosureSurface*/
});

var myNode = new Array();
var myLink = new Array();
var isShowOrAdd = false;
var myAnotherShowNode = new Array();
var getNodeAndLink = new function () {
//将字符串处理之后显示在界面中
    var arrayObj;
    arrayObj = myStringDate.split("\n");
    for (var i = 0; i < arrayObj.length - 1; i++) {
        var valueId = arrayObj[i].replace(/[^0-9]/ig, "");
        //判断数字位数
        var valueSize = 0;
        if (valueId > 0 && valueId < 10) {
            valueSize = 1;
        }
        else if (valueId >= 10 && valueId < 100) {
            valueSize = 2;
        }
        else if (valueId >= 100 && valueId < 1000) {
            valueSize = 3;
        }
        else if (valueId >= 1000 && valueId < 10000) {
            valueSize = 4;
        }
        else if (valueId >= 10000 && valueId < 100000) {
            valueSize = 5;
        }
        else if (valueId >= 100000 && valueId < 1000000) {
            valueSize = 6;
        }
        else if (valueId >= 1000000 && valueId < 10000000) {
            valueSize = 7;
        }
        else if (valueId >= 10000000 && valueId < 100000000) {
            valueSize = 8;
        }
        //求父节点值
        var valuePId = parseInt(valueId / 10);
        //求本文内容
        var valueText = arrayObj[i].replace(/[^A-z]/ig, "");
        arrayObj[i] = valueText;//提取出纯文本

        if (parseInt(valuePId / 10) == 0 && valuePId > 1) {
            valuePId = 1;
        }

        /********************************
         *设置本体图动态距离
         *********************************/
        var getX = function () {
            var x = document.getElementById("ontologyPanel").clientWidth * 2 + (.5 - Math.random()) * 2000;
            return x;
        }

        var getY = function () {
            var myDiv = document.getElementById("ontologyPanel");
            var y = (myDiv.clientHeight - 20) * valueSize /3 - 150;
            return y;
        }
        //获取节点信息，成功
        var node = {category: valueSize%3, draggable: true, symbolSize: 15, name: valueText, value: valueSize, id: valueId, depth: valueSize, initial: [getX(), getY()], fixY: true};
//        var node = {category: valueSize, draggable: false, symbolSize: (15 / valueSize + 8), name: valueText, value: valueSize, id: valueId, depth: valueSize, initial: [getX(), getY()], fixY: true};
        myNode.push(node);

        // 获取节点连接信息
        if (parseInt(valueId) > 10) {
            //获取该节点的父节点
            var MyarrayObj;
            MyarrayObj = myStringDate.split("\n");
            var ParentNodeText = "";
            for (var j = 0; j < MyarrayObj.length - 1; j++) {
                var MyvalueId = MyarrayObj[j].replace(/[^0-9]/ig, "");
                if (parseInt(valueId.toString().substr(0, 1)) == 2) {//解决编号是20，201，202、21，211，212的问题,只支持第二层节点从11到99的情况
                    if (valueId.toString().length == 2) {//当编号为20，21，22……时，父节点文本为Thing
                        ParentNodeText = "Thing";
                    }
                    if ((parseInt(MyvalueId) == parseInt(valueId / 10)) && (valueId.toString().length != 2) && (valueId.toString().length != 1)) {//当编号为201，201，202，211，212……时
                        ParentNodeText = MyarrayObj[j].replace(/[^A-z]/ig, "");

                    }
                }
                else if (parseInt(MyvalueId) == parseInt(valueId / 10)) {
                    ParentNodeText = MyarrayObj[j].replace(/[^A-z]/ig, "");
                }

            }
            myLink.push({source: ParentNodeText, target: node.name, weight: 1});
        }

    }
    for(var q=0;q<myNode.length;q++){
        myAnotherShowNode.push(myNode[q]);
    }
};


/********************************
 * 本体添加事件函数
 *********************************/
var addNode = function () {
    isShowOrAdd = true;
    var textInput = document.getElementById("addNodeText").value;
    var arrayObj;
    var valueText = "";
    arrayObj = myStringDate.split("\n");
    for (var i = 0; i < arrayObj.length - 1; i++) {

        //求本文内容
        valueText = arrayObj[i].replace(/[^A-z]/ig, "");
        if (textInput == valueText) {
            myAlertString = "Already Exist!";
            document.getElementById("alertButton").click();//模拟js触发按钮,弹出警告框
            return;
        }
    }
    if (textInput == "") {
        myAlertString = "Please input Ontology!";
        document.getElementById("alertButton").click();//模拟js触发按钮,弹出警告框
        ontologyMap(6);//更新地图
    }
    else {
        var node = {category: 2, draggable: true, symbolSize: 15, name: textInput, value: 322, id: 3, depth: 0, initial: [44, 22], fixY: true};
        myNode.push(node);
        ontologyMap(6);//更新地图
        document.getElementById("owlTextArray").innerHTML = "";//更新提示框
        insertText1 = "";
        insertText1 += " <option value=\"" + textInput + "\">";//更新提示框
        insertOWL();
    }

}


var myCategories = [
    {
        name: 'Root'
    },
    {
        name: 'NotLeafNode'
    },
    {
        name: 'LeafNode'
    }
];
var myData = ['Root', 'NotLeafNode', 'LeafNode'];

/********************************
 * 本体只显示该节点上下级相关联节点
 *********************************/
var showNode = function () {
    var myShowNode = myNode;
    isShowOrAdd = false;
    var textInput = document.getElementById("addNodeText").value;
    var arrayObj;
    var valueText = "";
    arrayObj = myStringDate.split("\n");
    var parentNodeArray = new Array();//该节点的父节点，从Mylink中获得

    for(var p=0;p<myLink.length;p++){
        if(myLink[p].target.toString() == textInput.toString()){
            parentNodeArray.push(myLink[p].source.toString());
        }
    }

    for (var i = 0; i < arrayObj.length - 1; i++) {
        //求本文内容
        valueText = arrayObj[i].replace(/[^A-z]/ig, "");
        if (textInput == valueText) {//存在该本体
            var inputText = document.getElementById("addNodeText").value;
            //求出不是与该节点有关系的节点，从myNode中删除
            var thisNodeID = 999;//求出该节点的ID
            var thisValueSize = 999;//求出该节点ID位数
            var myNewNode = new Array();
            for (var i = 0; i < myShowNode.length; i++) {
                if (inputText == myShowNode[i].name) {
                    thisNodeID = myShowNode[i].id;
                    thisValueSize = myShowNode[i].value;
                }
            }
            for (var j = 0; j < myShowNode.length; j++) {//只剩下层节点，所有的上层节点和下层节
                if (( myShowNode[j].value - thisValueSize == 1) || (myShowNode[j].value - thisValueSize == -1) || (myShowNode[j].id == thisNodeID)) {
                    myNewNode.push(myShowNode[j]);
                }
            }
            myShowNode.splice(0, myShowNode.length);
            for (var k = 0; k < myNewNode.length; k++) {
                myShowNode.push(myNewNode[k])
            }
            var myNextNode = new Array();//处理下层节点
            for (var j = 0; j < myShowNode.length; j++) {//只剩下该节点，该节点的下层节点，所有上层节点
                if ((( parseInt(myShowNode[j].id / 10) == thisNodeID) || (parseInt(thisNodeID / 10) == myShowNode[j].id) ) || (myShowNode[j].id == thisNodeID)) {
                    //只剩下该节点，所有的上层节点和下层节点
                    myNextNode.push(myShowNode[j]);
                }
            }
            myShowNode.splice(0, myShowNode.length);
            for (var k = 0; k < myNextNode.length; k++) {
                myShowNode.push(myNextNode[k])
            }

            var myDiv = document.getElementById("ontologyPanel");
            for (var j = 0; j < myShowNode.length; j++) {//设置样式：主要更改初始位置
                if (myShowNode[j].id > thisNodeID) {//设置下层节点
                    myShowNode[j].initial[0] = myDiv.clientWidth * 2 + (.5 - Math.random()) * 200;
                    myShowNode[j].initial[1] = myDiv.clientHeight * 3 / 4;
                }
                if (myShowNode[j].id < thisNodeID) {//设置上层节点
                    myShowNode[j].initial[0] = myDiv.clientWidth / 2;
                    myShowNode[j].initial[1] = myDiv.clientHeight / 4;
                }
                if (myShowNode[j].id == thisNodeID) {//设置下层节点
                    myShowNode[j].initial[0] = myDiv.clientWidth / 2;
                    myShowNode[j].initial[1] = myDiv.clientHeight / 2;
                }
            }

            for(var i=0;i<parentNodeArray.length;i++) {
                for (var j = 0; j < myAnotherShowNode.length; j++) {
                    if (myAnotherShowNode[j].name.toString() == parentNodeArray[i].toString()) {
                        myShowNode.push(myAnotherShowNode[j]);
                    }
                }
            }
            myNode = myShowNode;
            ontologyMap(2);//更新地图
            return;
        }
    }

    if (textInput == "") {
        myNode.splice(0, myNode.length);
        for(var q=0;q<myAnotherShowNode.length;q++){
            myNode.push(myAnotherShowNode[q]);
        }
        ontologyMap(6);//更新地图
    }
    else {
        myAlertString = "Not Exist!";
        document.getElementById("alertButton").click();//模拟js触发按钮,弹出警告框
        ontologyMap(6);//更新地图
    }
}
/********************************
 * 删除节点
 *********************************/
var deleteNode = function () {
    deleteNodeString = true;
    //在ontologyMap()函数中进行事件处理
}
/********************************
 * 本体输入框自动提示
 *********************************/
var insertOWL = function () {
    var arrayObj;
    arrayObj = myStringDate.split("\n");
    for (var i = 0; i < arrayObj.length - 1; i++) {
        //求本文内容
        var valueText = arrayObj[i].replace(/[^A-z]/ig, "");
        insertText1 += " <option value=\"" + valueText + "\">";
    }
    document.getElementById("owlTextArray").innerHTML = document.getElementById("owlTextArray").innerHTML + insertText1;
}
/********************************
 * 本体函数
 *********************************/
var addNodeIndex = "null"; //增加新节点，连接到旧节点的计数器
var ontologyMap = function (Myscaling) {
    // 路径配置
    var myScaling = Myscaling;
    require.config({
        paths: {
            echarts: "js/dist/"
        }
    });
    // 使用
    require(
        [
            'echarts',
            'echarts/chart/force'
        ],

        function (ec) {
            var myChart = ec.init(document.getElementById('ontologyPanel'));
            var option = {
                title: {
                    text: 'Ontology Relation Map',
                    subtext: 'Data From Protege',
                    x: 'right',
                    y: 'bottom'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} : {b}'
                },

                toolbox: {
                    show: true,
                    feature: {
                    }
                },
                legend: {
                    x: 'left',
                    data: myData
                },
                series: [
                    {
                        type: 'force',
                        name: "Ontology: ",
                        ribbonType: false,
                        categories: myCategories,
                        itemStyle: {
                            normal: {
                                label : {
                                    show: true,
                                    textStyle : {
                                        fontSize : '5',
                                        color:"green"
                                    },
                                    position:'bottom'
                                },
                                nodeStyle: {
                                    brushType: 'both',
                                    borderColor: 'rgba(255,215,0,0.4)',
                                    borderWidth: 1
                                },
                                linkStyle: {
                                    type: 'line'
                                }
                            },
                            emphasis: {
                                label: {
                                    show: true
                                    // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
                                },
                                nodeStyle: {
                                    //r: 30
                                },
                                linkStyle: {}
                            }
                        },

                        symbol: "circle",
                        linkSymbol: "triangle",
                        minRadius: 15,
                        maxRadius: 25,
                        large: false,
                        gravity: 1,
                        scaling: myScaling,
                        roam: true,
                        nodes: myNode,
                        links: myLink
                    }
                ]
            };
            /********************************
             * 点击节点事件
             *********************************/
            var ecConfig = require('echarts/config');

            function eConsole(param) {
                if (isShowOrAdd) {
                    //获取节点名称
                    var myNodeText = "";
                    myNodeText = myNode[param.dataIndex].name;
                    if (typeof param.seriesIndex != 'undefined') {

                        if (param.type == 'hover') {
                            document.getElementById('hover-console').innerHTML = 'You Are ' + param.type + ' In <b>' + myNodeText + '</b> Node';
                        }
                        else {
                            document.getElementById('console').innerHTML = 'You Are ' + param.type + ' On <b>' + myNodeText + '</b> Node';
                        }
                    } else {
                        //节点未定义
                    }

                    var textInput = document.getElementById("addNodeText").value;
                    if ((param.type == 'click') && (textInput == myNodeText)) {
                        addNodeIndex = "clickOnNewNode";
                    }
                    if ((param.type == 'click') && (textInput != myNodeText) && ( addNodeIndex == "clickOnNewNode")) {
                        myLink.push({source: myNodeText, target: textInput, weight: 1});
                        addNodeIndex = "null";
                        //更改新增节点样式
                        myNode[myNode.length - 1].category = myNode[param.dataIndex].category + 1;//待改
                        myNode[myNode.length - 1].symbolSize = 15;
                        myNode[myNode.length - 1].value = myNode[param.dataIndex].value + 1;
                        myNode[myNode.length - 1].id = myNode[param.dataIndex].id * 10 + 1;
                        myNode[myNode.length - 1].depth = myNode[param.dataIndex].depth + 1;
                        var myDiv = document.getElementById("ontologyPanel");
                        myNode[myNode.length - 1].initial[0] = myDiv.clientWidth * 2 + (.5 - Math.random()) * 200;
                        ;

                        myNode[myNode.length - 1].initial[1] = (myDiv.clientHeight - 20) * (myNode[param.dataIndex].value + 1) / (2 + 1) + 20;
                        ;
                        ontologyMap(6);//更新地图

                    }
                    /********************************
                     * 删除节点
                     *********************************/
                    if (param.type == 'click' && deleteNodeString) {
                        for (var i = 0; i < myNode.length; i++) {
                            if (myNode[i].name == myNodeText) {
                                myNode = myNode.slice(0, i).concat(myNode.slice(i + 1, myNode.length))
                                deleteNodeString = false;
                            }
                        }
                        ontologyMap(6);//更新地图
                    }
                }
            }

//添加鼠标事件
            myChart.on(ecConfig.EVENT.CLICK, eConsole);
//            myChart.on(ecConfig.EVENT.DBLCLICK, eConsole);
            myChart.on(ecConfig.EVENT.HOVER, eConsole);
// 为echarts对象加载数据
            myChart.setOption(option);
        })
    ;

}

var alertTest = function () {//弹出警告窗口
    document.getElementById("alertText").innerHTML = myAlertString;
}
