//页面全局变量
var sort = 'sales_desc', filter = '0', curpage = parseInt('2'), pop_id = 9984, timeNow = 1397886317,
    server_time = 1396922400, page_total = 1, onshow = 0;
seajs.use(['$', 'details_new'], function ($, popPromotion) {

    //测试创建分页
    function test_createPage() {
        //添加分页的DOM外层容器
        $('#qunit-fixture').append('<div class="pop_count page_wrap"></div><div class="page_form"></div>');
        popPromotion.createPage(4, 3);
        var link = $('.page_wrap').find('a.pop_page');
        return '生成' + link.length + '个A链接,当前第' + (link.index(link.not('.pop_page_active')) + 1) + '页,' + $('.page_wrap').find('span').eq(0).html();
    }
    test('test_createPage()', function () {
        equal(test_createPage(), '生成4个A链接,当前第3页,共4页', 'POP动态创建分页');
    })
});