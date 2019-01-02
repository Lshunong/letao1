setHtmlFontSize();
function setHtmlFontSize(){
    //假设设计稿的大小
    var designwidth =750;
    //假设设计稿根元素大小
    var designFontSize = 200;
    //获取当前屏幕宽度
    var windowWidth = document.documentElement.offsetWidth;
    //计算当前屏幕根元素大小
    var nowFontSize = windowWidth / (750/200);

    
    //设置当前HTML元素的font-size上
    document.documentElement.style.fontSize=nowFontSize+"px";
}
//添加一个屏幕宽度变化的事件  变化后执行根元素计算设置
window.addEventListener('resize',setHtmlFontSize);