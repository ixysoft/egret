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
        var astar = new AStar(this.snake); //A星对象
        this.astar = astar;
        astar.start = new Dot(this.snake.cur_x, this.snake.cur_y); //蛇头位置
        astar.end = new Dot(this.snake.food_x, this.snake.food_y); //终止点位置
        bg.addChild(this.snake);
        this.last = egret.getTimer();
        egret.startTick(this.main, this);
        this.timer = new egret.Timer(50, 0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, function (e) {
            var tm = egret.getTimer();
            if (tm - _this.last > 100) {
                //根据找到的路径进行运动
                _this.updatePos(); //更新位置
                var ok = astar.findPath();
                var path = astar.path;
                if (ok) {
                    astar.echoPath();
                    var t = path.length - 1;
                    if (snake.cur_x < path[t].x)
                        dir = Direct.Right;
                    else if (snake.cur_x > path[t].x)
                        dir = Direct.Left;
                    else if (snake.cur_y < path[t].y)
                        dir = Direct.Down;
                    else if (snake.cur_y > path[t].y)
                        dir = Direct.Up;
                }
                //判断当前方向的下一个位置是否为不可动位置
                snake.move(dir);
                snake.die = (_this.astar.getPos(snake.cur_x, snake.cur_y) == '+'); //只有当触碰到自己的身体时,才表示结束
                if (snake.die)
                    _this.goDie();
                _this.last = tm;
            }
        }, this);
        this.timer.start();
    };
    Main.prototype.updatePos = function () {
        //更新起点和终点的位置
        var astar = this.astar;
        astar.start.x = this.snake.head.curX;
        astar.start.y = this.snake.head.curY;
        astar.end.x = this.snake.food_x;
        astar.end.y = this.snake.food_y;
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