var shareUrl = {
    qzone:'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={url}&title={title}&appkey={appkey}&desc={desc}&summary={summary}&site={site}&pics={pic}',
    qim:'http://connect.qq.com/widget/shareqq/index.html?url={url}&title={title}&desc={desc}&appkey={appkey}&summary={summary}&site={site}&pics={pic}',
    sina:'http://service.weibo.com/share/share.php?url={url}&title={title}&appkey={appkey}&pic={pic}&searchPic=true'
}


var share = {
    config:{
        url:location.href,
        title:'test',
        desc:'test',
        summary:'test',
        appkey:{},
        site:'buka',
        pic:'xx.jpg'
    },
    tmpToVal:function(command){
        var tmpUrl = shareUrl[command];
        for(var x in this.config)
        {
            if(x == 'appkey')
            {
                var value = this.config['appkey'][command];
                if(!value)
                {
                    value = '';
                }
            }else{
                var value = this.config[x];
            }
            var pattern = new RegExp('{('+x+')}');
            value = encodeURI(value);
            tmpUrl = tmpUrl.replace(pattern, value);
            console.log(tmpUrl);
        }
        return tmpUrl;

    }
}

var newOpenUrl = function(url)
{
    window.open(url);
}


var shareCommand = {
    qzone:function(){
        newOpenUrl(share.tmpToVal('qzone'));
    },
    qim:function(){
        newOpenUrl(share.tmpToVal('qim'));
    },
    sina:function(){
        newOpenUrl(share.tmpToVal('sina'));
    }
}
var _config = {
    wrapperContainer:'.share-btns'
}
//给每个容器中的按钮绑定事件

;(function(){
    var btnList = $(_config.wrapperContainer).find('a[cmd]');
    $.each(btnList,function(i,n){
        var cmd = $(n).attr('cmd');
        if(shareCommand[cmd])
        {
            $(n).click(function(){
                shareCommand[cmd]();
            })
        }
    })
})();
