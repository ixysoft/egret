/**
 * A星算法
 * 初始化地图,宽高为w,h
 * 设定一个开启数组和一个关闭数组
 * 循环:
 * 判断是否为终止点,如果是,则结束.
 * 将初始点放入关闭数组中,计算与其相近的8个点的衡量函数
 * 如果点在开启列表中
 *      如果衡量函数的值更小,更新指点点的父节点
 *      否则跳过
 * 如果点不在开启列表中,
 *      加入开启列表
 * 将开启列表中结果的点的父节点设置为当前点
 * 将结果最小的点设置为初始点
 * 
 */

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

    public constructor(){
        //初始化数组
        this.opened = new Array();
        this.closed = new Array();
        this.path = new Array();
        //起止点
        this.start = new Dot();
        this.end = new Dot();

        this.map = [
            '++++++++++++++++++',
            '+..s...+....+....+',
            '+..+..++...+++++.+',
            '++.++.....++++++.+',
            '+...++++.........+',
            '+................+',
            '++++++...+++++...+',
            '+......++++....+++',
            '+..++++++++.++++++',
            '++....+++++......+',
            '++++.++++...++++++',
            '+++....+......++++',
            '++++++..+++.++++++',
            '+................+',
            '+++......e...+++++',
            '++++++++++++++++++',
        ]

        for(var j=0;j<this.map.length;j++){
            for(var i=0;i<this.map[j].length;i++){
                var ch:string=this.getPos(i,j);
                if(ch == 's'){
                    this.start.x = i;
                    this.start.y = j;
                    this.start.g = 0;
                    this.start.h = this.H(i,j); //初始化评估函数
                }else if(ch == 'e'){
                    this.end.x = i;
                    this.end.y = j;
                }
            }
        }

        console.log('start:'+[this.start.x,this.start.y]+',end:'+[this.end.x,this.end.y]);
    }

    //获得指定位置的字符
    private getPos(i:number,j:number):string{
        return this.map[j].charAt(i);
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
    public echoPath():void{
        if(this.minLength < 0){
            console.log('不存在路径');
            return;
        }
        var base:Dot=this.end;
        do{
            this.path.push(base);
            base=base.parent;
        }while(base != null);

        for(var i=this.path.length-1;i>=0;i--){
            console.log('('+this.path[i].x+','+this.path[i].y+')');   //输出沿途路径点坐标
        }
    }

    //判断点是否可用,不可用,false,可用,查看该点是否在开启数组中,不在则加入开启列表,在则判断是否更优,g为起点到当前点的已知长度
    private updateDot(x:number,y:number,dot:Dot,g:number):boolean{
        if(this.getPos(x,y) == '+' || x<0 || x>=this.map[0].length || y<0 || y>= this.map.length || this.closed.filter(v=>v.x==x&&v.y==y).length > 0) return false;//不可用
        var tmp:Dot[] = this.opened.filter(value=>value.x==x&&value.y==y);
        if(tmp.length > 0){//开放列表中存在该点
            if(tmp[0].f > g+this.H(x,y))
                tmp[0].g = g;   //更新起点到当前点的位置
        }
        var newDot:Dot = new Dot(x,y);
        newDot.g = g;
        newDot.h = this.H(x,y);
        newDot.parent = dot;

        console.log('执行');//--
        this.pushDot(this.opened,newDot);   //将当前点压入开启栈

        return true;
    }

    //更新邻居
    private updateNb(dot:Dot):void{
        //更新四个方向
        this.updateDot(dot.x-1,dot.y,dot,dot.g+1);
        this.updateDot(dot.x+1,dot.y,dot,dot.g+1);
        this.updateDot(dot.x,dot.y-1,dot,dot.g+1);
        this.updateDot(dot.x,dot.y+1,dot,dot.g+1);
    }


    /**
     * 寻路
     */
    private count:number = 0;   //测试计数
    public findPath():boolean{
        var base:Dot = this.start;    //基准点
        var minIndex:number;

        while(base.x != this.end.x || base.y != this.end.y){
            this.pushDot(this.closed,base);  //将基准点加入关闭数组中
            this.updateNb(base);//更新邻基准点的四个邻居
            minIndex=this.findMin(this.opened);
            this.count++;
            if(minIndex<0){
                console.log('遍历了:'+this.count+'个点');
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

//地图类
class Map extends egret.Sprite{
    
    private _width : number;
    public get width() : number {
        return this._width;
    }
    public set width(v : number) {
        this._width = v;
    }
    
    
    private _height : number;
    public get height() : number {
        return this._height;
    }
    public set height(v : number) {
        this._height = v;
    }

    private cell:number;

    private map:string[];
    
    public constructor(map:string[]){
        super();

        this.width = map[0].length;
        this.height = map.length;
        this.map = map;
        this.cell = egret.MainContext.instance.stage.stageWidth / this.width;
    }

    //生成地图
    public genMap(){
        var map:string[] = this.map;
        var obj:egret.Shape;
        var frCol;
        var bgCol;
        for(var j=0;j<map.length;j++){
            for(var i=0;i<map[0].length;i++){
                var ch=map[j].charAt(i);    //获得指定位置的字符串
                var obj:egret.Shape = new egret.Shape();
                if(ch == '+' )
                    bgCol = 0xd0d0d0;
                else if(ch == 'e')
                    bgCol = 0x666666;
                else if(ch == 's')
                    bgCol = 0x990099;
                else
                    bgCol = 0xffffff;
                obj.graphics.beginFill(bgCol);
                switch(ch){
                    case '+':

                        obj.graphics.drawRect();
                    break;
                    case 's':
                    case 'e':

                    break;
                    default:
                }
                obj.graphics.endFill();
            }
        }
    }
}

class Main extends egret.DisplayObjectContainer{

    public constructor(){
        super();

        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage():void{
        var star:AStar=new AStar();
        star.findPath();
        star.echoPath();//输出路径
    }

}