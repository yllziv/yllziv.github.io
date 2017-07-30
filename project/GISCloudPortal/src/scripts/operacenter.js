var Operacenter = {};
require('./components/_navigation.js');
var echarts = require('echarts');

$(document).ready(function() {
    Operacenter.bannerRadius();
    Operacenter.init();

     // 地图管理
    $('#dituguanli').click(function(){
      window.location.hash = '#mapmanagerpage';
    })

    // 虚拟机管理
    $('#xunijiguanli').click(function(){
      window.location.hash = '#resmanagerpage';
    })

    // 权限管理
    $('#quanxianguanli').click(function(){
      window.location.hash = '#rightmanagerpage';
    });

    // 系统管理
    $('#xitongguanli').click(function(){
      window.location.hash = '#sysmanagerpage';
    });

    //切换访问量和运行状态
    $('.map-status-menu').on('click', 'span', function() {
      $(this).siblings().removeClass('clicked').end().addClass('clicked');
    })
    //报警规则设置(地图管理)
    $('.map-status-menu').on('click', 'img', function() {
      //设置为正中央
      var width = document.documentElement.scrollWidth;
      var height = document.documentElement.scrollHeight;
      $('.transparent-div').css('width',width).css('height',height);
      $('.transparent-div').show();
      var clientHeight = document.documentElement.clientHeight;
      var top = parseInt(parseInt(clientHeight)*0.25)+window.pageYOffset+'px';
      var left =parseInt(parseInt(width)/2-435)+'px';
      $('.alarm-setting').css('top',top).css('left',left);
      //清除上次点击的影响
      $('.setting-select tbody').html("");
      $('.setting-select tbody').append(
              '<tr><td><select><option>请选择</option><option>平均响应时间</option></select></td>'+
              '<td><select><option>五分钟</option></select></td><td><select><option>平均值</option></select>'+
              '<select><option>></option></select><span>阈值</span> <input type="text"></td><td>-</td><td>删除</td></tr>'
      )

      $('.alarm-setting').show();
      $('.alarm-list').show();
      $('.alarm-people').hide();
      $('.alarm-success').hide();
    });
    //报警规则设置(系统管理)
    $('.sys-data').on('click', 'img', function() {
      var width = document.documentElement.scrollWidth;
      var height = document.documentElement.scrollHeight;
      $('.transparent-div').css('width',width).css('height',height);
      $('.transparent-div').show();
      var clientHeight = document.documentElement.clientHeight;
      var top = parseInt(parseInt(clientHeight)*0.25)+window.pageYOffset+'px';
      var left =parseInt(parseInt(width)/2-435)+'px';
      $('.alarm-setting').css('top',top).css('left',left);
      $('.alarm-setting').show();
      $('.alarm-list').show();
      $('.alarm-people').hide();
      $('.alarm-success').hide();
    });

    //关闭报警规则界面
    $('.alarm-title').on('click', 'img', function() {
      $('.alarm-setting').hide();
      $('.transparent-div').hide();
    });
    $('.alarm-setting').on('click', '.cancel-button', function() {
      $('.alarm-setting').hide();
      $('.transparent-div').hide();
    });
    //报警规则设置步骤1
    $('.alarm-list').on('click', '.next-button', function() {
      $('.alarm-list').hide();
      $('.alarm-people').show();
    });
    $('.alarm-list').on('click', '.add-setting', function() {
      $('.setting-select tbody').append(
              '<tr><td><select><option>请选择</option><option>平均响应时间</option></select></td>'+
              '<td><select><option>五分钟</option></select></td><td><select><option>平均值</option></select>'+
              '<select><option>></option></select><span>阈值</span> <input type="text"></td><td>-</td><td>删除</td></tr>'
      )
    });
    $('.alarm-list tbody').on('click', 'td:last-child', function() {
      $(this).parent().remove();
    });
    //报警规则设置步骤2
    $('.alarm-people').on('click', '.next-button', function() {
      $('.alarm-people').hide();
      $('.alarm-success').show();
    });
    $('.alarm-people').on('click', '.pre-button', function() {
      $('.alarm-people').hide();
      $('.alarm-list').show();
    });
    //报警规则设置步骤3
    $('.alarm-success').on('click', '.close-button', function() {
      $('.alarm-setting').hide();
      $('.transparent-div').hide();
    });

    //打开服务页面
    $('.map-list').on('click', 'h2', function() {
      //标签栏增加
      $('.switch-menu li').removeClass('clicked');
      $('.switch-menu').append(
              "<li class = 'clicked'>事故地图</li>"
      )
      //页面切换
      $('.map-list-div').hide();
      $('.wfs-list-div').show();
      Operacenter.initEcharts(document.getElementsByClassName('wfs-graph-echarts'));

    })
    //切换地图-服务页面
    $('.switch-menu').on('click', 'li', function() {
      if($(this).prev().prop("tagName")=='LI'){
        $(this).siblings().removeClass('clicked').end().addClass('clicked');
        //页面切换
        $('.map-list-div').hide();
        $('.wfs-list-div').show();
      }
    })
    $('.switch-menu #index-menu').click(function() {
      $(this).siblings().removeClass('clicked').end().addClass('clicked');
      //页面切换
      $('.map-list-div').show();
      $('.wfs-list-div').hide();
    });

    //服务页面wfs切换
    $('.wfs-list').on('click', 'li', function() {
      $(this).siblings().removeClass('clicked').end().addClass('clicked');
      $(this).children('.rectangle_light').addClass('clicked');
      $(this).siblings().children('.rectangle_light').removeClass('clicked');
    })


    //系统管理切换CPU、内存、磁盘
    $('.sys-status-menu').on('click', 'li', function() {
      $(this).siblings().removeClass('clicked').end().addClass('clicked');
    }) 

});

//banner中的圆形进度条
Operacenter.bannerRadius = function(){
  var param = {
    radius: 30,
    barColor: '#ff5b02',
    barWidth: 7,
    initValue: 0,
    roundCorner : true,
    percentage: true
  }
  $('#indicatorContainer').radialIndicator($.extend(param,{initValue: 80}));
  $('#indicatorContainer1').radialIndicator($.extend(param,{initValue: 40}));
  $('#indicatorContainer2').radialIndicator($.extend(param,{initValue: 60}));
}

window.onhashchange = function(){
  Operacenter.init();
}

Operacenter.init = function(){
  var hash = window.location.hash;
  switch(hash){
    case '#mapmanagerpage': Operacenter.switchMenu('dituguanli'); break;
    case '#resmanagerpage': Operacenter.switchMenu('xunijiguanli'); break;
    case '#rightmanagerpage': Operacenter.switchMenu('quanxianguanli'); break;
    case '#sysmanagerpage': Operacenter.switchMenu('xitongguanli'); break;
  }
}

Operacenter.switchMenu = function(menu){
  $('#'+menu).siblings().removeClass('clicked').end().addClass('clicked');
    $('.dituguanli-img').attr('src', '../images/operacenter/dituguanli.png');
    $('.xunijiguanli-img').attr('src', '../images/operacenter/xunijiguanli.png');
    $('.quanxianguanli-img').attr('src', '../images/operacenter/quanxianguanli.png');
    $('.xitongguanli-img').attr('src', '../images/operacenter/xitongguanli.png');
    var mapParam = {"dituguanli":"map","xunijiguanli":"xuniji","quanxianguanli":"right","xitongguanli":"system"}
    $('.right-content-' + mapParam[menu]).fadeIn(500);
    $('.right-content-' + mapParam[menu]).siblings().hide();
    var setHeight = function(height){
      $('.left-menu').height(height);
      $('.opera-map').height(height);
      var heightNum = parseInt(height);
      $('.copyright').css('top',heightNum + 430 + 'px');
    }  
  switch(menu){
    case 'dituguanli':
      $('.sub-nav-title .sub-title').html('地图管理');
      $('.dituguanli-img').attr('src', '../images/operacenter/dituguanli0.png');
      setHeight('1200px');
      Operacenter.initEcharts(document.getElementsByClassName('map-graph-echarts'));
      break;
    case 'xunijiguanli':
      $('.sub-nav-title .sub-title').html('虚拟机管理');
      $('.xunijiguanli-img').attr('src', '../images/operacenter/xunijiguanli0.png');
      setHeight('1050px');
      Operacenter.initEcharts(document.getElementsByClassName('xuniji-graph-echarts'));
      break;
    case 'quanxianguanli': 
      $('.sub-nav-title .sub-title').html('权限管理');
      $('.quanxianguanli-img').attr('src', '../images/operacenter/quanxianguanli0.png');
      setHeight('1000px');
      break;
    case 'xitongguanli': 
      $('.xitongguanli-img').attr('src', '../images/operacenter/xitongguanli0.png');
      setHeight('1050px');
      break;
  }
  $('.left-menu').show();
}

// 基于准备好的dom，初始化echarts实例
Operacenter.initEcharts = function(array){
  for(var i = 0; i < array.length; i++){
    echarts.init(array[i]).setOption({
      tooltip: {
          trigger: 'axis'
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
          height: '90%'
      }, 
      xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['2','4','6','8','10','12','14','16','18','20','22','24']
      },
      yAxis: {
          type: 'value'
      },
      series: [
          {
              name:'访问量',
              type:'line',
              stack: '总量',
              data:[120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90]
          }
      ]
    });
  }
}




