<template>
        <div class="app-container">
              <el-table :data="flowLogList" border stripe fit style="width:980px;">
                <el-table-column align="center" label="节点">
                  <template slot-scope="scope" align="center">
                    <span>{{scope.row.flowApproveValue}}</span>
                  </template>
                </el-table-column>

                <el-table-column label="完成人" align="center">
                  <template slot-scope="scope">
                    <span>{{scope.row.creatorName}}</span>
                  </template>
                </el-table-column>

                <el-table-column label="完成时间" align="center">
                  <template slot-scope="scope">
                    <span>{{scope.row.createTime == null ? scope.row.waitTime : scope.row.createTime}}</span>
                  </template>
                </el-table-column>

                <el-table-column label="备注" align="center">
                  <template slot-scope="scope">
                    <span>{{scope.row.remark}}</span>
                  </template>
                </el-table-column>
              </el-table>
        </div>
</template>

<script>
  import { viewFlowLog } from "@/api/house";
  export default {
    name: "assess",
    data() {
      return {
        applyCode: this.$route.query.applyCode,
        flowLogList: []
      };
    },
    created() {
      this.getFlowLog();
    },
    methods: {
      getFlowLog() {
        viewFlowLog(this.applyCode).then(response => {
          console.log(response.data.Item);
          this.flowLogList = response.data;
        });
      }
    }
  };
</script>

<style>
</style>
