<template>
 <div class="app-container" v-loading="getDataLoading" element-loading-text="请给我点时间！">
    <h3 class="housing_title">基本信息</h3>
    <div class="main">
     <el-row class="housing_detail">
        <el-col :span="4">
            <div class="grid-content bg-purple">
                <span>房源编号:</span>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple-light">
                 <span>{{houseCode}}</span>
                 <span style="color: #11b95c;">({{houseDetail.houseInfoVo.statusText}})</span>
            </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
            <div class="grid-content bg-purple">
                <span>所属公司:</span>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple-light">
                <span>{{houseDetail.houseLeaseVo.signCompanyText}}</span>
            </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
            <div class="grid-content bg-purple">
                <span>社区名称:</span>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple-light">
                <span>{{houseDetail.houseInfoVo.communityName}}</span>
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
                <span>{{houseDetail.houseInfoVo.neighborhoodName}}</span>
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
                <span>{{houseDetail.houseInfoVo.houseNoText}}</span>
                <span v-if="houseDetail.houseInfoVo.isDeleted === true" style="color: #c03639;">(此房源标识为已删除)</span>
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
                <span>{{houseDetail.houseInfoVo.address}}</span>
            </div>
        </el-col>
      </el-row>
       <el-row class="housing_detail">
        <el-col :span="4">
            <div class="grid-content bg-purple">
                <span>户型:</span>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple-light">
                <span>{{houseDetail.houseInfoVo.layoutText}}</span>
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
                <span>{{houseDetail.houseInfoVo.houseArea}}㎡</span>
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
                <span>{{houseDetail.houseInfoVo.curFloor}}/{{houseDetail.houseInfoVo.totalFloor}}层</span>
            </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
            <div class="grid-content bg-purple">
                <span>空置期:</span>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple-light">
                <span>{{houseDetail.houseInfoVo.vacancyPeriod}} 天</span>
            </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
            <div class="grid-content bg-purple">
                <span>上游合同:</span>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple-light">
                <span v-if="houseDetail.houseInfoVo !== null" v-for="item in houseDetail.houseInfoVo.contractUpstreamList" :key="item.id">
                  {{item.contractCode}},
                </span>
            </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
            <div class="grid-content bg-purple">
                <span>上游合同租期:</span>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple-light">
              <span v-if="houseInfo != null">{{houseInfo.leaseDeadlineDateStart}}-{{houseInfo.leaseDeadlineDateEnd}}</span>
            </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
            <div class="grid-content bg-purple">
                <span>上游合同延长期:</span>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple-light">
              <span v-if="houseInfo != null">{{houseInfo.extendedPeriodDateStart}}-{{houseInfo.extendedPeriodDateEnd}}</span>
            </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail" v-if="$store.getters.buttons.includes('btnTakeHousePrice')" >
        <el-col :span="4">
            <div class="grid-content bg-purple">
                <span>拿房价:</span>
            </div>
        </el-col>
        <el-col :span="10" v-if="houseInfo != null">
          <div v-if="houseInfo.rentType === '5001'" class="grid-content bg-purple-light">
            <span>{{houseInfo.rentMoney}}元/月</span>
          </div>
          <div v-if="houseInfo.rentType === '5002'" class="grid-content bg-purple-light">
            <ul style="padding: 0px;">
              <li v-for="rentVo in houseInfo.houseLeaseRentList" style="list-style: none">
                <span>{{ rentVo.rentStartedTimeText }} - {{ rentVo.rentEndedTimeText }} : {{ rentVo.monthMoney }}元/月</span>
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail" v-if="$store.getters.buttons.includes('btnFixedPrice')">
        <el-col :span="4">
            <div class="grid-content bg-purple">
                <span>底价:</span>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple-light">
                <span v-if="houseInfo != null">{{houseInfo.fixedPrice}}元/月</span>
            </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
            <div class="grid-content bg-purple">
                <span>售价:</span>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple-light">
                <span v-if="houseInfo != null">{{houseInfo.sellingPrice}}元/月</span>
            </div>
        </el-col>
      </el-row>
    </div>

   <h3 class="housing_title">付款方式</h3>
   <div class="main">

     <el-table border v-if="houseDetail.paymentTypeVoList !== null" :data="houseDetail.paymentTypeVoList" style="width: 60%">
       <el-table-column align="center" label="付款方式" >
         <template slot-scope="scope" >
           <span>{{ scope.row.key }}</span>
         </template>
       </el-table-column>

       <el-table-column align="center" label="月租金额">
         <template slot-scope="scope">
           <span>{{scope.row.value}} 元/月</span>
         </template>
       </el-table-column>
     </el-table>



     <!--<el-row class="housing_detail">-->
         <!--<el-col :span="1" v-if="houseDetail.paymentTypeVoList !== null" v-for="item in houseDetail.paymentTypeVoList" :key="item.key">-->
           <!--<div class="grid-content bg-purple-light">-->
             <!--<span>{{ item.key }}</span>-->
           <!--</div>-->
         <!--</el-col>-->
     <!--</el-row>-->
     <!--<el-row class="housing_detail">-->
         <!--<br/>-->
         <!--<el-col :span="1" v-if="houseDetail.paymentTypeVoList !== null" v-for="item in houseDetail.paymentTypeVoList" :key="item.key">-->
           <!--<div class="grid-content bg-purple-light">-->
             <!--<span>{{ item.value }}</span>-->
           <!--</div>-->
         <!--</el-col>-->
     <!--</el-row>-->
   </div>

   <h3 class="housing_title">房源图片</h3>
   <div class="main">
     <el-row class="housing_detail">
       <el-col :span="4">
         <div class="grid-content bg-purple">
           <span>客厅:</span>
         </div>
       </el-col>
       <el-col :span="20">
         <div class="grid-content bg-purple-light">
           <span v-for="item in houseDetail.houseLivingFileList" :key="item.attcCode"><img :src="item.attcUrlSmall" @click="showImageClick(item.attcUrl)" />&nbsp;</span>
         </div>
       </el-col>
     </el-row>
     <el-row class="housing_detail">
       <el-col :span="4">
         <div class="grid-content bg-purple">
           <span>卧室:</span>
         </div>
       </el-col>
       <el-col :span="20">
         <div class="grid-content bg-purple-light">
           <span v-for="item in houseDetail.houseBedRoomFileList" :key="item.attcCode"><img  :src="item.attcUrlSmall" @click="showImageClick(item.attcUrl)" />&nbsp;</span>
         </div>
       </el-col>
     </el-row>
     <el-row class="housing_detail">
       <el-col :span="4">
         <div class="grid-content bg-purple">
           <span>厨房:</span>
         </div>
       </el-col>
       <el-col :span="20">
         <div class="grid-content bg-purple-light">
           <span v-for="item in houseDetail.houseKitchenFileList" :key="item.attcCode" ><img  :src="item.attcUrlSmall" @click="showImageClick(item.attcUrl)" />&nbsp;</span>
         </div>
       </el-col>
     </el-row>
     <el-row class="housing_detail">
       <el-col :span="4">
         <div class="grid-content bg-purple">
           <span>餐厅:</span>
         </div>
       </el-col>
       <el-col :span="20">
         <div class="grid-content bg-purple-light">
           <span v-for="item in houseDetail.houseDiningFileList" :key="item.attcCode"><img :src="item.attcUrlSmall" @click="showImageClick(item.attcUrl)" />&nbsp;</span>
         </div>
       </el-col>
     </el-row>
     <el-row class="housing_detail">
       <el-col :span="4">
         <div class="grid-content bg-purple">
           <span>卫生间:</span>
         </div>
       </el-col>
       <el-col :span="20">
         <div class="grid-content bg-purple-light">
           <span v-for="item in houseDetail.houseToiletFileList" :key="item.attcCode"><img  :src="item.attcUrlSmall" @click="showImageClick(item.attcUrl)" />&nbsp;</span>
         </div>
       </el-col>
     </el-row>
     <el-row class="housing_detail">
       <el-col :span="4">
         <div class="grid-content bg-purple">
           <span>其他:</span>
         </div>
       </el-col>
       <el-col :span="20">
         <div class="grid-content bg-purple-light">
           <span v-for="item in houseDetail.houseOtherFileList" :key="item.attcCode"><img  :src="item.attcUrlSmall" @click="showImageClick(item.attcUrl)" />&nbsp;</span>
         </div>
       </el-col>
     </el-row>
     <el-row class="housing_detail">
       <el-col :span="4">
         <div class="grid-content bg-purple">
           <span>户型图:</span>
         </div>
       </el-col>
       <el-col :span="20">
         <div class="grid-content bg-purple-light">
           <span v-for="item in houseDetail.houseLayoutFileList" :key="item.attcCode"><img  :src="item.attcUrlSmall" @click="showImageClick(item.attcUrl)" />&nbsp;</span>
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
import { detailhouse, getHouseInfo4Rent } from "@/api/house";
import Utils from "@/utils/common";
import 'viewerjs/dist/viewer.css'
import Vue from "vue";
export default {
  data() {
    return {
      data: {
        type: Array,
        default: []
      },
      imageSrc: "", // 图片预览,
      getDataLoading: false,
      houseCode: this.$route.query.houseCode,
      newPaymentTypeList: [],
      houseDetail: {
        houseInfoVo: "",
        houseLeaseVo: "",
        paymentTypeVoList: [],
        houseLivingFileList: [],
        houseDiningFileList: [],
        houseKitchenFileList: [],
        houseBedRoomFileList: [],
        houseToiletFileList: [],
        houseLayoutFileList: [],
        houseOtherFileList: []
      },
      houseInfo: ""
    };
  },
  created() {
    this.getDetail();
    this.getHouseInfo();
  },
  methods: {
    getDetail() {
      detailhouse(this.houseCode)
        .then(response => {
          this.houseDetail = response.data;
          console.log(this.houseDetail);
        })
        .catch(error => {
          Utils.error(error);
        });
    },
    getHouseInfo() {
      getHouseInfo4Rent(this.houseCode)
        .then(response => {
          this.houseInfo = response.data;
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

