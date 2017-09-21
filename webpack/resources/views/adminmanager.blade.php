<!DOCTYPE html>
<html lang="zh-cn" class="black-turnoff">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1"/>
    <meta name="renderer" content="webkit">
    <link rel="icon" href="{{asset('/favicon.ico')}}" type="image/x-icon" />
	<title>@yield('title',config('custom.app_name').'资产管理平台')</title>

    {{-- 前端监控 ONEAPM 停止提供免费版本，缴费之前暂不启用 --}}
    {{-- @if( config('view.path_prefix') )
        @include('frontend_monitor')
    @endif --}}

    {{-- @if( !Request::is('oms*') && !Request::is('risk*') && !Request::is('risk/list') && !Request::is('product/index') && !Request::is('user/list') && !Request::is('user/get_modify') && !Request::is('user/pb_page') && !Request::is('user/permission_deny') )
        <link href="{{ asset('/bootstrap/css/bootstrap.min.css') }}" rel="stylesheet">
        <link href="{{ asset('/bootstrap/css/bootstrap-datetimepicker.min.css') }}" rel="stylesheet">
    @endif --}}
    <style>
	    body{padding-top: 60px;padding-bottom: 30px;}
	    .sidebar {display: none;}
	    .nav-sidebar {margin-right: -21px;margin-bottom: 20px;margin-left: -20px;}
	    .main {padding: 20px;}
	    @media (min-width: 768px){
		    .sidebar {position: fixed;top: 40px;bottom: 0;left: 0;z-index: 1000;display: block;padding: 20px;overflow-x: hidden;overflow-y: auto;background-color: #f5f5f5;border-right: 1px solid #eee;}
		    .main {padding-right: 40px;padding-left: 40px;}
		}
    </style>
    {{-- <link href="{{ asset('/3rd/toastr/toastr.min.css') }}" rel="stylesheet"> --}}
	@yield('asset-css')
    <!--[if lt IE 9]>
        <script type="text/javascript" src="{{ asset('/js/html5shiv.js') }}"></script>
        <script type="text/javascript" src="{{ asset('/js/es5.shim.min.js') }}"></script>
    <![endif]-->
    <script src="{{asset('/js/jquery.min.js')}}"></script>
    <!--[if IE]>
        <script type="text/javascript" src="{{ asset('/js/browser-upgrade-warning.js') }}"></script>
    <![endif]-->

    <script src="{{asset('/js/jquery-destroy.event.js')}}"></script>
	<script src="{{asset('/js/jquery.cookie.js')}}"></script>
    <script src="{{asset('/js/jquery.magnific-popup.min.js')}}"></script>
    {{-- <script src="{{asset('/3rd/toastr/toastr.js')}}"></script> --}}
    {{-- <script src="{{asset('/bootstrap/js/bootstrap.min.js')}}"></script> --}}
    <script src="{{asset('/js/moment.min.js')}}"></script>
    <script src="{{asset('/js/numeral.min.js')}}"></script>

    <script src="{{asset('/js/jquery.directives.js')}}"></script>

    <script src="{{ asset('/js/oms/oms.utilities.js') }}"></script>
    <script src="{{ asset('/js/oms/oms.notice.js') }}"></script>
    <script src="{{ asset('/js/oms/oms.filters.js') }}"></script>
    <script src="{{ asset('/js/oms/oms.render.js') }}"></script>
    <script src="{{ asset('/js/oms/oms.directives.js') }}"></script>
    <script src="{{ asset('/js/oms/oms.component.js') }}"></script>
    <script src="{{ asset('/js/oms/utils.js') }}"></script>

    {{--
        TODO: 把 blade 文件中，所有的php代码移出来，用 js 全局变量取代，方便前端模块化代码迁移
    --}}

    <script type="text/json" logined-info-data >{!! isset($logined_info) ? json_encode($logined_info) : '' !!}</script>
    <script>
    try{//全局用户信息 LOGIN_INFO
        window.LOGIN_INFO = JSON.parse( $('[logined-info-data]').html() );
    }catch(e){}
    window.REQUEST_PREFIX = "{{ config('view.path_prefix','') }}";
    window.REQUEST_PREFIX_MACHINE_LOOP = "{{ config('view.path_prefix','') }}-loop";

    //全局退出登录方法
    function LogOut(isAsync){
        if (undefined === isAsync) {
            isAsync = true;
        }

        $.ajax({
            type: 'post',
            async: isAsync,
            url: '/bms-pub/user/logout',
            complete: function(){
                $.removeCookie('app_token', {path: '/'});
                $.removeCookie('sns_token', {path: '/'});
                location.href = (window.REQUEST_PREFIX||'') + "/user/login";
            }
        })
    }

    //全局获取指令信息方法
    function getPolicyGridData(soundFlag, callback){
        $.ajax({
            type: 'get',
            url: window.REQUEST_PREFIX + '/oms/ins/get_list',
            success: function(res){
                utils.policyGrid.setItem(res.data);

                var unreadNum = utils.policyGrid.getUnreadNum();
                $('.num_unread').html(unreadNum + '条');
                if (false === soundFlag) {

                }else{
                    if (utils.policyGrid.getSoundDisplayFlag() && 0 < unreadNum) {
                        $.omsSoundNotice(0);
                    }
                }

                if ("[object Function]" == Object.prototype.toString.call(callback)) {
                    callback.call();
                }else{

                }
            },
            error: function(){
                $('.policy-refresh-btn').removeClass('loading');

                if ("[object Function]" == Object.prototype.toString.call(callback)) {
                    callback.call();
                }
            }
        })
    };

    function HideBoard(){
        $('.right-board').hide();
        $('.nav-bar-toggle').addClass('boardHide');
        $('.nav-bar-toggle-text').html('展开指令提交区');
        $('.nav-bar-toggle').parents('.section-nav').find('.nav-item').addClass('hide-active');
    }

    function ShowBoard(){
        $('.right-board').show();
        $('.nav-bar-toggle').removeClass('boardHide');
        $('.nav-bar-toggle-text').html('收起指令提交区');
        $('.nav-bar-toggle').parents('.section-nav').find('.nav-item').removeClass('hide-active');
    }

    //获取市价委托方式
    var PRICE_TYPE_LIST = [];
    PRICE_TYPE_LIST = [
        [2, '市价'],
        [3, '市价(对手方最优价格)'],
        [4, '市价(本方最优价格)'],
        // [5, '市价(即时成交剩余撤单)'],
        // [6, '市价(最优五档即时成交剩余撤单)'],
        // [7, '市价(全额成交或撤单)'],
        [8, '市价(最优五档即时成交剩余转限)']
    ]
    if (window.LOGIN_INFO) {
        GetPriceTypeList();
    }
    // GetPriceTypeList();
    function GetPriceTypeList(){
        $.ajax({
            url: (window.REQUEST_PREFIX||'')+'/oms/helper/price_type_list',
            success: function(res){
                var tmpId;
                if (0 == res.code) {
                    var tmpObj = {};

                    var tmpArrSZ = res.data['SZ'];
                    var tmpArrSH = res.data['SH'];

                    tmpArrSZ.forEach(function(e){
                        if (!tmpObj.hasOwnProperty(e.key)) {
                            tmpObj[e.key] = e.value;
                            // PRICE_TYPE_LIST.push([e.key, e.value]);
                        }
                        e.market = 'SZ';
                    });
                    utils.stock_custom.setMarketData('SZ', tmpArrSZ);

                    tmpArrSH.forEach(function(e){
                        if (!tmpObj.hasOwnProperty(e.key)) {
                            tmpObj[e.key] = e.value;
                            // PRICE_TYPE_LIST.push([e.key, e.value]);
                        }
                        e.market = 'SH';
                    });
                    utils.stock_custom.setMarketData('SH', tmpArrSH);
                }else{
                    $.failNotice(res.msg);
                }
            },
            error: function(){
                $.failNotice('网络异常');
            }
        });
    }
    </script>
    <?php if ('gao_yi' === config('custom.app')) { ?>
        <script>
        (function(){
            if (window.LOGIN_INFO) {
                utils.policyGrid.init(LOGIN_INFO.user_id, LOGIN_INFO.role_id);
                getPolicyGridData();
                setInterval(function(){
                    getPolicyGridData()
                }, 1000 * 5);
            }
        })();
        </script>
    <?php } ?>
    {{-- 环信通讯 总入口，本次发布先停用环信，再观察一段时间，测试保障通讯质量之后才使用 --}}
    {{-- @include('easemob_im') --}}

    <script>
        $(function(){
            //全局 ajax 意外处理
            $(window).ajaxComplete(function(event, xhr, settings) {
                if(
                    /您还未登录/.test(xhr.responseText)
                    || ( xhr.responseJSON && xhr.responseJSON.code===10000 )
                    || /您还未登录/.test(xhr.responseJSON && xhr.responseJSON.msg)
                ){
                    // $.omsAlert('登录已经过期，需要重新登录！',false,5000);
                    $.omsAlertDisable();
                    setTimeout(function(){
                        location.href = window.REQUEST_PREFIX+"/user/login?alert=timeout&back_url="+encodeURIComponent((window.REQUEST_PREFIX||'')+'/oms');
                    },2000);
                }
            });

            /^(192\.168\.0|localhost)/.test(location.host) && $(window).ajaxError(function(event, xhr, settings) {
                // $.omsAlert(xhr.status + ' : ' + settings.url,false);
            });

            //timepicker 字体符号bug修复
            setTimeout(function(){
                $('.icon-arrow-left').addClass('glyphicon-arrow-left');
                $('.icon-arrow-right').addClass('glyphicon-arrow-right');
            },1000);
        });
    </script>
</head>
<body>
    {{-- @include('top_navbar') --}}
    @include(config('custom.top_view'))
    @yield('content')
    <div class="error_tip_wrapper">
        <span id="error_tip" class="hide"></span>
    </div>
</body>
</html>
