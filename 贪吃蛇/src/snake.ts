/**
 * 贪吃蛇游戏
 * 方法:
 * addBlock:添加一个新块
 * removeTail:删除尾部
 * move:移动
 */

/**
 * 方向
 */
enum Direct{
    None,
    Left,
    Up,
    Down,
    Right
};

class Snake extends egret.Sprite{
    //头尾节点
    private head:Block;
    private tail:Block;

    private head_next:Block;//头结点的下一个节点

    //可用区域
    private avail:Array<number>;
    //当前的位置
    cur_x:number;
    cur_y:number;
    //屏幕宽高
    private sw:number;
    private sh:number;
    //地图规模
    private mapw:number;
    private maph:number;
    //贴图宽高
    private cell:number;
    public die:boolean;

    public snake_length:number;    //蛇长
    public move_dir:Direct;//移动方向缓存
    public constructor(){
        super();

        this.sw = egret.MainContext.instance.stage.stageWidth;
        this.sh = egret.MainContext.instance.stage.stageHeight;
        this.cell = this.sw/24;

        this.avail = new Array();
        for(var i=0;i<24;i++)
            for(var j = 0;j<24;j++)
                this.avail.push(i*24+j);
        this.cur_x = 12;
        this.cur_y = 12;

        this.die = false;

        this.snake_length = 0;

        this.addBlock();
        this.addBlock(Direct.Up);

        this.updateFood();
    }

    /**
     * 添加一个新块
     */
    private addBlock(dir:Direct = Direct.None):egret.Sprite{
        var block = new Block();
        this.snake_length++;
        this.head = block;
        this.move_dir = dir;
        switch(dir){
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

        var index = this.cur_y*24 + this.cur_x;
        var pos=this.avail.indexOf(index);
        console.log('pos='+pos+',index='+index);
        var leave=this.avail.splice(pos,1);  //删除蛇头占用的可用域位置
        console.log('删除可用位置:['+(leave[0] % 24) + ',' + Math.floor(leave[0] / 24)+ ']' + leave);

        block.next = this.head_next;
        if(this.head_next){ //非第一个节点
            block.next.prev  = block;
        }
        this.head_next = block; //将当前节点放入缓存
        block.x = this.cur_x*this.cell;
        block.y = this.cur_y*this.cell;
        block.curX = this.cur_x;
        block.curY = this.cur_y;
        block.index = index;
        block.graphics.beginFill(0xffffff);
        block.graphics.drawCircle(this.cell / 2,this.cell/2,this.cell / 2);
        block.graphics.endFill();
        this.addChild(block);

        return this;
    }

    /**
     * 删除尾部
     */
    private removeTail():egret.Sprite{
        var tmp:Block = null;
        if(this.tail) tmp = this.tail.prev;

        var index=this.tail.index;
        this.avail.push(index);//将元素加入可用域

        this.removeChild(this.tail);    //删除尾部
        this.tail = tmp;
        this.snake_length--;
        return this;
    }

    /**
     * 移动蛇身
     */
    public move(dir:Direct,updateTail:boolean = true):egret.Sprite{
        if(!this.die && dir){
            this.addBlock(dir);
            var eating=this.eating();
            if(updateTail && !eating){
                this.removeTail();
            }else if(eating){
                this.updateFood();
            }
        }
        return this;
    }

    /**
     * 更新食物位置
     */
    public food_x:number;
    public food_y:number;
    private food:egret.Shape;
    public updateFood():egret.Sprite{
        var l=this.avail.length;
        var index = this.avail[Math.floor(Math.random()*l)];
        this.food_y = Math.floor(index/24);
        this.food_x = index % 24;
        console.log('食物位置:['+this.food_x+','+this.food_y+']');

        if(this.food == null){
            var food = new egret.Shape();
            food.graphics.beginFill(0x800000);
            food.graphics.drawRect(0,0,this.cell,this.cell);
            food.graphics.endFill();
            this.food = food;
            this.addChild(food);
        }
        this.food.x = this.food_x * this.cell;
        this.food.y = this.food_y * this.cell;
        return this;
    }
    
    /**
     * 获取蛇头的下一个假设位置
     */
    private getIndex(dir:Direct):number{
        var n:number;
        var outside:boolean = false;
        //这里存在bug,原因:当x值小于0时,由于这里只是单纯的-1,+1所以整体会出现正值,导致程序出错
        switch(dir){
            case Direct.Up:
                if(this.head.curY == 0) outside = true;
                n = -24;
            break;
            case Direct.Down:
                if(this.head.curY == 23) outside = true;
                n = 24;
            break;
            case Direct.Left:
                if(this.head.curX == 0) outside = true;
                n = -1;
            break;
            case Direct.Right:
                if(this.head.curX == 23) outside = true;
                n = 1;
            break;
        }

        return outside?-1:(this.head.index + n);
    }

    /**
     * 判断是否正在进食
     */
    public eating():boolean{
        return this.head.hitTestPoint(this.food.x+this.cell/2,this.food.y+this.cell/2);
    }

    /**
     * 判断是否可以前进
     * dir:当前移动方向
     */
    public canMove(dir:Direct):boolean{
        var index=this.avail.indexOf(this.getIndex(dir));
        if(this.move_dir + dir == 5)    //方向相反
            return false;
        if( index < 0)  //不在可用域中
            return false;
        return true;
    }

}

class Block extends egret.Shape{

    public constructor(){
        super();
        this.prev = this.next = null;//初始化前后节点
    }

    //
    private _prev : Block;
    public get prev() : Block {
        return this._prev;
    }
    public set prev(v : Block) {
        this._prev = v;
    }
    
    private _next : Block;
    public get next() : Block {
        return this._next;
    }
    public set next(v : Block) {
        this._next = v;
    }

    /**
     * 当前地图坐标
     */
    private _curX : number;
    public get curX() : number {
        return this._curX;
    }
    public set curX(v : number) {
        this._curX = v;
    }

    
    private _curY : number;
    public get curY() : number {
        return this._curY;
    }
    public set curY(v : number) {
        this._curY = v;
    }
    
    
    private _index : number;
    public get index() : number {
        return this._index;
    }
    public set index(v : number) {
        this._index = v;
    }
    
}
