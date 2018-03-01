/**
 * Created by Administrator on 2017/3/30 0030.
 */
(function (currIndex) {
    var menu = $('.menu');
    var ico = menu.find('.ico');

    function menuActive(index) {
        var currLi = menu.find('li').eq(index);
        ico.css({
            width: currLi.width(),
            height: currLi.height(),
            left: currLi.position().left
        });
        menu.find('li a').removeClass('curr');
        currLi.find('a').attr('class', 'curr');
    }

    menu.on('mouseenter', 'li', function () {
        var index = $(this).index();
        menuActive(index);
    }).on('mouseleave', function () {
        menuActive(currIndex);
    })
})(1);