const router = [
    {
        path: "grsw/comm_dept_group/:userId",
        name: "comm_dept_group",
        component: resolve =>
            require(["views/grsw/comm_dept_group/index"], resolve),
        meta: { title: "一般部门组", icon: "icon-tickets" }
    }
];

export default router;
