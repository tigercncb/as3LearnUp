class GridCollision extends egret.Sprite
{
    /**
     * 性能开销：
     * 对象数量越少，基础检查法性能相对越好
     * 对象数量越多，单元格监察法性能相对越好
     */
    private  GRID_SIZE:number=50;
    private  RADIUS:number=25;

    private _balls:Ball[]
    private _grid:Array<Array<any>>
    private _numBalls:number=100;
    public _numChecks:number=0
    private _stage
    constructor(stage)
    {
        super()
        this._stage=stage
        this.width=1136;
        this.height=640
        this.makeBalls()
        this.makeGrid()
        this.drawGrid()
        this.assignBallsToGrid()
        this.checkGrid()
        console.log(this._numChecks)
    }
    private makeBalls()
    {
        this._balls=[];
        for(let i=0;i<this._numBalls;i++)
        {
            let ball:Ball=new Ball(this.RADIUS)
            ball.x=Math.random()*this._stage.stageWidth;
            ball.y=Math.random()*this._stage.stageHeight;
            this.addChild(ball)
            this._balls.push(ball)
        }
    }
    private makeGrid()
    {
        this._grid=[]
        for(let i=0;i<this._stage.stageWidth/this.GRID_SIZE;i++)
        {
            this._grid[i]=[]
            for(let j=0;j<this._stage.stageHeight/this.GRID_SIZE;j++)
            {
                this._grid[i][j]=[]
            }
        }
    }
    private drawGrid()
    {
        this.graphics.clear();
        this.graphics.lineStyle(1,0)
        for(let i=0;i<this._stage.stageWidth;i+=this.GRID_SIZE)
        {
            this.graphics.moveTo(i,0)
            this.graphics.lineTo(i,this._stage.stageHeight)
        }
        for(let i=0;i<this._stage.stageHeight;i+=this.GRID_SIZE)
        {
            this.graphics.moveTo(0,i)
            this.graphics.lineTo(this._stage.stageWidth,i)
        }
    }
    private assignBallsToGrid()
    {
        for(let i=0;i<this._numBalls;i++)
        {
            let ball:Ball=this._balls[i]
            let xpos:number=Math.floor(ball.x/this.GRID_SIZE)
            let ypos:number=Math.floor(ball.y/this.GRID_SIZE)
            this._grid[xpos][ypos].push(ball)
        }
    }
    //单元格检查法
    private checkGrid()
    {
        for(let i=0;i<this._grid.length;i++)
        {
            for(let j=0;j<this._grid[i].length;j++)
            {
                this.checkOneCell(i,j)
                this.checkTwoCells(i,j,j+1,j)//右边
                this.checkTwoCells(i,j,i-1,j+1)//左下边
                this.checkTwoCells(i,j,i,j+1)//正下
                this.checkTwoCells(i,j,i+1,j+1)//右下
            }
        }
    }
    private checkOneCell(x,y)
    {
        let cell:any[]=this._grid[x][y]
        for(let i=0;i<cell.length-1;i++)
        {
            let baallA:Ball=cell[i]
            for(let j=i+1;j<cell.length;j++)
            {
                let ballB:Ball=cell[j]
                this.checkcollision(baallA,ballB)
            }
        }
    }
    private checkTwoCells(x1,y1,x2,y2)
    {
        if(x2<0)return;
        if(x2>=this._grid.length)return;
        if(y2>=this._grid[x2].length)return;
        let cell0:Ball[]=this._grid[x1][y1]
        let cell1:Ball[]=this._grid[x2][y2]
        for(let i=0;i<cell0.length;i++)
        {
            let ballA:Ball=cell0[i]
            for(let j=0;j<cell1.length;j++)
            {
                let ballB:Ball=cell1[j]
                this.checkcollision(ballA,ballB)
            }
        }
    }
    private checkcollision(ballA:Ball,ballB:Ball)
    {
        this._numChecks++;
        let dx=ballB.x-ballA.x
        let dy=ballB.y-ballA.y;
        let dist=Math.sqrt(dx*dx+dy*dy)
        if(dist<ballA.radius+ballA.radius)
        {
            ballA.color=0xff0000;
            ballB.color=0xff0000;
        }
    }
    //---------------基础检查法，即：对象检测（小球）
    private basicCheck()
    {
        for(let i=0;i<this._balls.length-1;i++)
        {
            let baallA:Ball=this._balls[i]
            for(let j=i+1;j<this._balls.length;j++)
            {
                let ballB:Ball=this._balls[j]
                this.checkcollision(baallA,ballB)
            }
        }
    }
}