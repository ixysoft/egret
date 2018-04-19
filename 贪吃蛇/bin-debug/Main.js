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
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.index = 0;
        _this.dir = Direct.Up;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function () {
        var _this = this;
        this.sw = this.stage.stageWidth;
        this.sh = this.stage.stageHeight;
        var bg = new egret.Sprite();
        bg.graphics.beginFill(0x000);
        bg.graphics.drawRect(0, 0, this.sw, this.sw);
        bg.graphics.endFill();
        this.addChild(bg);
        this.snake = new Snake();
        var snake = this.snake;
        var dir; //方向
        bg.addChild(this.snake);
        this.last = egret.getTimer();
        egret.startTick(this.main, this);
        this.timer = new egret.Timer(50, 0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, function (e) {
            var tm = egret.getTimer();
            if (tm - _this.last > 100) {
                if (snake.cur_x > snake.food_x) {
                    if (snake.canMove(Direct.Left))
                        dir = Direct.Left;
                    else if (snake.canMove(Direct.Right))
                        dir = Direct.Right;
                    else if (snake.canMove(Direct.Up))
                        dir = Direct.Up;
                    else if (snake.canMove(Direct.Down))
                        dir = Direct.Down;
                    else
                        snake.die = true;
                }
                else if (snake.cur_y < snake.food_y) {
                    if (snake.canMove(Direct.Down))
                        dir = Direct.Down;
                    else if (snake.canMove(Direct.Left))
                        dir = Direct.Left;
                    else if (snake.canMove(Direct.Right))
                        dir = Direct.Right;
                    else if (snake.canMove(Direct.Up))
                        dir = Direct.Up;
                    else
                        snake.die = true;
                }
                else if (snake.cur_x < snake.food_x) {
                    if (snake.canMove(Direct.Right))
                        dir = Direct.Right;
                    else if (snake.canMove(Direct.Left))
                        dir = Direct.Left;
                    else if (snake.canMove(Direct.Up))
                        dir = Direct.Up;
                    else if (snake.canMove(Direct.Down))
                        dir = Direct.Down;
                    else
                        snake.die = true;
                }
                else if (snake.cur_y > snake.food_y) {
                    if (snake.canMove(Direct.Up))
                        dir = Direct.Up;
                    else if (snake.canMove(Direct.Left))
                        dir = Direct.Left;
                    else if (snake.canMove(Direct.Right))
                        dir = Direct.Right;
                    else if (snake.canMove(Direct.Down))
                        dir = Direct.Down;
                    else
                        snake.die = true;
                }
                else if (!snake.eating()) {
                    snake.die = true;
                }
                if (snake.die)
                    _this.goDie();
                snake.move(dir);
                _this.last = tm;
            }
        }, this);
        this.timer.start();
    };
    /**
     * 死亡时处理
     */
    Main.prototype.goDie = function () {
        console.log('死亡时的状态:');
        console.log(this.snake);
        this.timer.stop();
    };
    Main.prototype.main = function (tm) {
        return false;
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map