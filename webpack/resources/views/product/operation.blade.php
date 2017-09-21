
@extends('adminmanager_standard')

@section('asset-css')
<!-- 运营管理3.11.0 -->
  <link href="{{ asset('/dist/css/static/oms.css') }}" rel="stylesheet">
  <link href="{{ asset('/dist/css/static/components.css') }}" rel="stylesheet">
  <link href="{{ asset('/css/oms.min.css') }}" rel="stylesheet">
  <link href="{{ asset('/css/selectize.min.css') }}" rel="stylesheet">
  <link href="{{ asset('/js/jquery-confirm/jquery-confirm.min.css') }}" rel="stylesheet">
  <link href="{{ asset('/js/laydate/skins/molv/laydate.css') }}" rel="stylesheet">
  <link href="{{ asset('/css/notification.min.css') }}" rel="stylesheet">

  <link href="{{ asset('/js/jquery-confirm/jquery-confirm.min.css') }}" rel="stylesheet">
  <link href="{{ asset('/js/plugin/searchable/searchableOptionList.css') }}" rel="stylesheet">
  <link href="{{ asset('/3rd/datepicker/css/zebra_datepicker.css') }}" rel="stylesheet">
  <link href="{{ asset('/css/policy-create.min.css') }}" rel="stylesheet">
  <link href="{{ asset('/js/plugin/multiple-select/multiple-select.css') }}" rel="stylesheet">
  <style media="screen">
    input[type="file"]{
      padding: 6px!important;
      line-height: initial;
    }
    .sol-container{
      display: inline-block;
    }
    .sol-current-selection{
      display: none;
    }
    .msg{
      display: none;
    }
    .dot-tip.exclamation em:hover .msg{
      display: block;
    }
    .jconfirm-box-container{
      /*margin-left: 33%;*/
      margin-left: auto;
      margin-right: auto;
      text-align: center;
      width: 680px;
      box-sizing: content-box;
      position: relative;
      min-height: 1px;
      padding-right: 15px;
      padding-left: 15px;
    }
    .jconfirm .jconfirm-box .buttons{
      padding-bottom: 46px;
    }
    .jconfirm .jconfirm-box div.title-c .title{
      padding-bottom: 0;
    }
    .jconfirm.jconfirm-white .jconfirm-box .buttons button.btn-default,.jconfirm.jconfirm-white .jconfirm-box .buttons button.btn-default:hover{
      padding: 2px 4px;
      border-radius: 2px;
      /*background: #fff;
      color: #5b8cf1;*/
      font-weight: normal;

      font-size: 14px;
      color: #fff;
      background-color: #E74C3C;
      width: 100px;
      height: 30px;
    }
    .jconfirm.jconfirm-white .jconfirm-box .buttons{
      float: none;
      text-align: center;
    }
    .jconfirm .jconfirm-box .buttons button+button{
      margin-left: 10px;
    }
    .jconfirm .jconfirm-box div.content-pane .content{
      padding-top: 5px;
      padding-bottom: 20px;
    }
    .confirm-class{
      width: 100px;
      height: 40px;
      background-color: #F44048;
      border-radius: 2px;
      color: #333!important;
      font-size: 16px!important;
    }
    /*.vue-confirm__btns--submit{
      background-color: #D0021B;
      color: #fff!important;
      outline: none;
    }*/
    .cancel-class{
      width: 100px;
      height: 40px;
      background-color: #f9f9f9;
      border-radius: 2px;
      border: 1px solid #ccc!important;
      color: #333!important;
      font-size: 16px!important;
    }
    .jconfirm .jconfirm-scrollpane{
      background-color: rgba(0,0,0,.4);
    }
    .jconfirm .jconfirm-box div.title-c .icon-c{
      position: absolute;
      top: 30px;
      font-size: 20px;
      left: 20px;
      font-weight: bold;
      color: #000000;
    }

    .selectize-input > div.item{
      max-width: 120px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      line-height: 20px;
      vertical-align: top;
    }
    .dot-tip.exclamation .str{
      top: inherit;
      bottom: 24px;
      text-align: left;
    }
    .hover-tip-width{
      display: block;
      width: 246px;
      white-space: normal;
      word-wrap: break-word;
    }
    .client-suggest{
      top: 37px!important;
      bottom: auto!important;
    }
    .jconfirm-box-container{
      /*margin-left: 33%;*/
      margin-left: auto;
      margin-right: auto;
      width: 680px;
      box-sizing: content-box;
      position: relative;
      min-height: 1px;
      padding-right: 15px;
      padding-left: 15px;
    }
    .jconfirm.jconfirm-white .jconfirm-box .buttons button.btn-default,.jconfirm.jconfirm-white .jconfirm-box .buttons button.btn-default:hover{
      padding: 2px 4px;
      border-radius: 2px;
      /*background: #fff;
      color: #5b8cf1;*/
      font-weight: normal;

      font-size: 14px;
      color: #fff;
      background-color: #E74C3C;
      width: 100px;
      height: 30px;
    }
    .jconfirm.jconfirm-white .jconfirm-box .buttons{
      float: none;
      text-align: center;
    }
    .jconfirm .jconfirm-box .buttons button+button{
      margin-left: 10px;
    }
    .jconfirm .jconfirm-box div.content-pane .content{
      padding-top: 5px;
      padding-bottom: 20px;
    }
    .confirm-class{
      width: 100px;
      height: 40px;
      background-color: #FFDE00;
      border-radius: 2px;
      color: #333!important;
      font-size: 16px!important;
    }
    .cancel-class{
      width: 100px;
      height: 40px;
      background-color: #f9f9f9;
      border-radius: 2px;
      border: 1px solid #ccc!important;
      color: #333!important;
      font-size: 16px!important;
    }
    a.jquery-confirm-ok:focus{
      background: #f0f0f0;
    }
    .jconfirm .jconfirm-scrollpane{
      background-color: rgba(0,0,0,.4);
    }
  </style>

@endsection

@section('content')
  <section  class="main-container layout" style="padding:0;">

    <div operation></div>

  </section>

  <script>
  //全局配置
  window.ENV = window.ENV || {};
  window.REQUEST_PREFIX = "{{ config('view.path_prefix','') }}";
  </script>
  <script src="{{ asset('/js/jquery.validate.min.js')}}" type="text/javascript"></script>
  <script src="{{ asset('/js/plugin/vue/vue.js')}}" type="text/javascript"></script>
  <script type="text/javascript" src="{{ asset('/js/plugin/selectize/js/standalone/selectize.js') }}"></script>
  <script src="{{ asset('/dist/js/common/vue.component.js') }}"></script>
  <script src="{{ asset('/dist/js/product/operation.js') }}"></script>
  <script src="{{ asset('/js/jquery-confirm/jquery-confirm.min.js') }}"></script>
  <script src="{{ asset('/3rd/datepicker/zebra_datepicker.js') }}"></script>
  <script src="{{ asset('/js/plugin/multiple-select/multiple-select.js') }}"></script>
  <script src="{{ asset('/dist/js/product/otc/page.js') }}"></script>
  <script src="{{ asset('/js/plugin/Sortable/Sortable.min.js')}}" type="text/javascript"></script>
  <script src="{{ asset('/js/plugin/vue-draggable/vuedraggable.min.js')}}" type="text/javascript"></script>
  <script src="{{ asset('/dist/js/common/client.electron.js') }}"></script> 
  <script src="{{ asset('/dist/js/common/localStorage.js') }}"></script> 
  <script src="{{ asset('/dist/js/common/common.saveData.js') }}"></script>
  <script src="{{ asset('/js/jquery-confirm/jquery-confirm.min.js') }}"></script>
@endsection
