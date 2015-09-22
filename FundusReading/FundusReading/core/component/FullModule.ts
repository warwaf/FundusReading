module component
{
    export class FullModule
    {
        private sw: number = screen.width;
        private sh: number = screen.height;
        constructor()
        {
            globle.Globle.full_module.css({
                "position": "absolute",
                "overflow": "hidden",
                "background": "#fff",
                "top": 0,
                "left": 0,
                "width": this.sw,
                "height": this.sh,
                "display":"none"
            });
            this.creatTitleDiv(globle.Globle.full_module);
            this.createLeftGlassDiv(globle.Globle.full_module);
        }
        private createLeftGlassDiv(parent: JQuery): void
        {
            var size = (screen.width / 2) - 2;           
            var leftMagnifier = $('<div/>');
            leftMagnifier.css({ "left": 0, "float": "left", "padding-top": "80px", "margin-left": "1px"})
            parent.append(leftMagnifier);
            globle.Globle.full_left_magnifier = new war.Magnifier(leftMagnifier, size, "core/images/wangwei_20140514_141714_Color_L_037.jpg", [3216, 2136, 555, 20]);
            var rightMagnifier = $('<div/>');
            rightMagnifier.css({ "left": 0, "float": "left", "padding-top": "80px", "margin-left": "1px"})
            parent.append(rightMagnifier);
            globle.Globle.full_left_magnifier = new war.Magnifier(rightMagnifier, size, "core/images/wangwei_20140514_141714_Color_L_037.jpg", [3216, 2136, 555, 20]);
        }

        private creatTitleDiv(parent:JQuery)
        {
            var title = $('<div/>');
            title.css({
                "height": "40px",
                "border-bottom":"1px solid #ccc"
            });
            parent.append(title);
        }
    }
}