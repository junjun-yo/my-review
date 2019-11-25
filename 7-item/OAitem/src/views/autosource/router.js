const router = [
    {
        path: "autosource",
        name: "autosource",
        component: resolve =>
            require(["views/autosource/index"], resolve),
        meta: { title: "代码生成", icon: "icon-tickets" }
    }
];

export default router;
