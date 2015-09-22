var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * FundusReading
 *版本：1.0
 *编号   创建/修改日期    创建/修改人   内容
 *0001    2015-09-21         王威
 *
 */
var component;
(function (component) {
    var RightModule = (function (_super) {
        __extends(RightModule, _super);
        function RightModule() {
            this.module_parent = globle.Globle.right_module;
            _super.call(this);
        }
        /**
         * 继承ModuleBase的 modleTitle 方法
         */
        RightModule.prototype.moduleTitle = function () {
            var nav = $('<ul class="nav nav-tabs nav-justified"></ul>');
            var L = $('<li class="active"><a>标准照片</a></li>');
            var R = $('<li class=""><a>历史照片</a></li>');
            nav.append(L, R);
            this.module_title = nav;
            _super.prototype.moduleTitle.call(this);
            var o = this;
            L.click(function () {
                if (L.attr("class") == "") {
                    L.toggleClass("active");
                    R.toggleClass("active");
                    o.tab_paneL.toggleClass("active");
                    o.tab_paneR.toggleClass("active");
                }
            });
            R.click(function () {
                if (R.attr("class") == "") {
                    L.toggleClass("active");
                    R.toggleClass("active");
                    o.tab_paneL.toggleClass("active");
                    o.tab_paneR.toggleClass("active");
                }
            });
        };
        /**
         *  继承ModuleBase的 moduleContent 方法
         */
        RightModule.prototype.moduleContent = function () {
            var cell = $('<div class="cell scrollable hover"></div>');
            var cell_inner = $('<div class="cell-inner"></div>');
            var tab_content = $('<div class="tab-content"></div>');
            this.tab_paneL = $('<div class="tab-pane active"></div>');
            var left_moduleL = $('<div class= "wrapper-sm"></div>');
            this.tab_paneR = $('<div class="tab-pane"></div>');
            var left_moduleR = $('<div class= "wrapper-sm"></div>');
            var footer = $('<div class="padder b-b b-light text-center">aaaaaaaaa</div>');
            this.module_content = cell;
            cell.append(cell_inner);
            cell_inner.append(tab_content);
            tab_content.append(this.tab_paneL);
            this.tab_paneL.append(left_moduleL);
            tab_content.append(this.tab_paneR);
            this.tab_paneR.append(footer, left_moduleR);
            this.createImageList(left_moduleL, globle.Globle.ReferenceXML, "referPhoto");
            this.createImageList(left_moduleR, globle.Globle.historyXML, "patientHistoryPhoto");
            _super.prototype.moduleContent.call(this);
        };
        return RightModule;
    })(component.ModuleBase);
    component.RightModule = RightModule;
})(component || (component = {}));
//# sourceMappingURL=RightModule.js.map