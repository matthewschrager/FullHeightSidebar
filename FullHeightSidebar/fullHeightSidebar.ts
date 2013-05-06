/// <reference path='jquery.d.ts' />
/// <reference path='fullHeightSidebar.d.ts' />

class FHSImpl implements FHS
{ 
    public Create(sidebarSelector: string, containerSelector: string, paddingElementsSelector?: string = null)
    {
        return new FHSSidebarImpl(sidebarSelector, containerSelector, paddingElementsSelector);
    }
}

class FHSSidebarImpl implements FHSSidebar
{
    constructor(sidebarSelector: string, containerSelector: string, paddingElementsSelector: string = null)
    {
        this.SidebarSelector = () => $(sidebarSelector);
        this.ContainerSelector = () => $(containerSelector)
        this.PaddingElementsSelector = paddingElementsSelector != null ? () => $(paddingElementsSelector) : () => $("__FHS_NO_MATCH__");

        $(document).ready(() => {
            this.ResizeSidebar();

            $(window).resize(() => this.ResizeSidebar());
        });
    }

    private SidebarSelector: () => JQuery;
    private ContainerSelector: () => JQuery;
    private PaddingElementsSelector: () => JQuery;

    private ResizeSidebar()
    {
        if ($("html").css("height") != "100%")
            $("html").css("height", "100%");
        if ($("body").css("height") != "100%")
            $("body").css("height", "100%");

        var contentHeight = 0; 
        this.ContainerSelector().children().each((idx, element) => contentHeight += $(element).outerHeight(true));
        
        var paddingElementHeight = 0;
        this.PaddingElementsSelector().each((idx, element) => paddingElementHeight += $(element).outerHeight(true));
        var windowHeight = $("html").outerHeight(true) - paddingElementHeight;

        var sidebarPadding = this.SidebarSelector().outerHeight(true) - this.SidebarSelector().height();

        this.SidebarSelector().height(Math.max(contentHeight, windowHeight) - sidebarPadding);
    }

    public Update()
    {
        this.ResizeSidebar();
    }
}

var FHS = new FHSImpl();