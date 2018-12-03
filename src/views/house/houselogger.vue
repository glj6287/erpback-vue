<template>
  <div class="app-container">
    <!--<h3 class="housing_title">基本信息</h3>-->
    <div class="main">
      <!--<el-table :data="tableData" border style="width: 100%">-->
        <!--<el-table-column prop="code" label="变更时间" style="width:20%"></el-table-column>-->
        <!--<el-table-column prop="time" label="变更内容" style="width:20%"></el-table-column>-->
        <!--<el-table-column prop="name" label="变更前" style="width:15%"></el-table-column>-->
        <!--<el-table-column prop="date" label="变更后" style="width:20%"></el-table-column>-->
        <!--<el-table-column prop="money" label="备注" style="width:10%"></el-table-column>-->
        <!--<el-table-column prop="status" label="变更人" style="width:10%"></el-table-column>-->
      <!--</el-table>-->

      <el-table :data="tableData" v-loading="getDataLoading" border stripe fit  style="width: 100%">

        <el-table-column align="center" label="变更时间" width="200px">
          <template slot-scope="scope" >
            <span>{{ scope.row.createTime | dateFilter}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="变更内容" >
          <template slot-scope="scope">
            <span>{{scope.row.contentChanged}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="变更前" >
          <template slot-scope="scope">
            <span v-if="scope.row.typeChanged==='1704' && !$store.getters.buttons.includes('btnFixedPrice')">***</span>
            <span v-else>{{scope.row.beforeChanged}}</span>
            <span v-if="(scope.row.typeChanged==='1702'|| scope.row.typeChanged==='1704') && scope.row.beforeChanged !== ''">元/月</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="变更后" >
          <template slot-scope="scope">
            <span v-if="scope.row.typeChanged==='1704' && !$store.getters.buttons.includes('btnFixedPrice')">***</span>
            <span v-else>{{scope.row.afterChanged}}</span>
            <span v-if="scope.row.typeChanged==='1702' || scope.row.typeChanged==='1704'">元/月</span>
          </template>
        </el-table-column>

        <el-table-column label="备注" >
          <template slot-scope="scope">
            <span>{{scope.row.remark}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="变更人" >
          <template slot-scope="scope">
            <span>{{scope.row.creatorName}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script>
  import { downChangeLog } from "@/api/house";
  import Utils from "@/utils/common";
  export default {
    data() {
      return {
        getDataLoading: false,
        tableData: [],
        houseCode: this.$route.query.houseCode
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
        downChangeLog(this.houseCode).then(response => {
          this.tableData = response.data;
          console.log(this.tableData);
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

