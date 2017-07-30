var Devcenter = {};
require('./components/_navigation.js')
var Devcenter = {};

$(document).ready(function(){
    Devcenter.init();
})
Devcenter.init=function(){
    $('.copyright').css('top','1183px');
    $("section.left ul li").click(function(e){ Devcenter.clickList(e) });

    $('section.left ul li').hover(function(e){ Devcenter.hoverList(e) })
}

// @param target: jquery元素(css方法在js中是没有的)
// @param flag: true：变成有颜色; false：变成没颜色
Devcenter.replaceX = function(target ,flag){
    var t = target.css('background-position');
    console.log(t);
    if(flag){
        target.css('background-position',t.replace('-20px','-60px'));
    }else{
        target.css('background-position',t.replace('-60px','-20px'));
    }
};

// 悬浮菜单
Devcenter.hoverList = function(e){
    var listimg = document.querySelectorAll('section.left ul li .list-icon');
    console.log(listimg);
    for(var i = 0; i < listimg.length; i++){
        var currList = $(listimg[i]);
        Devcenter.replaceX(currList,false);
    }
    Devcenter.replaceX($(e.target).find('.list-icon') ,true)
}

// 点击菜单
Devcenter.clickList = function(e){
     var myTag = $(e.target).closest('li');
    console.log(myTag[0].tagName)
}
