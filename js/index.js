//头部内容居中
$(function(){
    var headerWrap = $('.header-wrap');
    var video = $('.header-wrap video');
    var videoShade = $('.video-shade');
    var bgImg = $('.bg-img');

    center();


    $(window).resize(center);

    //图片视频居中
    function center(){
        var l = Math.floor((headerWrap.width() - $(window).width())/2);
        headerWrap.css('left', -l);
    }
    //视频可以播放时隐藏图片
    video.one('canplay',function(){
        videoShade.css('opacity', .5);
        bgImg.css('opacity', 0);
        this.play();
    })
})