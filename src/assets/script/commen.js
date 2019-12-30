var timer=null;
function showMsg(html){
    var el=$('#msgbox');
    if(el){
        el.html(html)
    }else{
        var msg='<div id="msgbox">'+html+'</div>'
        $('body').append(msg)
    }

    if(timer){
        clearTimeout(timer)
    }

    timer=setTimeout(function(){
        $('#msgbox').animate({
            top: '-50px'
        }, 200);
    },2000)
}