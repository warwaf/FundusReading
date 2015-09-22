/**
 * FundusReading 
 *版本：1.0
 *编号   创建/修改日期    创建/修改人   内容
 *0001    2015-08-31         王威         
 *
 */
module component
{
    export class ModuleBase
    {
        private _title: JQuery;
        private _content: JQuery;
        private kitInfo: string;
        module_title: JQuery;
        module_content: JQuery;
        module_parent: JQuery;
        constructor()
        {
            this._title = $("<div class='nav-tabs-alt'></div>");
            this._content = $('<div class="row-row"></div>');
            this.module_parent.find(".vbox").append(this._title, this._content);
            this.moduleTitle();
            this.moduleContent();
        }
        /**
         * 
         */
        moduleTitle()
        {
            this._title.append(this.module_title);
        }

        moduleContent()
        {   
            this._content.append(this.module_content);
        }
        /**
         * 创建 imageList
         * @param {JQuery} parent [description]
         * @param {[type]} xml    [description]
         * @param {[type]} str    [description]
         */
        createImageList(parent:JQuery,xml,str)
        {
            this.kitInfo = str;
            var xmlDoc = $.parseXML(xml);
            var $xml = $(xmlDoc);
            var o = this;
            $xml.find(str).each(function (i)
            {
                var path = $(this).attr("path");
                var checkBox = $(this).attr("checkbox");
                var imgId = $(this).attr("id");
                var imgDate = $(this).attr("date");
                var name = $(this).attr("name");
                var imgType = $(this).attr("type");
                var realityWidth = $(this).attr("width");
                var realityHeight = $(this).attr("height");
                var cutWidth = $(this).attr("cutwidth");
                var cutHeight = $(this).attr("cutheight");
                var arr: Array<any> = [];
                arr.push(path, checkBox, imgId, imgDate, name, imgType);
                var nametype;
                if (i < 9) { nametype = "00" + (i + 1) } else
                {
                    nametype = "0" + (i + 1);
                }
                arr.push(nametype, i);
                o.createImgModule(parent, arr, [realityWidth, realityHeight, cutWidth, cutHeight]);
            });
        }
        private createImgModule(parent:JQuery,arr,cutArr)
        {
            var imageModule = $("<div></div>");
            var imgModule = $('<div class="img-model"></div>');
            var img = $('<img>');
            imgModule.append(img);
            imageModule.append(imgModule);
            parent.append(imageModule);
            this.creatImgModuleInfo(imageModule);
            img.attr("src", arr[0]);
            uitls.CutImage.cutImage(img, 144, cutArr);
            img.mouseup(function ()
            {
                globle.Globle.main_magnifier.url = $(this).attr("src");
                globle.Globle.main_magnifier.cutArr = cutArr;
            }).mousedown(function ()
            {

            })
        }

        private creatImgModuleInfo(parent:JQuery)
        {
            if (this.kitInfo == "referPhoto" || this.kitInfo == 'patientHistoryPhoto')
            {
                var kitModule = $('<div class="kit-model"></div>');
                var name = $('<label>name</label>');
                kitModule.append(name);
            } else
            {
                var kitModule = $('<div class="kit-model"></div>');
                var checkBox = $('<input type="checkbox"/>');
                var eye = $('<label>L</label>');
                var name = $('<label>name</label>');
                kitModule.append(checkBox, eye, name);
            }         
            parent.append(kitModule);
        }
    }
} 