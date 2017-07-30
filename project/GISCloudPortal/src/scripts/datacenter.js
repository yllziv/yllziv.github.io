var Datacenter = {};
require('./components/_navigation.js')

$(document).ready(function(){
  $('.copyright').css('top', '1311px'); 
  Datacenter.init();
  Datacenter.initMenu();
  Datacenter.refreshJinriData();
})

window.onhashchange = function(){
  Datacenter.init();
}

// 根据URL切换不同菜单
Datacenter.init = function(){
  var hash = window.location.hash;
  switch(hash){
    case '#datasetpage': Datacenter.switchMenu('dataset'); break;
    case '#personspacepage': Datacenter.switchMenu('personspace'); break;
    case '#toolsetpage': Datacenter.switchMenu('toolset'); break;
  }
}

Datacenter.switchMenu = function(menu){
  $('.pagemenu-search .onemenu').removeClass('clicked');
  $('#datacenter-data-set').hide();
  $('#datacenter-person-space').hide();
  $('#datacenter-tool-set').hide();
  $('.onemenu#personspace').find('img').attr('src','../images/datacenter/gerenkongjian.png') ;
  $('.onemenu#dataset').find('img').attr('src','../images/datacenter/shujuji.png') ;
  $('.onemenu#toolset').find('img').attr('src','../images/datacenter/gongjuji.png') ;
  switch(menu){
    case 'dataset':
      $('.sub-nav-title .sub-title').html('数据集');
      $('#datacenter-data-set').fadeIn(300);
      $('.onemenu#dataset').addClass('clicked').find('img').attr('src','../images/datacenter/shujuji0.png') ;
      break;
    case 'personspace':
      $('.sub-nav-title .sub-title').html('个人空间');
      $('#datacenter-person-space').fadeIn(300);
      $('.onemenu#personspace').addClass('clicked').find('img').attr('src','../images/datacenter/gerenkongjian0.png') ;
      break;
    case 'toolset': 
      $('.sub-nav-title .sub-title').html('工具集');
      $('#datacenter-tool-set').fadeIn(300);
      $('.onemenu#toolset').addClass('clicked').find('img').attr('src','../images/datacenter/gongjuji0.png') ;
      break;
  }
}

Datacenter.switchSubMenu = function(mainMenu,subMenu){
  $(mainMenu + ' #' + subMenu).siblings().removeClass('clicked').end().addClass('clicked');
  $(mainMenu + ' .shujucaiji-img').attr('src', '../images/datacenter/shujucaiji.png');
  $(mainMenu + ' .Geocoding-img').attr('src', '../images/datacenter/Geocoding.png');
  $(mainMenu + ' .ETL-img').attr('src', '../images/datacenter/ETL.png');
  $(mainMenu + ' .xinjian-img').attr('src', '../images/datacenter/xinjian.png');
  $(mainMenu + ' .kongjianyewuxinxi-img').attr('src', '../images/datacenter/kongjianyewuxinxi.png');
  $(mainMenu + ' .jichudili-img').attr('src', '../images/datacenter/jichudili.png');
  $(mainMenu + ' .GPS-img').attr('src', '../images/datacenter/GPS.png');
  $(mainMenu + ' .dituqiepian-img').attr('src', '../images/datacenter/dituqiepian.png');
  $(mainMenu + ' .dimingdizhi-img').attr('src', '../images/datacenter/dimingdizhi.png');
  $(mainMenu + ' .waibufuwu-img').attr('src', '../images/datacenter/waibufuwu.png');
  $(mainMenu + ' .tool-content.shujucaiji').hide();
  $(mainMenu + ' .tool-content.Geocoding').hide();
  $(mainMenu + ' .tool-content.ETL').hide()
  $(mainMenu + ' .' + subMenu + '-img').attr('src', '../images/datacenter/'+subMenu+'0.png');
  // 工具集
  if(mainMenu == '#datacenter-tool-set'){
    switch(subMenu){
      case 'shujucaiji': 
        $(mainMenu + ' .tool-content.shujucaiji').fadeIn(500);
        break;
      case 'Geocoding':
        $(mainMenu + ' .tool-content.Geocoding').fadeIn(500);
        break;
      case 'ETL':
        $(mainMenu + ' .tool-content.ETL').fadeIn(500);
        break;
    }
  }
}


Datacenter.initMenu = function(){
  // 一级菜单
   // 数据集
  $('.onemenu#dataset').click(function(){
    window.location.hash = '#datasetpage';
  })

  // 个人空间
  $('.onemenu#personspace').click(function(){
    window.location.hash = '#personspacepage';
  })

  // 工具集
  $('.onemenu#toolset').click(function(){
    window.location.hash = '#toolsetpage';
  });

  // 二级菜单
  // 工具集－数据采集
  $('#datacenter-tool-set').on('click', '#shujucaiji', function() {
    Datacenter.switchSubMenu('#datacenter-tool-set','shujucaiji');
  })
  // 工具集－数据采集
  $('#datacenter-tool-set').on('click', '#Geocoding', function() {
    Datacenter.switchSubMenu('#datacenter-tool-set','Geocoding');
  })
  // 工具集－数据采集
  $('#datacenter-tool-set').on('click', '#ETL', function() {
    Datacenter.switchSubMenu('#datacenter-tool-set','ETL');
  })

  // 数据集－新建数据集
  $('#datacenter-data-set').on('click', '#xinjian', function() {
    Datacenter.switchSubMenu('#datacenter-data-set','xinjian');
  })
  // 数据集－空间业务信息
  $('#datacenter-data-set').on('click', '#kongjianyewuxinxi', function() {
    Datacenter.switchSubMenu('#datacenter-data-set','kongjianyewuxinxi');
  })
  // 数据集－基础地理信息
  $('#datacenter-data-set').on('click', '#jichudili', function() {
    Datacenter.switchSubMenu('#datacenter-data-set','jichudili');
  })
  // 数据集－GPS轨迹
  $('#datacenter-data-set').on('click', '#GPS', function() {
    Datacenter.switchSubMenu('#datacenter-data-set','GPS');
  })
  // 数据集－地图切片
  $('#datacenter-data-set').on('click', '#dituqiepian', function() {
    Datacenter.switchSubMenu('#datacenter-data-set','dituqiepian');
  })
  // 数据集－地名地址
  $('#datacenter-data-set').on('click', '#dimingdizhi', function() {
    Datacenter.switchSubMenu('#datacenter-data-set','dimingdizhi');
  })
  // 数据集－外部服务
  $('#datacenter-data-set').on('click', '#waibufuwu', function() {
    Datacenter.switchSubMenu('#datacenter-data-set','waibufuwu');
  })

  // 临时使用，用来测试新建数据集
  $('#newdatasetTempButton').click(function(){
    var num = parseInt($('#newdatasetTempPage').val());
    if(num > 1 && num < 41){
      $('.rightcontent .onepage').hide();
      if(num < 10){
        $('#new0' + num).show(200);
      }else{
        $('#new' + num).show(200);
      }
    }else{
      alert('请重新输入')
    }
  })

}


Datacenter.refreshJinriData = function(){
  var data = {
    nineNumber :[{"number":"1423"},{"number":"3319"}],
    totalNum:78531
  };
  Datacenter.ToEveryNumberPlaceHolder(data.nineNumber);
  Datacenter.scrollNumber(data.totalNum);
}


Datacenter.ToEveryNumberPlaceHolder = function(str){
  var jsonList=str;
  var everynumNodes = document.getElementsByClassName("nineNumberPlaceHolderSpan");
  for(var i=0;i<jsonList.length;i++){
    for(var key in jsonList[i]){
      everynumNodes[i].innerHTML=jsonList[i][key];
    }
  }
}




Datacenter.scrollNumber = function(latestNumber){
  var ToTwelveNum = function(str){
    str ='000000000000'+str;
    return str.substring(str.length-12,str.length);
  }
  var numNodes = document.getElementsByClassName("numberPlaceHolderSpan");
  var latestnumberstring = ToTwelveNum(latestNumber).toString();
  var latestLen =  latestnumberstring.length;
  var latestArrayObj = latestnumberstring.split("");
  for(var i=0;i<latestLen;i++) {
    $(numNodes[i]).animate({
      "background-position-y":(-36)*latestArrayObj[i]+'px'
    },2000);
  }
}
