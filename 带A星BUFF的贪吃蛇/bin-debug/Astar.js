var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
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
    function AStar(snake) {
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
        this.snake = snake;
    }
    //评估函数
    AStar.prototype.H = function (x, y) {
        return Math.abs(x - this.end.x) + Math.abs(y - this.end.y);
    };
    //获得指定位置的字符
    AStar.prototype.getPos = function (i, j) {
        var _this = this;
        //        this.snake.ch$children
        //        return this.snake.filters(value=>{value.}
        if (this.snake.$children.filter(function (v) { return v.name == 'block' && i == _this.snake.head.curX && j == _this.snake.head.curY; }).length > 0)
            return 's';
        else if (this.snake.$children.filter(function (v) { return v.name == 'block' && v.curX == i && v.curY == j; }).length > 0) {
            return '+';
        }
        else if (this.snake.$children.filter(function (v) { return v.name == 'food' && _this.snake.food_x == i && _this.snake.food_y == j; }).length > 0)
            return 'e';
        return '.';
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
    AStar.prototype.echoPath = function (show) {
        if (show === void 0) { show = false; }
        if (this.minLength < 0) {
            console.log('不存在路径');
            return;
        }
        var base = this.end;
        this.path.length = 0; //清空数组
        do {
            this.path.push(base);
            base = base.parent;
        } while (base != this.start);
        if (show == false)
            return;
        for (var i = this.path.length - 1; i >= 0; i--) {
            console.log('(' + this.path[i].x + ',' + this.path[i].y + ')'); //输出沿途路径点坐标
        }
    };
    //判断点是否可用,不可用,false,可用,查看该点是否在开启数组中,不在则加入开启列表,在则判断是否更优,g为起点到当前点的已知长度
    AStar.prototype.updateDot = function (x, y, dot, g) {
        if (this.getPos(x, y) == '+' || x < 0 || x >= this.snake.mapw || y < 0 || y >= this.snake.maph || this.closed.filter(function (v) { return v.x == x && v.y == y; }).length > 0)
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
        this.pushDot(this.opened, newDot); //将当前点压入开启栈
        return true;
    };
    //更新邻居
    AStar.prototype.updateNb = function (dot) {
        //更新四个方向
        this.updateDot(dot.x, dot.y - 1, dot, dot.g + 1); //上
        this.updateDot(dot.x + 1, dot.y, dot, dot.g + 1); //右
        this.updateDot(dot.x, dot.y + 1, dot, dot.g + 1); //下
        this.updateDot(dot.x - 1, dot.y, dot, dot.g + 1); //左
    };
    AStar.prototype.findPath = function () {
        var base = this.start; //基准点
        var minIndex;
        this.closed.length = 0;
        this.opened.length = 0;
        while (base.x != this.end.x || base.y != this.end.y) {
            this.pushDot(this.closed, base); //将基准点加入关闭数组中
            this.updateNb(base); //更新邻基准点的四个邻居
            minIndex = this.findMin(this.opened);
            this.count++;
            if (minIndex < 0) {
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
//# sourceMappingURL=Astar.js.map