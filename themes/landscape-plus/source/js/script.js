(function($){
  /*toTop start*/
  // When to show the scroll link
  // higher number = scroll link appears further down the page
  var upperLimit = 1000;
  // Our scroll link element
  var scrollElem = $('#totop');
  // Scroll to top speed
  var scrollSpeed = 500;
  // Show and hide the scroll to top link based on scroll position
  $(window).scroll(function() {
    var scrollTop = $(document).scrollTop();
    if (scrollTop > upperLimit) {
      $(scrollElem).stop().fadeTo(300, 1); // fade back in
    } else {
      $(scrollElem).stop().fadeTo(300, 0); // fade out
    }
  });

  // Scroll to top animation on click
  $(scrollElem).click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, scrollSpeed);
    return false;
  });
  /*toTop end*/
  // Search
  /*var $searchWrap = $('#search-form-wrap'),
    isSearchAnim = false,
    searchAnimDuration = 200;

  var startSearchAnim = function(){
    isSearchAnim = true;
  };

  var stopSearchAnim = function(callback){
    setTimeout(function(){
      isSearchAnim = false;
      callback && callback();
    }, searchAnimDuration);
  };

  $('#nav-search-btn').on('click', function(){
    if (isSearchAnim) return;

    startSearchAnim();
    $searchWrap.addClass('on');
    stopSearchAnim(function(){
      $('.search-form-input').focus();
    });
  });

  $('.search-form-input').on('blur', function(){
    startSearchAnim();
    $searchWrap.removeClass('on');
    stopSearchAnim();
  });
*/

  // Share
  $('body').on('click', function(){
    $('.article-share-box.on').removeClass('on');
  }).on('click', '.article-share-link', function(e){
    e.stopPropagation();

    var $this = $(this),
      type = $this.attr('data-share'),
      offset = $this.offset();

    if (type == 'baidu') {
      var box = $('#article-share-box');

      if (box.hasClass('on')){
        box.removeClass('on');
        return;
      }

      $('.article-share-box.on').hide();

      box.css({
        top: offset.top + 25,
        left: offset.left - 25
      }).addClass('on');
    } else{
      var url = $this.attr('data-url'),
      encodedUrl = encodeURIComponent(url),
      id = 'article-share-box-' + $this.attr('data-id');

      if ($('#' + id).length){
        var box = $('#' + id);

        if (box.hasClass('on')){
          box.removeClass('on');
          return;
        }
      } else {
        var html = [
          '<div id="' + id + '" class="article-share-box">',
            '<input class="article-share-input" value="' + url + '">',
            '<div class="article-share-links">',
              '<a href="https://twitter.com/intent/tweet?url=' + encodedUrl + '" class="article-share-twitter" target="_blank" title="Twitter"></a>',
              '<a href="https://www.facebook.com/sharer.php?u=' + encodedUrl + '" class="article-share-facebook" target="_blank" title="Facebook"></a>',
              '<a href="http://pinterest.com/pin/create/button/?url=' + encodedUrl + '" class="article-share-pinterest" target="_blank" title="Pinterest"></a>',
              '<a href="https://plus.google.com/share?url=' + encodedUrl + '" class="article-share-google" target="_blank" title="Google+"></a>',
            '</div>',
          '</div>'
        ].join('');

        var box = $(html);

        $('body').append(box);
      }

      $('.article-share-box.on').hide();

      box.css({
        top: offset.top + 25,
        left: offset.left
      }).addClass('on');
    };
  }).on('click', '.article-share-box', function(e){
    e.stopPropagation();
  }).on('click', '.article-share-box-input', function(){
    $(this).select();
  }).on('click', '.article-share-box-link', function(e){
    e.preventDefault();
    e.stopPropagation();

    window.open(this.href, 'article-share-box-window-' + Date.now(), 'width=500,height=450');
  });

  // Caption
  $('.article-entry').each(function(i){
    $(this).find('img').each(function(){
      if ($(this).parent().hasClass('fancybox')) return;

      var alt = this.alt;

      if (alt) $(this).after('<span class="caption">' + alt + '</span>');

      $(this).wrap('<a href="' + this.src + '" title="' + alt + '" class="fancybox"></a>');
    });

    $(this).find('.fancybox').each(function(){
      $(this).attr('rel', 'article' + i);
    });
  });

  if ($.fancybox){
    $('.fancybox').fancybox();
  }

  // Mobile nav
  var $container = $('#container'),
    isMobileNavAnim = false,
    mobileNavAnimDuration = 200;

  var startMobileNavAnim = function(){
    isMobileNavAnim = true;
  };

  var stopMobileNavAnim = function(){
    setTimeout(function(){
      isMobileNavAnim = false;
    }, mobileNavAnimDuration);
  }

  $('#main-nav-toggle').on('click', function(){
    if (isMobileNavAnim) return;

    startMobileNavAnim();
    $container.toggleClass('mobile-nav-on');
    stopMobileNavAnim();
  });

  $('#wrap').on('click', function(){
    if (isMobileNavAnim || !$container.hasClass('mobile-nav-on')) return;

    $container.removeClass('mobile-nav-on');
  });

  //nprogress config

  NProgress.configure({ ease: 'ease', speed: 600 });
  NProgress.configure({ trickleSpeed: 60 });



  //jquery.pajax
  /*$.pjax({
    selector: '.article-more-link > a',
    container: '#main', //内容替换的容器
    show: 'fade',  //展现的动画，支持默认和fade, 可以自定义动画方式，这里为自定义的function即可。
    cache: true,  //是否使用缓存
    storage: true,  //是否使用本地存储
    titleSuffix: '', //标题后缀
    filter: function(){},
    callback: function(){}
  })*/
if ($.support.pjax) {
  $(document).pjax('a', '#main', { fragment: ('#main'), timeout: 10000 });
  $(document).on({
    'pjax:click': function() {
      NProgress.start();
      beforePjax();
    },
    'pjax:start': function() {
      console.log("pjax start...");
    },
    'pjax:end':function(){
      NProgress.done();
      //setTimeout("NProgress.done()", 3000 );
      console.log("pjax end...");
      afterPjax();
    }
  });
  function beforePjax(){
    disablePageCounter();
    disableVisitorCounter();
  }
  function afterPjax(){
    //多说展示
    pajx_loadDuodsuo();
    //访问量数据增加
    showPageCounter();
    showVisitorCounter();

    //侧边栏自动回收
    hideMobileNav();
  }
  function pajx_loadDuodsuo(){
    var dus=$(".ds-thread");
    if($(dus).length==1){
      var el = document.createElement('div');
      el.setAttribute('data-thread-key',$(dus).attr("data-thread-key"));//必选参数
      el.setAttribute('data-url',$(dus).attr("data-url"));
      DUOSHUO.EmbedThread(el);
      $(dus).html(el);
    }
  }

  function hideMobileNav(){
    if (isMobileNavAnim || !$container.hasClass('mobile-nav-on')) return;
    $container.removeClass('mobile-nav-on');
  }
}

})(jQuery);

window.onbeforeunload = function(){
  console.log('页面刷新了');
}
