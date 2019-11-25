let beautify_html = require("js-beautify").html;

//节点生成bpmn xml配置
const buildNode = {
  //开始节点
  start: (node, lines) => {
    let temp = `<startEvent id="${node.id}">`;

    lines.forEach(line => {
      temp += `<outgoing>${line.id}</outgoing>`;
    });

    temp += `</startEvent>`;
    return temp;
  },
  //用户节点
  user: (node, lines) => {
    let temp = `<userTask id="${node.id}" name="${node.name}">`;
    //处理进口关联
    lines.forEach(line => {
      if (line.targetId == node.id) {
        temp += `<incoming>${line.id}</incoming>`;
      }
    });
    //处理出口关联
    lines.forEach(line => {
      if (line.sourceId == node.id) {
        temp += `<outgoing>${line.id}</outgoing>`;
      }
    });

    temp += `</userTask>`;
    return temp;
  },
  //网关
  gateway: (node, lines) => {
    if(!node.config || !node.config.type){
      node.config = node.config ? node.config : {};
      node.config.type = "exclusive";
    }
    let temp = `<${node.config.type}Gateway id="${node.id}" name="${node.name}">`;
    //处理进口关联
    lines.forEach(line => {
      if (line.targetId == node.id) {
        temp += `<incoming>${line.id}</incoming>`;
      }
    });
    //处理出口关联
    lines.forEach(line => {
        if (line.sourceId == node.id) {
            temp += `<outgoing>${line.id}</outgoing>`;
        }
    });
    temp += `</${node.config.type}Gateway>`;
    return temp;
  },
  //结束节点
  end: (node, lines) => {
    let temp = `<endEvent id="${node.id}">`;

    lines.forEach(line => {
      temp += `<incoming>${line.id}</incoming>`;
    });

    temp += `</endEvent>`;
    return temp;
  }
};

//基础编译框架无需修改
export default data => {
  //节点集合
  const nodeList = data.nodeList;

  //连线集合
  const lineList = data.lineList;

  //流程配置
  const config = data.config;

  return buildXml(config, nodeList, lineList);
};

//构建BpmnXml
const buildXml = (config, nodeList, lineList) => {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>`;
  xml += `<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:flowable="http://flowable.org/bpmn" id="definitions" targetNamespace="http://flowable.org/bpmn20">
            <process id="${config.flowKey}" name="${config.flowName}">`;

  if (nodeList && nodeList.length > 0) {
    nodeList.forEach(node => {
      const type = node.type;
      const lines = lineList.filter(line => {
        return line.sourceId == node.id || line.targetId == node.id;
      });
      xml += buildNode[type](node, lines);
    });
  }

  if (lineList && lineList.length > 0) {
    lineList.forEach(line => {
      if(!line.uel || line.uel==""){
          xml += `<sequenceFlow id="${line.id}" sourceRef="${line.sourceId}" targetRef="${line.targetId}" />`;
      }else{
          xml += `<sequenceFlow id="${line.id}" sourceRef="${line.sourceId}" targetRef="${line.targetId}" ><conditionExpression>${line.uel}</conditionExpression></sequenceFlow>`;
      }
    });
  }

  xml += `</process></definitions>`;
  return beautify_html(xml, { indent_size: 2 });
};
