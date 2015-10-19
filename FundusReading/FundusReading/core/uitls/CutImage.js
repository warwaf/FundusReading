/// <reference path="../jq/jquery.d.ts"/>
var uitls;
(function (uitls) {
    /**
     *FundusReading 眼底阅片的放大镜
     *描述：
     *版本：1.0
     *依赖：jq
     *编号   创建/修改日期    创建/修改人   内容
     *0001    2015-09-10         王威         图片的裁剪
     *
     */
    var CutImage = (function () {
        function CutImage() {
        }
        /**
         * 0001
         * 图片剪切
         * @param {JQuery}        img  [img JQueryd对象]
         * @param {number}        size []
         * @param {Array<number>} arr  [真实宽，真实高，剪切宽，剪切高]
         */
        CutImage.cutImage = function (img, size, arr) {
            var ratio = this.ratioY(size, arr[1], arr[3]);
            if (arr[3] == 1) {
                ratio = this.ratioX(size, arr[0], arr[2]);
            }
            else if (arr[2] == 1) {
                ratio = this.ratioY(size, arr[1], arr[3]);
            }
            img.css({ "marginLeft": -this.imgOffsetX(size, arr[0], arr[2], ratio) + "px", "marginTop": -this.imgOffsetY(size, arr[1], arr[3], ratio) + "px" });
            img.width(this.imgWidth(size, arr[0], arr[2], ratio));
            img.height(this.imgHeight(size, arr[1], arr[3], ratio));
            img.attr("width", this.imgWidth(size, arr[0], arr[2], ratio)).attr("height", this.imgHeight(size, arr[1], arr[3], ratio));
            img.parent().css("height", parseFloat(img.attr("height")) - arr[3] / 2);
        };
        /**
         * 0001
         * [Y轴比率]
         * @param  {number} size          [description]
         * @param  {number} realityHeight [真实高]
         * @param  {number} cutHeight     [剪切高]
         * @return {number}               [Y轴比率]
         */
        CutImage.ratioY = function (size, realityHeight, cutHeight) {
            var ratio = size / (realityHeight - cutHeight * 2);
            return ratio;
        };
        /**
         * 0001
         * [X轴比率]
         * @param  {number} size         []
         * @param  {number} realityWidth [真实宽]
         * @param  {number} cutWidth     [剪切宽]
         * @return {number}              [X轴比率]
         */
        CutImage.ratioX = function (size, realityWidth, cutWidth) {
            var ratio = size / (realityWidth - cutWidth * 2);
            return ratio;
        };
        /**
         * 0001
         * [图片的Y轴偏移量]
         * @param  {number} size          [description]
         * @param  {number} realityHeight [真实高]
         * @param  {number} cutHeight     [剪切高]
         * @param  {[type]} ratio         [X轴比率]
         * @return {number}               [图片的Y轴偏移量]
         */
        CutImage.imgOffsetY = function (size, realityHeight, cutHeight, ratio) {
            var osY = cutHeight * ratio;
            return osY;
        };
        /**
         * 0001
        * [图片的X轴偏移量]
        * @param  {number} size         [description]
        * @param  {number} realityWidth [真实宽]
        * @param  {number} cutWidth     [剪切宽]
        * @param  {[type]} ratio        [Y轴比率]
        * @return {number}              [图片的X轴偏移量]
        */
        CutImage.imgOffsetX = function (size, realityWidth, cutWidth, ratio) {
            var osX = cutWidth * ratio;
            return osX;
        };
        /**
         * [图片剪切后的高]
         * @param  {number} size          [description]
         * @param  {number} realityHeight [真实高]
         * @param  {number} cutHeight     [剪切高]
         * @param  {[type]} ratio         [比率]
         * @return {number}               [图片剪切后的高]
         */
        CutImage.imgHeight = function (size, realityHeight, cutHeight, ratio) {
            var height = realityHeight * ratio;
            return height;
        };
        /**
         * [图片剪切后的宽]
         * @param  {number} size         [description]
         * @param  {number} realityWidth [真实宽]
         * @param  {number} cutWidth     [剪切宽]
         * @param  {[type]} ratio        [比率]
         * @return {number}              [图片剪切后的宽]
         */
        CutImage.imgWidth = function (size, realityWidth, cutWidth, ratio) {
            var _width = realityWidth * ratio;
            return _width;
        };
        return CutImage;
    })();
    uitls.CutImage = CutImage;
})(uitls || (uitls = {}));
//# sourceMappingURL=cutimage.js.map