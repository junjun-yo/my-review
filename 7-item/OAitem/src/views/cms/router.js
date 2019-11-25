const router = [
    {
        path: "cms/catalog",
        name: "cms/catalog",
        component: resolve =>
            require(["views/cms/cmsCatalog/index"], resolve),
        meta: { title: "CMS-栏目管理", icon: "icon-tickets" }
    },
    {
        path: "cms/document",
        name: "cms/document",
        component: resolve =>
            require(["views/cms/cmsDocument/index"], resolve),
        meta: { title: "CMS-文档采集", icon: "icon-tickets" }
    }
];

export default router;
