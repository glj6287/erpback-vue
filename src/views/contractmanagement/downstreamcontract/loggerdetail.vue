<template>
  <div class="app-container" >
    <!--<div class="main" >-->
      <el-table :data="houseFlowLogVo" v-loading="getDataLoading" border stripe fit  style="width: 100%">

        <el-table-column align="center" label="节点" >
          <template slot-scope="scope" >
            <span>{{scope.row.flowApproveValue}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="完成人" >
          <template slot-scope="scope">
            <span>{{scope.row.creater}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="完成时间" >
          <template slot-scope="scope">
            <span>{{scope.row.createTime | dateFilter}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="备注" >
          <template slot-scope="scope">
            <span>{{scope.row.remark}}</span>
          </template>
        </el-table-column>

      </el-table>
    <!--</div>-->

  </div>
</template>

<script>
  import { downcontractLogger } from "@/api/downContract";
  import Utils from "@/utils/common";
  export default {
    data() {
      return {
        getDataLoading: false,
        dsContractCode: this.$route.query.dsContractCode,
        houseFlowLogVo: []
      };
    },
    filters: {
      dateFilter(date) {
        if (date) {
          return date.replace(/-/g, ".");
        }
        return "";
      }
    },
    created() {
      this.getDetail();
    },
    methods: {
      getDetail() {
        downcontractLogger(this.dsContractCode).then(response => {
          console.log(response.data)
          this.houseFlowLogVo = response.data;
        }).catch(error => {
          Utils.error(error);
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

