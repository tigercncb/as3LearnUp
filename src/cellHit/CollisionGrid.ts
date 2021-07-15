class CollisionGrid extends egret.EventDispatcher
{
    /**
     * 可复用代码
     */
    private _checks:Array<egret.DisplayObject>
    private _grid:Array<Array<egret.DisplayObject>>
    private _gridSize:number
    private _height:number
    private _numCells:number
    private _numCols:number
    private _numRows:number
    private _width:number

    private _stage
    constructor(width,height,gridSize,stage)
    {
        super()
        this._width=width
        this._height=height
        this._gridSize=gridSize
        this._stage=stage
        this._numCols=Math.ceil(this._width/this._gridSize)
        this._numRows=Math.ceil(this._height/this._gridSize)
        this._numCells=this._numCols*this._numRows
    }
    public drawGrid(graphics:egret.Graphics)
    {
        graphics.clear();
        graphics.lineStyle(1,0)
        for(let i=0;i<this._stage.stageWidth;i+=this._gridSize)
        {
            graphics.moveTo(i,0)
            graphics.lineTo(i,this._stage.stageHeight)
        }
        for(let i=0;i<this._stage.stageHeight;i+=this._gridSize)
        {
            graphics.moveTo(0,i)
            graphics.lineTo(this._stage.stageWidth,i)
        }
    }
    public check(objects:Array<egret.DisplayObject>)
    {
        let numObjects=objects.length
        this._grid=new Array(new Array<egret.DisplayObject>())
        this._checks=new Array<egret.DisplayObject>()
        for(let i=0;i<numObjects;i++)
        {
            let obj:egret.DisplayObject=objects[i]
            //一维向量 index=y*numcolums+x
            let index=Math.floor(obj.y/this._gridSize)*this._numCols+Math.floor(obj.x/this._gridSize)
            //懒实例化，只有需要的时候创建
            if(this._grid[index]==null)
            {
                this._grid[index]=new Array<egret.DisplayObject>();
            }
            this._grid[index].push(obj)
        }
        this.checkGrid()
    }
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
        let cell:Array<egret.DisplayObject>=this._grid[y*this._numCols+x]
        if(cell==null)return
        for(let i=0;i<cell.length-1;i++)
        {
            let objA:egret.DisplayObject=cell[i]
            for(let j=i+1;j<cell.length;j++)
            {
                let objB:egret.DisplayObject=cell[j]
                this._checks.push(objA,objB)
            }
        }
    }
    public checkTwoCells(x1,y1,x2,y2)
    {
        if(x2<0)return;
        if(x2>=this._grid.length)return;
        if(y2>=this._grid[x2].length)return;
        let cellA:Array<egret.DisplayObject>=this._grid[y1*this._numCols+x1]
        let cellB:Array<egret.DisplayObject>=this._grid[y2*this._numCols+x2]
        if(!cellA || cellB) return;
        let cellALength=cellA.length;
        let cellBLength=cellB.length;
        for(let i=0;i<cellALength;i++)
        {
            let ballA:egret.DisplayObject=cellA[i]
            for(let j=0;j<cellBLength;j++)
            {
                let ballB:egret.DisplayObject=cellB[j]
                this._checks.push(ballA,ballB)
            }
        }
    }
    public get checks()
    {
        return this._checks
    }
}