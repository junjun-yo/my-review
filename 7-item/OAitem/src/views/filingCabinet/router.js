const router = [
    {
        path: "filingCabinet",
        name: "filingCabinet",
        component: resolve =>
            require(["views/filingCabinet/index"], resolve),
        meta: { title: "文件柜", icon: "icon-tickets" }
    },
];

export default router;
