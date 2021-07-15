class GridCollision2 extends egret.Sprite
{
    private  GRID_SIZE:number=80;
    private  RADIUS:number=25;

    private _balls:Array<egret.DisplayObject>
    private _grid:CollisionGrid
    private _numBalls:number=100;
    private _stage
    constructor(stage)
    {
        super();
        this._stage=stage
        this._grid=new CollisionGrid(stage.stageWidth,stage.stageHeight,this.GRID_SIZE,stage)
        this._grid.drawGrid(this.graphics)
        this.makeBalls();
        let startime:number
        let elapsed:number
        startime=egret.getTimer()
        for(let i=0;i<10;i++)
        {
            this._grid.check(this._balls)
            let numchecks:number=this._grid.check.length;
            for(let j=0;j<numchecks;j+=2)
            {
                this.checkCollision(this._grid.checks[j] as Ball,this._grid.checks[j+1] as Ball)
            }
            elapsed=egret.getTimer()-startime;
            console.log("Elapsed:"+elapsed)
        }
        
    }
    private makeBalls()
    {
        this._balls=new Array<egret.DisplayObject>(this._numBalls)
        for(let i=0;i<this._numBalls;i++)
        {
            let ball:Ball=new Ball(this.RADIUS)
            ball.x=Math.random()*this._stage.stageWidth
            ball.y=Math.random()*this._stage.stageHeight
            ball.vx=Math.random()*4-2
            ball.vy=Math.random()*4-2;
            this.addChild(ball)
            this._balls[i]=ball;
        }
    }
    private  checkCollision(ballA:Ball,ballB:Ball) {
        let dx=ballB.x-ballA.x
        let dy=ballB.y-ballA.y;
        let dist=Math.sqrt(dx*dx+dy*dy)
        if(dist<ballA.radius+ballA.radius)
        {
            ballA.color=0xff0000;
            ballB.color=0xff0000;
        }
    }
}