/**
 * 贪吃蛇游戏
 * 方法:
 * addBlock:添加一个新块
 * removeTail:删除尾部
 * move:移动
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
/**
 * 方向
 */
var Direct;
(function (Direct) {
    Direct[Direct["None"] = 0] = "None";
    Direct[Direct["Left"] = 1] = "Left";
    Direct[Direct["Up"] = 2] = "Up";
    Direct[Direct["Down"] = 3] = "Down";
    Direct[Direct["Right"] = 4] = "Right";
})(Direct || (Direct = {}));
;
var Snake = (function (_super) {
    __extends(Snake, _super);
    function Snake() {
        var _this = _super.call(this) || this;
        _this.sw = egret.MainContext.instance.stage.stageWidth;
        _this.sh = egret.MainContext.instance.stage.stageHeight;
        _this.cell = _this.sw / 24;
        _this.avail = new Array();
        for (var i = 0; i < 24; i++)
            for (var j = 0; j < 24; j++)
                _this.avail.push(i * 24 + j);
        _this.cur_x = 12;
        _this.cur_y = 12;
        _this.die = false;
        _this.snake_length = 0;
        _this.addBlock();
        _this.addBlock(Direct.Up);
        _this.updateFood();
        return _this;
    }
    /**
     * 添加一个新块
     */
    Snake.prototype.addBlock = function (dir) {
        if (dir === void 0) { dir = Direct.None; }
        var block = new Block();
        this.snake_length++;
        this.head = block;
        this.move_dir = dir;
        switch (dir) {
            case Direct.None:
                this.tail = block;
                break;
            case Direct.Left:
                this.cur_x--;
                break;
            case Direct.Right:
                this.cur_x++;
                break;
            case Direct.Up:
                this.cur_y--;
                break;
            case Direct.Down:
                this.cur_y++;
                break;
        }
        var index = this.cur_y * 24 + this.cur_x;
        var pos = this.avail.indexOf(index);
        console.log('pos=' + pos + ',index=' + index);
        var leave = this.avail.splice(pos, 1); //删除蛇头占用的可用域位置
        console.log('删除可用位置:[' + (leave[0] % 24) + ',' + Math.floor(leave[0] / 24) + ']' + leave);
        block.next = this.head_next;
        if (this.head_next) {
            block.next.prev = block;
        }
        this.head_next = block; //将当前节点放入缓存
        block.x = this.cur_x * this.cell;
        block.y = this.cur_y * this.cell;
        block.curX = this.cur_x;
        block.curY = this.cur_y;
        block.index = index;
        block.graphics.beginFill(0xffffff);
        block.graphics.drawCircle(this.cell / 2, this.cell / 2, this.cell / 2);
        block.graphics.endFill();
        this.addChild(block);
        return this;
    };
    /**
     * 删除尾部
     */
    Snake.prototype.removeTail = function () {
        var tmp = null;
        if (this.tail)
            tmp = this.tail.prev;
        var index = this.tail.index;
        this.avail.push(index); //将元素加入可用域
        this.removeChild(this.tail); //删除尾部
        this.tail = tmp;
        this.snake_length--;
        return this;
    };
    /**
     * 移动蛇身
     */
    Snake.prototype.move = function (dir, updateTail) {
        if (updateTail === void 0) { updateTail = true; }
        if (!this.die && dir) {
            this.addBlock(dir);
            var eating = this.eating();
            if (updateTail && !eating) {
                this.removeTail();
            }
            else if (eating) {
                this.updateFood();
            }
        }
        return this;
    };
    Snake.prototype.updateFood = function () {
        var l = this.avail.length;
        var index = this.avail[Math.floor(Math.random() * l)];
        this.food_y = Math.floor(index / 24);
        this.food_x = index % 24;
        console.log('食物位置:[' + this.food_x + ',' + this.food_y + ']');
        if (this.food == null) {
            var food = new egret.Shape();
            food.graphics.beginFill(0x800000);
            food.graphics.drawRect(0, 0, this.cell, this.cell);
            food.graphics.endFill();
            this.food = food;
            this.addChild(food);
        }
        this.food.x = this.food_x * this.cell;
        this.food.y = this.food_y * this.cell;
        return this;
    };
    /**
     * 获取蛇头的下一个假设位置
     */
    Snake.prototype.getIndex = function (dir) {
        var n;
        var outside = false;
        //这里存在bug,原因:当x值小于0时,由于这里只是单纯的-1,+1所以整体会出现正值,导致程序出错
        switch (dir) {
            case Direct.Up:
                if (this.head.curY == 0)
                    outside = true;
                n = -24;
                break;
            case Direct.Down:
                if (this.head.curY == 23)
                    outside = true;
                n = 24;
                break;
            case Direct.Left:
                if (this.head.curX == 0)
                    outside = true;
                n = -1;
                break;
            case Direct.Right:
                if (this.head.curX == 23)
                    outside = true;
                n = 1;
                break;
        }
        return outside ? -1 : (this.head.index + n);
    };
    /**
     * 判断是否正在进食
     */
    Snake.prototype.eating = function () {
        return this.head.hitTestPoint(this.food.x + this.cell / 2, this.food.y + this.cell / 2);
    };
    /**
     * 判断是否可以前进
     * dir:当前移动方向
     */
    Snake.prototype.canMove = function (dir) {
        var index = this.avail.indexOf(this.getIndex(dir));
        if (this.move_dir + dir == 5)
            return false;
        if (index < 0)
            return false;
        return true;
    };
    return Snake;
}(egret.Sprite));
__reflect(Snake.prototype, "Snake");
var Block = (function (_super) {
    __extends(Block, _super);
    function Block() {
        var _this = _super.call(this) || this;
        _this.prev = _this.next = null; //初始化前后节点
        return _this;
    }
    Object.defineProperty(Block.prototype, "prev", {
        get: function () {
            return this._prev;
        },
        set: function (v) {
            this._prev = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Block.prototype, "next", {
        get: function () {
            return this._next;
        },
        set: function (v) {
            this._next = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Block.prototype, "curX", {
        get: function () {
            return this._curX;
        },
        set: function (v) {
            this._curX = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Block.prototype, "curY", {
        get: function () {
            return this._curY;
        },
        set: function (v) {
            this._curY = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Block.prototype, "index", {
        get: function () {
            return this._index;
        },
        set: function (v) {
            this._index = v;
        },
        enumerable: true,
        configurable: true
    });
    return Block;
}(egret.Shape));
__reflect(Block.prototype, "Block");
//# sourceMappingURL=snake.js.map