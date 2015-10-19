/**
 * component
 */
var component;
(function (component) {
    /**
     * ModuleBase
     *版本：1.0
     *编号   创建/修改日期    创建/修改人   内容
     *0001    2015-08-31        王威
     *0002    2015-09-22        王威    添加左右 imageList 拖拽效果
     */
    var ModuleBase = (function () {
        function ModuleBase() {
            this.Arr = [];
            this.HistoryPhotoArr = [];
            this._title = $("<div class='nav-tabs-alt'></div>");
            this._content = $('<div class="row-row"></div>');
            this.module_footer = $('<div class="padding5 b-b b-light text-center hide"></div>');
            this._content.append(this.module_footer);
            this.module_parent.find(".vbox").append(this._title, this._content);
            this.moduleTitle();
            this.moduleContent();
        }
        /**
         * 标题或工具栏模块
         */
        ModuleBase.prototype.moduleTitle = function () {
            this._title.append(this.module_title);
        };
        /**
         * 主题内容模块
         */
        ModuleBase.prototype.moduleContent = function () {
            this._content.append(this.module_content);
        };
        /**
         * 创建 imageList  子类可以调用这个方法
         * @param {JQuery} parent [description]
         * @param {[type]} xml    [description]
         * @param {[type]} str    [description]
         */
        ModuleBase.prototype.createImageList = function (parent, xml, str) {
            this.kitInfo = str;
            var xmlDoc = $.parseXML(xml);
            var $xml = $(xmlDoc);
            var o = this;
            $xml.find(str).each(function (i) {
                var path = $(this).attr("path");
                var checkBox = $(this).attr("checkbox");
                var imgId = $(this).attr("id");
                var imgDate = $(this).attr("date");
                var name = $(this).attr("name");
                var eyeType = $(this).attr("type");
                var realityWidth = $(this).attr("width");
                var realityHeight = $(this).attr("height");
                var cutWidth = $(this).attr("cutwidth");
                var cutHeight = $(this).attr("cutheight");
                var arr = [];
                arr.push(path, checkBox, imgId, imgDate, name, eyeType);
                var nametype;
                if (i < 9) {
                    nametype = "00" + (i + 1);
                }
                else {
                    nametype = "0" + (i + 1);
                }
                arr.push(nametype, i);
                o.createImgModule(parent, arr, [realityWidth, realityHeight, cutWidth, cutHeight]);
                for (var j = 0; j < o.Arr.length; j++) {
                    if (o.Arr[j] == imgDate)
                        return true; //筛选出相同的日期
                }
                o.Arr.push(imgDate);
            });
        };
        /**
        *0002
        *检测拖拽模块中Image的数量  如果小于2张，测隐藏拖拽模块
        */
        ModuleBase.prototype.checkDragModuleImages = function () {
            var i = 0;
            globle.Globle.drag_module.find("img").each(function () {
                if (!uitls.Kit.isNullOrEmpty($(this).attr("src"))) {
                    i++;
                }
            });
            if (i < 2) {
                globle.Globle.drag_module.hide();
                globle.Globle.Magnifier_module.show();
            }
        };
        /**
        *0001
        *创建一个图片模块（包含下面的信息栏）
        *@parent  父级   JQuery对象
        *@arr
        *@cutArr  剪切数组【真实宽，真实高，剪切宽，剪切高】
        */
        ModuleBase.prototype.createImgModule = function (parent, arr, cutArr) {
            var o = this;
            var imageModule = $("<div></div>");
            var imgModule = $('<div class="img-model"></div>');
            var img = $('<img>');
            img.attr("cutArr", cutArr);
            imgModule.append(img);
            imageModule.append(imgModule);
            parent.append(imageModule);
            //----------------------------------------------------------------
            if (o.kitInfo == "patientHistoryPhoto") {
                o.HistoryPhotoArr.push(imageModule);
                imageModule.attr("data", arr[3]);
            }
            //阻止图片拖拽
            uitls.Kit.preventImgDrag(img);
            this.creatImgModuleInfo(imageModule, arr);
            img.attr("src", arr[0]);
            uitls.CutImage.cutImage(img, 144, cutArr);
            img.mouseup(function (e) {
                clearInterval(o.timer);
                globle.Globle.main_magnifier.url = $(this).attr("src");
                globle.Globle.main_magnifier.cutArr = cutArr;
            }).mousedown(function (e) {
                var ev = e;
                var src = $(this).attr("src");
                var _cutArr = uitls.Kit.stringToArray($(this).attr("cutArr"));
                o.timer = setTimeout(function () {
                    globle.Globle.drag_module.show();
                    globle.Globle.Magnifier_module.hide();
                    component.DragModule.creatDragModule(ev, src, _cutArr);
                }, 300);
            });
        };
        /**
        *0001
        *创建信息栏
        *@parent 父级   JQuery对象
        *@arr
        */
        ModuleBase.prototype.creatImgModuleInfo = function (parent, arr) {
            if (this.kitInfo == "referPhoto" || this.kitInfo == 'patientHistoryPhoto') {
                var kitModule = $('<div class="kit-model"></div>');
                var name = $('<label>' + arr[4] + '</label>');
                kitModule.append(name);
            }
            else {
                var kitModule = $('<div class="kit-model"></div>');
                var checkBox = $('<input type="checkbox"/>');
                var eye = $('<label class="pointer">L</label>');
                var name = $('<label>' + arr[4] + '</label>');
                kitModule.append(checkBox, eye, name);
                this.checkBox(checkBox, arr[1], arr[2]);
                this.eyeType(eye, arr[5], arr[2]);
            }
            parent.append(kitModule);
        };
        ModuleBase.prototype.checkBox = function (CB, str, id) {
            if (str == '0') {
                CB.attr("checked", false);
            }
            else {
                CB.attr("checked", true);
            }
            CB.change(function () {
                var checkBoxStr = "";
                if (CB.is(':checked')) {
                    checkBoxStr = "1";
                }
                else {
                    checkBoxStr = "0";
                }
                globle.Globle.chcekBoxChange(id, checkBoxStr);
            });
        };
        ModuleBase.prototype.eyeType = function (eyeType, str, id) {
            var eye;
            if (str == "0") {
                eyeType.text("L");
            }
            else {
                eyeType.text("R");
            }
            eyeType.click(function () {
                var str = "";
                if (eyeType.text() == "L") {
                    eyeType.text("R");
                    str = "1";
                }
                else {
                    eyeType.text("L");
                    str = "0";
                }
                globle.Globle.updateEye(id, str);
            });
        };
        return ModuleBase;
    })();
    component.ModuleBase = ModuleBase;
})(component || (component = {}));
//# sourceMappingURL=modulebase.js.map