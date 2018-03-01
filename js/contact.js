/**
 * Created by Administrator on 2017/3/31 0031.
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
})(3);
//---------------百度地图API----------------->>
//创建和初始化地图函数：
function initMap() {
    createMap();//创建地图
    setMapEvent();//设置地图事件
    addMapControl();//向地图添加控件
    addMarker();//向地图中添加marker
}
//创建地图函数：
function createMap() {
    var map = new BMap.Map("dituContent");//在百度地图容器中创建一个地图
    var point = new BMap.Point(113.47273, 23.173024);//定义一个中心点坐标
    map.centerAndZoom(point, 16);//设定地图的中心点和坐标并将地图显示在地图容器中
    window.map = map;//将map变量存储在全局
}
//地图事件设置函数：
function setMapEvent() {
    map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
    map.enableScrollWheelZoom();//启用地图滚轮放大缩小
    map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
    map.enableKeyboard();//启用键盘上下左右键移动地图
}
//地图控件添加函数：
function addMapControl() {
    //向地图中添加缩放控件
    var ctrl_nav = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_LEFT, type: BMAP_NAVIGATION_CONTROL_LARGE});
    map.addControl(ctrl_nav);
    //向地图中添加缩略图控件
    var ctrl_ove = new BMap.OverviewMapControl({anchor: BMAP_ANCHOR_BOTTOM_RIGHT, isOpen: 1});
    map.addControl(ctrl_ove);
    //向地图中添加比例尺控件
    var ctrl_sca = new BMap.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT});
    map.addControl(ctrl_sca);
}
//标注点数组
var markerArr = [
    {
        title: "交通路线 ：暹岗圣贤",
        content: "324路；327路；333路；371A路；392路；395路；506路；534路；573路；946路；高峰快线64路；科学城3号交通快线；夜51路",
        point: "113.47264|23.175947",
        isOpen: 0,
        icon: {w: 23, h: 25, l: 46, t: 21, x: 9, lb: 12}
    }
    , {
        title: "交通路线 ：地铁6号线苏元站",
        content: "地铁6号线苏元站",
        point: "113.474581|23.177077",
        isOpen: 0,
        icon: {w: 23, h: 25, l: 46, t: 21, x: 9, lb: 12}
    }
    , {
        title: "交通路线 ：萝岗万达广场总站",
        content: "334路；338路；575路",
        point: "113.47282|23.171196",
        isOpen: 0,
        icon: {w: 23, h: 25, l: 46, t: 21, x: 9, lb: 12}
    }
    , {
        title: "交通路线 ：开泰大道",
        content: "336路；349路；355路；359路；391路；573路；B4A路",
        point: "113.470951|23.168738",
        isOpen: 0,
        icon: {w: 23, h: 25, l: 46, t: 21, x: 9, lb: 12}
    }
    , {
        title: "欢迎光临 ： 广州双动科技有限公司",
        content: "广州双动科技有限公司",
        point: "113.473736|23.175233",
        isOpen: 1,
        icon: {w: 23, h: 25, l: 46, t: 21, x: 9, lb: 12}
    }
];
//创建marker
function addMarker() {
    for (var i = 0; i < markerArr.length; i++) {
        var json = markerArr[i];
        var p0 = json.point.split("|")[0];
        var p1 = json.point.split("|")[1];
        var point = new BMap.Point(p0, p1);
        var iconImg = createIcon(json.icon);
        var marker = new BMap.Marker(point, {icon: iconImg});
        var iw = createInfoWindow(i);
        var label = new BMap.Label(json.title, {"offset": new BMap.Size(json.icon.lb - json.icon.x + 10, -20)});
        marker.setLabel(label);
        map.addOverlay(marker);
        label.setStyle({
            borderColor: "#808080",
            color: "#333",
            cursor: "pointer"
        });

        (function () {
            var index = i;
            var _iw = createInfoWindow(i);
            var _marker = marker;
            _marker.addEventListener("click", function () {
                this.openInfoWindow(_iw);
            });
            _iw.addEventListener("open", function () {
                _marker.getLabel().hide();
            });
            _iw.addEventListener("close", function () {
                _marker.getLabel().show();
            });
            label.addEventListener("click", function () {
                _marker.openInfoWindow(_iw);
            });
            if (!!json.isOpen) {
                label.hide();
                _marker.openInfoWindow(_iw);
            }
        })()
    }
}
//创建InfoWindow
function createInfoWindow(i) {
    var json = markerArr[i];
    var iw = new BMap.InfoWindow("<b class='iw_poi_title' title='" + json.title + "'>" + json.title + "</b><div class='iw_poi_content'>" + json.content + "</div>");
    return iw;
}
//创建一个Icon
function createIcon(json) {
    var icon = new BMap.Icon("http://map.baidu.com/image/us_mk_icon.png", new BMap.Size(json.w, json.h), {
        imageOffset: new BMap.Size(-json.l, -json.t),
        infoWindowOffset: new BMap.Size(json.lb + 5, 1),
        offset: new BMap.Size(json.x, json.h)
    });
    return icon;
}
initMap();//创建和初始化地图