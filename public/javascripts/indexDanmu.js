window.addEventListener('load', function(){
    
    var CM = new COmmentManager($('#my-comment-stage'));
    CM.init();

    CM.start();

    window.CM = CM;
});