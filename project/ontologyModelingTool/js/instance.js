/**
 * Created by yll on 2014/12/21.
 */
/********************************
 * 本体数据
 *********************************/
var myInstance = new Array();
var insertText = "";

function heredoc(fn) {
    return fn.toString().split('\n').slice(1, -1).join('\n') + '\n'
}
//从服务器传递过来本体类字符串
var myInstanceDate = heredoc(function () {
/*
 杨龙龙
 黄珺
 327
 三楼
 朱欣焰
 一楼
 三楼
 实验室
 204
 205
 呙维
 李灿
 蒋腾
 325
 四楼
 */
});
/********************************
 * 从服务端获取实例
 *********************************/
var getInstance = function () {
    arrayObj = myInstanceDate.split("\n");
    for (var i = 1; i < arrayObj.length - 2; i++) {
        //求本文内容
        valueText = arrayObj[i].replace("\n", "");//删除字符串空格和换行符
        valueText = valueText.replace("\r", "");//删除字符串空格和换行符
        valueText = valueText.replace(" ", "");//删除字符串空格和换行符
        myInstance.push(valueText);
    }
}
/********************************
 * 实例添加事件函数
 *********************************/
var addInstance = function () {
    var textInput = document.getElementById("instanceInputText").value;
    var arrayObj;
    var valueText = "";
    arrayObj = myInstanceDate.split("\n");
    for (var i = 1; i < arrayObj.length - 2; i++) {
        //求本文内容
        valueText= arrayObj[i].replace("\n", "");//删除字符串空格和换行符
        valueText= valueText.replace("\r", "");//删除字符串空格和换行符
        valueText= valueText.replace(" ", "");//删除字符串空格和换行符
        if(textInput == valueText){
            myAlertString =  "Already Exist!";
            document.getElementById("alertButton").click();//模拟js触发按钮,弹出警告框
            return;
        }
    }
    if(textInput == ""){
        myAlertString = "Please input Instance!";
        document.getElementById("alertButton").click();//模拟js触发按钮,弹出警告框
    }
    else{
        myInstance.unshift(textInput);
        drawInstancePanel_add();//更新实例列表
        document.getElementById("instanceTextArray").innerHTML = "";//更新提示框
        insertText = "";
        insertText += " <option value=\"" + textInput + "\">";//更新提示框
    }
}

/********************************
 * 绘制实例面板
 *********************************/
var drawInstancePanel_init = function () {

    var insertInstanceText = "";
    getInstance();
    for (var i = 0; i < myInstance.length; i++) {
        insertInstanceText += (" <li class='list-group-item ' onmouseover='onmousemoveClick(this)' onmouseout='onmouseoutClick(this)'>" +
            " <div class='row'><div class='col-xs-12' onclick='onclickInstanceList(this)'>" + myInstance[i].toString() +
            "</div><div><button class='Circlebtn' data-toggle='modal' data-target='#myModal' style='display: none'>edit" +
            "</button></div></div></li>");
    }
    document.getElementById("instanceList").innerHTML = document.getElementById("instanceList").innerHTML+insertInstanceText;
    onmouseoutClick();
}
var drawInstancePanel_add = function () {
    document.getElementById("instanceList").innerHTML ="";
    var insertInstanceText = "";
    for (var i = 0; i < myInstance.length; i++) {
        insertInstanceText += (" <li class='list-group-item '  onmouseover='onmousemoveClick(this)' onmouseout='onmouseoutClick(this)'>" +
            " <div class='row'><div class='col-xs-12' onclick='onclickInstanceList(this)'>"+myInstance[i].toString()+
            "</div><div><button class='Circlebtn' data-toggle='modal' data-target='#myModal' style='display: none'>edit" +
            "</button></div></div></li>");
    }
    document.getElementById("instanceList").innerHTML = document.getElementById("instanceList").innerHTML+insertInstanceText;
}

/********************************
 * 实例输入框自动提示
 *********************************/
var insertInstance = function () {
    var arrayObj;
    arrayObj = myInstanceDate.split("\n");
    for (var i = 1; i < arrayObj.length - 2; i++) {
        //求本文内容
        valueText= arrayObj[i].replace("\n", "");//删除字符串空格和换行符
        valueText= valueText.replace("\r", "");//删除字符串空格和换行符
        valueText= valueText.replace(" ", "");//删除字符串空格和换行符
        insertText += " <option value=\"" + valueText + "\">";
    }
    document.getElementById("instanceTextArray").innerHTML = document.getElementById("instanceTextArray").innerHTML + insertText;
}
/********************************
 * 弹出警告窗口
 *********************************/
var alertTest = function () {
    document.getElementById("alertText").innerHTML = myAlertString;
}
/********************************
 * 鼠标进入<li>事件和移除事件
 *********************************/

var onmousemoveClick = function (x) {//鼠标进入<li>事件，显示Edit图标
    var liNameNode = x.getElementsByTagName("button");
    for(var i=0; i<liNameNode.length; i++){
        liNameNode[i].style.display = "inline";
    }
    x.getElementsByTagName("div")[1].setAttribute("class","col-xs-8");
    x.getElementsByTagName("div")[2].setAttribute("class","col-xs-4");
}
var onmouseoutClick = function (x) {//鼠标离开<li>事件，隐藏Edit图标
    var liNameNode = x.getElementsByTagName("button");
    for(var i=0; i<liNameNode.length; i++){
        liNameNode[i].style.display = "none";
    }
    x.getElementsByTagName("div")[1].setAttribute("class","col-xs-12");
    x.getElementsByTagName("div")[2].setAttribute("class","");
}
/********************************
 * 鼠标点击<li>事件
 *********************************/
var onclickInstanceList = function (x) {
    var parent = x.parentNode.parentNode;
    parent.style.backgroundColor = "#428bca";
    parent.style.color = "#fff"

}
/********************************
 * 鼠标点击Query查询实例事件
 *********************************/
var queryInstance = function () {
    connect();
    document.getElementById("a3").click();
}

function heredoc(fn) {
    return fn.toString().split('\n').slice(1,-1).join('\n') + '\n'
}
//从服务器传递过来本体类字符串


var transData = heredoc(function(){/*
     PREFIX IndoorOWL: <http://www.semanticweb.org/dell327/ontologies/2014/10/Ontology1415628375607.owl#> Select ?Room_X Where {?Room_327 IndoorOWL:Name "204" .?Room_X a IndoorOWL:Office .FILTER (Opposite(?Room_327,?Room_X)) .}
*/});
transData = escape(transData)
//    调用方法

/********************************
 * JavaScript向Webservice传送数据并且返回结果
 *********************************/
var data;
function connect(){
    var  queryContent = document.getElementById("queryTextarea").value;//从Query面板中得到输入的查询语句
    queryContent = queryContent.replace(/\n/g," ");
    queryContent = queryContent.replace(/\r/g,"");
    queryContent = queryContent.replace(/\s+/g, ' ');//将换行符替换为空格

    data = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:q0="http://test.lc.lorg" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><soapenv:Body><q0:panMapSearch><q0:str>'+
        encodeURIComponent(queryContent)//对输入的字符进行编码
        +'</q0:str></q0:panMapSearch></soapenv:Body></soapenv:Envelope>'
//    data = ' <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:q0="http://WStest.lc.com" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"> <soapenv:Body><q0:hello><q0:userName>lican</q0:userName></q0:hello></soapenv:Body></soapenv:Envelope>'
    xmlHttpRequest = createXmlHttpRequest();
    xmlHttpRequest.onreadystatechange = zswFun;

    var url = "http://192.168.2.199:8081/PanMapSearch/services/GrammarParser"
    xmlHttpRequest.open("POST",url,true);
}

function createXmlHttpRequest(){
    var xhr;
    if(window.ActiveXObject){ //如果是IE浏览器
        var activexName=["MSXML2.XMLHTTP","Microsoft.XMLHTTP"];
        for(var i=0;i<activexName.length;i++) {
            try {
                xhr = new ActiveXObject(activexName[i]);
                break;
            } catch (e) {
            }
        }
    }else if(window.XMLHttpRequest){ //非IE浏览器
        xhr = new XMLHttpRequest();
    }
    return xhr;
}


function zswFun(){
//    alert(xmlHttpRequest.readyState+","+xmlHttpRequest.status)
    if(xmlHttpRequest.readyState==1) {
//        xmlHttpRequest.setRequestHeader("Content-type","text/xml")
        xmlHttpRequest.setRequestHeader("Content-type","text/json;charset=GBK")
        xmlHttpRequest.send(data)
    }
    if(xmlHttpRequest.readyState==4){
        if(xmlHttpRequest.status==200){
//            var returndata = xmlHttpRequest.responseXML;
            var dom = xmlHttpRequest.responseXML;
            var returnEle = dom.getElementsByTagName("return")[0];
            var returndata = returnEle.firstChild.data;//返回<return>中的结果
            alert(returndata)
            var shortResult = returndata.slice(returndata.indexOf("{"),returndata.lastIndexOf("}")+1);
            matchMap(JSON.parse(shortResult));
        }
    }
}

/********************************
 * 处理从Webservice返回的结果
 *********************************/
function matchMap(jsonFromServer) {
//    selectFuncAreaWFS('2',jsonFromServer);
    //将json中类型的名称存储在数组jsonNameArray中
    var jsonNameArray = new Array();
    for (var i in jsonFromServer) {
        jsonNameArray.push(i.toString());
    }
    for (var j in jsonNameArray) {
        switch (jsonNameArray[j]) {
            case "Teacher":
                processTeacher(jsonFromServer);
                break;
            case "Office" :
                processOffice(jsonFromServer);
                break;
            case "Student" :
                processStudent(jsonFromServer);
                break;
            case "ComputerRoom" :
                processComputerRoom(jsonFromServer);
                break;
            default :
                alert("No match is found: "+jsonNameArray[j]);
                break;
        }
    }
}
function processTeacher(jsonFromServer) {
//    alert("process teacher")
    document.getElementById("PeopleObj").innerHTML ="";
    for (var i in jsonFromServer.Teacher) {//处理老师数组中的每个老师元素
       var teacherOneArray = new Array();
        for (var j in jsonFromServer.Teacher[i]) {
            var teacherOneObject = new Object();
            teacherOneObject.text = jsonFromServer.Teacher[i][j];
            teacherOneObject.attrName = j;
            teacherOneObject.count = "300";
            if(j == "Name"){teacherOneObject.count = "500";}
            teacherOneArray.push(teacherOneObject);
        }
        teacherAllArray.push(teacherOneArray);
        var insertInstanceText = "";
        var tempTeacherName = jsonFromServer.Teacher[i].Name.toString();
        insertInstanceText += (" <li class='list-group-item '><input type='button' class='btn btn-link'onclick=\"showPeopleObj('"+i+"','teacher')\" value='"+jsonFromServer.Teacher[i].Name+"'> </li>");
//        alert(insertInstanceText); value='"+jsonFromServer.Teacher[i].Name+"'> </li>");
//        alert(insertInstanceText);
        document.getElementById("PeopleObj").innerHTML += insertInstanceText;
    }
}
function processStudent(jsonFromServer) {
//    alert("process Student")
    document.getElementById("PeopleObj").innerHTML ="";
    for (var i in jsonFromServer.Student) {
        var studentOneArray = new Array();
        for (var j in jsonFromServer.Student[i]) {
            var studentOneObject = new Object();
            studentOneObject.text = jsonFromServer.Student[i][j];
            studentOneObject.attrName = j;
            studentOneObject.count = "300";
            if(j == "Name"){studentOneObject.count = "500";}
            studentOneArray.push(studentOneObject);
        }
        studentAllArray.push(studentOneArray);
//        alert(studentAllArray[2][4].attrName)
//        alert(jsonFromServer.Student[i].Name);
        var insertInstanceText = "";
        var tempStudentName = jsonFromServer.Student[i].Name.toString();
        insertInstanceText += (" <li class='list-group-item '><input type='button' class='btn btn-link' onclick=\"showPeopleObj('"+i+"','student')\" value='"+jsonFromServer.Student[i].Name+"'> </li>");
        document.getElementById("PeopleObj").innerHTML += insertInstanceText;
    }

}

function processOffice(jsonFromServer) {
//    alert("process office")
    document.getElementById("SpatialObj").innerHTML ="";
    for (var i in jsonFromServer.Office) {
        window.FuncRoom = jsonFromServer.Office[i].Name
//        alert(jsonFromServer.Office[i].Name)
        var insertInstanceText = "";
        insertInstanceText += (" <li class='list-group-item'><input type='button' class='btn btn-link' onclick=\"selectFuncAreaWFS("+jsonFromServer.Office[i].LevelNo+","+jsonFromServer.Office[i].Name+")\" value='"+jsonFromServer.Office[i].Name+"'> </li>");
        document.getElementById("SpatialObj").innerHTML += insertInstanceText;
//        selectFuncAreaWFS(jsonFromServer.Office[i].LevelNo,jsonFromServer.Office[i].Name);
    }
}

function processComputerRoom(jsonFromServer) {
//    alert("process ComputerRoom")
    document.getElementById("SpatialObj").innerHTML ="";
    for (var i in jsonFromServer.ComputerRoom) {
        window.FuncRoom = jsonFromServer.ComputerRoom[i].Name
//        alert(jsonFromServer.ComputerRoom[i].Name)
        var insertInstanceText = "";
        insertInstanceText += (" <li class='list-group-item '><input type='button' class='btn btn-link' onclick=\"selectFuncAreaWFS("+jsonFromServer.ComputerRoom[i].LevelNo+","+jsonFromServer.ComputerRoom[i].Name+")\" value='"+jsonFromServer.ComputerRoom[i].Name+"'> </li>");
//        alert(insertInstanceText);
        document.getElementById("SpatialObj").innerHTML += insertInstanceText;
//        selectFuncAreaWFS(jsonFromServer.ComputerRoom[i].LevelNo,jsonFromServer.ComputerRoom[i].Name)
    }
}

function showPeopleObj(peopleIndex,a){
//    alert(peopleIndex);
    if(a == "student") {
        showPeople(studentAllArray[peopleIndex])
    }
    else if(a == "teacher"){
        showPeople(teacherAllArray[peopleIndex])
    }
}
