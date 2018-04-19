class Dot{
    //当前点的位置
    public x:number;
    public y:number;
    public g:number;    //起点到当前点的长度
    public h:number;    //当前点到终点的评估长度
    public parent:Dot;  //父节点

    public get f():number{
        return this.g+this.h;
    }

    public constructor(x:number=0,y:number=0){
        this.x = x;
        this.y = y;
        this.g = -1;
        this.h = -1;
        parent = null;
    }
}

class AStar{
    /**
     * 开始点
     */
    public start:Dot;
    /**
     * 结束点
     */
    public end:Dot;

    public map:string[];

    //路径数组
    public path:Dot[];
    
    //开启数组和关闭数组
    private closed:Dot[];
    private opened:Dot[];

    public minLength:number;//起点到终点的最短长度

    //评估函数
    private H(x:number,y:number):number{
        return Math.abs(x-this.end.x)+Math.abs(y-this.end.y);
    }

    private snake:Snake;    //当前贪吃蛇

    public constructor(snake:Snake){
        //初始化数组
        this.opened = new Array();
        this.closed = new Array();
        this.path = new Array();
        //起止点
        this.start = new Dot();
        this.end = new Dot();
        this.snake = snake;
    }

    //获得指定位置的字符
    public getPos(i:number,j:number):string{
//        this.snake.ch$children
//        return this.snake.filters(value=>{value.}
        if(this.snake.$children.filter(v=>(<Block>v).name == 'block' && i == this.snake.head.curX && j == this.snake.head.curY).length > 0)
            return 's';
        else if(this.snake.$children.filter(v=>(<Block>v).name == 'block' && (<Block>v).curX == i && (<Block>v).curY == j).length > 0){
            return '+';
        }else if(this.snake.$children.filter(v=>v.name == 'food' && this.snake.food_x == i && this.snake.food_y == j).length > 0)
            return 'e';
        return '.';
    }

    //查找最小点下标
    private findMin(arr:Dot[]):number{
        if(arr == undefined || arr.length == 0) return -1;
        var tmp:number = 0;
        for(var i = arr.length-1;i>0;i--){
            if(arr[i].f < arr[tmp].f ) tmp = i;
        }

        return tmp;
    }

    //压入点
    private pushDot(arr:Dot[],d:Dot):void{
        arr.push(d);
    }

    //根据点下标删除点
    private dropDot(arr:Dot[],i:number):void{
        arr.splice(i,1);
    }

    //输出路径
    public echoPath(show:boolean = false):void{
        if(this.minLength < 0){
            console.log('不存在路径');
            return;
        }
        var base:Dot=this.end;

        this.path.length = 0;   //清空数组
        do{
            this.path.push(base);
            base=base.parent;
        }while(base != this.start);

        if(show == false) return;
        for(var i=this.path.length-1;i>=0;i--){
            console.log('('+this.path[i].x+','+this.path[i].y+')');   //输出沿途路径点坐标
        }
    }

    //判断点是否可用,不可用,false,可用,查看该点是否在开启数组中,不在则加入开启列表,在则判断是否更优,g为起点到当前点的已知长度
    private updateDot(x:number,y:number,dot:Dot,g:number):boolean{
        if(this.getPos(x,y) == '+' || x<0 || x>=this.snake.mapw || y<0 || y>=this.snake.maph || this.closed.filter(v=>v.x==x&&v.y==y).length > 0) return false;//不可用
        var tmp:Dot[] = this.opened.filter(value=>value.x==x&&value.y==y);
        if(tmp.length > 0){//开放列表中存在该点
            if(tmp[0].f > g+this.H(x,y))
                tmp[0].g = g;   //更新起点到当前点的位置
        }
        var newDot:Dot = new Dot(x,y);
        newDot.g = g;
        newDot.h = this.H(x,y);
        newDot.parent = dot;

        this.pushDot(this.opened,newDot);   //将当前点压入开启栈

        return true;
    }

    //更新邻居
    private updateNb(dot:Dot):void{
        //更新四个方向
        this.updateDot(dot.x,dot.y-1,dot,dot.g+1);  //上
        this.updateDot(dot.x+1,dot.y,dot,dot.g+1);  //右
        this.updateDot(dot.x,dot.y+1,dot,dot.g+1);  //下
        this.updateDot(dot.x-1,dot.y,dot,dot.g+1);  //左
    }


    /**
     * 寻路
     */
    private count:number = 0;   //测试计数
    public findPath():boolean{
        var base:Dot = this.start;    //基准点
        var minIndex:number;

        this.closed.length = 0;
        this.opened.length = 0;
        while(base.x != this.end.x || base.y != this.end.y){
            this.pushDot(this.closed,base);  //将基准点加入关闭数组中
            this.updateNb(base);//更新邻基准点的四个邻居
            minIndex=this.findMin(this.opened);
            this.count++;
            if(minIndex<0){
                this.minLength = -1;
                return false;    //开放数组中可用点数量为0
            }
            base = this.opened[minIndex];
            this.pushDot(this.closed,base);//将开放数组最小的点放入关闭数组
            this.dropDot(this.opened,minIndex);             //将基准点从开放数组中删除
        }

        this.end = base;
        this.minLength = this.end.g;    //设置最小长度
        return true;
    }
}