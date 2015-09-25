module uitls
{   /**
    *小工具
    */
    export class Kit
    {
        /**
        *判断字符串是否为空
        *@str    要判断的字符窜
        *@return boolean
        */
        static isNullOrEmpty(str: string): boolean
        {
            if (str == ''|| str == null || str == undefined)
            {
                return true;
            } else
            {
                return false;
            }
        }
        /**
        *删除左右两端的空格
        *@str    要判断的字符窜
        *@return string
        */
       static trim(str:string):string
       { 
           return str.replace(/(^\s*)|(\s*$)/g, "");
       }
         /**
        *删除左边的空格
        *@str    要判断的字符窜
        *@return string
        */
       static ltrim(str: string): string
       { 
           return str.replace(/(^\s*)/g, "");
       }
         /**
        *删除右边的空格
        *@str    要判断的字符窜
        *@return string
        */
       static rtrim(str: string): string
       { 
           return str.replace(/(\s*$)/g, "");      
       }
         /**
        *阻止图片拖动
        *@target 目标图片 JQuery对象
        *@return false
        */
       static preventImgDrag(target:JQuery)
       {
           target[0].ondragstart = function ()
           {
               return false;
           }
       }
       /**
        *把字符串转化为数组
        *@str 字符串 
        *@return Array<any>
        */
       static stringToArray(str: string): Array<any>
       {
           var arr = str.split(",");
           return arr;
       }
    }
} 