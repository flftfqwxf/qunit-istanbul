<div>
<script type="text/template" id="scrollLoadTemplate" desc="POP列表页-列表模版">
    <% var _from = ''%>
    <% for (var i = 0; i < deals.length; i ++) {
    if( from !=''){ _from = '?from='+from+'_'+curpage+'_' + (i + 1)} %>
    <div class="pop_deal_single">
        <div class="hidden">
            <div class="popular_rank"><%=order%></div>
            <div class="buyer_number_rank"><%=deals[i].buyer_number%></div>
            <div class="price_rank"><%=deals[i].discounted_price%></div>
            <div class="discount_rank"><%=deals[i].discount%></div>
        </div>
        <div class="pic pic_hover" product_id="<%=deals[i].product_id%>">
            <%if (timeNow < deals[i].start_time){%>
                <div class="icon png"></div>
                <%}%>
            <%if (promotion_index==1){%>
                <div class="pop_activities_deal_singleNew pop_activities_deal_singleNew1"></div>
                <%}else if (promotion_index==3){%>
                <div class="pop_activities_deal_singleNew pop_activities_deal_singleNew3"></div>
                <%}else if (promotion_index==9){%>
                <div class="pop_activities_deal_singleNew pop_activities_deal_singleNew9"></div>
                <%}%>
            <a href="/i/deal/<%=deals[i].hash_id%>.html<%=_from%>" target="_blank" rel="nofollow">
                <img alt="<%=deals[i].short_name%>" title="<%=deals[i].short_name%>" original="<%=deals[i].image%>" src="<%=deals[i].image%>" width="225" height="300"/>
                <% if (promotion_letters){%><span class="pop_list_bg"><%=promotion_letters%></span><%}%>
            </a>
            <% if (timeNow>deals[i].end_time || deals[i].status==2){%>
                <span class="end"></span>
                <%}else{%>
                <% if (promotion_index==2){%>
                <span class="corn_manjian_bingdian"></span>
                <%}else if (promotion_list==1){%>
                <span class="corn_manjian"></span>
                <%}%>
                <%}%>
        </div>
        <a href="/i/deal/<%=deals[i].hash_id%>.html<%=_from%>" target="_blank" class="name"><%=deals[i].short_name%></a>
        <p class="zhe_box">
            <% if (timeNow > deals[i].start_time || deals[i].is_published_price==1){%>
                        <span class="num01"><em>¥</em><%=deals[i].discounted_price%></span>
                    <% if (deals[i].discount <9.5) {%>
                        <span class="zhe">(<%=deals[i].discount%>折)</span>&nbsp;<span class="num02">¥<%=deals[i].original_price%></span>
                    <%}%>
                        <%if (timeNow >server_time && deals[i].discounted_price>=159 && deals[i].end_time > timeNow && deals[i].status!=2){%>
                            <span class="free_shipping_ico">&nbsp;</span>
                        <%}%>
                    <%} else { %>
            <span class="num01"><em>¥</em>??</span>
            <span class="num02">¥<%=deals[i].original_price%></span>
            <%}%>

        </p>
    </div>
    <%}%>
</script>
</div>