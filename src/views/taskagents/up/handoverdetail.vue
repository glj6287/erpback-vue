<template>
  <div class="app-container" v-loading="getDataLoading" element-loading-text="请给我点时间！">
    <h3 class="housing_title">房东遗留物资</h3>
    <div class="main">
      <span v-if="contract.remainGoodslist != null" v-for="item in contract.remainGoodslist">
      <el-row class="housing_detail">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span>{{item.productName}}:</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <span>{{item.number}}</span>
          </div>
        </el-col>
      </el-row>
      </span>
    </div>

    <h3 class="housing_title">水电煤</h3>
    <div class="main">
      <el-row class="housing_detail">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span>水户号:</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <span>{{contract.shareBill.waterAccount}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span>抄表数字:</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <span>{{contract.shareBill.waterMeter}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span>电户号:</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <span>{{contract.shareBill.electricAccount}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span>抄表数字（电平）:</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <span>{{contract.shareBill.flatMeter}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span>抄表数字（电谷）:</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <span>{{contract.shareBill.valleyMeter}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span>煤气户号:</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <span>{{contract.shareBill.naturalGasAccount}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span>抄表数字（电平）:</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <span>{{contract.shareBill.gasMeter}}</span>
          </div>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
  import { upcontractDetail } from "@/api/upContract";
  import Utils from "@/utils/common";
  export default {
    data() {
      return {
        getDataLoading: false,
        contractCode: this.$route.query.contractCode,
        statusName: this.$route.query.statusName,
        contract: {
          remainGoodslist: [],
          leaseRentList: [],
          leaseDeadlineStr: "",
          rentMoney: "",
          landlordFDList: [],
          approveRecord: null,
          SQWTList: [],
          shareBill: "",
          payee: "",
          ZZHTList: [],
          extendedPeriodStr: "",
          leaseVo: "",
          houseInfoVo: "",
          YHKList: [],
          rentFreePeriodStr: "",
          landlordWTRList: [],
          FCZList: [],
          XCQYList: [],
          contractUpstream: ""
        }
      };
    },
    created() {
      this.getDetail();
    },
    methods: {
      getDetail() {
        console.log("ok");
        console.log(this.contractCode);
        upcontractDetail(this.contractCode)
          .then(response => {
            this.contract = response.data;
            console.log(this.contract);
          })
          .catch(error => {
            Utils.error(error);
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

