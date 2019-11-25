const router = [
    {
        path: "workflow/index",
        name: "workflow_index",
        component: resolve =>
            require(["views/workflow/index"], resolve),
        meta: { title: "流程定义"}
    }
    ,{
        path: "workflow/subtype",
        name: "workflow/subtype",
        component: resolve =>
            require(["views/workflow/subtype/index"], resolve),
        meta: { title: "流程分类", icon: "icon-tickets" }
    }
    ,{
        path: "workflow/user_start/:flowType/:showSubType",
        name: "workflow_user_start",
        component: resolve =>
            require(["views/workflow/user/user_start"], resolve),
        meta: { title: "拟稿"}
    }
    ,{
        path: "workflow/user_pending/:flowType",
        name: "workflow_user_pending",
        component: resolve =>
            require(["views/workflow/user/user_pending"], resolve),
        meta: { title: "待办列表"}
    }
    ,{
        path: "workflow/user_processed/:flowType",
        name: "workflow_user_processed",
        component: resolve =>
            require(["views/workflow/user/user_processed"], resolve),
        meta: { title: "已办列表"}
    }
];

export default router;
