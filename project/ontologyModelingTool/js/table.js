/**
 * Created by yll on 2014/12/18.
 */

var PropertyType = "";//属性类型；
var myAlertString = "";
var modalBodyString = "";


function heredoc(fn) {
    return fn.toString().split('\n').slice(1, -1).join('\n') + '\n'
}
//从服务器传递过来数据属性字符串
var myPropertiesDate = heredoc(function () {/*
 Grade
 StudentComputerRoom
 CentroidLatitude
 MinLevel
 Color
 Type
 BuildingDate
 LevelRasterMap
 Condition
 Name
 Hole
 CentroidAltitude
 FacadeColor
 Addr_City
 ObjectID
 Geometry2D
 Geometry3D
 Reserch_Dir
 Owner
 Glass
 ObjectLocationRow
 FacadeMaterial
 Architect
 BuildingNo
 Position
 RoofColor
 Box3D
 StudentNo
 RoofShape
 Functions
 Addr_Housenumber
 Direction
 Width
 Material
 StaffPosition
 TeacherName
 Sex
 ObjectLocationCol
 ObjID_2D
 Breast
 CentroidLongitude
 Addr_Street
 Teacher_URL
 Box2D
 owl:topDataProperty
 ObjectImportance
 RoofMaterial
 Usage
 Description
 ObjID_3D
 MaxLevel
 Connectrelation
 owl:bottomDataProperty
 Style
 Height
 Addr_Country
 BuildingInfo
 Teacher_Office
 NumberOfLevels
 LevelNo
 NavigateMapFile
 */
 });
var myPropertiesObject = heredoc(function () {/*
 BelongToBuilding
 BelongToLevel
 BeTaught
 Teach
 Corporation
 Has_Level
 Has_Office
 Has_Room
 Has_Student
 Locate_ComputerRoom
 Own
 */
});
/********************************
 * 属性输入框自动提示
 *********************************/
var insertPoperties_data = function () {
    document.getElementById("PropertiesTextArray").innerHTML = "";
    var arrayObj;
    var insertText = "";
    arrayObj = myPropertiesDate.split("\n");
    for (var i = 0; i < arrayObj.length - 1; i++) {
        //求本文内容
        var valueText = arrayObj[i].replace(/[^A-z]/ig, "");;
        insertText += " <option value=\"" + valueText + "\">";
    }
    document.getElementById("PropertiesTextArray").innerHTML = document.getElementById("PropertiesTextArray").innerHTML + insertText;
}

var insertPoperties_object = function () {
    document.getElementById("PropertiesTextArray").innerHTML = "";
    var arrayObj;
    var insertText = "";
    arrayObj = myPropertiesObject.split("\n");
    for (var i = 0; i < arrayObj.length - 1; i++) {
        //求本文内容
        var valueText = arrayObj[i].replace(/[^A-z]/ig, "");;
        insertText += " <option value=\"" + valueText + "\">";
    }
    document.getElementById("PropertiesTextArray").innerHTML = document.getElementById("PropertiesTextArray").innerHTML + insertText;
}

/********************************
 * 添加数据属性事件
 *********************************/
var addPropertiesClick = function () {
    if(checkRepeat() == 1) {//没有重复
        var textInput = document.getElementById("propertyClass").value;
        if (textInput.length > 0) {
            var textInputValue = document.getElementById("propertyValue").value;
            var arrayObj;
            if (PropertyType == "Data") {
                arrayObj = myPropertiesDate.split("\n");//数据属性
            }
            else if (PropertyType == "Object") {
                arrayObj = myPropertiesObject.split("\n");//对象属性
            }
            for (var i = 0; i < arrayObj.length - 1; i++) {//判断一个元素是否在数组中
                //求本文内容
                var valueText = arrayObj[i].replace(/[^A-z]/ig, "");
                if (textInput == valueText) {
                    modalBodyString += (textInput + ": " + textInputValue + ",      ");
                    document.getElementById("propertiesValue").innerHTML = modalBodyString;
                    return true;
                }
            }
            myAlertString = "Not Exist!";
            document.getElementById("alertButton").click();//模拟js触发按钮
            return false;
        }
    }else{
        myAlertString = "Repeat!";
        document.getElementById("alertButton").click();//模拟js触发按钮
    }
}
/********************************
 * 检查添加的属性是否重复
 *********************************/
var checkRepeat = function () {
    var textInput = document.getElementById("propertyClass").value;
    var modalBodyText = document.getElementById("propertiesValue").innerHTML;
    if(modalBodyText.indexOf(textInput) == -1){
        return 1;//没有重复
    }else{
        return -1;//重复
    }
}
/********************************
 * 选择添加的属性类型
 *********************************/
var ChooseDataProperty = function () {
    PropertyType = "Data";
    insertPoperties_data();//属性输入框自动提示
    document.getElementById("closeChooseModal").click();
}
var ChooseObjectProperty = function () {
    PropertyType = "Object";
    insertPoperties_object();//属性输入框自动提示
    document.getElementById("closeChooseModal").click();
}
/********************************
 * 删除数据属性事件
 *********************************/
var deletePropertiesClick = function () {
    var textInput = document.getElementById("propertyClass").value;
    var propertiesPanelContent = document.getElementById("propertiesValue").innerHTML;
    var PropertiesArray = new Array();
    PropertiesArray = propertiesPanelContent.split(",");
    for(var i = 0; i<PropertiesArray.length;i++){
        if(PropertiesArray[i].indexOf(textInput) != -1){
            PropertiesArray.splice(i,1)
        }
    }
    var newPropertiesPanelContent = PropertiesArray.join(",");
    document.getElementById("propertiesValue").innerHTML = "";
    document.getElementById("propertiesValue").innerHTML =  document.getElementById("propertiesValue").innerHTML + newPropertiesPanelContent;
}

var alertTest = function () {//弹出警告窗口
    document.getElementById("alertText").innerHTML = myAlertString;
}



