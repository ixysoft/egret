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
/**
 * 封装之后的库
 */
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.addToStage, _this);
        return _this;
    }
    Main.prototype.addToStage = function () {
        var obj = gr.init(this);
        gr.cls();
        gr.box(0, 0, 100, 100, Colors.GREEN, true);
        gr.rect(150, 150, 100, 100, Colors.rgb(50, 50, 50), true);
        gr.draw(100, 100, 'Hello,World!').$setSize(32);
        gr.onMove(function (e) {
            gr.cls();
            gr.box(0, 0, 100, 100, Colors.GREEN, true);
            gr.rect(150, 150, 100, 100, Colors.rgb(50, 50, 50), true);
            //this.mask=
            gr.circle(e.stageX, e.stageY, 50, C.RED, true);
        });
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map