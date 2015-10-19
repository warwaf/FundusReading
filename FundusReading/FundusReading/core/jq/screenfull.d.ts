interface screenfull
{
    toggle(elem: any): any;
    request(elem: any): any;
    exit();
    isFullscreen: boolean;
} 

declare var screenfull: screenfull;