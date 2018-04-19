/**
 * 五子棋类,主要负责五子棋的逻辑部分
 */

class Gobang extends egret.Sprite{

    chessBoard:ChessBoard;
    tmpChess:ChessMan;  //临时棋子

    winText:egret.TextField;
    //当前角色
    role:boolean;
    //当前棋子的位置
    cur_x:number;
    cur_y:number;

    winner:boolean;

    constructor(){
        super();

        let cb:ChessBoard = new ChessBoard();
        this.winText = new egret.TextField();
        this.winText.text = '';
        this.winText.size = 50;
        this.winText.textColor = 0xf00000;
        this.winText.width = cb.scale_w;
        this.winText.y = cb.scale_h / 2;
        this.winText.visible = false;
        this.winText.textAlign = egret.HorizontalAlign.CENTER;
        cb.addChildAt(this.winText,3);
        
        this.tmpChess = new ChessMan(true,0,0);
        this.tmpChess.visible = false;
        cb.addChildAt(this.tmpChess,2);

        this.chessBoard = cb;
        this.addChild(cb);
        this.role = true;

        /**
         * 事件
         */
        cb.touchEnabled = true;

        cb.addEventListener(egret.TouchEvent.TOUCH_BEGIN,(e)=>{
            if(this.winner != null) return;
            this.tmpChess.graphics.clear();
            this.tmpChess.graphics.beginFill(this.role?this.tmpChess.blackChess:this.tmpChess.whiteChess);
            this.tmpChess.graphics.drawCircle(0,0,this.tmpChess.r);
            this.tmpChess.graphics.endFill();
            this.update_tmp_pos(e);
            this.tmpChess.visible = true;
        },this);
        
        cb.addEventListener(egret.TouchEvent.TOUCH_MOVE,(e)=>{
            if(this.winner != null) return;
            this.update_tmp_pos(e);
        },this);
        
        cb.addEventListener(egret.TouchEvent.TOUCH_END,(e)=>{
            if(this.winner != null) return;
            this.tmpChess.visible = false;
            if(this.getPos(this.cur_x,this.cur_y) == '空'){
                this.down(this.role,this.cur_x,this.cur_y);
                if(this.checkWin()) this.win();
            }
        },this);
    }

    //赢界面
    public win():void{
        console.log('赢家为:'+(this.winner?'黑方':'白方'));
        this.winText.text = '赢家为:'+(this.winner?'黑方':'白方');
        this.winText.visible = true;
    }

    //更新tmp的位置
    public update_tmp_pos(e:egret.TouchEvent){
            var cb=this.chessBoard;
            this.tmpChess.x = cb.linePadding + Math.round((e.stageX - cb.linePadding)/cb.cell_w)*cb.cell_w;
            this.tmpChess.y = cb.linePadding + Math.round((e.stageY - cb.linePadding)/cb.cell_h)*cb.cell_h;
            this.cur_x = Math.round((e.stageX - cb.linePadding)/cb.cell_w);
            this.cur_y = Math.round((e.stageY - cb.linePadding)/cb.cell_h);
    }

    //获得指定位置的值
    public getPos(x:number,y:number):string{
        let bool=this.chessBoard.chessMen.filter(v=>(<ChessMan>v).cur_x == x && (<ChessMan>v).cur_y == y);
        if(bool.length>0) return bool[0].name;
        return '空';
    }
    /**
     * 判断是否存在5子相连
     */
    public checkWin():boolean{
        let count:number[] = [0,0,0,0]; //四个方向的数字
        let dir:number[]=[1,1,1,1,1,1,1,1];
        let name=this.role?'黑方':'白方';
        let [x,y] = [this.cur_x,this.cur_y];

        //左右
        for(let i=1;i<5;i++){
            //左右
            if(dir[0] && count[0]<5 && x-i >=0)
                if(this.getPos(x-i,y) == name) count[0]++;
                else dir[0] = 0;
            if(dir[1] && count[0]<5 && x+i <this.chessBoard.board_col)
                if(this.getPos(x+i,y) == name) count[0]++;
                else dir[1] = 0;
            //上下
            if(dir[2] && count[1]<5 && y-i >=0)
                if(this.getPos(x,y-i) == name) count[1]++;
                else dir[2] = 0;
            if(dir[3] && count[1]<5 && y+i <this.chessBoard.board_col)
                if(this.getPos(x,y+i) == name) count[1]++;
                else dir[3] = 0;
            //左上
            if(dir[4] && count[0]<5 && x-i >=0 && y+i < this.chessBoard.board_row)
                if(this.getPos(x-i,y+i) == name) count[2]++;
                else dir[4] = 0;
            if(dir[5] && count[0]<5 && x+i <this.chessBoard.board_col && y-i >=0)
                if(this.getPos(x+i,y-i) == name) count[2]++;
                else dir[5] = 0;
            //右上
            if(dir[6] && count[1]<5 && y-i >=0 && x+i < this.chessBoard.board_col)
                if(this.getPos(x,y-i) == name) count[3]++;
                else dir[6] = 0;
            if(dir[7] && count[1]<5 && y+i <this.chessBoard.board_col && x-i >=0)
                if(this.getPos(x,y+i) == name) count[3]++;
                else dir[7] = 0;

        }

        console.log(count);

        //如果存在大于等于4的值,说明已经存在5子状态
        if(count.filter(v=>v>=4).length > 0){
            console.log(this.role);
            this.winner = this.role;
            return true;
        }

        this.role = !this.role;
        return false;

    }

    public down(role:boolean,x:number,y:number){
        let r = this.chessBoard.cell_w / 2 - 2;
        let cx = x*this.chessBoard.cell_w + this.chessBoard.linePadding;
        let cy = y*this.chessBoard.cell_h + this.chessBoard.linePadding;
        let chess:ChessMan = new ChessMan(role,cx,cy,r);
        chess.cur_x = x;
        chess.cur_y = y;
        this.chessBoard.chessMen.push(chess);
        this.addChildAt(chess,1);
    }
}