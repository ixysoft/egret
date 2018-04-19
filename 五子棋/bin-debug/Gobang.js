/**
 * 五子棋类,主要负责五子棋的逻辑部分
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
var Gobang = (function (_super) {
    __extends(Gobang, _super);
    function Gobang() {
        var _this = _super.call(this) || this;
        var cb = new ChessBoard();
        _this.winText = new egret.TextField();
        _this.winText.text = '';
        _this.winText.size = 50;
        _this.winText.textColor = 0xf00000;
        _this.winText.width = cb.scale_w;
        _this.winText.y = cb.scale_h / 2;
        _this.winText.visible = false;
        _this.winText.textAlign = egret.HorizontalAlign.CENTER;
        cb.addChildAt(_this.winText, 3);
        _this.tmpChess = new ChessMan(true, 0, 0);
        _this.tmpChess.visible = false;
        cb.addChildAt(_this.tmpChess, 2);
        _this.chessBoard = cb;
        _this.addChild(cb);
        _this.role = true;
        /**
         * 事件
         */
        cb.touchEnabled = true;
        cb.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
            if (_this.winner != null)
                return;
            _this.tmpChess.graphics.clear();
            _this.tmpChess.graphics.beginFill(_this.role ? _this.tmpChess.blackChess : _this.tmpChess.whiteChess);
            _this.tmpChess.graphics.drawCircle(0, 0, _this.tmpChess.r);
            _this.tmpChess.graphics.endFill();
            _this.update_tmp_pos(e);
            _this.tmpChess.visible = true;
        }, _this);
        cb.addEventListener(egret.TouchEvent.TOUCH_MOVE, function (e) {
            if (_this.winner != null)
                return;
            _this.update_tmp_pos(e);
        }, _this);
        cb.addEventListener(egret.TouchEvent.TOUCH_END, function (e) {
            if (_this.winner != null)
                return;
            _this.tmpChess.visible = false;
            if (_this.getPos(_this.cur_x, _this.cur_y) == '空') {
                _this.down(_this.role, _this.cur_x, _this.cur_y);
                if (_this.checkWin())
                    _this.win();
            }
        }, _this);
        return _this;
    }
    //赢界面
    Gobang.prototype.win = function () {
        console.log('赢家为:' + (this.winner ? '黑方' : '白方'));
        this.winText.text = '赢家为:' + (this.winner ? '黑方' : '白方');
        this.winText.visible = true;
    };
    //更新tmp的位置
    Gobang.prototype.update_tmp_pos = function (e) {
        var cb = this.chessBoard;
        this.tmpChess.x = cb.linePadding + Math.round((e.stageX - cb.linePadding) / cb.cell_w) * cb.cell_w;
        this.tmpChess.y = cb.linePadding + Math.round((e.stageY - cb.linePadding) / cb.cell_h) * cb.cell_h;
        this.cur_x = Math.round((e.stageX - cb.linePadding) / cb.cell_w);
        this.cur_y = Math.round((e.stageY - cb.linePadding) / cb.cell_h);
    };
    //获得指定位置的值
    Gobang.prototype.getPos = function (x, y) {
        var bool = this.chessBoard.chessMen.filter(function (v) { return v.cur_x == x && v.cur_y == y; });
        if (bool.length > 0)
            return bool[0].name;
        return '空';
    };
    /**
     * 判断是否存在5子相连
     */
    Gobang.prototype.checkWin = function () {
        var count = [0, 0, 0, 0]; //四个方向的数字
        var dir = [1, 1, 1, 1, 1, 1, 1, 1];
        var name = this.role ? '黑方' : '白方';
        var _a = [this.cur_x, this.cur_y], x = _a[0], y = _a[1];
        //左右
        for (var i = 1; i < 5; i++) {
            //左右
            if (dir[0] && count[0] < 5 && x - i >= 0)
                if (this.getPos(x - i, y) == name)
                    count[0]++;
                else
                    dir[0] = 0;
            if (dir[1] && count[0] < 5 && x + i < this.chessBoard.board_col)
                if (this.getPos(x + i, y) == name)
                    count[0]++;
                else
                    dir[1] = 0;
            //上下
            if (dir[2] && count[1] < 5 && y - i >= 0)
                if (this.getPos(x, y - i) == name)
                    count[1]++;
                else
                    dir[2] = 0;
            if (dir[3] && count[1] < 5 && y + i < this.chessBoard.board_col)
                if (this.getPos(x, y + i) == name)
                    count[1]++;
                else
                    dir[3] = 0;
            //左上
            if (dir[4] && count[0] < 5 && x - i >= 0 && y + i < this.chessBoard.board_row)
                if (this.getPos(x - i, y + i) == name)
                    count[2]++;
                else
                    dir[4] = 0;
            if (dir[5] && count[0] < 5 && x + i < this.chessBoard.board_col && y - i >= 0)
                if (this.getPos(x + i, y - i) == name)
                    count[2]++;
                else
                    dir[5] = 0;
            //右上
            if (dir[6] && count[1] < 5 && y - i >= 0 && x + i < this.chessBoard.board_col)
                if (this.getPos(x, y - i) == name)
                    count[3]++;
                else
                    dir[6] = 0;
            if (dir[7] && count[1] < 5 && y + i < this.chessBoard.board_col && x - i >= 0)
                if (this.getPos(x, y + i) == name)
                    count[3]++;
                else
                    dir[7] = 0;
        }
        console.log(count);
        //如果存在大于等于4的值,说明已经存在5子状态
        if (count.filter(function (v) { return v >= 4; }).length > 0) {
            console.log(this.role);
            this.winner = this.role;
            return true;
        }
        this.role = !this.role;
        return false;
    };
    Gobang.prototype.down = function (role, x, y) {
        var r = this.chessBoard.cell_w / 2 - 2;
        var cx = x * this.chessBoard.cell_w + this.chessBoard.linePadding;
        var cy = y * this.chessBoard.cell_h + this.chessBoard.linePadding;
        var chess = new ChessMan(role, cx, cy, r);
        chess.cur_x = x;
        chess.cur_y = y;
        this.chessBoard.chessMen.push(chess);
        this.addChildAt(chess, 1);
    };
    return Gobang;
}(egret.Sprite));
__reflect(Gobang.prototype, "Gobang");
//# sourceMappingURL=Gobang.js.map