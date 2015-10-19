/**
 *FundusReading 眼底阅片的放大镜
 *描述：
 *版本：1.0
 *依赖：jq
 *编号   创建/修改日期    创建/修改人   内容
 *0001    2015-09-01         王威         添加放大镜滤镜
 *
 */
module war{
    /**
     * 0001  
     */
	export class MagnifierBase{
		/**
		 * 
		 * @type {JQuery}
		 */
		private _Magnifiter:JQuery;
		/**
		 * 放大镜的放大倍率 默认值为2；
		 * @type {number}
		 */
		private _multiple: number       = 2;
		/**
		 * 放大镜镜片的尺寸  默认为300
		 * @type {number}  
		 */
		private _MagnifierSize: number  = 300;
        /**
         * 放大镜的边框颜色  默认为#888
         * @type {string}
         */
		private _borderColor: string    = "#888";
        /**
         * 放大镜边框的大小 默认为1；
         * @type {number}
         */
		private _borderSize: number     = 1;
		/**
		 * 图片的路径
		 * @type {string}
		 */
		private _url: string;
		/**
		 * 放大镜的尺寸   
		 * @type {number}
		 */
        private _size: number;
        /**
         * 是否显示放大镜镜片
         * @type {boolean}
         */
        private _isShow: boolean    = false;
        /**
         * 是否显示放大镜的提示信息
         * @type {boolean}
         */
        private _isShowTip: boolean = false;

        private _bgImg: JQuery;

        private MagnifierGlass: JQuery;

        private MagnifierGlassBgImg: JQuery;
        /**
         * 
         * @param {JQuery} obj  传入的JQuery对象
         * @param {number} size obj的大小
         * @param {string} url  url
         */
		constructor(obj:JQuery,size:number,url:string){
			this._Magnifiter = obj;
            this._size = size;
            this._url = url;
            this.init();        
        }
        /**
         * 初始化
         */
        private init(){           
            /**
             * 创建背景图片
             * @param {[type]} "<img></img>" []
             */
            this._bgImg = $("<img></img>");          
            this._bgImg.bind("ondragstart", function () { return false });
            this._Magnifiter.append(this._bgImg);
            /**
             * 
             * @param {[type]} "<div></div>" []
             */
            this.MagnifierGlass = $("<div class='magnifier-glass'></div>");
            this._Magnifiter.append(this.MagnifierGlass);           
         
            this.MagnifierGlassBgImg = $("<img></img>");
            this.MagnifierGlass.append(this.MagnifierGlassBgImg);


            this.updataBgImage();
          
           
            this.dragMagnifiter(this.MagnifierGlass);
            //阻止图片拖拽
            uitls.Kit.preventImgDrag(this.MagnifierGlassBgImg);
            //阻止图片拖拽
            uitls.Kit.preventImgDrag(this._bgImg);
            
            //this._Magnifiter.mousemove(function () { return false });
        }

        private dragMagnifiter(parent:JQuery)
        {
            var o = this;
            parent.mousedown(function (e)
            {
                var left =  parent.position().left;
                var top = parent.position().top;
                var x = e.pageX - left;
                var y = e.pageY - top;   
               
                if (!globle.Globle.is_full)
                {
                    globle.Globle.center_module.mousemove(function (ev)
                    {
                        var _x = ev.pageX - x;//获得X轴方向移动的值
                        var _y = ev.pageY - y;//获得Y轴方向移动的值      
                        o.setMgnifiterGlassPos(_x, _y);
                    })
                } else
                {
                    globle.Globle.full_module.mousemove(function (ev)
                    {                        
                        var _x = ev.pageX - x;//获得X轴方向移动的值
                        var _y = ev.pageY - y;//获得Y轴方向移动的值      
                        o.setMgnifiterGlassPos(_x, _y);
                    })
                }               
            })
          
                globle.Globle.center_module.mouseup(function ()
                {
                    globle.Globle.center_module.unbind("mousemove");
                })
            
                globle.Globle.full_module.mouseup(function ()
                {                  
                    globle.Globle.full_module.unbind("mousemove");
                })
           
        }
        setImg()
        {
            this.setMagnifierGlassStyle();
            var pos = (this.size - this._MagnifierSize) / 2;
            this.setMgnifiterGlassPos(pos, pos);
            this._Magnifiter.css({
                "width": this._size,               
                "overflow":"hidden"
            });
        }
        /**
         * 根据坐标刷新放大镜镜片的位置
         * @param {number} left [left坐标]
         * @param {number} top  [top坐标]
         */
       private setMgnifiterGlassPos(left:number,top:number)
        {
            this.MagnifierGlass.css({ "left": left + "px", "top": top + "px" });
            var leftPos = left + this._MagnifierSize / 2;
            var topPos = top + this._MagnifierSize / 2;  
            if (leftPos < 0)
            {
                this.MagnifierGlass.css("left",-this._MagnifierSize / 2 + "px");
                leftPos = 0;
            }
            if (topPos < 0)
            {
                this.MagnifierGlass.css("top", -this._MagnifierSize / 2 + "px");         
                topPos = 0;
            }
            if (leftPos > this._size)
            {
                this.MagnifierGlass.css("left", this._size-this._MagnifierSize / 2 + "px");               
                leftPos = this._size;
            }
            if (topPos > this._bgImg.height())
            {
                this.MagnifierGlass.css("top", this._bgImg.height() - this._MagnifierSize / 2 + "px");
                topPos = this._bgImg.height();
            }                 
            leftPos = ((leftPos - (this._size - this._bgImg.width()) / 2) * this._multiple - this._MagnifierSize / 2) * -1;//
            topPos = (topPos * this._multiple - this._MagnifierSize / 2) * (-1); 
            this.MagnifierGlassBgImg.css({"margin-top":topPos+"px","margin-left":leftPos+"px"});
        }
        /**
         * 设置放大镜镜片的样式
         */
        private setMagnifierGlassStyle()
        {
            this.setMagnifierSize();
            this.setMagnifierMultiple();
            this.setMagnifierGlassBorder();
        }
        /**
         * 设置放大镜镜片的尺寸
         */
        private setMagnifierSize()
        {
            this.MagnifierGlass.css({ "width": this._MagnifierSize, "height": this._MagnifierSize });
            
        }
        /**
         * 设置放大镜镜片的倍数
         */
        private setMagnifierMultiple()
        {
           
            this.MagnifierGlassBgImg.css({ "width": this._bgImg.width() * this._multiple, "height": this._bgImg.height() * this._multiple});
        }
         /**
         * 设置放大镜镜片的边框
         */
        private setMagnifierGlassBorder()
        {           
            this.MagnifierGlass.css("border", this._borderSize + "px dashed rgb(136, 136, 136)");
        }
        /**
        * 更新背景和镜片图片
        */
        private updataBgImage()
        {
            this._bgImg.attr("src", this._url).attr("width",this._size).attr("height",this._size);;
            this.MagnifierGlassBgImg.attr("src", this._url);
        }
         /**
        * 切换放大镜镜片的显示
        */
        private toggleMagniterGlass()
        {
            if (this._isShow)
            {
                this.MagnifierGlass.show();
            } else
            {
                this.MagnifierGlass.hide();
            }
        }
        /**
       * 0002
       * 设置放大镜滤镜
       * @filterArr  传入滤镜的数组
       */
        public setImageFilter(filterArr)
        {
            //filertArr = [contrast,brightness,grayscale,sepia,hue_rotate,invert]
            var filter = "contrast(" + filterArr[0] + "%) brightness(" + filterArr[1] + "%) grayscale(" + filterArr[2] + "%) sepia(" + filterArr[3] + "%) hue-rotate(" + filterArr[4] + "deg) invert(" + filterArr[5] + ")";
            this._bgImg.css({ "filter": filter, "-webkit-filter": filter });
            this.MagnifierGlassBgImg.css({ "filter": filter, "-webkit-filter": filter });
        }
        /**
        * 放大镜背景图片JQuery对象  只读 
        */
        get bgImg(): JQuery
        {
            return this._bgImg;
        }

        /**
        * multiple的 get方法
        */
        get multiple(): number
        {
            return this._multiple;
        }
		/**
		 * multiple的 set方法
		 * @param {number} value [description]
		 */
        set multiple(value: number)
        {
            this._multiple = value;
            this.setMagnifierMultiple();
            this.setMgnifiterGlassPos(this.MagnifierGlass.position().left, this.MagnifierGlass.position().top);
        }
        /* MagnifierSize的get方法
         * [MagnifierSize description]
         * @return {number} [description]
         */
        get MagnifierSize(): number
        {
            return this._MagnifierSize;
            
        }
		/**
		 * MagnifierSize的set 方法
		 * @param {number} value [description]
		 */
        set MagnifierSize(value: number)
        {
            this._MagnifierSize = value;
            this.setMagnifierSize();
            var pos = (this.size - this._MagnifierSize) / 2;
            this.setMgnifiterGlassPos(pos, pos);
        }
        /**
         * BorderColor的get 方法
         * @return {string} [description]
         */
        get BorderColor():string{
            return this._borderColor;
        }
        /**
         * BorderColor的set 方法
         * @param {string} value [description]
         */
        set BorderColor(value:string){
            this._borderColor = value;
        }
        /**
         * BorderSize的get 方法
         * @return {number} [description]
         */
        get BorderSize():number{
            return this._borderSize;
        }
        /**
         * BorderSize 的set 方法
         * @param {number} value [description]
         */
        set BorderSize(value:number){
            this._borderSize = value;
            this.setMagnifierGlassBorder();
        }
        /**
         * url 的get 方法
         * @param {number} value [description]
         */
        get url():string{
            return this._url;           
        }
        /**
         * url 的set 方法
         * @param {number} value [description]
         */
        set url(value:string){
            this._url = value;
            this.updataBgImage();           
        }
        /**
         * size 的get 方法
         * @param {number} value [description]
         */
        get size():number{
            return this._size;
        }
        /**
         * size 的set 方法
         * @param {number} value [description]
         */
        set size(value:number){
            this._size = value;
        }
        /**
         * IsShow 的get 方法
         * @param {number} value [description]
         */
        get IsShow():boolean{
            return this._isShow;
        }
        /**
         * IsShow 的set 方法
         * @param {number} value [description]
         */
        set IsShow(value:boolean){
            this._isShow = value;
            this.toggleMagniterGlass();          
        }
        /**
         * IsShowTip 的get 方法
         * @param {number} value [description]
         */
        get IsShowTip():boolean{
            return this._isShowTip;
        }
        /**
         * IsShowTip 的set 方法
         * @param {number} value [description]
         */
        set IsShowTip(value:boolean){
            this._isShowTip = value;
        }
	}
}