class Ball extends egret.Sprite
{
    private _color:number
    private _radius:number;
    private _vx:number=0
    private _vy:number=0;
    constructor(radius:number,color:number=0xffffff)
    {
        super()
        this._radius=radius;
        this._color=color;
        this.draw()
    }
    private draw()
    {
        this.graphics.clear()
        this.graphics.lineStyle(0)
        this.graphics.beginFill(this._color,.5)
        this.graphics.drawCircle(0,0,this._radius)
        this.graphics.endFill()
        this.graphics.drawCircle(0,0,1)
    }
    public update()
    {
        this.x+=this._vx
        this.y+=this._vy
    }
    public set color(value)
    {
        this._color=value;
        this.draw()
    }
    public get color()
    {
        return this._color
    }
    public set radius(value:number)
    {
        this._radius=value
        this.draw()
    }
    public get radius()
    {
        return this._radius
    }
    public set vx(value)
    {
        this._vx=value
    }
    public get vx()
    {
        return this._vx
    }
    set vy(value)
    {
        this._vy=value
    }
    get vy()
    {
        return this._vy
    }
}