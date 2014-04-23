define(function (require, exports, module) {
    window.Jumei = window.Jumei || {};
    var $ = require("$"), template = require("template");
    var test = require('./details_new_2.js');
    var _w = $(window), scrollLoadTemplate = $(require("./details_new.tpl")).find('#scrollLoadTemplate').html(), getData = false, pop_deal_list = $('.pop_deal_list'), contentstr = '', loadTimes = 0;
    var pageSplit, scrollTimeout, htmlstr, pop_list_loading = $('#pop_list_loading'), pop_list_null = $('#pop_list_null'), category_lnk = $('.pop_category dd a');
    Jumei.popPromotion = {
        _init: function () {
            //初始状态下，创建分页
            if (page_total > 1) {
                this.createPage(page_total, 1);
            }
            _w.bind('scroll', this.scrollLoad);
            //按销量、价格、人气、折扣 排序
            this.sortList();
        },

        //滚动加载下一页
        scrollLoad: function () {
            if (!getData && loadTimes < 2 && curpage <= page_total) {
                clearTimeout(scrollTimeout);
                var topThis = this;
                scrollTimeout = setTimeout(function () {
                    if ($('body').height() < _w.scrollTop() + _w.height() + 800) {
                        getData = true;
                        pop_deal_list.append('<div class="pageLine">第' + (curpage - 1) + '页</div>');
                        _w.unbind('scroll', topThis.scrollLoad);
                        topThis.loadList('scroll', curpage, sort, filter, onshow, function (data) {
                            topThis.callback(data)
//                       curpage++;
                            _w.bind('scroll', topThis.scrollLoad);
                        });
                    }
                }, 300);
            }
        },
        //按销量、价格、人气、折扣 排序
        sortList: function () {
            var pop_compositor = $('.pop_compositor a'), topThis = this;
            //按销量、价格、人气、折扣 排序
            $('.pop_compositor a,.pop_category dd a').click(function () {
                var _self = $(this);
                //当当前点击元素含有属性“filter”时，表示点击的为“分类”，否则表示点击的为“排序”
                if (_self.attr('filter')) {
                    filter = _self.attr('filter');
                    topThis.loadList('', 1, sort, filter, onshow, function (data) {
                        _self.addClass('cur').siblings('a').removeClass('cur');
                        topThis.callback(data);
                    });
                    //描点到顶部
                    var pop_title_new = $(".pop_title_new");
                    if (pop_title_new.length > 0) {

                        $('html,body').animate({scrollTop: pop_title_new.offset().top}, 500);
                    }

                } else {
                    if (!_self.hasClass('onshow')) {
                        desc = _self.hasClass('desc_enable');
                        sort = _self.attr('type') + (desc ? '' : '_desc');
                    }
                    //filter=category_lnk.has('.cur').attr('filter');
                    if (_self.hasClass('onshow')) {
                        if (_self.hasClass('now_show')) {
                            _self.removeClass('now_show');
                        } else {
                            _self.addClass('now_show');
                        }
                    }
                    onshow = $('.onshow').hasClass('now_show') ? 1 : 0;

                    topThis.loadList('', 1, sort, filter, onshow, function (data) {
                        if (!_self.hasClass('onshow')) {
                            pop_compositor.removeClass('asc_enable').removeClass('desc_enable').removeClass('mouse_hover');
                            if (desc) {
                                _self.addClass('asc_enable');
                            } else {
                                _self.addClass('desc_enable');
                            }
                        }
                        topThis.callback(data);
                    });
                }


                return false;
            });
        },
        /**
         * 加载POP列表页列表
         * @param type {string} 加载方式，当为scroll时，表示滚动时加载，使用append()追加内容到容器中，否则为点击排序时加载，点击加载是使用html(),替换容器内内容
         * @param curpage {number} 当前页数
         * @param sort {string} 排序方式:销量：sales/sales_desc、价格：price/price_desc、折扣：discount/discount_desc，人气：popular/popular_desc
         * @param filter {number} 分类ID，全部分类为：0
         * @param onshow 仅显示有货  1表示仅显示有货 0表示显示全部
         */
        loadList: function (type, curpage, sort, filter, onshow, callback) {
            pop_list_null.hide();
            var topThis = this;
            var data = require('./data.json');
            if (data.page_total >= curpage) {
                data.timeNow = timeNow;
                data.server_time = server_time;
                data.from = '222';
                data.curpage = curpage;
                //当页数只有一页时，隐藏分页，否则动态创建分页
                if (data.page_total === 1) {
                    $('.page_wrap,.page_form').hide();
                } else if (type !== 'scroll' || !pageSplit) {//当不为滚动时，即点击分页、分类、排序和分页不存在时，重新生成分页
                    topThis.createPage(data.page_total, curpage);
                }
                //当为滚动页面时，append内容到容器
                if (type === 'scroll') {
                    pop_deal_list.append(template.compile(scrollLoadTemplate)(data)).show();
                    getData = false;
                    loadTimes++;
                    //当分页不存在时
                    //  pageSplit=$('#pageSplit');
                    // pageSplit.find('a').addClass('pop_page_active').eq(data.page-1).removeClass('pop_page_active');
                } else {
                    loadTimes = 0;
                    pop_deal_list.html(template.compile(scrollLoadTemplate)(data)).show();
                    page_total = data.page_total;
                }
                pop_list_loading.hide();
            } else {//当数据为空时
                page_total = 0;
                pop_deal_list.hide();
                pop_list_null.show();
                pop_list_loading.hide();
                $('.page_wrap,.page_form').hide();
            }
            if (typeof(callback) === 'function') {
                callback.call(this, data);
            }

        }, /**
         * 动态创建分页
         * @param page_total {json} 总页数
         * @page page {number} 当前页数
         */
        createPage: function (page_total, page) {
            //头部分页
            var page_total = Math.ceil(page_total),
                preClass = page <= 1 ? 'pop_page pop_pre' : 'pop_page pop_pre pop_page_active',
                nextClass = page >= page_total ? 'pop_page pop_next' : 'pop_page pop_next pop_page_active',
                topPageStr = '<span class="account" >共计' + page_total + '条，' + page + '/' + page_total + '页</span>';
            topPageStr += '<a class="' + preClass + '" href="javascript:;">&lt;</a>';
            topPageStr += '<a class="' + nextClass + '" href="javascript:;">&gt;</a>';
            //页面底部分页
            var pageStr = '<form id="pageSplit" action="#pagemap" method="get">';
            pageStr += '<input type="hidden" value="' + sort + '" name="sort">';
            pageStr += '<input type="hidden" value="' + filter + '" name="filter">';
            for (var i = 1; i <= page_total; i++) {
                if (i === page) {
                    pageStr += '<a class="pop_page" href="?sort=' + sort + '&amp;filter=' + filter + '&amp;page=' + i + '#pagemap">' + i + '</a>';
                } else {
                    pageStr += '<a class="pop_page  pop_page_active" href="?sort=' + sort + '&amp;filter=' + filter + '&amp;page=' + i + '#pagemap">' + i + '</a>';
                }
            }
            pageStr += ' <span>共' + page_total + '页</span>';
            pageStr += '      <span>去第 <input type="page" name="page" id="J_page" class="pop_go_page"> 页</span>';
            pageStr += ' <input type="submit" value="确定" class="pop_page pop_page_active">';
            pageStr += '        </form>';
            $('.page_wrap').html(pageStr).show().find('#pageSplit').submit(function () {
                var page = parseInt($('#J_page').val());
                if (page && page !== curpage - 1 && page > 0 && page <= page_total) {
                    this.loadList('', page, sort, filter, onshow, this.callback);
                    $(window).scrollTop($('.pop_compositor').offset().top);
                }
                return false;
            }).find('a').click(function () {
                    var num = $.trim($(this).html());
                    this.loadList('', num, sort, filter, onshow, this.callback);
                    $(window).scrollTop($('.pop_compositor').offset().top);
                    return false;
                });
            $('.page_form').html(topPageStr).show().find('a').click(function () {
                var _this = $(this), num;
                if (_this.hasClass('pop_page_active')) {
                    num = _this.hasClass('pop_pre') ? curpage - 2 : curpage;
                    this.loadList('', num, sort, filter, onshow, this.callback);
                }
                return false;
            });
        },
        /**
         * 加载数据后的回调函数,主要用于处理分页显示状态
         * @param data {json} ajax返回的数据
         */
        callback: function (data) {
            var page = Math.ceil(data.page), page_total = Math.ceil(data.page_total);
            curpage = page + 1;
            pageSplit = $('#pageSplit');
            pageSplit.find('a').addClass('pop_page_active').eq(page - 1).removeClass('pop_page_active');
            page_form = $('.page_form');
            page_form.find('.account').html('共计' + page_total + '条，' + page + '/' + page_total + '页');
            page_form.find('.pop_pre').addClass('pop_page_active');
            page <= 1 ? page_form.find('.pop_pre').removeClass('pop_page_active') : page_form.find('.pop_pre').addClass('pop_page_active');
            page >= page_total ? page_form.find('.pop_next').removeClass('pop_page_active') : page_form.find('.pop_pre').addClass('pop_next');
        }
    }
    Jumei.popPromotion.this = Jumei.popPromotion;
    Jumei.popPromotion._init();
    popPromotion = Jumei.popPromotion;

    return popPromotion;
});