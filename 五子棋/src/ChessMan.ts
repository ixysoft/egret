/**
 * 棋子类
 */

class ChessMan extends egret.Shape{

    //黑方
    blackChess:number;
    //白方
    whiteChess:number;
    //角色,true为黑方,false为白方
    //当前位置
    cur_x:number;
    cur_y:number;

    r:number;

    constructor(public role:boolean,x:number,y:number,r:number = 20){
        super();

        this.r = r;
        this.blackChess = 0x000000;
        this.whiteChess = 0xffffff;

        this.x = x;
        this.y = y;

        this.name = role?'黑方':'白方';

        this.graphics.beginFill(role?this.blackChess:this.whiteChess);
        this.graphics.drawCircle(0,0,r);
        this.graphics.endFill();
    }
}