<template>
 <div class="app-container">
   <span v-if="evaluateInfo.houseCheck != null">
            <h3 class="housing_title">验房结果</h3>
            <div class="main">
             <el-row class="housing_detail">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>验房单:</span>
                    </div>
                </el-col>
                <el-col :span="18">
                    <div class="grid-content bg-purple-light">
                      <div v-for="item in evaluateInfo.houseCheckFileList" :key="item.attcCode">
                        <img v-bind:src="item.attcUrlBig" v-bind:alt="item.attcName" class="housing_detail_pic" @click="showImageClick(item.attcUrl)" />
                      </div>
                    </div>
                </el-col>
              </el-row>
              <el-row class="housing_detail">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>施工队:</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-light">
                      <span>{{evaluateInfo.houseCheck.constructionTeam}}</span>
                    </div>
                </el-col>
              </el-row>
              <el-row class="housing_detail">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>预计工期:</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-light">
                      <span>{{evaluateInfo.houseCheck.expectedDay}}天</span>
                    </div>
                </el-col>
              </el-row>
              <el-row class="housing_detail">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>硬装预算:</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-light">
                        <span>{{evaluateInfo.houseCheck.hardOutfitBudget}}元</span>
                    </div>
                </el-col>
              </el-row>
              <el-row class="housing_detail">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>软装预算:</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-light">
                      <span>{{evaluateInfo.houseCheck.softOutfitBudget}}元</span>
                    </div>
                </el-col>
              </el-row>
            </div>
   </span>
            <h3 class="housing_title">拿房测算表</h3>
            <div class="main">
             <el-row class="housing_detail">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>会员费:</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-light">
                      <span>{{evaluateInfo.houseCalTable.vipFee}}元</span>
                    </div>
                </el-col>
              </el-row>
              <el-row class="housing_detail">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>租期:</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-light">
                      <span>{{evaluateInfo.houseCalTable.leaseDeadline}}个月</span>
                    </div>
                </el-col>
              </el-row>
              <el-row class="housing_detail">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>预估出房价:</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-light">
                      <span>{{evaluateInfo.houseCalTable.estimatePrice}}元/月</span>
                    </div>
                </el-col>
              </el-row>
              <el-row class="housing_detail">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>月租金成本:</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-light">
                      <span>{{evaluateInfo.houseCalTable.monthRentCost}}元/月</span>
                    </div>
                </el-col>
              </el-row>
              <el-row class="housing_detail">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>装修费用:</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-light">
                      <span>{{evaluateInfo.houseCalTable.outfitBudget}}元</span>
                    </div>
                </el-col>
              </el-row>
               <el-row class="housing_detail">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>佣金:</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-light">
                      <span>{{evaluateInfo.houseCalTable.brokerage}}元</span>
                    </div>
                </el-col>
              </el-row>
               <el-row class="housing_detail">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>合计月成本:</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-light">
                      <span>{{evaluateInfo.houseCalTable.monthRentCostSum}}元/月</span>
                    </div>
                </el-col>
              </el-row>
               <el-row class="housing_detail">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>合同期总租差:</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-light">
                      <span>{{evaluateInfo.houseCalTable.contractTermSubtract}}元</span>
                    </div>
                </el-col>
              </el-row>
               <el-row class="housing_detail">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>月毛利:</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-light">
                      <span>{{evaluateInfo.houseCalTable.monthGrossMargin}}元</span>
                    </div>
                </el-col>
              </el-row>
               <el-row class="housing_detail">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>毛利率:</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-light">
                      <span>{{evaluateInfo.houseCalTable.grossMarginRate}}%</span>
                    </div>
                </el-col>
              </el-row>
               <el-row class="housing_detail">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>投资回收期:</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-light">
                      <span>{{evaluateInfo.houseCalTable.payBackPeriod}}个月</span>
                    </div>
                </el-col>
              </el-row>
               <el-row class="housing_detail">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>投资回收期占合同期比:</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-light">
                      <span>{{evaluateInfo.houseCalTable.payBackPeriodRate}}%</span>
                    </div>
                </el-col>
              </el-row>
            </div>

                 <!-- 图片预览 -->
       <div class="images" v-viewer="{navbar:false,toolbar: true}"   v-show="false">
         <img  :src=imageSrc >
       </div> 
 </div>
</template>

<script>
import { viewEvaluateInfo } from "@/api/house";

export default {
  name: "assess",
  data() {
    return {
      imageSrc: "", //图片预览,
      applyCode: this.$route.query.applyCode,
      evaluateInfo: {
        houseCalTable: "",
        houseCheck: "",
        houseCheckFileList: []
      }
    };
  },
  created() {
    this.getEvaluateInfo();
  },
  methods: {
    getEvaluateInfo() {
      viewEvaluateInfo(this.applyCode).then(response => {
        console.log(response.data.Item);
        this.evaluateInfo = response.data;
      });
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
.housing_title {
  height: 50px;
  background-color: #ccc;
  line-height: 50px;
  text-indent: 10px;
}
.main {
  padding-left: 20px;
  padding-top: 10px;
}
.housing_detail {
  margin-bottom: 30px;
}
.housing_detail_pic {
  display: inline-block;
  float: left;
  width: 350px;
  height: 200px;
  margin: 2px;
}
</style>

