var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var component;
(function (component) {
    var LeftModule = (function (_super) {
        __extends(LeftModule, _super);
        function LeftModule() {
            this.module_parent = globle.Globle.left_module;
            _super.call(this);
        }
        LeftModule.prototype.moduleTitle = function () {
            this.module_title = $('<ul class="nav nav-tabs nav-justified"><li><a>阅片</a></li></ul>');
            _super.prototype.moduleTitle.call(this);
        };
        LeftModule.prototype.moduleContent = function () {
            var cell = $('<div class="cell scrollable hover"></div>');
            var cell_inner = $('<div class="cell-inner"></div>');
            var tab_content = $('<div class="tab-content"></div>');
            var tab_pane = $('<div class="tab-pane active"></div>');
            var left_module = $('<div class= "wrapper-sm"></div>');
            this.module_content = cell;
            cell.append(cell_inner);
            cell_inner.append(tab_content);
            tab_content.append(tab_pane);
            tab_pane.append(left_module);
            this.createImageList(left_module, globle.Globle.ReadingXML, "patientPhoto");
            _super.prototype.moduleContent.call(this);
        };
        return LeftModule;
    })(component.ModuleBase);
    component.LeftModule = LeftModule;
})(component || (component = {}));
//# sourceMappingURL=LeftModule.js.map