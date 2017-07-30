var Mapcenter = {};
require('./components/_navigation.js')

$(document).ready(function(){
  $('.copyright').css('top', '1611px'); 
  $('.left-menu').height('1611px');  

  Mapcenter.init();
  Mapcenter.initMenu();
})


window.onhashchange = function(){
  Mapcenter.init();
}


// 根据URL切换不同菜单
Mapcenter.init = function(){
  var hash = window.location.hash;
  switch(hash){
    case '#newmappage': Mapcenter.switchMenu('newmap'); break;
    case '#mymappage': Mapcenter.switchMenu('mymap'); break;
    case '#mapfactorypage': Mapcenter.switchMenu('mapfactory'); break;
  }
}

Mapcenter.switchMenu = function(menu){
  $('.pagemenu-search .onemenu').removeClass('clicked');
  $('#mapcenter-newmap').hide();
  $('#mapcenter-mymap').hide();
  $('#mapcenter-mapfactory').hide();
  $('.onemenu#newmap').find('img').attr('src','../images/mapcenter/zuixinditu.png') ;
  $('.onemenu#mymap').find('img').attr('src','../images/mapcenter/wodeditu.png') ;
  $('.onemenu#mapfactory').find('img').attr('src','../images/mapcenter/ditugongchang.png') ;
  switch(menu){
    case 'newmap':
      $('.sub-nav-title .sub-title').html('最新地图');
      $('#mapcenter-newmap').fadeIn(300);
      $('.onemenu#newmap').addClass('clicked').find('img').attr('src','../images/mapcenter/zuixinditu0.png') ;
      break;
    case 'mymap':
      $('.sub-nav-title .sub-title').html('我的地图');
      $('#mapcenter-mymap').fadeIn(300);
      $('.onemenu#mymap').addClass('clicked').find('img').attr('src','../images/mapcenter/wodeditu0.png') ;
      break;
    case 'mapfactory': 
      $('.sub-nav-title .sub-title').html('地图工厂');
      $('#mapcenter-mapfactory').fadeIn(300);
      $('.onemenu#mapfactory').addClass('clicked').find('img').attr('src','../images/mapcenter/ditugongchang0.png') ;
      break;
  }
} 

Mapcenter.switchSubMenu = function(mainMenu,subMenu){
  $(mainMenu + ' #' + subMenu).siblings().removeClass('clicked').end().addClass('clicked');
  $(mainMenu + ' .mubanzhitu-img').attr('src', '../images/mapcenter/mubanzhitu.png');
  $(mainMenu + ' .gaojizhitu-img').attr('src', '../images/mapcenter/gaojizhitu.png');
  $(mainMenu + ' .' + subMenu+ '-img').attr('src', '../images/mapcenter/'+subMenu+'0.png');
  $(mainMenu + ' .right-content-template').hide();
  $(mainMenu + ' .right-content-highlevel').hide();
  if(subMenu == 'mubanzhitu'){
    $('.right-content-template').fadeIn(500);
    $('.left-menu').height('1000px');
    $('.map-factory').height('1000px');
  }else if(subMenu == 'gaojizhitu'){
    $('.right-content-highlevel').fadeIn(500);
    $('.left-menu').height('1000px');
    $('.map-factory').height('1000px');
  }
}

Mapcenter.initMenu = function(){
  // 一级菜单
  // 最新地图
  $('.onemenu#newmap').click(function(){
    window.location.hash = '#newmappage';
  })

  // 我的地图
  $('.onemenu#mymap').click(function(){
    window.location.hash = '#mymappage';
  })

  // 地图工厂
  $('.onemenu#mapfactory').click(function(){
    window.location.hash = '#mapfactorypage';
  });

  // 二级菜单
  // 地图工厂－模版制图
  $('.map-factory').on('click', '#mubanzhitu', function() {
    Mapcenter.switchSubMenu('.map-factory','mubanzhitu');
  })

  // 地图工厂－高级制图
  $('.map-factory').on('click', '#gaojizhitu', function() {
    Mapcenter.switchSubMenu('.map-factory','gaojizhitu');
  })

  // 我的地图－模版制图
  $('.map-mymap').on('click', '#mubanzhitu', function() {
    Mapcenter.switchSubMenu('.map-mymap','mubanzhitu');
  })

  // 我的地图－高级制图
  $('.map-mymap').on('click', '#gaojizhitu', function() {
    Mapcenter.switchSubMenu('.map-mymap','gaojizhitu');
  })

  // 地图工厂－地图服务模版
  $('.map-factory').on('click', '#mapservice-tmpl', function() {
    $(this).addClass('clickfirst');
    $('.map-factory #staticmap-tmpl').removeClass('clicksecond');
  })
  // 地图工厂－静态瓦片服务
  $('.map-factory').on('click', '#staticmap-tmpl', function() {
    $(this).addClass('clicksecond');
    $('.map-factory #mapservice-tmpl').removeClass('clickfirst');
  })
  // 我的地图－地图服务模版
  $('.map-mymap').on('click', '#mapservice-tmpl', function() {
    $(this).addClass('clickfirst');
    $('.map-mymap #staticmap-tmpl').removeClass('clicksecond');
  })
  // 我的地图－静态瓦片服务
  $('.map-mymap').on('click', '#staticmap-tmpl', function() {
    $(this).addClass('clicksecond');
    $('.map-mymap #mapservice-tmpl').removeClass('clickfirst');
  })
}


  
  
