/**
 * Created by Administrator on 2017/3/29 0029.
 * QFJ -- 1324893946.
 */
function scrollPic() {
    var scrollPic = new ScrollPic();
    scrollPic.scrollContId = "scrollPic"; //内容容器ID
    scrollPic.arrLeftId = "LeftArr";//左箭头ID
    scrollPic.arrRightId = "RightArr"; //右箭头ID
    scrollPic.frameWidth = 942;//显示框宽度
    scrollPic.pageWidth = 314; //翻页宽度
    scrollPic.speed = 30; //移动速度(单位毫秒，越小越快)
    scrollPic.space = 20; //每次移动像素(单位px，越大越快)
    scrollPic.autoPlay = true; //自动播放
    scrollPic.autoPlayTime = 5; //自动播放间隔时间(秒)
    scrollPic.initialize(); //初始化
}
scrollPic();

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
})(0);

function getStyle(obj,name){// --  运动框架  --
    if(obj.currentStyle){
        return obj.currentStyle[name];
    } else{
        return getComputedStyle(obj,false)[name];
    }
}

function startMove(obj, json, fnEnd) {// --  运动框架  --
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var bStop = true;
        for (var attr in json) {
            var cur = 0;
            if (attr == "opacity") {
                cur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
            } else {
                cur = parseInt(getStyle(obj, attr))
            }
            var speed = (json[attr] - cur) / 10;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            if (cur !== json[attr]) {
                bStop = false;
            }
            if (attr == "opacity") {
                obj.style.opacity = (speed + cur) / 100;
                obj.style.filter = 'alpha(opacity:' + (speed + cur) + ')';
            } else {
                obj.style[attr] = cur + speed + 'px';
            }
        }
        if (bStop) {
            clearInterval(obj.timer);
            if (fnEnd) fnEnd();
        }
    }, 35)
}

var wrap = document.getElementById('wrap');
var content = document.getElementById('content');
var tips = document.getElementById('tips');
var aLi = tips.getElementsByTagName('li');
var now = 0;

for (var i = 0; i < aLi.length; i++) {
    aLi[0].className = 'active';
    content.style.left = 0 +'px';
    aLi[i].index = i;
    aLi[i].onclick = function() {
        now = this.index;
        play();
    }
}

function play() {
    for (var j = 0; j < aLi.length; j++) {
        aLi[j].className = '';
    }
    aLi[now].className = 'active';

    startMove(content, {
        left: -1920 * now
    });
}

function autoPlay() {
    now++;
    if (now == aLi.length) {
        now = 0;
    }
    play();
}

var timer = setInterval(autoPlay, 4000);
wrap.onmouseover = function(){
    clearInterval(timer);
};
wrap.onmouseout = function(){
    timer = setInterval(autoPlay,4000);
};

window.console && window.console.log && (console.log("一张网页，要经历怎样的过程，才能抵达用户面前？\n一位新人，要经历怎样的成长，才能站在技术之巅？\n探寻这里的秘密；\n体验这里的挑战；\n成为这里的主人；\n加入双动，加入网页搜索，你，可以影响世界。\n"), console.log("请将简历发送至 %c toodo@toodo.com.cn（ 邮件标题请以“姓名-应聘XX职位-来自console”命名）", "color:red"));