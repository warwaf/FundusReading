module glass
{
    /**
     *
     *版本：1.0
     *编号   创建/修改日期    创建/修改人   内容
     *0001    2015-10-14         王威       
     *
     */
    export class Select
    {

        private list: JQuery;
        private span: JQuery;
        private _selectIndex: number = 1;
        private _selectArr: Array<any> =[];
        constructor(parent:JQuery,selectArr:Array<any>,fun)
        {
            this._selectArr = selectArr;
            this.creat(parent,selectArr,fun);
        }
        set value(value)
        {
            this.span.html(value);
        }
        creat(parent: JQuery, selectArr: Array<any>,fun): void
        {
            var div = $('<div class="dropdown"></div>');
            parent.append(div);

            this.span = this.creatSpan(div, "selected");
            this.creatSpan(div, "carat");
            //this.createText(div, text);
            this.list = this.creatSelectList(div, selectArr,fun);    
            var o = this;
            var t;
            div.mouseout(function ()
            {
                t = setTimeout(function () { o.list.addClass("hide") }, 10);
            }).mouseover(function ()
            {
                clearTimeout(t);
                });         
            this.setDefaultByIndex();  
        }
        /**
         *
         */
        creatSpan(parent: JQuery,className:string,text:string=""): JQuery
        {
            var span = $("<span class='"+className+"'>"+text+"</sapn>");
            parent.append(span);
            var o = this;
            span.click(function ()
            {
                if (o.list.hasClass("hide"))
                {
                    o.list.removeClass("hide");
                    $(this).removeClass("open");
                } else
                {
                    o.list.addClass("hide");
                    $(this).addClass("open");
                }
            });      
            return span;
        }
        creatSelectList(parent: JQuery,selectArr:Array<any>,change?:Function): JQuery
        {
           
            var div = $("<div class='hide'/>");
            parent.append(div);          
            var ul = $("<ul/>");
            div.append(ul);
            var o = this;
            for (var i = 0; i < selectArr.length;i++){
                var li = $("<li>" + selectArr[i]+"</li>");
                ul.append(li);           
                li.click(function ()
                {
                    o.list.addClass("hide");
                    o.span.text($(this).text());
                    change($(this).text());
                })                   
            }
            return div;
        }
        setDefaultByIndex()
        {
            console.log(this._selectArr[this._selectIndex - 1])
            this.span.text(this._selectArr[this._selectIndex-1]);
        }
        get selectIndex():number
        {
            return this._selectIndex;
        }
        set selectIndex(index: number)
        {
            this._selectIndex = index;
            this.setDefaultByIndex();  
        }
    }
} 