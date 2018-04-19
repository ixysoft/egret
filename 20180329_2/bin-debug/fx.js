/**
 * 图形命名空间
 */
var graph;
(function (graph) {
    var obj;
    /**
     * 图形初始化
     * @param obj: 传入的DisplayObjectContainer对象
     */
    function init(obj) {
        this.obj = obj;
        this.paper = new egret.Sprite();
        this.paper.width = obj.stage.width;
        this.paper.height = obj.stage.height;
        obj.addChild(this.paper);
        return this.paper;
    }
    graph.init = init;
    /**
     * 清屏函数
     */
    function cls() {
        this.paper.removeChildren();
        this.paper.graphics.beginFill(0xffffff);
        this.paper.graphics.drawRect(0, 0, this.width, this.height);
        this.paper.graphics.endFill();
    }
    graph.cls = cls;
    /**
     * 矩形绘制函数
     * x,y: 左上角坐标值
     * width:   矩形的宽度
     * height:  矩形的高度
     * col:     颜色值
     *
     */
    function box(x, y, width, height, col, fill) {
        if (col === void 0) { col = 0x000000; }
        if (fill === void 0) { fill = false; }
        var rect = new egret.Shape();
        fill ? rect.graphics.beginFill(col) : rect.graphics.lineStyle(1, col);
        rect.graphics.drawRect(x, y, width, height);
        rect.graphics.endFill();
        this.paper.addChild(rect);
        return rect;
    }
    graph.box = box;
    graph.rect = box;
    function circle(x, y, r, col, fill) {
        if (col === void 0) { col = 0x000; }
        if (fill === void 0) { fill = false; }
        var c = new egret.Shape();
        fill ? c.graphics.beginFill(col) : c.graphics.lineStyle(1, col);
        c.graphics.drawCircle(x, y, r);
        c.graphics.endFill();
        this.paper.addChild(c);
        return c;
    }
    graph.circle = circle;
    function ellipse(x, y, ra, rb, col, fill) {
        if (col === void 0) { col = 0x000; }
        if (fill === void 0) { fill = false; }
        var e = new egret.Shape();
        fill ? e.graphics.beginFill(col) : e.graphics.lineStyle(1, col);
        e.graphics.drawEllipse(x, y, ra, rb);
        e.graphics.endFill();
        this.paper.addChild(e);
        return e;
    }
    graph.ellipse = ellipse;
    function arc(x, y, r, st, en, col, fill, dir) {
        if (col === void 0) { col = 0x000; }
        if (fill === void 0) { fill = false; }
        if (dir === void 0) { dir = false; }
        var a = new egret.Shape();
        fill ? a.graphics.beginFill(col) : a.graphics.lineStyle(1, col);
        a.graphics.drawArc(x, y, r, st, en, dir);
        a.graphics.endFill();
        this.paper.addChild(a);
        return a;
    }
    graph.arc = arc;
    function curvo(x1, y1, x2, y2, x, y, col, fill) {
        if (col === void 0) { col = 0x000; }
        if (fill === void 0) { fill = false; }
        var c = new egret.Shape();
        fill ? c.graphics.beginFill(col) : c.graphics.lineStyle(1, col);
        c.graphics.moveTo(x1, y1);
        c.graphics.curveTo(x, y, x2, y2);
        c.graphics.endFill();
        this.paper.addChild(c);
        return c;
    }
    graph.curvo = curvo;
    function draw(x, y, str, size, col, halign, valign) {
        if (size === void 0) { size = 12; }
        if (col === void 0) { col = 0x000; }
        if (halign === void 0) { halign = egret.HorizontalAlign.LEFT; }
        if (valign === void 0) { valign = egret.VerticalAlign.TOP; }
        var t = new egret.TextField();
        t.text = str;
        t.size = size;
        t.textColor = col;
        t.textAlign = halign;
        t.verticalAlign = valign;
        this.paper.addChild(t);
        return t;
    }
    graph.draw = draw;
    /**
     * red:     红色属性深度
     * green:   绿色属性深度
     * blue:    蓝色属性深度
     * 返回值:   组合颜色值
     * 这个函数在Color命名空间也有定义
     */
    function rgb(red, green, blue) {
        return red << 16 | green << 8 | blue;
    }
    graph.rgb = rgb;
    /**
     * 与触摸相关的坐标值
     * startX,startY:   刚刚触摸时的坐标
     * curX,curY:   当前的坐标
     * endX,endY:   离开时的坐标
     */
    var startX, startY;
    var curX, curY;
    var endX, endY;
    function onStartMove(func) {
        var _this = this;
        if (func === void 0) { func = null; }
        this.obj.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (event) {
            _this.startX = event.stageX;
            _this.startY = event.stageY;
            _this.curX = event.stageX;
            _this.curY = event.stageY;
            if (func)
                func();
        }, this.obj);
    }
    graph.onStartMove = onStartMove;
    /**
     * 移动时的操作
     */
    function onMove(func) {
        var _this = this;
        if (func === void 0) { func = null; }
        this.obj.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, function (event) {
            _this.curX = event.stageX;
            _this.curY = event.stageY;
            if (func)
                func(event);
        }, this.obj);
    }
    graph.onMove = onMove;
    function onEndMove(func) {
        var _this = this;
        if (func === void 0) { func = null; }
        this.obj.stage.addEventListener(egret.TouchEvent.TOUCH_END, function (event) {
            _this.endX = event.stageX;
            _this.endY = event.stageY;
            _this.curX = event.stageX;
            _this.curY = event.stageY;
            if (func)
                func();
        }, this.obj);
    }
    graph.onEndMove = onEndMove;
    function getPos(which) {
        if (which === void 0) { which = 0; }
        if (1 == which)
            return [this.startX, this.startY];
        else if (2 == which)
            return [this.endX, this.endY];
        else
            return [this.curX, this.curY];
    }
    graph.getPos = getPos;
})(graph || (graph = {}));
var gr = graph;
var G = graph;
//# sourceMappingURL=fx.js.map