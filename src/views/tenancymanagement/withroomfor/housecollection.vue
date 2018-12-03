<template>
  <div class="order-entering-container">
      <div class="odd">
          <h3><span style="margin-right:10px">申请单号:</span><span style="margin-right:20px">{{this.applyCode}} {{this.applyStatusText}}</span></h3>
      </div>
       <el-tabs v-model="activeName" type="border-card">
          <el-tab-pane label="基本信息" name="information">
              <information-pane v-if="activeName =='information'" @switchTab="switchTab"></information-pane>
          </el-tab-pane>
          <el-tab-pane label="拿房评估" name="assess">
              <assess-pane v-if="activeName =='assess'" @switchTab="switchTab"></assess-pane>
          </el-tab-pane>
          <el-tab-pane label="审批流程" name="process">
              <process-pane v-if="activeName == 'process'" @switchTab="switchTab"></process-pane>
          </el-tab-pane>
       </el-tabs>
  </div>
</template>

<script>
import AssessPane from "./assess";
import InformationPane from "./information";
import ProcessPane from "./process";
export default {
  name: "housecollection",
  components: {
    AssessPane,
    InformationPane,
    ProcessPane
  },
  data() {
    return {
      applyCode: this.$route.query.applyCode,
      applyStatusText: this.$route.query.applyStatusText,
      activeName: 'information'
    };
  },
  methods: {
    switchTab(tabName) {
      this.activeName = tabName;
    }
  }
};
</script>

<style>
</style>
