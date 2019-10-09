//获取协议模块 
const http = require('http');
//创建服务器
app = http.createServer();
//导入querstring模块
const queryString = require('querystring');

//导入mongoose模块
const mongoose = require('mongoose');
//连接mongoose
mongoose.connect('mongodb://localhost/playground',{ useNewUrlParser: true })
.then(()=>{console.log('数据库连接成功');})
.catch((err)=>{console.log(err,'数据库连接失败')});
//创建集合
// const courseDemo = mongoose.model('Course',{
//     name:String,
//     teacher:String,
//     age:Number
// });
// const course = new courseDemo ({
//     name:'web api',
//     teacher:'bobo',
//     age:18
// })
// course.save((err)=>{
//     console.log(err);
// })
// 模式类型
const courseDemo = new mongoose.Schema({
    name:String,
    teacher:String,
    age:Number
});
// 将创建的类型添加到数据库
const course = mongoose.model('Course',courseDemo);
//请求事件
app.on('request', (req, res) => {
    // console.log(queryString.parse(req.url));
    //获取请求提交的方式
    const method = req.method.toLowerCase();
    //如果方式为post
    if (method == 'post') {
        //定义一个变量 接收post传过来的值
        let params = '';
        req.on('data', formData => {
            params += formData;
        });
        req.on('end', () => {
            const finalData = queryString.parse(params);
            console.log(finalData);
        })
        res.end('ohhhh');
    };
});
//监听 添加端口
app.listen(4000, () => {
    console.log('服务器创建成功');
})