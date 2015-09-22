/// <reference path="modulebase.ts" />
/// <reference path="../jq/jquery.d.ts" />
/// <reference path="../uitls/cutimage.ts" />
/// <reference path="../globle.ts" />
/// <reference path="../magnifier/magnifierbase.ts" />
/// <reference path="../magnifier/magnifier.ts" />
/// <reference path="../jq/screenfull.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var component;
(function (component) {
    var CenterModule = (function (_super) {
        __extends(CenterModule, _super);
        function CenterModule() {
            this.module_parent = globle.Globle.center_module;
            _super.call(this);
        }
        CenterModule.prototype.moduleTitle = function () {
            var nav = $('<ul class="nav nav-tabs"></ul>');
            var Magnifier = $('<li class=""><a>Magnifier</a></li>');
            var Filter = $('<li class="b-r"><a>Filter</a></li>');
            nav.append(Magnifier, Filter);
            this.creatMagnifier(nav);
            this.createFilter(nav);
            this.module_title = nav;
            _super.prototype.moduleTitle.call(this);
            var o = this;
            Magnifier.click(function () {
                if (Filter.attr("class") == "b-r") {
                    Magnifier.toggleClass("active");
                    o.MagnifierModule.toggleClass("hide");
                    o.MagnifierModule.toggleClass("animated fadeInRightMd");
                    // o.FilterModule.toggleClass("hide");
                    o.FilterModule.addClass("hide");
                    globle.Globle.main_magnifier.IsShow = !globle.Globle.main_magnifier.IsShow;
                }
                else {
                    Magnifier.toggleClass("active");
                    Filter.toggleClass("active");
                    o.FilterModule.addClass("hide");
                    o.MagnifierModule.removeClass("hide");
                    o.MagnifierModule.toggleClass("animated fadeInRightMd");
                    globle.Globle.main_magnifier.IsShow = true;
                }
            });
            Filter.click(function () {
                if (Magnifier.attr("class") == "") {
                    Filter.toggleClass("active");
                    o.FilterModule.toggleClass("hide");
                    o.MagnifierModule.addClass("hide");
                    o.FilterModule.toggleClass("animated fadeInRightMd");
                    globle.Globle.main_magnifier.IsShow = false;
                }
                else {
                    Magnifier.toggleClass("active");
                    Filter.toggleClass("active");
                    o.MagnifierModule.addClass("hide");
                    o.FilterModule.removeClass("hide");
                    o.FilterModule.toggleClass("animated fadeInRightMd");
                    globle.Globle.main_magnifier.IsShow = false;
                }
            });
        };
        CenterModule.prototype.moduleContent = function () {
            var cell = $('<div class="cell scroll-hidden"></div>');
            var cell_inner = $('<div class="main-inner"></div>');
            cell.append(cell_inner);
            var mainMagnifier = $('<div></div>');
            var dragModule = $('<div class="drag-module"></div>');
            mainMagnifier.hide();
            this.creatDragModule(dragModule);
            cell_inner.append(mainMagnifier, dragModule);
            this.module_content = cell;
            _super.prototype.moduleContent.call(this);
            globle.Globle.main_magnifier = new war.Magnifier(mainMagnifier, 635, "core/images/wangwei_20140514_141714_Color_L_037.jpg", [3216, 2136, 555, 20]);
        };
        CenterModule.prototype.creatDragModule = function (parent) {
            var left = $('<div class ="left-drag-module"></div>');
            var leftImg = $("<img/>");
            leftImg.attr("src", "core/images/wangwei_20140514_141714_Color_L_037.jpg");
            uitls.CutImage.cutImage(leftImg, 312, [3216, 2136, 555, 20]);
            left.append(leftImg);
            var right = $('<div class ="right-drag-module"></div>');
            var rightImg = $("<img/>");
            rightImg.attr("src", "core/images/wangwei_20140514_141714_Color_L_037.jpg");
            uitls.CutImage.cutImage(rightImg, 312, [3216, 2136, 555, 20]);
            right.append(rightImg);
            parent.append(left, right);
            this.createDragModuleKit(left);
            this.createDragModuleKit(right);
        };
        CenterModule.prototype.createDragModuleKit = function (parent) {
            var trash = $('<i class="iconfont icon-trash"></i>');
            var fullscreen = $('<i class="iconfont icon-weibiaoti2"></i>');
            var kit = $('<div class="drag-module-kit"></div>');
            kit.append(trash, fullscreen);
            parent.append(kit);
            trash.click(function () {
                $(this).parent().parent().find("img").attr("src", "");
            });
            fullscreen.click(function () {
                if (screenfull.isFullscreen) {
                    console.log("--false--" + screenfull.isFullscreen);
                }
                else {
                    globle.Globle.main_module.toggle();
                    globle.Globle.full_module.toggle();
                    screenfull.request(globle.Globle.full_module[0]);
                    console.log("--true--" + screenfull.isFullscreen);
                }
            });
            $(document).keyup(function (event) {
                switch (event.which) {
                    case 27:
                        globle.Globle.main_module.show();
                        globle.Globle.full_module.hide();
                        screenfull.exit();
                }
            });
        };
        CenterModule.prototype.creatMagnifier = function (parent) {
            this.MagnifierModule = $('<li class="war-v hide"></li>');
            var nav = $('<ul class="nav nav-tabs animated fadeInRightMd"></ul>');
            var border = $('<li><a><label>Border：</label><input type="checkbox" checked/></a></li>');
            var multiple = $('<li><a><label>Multiple：</label><input type = "text" maxlength= "1" value="2"></a></li>');
            var size = $('<li><a><label>Size：</label><input type = "text" maxlength= "3" value="300"></a></li>');
            nav.append(border, multiple, size);
            this.MagnifierModule.append(nav);
            parent.append(this.MagnifierModule);
            border.find("input[type=checkbox]").change(function () {
                if ($(this).is(':checked')) {
                    globle.Globle.main_magnifier.BorderSize = 1;
                }
                else {
                    globle.Globle.main_magnifier.BorderSize = 0;
                }
            });
            multiple.find(":text").keyup(function (e) {
                var value = $(this).val();
                if (value > 5) {
                    value = 5;
                    $(this).val("5");
                }
                if (value < 1) {
                    value = 1;
                    $(this).val("1");
                }
                if (e.which <= 49) {
                    $(this).val("1");
                }
                else if (e.which == 50) {
                    $(this).val("2");
                }
                else if (e.which == 51) {
                    $(this).val("3");
                }
                else if (e.which >= 52) {
                    $(this).val("4");
                }
                globle.Globle.main_magnifier.multiple = $(this).val();
            });
            size.find(":text").keyup(function (e) {
                if (e.which == 49) {
                    $(this).val("100");
                }
                else if (e.which == 50) {
                    $(this).val("200");
                }
                else if (e.which == 51) {
                    $(this).val("300");
                }
                else if (e.which == 52) {
                    $(this).val("400");
                }
                else {
                    $(this).val("400");
                }
                globle.Globle.main_magnifier.MagnifierSize = $(this).val();
            });
        };
        CenterModule.prototype.createFilter = function (parent) {
            this.FilterModule = $('<li class="war-v  hide"></li>');
            var nav = $('<ul class="nav nav-tabs"></ul>');
            var lighteness = $('<li><a><button class= "btn btn-default btn-ssm">亮度</button></a></li>');
            var contrast = $('<li><a><button class= "btn btn-default btn-ssm">对比度</button></a></li>');
            var green = $('<li><a><button class= "btn btn-default btn-ssm">绿色</button></a></li>');
            var grey = $('<li><a><button class= "btn btn-default btn-ssm">灰色</button></a></li>');
            var inverse = $('<li><a><button class= "btn btn-default btn-ssm">反色</button></a></li>');
            var reset = $('<li><a><button class= "btn btn-default btn-ssm">重置</button></a></li>');
            nav.append(lighteness, contrast, green, grey, inverse, reset);
            this.FilterModule.append(nav);
            parent.append(this.FilterModule);
            grey.find("button").click(function () {
                globle.Globle.main_magnifier.greyFilter = true;
            });
            reset.find("button").click(function () {
                globle.Globle.main_magnifier.resetFilter = true;
            });
            inverse.find("button").click(function () {
                globle.Globle.main_magnifier.inverseFilter = true;
            });
            contrast.find("button").click(function () {
                globle.Globle.main_magnifier.lightenessFilter = true;
            });
            lighteness.find("button").click(function () {
                globle.Globle.main_magnifier.contrastFilter = true;
            });
            green.find("button").click(function () {
                globle.Globle.main_magnifier.greenFilter = true;
            });
        };
        return CenterModule;
    })(component.ModuleBase);
    component.CenterModule = CenterModule;
})(component || (component = {}));
//# sourceMappingURL=CenterModule.js.map