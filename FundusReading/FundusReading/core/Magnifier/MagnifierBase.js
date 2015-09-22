/**
 *FundusReading 眼底阅片的放大镜
 *描述：
 *版本：1.0
 *依赖：jq
 *编号   创建/修改日期    创建/修改人   内容
 *0001    2015-09-01         王威         添加放大镜滤镜
 *
 */
var war;
(function (war) {
    /**
     * 0001
     */
    var MagnifierBase = (function () {
        /**
         *
         * @param {JQuery} obj  传入的JQuery对象
         * @param {number} size obj的大小
         * @param {string} url  url
         */
        function MagnifierBase(obj, size, url) {
            /**
             * 放大镜的放大倍率 默认值为2；
             * @type {number}
             */
            this._multiple = 2;
            /**
             * 放大镜镜片的尺寸  默认为300
             * @type {number}
             */
            this._MagnifierSize = 300;
            /**
             * 放大镜的边框颜色  默认为#888
             * @type {string}
             */
            this._borderColor = "#888";
            /**
             * 放大镜边框的大小 默认为1；
             * @type {number}
             */
            this._borderSize = 1;
            /**
             * 是否显示放大镜镜片
             * @type {boolean}
             */
            this._isShow = false;
            /**
             * 是否显示放大镜的提示信息
             * @type {boolean}
             */
            this._isShowTip = false;
            this._Magnifiter = obj;
            this._size = size;
            this._url = url;
            this.init();
        }
        /**
         * 初始化
         */
        MagnifierBase.prototype.init = function () {
            /**
             * 创建背景图片
             * @param {[type]} "<img></img>" []
             */
            this._bgImg = $("<img></img>");
            this._bgImg.bind("ondragstart", function () { return false; });
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
            this.MagnifierGlassBgImg[0].ondragstart = function () {
                return false;
            };
            this._bgImg[0].ondragstart = function () {
                return false;
            };
            //this._Magnifiter.mousemove(function () { return false });
        };
        MagnifierBase.prototype.dragMagnifiter = function (parent) {
            var o = this;
            parent.mousedown(function (e) {
                var left = parent.position().left;
                var top = parent.position().top;
                var x = e.pageX - left;
                var y = e.pageY - top;
                console.log(left, x);
                globle.Globle.center_module.mousemove(function (ev) {
                    var _x = ev.pageX - x; //获得X轴方向移动的值
                    var _y = ev.pageY - y; //获得Y轴方向移动的值      
                    o.setMgnifiterGlassPos(_x, _y);
                });
            });
            globle.Globle.center_module.mouseup(function () {
                globle.Globle.center_module.unbind("mousemove");
            });
        };
        MagnifierBase.prototype.setImg = function () {
            this.setMagnifierGlassStyle();
            var pos = (this.size - this._MagnifierSize) / 2;
            this.setMgnifiterGlassPos(pos, pos);
            var height = this.bgImg.height();
            if (height > 642) {
                height = 635;
            }
            this._Magnifiter.css({
                "width": this._size,
                "height": height,
                "overflow": "hidden"
            });
        };
        /**
         * 根据坐标刷新放大镜镜片的位置
         * @param {number} left [left坐标]
         * @param {number} top  [top坐标]
         */
        MagnifierBase.prototype.setMgnifiterGlassPos = function (left, top) {
            this.MagnifierGlass.css({ "left": left + "px", "top": top + "px" });
            var leftPos = left + this._MagnifierSize / 2;
            var topPos = top + this._MagnifierSize / 2;
            if (leftPos < 0) {
                this.MagnifierGlass.css("left", -this._MagnifierSize / 2 + "px");
                leftPos = 0;
            }
            if (topPos < 0) {
                this.MagnifierGlass.css("top", -this._MagnifierSize / 2 + "px");
                topPos = 0;
            }
            if (leftPos > this._size) {
                this.MagnifierGlass.css("left", this._size - this._MagnifierSize / 2 + "px");
                leftPos = this._size;
            }
            if (topPos > this._bgImg.height()) {
                this.MagnifierGlass.css("top", this._bgImg.height() - this._MagnifierSize / 2 + "px");
                topPos = this._bgImg.height();
            }
            leftPos = ((leftPos - (this._size - this._bgImg.width()) / 2) * this._multiple - this._MagnifierSize / 2) * -1; //
            topPos = (topPos * this._multiple - this._MagnifierSize / 2) * (-1);
            this.MagnifierGlassBgImg.css({ "margin-top": topPos + "px", "margin-left": leftPos + "px" });
        };
        /**
         * 设置放大镜镜片的样式
         */
        MagnifierBase.prototype.setMagnifierGlassStyle = function () {
            this.setMagnifierSize();
            this.setMagnifierMultiple();
            this.setMagnifierGlassBorder();
        };
        /**
         * 设置放大镜镜片的尺寸
         */
        MagnifierBase.prototype.setMagnifierSize = function () {
            this.MagnifierGlass.css({ "width": this._MagnifierSize, "height": this._MagnifierSize });
        };
        /**
         * 设置放大镜镜片的倍数
         */
        MagnifierBase.prototype.setMagnifierMultiple = function () {
            console.log(this._bgImg.width());
            this.MagnifierGlassBgImg.css({ "width": this._bgImg.width() * this._multiple, "height": this._bgImg.height() * this._multiple });
        };
        MagnifierBase.prototype.setMagnifierGlassBorder = function () {
            this.MagnifierGlass.css("border", this._borderSize + "px dashed rgb(136, 136, 136)");
        };
        /**
        * 更新背景和镜片图片
        */
        MagnifierBase.prototype.updataBgImage = function () {
            this._bgImg.attr("src", this._url).width(this._size).height(this._size);
            ;
            this.MagnifierGlassBgImg.attr("src", this._url);
        };
        MagnifierBase.prototype.toggleMagniterGlass = function () {
            if (this._isShow) {
                this.MagnifierGlass.show();
            }
            else {
                this.MagnifierGlass.hide();
            }
        };
        /**
       * 0002
       * 设置放大镜滤镜
       * @filterArr  传入滤镜的数组
       */
        MagnifierBase.prototype.setImageFilter = function (filterArr) {
            //filertArr = [contrast,brightness,grayscale,sepia,hue_rotate,invert]
            var filter = "contrast(" + filterArr[0] + "%) brightness(" + filterArr[1] + "%) grayscale(" + filterArr[2] + "%) sepia(" + filterArr[3] + "%) hue-rotate(" + filterArr[4] + "deg) invert(" + filterArr[5] + ")";
            this._bgImg.css({ "filter": filter, "-webkit-filter": filter });
            this.MagnifierGlassBgImg.css({ "filter": filter, "-webkit-filter": filter });
        };
        Object.defineProperty(MagnifierBase.prototype, "bgImg", {
            /**
            * 放大镜背景图片JQuery对象  只读
            */
            get: function () {
                return this._bgImg;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MagnifierBase.prototype, "multiple", {
            /**
            * multiple的 get方法
            */
            get: function () {
                return this._multiple;
            },
            /**
             * multiple的 set方法
             * @param {number} value [description]
             */
            set: function (value) {
                this._multiple = value;
                this.setMagnifierMultiple();
                this.setMgnifiterGlassPos(this.MagnifierGlass.position().left, this.MagnifierGlass.position().top);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MagnifierBase.prototype, "MagnifierSize", {
            /* MagnifierSize的get方法
             * [MagnifierSize description]
             * @return {number} [description]
             */
            get: function () {
                return this._MagnifierSize;
            },
            /**
             * MagnifierSize的set 方法
             * @param {number} value [description]
             */
            set: function (value) {
                this._MagnifierSize = value;
                this.setMagnifierSize();
                var pos = (this.size - this._MagnifierSize) / 2;
                this.setMgnifiterGlassPos(pos, pos);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MagnifierBase.prototype, "BorderColor", {
            /**
             * BorderColor的get 方法
             * @return {string} [description]
             */
            get: function () {
                return this._borderColor;
            },
            /**
             * BorderColor的set 方法
             * @param {string} value [description]
             */
            set: function (value) {
                this._borderColor = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MagnifierBase.prototype, "BorderSize", {
            /**
             * BorderSize的get 方法
             * @return {number} [description]
             */
            get: function () {
                return this._borderSize;
            },
            /**
             * BorderSize 的set 方法
             * @param {number} value [description]
             */
            set: function (value) {
                this._borderSize = value;
                this.setMagnifierGlassBorder();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MagnifierBase.prototype, "url", {
            /**
             * url 的get 方法
             * @param {number} value [description]
             */
            get: function () {
                return this._url;
            },
            /**
             * url 的set 方法
             * @param {number} value [description]
             */
            set: function (value) {
                this._url = value;
                this.updataBgImage();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MagnifierBase.prototype, "size", {
            /**
             * size 的get 方法
             * @param {number} value [description]
             */
            get: function () {
                return this._size;
            },
            /**
             * size 的set 方法
             * @param {number} value [description]
             */
            set: function (value) {
                this._size = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MagnifierBase.prototype, "IsShow", {
            /**
             * IsShow 的get 方法
             * @param {number} value [description]
             */
            get: function () {
                return this._isShow;
            },
            /**
             * IsShow 的set 方法
             * @param {number} value [description]
             */
            set: function (value) {
                this._isShow = value;
                this.toggleMagniterGlass();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MagnifierBase.prototype, "IsShowTip", {
            /**
             * IsShowTip 的get 方法
             * @param {number} value [description]
             */
            get: function () {
                return this._isShowTip;
            },
            /**
             * IsShowTip 的set 方法
             * @param {number} value [description]
             */
            set: function (value) {
                this._isShowTip = value;
            },
            enumerable: true,
            configurable: true
        });
        return MagnifierBase;
    })();
    war.MagnifierBase = MagnifierBase;
})(war || (war = {}));
//# sourceMappingURL=magnifierbase.js.map