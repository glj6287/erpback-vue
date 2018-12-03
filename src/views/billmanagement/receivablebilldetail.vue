<template>
 <div class="app-container" v-loading="getDataLoading" element-loading-text="请给我点时间！">
   <div class="odd">
     <h3><span style="margin-right:10px">账单编号:</span><span style="margin-right:20px">{{this.receBillCode}} {{this.settleTypeText}}，{{this.isActiveText}}</span></h3>
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
              <el-button @click="toViewContract(receBillInfo)" type="text">{{receBillInfo.contractCode}}</el-button>
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
              <el-button @click="toViewHouse(receBillInfo)" type="text">{{receBillInfo.houseCode}}</el-button>
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
                <span>{{receBillInfo.createTime | formatTime}}</span>
            </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
            <div class="grid-content bg-purple">
                <span>会员费:</span>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple-light">
                <span>{{receBillInfo.membershipFee}}元</span>
            </div>
        </el-col>
      </el-row>
       <el-row class="housing_detail">
        <el-col :span="4">
            <div class="grid-content bg-purple">
                <span>已收金额:</span>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple-light">
                <span>{{receBillInfo.receivedMoney}}元</span>
            </div>
        </el-col>
      </el-row>
    </div>

   <h3 class="housing_title">收款记录</h3>
     <el-table :data="receBillInfo.receivableRecordList" v-loading="listLoading" border stripe fit style="width: 100%">

       <el-table-column min-width="150" label="收款时间" align="center">
         <template slot-scope="scope">
           <span>{{scope.row.createTime | formatTime}}</span>
         </template>
       </el-table-column>

       <el-table-column  width="180" label="收款金额" align="center">
         <template slot-scope="scope">
           <span>{{scope.row.payMoney}}元</span>
         </template>
       </el-table-column>

       <el-table-column width="120" label="收款账户" align="center">
         <template slot-scope="scope">
           <span>{{scope.row.payeeBankName}}</span>
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
 </div>
</template>

<script>
import { selectReceivableBilInfo } from "@/api/bill";
import Utils from "@/utils/common";

export default {
  data() {
    return {
      getDataLoading: false,
      listLoading: false,
      receBillCode: this.$route.query.receBillCode,
      isActiveText: this.$route.query.isActiveText,
      settleTypeText: this.$route.query.settleTypeText,
      queryList: {
        receBillCode: ""
      },
      receBillInfo: "",
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
      this.queryList.receBillCode = this.receBillCode;
      selectReceivableBilInfo(this.queryList)
        .then(response => {
          this.receBillInfo = response.data.Item[0];
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

