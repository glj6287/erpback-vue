<template>
 <div class="app-container" v-loading="getDataLoading" element-loading-text="请给我点时间！">
   <div class="odd">
     <h3><span style="margin-right:10px">账单编号:</span><span style="margin-right:20px">{{this.payableBillCode}} {{this.settleStatusText}}，{{this.isActiveText}}</span></h3>
   </div>
   <h3 class="housing_title">基本信息</h3>
    <div class="main">
     <el-row class="housing_detail">
        <el-col :span="4">
            <div class="grid-content bg-purple">
                <span>上游合同:</span>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple-light">
              <el-button @click="toViewContract(payableBillInfo)" type="text">{{payableBillInfo.contractCode}}</el-button>
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
              <el-button @click="toViewHouse(payableBillInfo)" type="text">{{payableBillInfo.houseCode}}</el-button>
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
                <span>{{payableBillInfo.billStartData | formatTime}} - {{payableBillInfo.billEndData | formatTime}}</span>
            </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
            <div class="grid-content bg-purple">
                <span>应付日期:</span>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple-light">
                <span>{{payableBillInfo.payableDate | formatTime}}</span>
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
                <span>{{payableBillInfo.paymentTypeText}}</span>
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
                <span>第{{payableBillInfo.currentPeriod}}期（共{{payableBillInfo.countPeriod}}期）</span>
            </div>
        </el-col>
      </el-row>
       <el-row class="housing_detail">
        <el-col :span="4">
            <div class="grid-content bg-purple">
                <span>收款人姓名:</span>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple-light">
                <span>{{payableBillInfo.payeeName}}</span>
            </div>
        </el-col>
      </el-row>
       <el-row class="housing_detail">
        <el-col :span="4">
            <div class="grid-content bg-purple">
                <span>银行卡号:</span>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple-light">
                <span>{{payableBillInfo.bankCard}}</span>
            </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
            <div class="grid-content bg-purple">
                <span>银行名称:</span>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple-light">
                <span>{{payableBillInfo.bankName}}</span>
            </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span>支行名称:</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <span>{{payableBillInfo.bankSubbranchName}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span>银行卡照片:</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <!--<img width="100%" :src="payableBillInfo.bankAttcUrlBig" alt=""/>-->
            <span v-for="item in payableBillInfo.bankFileList"><img :src="item.attcUrlSmall" @click="showImageClick(item.attcUrl)" />&nbsp;</span>
          </div>
        </el-col>
      </el-row>
    </div>

   <h3 class="housing_title">账单明细</h3>
   <div class="main">
     <el-row class="housing_detail">
       <el-col :span="4">
         <div class="grid-content bg-purple">
           <span>租金:</span>
         </div>
       </el-col>
       <el-col :span="6">
         <div class="grid-content bg-purple-light">
           <span>{{payableBillInfo.rent}}元</span>
         </div>
       </el-col>
     </el-row>
     <el-row class="housing_detail">
       <el-col :span="4">
         <div class="grid-content bg-purple">
           <span>押金:</span>
         </div>
       </el-col>
       <el-col :span="6">
         <div class="grid-content bg-purple-light">
           <span>{{payableBillInfo.cashPledge}}元</span>
         </div>
       </el-col>
     </el-row>
   </div>


   <h3 class="housing_title">支付记录</h3>
     <el-table :data="payableBillInfo.upPayableRecordList" v-loading="listLoading" border stripe fit style="width: 100%">

       <el-table-column min-width="150" label="付款时间" align="center">
         <template slot-scope="scope">
           <span>{{scope.row.payableDate}}</span>
         </template>
       </el-table-column>

       <el-table-column  width="180" label="支付金额" align="center">
         <template slot-scope="scope">
           <span>{{scope.row.paidMoney}}元</span>
         </template>
       </el-table-column>

       <el-table-column width="120" label="支付账户" align="center">
         <template slot-scope="scope">
           <span>{{scope.row.payBankNumber}}</span>
         </template>
       </el-table-column>

       <el-table-column align="center" label="备注" min-width="140" >
         <template slot-scope="scope">
           <span>{{scope.row.remarks}}</span>
         </template>
       </el-table-column>

       <el-table-column align="center" width="120" label="处理人">
         <template slot-scope="scope">
           <span>{{scope.row.operator}}</span>
         </template>
       </el-table-column>

     </el-table>

       <!-- 图片预览 -->
       <div class="images" v-viewer="{navbar:false,toolbar:true}"   v-show="false">
         <img  :src=imageSrc >
       </div>
 </div>
</template>

<script>
import { selectPayBillInfo } from "@/api/bill";
import Utils from "@/utils/common";
import 'viewerjs/dist/viewer.css'
import Viewer from "v-viewer";
import Vue from "vue";
// Vue.use(Viewer); 

export default {
  data() {
    return {
      imageSrc: "", //图片预览,
      getDataLoading: false,
      listLoading: false,
      payableBillCode: this.$route.query.payableBillCode,
      isActiveText: this.$route.query.isActiveText,
      settleStatusText: this.$route.query.settleStatusText,
      queryList: {
        payableBillCode: ""
      },
      payableBillInfo: "",
      list: []
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
  },
  methods: {
    getDetail() {
      this.queryList.payableBillCode = this.payableBillCode;
      selectPayBillInfo(this.queryList)
        .then(response => {
          this.payableBillInfo = response.data.Item[0];          
        })
        .catch(error => {
          Utils.error(error);
        });
    },
    toViewHouse(row) {
      this.$router.push({ path: `/house/detail/?houseCode=${row.houseCode}` });
    },
    toViewContract(row) {
      this.$router.push({ path: `/contractmanagement/upstreamcontract/detailinfo/?contractCode=${row.contractCode}&statusName=${row.contractStatusValue}` });
    },
  
     // 图片预览
    showImageClick(src) {
      // this.imageSrc = `${src}?t=${new Date().getTime()}`;
      this.imageSrc = src;
      this.$nextTick(() => {
        const viewer = this.$el.querySelector(".images").$viewer;
        viewer.show();
      });
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
</style>

