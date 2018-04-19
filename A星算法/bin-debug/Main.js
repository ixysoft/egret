/**
 * A星算法
 * 初始化地图,宽高为w,h
 * 设定一个开启数组和一个关闭数组
 * 循环:
 * 判断是否为终止点,如果是,则结束.
 * 将初始点放入关闭数组中,计算与其相近的8个点的衡量函数
 * 如果点在开启列表中
 *      如果衡量函数的值更小,更新指点点的父节点
 *      否则跳过
 * 如果点不在开启列表中,
 *      加入开启列表
 * 将开启列表中结果的点的父节点设置为当前点
 * 将结果最小的点设置为初始点
 *
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Dot = (function () {
    function Dot(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
        this.g = -1;
        this.h = -1;
        parent = null;
    }
    Object.defineProperty(Dot.prototype, "f", {
        get: function () {
            return this.g + this.h;
        },
        enumerable: true,
        configurable: true
    });
    return Dot;
}());
__reflect(Dot.prototype, "Dot");
var AStar = (function () {
    function AStar() {
        /**
         * 寻路
         */
        this.count = 0; //测试计数
        //初始化数组
        this.opened = new Array();
        this.closed = new Array();
        this.path = new Array();
        //起止点
        this.start = new Dot();
        this.end = new Dot();
        this.map = [
            '++++++++++++++++++',
            '+..s...+....+....+',
            '+..+..++...+++++.+',
            '++.++.....++++++.+',
            '+...++++.........+',
            '+................+',
            '++++++...+++++...+',
            '+......++++....+++',
            '+..++++++++.++++++',
            '++....+++++......+',
            '++++.++++...++++++',
            '+++....+......++++',
            '++++++..+++.++++++',
            '+................+',
            '+++......e...+++++',
            '++++++++++++++++++',
        ];
        for (var j = 0; j < this.map.length; j++) {
            for (var i = 0; i < this.map[j].length; i++) {
                var ch = this.getPos(i, j);
                if (ch == 's') {
                    this.start.x = i;
                    this.start.y = j;
                    this.start.g = 0;
                    this.start.h = this.H(i, j); //初始化评估函数
                }
                else if (ch == 'e') {
                    this.end.x = i;
                    this.end.y = j;
                }
            }
        }
        console.log('start:' + [this.start.x, this.start.y] + ',end:' + [this.end.x, this.end.y]);
    }
    //评估函数
    AStar.prototype.H = function (x, y) {
        return Math.abs(x - this.end.x) + Math.abs(y - this.end.y);
    };
    //获得指定位置的字符
    AStar.prototype.getPos = function (i, j) {
        return this.map[j].charAt(i);
    };
    //查找最小点下标
    AStar.prototype.findMin = function (arr) {
        if (arr == undefined || arr.length == 0)
            return -1;
        var tmp = 0;
        for (var i = arr.length - 1; i > 0; i--) {
            if (arr[i].f < arr[tmp].f)
                tmp = i;
        }
        return tmp;
    };
    //压入点
    AStar.prototype.pushDot = function (arr, d) {
        arr.push(d);
    };
    //根据点下标删除点
    AStar.prototype.dropDot = function (arr, i) {
        arr.splice(i, 1);
    };
    //输出路径
    AStar.prototype.echoPath = function () {
        if (this.minLength < 0) {
            console.log('不存在路径');
            return;
        }
        var base = this.end;
        do {
            this.path.push(base);
            base = base.parent;
        } while (base != null);
        for (var i = this.path.length - 1; i >= 0; i--) {
            console.log('(' + this.path[i].x + ',' + this.path[i].y + ')'); //输出沿途路径点坐标
        }
    };
    //判断点是否可用,不可用,false,可用,查看该点是否在开启数组中,不在则加入开启列表,在则判断是否更优,g为起点到当前点的已知长度
    AStar.prototype.updateDot = function (x, y, dot, g) {
        if (this.getPos(x, y) == '+' || x < 0 || x >= this.map[0].length || y < 0 || y >= this.map.length || this.closed.filter(function (v) { return v.x == x && v.y == y; }).length > 0)
            return false; //不可用
        var tmp = this.opened.filter(function (value) { return value.x == x && value.y == y; });
        if (tmp.length > 0) {
            if (tmp[0].f > g + this.H(x, y))
                tmp[0].g = g; //更新起点到当前点的位置
        }
        var newDot = new Dot(x, y);
        newDot.g = g;
        newDot.h = this.H(x, y);
        newDot.parent = dot;
        console.log('执行'); //--
        this.pushDot(this.opened, newDot); //将当前点压入开启栈
        return true;
    };
    //更新邻居
    AStar.prototype.updateNb = function (dot) {
        //更新四个方向
        this.updateDot(dot.x - 1, dot.y, dot, dot.g + 1);
        this.updateDot(dot.x + 1, dot.y, dot, dot.g + 1);
        this.updateDot(dot.x, dot.y - 1, dot, dot.g + 1);
        this.updateDot(dot.x, dot.y + 1, dot, dot.g + 1);
    };
    AStar.prototype.findPath = function () {
        var base = this.start; //基准点
        var minIndex;
        while (base.x != this.end.x || base.y != this.end.y) {
            this.pushDot(this.closed, base); //将基准点加入关闭数组中
            this.updateNb(base); //更新邻基准点的四个邻居
            minIndex = this.findMin(this.opened);
            this.count++;
            if (minIndex < 0) {
                console.log('遍历了:' + this.count + '个点');
                this.minLength = -1;
                return false; //开放数组中可用点数量为0
            }
            base = this.opened[minIndex];
            this.pushDot(this.closed, base); //将开放数组最小的点放入关闭数组
            this.dropDot(this.opened, minIndex); //将基准点从开放数组中删除
        }
        this.end = base;
        this.minLength = this.end.g; //设置最小长度
        return true;
    };
    return AStar;
}());
__reflect(AStar.prototype, "AStar");
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function () {
        var star = new AStar();
        star.findPath();
        star.echoPath(); //输出路径
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map