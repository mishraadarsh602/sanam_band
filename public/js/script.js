!function (a) { "use strict"; a(window).on("load", function () { a(".loader-inner").fadeOut(), a(".loader").delay(200).fadeOut("slow") }); var s = a(".header"), i = s.offset(), e = a(".block-top"); a(window).scroll(function () { a(this).scrollTop() > i.top + 100 && s.hasClass("stopping") ? (s.addClass("scrolling").removeClass("stopping"), e.addClass("active")) : a(this).scrollTop() <= i.top + 100 && s.hasClass("scrolling") && (s.removeClass("scrolling").addClass("stopping"), e.removeClass("active")) }), a("a.scroll").smoothScroll({ speed: 800, offset: -55 }), a(".main-slider").flexslider({ animation: "fade", slideshow: !0, directionNav: !1, controlNav: !0, pauseOnAction: !1, animationSpeed: 1e3 }); var l = a(".mobile-but"), t = a(".main-nav ul"); t.height(); a(l).on("click", function () { return a(".toggle-mobile-but").toggleClass("active"), t.slideToggle(), a(".main-nav li a").addClass("mobile"), !1 }), a(window).resize(function () { a(window).width() > 320 && t.is(":hidden") && (t.removeAttr("style"), a(".main-nav li a").removeClass("mobile")) }), a(".main-nav li a").on("click", function () { a(this).hasClass("mobile") && (t.slideToggle(), a(".toggle-mobile-but").toggleClass("active")) }), a(".background-img").each(function () { var s = a(this).children("img").attr("src"); a(this).css("background-image", 'url("' + s + '")').css("background-position", "initial") }), a(".countdown").countdown("2022/9/20", function (s) { a(this).html(s.strftime("%D days %H:%M:%S")) }), a(".block-tabs li").on("click", function () { if (!a(this).hasClass("active")) { var s = a(this).index() + 1; a(".block-tabs li.active").removeClass("active"), a(this).addClass("active"), a(".block-tab li.active").removeClass("active"), a(".block-tab li:nth-child(" + s + ")").addClass("active") } }); var o = a(".album"), n = audiojs.create(o, { trackEnded: function () { var s = a(".playlist li.playing").next(); s.length || (s = a(".playlist li").first()), s.addClass("playing").siblings().removeClass("playing"), audio1.load(a(".as-link", s).attr("data-src")), audio1.play() } })[0], r = a(".playlist li .as-link").attr("data-src"); a(".playlist li ").first().addClass("pause"), n.load(r), a(".playlist li").on("click", function () { return "playing" == a(this).attr("class") ? (a(this).addClass("pause"), n.playPause()) : (a(this).addClass("playing").removeClass("pause").siblings().removeClass("playing").removeClass("pause"), n.load(a(".as-link", this).attr("data-src")), n.play()), !1 }), a(".toggle-lyrics").on("click", function () { return a(this).closest(".playlist li").find(".block-lyrics").slideToggle(), a(this).toggleClass("selected"), !1 }), a(".btn").on("click", function () { var s = a(this).attr("href"); return window.location.href = s, !1 }), a(".popup-image").magnificPopup({ type: "image", fixedContentPos: !1, fixedBgPos: !1, mainClass: "mfp-no-margins mfp-with-zoom", image: { verticalFit: !0 }, zoom: { enabled: !0, duration: 300 } }), a(".popup-youtube, .popup-vimeo").magnificPopup({ disableOn: 700, type: "iframe", mainClass: "mfp-fade", removalDelay: 160, preloader: !1, fixedContentPos: !1 }), a(".block-filter li a").on("click", function (s) { s.preventDefault(), a(this).addClass("active"), a(this).parent().siblings().find("a").removeClass("active"); var i = a(this).attr("data-filter"); if (a(this).closest(".gallery").find(".block-card").removeClass("disable"), "all" !== i) for (var e = a(this).closest(".gallery").find(".block-card"), l = 0; l < e.length; l++)e.eq(l).hasClass(i) || e.eq(l).addClass("disable") }); var c = { profile: { screenName: "mutationthemes" }, domId: "block-tweets", maxTweets: 2, showRetweet: !1, showImages: !1, showUser: !0, showTime: !0, customCallback: function (s) { var i = s.length, e = 0, l = a(".block-tweets"), t = a("<ul>").addClass("slides"); for (; e < i;) { var o = a("<li>"); o.html(s[e]), t.append(o), e++ } return l.html(t), a(".block-tweets").flexslider({ animation: "slide", controlNav: !0, directionNav: !1 }), t } }; twitterFetcher.fetch(c) }(jQuery);