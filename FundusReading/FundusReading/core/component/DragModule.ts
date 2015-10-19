module component
{
    export class DragModule
    {
        private static drag_module: JQuery;
        private static drag_module_img: JQuery;
        /**
         *
         */
        private static direction_module: string;
        static creatDragModule(ev: JQueryEventObject, src: string,cutArr:Array<any>)
        {
           
            var o = this;
            o.direction_module = "";
            o.drag_module = $("<div class='drag-module-tool'/>");
            o.drag_module_img = $("<img/>");
            o.drag_module.append(o.drag_module_img);
            globle.Globle.main_module.parent().append(o.drag_module);

            uitls.CutImage.cutImage(o.drag_module_img, 140,cutArr);
            o.drag_module_img.attr("src", src);
            //阻止图片拖拽
            uitls.Kit.preventImgDrag(o.drag_module_img);

            var top = ev.pageY - globle.Globle.main_module.offset().top -70;
            var left = ev.pageX - globle.Globle.main_module.offset().left - 70;

            o.drag_module.css({
                "top": top,
                "left": left
            });           

            var x = ev.pageX - left;
            var y = ev.pageY - top;
            $(document.body).mousemove(function (e)
            {
                var _x = e.pageX - x;//获得X轴方向移动的值
                var _y = e.pageY - y;//获得Y轴方向移动的值
                o.drag_module.css({
                    "top": _y,
                    "left": _x
                });
                if (o.isOverlap(globle.Globle.drag_module_right, o.drag_module))
                {
                    globle.Globle.drag_module_right.css("border-color", "red");
                    o.direction_module = "right";
                } else
                {
                    globle.Globle.drag_module_right.css("border-color", "#ccc");
                }
                if (o.isOverlap(globle.Globle.drag_module_left, o.drag_module))
                {
                    globle.Globle.drag_module_left.css("border-color", "red");
                    o.direction_module = "left";
                } else
                {
                    globle.Globle.drag_module_left.css("border-color", "#ccc");
                }
            }).mouseup(function ()
            {
                o.removeDragModule();
                $(document.body).unbind("mousemove");
                var img;
                if (o.direction_module == "right")
                {
                    img = globle.Globle.drag_module_right.find("img").attr("src", o.drag_module_img.attr("src"));
                    globle.Globle.drag_module_right.attr("cutArr", cutArr);
                }
                if (o.direction_module == "left"){
                    img = globle.Globle.drag_module_left.find("img").attr("src", o.drag_module_img.attr("src"));
                    globle.Globle.drag_module_left.attr("cutArr", cutArr);
                }
                uitls.CutImage.cutImage(img, 312, cutArr);
                globle.Globle.drag_module_left.css("border-color", "#ccc");
                globle.Globle.drag_module_right.css("border-color", "#ccc");
            });
        }
        
        static removeDragModule()
        {
            this.drag_module.remove();
        }
        /**
         * 判断一个拖拽元素是否在目标元素内
         *@one  目标元素
         *@two  拖拽元素
         *@return  boolean
         */
        static isOverlap(one:JQuery, two:JQuery):boolean
        {
            var objOne = one,
                objTwo = two,
                offsetOne = objOne.offset(),
                offsetTwo = objTwo.offset(),
                topOne = offsetOne.top,
                topTwo = offsetTwo.top,
                leftOne = offsetOne.left,
                leftTwo = offsetTwo.left,
                widthOne = objOne.width(),
                widthTwo = objTwo.width(),
                heightOne = objOne.height(),
                heightTwo = objTwo.height();
           
            var leftTop = leftTwo > leftOne && leftTwo < leftOne + widthOne
                    && topTwo > topOne && topTwo < topOne + heightOne,
                rightTop = leftTwo + widthTwo > leftOne && leftTwo + widthTwo < leftOne + widthOne
                    && topTwo > topOne && topTwo < topOne + heightOne,
                leftBottom = leftTwo > leftOne && leftTwo < leftOne + widthOne
                    && topTwo + heightTwo > topOne && topTwo + heightTwo < topOne + heightOne,
                rightBottom = leftTwo + widthTwo > leftOne && leftTwo + widthTwo < leftOne + widthOne
                    && topTwo + heightTwo > topOne && topTwo + heightTwo < topOne + heightOne;          
            return leftTop || rightTop || leftBottom || rightBottom;
       } 
    }
} 