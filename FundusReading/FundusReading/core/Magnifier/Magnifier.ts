/**
 *FundusReading 眼底阅片的放大镜
 *描述：
 *版本：1.0
 *依赖：jq
 *编号   创建/修改日期    创建/修改人   内容
 *0001    2015-08-31         王威         添加放大镜滤镜
 *
 */
module war{
	/**
	 * 0001 创建 Magnifier类
	 */
	export class Magnifier extends war.MagnifierBase{
		
        /**
         * 图片真是的宽度
         * @type {number}
         */
        private _realWidth: number      = 0;
        /**
         * 图片真是的高度
         * @type {number}
         */
        private _realHeight: number     = 0;
        /**
         * 图片剪切的宽度
         * @type {number}
         */
        private _cutWidth: number       = 0;
         /**
         * 图片剪切的高度
         * @type {number}
         */
        private _cutHeight: number = 0;

        private _CutArr: Array<number>;

        private _greyFilter: boolean = false;

        constructor(obj: JQuery, size: number, url: string,cutArr: Array<number>)
        {    
            super(obj, size, url);
            this._CutArr = cutArr;
            this.setImg();
        }

        setImg()
        {
            uitls.CutImage.cutImage(this.bgImg, 642, this._CutArr);
            super.setImg();
        }

        set cutArr(arr:Array<number>)
        {
            this._CutArr = arr;
            this.setImg();
        }

        set greyFilter(value:boolean)
        {
            this._greyFilter = value;
            var filertArr = [100, 100, 100, 0, 0, 0];
            this.setImageFilter(filertArr);
        }
        set resetFilter(value: boolean)
        {
            this._greyFilter = value;
            var filertArr = [100, 100, 0, 0, 0, 0];
            this.setImageFilter(filertArr);
        }
        set inverseFilter(value: boolean)
        {
            this._greyFilter = value;
            var filertArr = [100, 100, 0, 0, 0, 1];
            this.setImageFilter(filertArr);
        }

        set lightenessFilter(value: boolean)
        {
            this._greyFilter = value;
            var filertArr = [190, 100, 0, 0, 0, 0];
            this.setImageFilter(filertArr);
        }
        set contrastFilter(value: boolean)
        {
            this._greyFilter = value;
            var filertArr = [100, 200, 0, 0, 0, 0];
            this.setImageFilter(filertArr);
        }
        set greenFilter(value: boolean)
        {
            this._greyFilter = value;
            var filertArr = [100, 100, 0, 0, 100, 0];
            this.setImageFilter(filertArr);
        }
	}
}