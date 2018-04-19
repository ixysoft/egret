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
 * 棋盘类
 */
var ChessBoard = (function (_super) {
    __extends(ChessBoard, _super);
    function ChessBoard(w, h, bgCol, cols, rows) {
        if (w === void 0) { w = 0; }
        if (h === void 0) { h = 0; }
        if (bgCol === void 0) { bgCol = 0xeedc82; }
        if (cols === void 0) { cols = 15; }
        if (rows === void 0) { rows = 15; }
        var _this = _super.call(this) || this;
        var lines = new egret.Shape;
        _this.lines = lines;
        var width = egret.MainContext.instance.stage.stageWidth;
        var height = egret.MainContext.instance.stage.stageHeight;
        _this.chessMen = new Array();
        if (w <= 0)
            w = egret.MainContext.instance.stage.stageWidth;
        if (h <= 0)
            h = w;
        _this.x = (width - w) / 2;
        _this.y = _this.x;
        _this.scale_w = w;
        _this.scale_h = h;
        _this.linePadding = w / cols / 2;
        _this.board_col = cols;
        _this.board_row = rows;
        _this.cell_w = (_this.scale_w - _this.linePadding * 2) / (_this.board_col - 1);
        _this.cell_h = (_this.scale_h - _this.linePadding * 2) / (_this.board_row - 1);
        _this.lineCol = 0x000;
        _this.bgCol = bgCol;
        //绘制棋盘
        _this.graphics.beginFill(bgCol);
        _this.graphics.drawRect(0, 0, _this.scale_w, _this.scale_h);
        _this.graphics.endFill();
        /**
         * 绘制线条
         */
        lines.graphics.lineStyle(2, _this.lineCol);
        for (var i = 0; i < _this.board_col; i++) {
            lines.graphics.moveTo(_this.linePadding + _this.cell_w * i, _this.linePadding);
            lines.graphics.lineTo(_this.linePadding + _this.cell_w * i, _this.scale_h - _this.linePadding);
        }
        for (var i = 0; i < _this.board_row; i++) {
            lines.graphics.moveTo(_this.linePadding, _this.linePadding + _this.cell_h * i);
            lines.graphics.lineTo(_this.scale_h - _this.linePadding, _this.linePadding + _this.cell_h * i);
        }
        lines.graphics.endFill();
        _this.addChildAt(lines, 1);
        return _this;
    }
    return ChessBoard;
}(egret.Sprite));
__reflect(ChessBoard.prototype, "ChessBoard");
//# sourceMappingURL=ChessBoard.js.map