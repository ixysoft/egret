/**
 * 图形命名空间
 */
namespace graph{
    /**
     * 底层纸
     */
    export var paper:egret.Sprite;
    var obj:egret.DisplayObjectContainer;
    /**
     * 图形初始化
     * @param obj: 传入的DisplayObjectContainer对象
     */
    export function init(obj:egret.DisplayObjectContainer):egret.Sprite{
        this.obj = obj;
        this.paper = new egret.Sprite();
        this.paper.width = obj.stage.width;
        this.paper.height = obj.stage.height;
        obj.addChild(this.paper);
        return this.paper;
    }

    /**
     * 清屏函数
     */
    export function cls():void{
        this.paper.removeChildren();
        this.paper.graphics.beginFill(0xffffff);
        this.paper.graphics.drawRect(0,0,this.width,this.height);
        this.paper.graphics.endFill();
    }

    /**
     * 矩形绘制函数
     * x,y: 左上角坐标值
     * width:   矩形的宽度
     * height:  矩形的高度
     * col:     颜色值
     * 
     */
    export function box(x:number,y:number,width:number,height:number,col:number = 0x000000,fill:boolean = false):egret.Shape{
        var rect:egret.Shape = new egret.Shape();
        fill?rect.graphics.beginFill(col):rect.graphics.lineStyle(1,col);
        rect.graphics.drawRect(x,y,width,height);
        rect.graphics.endFill();
        this.paper.addChild(rect);
        return rect;
    }

    export var rect = box;

    export function circle(x:number,y:number,r:number,col:number = 0x000,fill:boolean = false):egret.Shape{
        var c:egret.Shape = new egret.Shape();
        fill?c.graphics.beginFill(col):c.graphics.lineStyle(1,col);
        c.graphics.drawCircle(x,y,r);
        c.graphics.endFill();
        this.paper.addChild(c);
        return c;
    }

    export function ellipse(x:number,y:number,ra:number,rb:number,col:number = 0x000,fill:boolean = false):egret.Shape{
        var e:egret.Shape = new egret.Shape();
        fill?e.graphics.beginFill(col):e.graphics.lineStyle(1,col);
        e.graphics.drawEllipse(x,y,ra,rb);
        e.graphics.endFill();
        this.paper.addChild(e);
        return e;
    }

    export function arc(x:number,y:number,r:number,st:number,en:number,col:number = 0x000,fill:boolean = false,dir:boolean = false):egret.Shape{
        var a:egret.Shape = new egret.Shape();
        fill?a.graphics.beginFill(col):a.graphics.lineStyle(1,col);
        a.graphics.drawArc(x,y,r,st,en,dir);
        a.graphics.endFill();
        this.paper.addChild(a);
        return a;
    }

    export function curvo(x1:number,y1:number,x2:number,y2:number,x:number,y:number,col:number = 0x000,fill:boolean = false):egret.Shape{
        var c:egret.Shape = new egret.Shape();
        fill?c.graphics.beginFill(col):c.graphics.lineStyle(1,col);
        c.graphics.moveTo(x1,y1);
        c.graphics.curveTo(x,y,x2,y2);
        c.graphics.endFill();
        this.paper.addChild(c);
        return c;
    }

    export function draw(x:number,y:number,str:string,size:number=12,col:number = 0x000,
            halign:string = egret.HorizontalAlign.LEFT,valign:string = egret.VerticalAlign.TOP){
        var t:egret.TextField = new egret.TextField();
        t.text = str;
        t.size = size;
        t.textColor = col;
        t.textAlign = halign;
        t.verticalAlign = valign;
        this.paper.addChild(t);
        return t;
    }

    /**
     * red:     红色属性深度
     * green:   绿色属性深度
     * blue:    蓝色属性深度
     * 返回值:   组合颜色值
     * 这个函数在Color命名空间也有定义
     */
    export function rgb(red:number,green:number,blue:number):number{
        return red<<16|green<<8|blue;
    }

    /**
     * 与触摸相关的坐标值
     * startX,startY:   刚刚触摸时的坐标
     * curX,curY:   当前的坐标
     * endX,endY:   离开时的坐标
     */
    var startX:number,startY:number;
    var curX:number,curY:number;
    var endX:number,endY:number;

    export function onStartMove(func = null){
        this.obj.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,(event:egret.TouchEvent)=>{
            this.startX = event.stageX;
            this.startY = event.stageY;
            this.curX = event.stageX;
            this.curY = event.stageY;
            if(func) func();
        },this.obj);
    }
    /**
     * 移动时的操作
     */
    export function onMove(func:any = null){
        this.obj.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,(event:egret.TouchEvent)=>{
            this.curX = event.stageX;
            this.curY = event.stageY;
            if(func) func(event);
        },this.obj);
    }

    export function onEndMove(func = null){
        this.obj.stage.addEventListener(egret.TouchEvent.TOUCH_END,(event:egret.TouchEvent)=>{
            this.endX = event.stageX;
            this.endY = event.stageY;
            this.curX = event.stageX;
            this.curY = event.stageY;
            if(func) func();
        },this.obj);
    }

    export function getPos(which:number = 0):number[]{
        if(1 == which)
            return [this.startX,this.startY];
        else if(2 == which)
            return [this.endX,this.endY];
        else
            return [this.curX,this.curY];
    }
}

import gr = graph;
import G = graph;