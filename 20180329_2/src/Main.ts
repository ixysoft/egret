/**
 * 封装之后的库
 */
class Main extends egret.DisplayObjectContainer{
    private paper:egret.Sprite;


    public constructor(){
        super();

        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addToStage,this);
    }

    private addToStage():void{
        var obj:egret.Sprite=gr.init(this);
        gr.cls();
        gr.box(0,0,100,100,Colors.GREEN,true);
        gr.rect(150,150,100,100,Colors.rgb(50,50,50),true);
        gr.draw(100,100,'Hello,World!').$setSize(32);
        gr.onMove((e)=>{
            gr.cls();
            gr.box(0,0,100,100,Colors.GREEN,true);
            gr.rect(150,150,100,100,Colors.rgb(50,50,50),true);
            //this.mask=
            gr.circle(e.stageX,e.stageY,50,C.RED,true);
        });
    }
}