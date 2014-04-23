/**
 * seajs配置文件，使用seajs加载，必须依赖此文件
 */

(function(){
    var file_version='v1.2';
    //线上
    if (location.search.indexOf('online') > -1) {
        seajs.config({
            //指定为CDN sea-modules目录
//            base:'http://s0.jmstaticdev.com/templates/jumei/js/sea-js/sea-modules',
            preload:'seajs/seajs-text/1.0.2/seajs-text-debug',
            alias: {
                $: 'jquery/jquery/1.10.1/jquery',
                template:'artTemplate/template',
                "details_new":file_version+'/pop/details_new'
            }
        })
    }
//    else if(location.search.indexOf('local') > -1) {
//        //本地测试，并且不跨域,不打包
//        seajs.config({
//            preload:'seajs/seajs-text/1.0.2/seajs-text-debug',
////        base:'http://s0.jmstaticdev.com/templates/jumei/js/sea-js/sea-modules',
////        path:'',
//            alias: {
//                $: 'jquery/jquery/1.10.1/jquery',
//                template:'artTemplate/template',
//                "details_new":'/scaffold/src/pop/details_new'
//            }
//        })
//    }
    else {
        //本地测试，跨域打包
        seajs.config({
            preload:'seajs/seajs-text/1.0.2/seajs-text-debug',
//            base:'http://s0.jmstaticdev.com/templates/jumei/js/sea-js/sea-modules',
            alias: {
                $: 'jquery/jquery/1.10.1/jquery',
                template:'artTemplate/template',
                "details_new":'/scaffold/src/pop/details_new'
            }
        })
    }
})()

