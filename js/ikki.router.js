/*!
 * Kendo UI Admin v1.0.0 by IKKI & Amikoko - https://ikki2000.github.io/
 * Copyright 2018-2019 IKKI Studio
 * Released under the MIT License - https://ikki2000.github.io/KendoUI-Admin-Site/LICENSE
 */

/* JS for Router | Written by IKKI | 2018-02-03 */

// 路由创建
var skeleton = '<li class="media"><figure></figure><div class="media-body"><h5></h5><p></p><p></p><p></p></div></li>',
    router = new kendo.Router({
        change: function (e) {
            $('#container').html('<ul id="skeleton">' + new Array(6).join(skeleton) + '</ul>');
            $('#inProgress').css('display', 'flex');
            $('#inProgress .progress-bar').removeClass('w-100').addClass('animated');
            tokenAuth();
            getMessage();
            getNotice();
            showPath(e.url.split('/')[e.url.split('/').length - 1]);
        },
        routeMissing: function () {
            error404();
        }
    }),
    layout = new kendo.Layout('<div id="container"></div>', { wrap: false });

// 路由初始化
router.bind('init', function () {
    $('#section').prepend(layout.render());
});

// 路由路径
router.route('(/:lv1)(/:lv2)(/:lv3)(/:lv4)(/:lv5)', function (lv1, lv2, lv3, lv4, lv5, params) {
    var lvs = [lv1, lv2, lv3, lv4, lv5],
        routePath = webType + '/views',
        routeFile = '';
    $.each(lvs, function (i, lv) {
        if (lv) {
            routePath += '/' + lv;
            routeFile = lv;
        }
    });
    $.get(path + routePath + '.html', function (temp) {
        $('#container').html('');
        $('#template').html(temp);
        layout.showIn('#container', new kendo.View(routeFile + 'Temp', { wrap: false }), 'fade');
        $.getScript(path + routePath + '.js', function () {
            $('#inProgress .progress-bar').removeClass('animated').addClass('w-100');
            $('#inProgress').fadeOut();
        });
    }).fail(function () {
        error404();
    });
});

// 路由根目录
router.route('/', function () {
    router.navigate('/home');
});

// 路由丢失
function error404() {
    router.navigate('/404');
}

// 路由导航链接
function linkTo(dirs, links) {
    router.navigate(dirs + links);
}

// 路由启动
$(function () {
    router.start();
});

// 路由刷新
function refresh() {
    $('#container').html('<ul id="skeleton">' + new Array(6).join(skeleton) + '</ul>');
    $('#inProgress').css('display', 'flex');
    $('#inProgress .progress-bar').removeClass('w-100').addClass('animated');
    tokenAuth();
    $.get(path + webType + '/views' + location.hash.split('#')[1] + '.html', function (temp) {
        $('#container').html('');
        $('#template').html(temp);
        layout.showIn('#container', new kendo.View(location.hash.split('/')[location.hash.split('/').length - 1] + 'Temp', { wrap: false }), 'fade');
        $.getScript(path + webType + '/views' + location.hash.split('#')[1] + '.js', function () {
            $('#inProgress .progress-bar').removeClass('animated').addClass('w-100');
            $('#inProgress').fadeOut();
        });
    });
}