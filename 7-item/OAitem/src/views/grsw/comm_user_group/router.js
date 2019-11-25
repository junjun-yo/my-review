const router = [
    {
        path: "grsw/comm_user_group/:userId",
        name: "comm_user_group",
        component: resolve =>
            require(["views/grsw/comm_user_group/index"], resolve),
        meta: { title: "常用用户组", icon: "icon-tickets" }

    }
];

export default router;
