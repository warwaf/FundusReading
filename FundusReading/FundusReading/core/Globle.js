/**
 * FundusReading 眼底阅片的全局变量和方法
 *版本：1.0
 *编号   创建/修改日期    创建/修改人   内容
 *0001    2015-08-31         王威         添加放大镜滤镜
 *
 */
var globle;
(function (globle) {
    /**
     * 0001  创建
     * @type {[type]}
     */
    var Globle = (function () {
        function Globle() {
        }
        /**
         * 是否选中的回调函数
         * @param {[type]} a [description]
         * @param {[type]} b [description]
         */
        Globle.chcekBoxChange = function (a, b) { };
        /**
         * 更新左右眼的回调函数
         * @param {[type]} a [description]
         * @param {[type]} b [description]
         */
        Globle.updateEye = function (a, b) { };
        /**
         * 滚动鼠标滚轮时调用的函数
         * @param {[type]} value [description]
         */
        Globle.jsWheel = function (value) { };
        // ===================================下个版本的扩展功能===============================
        /**
        * 是否启动三级阅片 （下个版本的扩展功能）
        * @type {boolean}
        */
        Globle.isThree = false;
        /**
         * 三级阅片canvas的路径 （下个版本的扩展功能）
         * @type {string}
         */
        Globle.canvasURL = "";
        return Globle;
    })();
    globle.Globle = Globle;
})(globle || (globle = {}));
//# sourceMappingURL=globle.js.map