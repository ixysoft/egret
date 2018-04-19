/**
 * 棋子类
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
var ChessMan = (function (_super) {
    __extends(ChessMan, _super);
    function ChessMan(role, x, y, r) {
        if (r === void 0) { r = 20; }
        var _this = _super.call(this) || this;
        _this.role = role;
        _this.r = r;
        _this.blackChess = 0x000000;
        _this.whiteChess = 0xffffff;
        _this.x = x;
        _this.y = y;
        _this.name = role ? '黑方' : '白方';
        _this.graphics.beginFill(role ? _this.blackChess : _this.whiteChess);
        _this.graphics.drawCircle(0, 0, r);
        _this.graphics.endFill();
        return _this;
    }
    return ChessMan;
}(egret.Shape));
__reflect(ChessMan.prototype, "ChessMan");
//# sourceMappingURL=ChessMan.js.map