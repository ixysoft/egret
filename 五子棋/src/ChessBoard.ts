/**
 * 棋盘类
 */
class ChessBoard extends egret.Sprite{
    /**
     * 棋盘的列和行,
     * 之所以定义这么多变量,是为了以后可能开发的异形棋盘做准备
     */
    board_col:number;
    board_row:number;
    //宽高
    scale_w:number;
    scale_h:number;

    //单个宽高
    cell_w:number;
    cell_h:number;

    //背景颜色
    bgCol:number;
    //线条颜色
    lineCol:number;

    //线条距离边界的距离
    linePadding:number;

    //对象
    lines:egret.Shape;
    chessMen:ChessMan[];    //用于存放棋子的数组

    constructor(w:number = 0,h:number = 0,bgCol:number = 0xeedc82,cols:number = 15,rows:number = 15){
        super();
        let lines = new egret.Shape;
        this.lines = lines;
        let width = egret.MainContext.instance.stage.stageWidth;
        let height = egret.MainContext.instance.stage.stageHeight;

        this.chessMen = new Array<ChessMan>();
                
        if(w <= 0) w=egret.MainContext.instance.stage.stageWidth;
        if(h <= 0) h=w;
        this.x = (width - w) / 2;
        this.y = this.x;

        this.scale_w = w;
        this.scale_h = h;
        this.linePadding = w / cols / 2;
        this.board_col = cols;
        this.board_row = rows;
        this.cell_w = (this.scale_w - this.linePadding * 2) / (this.board_col - 1);
        this.cell_h = (this.scale_h - this.linePadding * 2) / (this.board_row - 1);
        this.lineCol = 0x000;
        this.bgCol = bgCol;

        //绘制棋盘
        this.graphics.beginFill(bgCol);
        this.graphics.drawRect(0,0,this.scale_w,this.scale_h);
        this.graphics.endFill();

        /**
         * 绘制线条
         */
        lines.graphics.lineStyle(2,this.lineCol);
        for(let i=0;i<this.board_col;i++){
            lines.graphics.moveTo(this.linePadding+this.cell_w*i,this.linePadding);
            lines.graphics.lineTo(this.linePadding+this.cell_w*i,this.scale_h-this.linePadding);
        }
        for(let i=0;i<this.board_row;i++){
            lines.graphics.moveTo(this.linePadding,this.linePadding+this.cell_h*i);
            lines.graphics.lineTo(this.scale_h-this.linePadding,this.linePadding+this.cell_h*i);
        }
        lines.graphics.endFill();

        this.addChildAt(lines,1);
    }
}