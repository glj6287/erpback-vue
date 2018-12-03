<template>
 <div class="app-container" v-loading="getDataLoading" element-loading-text="请给我点时间！">
    <h3 class="housing_title">房源信息</h3>
    <div class="main">
      <el-row class="housing_detail">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span>房源编号:</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <span>{{contract.houseInfoVo.houseCode}}</span>
            <span style="color: #11b95c;">({{contract.houseInfoVo.statusText}})</span>
          </div>
        </el-col>
      </el-row>
     <el-row class="housing_detail">
        <el-col :span="4">
            <div class="grid-content bg-purple">
                <span>小区名称:</span>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple-light">
                 <span>{{contract.houseInfoVo.neighborhoodName}}</span>
            </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
            <div class="grid-content bg-purple">
                <span>门牌号:</span>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple-light">
                <span>{{contract.houseInfoVo.houseNoText}}</span>
                <span v-if="contract.houseInfoVo.isDeleted === true" style="color: #c03639;">(此房源标识为已删除)</span>
            </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
            <div class="grid-content bg-purple">
                <span>地址:</span>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple-light">
                <span>{{contract.houseInfoVo.address}}</span>
            </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
            <div class="grid-content bg-purple">
                <span>房型:</span>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple-light">
                <span>{{contract.houseInfoVo.layoutText}}</span>
            </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
            <div class="grid-content bg-purple">
                <span>面积:</span>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple-light">
                <span>{{contract.houseInfoVo.houseArea}}㎡</span>
            </div>
        </el-col>
      </el-row>
       <el-row class="housing_detail">
        <el-col :span="4">
            <div class="grid-content bg-purple">
                <span>楼层:</span>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple-light">
                <span>{{contract.houseInfoVo.curFloor}}/{{contract.houseInfoVo.totalFloor}}层</span>
            </div>
        </el-col>
      </el-row>
       <el-row class="housing_detail">
        <el-col :span="4">
            <div class="grid-content bg-purple">
                <span>装修等级:</span>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple-light">
                <span>{{contract.houseInfoVo.repairLevelText}}</span>
            </div>
        </el-col>
      </el-row>
       <el-row class="housing_detail">
        <el-col :span="4">
            <div class="grid-content bg-purple">
                <span>房产证编号:</span>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple-light">
                <span>{{contract.houseInfoVo.houseCardNo}}</span>
            </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
            <div class="grid-content bg-purple">
                <span>房产证照片:</span>
            </div>
        </el-col>
        <el-col :span="10">
            <div class="grid-content bg-purple-light">
                <span><img v-for="item in contract.FCZList" :src="item.attcUrlSmall" :key="item.attcCode"  @click="showImageClick(item.attcUrl)" /></span>
            </div>
        </el-col>
      </el-row>
    </div>

   <h3 class="housing_title">租约信息</h3>
   <div class="main">
     <el-row class="housing_detail">
       <el-col :span="4">
         <div class="grid-content bg-purple">
           <span>合同类型:</span>
         </div>
       </el-col>
       <el-col :span="6">
         <div class="grid-content bg-purple-light">
           <span>{{contract.leaseVo.contractTypeText}}</span>
         </div>
       </el-col>
     </el-row>
     <el-row class="housing_detail">
       <el-col :span="4">
         <div class="grid-content bg-purple">
           <span>签约公司:</span>
         </div>
       </el-col>
       <el-col :span="6">
         <div class="grid-content bg-purple-light">
           <span>{{contract.leaseVo.signCompanyText}}</span>
         </div>
       </el-col>
     </el-row>
     <el-row class="housing_detail">
       <el-col :span="4">
         <div class="grid-content bg-purple">
           <span>业务模式:</span>
         </div>
       </el-col>
       <el-col :span="6">
         <div class="grid-content bg-purple-light">
           <span>{{contract.leaseVo.businessModeText}}</span>
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
           <span>{{contract.leaseVo.vipFee}}</span>
         </div>
       </el-col>
     </el-row>
     <el-row class="housing_detail">
       <el-col :span="4">
         <div class="grid-content bg-purple">
           <span>租期:</span>
         </div>
       </el-col>
       <el-col :span="6">
         <div class="grid-content bg-purple-light">
           <span>{{contract.leaseDeadlineStr}}</span>
         </div>
       </el-col>
     </el-row>
     <el-row class="housing_detail">
       <el-col :span="4">
         <div class="grid-content bg-purple">
           <span>延长期:</span>
         </div>
       </el-col>
       <el-col :span="6">
         <div class="grid-content bg-purple-light">
           <span>{{contract.extendedPeriodStr}}</span>
         </div>
       </el-col>
     </el-row>
     <el-row class="housing_detail">
       <el-col :span="4">
         <div class="grid-content bg-purple">
           <span>免租期:</span>
         </div>
       </el-col>
       <el-col :span="6">
         <div class="grid-content bg-purple-light">
           <span>{{contract.rentFreePeriodStr}}</span>
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
           <span>{{contract.leaseVo.paymentTypeText}}</span>
         </div>
       </el-col>
     </el-row>
     <el-row class="housing_detail">
       <el-col :span="4">
         <div class="grid-content bg-purple">
           <span>租金:</span>
         </div>
       </el-col>
       <el-col :span="10">
         <div class="grid-content bg-purple-light">
           <span v-if="contract.leaseVo.rentType=='5001'">{{contract.leaseVo.rentMoney}}</span>
           <span v-if="contract.leaseVo.rentType=='5002'">
              <span v-for="item in contract.leaseRentList">
              {{ item.rentStartedTimeText }}-{{ item.rentEndedTimeText }}：&nbsp;&nbsp;{{ item.monthMoney }}元/月<br>
              </span>
           </span>
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
           <span>{{contract.leaseVo.cashPledgeMoney}}元</span>
         </div>
       </el-col>
     </el-row>
     <el-row class="housing_detail">
       <el-col :span="4">
         <div class="grid-content bg-purple">
           <span>房东是否包发票:</span>
         </div>
       </el-col>
       <el-col :span="6">
         <div class="grid-content bg-purple-light">
           <span v-if='contract.leaseVo.isLandlordBill'>是</span>
           <span v-if='!contract.leaseVo.isLandlordBill'>否</span>
         </div>
       </el-col>
     </el-row>
     <el-row class="housing_detail">
       <el-col :span="4">
         <div class="grid-content bg-purple">
           <span>房东是否包物业:</span>
         </div>
       </el-col>
       <el-col :span="6">
         <div class="grid-content bg-purple-light">
           <span v-if='contract.leaseVo.isPropertyFee'>是</span>
           <span v-if='!contract.leaseVo.isPropertyFee'>否</span>
         </div>
       </el-col>
     </el-row>
     <el-row class="housing_detail">
       <el-col :span="4">
         <div class="grid-content bg-purple">
           <span>源涞物业代缴:</span>
         </div>
       </el-col>
       <el-col :span="6">
         <div class="grid-content bg-purple-light">
           <span v-if='contract.leaseVo.isYolandPay'>是</span>
           <span v-if='!contract.leaseVo.isYolandPay'>否</span>
         </div>
       </el-col>
     </el-row>
     <el-row class="housing_detail">
       <el-col :span="4">
         <div class="grid-content bg-purple">
           <span>违约金:</span>
         </div>
       </el-col>
       <el-col :span="6">
         <div class="grid-content bg-purple-light">
           <span>{{contract.leaseVo.penalSum}}</span>
         </div>
       </el-col>
     </el-row>
     <el-row class="housing_detail">
       <el-col :span="4">
         <div class="grid-content bg-purple">
           <span>实际退租日期:</span>
         </div>
       </el-col>
       <el-col :span="6">
         <div class="grid-content bg-purple-light">
           <span>{{contract.contractUpstream.throwLeaseTime | throwLeaseTimeFilter}}</span>
         </div>
       </el-col>
     </el-row>
     <el-row class="housing_detail">
       <el-col :span="4">
         <div class="grid-content bg-purple">
           <span>退租原因:</span>
         </div>
       </el-col>
       <el-col :span="6">
         <div class="grid-content bg-purple-light">
           <span>{{contract.contractUpstream.remark}}</span>
         </div>
       </el-col>
     </el-row>
     <el-row class="housing_detail">
       <el-col :span="4">
         <div class="grid-content bg-purple">
           <span>签约人:</span>
         </div>
       </el-col>
       <el-col :span="6">
         <div class="grid-content bg-purple-light">
           <span>{{contract.contractUpstream.createrName}}</span>
         </div>
       </el-col>
     </el-row>
   </div>


   <h3 class="housing_title">附件</h3>
   <div class="main">
     <el-row class="housing_detail">
       <el-col :span="4">
         <div class="grid-content bg-purple">
           <span>纸质合同照片:</span>
         </div>
       </el-col>
       <el-col :span="10">
         <div class="grid-content bg-purple-light">
           <span>
             <img v-for="item in contract.ZZHTList" :src="item.attcUrlSmall" :key="item.attcCode"  @click="showImageClick(item.attcUrl)" />
           </span>
         </div>
       </el-col>
     </el-row>
     <el-row class="housing_detail">
       <el-col :span="4">
         <div class="grid-content bg-purple">
           <span>现场签约照片:</span>
         </div>
       </el-col>
       <el-col :span="10">
         <div class="grid-content bg-purple-light">
           <span><img v-for="item in contract.XCQYList" :src="item.attcUrlSmall" :key="item.attcCode"  @click="showImageClick(item.attcUrl)" /></span>
         </div>
       </el-col>
     </el-row>
   </div>
   <!-- 图片预览 -->
       <div class="images" v-viewer="{navbar:false,toolbar:true}"   v-show="false">
         <img  :src=imageSrc >
       </div>
 </div>
</template>

<script>
import { upcontractDetail } from "@/api/upContract";
import Utils from "@/utils/common";
import Viewer from "v-viewer";
import 'viewerjs/dist/viewer.css'
import Vue from "vue";
Vue.use(Viewer);

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
  filters: {
    throwLeaseTimeFilter(date) {
      if (date) {
        return date.substring(0, date.indexOf(" "));
      }
    }
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
    },
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

