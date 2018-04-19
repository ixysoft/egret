class Main extends egret.DisplayObjectContainer{
    public constructor(){
        super();

        this.dir = Direct.Up;
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private snake:Snake;
    private last:number;
    private index:number = 0;

    private sw:number;
    private sh:number;

    private dir:Direct; //当前方向

    private timer:egret.Timer;
    private onAddToStage(){
        this.sw = this.stage.stageWidth;
        this.sh = this.stage.stageHeight;
        var bg=new egret.Sprite();
        bg.graphics.beginFill(0x000);
        bg.graphics.drawRect(0,0,this.sw,this.sw);
        bg.graphics.endFill();
        this.addChild(bg);

        this.snake = new Snake();
        var snake=this.snake;
        var dir:Direct; //方向


        bg.addChild(this.snake);

        this.last = egret.getTimer();
        egret.startTick(this.main,this);

        this.timer= new egret.Timer(50,0);
        this.timer.addEventListener(egret.TimerEvent.TIMER,(e)=>{
            var tm = egret.getTimer();
            if(tm - this.last > 100){
                if(snake.cur_x > snake.food_x){
                    if(snake.canMove(Direct.Left))dir=Direct.Left;
                    else if(snake.canMove(Direct.Right))dir=Direct.Right;
                    else if(snake.canMove(Direct.Up))dir=Direct.Up;
                    else if(snake.canMove(Direct.Down))dir=Direct.Down;
                    else snake.die = true;
                }else if(snake.cur_y < snake.food_y){
                    if(snake.canMove(Direct.Down))dir=Direct.Down;
                    else if(snake.canMove(Direct.Left))dir=Direct.Left;
                    else if(snake.canMove(Direct.Right))dir=Direct.Right;
                    else if(snake.canMove(Direct.Up))dir=Direct.Up;
                    else snake.die = true;
                }else if(snake.cur_x < snake.food_x){
                    if(snake.canMove(Direct.Right))dir=Direct.Right;
                    else if(snake.canMove(Direct.Left))dir=Direct.Left;
                    else if(snake.canMove(Direct.Up))dir=Direct.Up;
                    else if(snake.canMove(Direct.Down))dir=Direct.Down;
                    else snake.die = true;
                }else if(snake.cur_y > snake.food_y){
                    if(snake.canMove(Direct.Up))dir=Direct.Up;
                    else if(snake.canMove(Direct.Left))dir=Direct.Left;
                    else if(snake.canMove(Direct.Right))dir=Direct.Right;
                    else if(snake.canMove(Direct.Down))dir=Direct.Down;
                    else snake.die = true;
                }else if(!snake.eating()){
                    snake.die = true;
                }
                if(snake.die) this.goDie();
                snake.move(dir);
                this.last = tm;
            }
        },this);

        this.timer.start();
    }

    /**
     * 死亡时处理
     */
    public goDie():void{
                    console.log('死亡时的状态:');
                    console.log(this.snake);
        this.timer.stop();
    }

    private main(tm:number):boolean{
        return false;
    }
}