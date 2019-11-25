const router =[
    //写信
    {
        path:"mailbox/write_mail",
        name:"send_mail",
        component: resolve => require(["views/mailbox/write_mail/index"], resolve)
    },
    //打开
    {
        path:"mailbox/write_mail1",
        name:"send_mail1",
        component: resolve => require(["views/mailbox/write_mail/index2"], resolve)
    },
    {
        path:"/mailbox/open_mail/complete",
        name:"complete",
        component: resolve => require(["views//mailbox/open_mail/component/complete"], resolve)
    },
    //收件
    {
        path:"mailbox/receive_mail",
        name:"receive_mail",
        component: resolve => require(["views/mailbox/receive_mail/index"], resolve)
    },
    {
        path:"mailbox/open_mail",
        name:"open_mail",
        component: resolve => require(["views/mailbox/open_mail/index"], resolve)
    },
    //已发送
    {
        path:"/mailbox/sent_mail",
        name:"sent_mail",
        component: resolve => require(["views/mailbox/sent_mail/index"], resolve)
    },
    //草稿
    {
        path:"/mailbox/draft_box/",
        name:"draft_box",
        component: resolve => require(["views/mailbox/draft_box/index"], resolve)
    },
    //垃圾
    {
        path:"/mailbox/garbage",
        name:"garbage",
        component: resolve => require(["views/mailbox/garbage/index"], resolve)
    },
    //星标
    {
        path:"/mailbox/flag_star",
        name:"flag_star",
        component: resolve => require(["views/mailbox/flag_star/index"], resolve)
    },
    //我的文件夹
    {
        path:"/mailbox/my_dir",
        name:"my_dir",
        component: resolve => require(["views/mailbox/my_dir/index"], resolve)
    },
    {
        path:"/mailbox/my_dir/dirInfo/",
        name:"dirInfo",
        component:resolve => require(["views/mailbox/my_dir/component/dirInfo"], resolve)
    }
];
export  default router