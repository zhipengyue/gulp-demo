var iphone4={width:320,height:416};
var psdinfo={width:640,height:1009};
var pages=[];
window.psdinfo=psdinfo
var Swiper;
require.config({
    baseUrl: "/",
    　paths: {
        'jquery': 'lib/jquery',
        'text': 'lib/require/require-plugins/text',
        'domReady': 'lib/require/require-plugins/domReady',
        'image': 'lib/require/require-plugins/image',
        "json": "lib/require/require-plugins/json",
        "baidu": "lib/require/baiduTemplate",
        'Swiper': 'lib/swiper/swiper',
        "hr": "lib/HtmlRenderer",
        "Page":"js/Page",
        "ETMotion":"js/ETMotion"
    },
    waitSeconds: 10,
    map: {},
    shim: {}
});
require(['jquery', 'Swiper'], 
function($, Swiper) {

    /*
    *基于微信下：计算当前设备屏幕宽高比,如果设备宽高比，大于77%（iphone4设备的宽高比）则按此设备的高度与77%比率计算出最宽宽度／
    */
    init();
    /*
    * 1 加载配置文件
    * 2 根据配置文件，构建swiper架构
    */
    Swiper=Swiper;
    readRootConfig();
    

    
});

//计算屏幕设备比率，设置最宽宽度
function init()
{
   var screenWidth=$(window).width();
   var screenHeight=$(window).height();
   var screenPer=screenWidth/screenHeight;
   screenPer=screenPer>getMaxScreenper()?getMaxScreenper():screenPer;
   ///$("#mainFrame").css("height",screenHeight+"px");
   //$("#mainFrame").css("width",screenHeight*screenPer+"px");
   //修改meta值，强制缩放至自适应比率
   var scale=screenWidth/640;

   /*
   var oMeta = document.createElement('meta');
       oMeta.charset = 'utf-8';
       oMeta.name="viewport";
       oMeta.content="width=device-width, initial-scale="+scale+", minimum-scale="+scale+", maximum-scale="+scale+", user-scalable=no"
     document.getElementsByTagName('head')[0].appendChild(oMeta);
    */
   $("#mainFrame").css("height",640/screenPer+"px");
   $("#mainFrame").css("width",640+"px");
}

//获取最大屏幕比率
function getMaxScreenper()
{
    return iphone4.width/iphone4.height;
}

//加载根配置文件
function readRootConfig()
{
    require(["json!data/export.data"], 
        function(htmldata) {
            /*
            *<div class="swiper-slide"></div>
            */
            console.log(htmldata);

            for(var i=0;i<htmldata["psd"].length;i++)
            {
                
                //创建Page对象，传递参数
                var pagedata=(htmldata["psd"][i]);
                var page=new Page();
                    page.initWith("page page_index"+i,pagedata["page"],i);
                var pageHtml=page.createPage();
                //根据配置文件，创建slide框架  
                var slide=document.createElement('div');
                $(slide).addClass("swiper-slide");
                $(slide).append(pageHtml);
                 
                $("#container .swiper-container .swiper-wrapper").append(slide);
                pages.push(page);
            }
            addSwiper();


            //加载第一页 和第二页
            loadigpage(pages[0]);
            loadigpage(pages[1]);
        }
    )
}

//添加Swiper
function addSwiper()
{
    var mySwiper = new Swiper ('.swiper-container', {
    direction: 'vertical',
    loop: false,
    
    // 如果需要分页器
    pagination: '.swiper-pagination',
    
  })        
}

function loadigpage(page)
{
     page.loading(function(){
        page.loaded();
    })
}