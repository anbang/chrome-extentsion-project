define(function (require, exports, module) {
    "require:nomunge,exports:nomunge,module:nomunge";
    var $page=$("#page-popup");
    var $ContactHeader=$page.find(".menu");
    var $pageMain=$page.find(".page-main");
    var targetAry=[];
    var pageUtility={
        init:function(){
            this.initLeftRightNavigation();
            this.initLeftRightTools();
            this.initToolsWrapScrollTop();
            this.bind();
        },
        bind:function(){
            $ContactHeader.on("click",".menu-item",function(e){
                e.preventDefault();
                var $this=$(this);
                var index=$(this).index();
                var menuLeftItemsLength=$page.find(".j-menu-left").find(".menu-item").length;
                //如果是右侧的导航
                index=!!$this.closest(".j-menu-right").length?(menuLeftItemsLength+index):index;
                $pageMain.animate({scrollTop:targetAry[index]-70},"fast");
            });
            $pageMain[0].onscroll=function(){
                var nowScrollTop=this.scrollTop;
                var $allItemsLink=$ContactHeader.find(".menu-item a");
                /*如果在某个阶段,高亮对应的选项*/
                $.each(targetAry,function(index,val){
                    if((nowScrollTop>val)&&(val<targetAry[index+1])){
                        $allItemsLink.removeClass("active");
                        if(nowScrollTop<200){
                            $allItemsLink.eq(0).addClass("active");
                        }else{
                            $allItemsLink.eq(index+1).addClass("active");
                        }
                    }
                })
            }
        },
        initLeftRightNavigation:function(){
            /*左右两个列表展示*/
            var $menuLeft=$page.find(".j-menu-left");
            var $menuRight=$page.find(".j-menu-right");
            var targetLeftMenu="",
                targetRightMenu="";
            $.each(dataObj.left_menu_item,function(index,val){
                var tempLeftItemStr=[
                    '<li class="menu-item">',
                    '    <div class="menu-title">',
                    '         <a href="javascript:;" class="'+(index==0?"active":"")+'">'+val.item_name+'</a>',
                    '    </div>',
                    '</li>'].join("");
                targetLeftMenu+=tempLeftItemStr;
            });
            $.each(dataObj.right_menu_item,function(index,val){
                var tempRightItemStr=[
                    '<li class="menu-item">',
                    '    <div class="menu-title">',
                    '         <a href="javascript:;" >'+val.item_name+'</a>',
                    '    </div>',
                    '</li>'].join("");
                targetRightMenu+=tempRightItemStr;
            });
            $menuLeft.empty().append(targetLeftMenu);
            $menuRight.empty().append(targetRightMenu);
        },
        initLeftRightTools:function(){
            /*左右两个列表对应的内容区域填充*/
            var $LeftTools=$page.find(".j-tool-items-left");
            var $RightTools=$page.find(".j-tool-items-right");
            var targetLeftTools="",
                targetRightTools="";
            $.each(dataObj.left_menu_item,function(index,val){
                var LeftToolsHeaderStr="",
                    LeftToolsBodyerStr="",
                    LeftToolsFooterStr="";
                var tempToolsStr="";
                var toolsData=this.item_data;
                LeftToolsHeaderStr=[
                    '<li class="j-tool-item tool-item">',
                    '    <p class="tool-icon-wrap-title wui-txt-xs wui-txt-muted">'+val.item_name+'</p>',
                    '    <div class="tool-icon-wrap">'].join("");
                $.each(toolsData,function(index,val){
                    tempToolsStr=[
                        '        <div class="tool-icon-wrap-item tac">',
                        '            <a class="tool-wrap" href="'+val.tool_link+'" target="_blank" title="'+val.tool_icon_description+'">',
                        '                <span class="tool-wrap-avatar">',
                        '                    <svg class="icon">',
                        '                        <use xlink:href="'+val.tool_icon_code+'"></use>',
                        '                    </svg>',
                        '                </span>',
                        '                <p class="tool-wrap-name">'+val.tool_name+'</p>',
                        '            </a>',
                        '        </div>'].join("");
                    LeftToolsBodyerStr+=tempToolsStr;
                });
                LeftToolsFooterStr=[
                    '    </div>',
                    '</li>'].join("");
                targetLeftTools+=(LeftToolsHeaderStr+LeftToolsBodyerStr+LeftToolsFooterStr);
            });
            $.each(dataObj.right_menu_item,function(index,val){
                var rightToolsHeaderStr="",
                    rightToolsBodyerStr="",
                    rightToolsFooterStr="";
                var tempToolsStr="";
                var toolsData=this.item_data;
                rightToolsHeaderStr=[
                    '<li class="j-tool-item tool-item">',
                    '    <p class="tool-icon-wrap-title wui-txt-xs wui-txt-muted">'+val.item_name+'</p>',
                    '    <div class="tool-icon-wrap">'].join("");
                $.each(toolsData,function(index,val){
                    tempToolsStr=[
                        '        <div class="tool-icon-wrap-item tac">',
                        '            <a class="tool-wrap" href="'+val.tool_link+'" target="_blank" title="'+val.tool_icon_description+'">',
                        '                <span class="tool-wrap-avatar">',
                        '                    <svg class="icon">',
                        '                        <use xlink:href="'+val.tool_icon_code+'"></use>',
                        '                    </svg>',
                        '                </span>',
                        '                <p class="tool-wrap-name">'+val.tool_name+'</p>',
                        '            </a>',
                        '        </div>'].join("");
                    rightToolsBodyerStr+=tempToolsStr;
                });
                rightToolsFooterStr=[
                    '    </div>',
                    '</li>'].join("");
                targetRightTools+=(rightToolsHeaderStr+rightToolsBodyerStr+rightToolsFooterStr);
            });
            $LeftTools.empty().append(targetLeftTools);
            $RightTools.empty().append(targetRightTools);
        },
        initToolsWrapScrollTop:function(){
            $pageMain.find(".j-tool-item").each(function(){
                targetAry.push(($(this).offset()||0).top)
            });
        }
    };
    pageUtility.init();
});
