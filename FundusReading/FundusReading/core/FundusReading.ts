/**
 * FundusReading 眼底阅片的
 *版本：1.0
 *编号   创建/修改日期    创建/修改人   内容
 *0001    2015-09-01         王威       
 *
 */

module glass{
	/**
	 * 0001
	 */
	export class FundusReading{
        /**
         * FundusReading 构造函数
         * @param {string} id [div的id 必填]
         */
        constructor(id: string)
        {
           
            globle.Globle.main_module = $("#" + id);         //主模块
            globle.Globle.main_module.addClass("hbox hbox-auto-xs bg-light b");
            globle.Globle.left_module = $("<div><div class='vbox'></div></div>").addClass("col w-160 lter b-r");    //左边栏模块
            globle.Globle.center_module = $("<div><div class='vbox'></div></div>").addClass("col"); //中间模块
            globle.Globle.right_module = $("<div><div class='vbox'></div></div>").addClass("col w-160 lter b-l");;   //右边栏模块
            globle.Globle.full_module = $("<div class='full-module'></div>");    //全屏模块
            globle.Globle.main_module.append(globle.Globle.left_module);
            globle.Globle.main_module.append(globle.Globle.center_module);
            globle.Globle.main_module.append(globle.Globle.right_module);
            $(document.body).append(globle.Globle.full_module);
            this.init();
        }
        /**
         * 初始化
         */
        private init()
        {
            var b = new component.LeftModule();
            var a = new component.RightModule();
            var c = new component.CenterModule();
            var d = new component.FullModule();
        }
	}
} 
