'use strict';

// 数据查询页面
var permissionArr = {
  'assets': 40,
  'entrust': 36,
  'position': 38,
  'deal': 37,
  'cashflow': 39,
  'instruction': 35
};

// 页面混合，vue的语法
var reportMixin = {
  mounted: function mounted() {
    var _this2 = this;

    // 切换菜单时，会触发mounted事件，
    var sortData = '';
    common_storage.getItem(this.typeStr, function (rtn) {
      if (0 == rtn.code) {
        _this2.order = rtn.data.order;
        _this2.order_by = rtn.data.order_by;
        // display_rules 根据保存的field_sort进行排序
        // rtn.data.field_sort 从尾到头遍历，一旦匹配则unshift添加到display_rules数组前面，且删除原来那个元素。（注意，display_rules长度及元素位置在变化，所以应该从0开始计数）
        for (var i = rtn.data.field_sort.length - 1; i >= 0; i--) {
          for (var j = 0, length = _this2.display_rules.length; j < length; j++) {
            if (_this2.display_rules[j].id == rtn.data.field_sort[i]) {
              var obj = _this2.display_rules[j];
              _this2.display_rules.splice(j, 1);
              _this2.display_rules.unshift(obj);
            }
          }
        }

        // // console.log('typeStr: ' + this.typeStr);
        // this.$emit('order', {
        //   order: this.order,
        //   order_by: this.order_by,
        //   typeStr: this.typeStr,
        //   display_rules: this.display_rules
        // });
      }

      _this2.$emit('order', {
        order: _this2.order,
        order_by: _this2.order_by,
        typeStr: _this2.typeStr,
        display_rules: _this2.display_rules
      });
    });
  },
  computed: {
    // 可拖动插件的入参
    dragOptions: function dragOptions() {
      return {
        animation: 0,
        // group: 'description',
        // disabled: !this.editable,
        ghostClass: 'ghost'
      };
    }
  },
  methods: {
    chgSort: function chgSort(id) {
      if (id == this.order_by) {
        if (this.order == 'asc') {
          this.order = 'desc';
        } else if (this.order == 'desc') {
          this.order = '';
        } else {
          this.order = 'asc';
        }
      } else {
        this.order_by = id;
        this.order = 'asc';
      }
      // 用户切换排序命令，需要保存新的排序
      var obj = {};
      obj.field_sort = this.display_rules.map(function (e) {
        return e.id;
      });
      obj.order_by = this.order_by;
      obj.order = this.order;

      this.$emit('order', { order: this.order,
        order_by: this.order_by,
        typeStr: this.typeStr,
        display_rules: this.display_rules
      });
      common_storage.setItem(this.typeStr, obj);
    },
    onMove: function onMove(_ref) {
      var relatedContext = _ref.relatedContext,
          draggedContext = _ref.draggedContext;

      var relatedElement = relatedContext.element;
      var draggedElement = draggedContext.element;
      return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed;
    },
    onEnd: function onEnd() {
      // 用户切换表格排序，需要保存新的排序
      var obj = {};
      obj.field_sort = this.display_rules.map(function (e) {
        return e.id;
      });
      obj.order_by = this.order_by;
      obj.order = this.order;
      common_storage.setItem(this.typeStr, obj);
    },
    displayValue: function displayValue(sub_value, rule) {
      var value = sub_value[rule.id];
      if (rule.format != '' && rule.format instanceof Array && this[rule.format[0]] instanceof Function) {
        // value = this[rule.format].call(this, value, )
        var args = [value].concat(rule.format.slice(1));
        value = this[rule.format[0]].apply(this, args);
      }
      if (rule.unit) {
        return value + rule.unit;
      } else {
        return value;
      }
    },
    checkPositive: function checkPositive(num) {
      return parseFloat(num) > 0;
    },
    checkNegative: function checkNegative(num) {
      return parseFloat(num) < 0;
    }
  }

  // 资产
};var assetsSortData = {
  typeStr: 'report_list__assets_order',
  order: '',
  order_by: '',
  display_rules: [{
    id: 'name',
    label: '基金',
    format: '',
    class: 'left20 max-width200'
  }, {
    id: 'account_name',
    label: '交易单元',
    format: '',
    class: 'left20 multi-max-width160'
  }, {
    id: 'net_assets',
    label: '净资产',
    format: ['numeralNumber', 2],
    class: 'right20'
  }, {
    id: 'volume',
    label: '份额',
    format: ['numeralNumber', 0],
    class: 'right20'
  }, {
    id: 'net_value',
    label: '单位净值',
    format: ['numeralNumber', 4],
    class: 'right20'
  }, {
    id: 'market_position',
    label: '仓位',
    format: ['numeralPercent'],
    class: 'right20'
    // ,
    // unit: '%'
  }, {
    id: 'market_value',
    label: '持仓市值',
    format: ['numeralNumber', 2],
    class: 'right20'
  }, {
    id: 'stock_market_value',
    label: '股票市值',
    format: ['numeralNumber', 2],
    class: 'right20'
  }, {
    id: 'future_ensure_assets',
    label: '期货占用保证金',
    format: ['numeralNumber', 2],
    class: 'right20'
  }, {
    id: 'stock_market_ratio',
    label: '股票占总市值',
    format: ['numeralPercent'],
    class: 'right20'
  }, {
    id: 'future_market_ratio',
    label: '期货占总市值',
    format: ['numeralPercent'],
    class: 'right20'
  }, {
    id: 'future_ensure_ratio',
    label: '风险度',
    format: ['numeralPercent'],
    class: 'right20'
  }]

  // 委托
};var entrustSortData = {
  typeStr: 'report_list__entrust_order',
  order: '',
  order_by: '',
  display_rules: [{
    id: 'entrust_stock_code',
    label: '证券代码',
    format: '',
    class: 'left10'
  }, {
    id: 'entrust_stock_name',
    label: '证券名称',
    format: '',
    class: 'left10'
  }, {
    id: 'market_name',
    label: '证券市场',
    format: '',
    class: 'left10'
  }, {
    id: 'group_name',
    label: '基金',
    format: '',
    class: 'left10'
  }, {
    id: 'base_name',
    label: '交易单元',
    format: '',
    class: 'left10'
  }, {
    id: 'bs_symbol_text', //'entrust_type_name',
    label: '买卖标志',
    format: '',
    class: 'left10'
  }, {
    id: 'entrust_volume',
    label: '委托数量',
    format: ['numeralNumber', 0],
    class: 'right10'
  }, {
    id: 'entrust_price',
    label: '委托价格',
    format: ['numeralNumber', 3],
    class: 'right10'
  }, {
    id: 'total_entrust_amount',
    label: '委托金额',
    format: ['numeralNumber', 2],
    class: 'right10'
  }, {
    id: 'deal_volume',
    label: '成交数量',
    format: ['numeralNumber', 0],
    class: 'right10'
  }, {
    id: 'deal_price',
    label: '成交均价',
    format: ['numeralNumber', 3],
    class: 'right10'
  }, {
    id: 'deal_amount',
    label: '成交金额',
    format: ['numeralNumber', 2],
    class: 'right10'
  }, {
    id: 'cancel_volume',
    label: '已撤数量',
    format: ['numeralNumber', 0],
    class: 'right10'
  }, {
    id: 'quote_type_text', //'entrust_model_name',
    label: '报价方式',
    format: '',
    class: 'left10'
  }, {
    id: 'vendor_status_text',
    label: '订单状态',
    format: '',
    class: 'left10'
  }, {
    id: 'exchange_rate',
    label: '参考汇率',
    format: '',
    class: 'right10'
  }, {
    //   id: 'deal_at',
    //   label: '最新成交时间',
    //   format: '',
    //   class: 'right10'
    // }, {
    id: 'entrust_at',
    label: '委托时间',
    format: '',
    class: 'right10 max-width100'
  }]
};

// 成交
var dealSortData = {
  typeStr: 'report_list__deal_order',
  order: '',
  order_by: '',
  display_rules: [{
    id: 'entrust_stock_code',
    label: '证券代码',
    format: '',
    class: 'left10'
  }, {
    id: 'entrust_stock_name',
    label: '证券名称',
    format: '',
    class: 'left10'
  }, {
    id: 'market_name',
    label: '证券市场',
    format: '',
    class: 'left10'
  }, {
    id: 'group_name',
    label: '基金',
    format: '',
    class: 'left10'
  }, {
    id: 'base_name',
    label: '交易单元',
    format: '',
    class: 'left10'
  }, {
    id: 'entrust_type_name',
    label: '买卖标志',
    format: '',
    class: 'left10'
  }, {
    id: 'deal_volume',
    label: '成交数量',
    format: ['numeralNumber', 0],
    class: 'right10'
  }, {
    id: 'deal_price',
    label: '成交均价',
    format: ['numeralNumber', 3],
    class: 'right10'
  }, {
    id: 'deal_amount',
    label: '成交金额',
    format: ['numeralNumber', 2],
    class: 'right10'
  }, {
    id: 'dealed_at',
    label: '最新成交时间',
    format: '',
    class: 'right10'
  }]
};

// 持仓
var positionSortData = {
  typeStr: 'report_list__position_order',
  order: '',
  order_by: '',
  display_rules: [{
    id: 'stock_code',
    label: '证券代码',
    format: '',
    class: 'left10'
  }, {
    id: 'stock_name',
    label: '证券名称',
    format: '',
    class: 'left10'
  }, {
    id: 'market_name',
    label: '证券市场',
    format: '',
    class: 'left10'
  }, {
    id: 'group_name',
    label: '持仓基金',
    format: '',
    class: 'left10 max-width200'
  }, {
    id: 'account_name',
    label: '持仓交易单元',
    format: '',
    class: 'left10 multi-max-width200'
  }, {
    id: 'stock_flag',
    label: '持仓方向',
    format: '',
    class: 'left10'
  }, {
    id: 'stock_type',
    label: '证券类别',
    format: '',
    class: 'left10'
  }, {
    id: 'hold_volume',
    label: '持仓数量',
    format: ['numeralNumber', 0],
    class: 'right10'
  }, {
    id: 'market_value',
    label: '持仓市值',
    format: ['numeralNumber', 2],
    class: 'right10'
  }, {
    id: 'market_position',
    label: '仓位',
    format: ['numeralPercent'],
    // tips: '资产占比=持仓市值/∑选中产品净资产*100%',
    class: 'right10'
  }, {
    id: 'cost_price',
    label: '持仓成本',
    // type: window.LOGIN_INFO.role_id.some(e => e == 1) ? 'change' : '',
    format: ['numeralNumber', 2],
    class: 'right10'
  }, {
    id: 'earning',
    label: '浮动盈亏',
    format: ['numeralNumber', 2],
    class: 'right10'
  }, {
    id: 'earning_ratio',
    label: '盈亏率',
    format: ['numeralPercentV2'],
    class: 'right10'
  }]
};

$(function () {
  var reportActive = '';
  if (window.LOGIN_INFO.role_permission[GV.permissions['PERMISSION_SELECT_CASH']]) {
    reportActive = 'assets';
  } else if (window.LOGIN_INFO.role_permission[GV.permissions['PERMISSION_SELECT_INSTRUCT']]) {
    reportActive = 'instruction';
  } else if (window.LOGIN_INFO.role_permission[GV.permissions['PERMISSION_SELECT_ENTRUST']]) {
    reportActive = 'entrust';
  } else if (window.LOGIN_INFO.role_permission[GV.permissions['PERMISSION_SELECT_DEAL']]) {
    reportActive = 'deal';
  } else if (window.LOGIN_INFO.role_permission[GV.permissions['PERMISSION_SELECT_POSITION']]) {
    reportActive = 'position';
  } else if (window.LOGIN_INFO.role_permission[GV.permissions['PERMISSION_SELECT_FEE']]) {
    reportActive = 'cashflow';
  }

  // 自定义数据查询页面委托查询
  Vue.component('vue-query-entrust', {
    mixins: [numberMixin, reportMixin],
    props: ['grid_data', 'grid_data_code', 'org_info_theme'],
    template: '\n    <table class="journel-sheet-grid">\n      <thead v-if="org_info_theme == 3">\n        <tr>\n          <th style="color: #999;" class="left30">\u65E5\u671F</th>\n          <th style="color: #999;" class="left20">\u7B56\u7565</th>\n          <th style="color: #999;" class="left20">\u59D4\u6258\u65F6\u95F4</th>\n          <th style="color: #999;" class="left20">\u7F16\u53F7</th>\n          <th style="color: #999;" class="left20">\u80A1\u7968\u4EE3\u7801</th>\n          <th style="color: #999;" class="left20">\u80A1\u7968\u540D\u79F0</th>\n          <th style="color: #999;" class="left20">\u4E70\u5356\u65B9\u5411</th>\n          <th style="color: #999;" class="left20">\u59D4\u6258\u72B6\u6001</th>\n          <th style="color: #999;" class="right20">\u59D4\u6258\u4EF7\u683C</th>\n          <th style="color: #999;" class="right20">\u59D4\u6258\u6570\u91CF</th>\n          <th style="color: #999;" class="right20">\u6210\u4EA4\u6570\u91CF</th>\n          <th style="color: #999;" class="right20">\u6210\u4EA4\u4EF7\u683C</th>\n          <th style="color: #999;" class="right20">\u6210\u4EA4\u91D1\u989D</th>\n          <th style="color: #999;" class="right20">\u5E02\u573A\u7C7B\u522B</th>\n        </tr>\n      </thead>\n      <tbody v-if="org_info_theme == 3">\n        <tr v-if="grid_data.data.length > 0" v-for="row in grid_data.data">\n          <td class="left30">{{row.entrust_date}}</td>\n          <td class="left20">{{row.name}}</td>\n          <td class="left20">{{row.entrust_time}}</td>\n          <td class="left20">{{row.id}}</td>\n          <td class="left20">{{row.entrust_stock_code}}</td>\n          <td class="left20">{{row.entrust_stock_name}}</td>\n          <td class="left20">{{row.entrust_way_name}}</td>\n          <td class="left20">{{row.status_desc}}</td>\n          <td class="right20">{{row.entrust_price}}</td>\n          <td class="right20">{{row.entrust_amount}}</td>\n          <td class="right20">{{row.deal_volume}}</td>\n          <td class="right20">{{row.deal_price}}</td>\n          <td class="right20">{{row.deal_amount}}</td>\n          <td class="right20">{{row.exchange}}</td>\n        </tr>\n        <tr v-if="grid_data_code == 500901 && grid_data.length == 0">\n          <td class="left30" colspan="99">\u8BF7\u9009\u62E9\u57FA\u91D1</td>\n        </tr>\n        <tr v-if="grid_data_code == 0 && grid_data.data && grid_data.data.length == 0">\n          <td class="left30" colspan="99">\u8BE5\u65F6\u6BB5\u6682\u65E0\u5339\u914D\u8BB0\u5F55</td>\n        </tr>\n      </tbody>\n\n      <thead v-if="org_info_theme != 3">\n        <draggable style="border-top:0;" :list="display_rules" element="tr" :options="dragOptions" @move="onMove" @end="onEnd">\n          <th v-for="rule in display_rules" v-bind:class="rule.class">\n            <span>{{rule.label}}</span>\n            <a class="icon-sortBy" v-on:click="chgSort(rule.id)">\n              <i class="icon-asc" :class="{active: (order_by == rule.id && order == \'asc\')}"></i>\n              <i class="icon-desc" :class="{active: (order_by == rule.id && order == \'desc\')}"></i>\n            </a>\n          </th>\n        </draggable>\n      </thead>\n      <tbody v-if="org_info_theme != 3">\n        <tr v-if="display_data && display_data.length > 0" v-for="row in display_data">\n          <td v-for="rule in display_rules" v-bind:class="rule.class" :title="displayValue(row, rule)">{{displayValue(row, rule)}}</td>\n        </tr>\n        <tr v-if="grid_data_code == 500901 && display_data && Object.keys(display_data).length == 0">\n          <td class="left30" colspan="99">\u8BF7\u9009\u62E9\u57FA\u91D1</td>\n        </tr>\n        <tr v-if="grid_data_code == 0 && display_data && Object.keys(display_data).length == 0">\n          <td class="left30" colspan="99">\u8BE5\u65F6\u6BB5\u6682\u65E0\u5339\u914D\u8BB0\u5F55</td>\n        </tr>\n      </tbody>\n    </table>\n    ',
    data: function data() {
      return entrustSortData;
    },
    computed: {
      display_data: function display_data() {
        var _this = this;
        var rtn = [];
        // 步骤1，根据接口数据进行准备
        this.grid_data.list instanceof Array && this.grid_data.list.forEach(function (e) {
          var obj = {};

          // 证券代码
          obj.entrust_stock_code = e.entrust_stock_code;
          // 证券名称
          obj.entrust_stock_name = e.entrust_stock_name;
          // 证券市场
          obj.market = e.market;
          obj.market_name = e.market_name;
          // 产品
          obj.group_name = e.group_name;
          // 账户
          obj.base_name = e.base_name;
          // 买卖标志
          obj.entrust_type_name = e.entrust_type_name;
          // 委托数量
          obj.entrust_volume = e.entrust_volume;
          // 委托价格
          obj.entrust_price = e.entrust_price;
          // 委托金额
          obj.total_entrust_amount = e.total_entrust_amount;
          // 成交数量
          obj.deal_volume = e.deal_volume;
          // 成交均价
          obj.deal_price = e.deal_price;
          // 成交金额
          obj.deal_amount = e.deal_amount;
          // 已撤数量
          obj.cancel_volume = e.cancel_volume;
          // 报价方式
          obj.entrust_model_name = e.entrust_model_name;
          // 最新成交时间
          obj.deal_at = e.deal_at;
          // 委托时间
          obj.entrust_at = e.entrust_at;
          // 汇率
          obj.exchange_rate = e.exchange_rate;
          obj.bs_symbol_text = e.bs_symbol_text;
          obj.quote_type_text = e.quote_type_text;
          obj.vendor_status_text = e.vendor_status_text;

          rtn.push(obj);
        });
        if (0 == rtn.length) {
          $(".custom-grey-btn__export").addClass('doBtnExport_bgd');
        } else {
          $(".custom-grey-btn__export").removeClass('doBtnExport_bgd');
        }
        return rtn;
        // // 步骤2，根据排序逻辑进行排序
        // if (_this.order == 'asc' || _this.order == 'desc') {
        //   rtn.sort((a, b) => {
        //     let x = a[_this.order_by];
        //     let y = b[_this.order_by];

        //     if ( !isNaN(parseFloat(x)) && !isNaN(parseFloat(y)) ) {
        //       x = parseFloat(x);
        //       y = parseFloat(y);
        //     }
        //     if (x > y) {
        //       return 1;
        //     }
        //     if (x < y) {
        //       return -1;
        //     }
        //     return 0;
        //   })

        //   if ('desc' == _this.order) {
        //     rtn.reverse();
        //   }
        //   return rtn;
        // }else{
        //   return rtn;
        // }
      }
    }
  });

  // 自定义数据查询页面持仓查询
  Vue.component('vue-query-position', {
    mixins: [numberMixin, reportMixin],
    props: ['grid_data', 'grid_data_code', 'org_info_theme'],
    template: '\n    <table class="bem-table journel-sheet-grid">\n      <thead v-if="org_info_theme == 3">\n        <tr>\n          <th style="color: #999;" class="left30">\u7B56\u7565</th>\n          <th style="color: #999;" class="left20">\u80A1\u7968\u4EE3\u7801</th>\n          <th style="color: #999;" class="left20">\u80A1\u7968\u540D\u79F0</th>\n          <th style="color: #999;" class="left20">\u5F53\u524D\u6570\u91CF</th>\n          <th style="color: #999;" class="left20">\u53EF\u5356\u6570\u91CF</th>\n          <th style="color: #999;" class="right20">\u6210\u672C\u4EF7</th>\n          <th style="color: #999;" class="right20">\u6700\u65B0\u4EF7</th>\n          <th style="color: #999;" class="right20">\u5F53\u524D\u5E02\u503C</th>\n          <th style="color: #999;" class="right20">\u6D6E\u52A8\u76C8\u4E8F</th>\n          <th style="color: #999;" class="right20">\u76C8\u4E8F\u6BD4\u4F8B</th>\n          <th style="color: #999;" class="right20">\u5356\u51FA\u51BB\u7ED3</th>\n          <th style="color: #999;" class="right20">\u4ECA\u65E5\u4E70\u5165</th>\n          <th style="color: #999;" class="right20">\u4ECA\u65E5\u5356\u51FA</th>\n          <th style="color: #999;" class="right20">\u5E02\u573A\u7C7B\u522B</th>\n        </tr>\n      </thead>\n      <tbody v-if="org_info_theme == 3">\n        <tr v-if="grid_data.data.length > 0" v-for="row in grid_data.data">\n          <td class="left30">{{row.name}}</td>\n          <td class="left20">{{row.stock_id}}</td>\n          <td class="left20">{{row.stock_name}}</td>\n          <td class="left20">{{numeralNumber(row.total_amount - row.entrust_volume, 0)}}</td>\n          <td class="left20">{{numeralNumber(row.enable_sell_volume, 0)}}</td>\n          <td v-if="!checkRoleAdmin()" class="right20">{{numeralNumber(row.cost_price, 3)}}</td>\n          <td v-if="checkRoleAdmin()" class="right20">\n            <vue-custom_v3-modify :id="\'price\'" :value="numeralNumber(row.cost_price, 3)" :ajax_url="getAjaxUrl()" :ajax_data="getAjaxData(row)" class="left10" style="line-height: 20px;"></vue-custom_v3-modify>\n          </td>\n          <td class="right20">{{numeralNumber(row.market_price, 3)}}</td>\n          <td class="right20">{{numeralNumber(row.market_value)}}</td>\n          <td class="right20">{{numeralNumber(row.earning)}}</td>\n          <td class="right20">{{numeralPercent(row.earning_ratio)}}</td>\n          <td class="right20">{{numeralNumber(row.sell_frozen_volume, 0)}}</td>\n          <td class="right20">{{numeralNumber(row.today_buy_volume, 0)}}</td>\n          <td class="right20">{{numeralNumber(row.today_sell_volume, 0)}}</td>\n          <td class="right20">{{row.exchange}}</td>\n        </tr>\n        <tr v-if="grid_data_code == 500901 && grid_data.length == 0">\n          <td class="left30" colspan="99">\u8BF7\u9009\u62E9\u57FA\u91D1</td>\n        </tr>\n        <tr v-if="grid_data_code == 0 && grid_data.data && grid_data.data.length == 0">\n          <td class="left30" colspan="99">\u8BE5\u65F6\u6BB5\u6682\u65E0\u5339\u914D\u8BB0\u5F55</td>\n        </tr>\n      </tbody>\n\n      <thead v-if="org_info_theme != 3">\n        <draggable style="border-top:0;" :list="display_rules" element="tr" :options="dragOptions" @move="onMove" @end="onEnd">\n          <th v-for="rule in display_rules" v-bind:class="rule.class">\n            <span>{{rule.label}}</span>\n            <prompt-language style="width: 15px;display: inline-block;left: 0;" v-if="\'\' != rule.tips && undefined != rule.tips" :language_val="rule.tips"></prompt-language>\n            <a class="icon-sortBy" v-on:click="chgSort(rule.id)">\n              <i class="icon-asc" :class="{active: (order_by == rule.id && order == \'asc\')}"></i>\n              <i class="icon-desc" :class="{active: (order_by == rule.id && order == \'desc\')}"></i>\n            </a>\n          </th>\n        </draggable>\n      </thead>\n      <tbody v-if="org_info_theme != 3">\n        <tr v-if="display_data && display_data.length > 0" v-for="row in display_data" :class="{\'source_type2\': 2 == row.source_type, \'source_type3\': 3 == row.source_type, \'source_type4\': 4 == row.source_type}">\n          <template v-for="rule in display_rules">\n            <td v-if="undefined == rule.type || \'\' == rule.type" v-bind:class="rule.class" :title="displayValue(row, rule)">{{displayValue(row, rule)}}</td>\n            <td v-if="\'change\' == rule.type">\n              <vue-custom_v3-modify :id="\'price\'" :value="displayValue(row, rule)" :ajax_url="getAjaxUrl()" :ajax_data="{}" :regexp="getReg" class="left10" style="line-height: 20px;"></vue-custom_v3-modify>\n            </td>\n          </template>\n          \n        </tr>\n        <tr v-if="grid_data_code == 500901 && grid_data.list && grid_data.list.length == 0">\n          <td class="left30" colspan="99">\u8BF7\u9009\u62E9\u57FA\u91D1</td>\n        </tr>\n        <tr v-if="grid_data_code == 0 && grid_data.list && grid_data.list.length == 0">\n          <td class="left30" colspan="99">\u8BE5\u65F6\u6BB5\u6682\u65E0\u5339\u914D\u8BB0\u5F55</td>\n        </tr>\n      </tbody>\n    </table>\n    ',
    data: function data() {
      // 'product_id': row['product_id]', 'stock_id': row.stock_code + row.market, 'volume': '', 'enable_sell_volume_today': ''
      return positionSortData;
    },
    computed: {
      display_data: function display_data() {
        var _this = this;
        var rtn = [];
        // 步骤1，根据接口数据进行准备
        this.grid_data.list instanceof Array && this.grid_data.list.forEach(function (e) {
          var obj = {};

          // 证券代码
          obj.stock_code = e.stock_code;
          // 证券名称
          obj.stock_name = e.stock_name;
          // 证券市场
          obj.market = e.market;
          obj.market_name = e.market_name;
          // 持仓产品
          obj.group_name = e.group_name;
          // 持仓账户
          obj.account_name = e.account_name;
          // 持仓方向
          obj.stock_flag = e.stock_flag;
          // 证券类别
          obj.stock_type = e.stock_type;
          // 持仓数量
          obj.hold_volume = e.hold_volume;
          // 持仓市值
          obj.market_value = e.market_value;
          // 资产占比
          obj.market_position = e.market_position;
          // 持仓成本
          if ('FT' == e.market) {
            obj.cost_price = '--';
          } else {
            obj.cost_price = e.cost_price;
          }
          // 浮动盈亏
          obj.earning = e.earning;
          // 浮盈率
          obj.earning_ratio = e.earning_ratio;

          // 类型
          obj.source_type = e.source_type;

          rtn.push(obj);
        });
        //数据为0给导出按钮添加样式
        if (0 == rtn.length) {
          $(".custom-grey-btn__export").addClass('doBtnExport_bgd');
        } else {
          $(".custom-grey-btn__export").removeClass('doBtnExport_bgd');
        }
        // 步骤2，根据排序逻辑进行排序
        // rtn = VUECOMPONENT.sort(rtn, _this.order, _this.order_by);
        return rtn;
        // if (_this.order == 'asc' || _this.order == 'desc') {
        //   rtn.sort((a, b) => {
        //     let x = a[_this.order_by];
        //     let y = b[_this.order_by];

        //     if ( !isNaN(parseFloat(x)) && !isNaN(parseFloat(y)) ) {
        //       x = parseFloat(x);
        //       y = parseFloat(y);
        //     }
        //     if (x > y) {
        //       return 1;
        //     }
        //     if (x < y) {
        //       return -1;
        //     }
        //     return 0;
        //   })

        //   if ('desc' == _this.order) {
        //     rtn.reverse();
        //   }
        //   return rtn;
        // }else{
        //   return rtn;
        // }
      }
    },
    methods: {
      getReg: function getReg() {
        return {
          reg: window.encodeURIComponent('^\d+\.?\d{0,3}$')
        };
      },
      checkRoleAdmin: function checkRoleAdmin() {
        return window.LOGIN_INFO.role_id.some(function (e) {
          return 1 == e;
        });
      },
      getAjaxUrl: function getAjaxUrl() {
        // return '/bms-pub/special_account/position/update_static';
        return window.REQUEST_PREFIX + '/special_account/position/update_static';
      },
      getAjaxData: function getAjaxData(row) {
        var obj = {};
        obj.product_id = row.product_id;
        obj.stock_id = row.stock_id;
        obj.volume = row.total_amount - row.entrust_volume;
        obj.enable_sell_volume_today = row.enable_sell_volume;
        return obj;
      }
    }
  });

  // 自定义数据查询页面成交查询
  Vue.component('vue-query-deal', {
    mixins: [numberMixin, reportMixin],
    props: ['grid_data', 'grid_data_code', 'org_info_theme'],
    template: '\n    <table class="journel-sheet-grid">\n      <thead v-if="org_info_theme == 3">\n        <tr>\n          <th style="color: #999;" class="left30">\u65E5\u671F</th>\n          <th style="color: #999;" class="left20">\u7B56\u7565</th>\n          <th style="color: #999;" class="left20">\u6210\u4EA4\u65F6\u95F4</th>\n          <th style="color: #999;" class="left20">\u80A1\u7968\u4EE3\u7801</th>\n          <th style="color: #999;" class="left20">\u80A1\u7968\u540D\u79F0</th>\n          <th style="color: #999;" class="right20">\u4E70\u5356\u65B9\u5411</th>\n          <th style="color: #999;" class="right20">\u6210\u4EA4\u6570\u91CF</th>\n          <th style="color: #999;" class="right20">\u6210\u4EA4\u4EF7\u683C</th>\n          <th style="color: #999;" class="right20">\u6210\u4EA4\u91D1\u989D</th>\n        </tr>\n      </thead>\n      <tbody v-if="org_info_theme == 3">\n        <tr v-if="grid_data.data.length > 0" v-for="row in grid_data.data">\n          <td class="left30">{{row.deal_date}}</td>\n          <td class="left20">{{row.name}}</td>\n          <td class="left20">{{row.dealed_at}}</td>\n          <td class="left20">{{row.stock_id}}</td>\n          <td class="left20">{{row.stock_name}}</td>\n          <td class="right20">{{row.deal_type_name}}</td>\n          <td class="right20">{{numeralNumber(row.deal_volume, 0)}}</td>\n          <td class="right20">{{numeralNumber(row.deal_price, 3)}}</td>\n          <td class="right20">{{numeralNumber(row.deal_amount, 3)}}</td>\n\n        </tr>\n        <tr v-if="grid_data_code == 500901 && grid_data.length == 0">\n          <td class="left30" colspan="99">\u8BF7\u9009\u62E9\u57FA\u91D1</td>\n        </tr>\n        <tr v-if="grid_data_code == 0 && grid_data.data && grid_data.data.length == 0">\n          <td class="left30" colspan="99">\u8BE5\u65F6\u6BB5\u6682\u65E0\u5339\u914D\u8BB0\u5F55</td>\n        </tr>\n      </tbody>\n\n      <thead v-if="org_info_theme != 3">\n        <draggable style="border-top:0;" :list="display_rules" element="tr" :options="dragOptions" @move="onMove" @end="onEnd">\n          <th v-for="rule in display_rules" v-bind:class="rule.class">\n            <span>{{rule.label}}</span>\n            <a class="icon-sortBy" v-on:click="chgSort(rule.id)">\n              <i class="icon-asc" :class="{active: (order_by == rule.id && order == \'asc\')}"></i>\n              <i class="icon-desc" :class="{active: (order_by == rule.id && order == \'desc\')}"></i>\n            </a>\n          </th>\n        </draggable>\n      </thead>\n      <tbody v-if="org_info_theme != 3">\n        <tr v-if="display_data && display_data.length > 0" v-for="row in display_data">\n          <td v-for="rule in display_rules" v-bind:class="rule.class" :title="displayValue(row, rule)">{{displayValue(row, rule)}}</td>\n\n        </tr>\n        <tr v-if="grid_data_code == 500901 && grid_data.list && Object.keys(grid_data.list).length == 0">\n          <td class="left30" colspan="99">\u8BF7\u9009\u62E9\u57FA\u91D1</td>\n        </tr>\n        <tr v-if="grid_data_code == 0 && grid_data.list && Object.keys(grid_data.list).length == 0">\n          <td class="left30" colspan="99">\u8BE5\u65F6\u6BB5\u6682\u65E0\u5339\u914D\u8BB0\u5F55</td>\n        </tr>\n      </tbody>\n    </table>\n    ',
    data: function data() {
      return dealSortData;
    },
    computed: {
      display_data: function display_data() {
        var _this = this;
        var rtn = [];
        // 步骤1，根据接口数据进行准备
        this.grid_data.list instanceof Array && this.grid_data.list.forEach(function (e) {
          var obj = {};

          // 证券代码
          obj.entrust_stock_code = e.entrust_stock_code;
          // 证券名称
          obj.entrust_stock_name = e.entrust_stock_name;
          // 证券市场
          obj.market = e.market;
          obj.market_name = e.market_name;
          // 产品
          obj.group_name = e.group_name;
          // 账户
          obj.base_name = e.base_name;
          // 买卖标志
          obj.entrust_type_name = e.entrust_type_name;
          // 成交数量
          obj.deal_volume = e.deal_volume;
          // 成交均价
          obj.deal_price = e.deal_price;
          // 成交金额
          obj.deal_amount = e.deal_amount;
          // 最新成交时间
          obj.dealed_at = e.dealed_at;

          rtn.push(obj);
        });

        if (0 == rtn.length) {
          $(".custom-grey-btn__export").addClass('doBtnExport_bgd');
        } else {
          $(".custom-grey-btn__export").removeClass('doBtnExport_bgd');
        }
        return rtn;
        // // 步骤2，根据排序逻辑进行排序
        // if (_this.order == 'asc' || _this.order == 'desc') {
        //   rtn.sort((a, b) => {
        //     let x = a[_this.order_by];
        //     let y = b[_this.order_by];

        //     if ( !isNaN(parseFloat(x)) && !isNaN(parseFloat(y)) ) {
        //       x = parseFloat(x);
        //       y = parseFloat(y);
        //     }
        //     if (x > y) {
        //       return 1;
        //     }
        //     if (x < y) {
        //       return -1;
        //     }
        //     return 0;
        //   })

        //   if ('desc' == _this.order) {
        //     rtn.reverse();
        //   }
        //   return rtn;
        // }else{
        //   return rtn;
        // }
      }
    }
  });

  // 自定义数据查询页面资产查询
  Vue.component('vue-query-assets', {
    mixins: [numberMixin, reportMixin],
    props: ['grid_data', 'grid_data_code', 'org_info_theme', 'lined'],
    template: '\n    <table class="bem-table journel-sheet-grid">\n      <thead v-if="org_info_theme == 3">\n        <tr>\n          <th style="color: #999;" class="left30">\u65E5\u671F</th>\n          <th style="color: #999;" class="left20">\u7B56\u7565</th>\n          <th style="color: #999;" class="right20">\u501F\u6B3E</th>\n          <th style="color: #999;" class="right20">\u6743\u76CA</th>\n          <th style="color: #999;" class="right20">\u8D44\u4EA7\u603B\u503C</th>\n          <th style="color: #999;" class="right20">\u80A1\u7968\u8D44\u4EA7</th>\n          <th style="color: #999;" class="right20">\u8D44\u91D1\u4F59\u989D</th>\n          <th style="color: #999;" class="right20">\u603B\u76C8\u4E8F</th>\n          <th style="color: #999;" class="right20">\u603B\u76C8\u4E8F\u7387</th>\n        </tr>\n      </thead>\n      <tbody v-if="org_info_theme == 3">\n        <tr v-if="grid_data.data.length > 0" v-for="row in grid_data.data">\n          <td class="left30">{{row.settle_date}}</td>\n          <td class="left20">{{row.name}}</td>\n          <td class="right20">{{numeralNumber(row.loan_capital, 2)}}</td>\n          <td class="right20">{{numeralNumber(row.right_capital, 2)}}</td>\n          <td class="right20">{{numeralNumber(row.net_assets, 2)}}</td>\n          <td class="right20">{{numeralNumber(row.security_assets, 2)}}</td>\n          <td class="right20">{{numeralNumber(row.net_balance_assets, 2)}}</td>\n          <td class="right20">{{numeralNumber(row.net_profit, 2)}}</td>\n          <td class="right20">{{row.net_profit_rate}}</td>\n        </tr>\n        <tr v-if="grid_data_code == 500901 && Object.keys(grid_data).length == 0">\n         <td class="left30" colspan="99">\u8BF7\u9009\u62E9\u57FA\u91D1</td>\n        </tr>\n        <tr v-if="grid_data_code == 0 && (Object.keys(grid_data).length == 0 || grid_data.data.length == 0)">\n          <td class="left30" colspan="99">\u8BE5\u65F6\u6BB5\u6682\u65E0\u5339\u914D\u8BB0\u5F55</td>\n         </tr>\n      </tbody>\n\n      <thead v-if="org_info_theme != 3">\n        <draggable style="border-top:0;" :list="display_rules" element="tr" :options="dragOptions" @move="onMove" @end="onEnd">\n          <th v-for="rule in display_rules" v-bind:class="rule.class">\n            <span>{{rule.label}}</span>\n            <a class="icon-sortBy" v-on:click="chgSort(rule.id)">\n              <i class="icon-asc" :class="{active: (order_by == rule.id && order == \'asc\')}"></i>\n              <i class="icon-desc" :class="{active: (order_by == rule.id && order == \'desc\')}"></i>\n            </a>\n          </th>\n        </draggable>\n      </thead>\n      <tbody v-if="org_info_theme != 3 && grid_data.list && Object.keys(grid_data.list).length > 0">\n        <tr v-for="row in display_data" style="border-top: 1px solid #EAEAEA;">\n          <td v-for="rule in display_rules" v-bind:class="rule.class" :title="displayValue(row, rule)">{{displayValue(row, rule)}}</td>\n        </tr>\n      </tbody>\n      <tbody v-if="org_info_theme != 3 && grid_data.list && Object.keys(grid_data.list).length == 0">\n        <tr v-if="grid_data_code == 500901">\n          <td class="left30" colspan="99">\u8BF7\u9009\u62E9\u57FA\u91D1</td>\n        </tr>\n        <tr v-if="grid_data_code == 0">\n          <td class="left30" colspan="99">\u8BE5\u65F6\u6BB5\u6682\u65E0\u5339\u914D\u8BB0\u5F55</td>\n        </tr>\n      </tbody>\n\n    </table>\n    ',
    data: function data() {
      return assetsSortData;
    },
    computed: {
      display_data: function display_data() {
        var _this = this;
        var rtn = [];
        // 步骤1，根据接口数据进行准备
        this.grid_data.list instanceof Array && this.grid_data.list.forEach(function (e) {
          var obj = {};

          // 产品
          obj.name = e.name;
          // 账户
          obj.account_name = e.account_name;
          // 净资产
          obj.net_assets = e.net_assets;
          // 份额
          obj.volume = e.volume;
          // 单位净值
          obj.net_value = e.net_value;
          // 仓位
          obj.market_position = e.market_position;
          // 持仓市值
          obj.market_value = e.market_value;
          // 股票市值
          obj.stock_market_value = e.stock_market_value;
          // 期货占用保证金
          obj.future_ensure_assets = e.future_ensure_assets;
          // 股票占总市值
          obj.stock_market_ratio = e.stock_market_ratio;
          // 期货占总市值
          obj.future_market_ratio = e.future_market_ratio;
          // 风险度
          obj.future_ensure_ratio = e.future_ensure_ratio;

          rtn.push(obj);
        });

        if (0 == rtn.length) {
          $(".custom-grey-btn__export").addClass('doBtnExport_bgd');
        } else {
          $(".custom-grey-btn__export").removeClass('doBtnExport_bgd');
        }
        // 步骤2，根据排序逻辑进行排序
        // rtn = VUECOMPONENT.sort(rtn, _this.order, _this.order_by);
        return rtn;
        // if (_this.order == 'asc' || _this.order == 'desc') {
        //   rtn.sort((a, b) => {
        //     let x = a[_this.order_by];
        //     let y = b[_this.order_by];

        //     if ( !isNaN(parseFloat(x)) && !isNaN(parseFloat(y)) ) {
        //       x = parseFloat(x);
        //       y = parseFloat(y);
        //     }
        //     if (x > y) {
        //       return 1;
        //     }
        //     if (x < y) {
        //       return -1;
        //     }
        //     return 0;
        //   })

        //   if ('desc' == _this.order) {
        //     rtn.reverse();
        //   }
        //   return rtn;
        // }else{
        //   return rtn;
        // }
      }
    }
  });

  // 自定义数据查询页面清算查询
  Vue.component('vue-query-cashflow', {
    mixins: [numberMixin],
    props: ['grid_data', 'grid_data_code', 'org_info_theme'],
    template: '\n    <table class="journel-sheet-grid">\n      <thead>\n        <tr>\n          <!-- <th class="left10 multi"></th> -->\n          <th style="color: #999;" class="left30">\u6D41\u6C34\u53F7</th>\n          <th style="color: #999;" class="left20">\u8BC1\u5238\u4EE3\u7801</th>\n          <th style="color: #999;" class="left20">\u8BC1\u5238\u540D\u79F0</th>\n          <th style="color: #999;" class="left20">\u7B56\u7565</th>\n          <th style="color: #999;" class="right20">\u4EA4\u6613\u65B9\u5411</th>\n          <th style="color: #999;" class="right20">\u6210\u4EA4\u6570\u91CF</th>\n          <th style="color: #999;" class="right20">\u6210\u4EA4\u91D1\u989D</th>\n          <th style="color: #999;" class="right20">\u5370\u82B1\u7A0E</th>\n          <th style="color: #999;" class="right20">\u4EA4\u6613\u4F63\u91D1</th>\n          <th style="color: #999;" class="right20">\u8FC7\u6237\u8D39</th>\n          <th style="color: #999;" class="right20">\u7ECF\u624B\u8D39</th>\n          <th style="color: #999;" class="right20">\u7ED3\u7B97\u8D39</th>\n          <th style="color: #999;" class="right20">\u8BC1\u7BA1\u8D39</th>\n          <th style="color: #999;" class="right20">\u4EA4\u6613\u8D39</th>\n          <th style="color: #999;" class="right20">\u65E5\u671F</th>\n          <!-- <th class="right40"></th> -->\n        </tr>\n      </thead>\n      <tbody>\n        <tr v-if="grid_data.data && grid_data.data.length > 0" v-for="row in grid_data.data">\n          <td class="left30">{{row.id}}</td>\n          <td class="left20">{{row.stock_id}}</td>\n          <td class="left20">{{row.stock_name}}</td>\n          <td class="left20">{{row.name}}</td>\n          <td class="right20">{{row.deal_type_name}}</td>\n          <td class="right20">{{numeralNumber(row.deal_volume, 0)}}</td>\n          <td class="right20">{{numeralNumber(row.deal_amount, 3)}}</td>\n          <td class="right20">{{numeralNumber(row.fee_stamp_duty, 4)}}</td>\n          <td class="right20">{{numeralNumber(row.fee_formalities, 4)}}</td>\n          <td class="right20">{{numeralNumber(row.fee_transfer, 4)}}</td>\n          <td class="right20">{{numeralNumber(row.fee_collection, 4)}}</td>\n          <td class="right20">{{numeralNumber(row.fee_clearing, 4)}}</td>\n          <td class="right20">{{numeralNumber(row.fee_transaction, 4)}}</td>\n          <td class="right20">{{numeralNumber(row.total_fee, 4)}}</td>\n          <td class="right20">{{row.dealed_at}}</td>\n        </tr>\n        <tr v-if="grid_data_code == 500901 && Object.keys(grid_data).length == 0">\n          <td class="left30" colspan="99">\u8BF7\u9009\u62E9\u57FA\u91D1</td>\n        </tr>\n        <tr v-if="grid_data_code == 0 && Object.keys(grid_data).length == 0">\n          <td class="left30" colspan="99">\u8BE5\u65F6\u6BB5\u6682\u65E0\u5339\u914D\u8BB0\u5F55</td>\n        </tr>\n      </tbody>\n    </table>\n    ',
    data: function data() {
      return {};
    },
    methods: {
      checkPositive: function checkPositive(num) {
        return parseFloat(num) > 0;
      },
      checkNegative: function checkNegative(num) {
        return parseFloat(num) < 0;
      }
    }
  });

  // 自定义数据查询页面指令查询 实际产品中，暂时没有指令查询相关
  Vue.component('vue-query-instruction', {
    mixins: [numberMixin],
    props: ['grid_data', 'grid_data_code', 'org_info_theme'],
    template: '\n    <table class="journel-sheet-grid">\n      <thead v-if="org_info_theme != 3">\n        <tr>\n          <th v-if="false" style="color: #999;" class="left30">\u65E5\u671F</th>\n          <th style="color: #999;" class="left20">\u8BC1\u5238\u4EE3\u7801</th>\n          <th style="color: #999;" class="left20">\u57FA\u91D1</th>\n          <th style="color: #999;" class="left20">\u4EA4\u6613\u5355\u5143</th>\n          <th style="color: #999;" class="left20">\u4E70\u5356\u65B9\u5411</th>\n          <th style="color: #999;" class="right20">\u6307\u4EE4\u6570\u91CF</th>\n          <th style="color: #999;" class="right20">\u6307\u4EE4\u91D1\u989D</th>\n          <th style="color: #999;" class="right20">\u7D2F\u8BA1\u59D4\u6258\u91CF</th>\n          <th style="color: #999;" class="right20">\u7D2F\u8BA1\u59D4\u6258\u91D1\u989D</th>\n          <th style="color: #999;" class="right20">\u7D2F\u79EF\u6210\u4EA4\u91CF</th>\n          <th style="color: #999;" class="right20">\u7D2F\u79EF\u6210\u4EA4\u91D1\u989D</th>\n          <th style="color: #999;" class="right20">\u6295\u4FDD\u6807\u5FD7</th>\n          <th style="color: #999;" class="right20">\u63D0\u4EA4\u65F6\u95F4</th>\n          <th style="color: #999;" class="right20">\u5F00\u59CB\u65F6\u95F4</th>\n          <th style="color: #999;" class="right20">\u7ED3\u675F\u65F6\u95F4</th>\n          <th style="color: #999;" class="right20">\u63D0\u4EA4\u4EBA</th>\n        </tr>\n      </thead>\n      <tbody v-if="org_info_theme != 3">\n        <tr v-if="grid_data.length > 0" v-for="row in grid_data">\n          <td v-if="false" class="left30">{{\'\u65E5\u671F\'}}</td>\n          <td class="left20">{{row.stock_code + \' \' + row.stock_name}}</td>\n          <td class="left20">{{\'row.name\'}}</td>\n          <td class="right20">{{\'\'}}</td>\n          <td class="right20">{{\'\u4E70\u5356\u65B9\u5411\'}}</td>\n          <td class="right20">{{numeralNumber(row.ins_volume, 0)}}</td>\n          <td class="right20">{{numeralNumber(row.ins_amount, 3)}}</td>\n          <td class="right20">{{\'\u7D2F\u8BA1\u59D4\u6258\u91CF\'}}</td>\n          <td class="right20">{{\'\u7D2F\u8BA1\u59D4\u6258\u91D1\u989D\'}}</td>\n          <td class="right20">{{\'\u6295\u4FDD\u6807\u5FD7\'}}</td>\n          <td class="right20">{{\'\u63D0\u4EA4\u65F6\u95F4\'}}</td>\n          <td class="right20">{{\'\u5F00\u59CB\u65F6\u95F4\'}}</td>\n          <td class="right20">{{\'\u7ED3\u675F\u65F6\u95F4\'}}</td>\n          <td class="right20">{{\'\u63D0\u4EA4\u4EBA\'}}</td>\n        </tr>\n      </tbody>\n      <tr v-if="grid_data_code == 500901 && Object.keys(grid_data).length == 0">\n        <td class="left30" colspan="99">\u8BF7\u9009\u62E9\u57FA\u91D1</td>\n      </tr>\n      <tr v-if="grid_data_code == 0 && Object.keys(grid_data).length == 0">\n        <td class="left30" colspan="99">\u8BE5\u65F6\u6BB5\u6682\u65E0\u5339\u914D\u8BB0\u5F55</td>\n      </tr>\n    </table>\n    ',
    data: function data() {
      return {};
    },
    methods: {
      checkPositive: function checkPositive(num) {
        return parseFloat(num) > 0;
      },
      checkNegative: function checkNegative(num) {
        return parseFloat(num) < 0;
      }
    }
  });

  window.addEventListener('load', function () {
    // $(function(){
    var report_list = new Vue({
      mixins: [numberMixin],
      el: "#report_list",
      data: {
        minDate: '2015-01-01',
        maxDate: function () {
          return moment().format('YYYY-MM-DD');
        }(),
        startDate: function () {
          return moment().format('YYYY-MM-DD');
        }(),
        endDate: function () {
          return moment().format('YYYY-MM-DD');
        }(),
        multiple_select: [],
        option: [],
        org_info_theme: LOGIN_INFO.org_info.theme,
        division_stock: true,
        ajax_time: '',
        // 汇总维度
        lined: 'group',

        query_stock_type: undefined,
        query_market: undefined,
        options_stock_type: [{
          label: '股票',
          value: 'ST'
        }, {
          label: '货币基金',
          value: 'CF'
        }, {
          label: '期货',
          value: 'FT'
        }, {
          //   label: '债券',
          //   value: 'BO'
          // },{
          label: '其他',
          value: 'OT'
        }],
        options_market: [{
          label: '深A',
          value: 'SZ'
        }, {
          label: '沪A',
          value: 'SH'
        }, {
          label: '港股通',
          value: 'HK'
        }, {
          label: '期货',
          value: 'FT'
        }, {
          label: '场外',
          value: 'CW'
        }, {
          label: '其他',
          value: 'OT'
        }],
        order: '',
        order_by: '',
        display_rules: [],
        typeStr: '',

        isLoading: false,
        active: reportActive,
        gridDataCode: 500901, //由于默认不查询 所以默认状态为“请选择产品”
        gridData: [],
        stock_input_type_id: '',
        stock_id: ''
      },
      watch: {
        lined: function lined() {
          this.getGridData();
        },
        multiple_select: function multiple_select(val, old) {
          if (val.length == 0 && old.length == 0 || val.toString() == old.toString()) {} else {
            this.getGridData();
          }
        },
        // startDate: function(val, old){
        //   this.getGridData();
        //   // let flag = moment(this.startDate).isAfter(this.endDate);
        //   // if (true == flag) {
        //   //   $.omsAlert('开始时间不得晚于结束时间');
        //   //   this.startDate = old;
        //   // }else{
        //   //   this.getGridData();
        //   // }
        // },
        // endDate: function(val, old){
        //   this.getGridData();
        //   // let flag = moment(this.startDate).isAfter(this.endDate);
        //   // if (true == flag) {
        //   //   $.omsAlert('开始时间不得晚于结束时间');
        //   //   this.endDate = old;
        //   // }else{
        //   //   this.getGridData();
        //   // }
        // },
        division_stock: function division_stock() {
          this.getGridData();
        },
        query_stock_type: function query_stock_type(curVal, oldVal) {
          if (undefined == oldVal) {} else {
            this.getGridData();
          }
        },
        query_market: function query_market(curVal, oldVal) {
          if (undefined == oldVal) {} else {
            this.getGridData();
          }
        },
        // 股票查询框中正确的股票id
        stock_id: function stock_id() {
          this.getGridData();
        }
      },
      methods: {
        chgStartDate: function chgStartDate(startDate) {
          // let flag = moment(this.startDate).isAfter(this.endDate);
          // if (true == flag) {
          //   $.omsAlert('开始时间不得晚于结束时间');
          //   $('.gridPagination').html('');
          //   this.gridData = [];
          // }else{
          //   this.startDate = startDate;
          //   this.getGridData();
          // }

          this.startDate = startDate;
          this.getGridData();
        },
        chgEndDate: function chgEndDate(endDate) {
          // let flag = moment(this.startDate).isAfter(this.endDate);
          // if (true == flag) {
          //   $.omsAlert('开始时间不得晚于结束时间');
          //   $('.gridPagination').html('');
          //   this.gridData = [];
          // }else{
          //   this.endDate = endDate;
          //   this.getGridData();
          // }

          this.endDate = endDate;
          this.getGridData();
        },
        updateOrder: function updateOrder(obj) {
          this.order = obj.order;
          this.order_by = obj.order_by;
          this.display_rules = obj.display_rules;

          // this.typeStr = obj.typeStr;
          // this.getGridData();
          // 因为部分查询页面需要翻页，所以排序更改后就是应该重新查询数据再显示。但是，之前切换菜单也会触发查询事件，就会导致重复查询了。
          // 所以，要额外进行一个判断，判断当前排序字段是否一致，一致才需要在这里查询数据，否则，别的流程自己有查询数据的步骤。
          if (this.typeStr == obj.typeStr) {
            this.getGridData();
          } else {
            this.typeStr = obj.typeStr;
          }
        },
        doRefresh: function doRefresh() {
          if (this.multiple_select.length == 0) {
            $.omsAlert('请选择基金');
            return;
          }
          this.goto();
        },
        doExport: function doExport() {
          var _this = this;
          if (this.multiple_select.length == 0) {
            $.omsAlert('请选择基金');
            return;
          }

          if ($(".custom-grey-btn__export").hasClass('doBtnExport_bgd')) {
            return;
          }

          var flag = moment(this.startDate).isAfter(this.endDate);
          if (true == flag && ('entrust' == this.active || 'deal' == this.active || this.active == 'assets' && this.org_info_theme == 3)) {
            $.omsAlert('开始时间不得晚于结束时间');
            return;
          }

          var flag2 = moment(this.startDate).add(31, 'day').isAfter(this.endDate);
          if (!flag2 && ('entrust' == this.active || 'deal' == this.active || this.active == 'assets' && this.org_info_theme == 3)) {
            $.omsAlert('查询间隔不能大于31天');
            return;
          }

          var group_arr = [];
          var base_arr = [];
          var product_arr = [];
          _this.multiple_select.forEach(function (e) {
            if ('group' == e.split('&')[1]) {
              group_arr.push(e.split('&')[0]);
            }
            if ('base' == e.split('&')[1]) {
              base_arr.push(e.split('&')[0]);
            }
            if ('product' == e.split('&')[1]) {
              product_arr.push(e.split('&')[0]);
            }
          });
          var queryStr = '';
          if (group_arr.length > 0) {
            queryStr += '&group_id=' + group_arr.join(',');
          }

          if (base_arr.length > 0) {
            queryStr += '&base_id=' + base_arr.join(',');
          }

          if (product_arr.length > 0) {
            queryStr += '&product_id=' + product_arr.join(',');
          }

          var field_sort = [];
          field_sort = this.display_rules.map(function (e) {
            return e.id;
          });
          $.startLoading();
          // 机构版
          if (this.org_info_theme != 3) {
            $.ajax({
              url: window.REQUEST_PREFIX + '/oms/report/download_report/' + _this.active + '?type=excel' + queryStr,
              type: 'GET',
              data: {
                start: _this.startDate,
                end: _this.endDate,
                division_stock: true == _this.division_stock ? 1 : 0,
                lined: _this.lined,
                order: _this.order,
                order_by: _this.order_by,
                field_sort: field_sort.join(','),
                query_stock_type: _this.query_stock_type.join(','),
                query_market: _this.query_market.join(','),
                stock_id: _this.stock_id
              },
              success: function success(_ref2) {
                var code = _ref2.code,
                    msg = _ref2.msg,
                    data = _ref2.data;

                $.clearLoading();
                $.omsAlert('正为您生成报表，成功后可进入文件中心下载');
              },
              error: function error() {
                $.omsAlert('网络异常，请重试');
              }
            });
          } else {
            if (product_arr.length > 0) {
              queryStr += '&product_id=' + product_arr.join(',');
            }

            var curActive = this.active;
            if ('position' == curActive) {
              curActive = 'today_position';
            }
            $.ajax({
              url: window.REQUEST_PREFIX + '/oms/report/download_report/' + curActive + '?type=excel' + queryStr,
              type: 'GET',
              data: {
                start: _this.startDate,
                end: _this.endDate
              },
              success: function success(_ref3) {
                var code = _ref3.code,
                    msg = _ref3.msg,
                    data = _ref3.data;

                $.clearLoading();
                $.omsAlert('正为您生成报表，成功后可进入文件中心下载');
              },
              error: function error() {
                $.omsAlert('网络异常，请重试');
              }
            });
          }
        },
        checkPositive: function checkPositive(num) {
          return parseFloat(num) > 0;
        },
        checkNegative: function checkNegative(num) {
          return parseFloat(num) < 0;
        },
        checkDisplay: function checkDisplay(active) {
          // 资产
          if (active == 'assets') {
            return window.LOGIN_INFO.role_permission[GV.permissions['PERMISSION_SELECT_CASH']];
          }
          // 指令
          if (active == 'instruction') {
            return window.LOGIN_INFO.role_permission[GV.permissions['PERMISSION_SELECT_INSTRUCT']];
          }
          // 委托
          if (active == 'entrust') {
            return window.LOGIN_INFO.role_permission[GV.permissions['PERMISSION_SELECT_ENTRUST']];
          }
          // 成交
          if (active == 'deal') {
            return window.LOGIN_INFO.role_permission[GV.permissions['PERMISSION_SELECT_DEAL']];
          }
          // 持仓
          if (active == 'position') {
            return window.LOGIN_INFO.role_permission[GV.permissions['PERMISSION_SELECT_POSITION']];
          }
          // 清算
          if (active == 'cashflow') {
            return window.LOGIN_INFO.role_permission[GV.permissions['PERMISSION_SELECT_FEE']];
          }
          return false;
        },
        goto: function goto(e, active) {
          var _this = this;
          if ($('.refresh-btn').hasClass('loading')) {
            return;
          }
          $('.refresh-btn').addClass('loading');
          $('.gridPagination').empty();
          if (!active) {
            // 本页js调用goto，不会传入参，所以会走入这个分支，所以要查询表格数据。
            active = this.active;
            this.typeStr = 'report_list__' + this.active + '_order';
            _this.endDate = new Date().getFullYear() + '-' + toPad(new Date().getMonth() + 1, 2) + '-' + toPad(new Date().getDate(), 2);
            this.gridData = [];
            this.getGridData();
          } else {
            // blade中vue的click事件触发goto，会传目标页面信息进来，所以会走入这个分支，但是需要注意的是
            // 新的active与旧的active相同时，要调用getGridData刷新表格，而不同时不需要，因为获取排序信息会查询表格数据。
            var flag_getData = false;
            if (active == _this.active) {
              flag_getData = true;
            }
            // 未获取接口数据问题规避处理
            if ('cashflow' == active) {
              flag_getData = true;
            }
            _this.active = active;
            this.typeStr = 'report_list__' + this.active + '_order';
            _this.gridData = [];
            _this.getProductsByPermissions(active, function () {
              // _this.getGridData();
              if (true == flag_getData) {
                _this.getGridData();
              }
            });
          }
        },
        getBeginDate: function getBeginDate(productInfo, arrId) {
          if (arrId.length == 0) {
            return '';
          }
          var beginDateArr = productInfo.filter(function (e) {
            if (arrId.some(function (el) {
              return el == e.value;
            })) {
              return true;
            }
          });
          beginDateArr.sort(function (a, b) {
            return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
          });
          return beginDateArr[0].startDate;
        },
        getGridData: function getGridData(page) {
          var flag = moment(this.startDate).isAfter(this.endDate);
          if (true == flag && ('entrust' == this.active || 'deal' == this.active || this.active == 'assets' && this.org_info_theme == 3)) {
            $.omsAlert('开始时间不得晚于结束时间');
          }

          var flag2 = moment(this.startDate).add(31, 'day').isAfter(this.endDate);
          if (!flag2 && ('entrust' == this.active || 'deal' == this.active || this.active == 'assets' && this.org_info_theme == 3)) {
            $.omsAlert('查询间隔不能大于31天');
          }

          if (!page) {
            page = 1;
          }
          var _this = this;
          if ('position' == this.active) {
            //特殊处理，持仓查询只能显示当前时间，和后台商量持仓不传时间
            var data = {
              type: 'group',
              lined: _this.lined,
              division_stock: true == _this.division_stock ? 1 : 0,
              page: page,
              order: _this.order,
              order_by: _this.order_by,
              query_stock_type: _this.query_stock_type.join(','),
              query_market: _this.query_market.join(','),
              stock_id: _this.stock_id
              // ,
              // product_id: _this.multiple_select.join(',')
            };
          } else {
            var data = {
              type: 'group',
              lined: _this.lined,
              division_stock: true == _this.division_stock ? 1 : 0,
              page: page,
              start: _this.startDate,
              end: _this.endDate,
              order: _this.order,
              order_by: _this.order_by,
              query_stock_type: _this.query_stock_type.join(','),
              query_market: _this.query_market.join(','),
              stock_id: _this.stock_id
              // ,
              // product_id: _this.multiple_select.join(',')
            };
          }

          var group_arr = [];
          var base_arr = [];
          var product_arr = [];
          _this.multiple_select.forEach(function (e) {
            if ('group' == e.split('&')[1]) {
              group_arr.push(e.split('&')[0]);
            }
            if ('base' == e.split('&')[1]) {
              base_arr.push(e.split('&')[0]);
            }
            if ('product' == e.split('&')[1]) {
              product_arr.push(e.split('&')[0]);
            }
          });
          if (group_arr.length > 0) {
            data.group_id = group_arr.join(',');
          }
          if (base_arr.length > 0) {
            data.base_id = base_arr.join(',');
          }
          if (product_arr.length > 0) {
            data.product_id = product_arr.join(',');
          }
          this.ajax_time = new Date().getTime();
          var ajax_time = this.ajax_time;
          $.startLoading('正在查询');

          $.ajax({
            url: window.REQUEST_PREFIX + '/oms/report/report_list/' + this.active,
            type: 'get',
            data: data,
            success: function success(res) {
              if (ajax_time != _this.ajax_time) {
                return;
              }
              $.clearLoading();
              _this.gridDataCode = 0;
              $('.refresh-btn').removeClass('loading');
              if (0 == res.code) {
                res.data.base && res.data.base.forEach(function (e) {
                  e.web_hide_child = true;
                });
                res.data.group && res.data.group.forEach(function (e) {
                  e.web_hide_child = true;
                  e.child_base && e.child_base.forEach(function (el) {
                    el.web_hide_child = true;
                  });
                  e.child_group && e.child_group.forEach(function (el) {
                    el.web_hide_child = true;
                  });
                });

                _this.gridData = res.data;
                if (res.data.data_page_html || '' == res.data.data_page_html) {
                  $('.gridPagination').html(res.data.data_page_html.replace(/href/g, 'data-href'));
                }
              } else {
                if (500901 == res.code) {
                  _this.gridDataCode = 500901;
                  _this.gridData = [];
                } else {
                  $.omsAlert(res.msg);
                }
              }
            },
            error: function error() {
              $.clearLoading();
              $('.refresh-btn').removeClass('loading');
            }
          });
        },
        getProductsByPermissions: function getProductsByPermissions(active, callback) {
          var _this = this;
          $.ajax({
            url: window.REQUEST_PREFIX + '/user/get_products_by_permissions',
            data: {
              permission_id: permissionArr[active]
            },
            success: function success(res) {
              if (0 == res.code) {

                var arr = [];
                res.data.group && res.data.group.forEach(function (e) {
                  arr.push({
                    label: e.name,
                    value: e.id + '&group',
                    type: 'group'
                  });
                });

                res.data.base && res.data.base.forEach(function (e) {
                  arr.push({
                    label: e.name,
                    value: e.id + '&base',
                    type: 'base'
                  });
                });

                res.data.product && res.data.product.forEach(function (e) {
                  arr.push({
                    label: e.name,
                    value: e.id + '&product',
                    type: 'product'
                  });
                });

                _this.option = arr;

                if (Object.prototype.toString.call(callback) === '[object Function]') {
                  callback.call();
                }
              }
            },
            error: function error() {}
          });
        }
      }
    });

    var productInfo = {};

    report_list.getProductsByPermissions('assets');
    // report_list.getProductsByPermissions('assets', function(){

    // });

    window.report_list = report_list;

    $(document).on('click', '.pagination a', function () {
      var pageNumArr = $(this).attr('data-href').split('page=');
      if (2 == pageNumArr.length) {
        report_list.getGridData(pageNumArr[1]);
      }
    });
  });
});
//# sourceMappingURL=report_list.js.map