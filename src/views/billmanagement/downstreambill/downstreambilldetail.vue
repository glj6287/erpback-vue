<template>
 <div class="app-container" v-loading="getDataLoading" element-loading-text="请给我点时间！">
   <div class="odd">
     <h3><span style="margin-right:10px">账单编号:</span><span style="margin-right:20px">{{this.tenatBillCode}} {{this.settleTypeText}}</span></h3>
   </div>
   <h3 class="housing_title">基本信息</h3>
    <div class="main">
     <el-row class="housing_detail">
        <el-col :span="4">
            <div class="grid-content bg-purple">
                <span>下游合同:</span>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple-light">
              <el-button @click="toViewContract(tenatBillInfo)" type="text">{{tenatBillInfo.dsContractCode}}</el-button>
            </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
            <div class="grid-content bg-purple">
                <span>房源编号:</span>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple-light">
              <el-button @click="toViewHouse(tenatBillInfo)" type="text">{{tenatBillInfo.houseCode}}</el-button>
            </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
            <div class="grid-content bg-purple">
                <span>创建日期:</span>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple-light">
                <span>{{tenatBillInfo.createTime | formatTime}}</span>
            </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
            <div class="grid-content bg-purple">
                <span>租客名称:</span>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple-light">
                <span>{{tenatBillInfo.tenantsName}}</span>
            </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span>账期:</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <span>{{tenatBillInfo.startDate | formatTime}} - {{tenatBillInfo.endDate | formatTime}}</span>
          </div>
        </el-col>
      </el-row>
       <el-row class="housing_detail">
        <el-col :span="4">
            <div class="grid-content bg-purple">
                <span>最晚付款日期:</span>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple-light">
                <span>{{tenatBillInfo.dueDate | formatTime}}</span>
            </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span>付款方式:</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <span>{{tenatBillInfo.paymentTypeValue}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span>期次:</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <span>第{{tenatBillInfo.currentPeriod}}期（共{{tenatBillInfo.countPeriod}}期）</span>
          </div>
        </el-col>
      </el-row>

      <el-table :data="tenatBillInfo.rentTypeDetailList" v-loading="listLoading" border stripe fit style="width: 100%">
        <el-table-column min-width="180" label="应收类型" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.rentType}}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="180" label="应收金额" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.repayFee}}元</span>
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="180" label="已收金额">
          <template slot-scope="scope">
            <span>{{scope.row.realRepay}}元</span>
          </template>
        </el-table-column>
      </el-table>

      <br/>
      <el-row class="housing_detail">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span>应收总额:</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <span>{{tenatBillInfo.totalRepayFee}}元</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span>已收总额:</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <span>{{tenatBillInfo.realRepay}}元</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span>未收总额:</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <span>{{tenatBillInfo.realSurplus}}元</span>
          </div>
        </el-col>
      </el-row>

    </div>
   <h3 class="housing_title">   收款流水</h3>
   <el-table :data="tenatBillInfo.tenantsReceivableRecordVoList" v-loading="listLoading" border stripe fit style="width: 100%">

     <el-table-column width="150" label="收款时间">
       <template slot-scope="scope">
         <span>{{scope.row.createTime | formatTime}}</span>
       </template>
     </el-table-column>
     <el-table-column width="100" label="收款方式">
       <template slot-scope="scope">
         <span>{{scope.row.payWayValue}}</span>
       </template>
     </el-table-column>
     <el-table-column align="center" width="110" label="收款金额">
       <template slot-scope="scope">
         <span>{{scope.row.payMoney}}元</span>
       </template>
     </el-table-column>

     <el-table-column align="center" width="100" label="收款账户">
       <template slot-scope="scope">
         <span>{{scope.row.receivableAccount}}</span>
       </template>
     </el-table-column>
     <el-table-column width="130" label="收款公司">
       <template slot-scope="scope">
         <span>{{scope.row.signCompanyText}}</span>
       </template>
     </el-table-column>
     <el-table-column align="center" width="200" label="付款人">
       <template slot-scope="scope">
         <span>{{scope.row.payName}}</span>
       </template>
     </el-table-column>
     <el-table-column align="center"  width="130" label="收款流水">
       <template slot-scope="scope">
         <span>{{scope.row.paySerialNumber}}</span>
       </template>
     </el-table-column>

     <el-table-column align="center" width="200" label="处理人">
       <template slot-scope="scope">
         <span>{{scope.row.operator}}</span>
       </template>
     </el-table-column>

   </el-table>

   <div v-if="this.isChangeoff == 1">
     <h3 class="housing_title">   销账</h3>
     <el-form class="form-container" :model="paramInsert" ref="validateForm" :rules="rules" :inline="true" label-width="100px">
       <div>
         <el-form-item label="支付金额:" prop="payMoney" class="itemblock">
           <el-input  size="small" v-model="paramInsert.payMoney" placeholder="" :maxlength="inputMaxL"  @input="inputMaxL = /^\d+\.?\d{0,1}$/.test(paramInsert.payMoney) ? null : paramInsert.payMoney.length - 1"></el-input>元
         </el-form-item>
         <el-form-item label="支付方式:" prop="payWayKey" class="itemblock">
           <el-select v-model="paramInsert.payWayKey" size="small" style="width: 174px" @change="changeReceAccount" clearable>
             <el-option v-for="item in payWayOptions" :key="item.dictValue" :label="item.dictValue"
                        :value="item.dictCode"></el-option>
           </el-select>
         </el-form-item>
         <el-form-item label="收款账户:" prop="receivableAccount" class="itemblock">
           <el-select v-model="paramInsert.receivableAccount" size="small" style="width: 174px" clearable>
             <el-option v-for="item in receivableAccountOptions" :key="item.dictValue" :label="item.dictValue"
                        :value="item.dictValue"></el-option>
           </el-select>
         </el-form-item>
         <el-form-item label="支付流水:" prop="paySerialNumber" class="itemblock">
           <el-input  size="small" v-model="paramInsert.paySerialNumber" placeholder=""></el-input>
         </el-form-item>
         <el-form-item label="付款人:" prop="payName" class="itemblock">
           <el-input  size="small" v-model="paramInsert.payName" placeholder=""></el-input>
         </el-form-item>

         <el-form-item style="margin-left:43px;" class="itemblock">
           <el-button type="primary" size="medium" v-loading="insertLoading" @click="receiChargeOffBill">提交</el-button>
         </el-form-item>
       </div>
     </el-form>
   </div>

 </div>
</template>

<script>
import { tenantBillInfoDetail, dsReceiChargeOffBill } from "@/api/bill";
import { getDownstreamPayWay, getReceivableBankAccount } from "@/api/basedata";
import Utils from "@/utils/common";

export default {
  data() {
    return {
      getDataLoading: false,
      listLoading: false,
      insertLoading: false,
      tenatBillCode: this.$route.query.tenatBillCode,
      isActiveText: this.$route.query.isActiveText,
      settleTypeText: this.$route.query.settleTypeText,
      isChangeoff: this.$route.query.isChangeoff,
      queryList: {
        tenatBillCode: ""
      },
      payWayOptions: [],
      receivableAccountOptions: [],
      receAlipayAccountOptions: [{ dictCode: "源涞支付宝", dictValue: "源涞支付宝" }, { dictCode: "涞润支付宝", dictValue: "涞润支付宝" }],
      receWechatAccountOptions: [{ dictCode: "源涞微信", dictValue: "源涞微信" }, { dictCode: "涞润微信", dictValue: "涞润微信" }],
      receCashAccountOptions: [{ dictCode: "现金", dictValue: "现金" }],
      tenatBillInfo: "",
      list: [],
      inputMaxL: 99999999999999,
      paramInsert: {
        tenatBillCode: "",
        payMoney: "",
        payWayKey: "",
        receivableAccount: "",
        paySerialNumber: "",
        payName: ""
      },
      rules: {
        payMoney: [
          { required: true, message: '请输入收款金额', trigger: 'blur' },
          { type: 'number', message: '金额必须为数字值', trigger: 'blur', transform(value) {
            return Number(value);
          }}
        ],
        payWayKey: [
          { required: true, message: '请选择支付方式', trigger: 'change' }
        ],
        receivableAccount: [
          { required: true, message: '请选择收款账户', trigger: 'change' }
        ],
        paySerialNumber: [
          { required: true, message: '请输入支付流水', trigger: 'blur' }
        ],
        payName: [
          { required: true, message: '请输入付款人', trigger: 'blur' }
        ]
      }
    };
  },
  filters: {
    formatTime(date) {
      if (date) {
        return date.substring(0, date.indexOf(" ")).replace(/-/g, ".");
      }
      return "-";
    }
  },
  created() {
    this.getDetail();
    this.getDownstreamPayWay();
  },
  methods: {
    getDetail() {
      this.queryList.tenatBillCode = this.tenatBillCode;
      tenantBillInfoDetail(this.queryList)
        .then(response => {
          this.tenatBillInfo = response.data;
        })
        .catch(error => {
          Utils.error(error);
        });
    },
//    number() {
//      this.paramInsert.payMoney = this.paramInsert.payMoney.replace(/[^\.\d]/g,'');
//      this.paramInsert.payMoney = this.paramInsert.payMoney.replace('.','');
//    },
    handleInput2(e) {
      // 通过正则过滤小数点后两位
      e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null;
    },
    // 支付方式
    getDownstreamPayWay() {
      getDownstreamPayWay().then(response => {
        this.payWayOptions = response.data;
      });
    },
    changeReceAccount(payWay) {
      console.log(payWay);
      // 2601 - 银行卡转账
      if (payWay === "2601") {
        getReceivableBankAccount().then(response => {
          this.receivableAccountOptions = response.data;
        });
      }
      // 2602 -	支付宝转账
      if (payWay === "2602") {
        this.receivableAccountOptions = this.receAlipayAccountOptions;
      }
      // 2603 - 微信转账
      if (payWay === "2603") {
        this.receivableAccountOptions = this.receWechatAccountOptions;
      }
      // 2604 - 现金
      if (payWay === "2604") {
        this.receivableAccountOptions = this.receCashAccountOptions;
      }
    },
    receiChargeOffBill() {
      this.$refs["validateForm"].validate((valid) => {
        if (valid) {
          this.paramInsert.tenatBillCode = this.tenatBillCode;
          console.log(this.paramInsert);
          dsReceiChargeOffBill(this.paramInsert).then(response => {
            this.$message.success("销账成功！");
            this.getDetail();
            this.$refs.validateForm.resetFields();
          });
        } else {
          return false;
        }
      });
    },
    toViewHouse(row) {
      this.$router.push({ path: `/house/detail/?houseCode=${row.houseCode}` });
    },
    toViewContract(row) {
      this.$router.push({ path: `/contractmanagement/downstreamcontract/auditcontract/?dsContractCode=${row.dsContractCode}` });
    }
  }
};
</script>

<style lang="scss" scoped>
    .housing_title{
        height: 50px;
        background-color: #ccc;
        line-height: 50px;
        text-indent: 10px;
    }
    .main{
        padding-left: 20px;
        padding-top: 10px;
    }
    .housing_detail{
        margin-bottom: 20px;
    }
    .housing_detail_pic{
        display: inline-block;
        width: 100px;
        height: 50px;
    }
    .itemblock{
       display: block;
     }
</style>

