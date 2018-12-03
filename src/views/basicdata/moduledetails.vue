<template>
 <div class="app-container">
    <!--<el-container>-->
        <!--<el-header>-->
            <h3 class="housing_title">小区详情</h3>
        <!--</el-header>-->
        <!--<el-main class="housing">-->
            <div class="main" v-loading="getDataLoading" element-loading-text="请给我点时间！">
             <el-row class="housing_detail">
                <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <span>小区名称:</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-light">
                         <span>{{neigbod.name}}</span>
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
                        <span>{{neigbod.communityName}}</span>
                    </div>
                </el-col>
              </el-row>
              <el-row class="housing_detail">
                <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <span>小区地址:</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-light">
                        <span>{{neigbod.province}}{{neigbod.city}}{{neigbod.area}}{{neigbod.address}}</span>
                    </div>
                </el-col>
              </el-row>
              <el-row class="housing_detail">
                <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <span>建筑年代:</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-light">
                        <span>{{neigbod.architecturalAge}}</span>
                    </div>
                </el-col>
              </el-row>
              <el-row class="housing_detail">
                <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <span>物业名称:</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-light">
                        <span>{{neigbod.propertyName}}</span>
                    </div>
                </el-col>
              </el-row>
               <el-row class="housing_detail">
                <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <span>物业电话:</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-light">
                        <span>{{neigbod.propertyTelephone}}</span>
                    </div>
                </el-col>
              </el-row>
               <el-row class="housing_detail">
                <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <span>交通情况:</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-light">
                        <span>{{neigbod.trafficsituation}}</span>
                    </div>
                </el-col>
              </el-row>
               <el-row class="housing_detail">
                <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <span>周边配套:</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-light">
                        <span>{{neigbod.aroundsupporting}}</span>
                    </div>
                </el-col>
              </el-row>
            </div>
        <!--</el-main>-->
    <!--</el-container>-->
 </div>
</template>

<script>
import {
  getHusDetail
} from "@/api/littledistrict";
import Utils from "@/utils/common";
export default {
  data() {
    return {
      getDataLoading: false,
      neigbodCode:this.$route.query.neigbodCode,
      neigbod: {
        name: "",
        communityCode: "",
        communityName: "",
        address: "",
        architecturalAge: "",
        propertyName: "",
        propertyTelephone: "",
        trafficsituation: "",
        aroundsupporting: "",
        propertyCode: "",
        propertyId: "",
        neighborhoodId: "",
        neigbodCode: "",
        provinceCode: "",
        province: "",
        cityCode: "",
        city: "",
        areaCode: "",
        area: "",
        attcCodes: ""
      }
    };
  },
  created() {
    this.getHusDetail();
  },
  methods: {
    getHusDetail() {
      this.getDataLoading = true;
      console.log("ok")
      console.log(this.neigbodCode)
      getHusDetail(this.neigbodCode)
        .then(response => {
          console.log(this.neigbod)
          this.neigbod = response.data;
          console.log(this.neigbod)
          this.getDataLoading = false;
        })
        .catch(error => {
          Utils.error(error);
          this.getDataLoading = false;
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
        margin-bottom: 30px;
    }
    .housing_detail_pic{
        display: inline-block;
        width: 100px;
        height: 50px;
    }
</style>

