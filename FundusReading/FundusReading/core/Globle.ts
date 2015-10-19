/**
 * FundusReading 眼底阅片的全局变量和方法
 *版本：1.0
 *编号   创建/修改日期    创建/修改人   内容
 *0001    2015-08-31         王威         添加放大镜滤镜
 *
 */
module globle
{ 

	/**
	 * 0001  创建
	 * @type {[type]}
	 */
    export class Globle
    {
       // ===============================外部传入或调用的值和方法===================================
       
        /**
         * 历史阅片的xml
         * @type {string}
         */
        static historyXML: string;
        /**
         * 阅片的xml
         * @type {string}
         */
        static ReadingXML: string;
        /**
         * 标准阅片的xml
         * @type {string}
         */
        static ReferenceXML: string;
        /**
         * 标题名称XML
         * @type {string}
         */
        static TitleNameXML: string;
        /**
         * 是否选中的回调函数
         * @param {[type]} a [description]
         * @param {[type]} b [description]
         */
        static chcekBoxChange(a,b):void{}
        /**
         * 更新左右眼的回调函数
         * @param {[type]} a [description]
         * @param {[type]} b [description]
         */
        static updateEye(a,b):void{}
        /**
         * 滚动鼠标滚轮时调用的函数
         * @param {[type]} value [description]
         */
        static jsWheel(value):void{}
        // ==================================================================
        /**
         * 主页面的放大镜
         * @type {war.Magnifier}
         */
        static main_magnifier: war.Magnifier;
        /**
         * 全屏左边的放大镜
         * @type {war.Magnifier}
         */
        static full_left_magnifier: war.Magnifier;
        /**
         * 全屏左边的放大镜
         * @type {war.Magnifier}
         */
        static full_right_magnifier: war.Magnifier;
        /**
         * 主模块
         * @type {JQuery}
         */
        static main_module: JQuery;
       
        /**
         * 左边栏模块
         * @type {JQuery}
         */
        static left_module: JQuery;
        /**
         * 中间模块
         * @type {JQuery}
         */
        static center_module: JQuery;
        /**
         * 中间模块下得放大镜模块
         * @type {JQuery}
         */
        static Magnifier_module: JQuery;
        /**
         * 中间模块下的拖拽显示模块
         * @type {JQuery}
         */
        static drag_module: JQuery;
        /**
        * 中间模块下的拖拽显示模块左边
        * @type {JQuery}
        */
        static drag_module_left: JQuery;
        /**
         * 中间模块下的拖拽显示模块右边
         * @type {JQuery}
         */
        static drag_module_right: JQuery;
        /**
         * 右边模块
         * @type {JQuery}
         */
        static right_module: JQuery;
        /**
         * 全屏模块
         * @type {JQuery}
         */
        static full_module: JQuery;
        /**
         * 是否全屏
         * @boolean 默认为false
         */
        static is_full: boolean = false;
        // ===================================下个版本的扩展功能===============================
         /**
         * 是否启动三级阅片 （下个版本的扩展功能）
         * @type {boolean}
         */
        static isThree: boolean = false;
        /**
         * 三级阅片canvas的路径 （下个版本的扩展功能）
         * @type {string}
         */
        static canvasURL: string = "";
    }
} 