<template>
  <div class="tab-container">
    <h3 class="housing_title">合同编号：{{dsContractCode}} {{statusName}}</h3>
    <el-tabs style='margin-top:15px;' v-model="activeName" type="border-card">
      <el-tab-pane label="基本信息" name="baseInfo">
        <keep-alive>
          <base-pane v-if='activeName=="baseInfo"'></base-pane>
        </keep-alive>
      </el-tab-pane>

      <el-tab-pane label="账单信息" name="billInfo">
        <keep-alive>
          <bill-pane v-if='activeName=="billInfo"'></bill-pane>
        </keep-alive>
      </el-tab-pane>

      <el-tab-pane label="日志" name="loggerInfo">
        <keep-alive>
          <logger-pane v-if='activeName=="loggerInfo"'></logger-pane>
        </keep-alive>
      </el-tab-pane>

    </el-tabs>

  </div>
</template>

<script>
import { getDsContract } from "@/api/downContract";
import BasePane from "./basedetail";
import BillPane from "./bill";
import LoggerPane from "./loggerdetail";

export default {
  name: "downcontractInfo",
  components: { BasePane, LoggerPane , BillPane},
  data() {
    return {
      activeName: "baseInfo",
      dsContractCode: this.$route.query.dsContractCode,
      statusName: ""
    };
  },
  created() {
    this.getDsDetail();
  },
  methods: {
    getDsDetail() {
      getDsContract(this.$route.query.dsContractCode).then(response => {
        // console.log(response.data)
        this.statusName = response.data.recordStatusValue;
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
    .tab-container{
      margin: 30px;
    }
    .main{
      padding-left: 20px;
      padding-top: 10px;
    }
</style>

