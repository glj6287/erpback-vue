<template>
  <div class="app-container" v-loading="getDataLoading" element-loading-text="请给我点时间！">
    <h3 class="housing_title">委托人信息</h3>
    <div class="main" >
      <span v-for="item in contract.landlordWTRList">

        <el-row class="housing_detail">
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <span>委托人姓名:</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-light">
              <span>{{item.username}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="housing_detail">
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <span>手机号码:</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-light">
              <span>{{item.mobile}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="housing_detail">
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <span>证件类型:</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-light">
              <span>{{item.certTypeCodeText}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="housing_detail">
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <span>证件号码:</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-light">
              <span>{{item.certNo}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="housing_detail">
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <span>证件照片:</span>
            </div>
          </el-col>
          <el-col :span="10">
            <div class="grid-content bg-purple-light">
              <span v-if="item.sysFileVoZM != null"><img v-if="item.sysFileVoZM.attcUrl != null" :src="item.sysFileVoZM.attcUrlSmall"  :key="item.sysFileVoZM.attcCode" @click="showImageClick(item.sysFileVoZM.attcUrl)" /></span>
              <span v-if="item.sysFileVoFM != null"><img v-if="item.sysFileVoFM.attcUrl != null" :src="item.sysFileVoFM.attcUrlSmall"  :key="item.sysFileVoFM.attcCode" @click="showImageClick(item.sysFileVoFM.attcUrl)" /></span>
            </div>
          </el-col>
        </el-row>
        <el-row class="housing_detail">
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <span>授权委托书:</span>
            </div>
          </el-col>
          <el-col :span="10">
            <div class="grid-content bg-purple-light">
              <span v-if="contract.SQWTList != null"><img v-for="item2 in contract.SQWTList" :src="item2.attcUrlSmall" :key="item2.attcCode" @click="showImageClick(item2.attcUrl)" /></span>
            </div>
          </el-col>
        </el-row>
      </span>
    </div>

    <h3 class="housing_title">房东信息</h3>
    <div class="main">
     <span v-if="contract.landlordFDList != null" v-for="item in contract.landlordFDList">
      <el-row class="housing_detail">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span>房东姓名:</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <span>{{item.username}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span>手机号码:</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <span>{{item.mobile}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span>证件类型:</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <span>{{item.certTypeCodeText}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span>证件号码:</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <span>{{item.certNo}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span>证件照片:</span>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="grid-content bg-purple-light">
            <span><img v-if="item.sysFileVoZM != null" :src="item.sysFileVoZM.attcUrlSmall" :key="item.sysFileVoZM.attcCode" @click="showImageClick(item.sysFileVoZM.attcUrl)" /></span>
            <span><img v-if="item.sysFileVoFM != null" :src="item.sysFileVoFM.attcUrlSmall" :key="item.sysFileVoFM.attcCode" @click="showImageClick(item.sysFileVoFM.attcUrl)" /></span>
          </div>
        </el-col>
      </el-row>
     </span>
    </div>


    <h3 class="housing_title">收款信息</h3>
    <div class="main">
      <el-row class="housing_detail">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span>收款人姓名:</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
           <span>{{contract.payee.payeeName}}</span>
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
            <span>{{contract.payee.bankCard}}</span>
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
            <span>{{contract.payee.bankName}}</span>
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
            <span>{{contract.payee.bankSubbranchName}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span>银行卡正面照片:</span>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="grid-content bg-purple-light">
            <span><img v-if="contract.YHKList != null" v-for="item in contract.YHKList" :src="item.attcUrlSmall" :key="item.attcCode" @click="showImageClick(item.attcUrl)" /></span>
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
import { upcontractDetail } from "@/api/upContract";
import Utils from "@/utils/common";
import Viewer from "v-viewer";
import "viewerjs/dist/viewer.css";
import Vue from "vue";
export default {
  data() {
    return {
      imageSrc: "", //图片预览,
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
  margin-bottom: 20px;
}
.housing_detail_pic {
  display: inline-block;
  width: 100px;
  height: 50px;
}
</style>

