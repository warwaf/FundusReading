var component;
(function (component) {
    var FullModule = (function () {
        function FullModule() {
            this.sw = screen.width;
            this.sh = screen.height;
            globle.Globle.full_module.css({
                "width": this.sw,
                "height": this.sh
            });
            this.creatTitleDiv(globle.Globle.full_module);
            this.createGlassDiv(globle.Globle.full_module);
        }
        /**
         *创建放大镜显示区域
         */
        FullModule.prototype.createGlassDiv = function (parent) {
            var size = (screen.width / 2) - 3;
            var leftMagnifier = $('<div class="full-module-left" />');
            parent.append(leftMagnifier);
            globle.Globle.full_left_magnifier = new war.Magnifier(leftMagnifier, size, "", [3216, 2136, 555, 20]);
            leftMagnifier.css("top", (this.sh - leftMagnifier.height() - 40) / 2 + 40);
            var rightMagnifier = $('<div class="full-module-right" />');
            parent.append(rightMagnifier);
            globle.Globle.full_right_magnifier = new war.Magnifier(rightMagnifier, size, "", [3216, 2136, 555, 20]);
            rightMagnifier.css("top", (this.sh - rightMagnifier.height() - 40) / 2 + 40);
        };
        /**
         *创建title
         */
        FullModule.prototype.creatTitleDiv = function (parent) {
            var o = this;
            var title = $('<div class="full-module-title nav-tabs-alt"/>');
            parent.append(title);
            var nav = $('<ul class="nav nav-tabs"></ul>');
            var Magnifier = $('<li class=""><a>Magnifier</a></li>');
            var Filter = $('<li class="b-r"><a>Filter</a></li>');
            nav.append(Magnifier, Filter);
            this.creatMagnifier(nav);
            this.createFilter(nav);
            title.append(nav);
            Magnifier.click(function () {
                if (Filter.attr("class") == "b-r") {
                    Magnifier.toggleClass("active");
                    o.MagnifierModule.toggleClass("hide");
                    o.MagnifierModule.toggleClass("animated fadeInRightMd");
                    o.FilterModule.addClass("hide");
                    globle.Globle.full_left_magnifier.IsShow = !globle.Globle.full_left_magnifier.IsShow;
                    globle.Globle.full_right_magnifier.IsShow = !globle.Globle.full_right_magnifier.IsShow;
                }
                else {
                    Magnifier.toggleClass("active");
                    Filter.toggleClass("active");
                    o.FilterModule.addClass("hide");
                    o.MagnifierModule.removeClass("hide");
                    o.MagnifierModule.toggleClass("animated fadeInRightMd");
                    globle.Globle.full_left_magnifier.IsShow = globle.Globle.full_right_magnifier.IsShow = true;
                }
            });
            Filter.click(function () {
                if (Magnifier.attr("class") == "") {
                    Filter.toggleClass("active");
                    o.FilterModule.toggleClass("hide");
                    o.MagnifierModule.addClass("hide");
                    o.FilterModule.toggleClass("animated fadeInRightMd");
                    globle.Globle.full_left_magnifier.IsShow = globle.Globle.full_right_magnifier.IsShow = false;
                }
                else {
                    Magnifier.toggleClass("active");
                    Filter.toggleClass("active");
                    o.MagnifierModule.addClass("hide");
                    o.FilterModule.removeClass("hide");
                    o.FilterModule.toggleClass("animated fadeInRightMd");
                    globle.Globle.full_left_magnifier.IsShow = globle.Globle.full_right_magnifier.IsShow = false;
                }
            });
        };
        /**
        *0001
        *创建放大镜工具栏
        *@parent 父级   JQuery对象
        */
        FullModule.prototype.creatMagnifier = function (parent) {
            this.MagnifierModule = $('<li class="war-v hide"></li>');
            var nav = $('<ul class="nav nav-tabs animated fadeInRightMd"></ul>');
            var border = $('<li><a><label>Border：</label><input type="checkbox" checked/></a></li>');
            var multiple = $('<li><a><label>Multiple：</label><input type = "text" maxlength= "1" value="2"></a></li>');
            var size = $('<li><a><label>Size：</label><input type = "text" maxlength= "3" value="300"></a></li>');
            nav.append(border, multiple, size);
            this.MagnifierModule.append(nav);
            parent.append(this.MagnifierModule);
            //-------------------------------------工具栏操作-------------------------------------------------
            border.find("input[type=checkbox]").change(function () {
                if ($(this).is(':checked')) {
                    globle.Globle.full_left_magnifier.BorderSize = globle.Globle.full_right_magnifier.BorderSize = 1;
                }
                else {
                    globle.Globle.full_left_magnifier.BorderSize = globle.Globle.full_right_magnifier.BorderSize = 0;
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
                globle.Globle.full_right_magnifier.multiple = globle.Globle.full_left_magnifier.multiple = $(this).val();
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
                globle.Globle.full_left_magnifier.MagnifierSize = globle.Globle.full_right_magnifier.MagnifierSize = $(this).val();
            });
        };
        /**
        *0001
        *创建滤镜工具栏
        *@parent 父级   JQuery对象
        */
        FullModule.prototype.createFilter = function (parent) {
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
            //-------------------------------------工具栏操作-------------------------------------------------
            grey.find("button").click(function () {
                globle.Globle.full_right_magnifier.greyFilter = globle.Globle.full_left_magnifier.greyFilter = true;
            });
            reset.find("button").click(function () {
                globle.Globle.full_right_magnifier.resetFilter = globle.Globle.full_left_magnifier.resetFilter = true;
            });
            inverse.find("button").click(function () {
                globle.Globle.full_right_magnifier.inverseFilter = globle.Globle.full_left_magnifier.inverseFilter = true;
            });
            contrast.find("button").click(function () {
                globle.Globle.full_right_magnifier.lightenessFilter = globle.Globle.full_left_magnifier.lightenessFilter = true;
            });
            lighteness.find("button").click(function () {
                globle.Globle.full_right_magnifier.contrastFilter = globle.Globle.full_left_magnifier.contrastFilter = true;
            });
            green.find("button").click(function () {
                globle.Globle.full_right_magnifier.greenFilter = globle.Globle.full_left_magnifier.greenFilter = true;
            });
        };
        return FullModule;
    })();
    component.FullModule = FullModule;
})(component || (component = {}));
//# sourceMappingURL=FullModule.js.map