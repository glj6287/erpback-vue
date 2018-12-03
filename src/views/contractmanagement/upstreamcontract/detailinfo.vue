<template>
  <div class="tab-container">
    <h3 class="housing_title">合同编号：{{contractCode}} {{statusName}}</h3>
    <el-tabs style='margin-top:15px;' v-model="activeName" type="border-card">
      <el-tab-pane label="基本信息" name="baseInfo">
        <keep-alive>
          <base-pane v-if='activeName=="baseInfo"'></base-pane>
        </keep-alive>
      </el-tab-pane>

      <el-tab-pane label="房东信息" name="landlord">
        <keep-alive>
          <landlord-pane v-if='activeName=="landlord"'></landlord-pane>
        </keep-alive>
      </el-tab-pane>

      <el-tab-pane label="房屋交接单" name="handover">
        <keep-alive>
          <handover-pane v-if='activeName=="handover"'></handover-pane>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

import BasePane from "./basedetail";
import LandlordPane from "./landlorddetail";
import HandoverPane from "./handoverdetail";

import { upcontractDetail } from "@/api/upContract";
import Utils from "@/utils/common";

export default {
  name: "contractInfo",
  components: { BasePane, LandlordPane, HandoverPane },
  data() {
    return {
      activeName: "baseInfo",
      contractCode: this.$route.query.contractCode,
      statusName: this.$route.query.statusName,
    };
  },
  created() {
    // this.getDetail();
  },
  methods: {
    getDetail() {
      console.log("ok")
      console.log(this.contractCode)
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
        //background-color: #ccc;
        line-height: 50px;
        text-indent: 10px;
    }
    .tab-container{
      margin: 30px;
    }
</style>

