interface FHS
{
    Create(sidebarSelector: string, containerSelector: string, paddingElementsSelector?: string);
}

interface FHSSidebar
{
    Update();
}

declare var FHS: FHS;