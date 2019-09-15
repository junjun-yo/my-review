import $ from 'jquery'

$(function () {
    $('li:odd').css('backgroundColor', 'skyblue')
    $('li:even').css('backgroundColor', 'orange')
})


// 配置快捷启动方式 npm run dev
// 在package.json中  scripts里面添加 "dev": "webpack"