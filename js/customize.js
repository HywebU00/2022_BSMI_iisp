// 自行加入的JS請寫在這裡
$(function() {
    /*-----------------------------------*/
    //////////// nojs 先移除////////////////
    /*-----------------------------------*/
    $('html').removeClass('no-js');
    /*-----------------------------------*/
    ///////////////置頂go to top////////////
    /*-----------------------------------*/
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 200) {
            $('.scrollToTop').fadeIn();
        } else {
            $('.scrollToTop').fadeOut();
        }
    });
    /*-----------------------------------*/
    /////click event to scroll to top//////
    /*-----------------------------------*/
    $('.scrollToTop')
        .off()
        .click(function(e) {
            $('html, body').stop().animate({ scrollTop: 0 }, 400, 'linear');
            // $('a.goCenter').focus(); //加入這行
            e.preventDefault();
        });
    $('.scrollToTop').keydown(function(e) {
        $('html, body').stop().animate({ scrollTop: 0 }, 400, 'linear');
        $('body').find('a.goCenter').focus();
        e.preventDefault();
    });
    /*------------------------------------*/
    /////gotoCenter on focus跳到 content/////
    /*------------------------------------*/
    $('a.goCenter').keydown(function(e) {
        if (e.which == 13) {
            $('#aC').focus();
            $('html, body')
                .stop(true, true)
                .animate({ scrollTop: $('.main').find('.accesskey').offset().top }, 800, 'easeOutExpo');
        }
    });
    /*-----------------------------------*/
    ///////////////header 往上滑後固定////////////
    /*-----------------------------------*/
    $(window).bind('scroll', function() {
        var windowW = $(window).outerWidth();
        if (windowW >= 767 && $(this).scrollTop() > 0) {
            $('.header').addClass('fixed');
            $('.main').addClass('maintop');
        } else {
            $('.header').removeClass('fixed');
            $('.main').removeClass('maintop');
        }
    });
    //
    // 分享按鈕 share
    $('.function_panel .share').children('ul').hide();
    $('.function_panel .share .shareButton').click(function() {
        $(this).siblings('ul').stop(true, true).slideToggle();
    });
    $('.function_panel .share .shareButton').keyup(function() {
        $(this).siblings('ul').stop(true, true).slideDown();
    });
    var _shareButton = $('.shareButton');
    $('.function_panel .share')
        .find('li:last>a')
        .focusout(function(event) {
            $(this).parent().parent('ul').hide();
        });
    // 活動區塊新的
    $('.activity_slider').slick({
        dots: true,
        arrows: true,
        infinite: false,
        speed: 1000,
        autoplay: true,
        pauseOnHover: false,
        pauseOnFocus: false,
        customPaging: function(slider, i) {
            var title = $(slider.$slides[i]).find('img').attr('alt').trim();
            return $('<button type="button" aria-label="' + title + '"/>').text(title);
        },
    });
    // 搜尋按鈕
    $('.search').hide();
    $('.search_btn button').click(function() {
        $('.search').slideToggle(400);
    });
    $('.keywordHot')
        .find('li:last-child>a:last-child')
        .focusout(function() {
            $('.search').hide();
        });
    // menu
    $('.menu_btn button').click(function() {
        $('.menu_block').fadeIn();
        $('body').addClass('fixed');
    });
    $('.menu_block .close a').click(function() {
        $('.menu_block').fadeOut();
        $('body').removeClass('fixed');
    });
    // 會員登入
    $('.login_lightbox').hide();
    $('.login button').click(function() {
        $('.login_lightbox').fadeIn();
        $('body').addClass('fixed');
    });
    $('.login_lightbox .close a').click(function() {
        $('.login_lightbox').fadeOut();
        $('body').removeClass('fixed');
    });
    // 分享
    $('.share_results_lightbox').hide();
    $('.share_results_btn a').click(function() {
        $('.share_results_lightbox').fadeIn();
        $('body').addClass('fixed');
    });
    $('.share_results_lightbox .close a').click(function() {
        $('.share_results_lightbox').fadeOut();
        $('body').removeClass('fixed');
    });
    // password_toggle
    var passShow = false;
    $('.password_toggle').each(function(index, el) {
        $(this)
            .find('.btn-icon')
            .off()
            .click(function(e) {
                if (!passShow) {
                    $(this).children('i').removeClass().addClass('i_show');
                    $(this).parents('.password_toggle').find('input[type="password"]').attr('type', 'text');
                    passShow = true;
                    // console.log(passShow);
                } else {
                    $(this).children('i').removeClass().addClass('i_hide');
                    $(this).parents('.password_toggle').find('input[type="text"]').attr('type', 'password');
                    passShow = false;
                    // console.log(passShow);
                }
                e.preventDefault();
            });
    });
    // 技術選項
    $('.technology_options_block').hide();
    $('.technical_detect a').click(function() {
        if ($('.technology_options_block').is(':hidden')) {
            $('.technology_options_block').slideDown();
            $(this).html('<img src="images/detect_btn_open.png" alt="檢測選項按鈕">');
        } else {
            $('.technology_options_block').slideUp();
            $(this).html('<img src="images/detect_btn_close.png" alt="檢測選項按鈕">');
        }
    });
    $('.technology_options_block')
        .find('li:last>a')
        .focusout(function(event) {
            $(this).parents('.technology_options_block').hide();
            $('.technical_detect a').html('<img src="images/detect_btn_close.png" alt="檢測選項按鈕">');
        });
    // 快速連結
    $('.fixed_sidebar_group .open_btn a').click(function() {
        if ($('.fixed_sidebar_group').hasClass('open_block')) {
            $('.fixed_sidebar_group').removeClass('open_block');
        } else {
            $('.fixed_sidebar_group').addClass('open_block');
        }
    });
    //
    var _window = $(window);
    var ww = _window.outerWidth();
    var wwSmall = 768;

    function presentation() {
        if (ww < wwSmall && $('.presentation_block').hasClass('leftblock_haveslider')) {
            $('.presentation_slider').slick({
                // centerMode: true,
                centerPadding: '60px',
                slidesToShow: 1.5,
                arrows: true,
                infinite: false,
                responsive: [{
                        breakpoint: 768,
                        settings: {
                            centerPadding: '60px',
                            slidesToShow: 1.5,
                        },
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            centerPadding: '30px',
                            slidesToShow: 1,
                        },
                    },
                ],
            });
        }
    }
    presentation();
    //
    let resizeTimer;
    _window.resize(function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            ww = _window.width();
            presentation();
        }, 100);
    });
    // 點外面關閉
    $(document).on('touchend click', function(e) {
        var container = $('.header .search_btn, .function_panel .share'); //點這些以外的區塊
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            $('.function_panel .share ul').slideUp();
            $('.header .search').slideUp();
            //要被收起來的區塊
        }
    });
    //精選統計區
    $('.statistics_tabs').slick({
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 3.5,
        slidesToScroll: 1,
        responsive: [{
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2.5,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1.5,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ],
    });
    $('.cppic_slider').slick({
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 1500,

        responsive: [{
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 545,
                settings: {
                    arrows: true,
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                },
            },
        ],
    });
    /*-----------------------------------*/
    /////////// 無障礙快捷鍵盤組合  //////////
    /*-----------------------------------*/
    $(document).on('keydown', function(e) {
        // alt+S 查詢
        if (e.altKey && e.keyCode == 83) {
            $('html, body').animate({ scrollTop: 0 }, 200, 'easeOutExpo');
            $('.header_functionbtn_block .search_btn .search').show().find('input[type="text"]').focus();
        }
        // alt+U header
        if (e.altKey && e.keyCode == 85) {
            $('html, body').animate({ scrollTop: 0 }, 200, 'easeOutExpo');
            $('header').find('.accesskey').focus();
        }
        // alt+C 主要內容區
        if (e.altKey && e.keyCode == 67) {
            $('html, body')
                .stop(true, true)
                .animate({ scrollTop: $('.main').find('.accesskey').offset().top - 70 }, 800, 'easeOutExpo');
            $('.main').find('.accesskey').focus();
        }
        // alt+Z footer
        if (e.altKey && e.keyCode == 90) {
            $('html, body')
                .stop(true, true)
                .animate({ scrollTop: $('footer').find('.accesskey').offset().top }, 800, 'easeOutExpo');
            $('footer').find('.accesskey').focus();
        }
    });
});