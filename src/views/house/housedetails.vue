<template>
  <div class="tab-container">
    <el-tabs style='margin-top:15px;' v-model="activeName" type="border-card">
      <el-tab-pane label="基础信息" name="basedetail">
        <keep-alive>
          <basedetail-pane v-if='activeName=="basedetail"'></basedetail-pane>
        </keep-alive>
      </el-tab-pane>

     <el-tab-pane label="房东信息" name="landlord">
        <keep-alive>
          <landlord-pane v-if='activeName=="landlord"'></landlord-pane>
        </keep-alive>
      </el-tab-pane>

      <el-tab-pane label="上游合同" name="upstream">
        <keep-alive>
          <upstream-pane v-if='activeName=="upstream"'></upstream-pane>
        </keep-alive>
      </el-tab-pane>

      <el-tab-pane label="下游合同" name="downvontract">
        <keep-alive>
          <downvontract-pane v-if='activeName=="downvontract"'></downvontract-pane>
        </keep-alive>
      </el-tab-pane>

      <el-tab-pane label="日志" name="houselogger">
        <keep-alive>
          <houselogger-pane v-if='activeName=="houselogger"'></houselogger-pane>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import BasedetailPane from './basedetail';
  import LandlordPane from "./landlorddetail";
  import upstreamPane from "./upstreamList";
  import DownvontractPane from './downvontract';
  import HouseloggerPane from './houselogger';

  export default {
    name: 'housedetail',
    components: { BasedetailPane,LandlordPane,upstreamPane,DownvontractPane, HouseloggerPane },
    data() {
      return {
        houseCode: this.$route.query.houseCode,
        activeName: 'basedetail'
      };
    },
    methods: {

    }
  };
</script>

<style scoped>
  .tab-container{
    margin: 30px;
  }
