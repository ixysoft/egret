class Main extends egret.DisplayObjectContainer{
    constructor(){
        super();

        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage():void{
        let width = this.stage.stageWidth;
        let height = this.stage.stageHeight;
        
        let gb = new Gobang;
        this.addChild(gb);
        
        console.log(gb.getPos(0,0));
    }
}