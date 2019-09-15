//2.导入path模块 用来辅助出入口路径
const path = require('path')
module.exports = {
    //1.编译模式 上线阶段使用production模式
    mode: "development",
    //3.指定打包入口及出口
    entry: path.join(__dirname, './src/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    }
}