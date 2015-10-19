/**
 * FundusReading 
 *版本：1.0
 *编号   创建/修改日期    创建/修改人   内容
 *0001    2015-09-21         王威         
 *
 */
module component{
    export class RightModule extends ModuleBase
    {
        private tab_paneL: JQuery;
        private tab_paneR: JQuery;
         constructor()
         {           
             this.module_parent = globle.Globle.right_module;
             super();    
                 
         }
         /**
          * 继承ModuleBase的 modleTitle 方法
          */
         moduleTitle()
         {
             var nav = $('<ul class="nav nav-tabs nav-justified"></ul>');
             var L = $('<li class="active"><a>标准照片</a></li>');
             var R = $('<li class=""><a>历史照片</a></li>');
             nav.append(L,R);
             this.module_title = nav;
             super.moduleTitle();           
             var o = this;
             L.click(function ()
             {
                 if (L.attr("class") == "")
                 {
                     L.toggleClass("active");
                     R.toggleClass("active");
                     o.tab_paneL.toggleClass("active");
                     o.tab_paneR.toggleClass("active");
                    // o.module_footer.addClass("hide");
                 }
               
             })
             R.click(function ()
             {
                 if (R.attr("class") == "")
                 {
                     L.toggleClass("active");
                     R.toggleClass("active");
                     o.tab_paneL.toggleClass("active");
                     o.tab_paneR.toggleClass("active");
                   //  o.module_footer.removeClass("hide");
                 }
             })
            
         }
         /**
          *  继承ModuleBase的 moduleContent 方法
          */
         moduleContent()
         {
             var o = this;
             var cell = $('<div class="cell "></div>');
             var cell_inner = $('<div class="cell-inner"></div>');
             var tab_content = $('<div class="tab-content"></div>');
             this.tab_paneL = $('<div class="tab-pane active"></div>');
             var left_moduleL = $('<div class= "wrapper-sm"><div/></div>');
             this.tab_paneR= $('<div class="tab-pane"></div>');
             var left_moduleR = $('<div class= "wrapper-sm h"><div/></div>');
             var footer = $('<div class="padding5 b-b b-light text-center"></div>');
             
             this.module_content = cell;
             cell.append(cell_inner);
             cell_inner.append(tab_content);
             tab_content.append(this.tab_paneL);
             this.tab_paneL.append(left_moduleL);
             tab_content.append(this.tab_paneR);
             this.tab_paneR.append(footer,left_moduleR);
             this.createImageList(left_moduleL.find("div"), globle.Globle.ReferenceXML,"referPhoto");
             this.createImageList(left_moduleR.find("div"), globle.Globle.historyXML, "patientHistoryPhoto");
             this.showImage(o.Arr[0]);
             var select = new glass.Select(footer, this.Arr, function (value)
             {
                 o.showImage(value);
                 $(".h").mCustomScrollbar("update");
             }); 
             super.moduleContent();
         }
         /**
          * 显示图片
          * @param {[type]} select [description]
          */
         showImage(select): void
         {
             for (var i = 0; i < this.HistoryPhotoArr.length; i++)
             {
                 if (this.HistoryPhotoArr[i].attr("data") == select)
                 {
                     this.HistoryPhotoArr[i].show();
                 } else
                 {
                     this.HistoryPhotoArr[i].hide();;
                 }
             }
         }
     }
}