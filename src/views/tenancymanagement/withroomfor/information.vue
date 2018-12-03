<template>
    <div class="app-container">
            <h3 class="housing_title">房源信息</h3>
            <div class="main">
             <el-row class="housing_detail">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>小区名称:</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-light">
                        <span>{{houseInfo.houseInfoVo.neighborhoodName}}</span>
                    </div>
                </el-col>
              </el-row>
              <el-row class="housing_detail">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>门牌号:</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-light">
                        <span>{{houseInfo.houseInfoVo.houseNoText}}</span>
                    </div>
                </el-col>
              </el-row>
              <el-row class="housing_detail">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>地址:</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-light">
                      <span>{{houseInfo.houseInfoVo.address}}</span>
                    </div>
                </el-col>
              </el-row>
              <el-row class="housing_detail">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>房型:</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-light">
                      <span>{{houseInfo.houseInfoVo.layoutText}}</span>
                    </div>
                </el-col>
              </el-row>
              <el-row class="housing_detail">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>面积:</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-light">
                      <span>{{houseInfo.houseInfoVo.houseArea}}㎡</span>
                    </div>
                </el-col>
              </el-row>
              <el-row class="housing_detail">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>楼层:</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-light">
                      <span>{{houseInfo.houseInfoVo.curFloor}}/{{houseInfo.houseInfoVo.totalFloor}}层</span>
                    </div>
                </el-col>
              </el-row>
              <el-row class="housing_detail">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>装修等级:</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-light">
                      <span>{{houseInfo.houseInfoVo.repairLevelText}}</span>
                    </div>
                </el-col>
              </el-row>
              <el-row class="housing_detail">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>房源照片:</span>
                    </div>
                </el-col>
                <el-col :span="18">
                    <div class="grid-content bg-purple-light">
                      <div v-for="item in houseInfo.houseInfoVo.houseFileList" :key="item.attcCode">
                        <img v-bind:src="item.attcUrlBig" v-bind:alt="item.attcName" class="housing_detail_pic" @click="showImageClick(item.attcUrl)" />
                      </div>
                    </div>

                  <!--<div class="grid-content bg-purple-light">
                    <div v-for="item in 3" :key="item.attcCode">
                      <img src="http://172.21.0.4:8888/group1/M00/00/39/rBUABVtoHECAarTsAAB2sqNykFs413.jpg" v-bind:alt="item.attcName" class="housing_detail_pic"/>
                    </div>
                  </div>-->
                </el-col>
              </el-row>
            </div>
            <h3 class="housing_title">租约信息</h3>
            <div class="main">
             <el-row class="housing_detail">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>合同类型:</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-light">
                      <span>{{houseInfo.houseLeaseVo.contractTypeText}}</span>
                    </div>
                </el-col>
              </el-row>
              <el-row class="housing_detail">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>签约公司:</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-light">
                      <span>{{houseInfo.houseLeaseVo.signCompanyText}}</span>
                    </div>
                </el-col>
              </el-row>
              <el-row class="housing_detail">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>业务模式:</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-light">
                      <span>{{houseInfo.houseLeaseVo.businessModeText}}</span>
                    </div>
                </el-col>
              </el-row>
              <el-row class="housing_detail">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>会员费:</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-light">
                      <span>{{houseInfo.houseLeaseVo.vipFee}}元</span>
                    </div>
                </el-col>
              </el-row>
              <el-row class="housing_detail">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>租约期限:</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-light">
                      <span>{{houseInfo.houseLeaseVo.leaseDeadline}}个月</span>
                    </div>
                </el-col>
              </el-row>
              <el-row class="housing_detail">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>延长期:</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-light">
                      <span>{{houseInfo.houseLeaseVo.extendedPeriod}}个月</span>
                    </div>
                </el-col>
              </el-row>
              <el-row class="housing_detail">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>免租期:</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-light">
                      <span>{{houseInfo.houseLeaseVo.rentFreePeriodMonth}}个月{{houseInfo.houseLeaseVo.rentFreePeriodDay}}天</span>
                    </div>
                </el-col>
              </el-row>
              <el-row class="housing_detail">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>付款方式:</span>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content bg-purple-light">
                      <span>{{houseInfo.houseLeaseVo.paymentTypeText}}</span>
                    </div>
                </el-col>
              </el-row>
              <el-row class="housing_detail">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>租金:</span>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content bg-purple-light">
                      <span v-if="houseInfo.houseLeaseVo.rentType=='5001'">{{houseInfo.houseLeaseVo.rentMoney}}元/月</span>
                      <span v-if="houseInfo.houseLeaseVo.rentType=='5002'">
                      <span v-for="item in houseInfo.houseLeaseVo.houseLeaseRentVo">
                        {{ item.rentName }}：&nbsp;&nbsp;{{ item.monthMoney }}元/月<br>
                        </span>
                      </span>
                    </div>
                </el-col>
              </el-row>
              <el-row class="housing_detail">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>押金:</span>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content bg-purple-light">
                      <span>{{houseInfo.houseLeaseVo.cashPledgeMoney}}元</span>
                    </div>
                </el-col>
              </el-row>
              <el-row class="housing_detail">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>房东是否包发票:</span>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content bg-purple-light">
                      <span>{{houseInfo.houseLeaseVo.isLandlordBill == true ? "是":"否"}}</span>
                    </div>
                </el-col>
              </el-row>
              <el-row class="housing_detail">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>业务是否包物业:</span>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content bg-purple-light">
                      <span>{{houseInfo.houseLeaseVo.isPropertyFee == true ? "是":"否"}}</span>
                    </div>
                </el-col>
              </el-row>
              <el-row class="housing_detail">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>源涞物业代缴:</span>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content bg-purple-light">
                      <span>{{houseInfo.houseLeaseVo.isYolandPay == true ? "是":"否"}}</span>
                    </div>
                </el-col>
              </el-row>
              <el-row class="housing_detail">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>违约金:</span>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content bg-purple-light">
                      <span>{{houseInfo.houseLeaseVo.penalSum}}元</span>
                    </div>
                </el-col>
              </el-row>
            </div>

            <h3 class="housing_title">拿房渠道</h3>
            <div class="main">
             <el-row class="housing_detail">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>拿房渠道:</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-light">
                      <span>{{houseInfo.houseLeaseVo.houseChannelText}}</span>
                    </div>
                </el-col>
              </el-row>
              <el-row class="housing_detail" v-if="houseInfo.houseAgentInfo != null">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>中介名称:</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-light">
                      <span>{{houseInfo.houseAgentInfo.agentName}}</span>
                    </div>
                </el-col>
              </el-row>
              <el-row class="housing_detail" v-if="houseInfo.houseAgentInfo != null">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>联系人:</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-light">
                      <span>{{houseInfo.houseAgentInfo.contactName}}</span>
                    </div>
                </el-col>
              </el-row>
              <el-row class="housing_detail" v-if="houseInfo.houseAgentInfo != null">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>联系人电话:</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-light">
                      <span>{{houseInfo.houseAgentInfo.contactMobile}}</span>
                    </div>
                </el-col>
              </el-row>
              <el-row class="housing_detail" v-if="houseInfo.houseAgentInfo != null">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>佣金:</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-light">
                      <span>{{houseInfo.houseAgentInfo.brokerage}}元/月</span>
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
import { viewHouseBaseInfo } from "@/api/house";
import Viewer from "v-viewer";
import "viewerjs/dist/viewer.css";
import Vue from "vue";
export default {
  name: "information",
  data() {
    return {
      imageSrc: "", //图片预览,
      applyCode: this.$route.query.applyCode,
      dialogVisible: false,
      houseInfo: {
        houseInfoVo: "",
        houseLeaseVo: "",
        houseAgentInfo: ""
      }
    };
  },
  created() {
    this.getHouseBaseInfo();
  },
  methods: {
    getHouseBaseInfo() {
      viewHouseBaseInfo(this.applyCode).then(response => {
        console.log(response.data.Item);
        this.houseInfo = response.data;
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
    },
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

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
