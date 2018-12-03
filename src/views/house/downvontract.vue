<template>
  <div class="app-container">
    <!--<h3 class="housing_title">下游合同</h3>-->
    <div class="main">
      <!--<el-table :data="tableData" border style="width: 100%">-->
        <!--<el-table-column prop="dsContractCode" label="合同编号" style="width:20%"></el-table-column>-->
        <!--<el-table-column prop="signTime" label="签约时间" style="width:20%"></el-table-column>-->
        <!--<el-table-column prop="name" label="租客名称" style="width:15%"></el-table-column>-->
        <!--<el-table-column prop="date" label="租期" style="width:20%"></el-table-column>-->
        <!--<el-table-column prop="money" label="租金" style="width:10%"></el-table-column>-->
        <!--<el-table-column prop="status" label="状态" style="width:10%"></el-table-column>-->
      <!--</el-table>-->
      <el-table :data="tableData" v-loading="getDataLoading" border stripe fit  style="width: 100%">

        <el-table-column align="center" label="合同编号" width="200">
          <template slot-scope="scope" >
            <!-- <span>{{ scope.row.contractCode }}</span> -->
                <el-button @click="toView(scope.row)" type="text">{{scope.row.dsContractCode}}</el-button>
          </template>
        </el-table-column>

        <el-table-column align="center" label="签约时间" >
          <template slot-scope="scope">
            <span>{{scope.row.signTime | dateFilter}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="租客名称">
          <template slot-scope="scope">
              <span v-if="scope.row.tenantsType === 'enterprise'">{{scope.row.companyName}}</span>
              <span v-else>{{scope.row.tenantsName}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="租期" >
          <template slot-scope="scope">
             <span>{{scope.row.dateStartedRent | dateStartFilter}}--{{scope.row.dateEndedRent | dateEndFilter}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="租金" >
          <template slot-scope="scope">
            <span>{{scope.row.totalRentMoney}}元/月</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="状态" >
          <template slot-scope="scope">
            <span>{{scope.row.dsContractStatus}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script>
  import { pcDscontractList } from "@/api/downContract";
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
      },
      rentDateFilter(date) {
        if (date) {
          date = date.substring(0, date.indexOf(' '));
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
        var query = {
          houseCode:this.houseCode
        }
        pcDscontractList(query).then(response => {
          this.tableData = response.data;
          console.log(this.tableData);
        }).catch(error => {
          Utils.error(error);
        });
      },
      toView(row) {
        // console.log(row);
        this.$router.push({ path: `/contractmanagement/downstreamcontract/auditcontract/?dsContractCode=${row.dsContractCode}` });
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

