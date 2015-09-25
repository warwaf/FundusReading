/// <reference path="modulebase.ts" />
/// <reference path="../jq/jquery.d.ts" />
/// <reference path="../uitls/cutimage.ts" />
/// <reference path="../globle.ts" />
/// <reference path="../magnifier/magnifierbase.ts" />
/// <reference path="../magnifier/magnifier.ts" />
/// <reference path="../jq/screenfull.d.ts" />

module component
{
    /**
     * CenterModule  继承 ModuleBase
     *版本：1.0
     *编号   创建/修改日期    创建/修改人   内容
     *0001    2015-08-31        王威         
     *0002    2015-09-22        王威    添加左右 imageList 拖拽效果
     */
    export class CenterModule extends ModuleBase
    {
        private FilterModule: JQuery;
        private MagnifierModule: JQuery;
         constructor()
         {           
             this.module_parent = globle.Globle.center_module;
             super();    
                 
         }
         moduleTitle()
         {
             var nav = $('<ul class="nav nav-tabs"></ul>');
             var Magnifier = $('<li class=""><a>Magnifier</a></li>');
             var Filter = $('<li class="b-r"><a>Filter</a></li>');
             nav.append(Magnifier, Filter);
             this.creatMagnifier(nav);
             this.createFilter(nav);
             this.module_title = nav;
             super.moduleTitle();
             var o = this;
            
             Magnifier.click(function ()
             {
                 if ( Filter.attr("class") == "b-r")
                 {
                     Magnifier.toggleClass("active");
                     o.MagnifierModule.toggleClass("hide");
                     o.MagnifierModule.toggleClass("animated fadeInRightMd");
                   
                     o.FilterModule.addClass("hide");
                     globle.Globle.main_magnifier.IsShow = !globle.Globle.main_magnifier.IsShow;
                 } else
                 {  
                     Magnifier.toggleClass("active");
                     Filter.toggleClass("active");
                     o.FilterModule.addClass("hide");
                     o.MagnifierModule.removeClass("hide");
                     o.MagnifierModule.toggleClass("animated fadeInRightMd");
                     globle.Globle.main_magnifier.IsShow = true;
                 }
               
             });
             Filter.click(function ()
             {
                 if (Magnifier.attr("class") == "")
                 {
                     Filter.toggleClass("active");
                     o.FilterModule.toggleClass("hide");
                     o.MagnifierModule.addClass("hide");
                     o.FilterModule.toggleClass("animated fadeInRightMd");
                     globle.Globle.main_magnifier.IsShow = false;
                 } else
                 {
                     Magnifier.toggleClass("active");
                     Filter.toggleClass("active");
                     o.MagnifierModule.addClass("hide");
                     o.FilterModule.removeClass("hide");
                     o.FilterModule.toggleClass("animated fadeInRightMd");
                     globle.Globle.main_magnifier.IsShow = false;
                 }
             });
         }
         moduleContent()
         {
             var cell = $('<div class="cell scroll-hidden"></div>');
             var cell_inner = $('<div class="main-inner"></div>');
             cell.append(cell_inner);
             globle.Globle.Magnifier_module = $('<div></div>');
             globle.Globle.drag_module = $('<div class="drag-module "></div>');
             this.creatDragModule(globle.Globle.drag_module);
             cell_inner.append(globle.Globle.Magnifier_module, globle.Globle.drag_module);
             this.module_content = cell;
             super.moduleContent();
             globle.Globle.main_magnifier = new war.Magnifier(globle.Globle.Magnifier_module, 635, "",[3216, 2136, 555, 20]);
         }
         /**
         *0001
         *创建拖拽后的面板
         *@parent 父级   JQuery对象
         */
         private creatDragModule(parent:JQuery)
         {
             globle.Globle.drag_module_left = $('<div class ="left-drag-module "></div>');
             var leftImg = $("<img/>");
             //leftImg.attr("src","core/images/wangwei_20140514_141645_Color_R_036.jpg");
             uitls.CutImage.cutImage(leftImg, 312, [3216, 2136, 555, 20]);
             globle.Globle.drag_module_left.append(leftImg);
             globle.Globle.drag_module_right = $('<div class ="right-drag-module"></div>');
             var rightImg = $("<img/>");
             uitls.CutImage.cutImage(rightImg, 312, [3216, 2136, 555, 20]);
             globle.Globle.drag_module_right.append(rightImg);
             parent.append(globle.Globle.drag_module_left, globle.Globle.drag_module_right);

             this.createDragModuleKit(globle.Globle.drag_module_left,"drag-left");
             this.createDragModuleKit(globle.Globle.drag_module_right, "drag-right");
         }
         /**
         *0001
         *创建拖拽后的面板的工具栏
         *@parent 父级   JQuery对象
         */
         private createDragModuleKit(parent:JQuery,src:string)
         {
             var o = this;
             var trash = $('<i class="iconfont icon-trash" value="'+src+'"></i>');
             var fullscreen = $('<i class="iconfont icon-weibiaoti2"></i>');
             var kit = $('<div class="drag-module-kit"></div>');
             kit.append(trash, fullscreen);            
             parent.append(kit);
             //-------------------------------------工具栏操作------------------------------------------
             trash.click(function ()
             {
                 $(this).parent().parent().find("img").attr("src", "");
                 if ($(this).attr("value") == "drag-left")
                 {
                     globle.Globle.main_magnifier.url = globle.Globle.drag_module_right.find("img").attr("src");
                     globle.Globle.main_magnifier.cutArr = uitls.Kit.stringToArray(globle.Globle.drag_module_right.attr("cutArr"));
                 }
                 if ($(this).attr("value") == "drag-right")
                 {
                     globle.Globle.main_magnifier.url = globle.Globle.drag_module_left.find("img").attr("src");
                     globle.Globle.main_magnifier.cutArr = uitls.Kit.stringToArray(globle.Globle.drag_module_left.attr("cutArr"));
                 }
                 o.checkDragModuleImages();
             });
             fullscreen.click(function ()
             {
                 if (!screenfull.isFullscreen)
                 {
                     globle.Globle.is_full = true;
                     globle.Globle.main_module.hide();
                     globle.Globle.full_module.show();
                     globle.Globle.full_left_magnifier.url    =   globle.Globle.drag_module_left.find("img").attr("src");
                     globle.Globle.full_left_magnifier.cutArr = uitls.Kit.stringToArray(globle.Globle.drag_module_left.attr("cutArr"));

                     globle.Globle.full_right_magnifier.url = globle.Globle.drag_module_right.find("img").attr("src");
                     globle.Globle.full_right_magnifier.cutArr = uitls.Kit.stringToArray(globle.Globle.drag_module_right.attr("cutArr"));

                     screenfull.request(globle.Globle.full_module[0]);                   
                 }                                
             });
             $(document).keyup(function (event)
             {             
                 switch (event.which)
                 {
                     case 27:
                         globle.Globle.main_module.show();
                         globle.Globle.full_module.hide();
                         screenfull.exit(); 
                         globle.Globle.is_full = false;                                
                 }
             });
         }
         /**
         *0001
         *创建放大镜工具栏
         *@parent 父级   JQuery对象
         */
         private creatMagnifier(parent:JQuery)
         {
             this.MagnifierModule = $('<li class="war-v hide"></li>');
             var nav = $('<ul class="nav nav-tabs animated fadeInRightMd"></ul>');
             var border = $('<li><a><label>Border：</label><input type="checkbox" checked/></a></li>');
             var multiple = $('<li><a><label>Multiple：</label><input type = "text" maxlength= "1" value="2"></a></li>');
             var size = $('<li><a><label>Size：</label><input type = "text" maxlength= "3" value="300"></a></li>');
             nav.append(border, multiple, size);
             this.MagnifierModule.append(nav);
             parent.append(this.MagnifierModule);
             //-------------------------------------工具栏操作-------------------------------------------------
             border.find("input[type=checkbox]").change(function ()
             {              
                 if ($(this).is(':checked'))
                 {
                     globle.Globle.main_magnifier.BorderSize = 1;
                 } else
                 {
                     globle.Globle.main_magnifier.BorderSize = 0;
                 }
             });
             multiple.find(":text").keyup(function (e)
             {
                 var value = $(this).val();
                 if (value > 5)
                 {
                     value = 5;
                     $(this).val("5");
                 }
                 if (value < 1)
                 {
                     value = 1;
                     $(this).val("1");
                 }
                 if (e.which <= 49) { $(this).val("1") }
                 else if (e.which == 50) { $(this).val("2"); }
                 else if (e.which == 51) { $(this).val("3"); }
                 else if (e.which >= 52) { $(this).val("4"); }
                 globle.Globle.main_magnifier.multiple = $(this).val();
             });
             size.find(":text").keyup(function(e)
             {
                 if (e.which == 49)
                 {
                     $(this).val("100")
                 } else if (e.which == 50) { $(this).val("200"); }
                 else if (e.which == 51) { $(this).val("300"); }
                 else if (e.which == 52) { $(this).val("400"); }
                 else { $(this).val("400"); }
                 globle.Globle.main_magnifier.MagnifierSize = $(this).val();
             })
         }
         /**
         *0001
         *创建滤镜工具栏
         *@parent 父级   JQuery对象
         */
         private createFilter(parent:JQuery)
         {
             this.FilterModule = $('<li class="war-v  hide"></li>');
             var nav = $('<ul class="nav nav-tabs"></ul>');
             var lighteness = $('<li><a><button class= "btn btn-default btn-ssm">亮度</button></a></li>');
             var contrast = $('<li><a><button class= "btn btn-default btn-ssm">对比度</button></a></li>');
             var green = $('<li><a><button class= "btn btn-default btn-ssm">绿色</button></a></li>');
             var grey = $('<li><a><button class= "btn btn-default btn-ssm">灰色</button></a></li>');
             var inverse = $('<li><a><button class= "btn btn-default btn-ssm">反色</button></a></li>');

             var reset = $('<li><a><button class= "btn btn-default btn-ssm">重置</button></a></li>');           
             nav.append(lighteness, contrast, green, grey,inverse,reset);
             this.FilterModule.append(nav);
             parent.append(this.FilterModule);
             //-------------------------------------工具栏操作-------------------------------------------------
             grey.find("button").click(function ()
             {
                 globle.Globle.main_magnifier.greyFilter = true;
             })
             reset.find("button").click(function ()
             {
                 globle.Globle.main_magnifier.resetFilter = true;
             })
             inverse.find("button").click(function ()
             {
                 globle.Globle.main_magnifier.inverseFilter = true;
             })
             contrast.find("button").click(function ()
             {
                 globle.Globle.main_magnifier.lightenessFilter = true;
             })
             lighteness.find("button").click(function ()
             {
                 globle.Globle.main_magnifier.contrastFilter = true;
             })
             green.find("button").click(function ()
             {
                 globle.Globle.main_magnifier.greenFilter = true;
             })
         }
     }
}