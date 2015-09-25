var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 *FundusReading 眼底阅片的放大镜
 *描述：
 *版本：1.0
 *依赖：jq
 *编号   创建/修改日期    创建/修改人   内容
 *0001    2015-08-31         王威         添加放大镜滤镜
 *
 */
var war;
(function (war) {
    /**
     * 0001 创建 Magnifier类
     */
    var Magnifier = (function (_super) {
        __extends(Magnifier, _super);
        function Magnifier(obj, size, url, cutArr) {
            _super.call(this, obj, size, url);
            this._greyFilter = false;
            this._CutArr = cutArr;
            this.setImg();
        }
        Magnifier.prototype.setImg = function () {
            uitls.CutImage.cutImage(this.bgImg, this.size, this._CutArr);
            _super.prototype.setImg.call(this);
        };
        Object.defineProperty(Magnifier.prototype, "cutArr", {
            set: function (arr) {
                this._CutArr = arr;
                this.setImg();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Magnifier.prototype, "greyFilter", {
            set: function (value) {
                this._greyFilter = value;
                var filertArr = [100, 100, 100, 0, 0, 0];
                this.setImageFilter(filertArr);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Magnifier.prototype, "resetFilter", {
            set: function (value) {
                this._greyFilter = value;
                var filertArr = [100, 100, 0, 0, 0, 0];
                this.setImageFilter(filertArr);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Magnifier.prototype, "inverseFilter", {
            set: function (value) {
                this._greyFilter = value;
                var filertArr = [100, 100, 0, 0, 0, 1];
                this.setImageFilter(filertArr);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Magnifier.prototype, "lightenessFilter", {
            set: function (value) {
                this._greyFilter = value;
                var filertArr = [190, 100, 0, 0, 0, 0];
                this.setImageFilter(filertArr);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Magnifier.prototype, "contrastFilter", {
            set: function (value) {
                this._greyFilter = value;
                var filertArr = [100, 200, 0, 0, 0, 0];
                this.setImageFilter(filertArr);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Magnifier.prototype, "greenFilter", {
            set: function (value) {
                this._greyFilter = value;
                var filertArr = [100, 100, 0, 0, 100, 0];
                this.setImageFilter(filertArr);
            },
            enumerable: true,
            configurable: true
        });
        return Magnifier;
    })(war.MagnifierBase);
    war.Magnifier = Magnifier;
})(war || (war = {}));
//# sourceMappingURL=magnifier.js.map