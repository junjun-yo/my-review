// 版本信息配置
export const version = {
  version: "Version 1.0",
  desc: "测试版"
};

//节点菜单配置
export const nodeTypes = [
  {
    type: "start",
    name: "开始",
    icon: "el-icon-video-play",
    width: 50,
    height: 50
  },
  {
    type: "end",
    name: "结束",
    icon: "el-icon-video-pause",
    width: 50,
    height: 50
  },
  {
    type: "user",
    name: "任务节点",
    icon: "el-icon-user",
    width: 130,
    height: 70
  },
  {
    type: "gateway",
    name: "分支",
    icon: "el-icon-cpu",
    width: 40,
    height: 40
  }
];

//下面属于jsplumb的配置。无需修改
export const connectConfig = {
  anchor: ["Bottom", "Right", "Top", "Left"],
  connector: [
    "Flowchart",
    {
      gap: 5,
      cornerRadius: 8,
      alwaysRespectStubs: true
    }
  ],
  ConnectionOverlays: [
    [
      "Label",
      { label: "", id: "line-label", cssClass: "aLabel", location: 0.5 }
    ]
  ],
  paintStyle: {
    stroke: "#2a2929",
    strokeWidth: 2
  }
};

export const instanceConfig = {
  Connector: [
    "Flowchart",
    {
      gap: 5,
      cornerRadius: 8,
      alwaysRespectStubs: true
    }
  ],
  ConnectionOverlays: [
    [
      "Arrow",
      {
        width: 10,
        length: 10,
        location: 1
      }
    ],
    [
      "Label",
      { label: "", id: "line-label", cssClass: "aLabel", location: 0.5 }
    ]
  ],
  PaintStyle: {
    stroke: "#2a2929",
    strokeWidth: 2
  },
  HoverPaintStyle: {
    stroke: "#409EFF",
    strokeWidth: 3
  },
  EndpointStyle: {
    fill: "#456",
    stroke: "#2a2929",
    strokeWidth: 1,
    radius: 3
  },
  EndpointHoverStyle: {
    fill: "pink"
  }
};

export const sourceOptions = {
  filter: "a",
  filterExclude: true,
  maxConnections: -1,
  endpoint: ["Dot", { radius: 7 }],
  anchor: ["Bottom", "Right", "Top", "Left"]
};

export const targetConfig = {
  filter: "a",
  filterExclude: true,
  allowLoopback: false,
  maxConnections: -1,
  endpoint: ["Dot", { radius: 7 }],
  anchor: ["Bottom", "Right", "Top", "Left"]
};

export const linkContextmenu = {
  menuName: "link-menu",
  axis: {
    x: null,
    y: null
  },
  menulists: [
    {
      fnHandler: "deleteLink",
      icoName: "edit",
      btnName: "删除连线"
    }
  ]
};
