var FHSImpl = (function () {
    function FHSImpl() { }
    FHSImpl.prototype.Create = function (sidebarSelector, containerSelector, paddingElementsSelector) {
        if (typeof paddingElementsSelector === "undefined") { paddingElementsSelector = null; }
        return new FHSSidebarImpl(sidebarSelector, containerSelector, paddingElementsSelector);
    };
    return FHSImpl;
})();
var FHSSidebarImpl = (function () {
    function FHSSidebarImpl(sidebarSelector, containerSelector, paddingElementsSelector) {
        if (typeof paddingElementsSelector === "undefined") { paddingElementsSelector = null; }
        var _this = this;
        this.SidebarSelector = function () {
            return $(sidebarSelector);
        };
        this.ContainerSelector = function () {
            return $(containerSelector);
        };
        this.PaddingElementsSelector = paddingElementsSelector != null ? function () {
            return $(paddingElementsSelector);
        } : function () {
            return $("__FHS_NO_MATCH__");
        };
        $(document).ready(function () {
            _this.ResizeSidebar();
            $(window).resize(function () {
                return _this.ResizeSidebar();
            });
        });
    }
    FHSSidebarImpl.prototype.ResizeSidebar = function () {
        if($("html").css("height") != "100%") {
            $("html").css("height", "100%");
        }
        if($("body").css("height") != "100%") {
            $("body").css("height", "100%");
        }
        var contentHeight = 0;
        this.ContainerSelector().children().each(function (idx, element) {
            return contentHeight += $(element).outerHeight(true);
        });
        var paddingElementHeight = 0;
        this.PaddingElementsSelector().each(function (idx, element) {
            return paddingElementHeight += $(element).outerHeight(true);
        });
        var windowHeight = $("html").outerHeight(true) - paddingElementHeight;
        var sidebarPadding = this.SidebarSelector().outerHeight(true) - this.SidebarSelector().height();
        this.SidebarSelector().height(Math.max(contentHeight, windowHeight) - sidebarPadding);
    };
    FHSSidebarImpl.prototype.Update = function () {
        this.ResizeSidebar();
    };
    return FHSSidebarImpl;
})();
var FHS = new FHSImpl();
