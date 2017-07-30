$(function() {
  let intervalTimer = setInterval(switchPanel, 2000);
  $('.img-menu ul').on('click', 'li', function() {
    $(this).addClass('clicked').siblings().removeClass('clicked');
    $('.img-content').eq($(this).index()).fadeIn(400).siblings().hide();
  });
  $('#banner').on('mouseover', function() {
    clearInterval(intervalTimer);
  });
  $('#banner').on('mouseout', function() {
    intervalTimer = setInterval(switchPanel, 6000);
  });

  function switchPanel() {
    let index = $('.clicked').index() + 1;
    if (index === 5) {
      index = 0;
    }
    $('.img-menu ul li').eq(index).trigger('click');
  }
});

