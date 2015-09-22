
module component{
     export class LeftModule extends ModuleBase{
         constructor()
         {           
             this.module_parent = globle.Globle.left_module;
             super();    
                 
         }
         moduleTitle()
         {
             this.module_title = $('<ul class="nav nav-tabs nav-justified"><li><a>阅片</a></li></ul>');
             super.moduleTitle();
         }
         moduleContent()
         {
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
             super.moduleContent();
         }
     }
}