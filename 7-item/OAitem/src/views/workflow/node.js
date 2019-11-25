const workflowNode = {
    taskStatus: [
        {label:"待处理",value:"PENDING"},
        {label:"已处理",value:"PROCESSED"},
        {label:"已撤销",value:"CANCEL"},
        {label:"已超时",value:"TIMEOUT"}
    ],
    instanceStatus: [
        {label:"流转中",value:"ACTIVE"},
        {label:"挂起",value:"SLEEP"},
        {label:"已结束",value:"CLOSE"},
        {label:"撤销",value:"CANCEL"}
    ]
};
workflowNode.filter = (name,value)=>{
    let nodes = workflowNode[name];
    let str = "";
    for(let i in nodes){
        if(value === nodes[i].value){
            str = nodes[i].label;
        }
    }
    return str;
};
export default workflowNode;