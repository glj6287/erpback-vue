<template>
  <div class="app-container">
    <div class="main">
    
      <el-table :data="tableData" v-loading="getDataLoading" border stripe fit  style="width: 100%">

        <el-table-column align="center" label="合同编号" width="200">
          <template slot-scope="scope" >
            <el-button @click="toView(scope.row)" type="text">{{scope.row.contractCode}}</el-button>
          </template>
        </el-table-column>

        <el-table-column align="center" label="签约时间" >
          <template slot-scope="scope">
            <span>{{scope.row.createTime | dateFilter}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="签约公司">
          <template slot-scope="scope">
            <span>{{scope.row.signCompany}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="租期">
          <template slot-scope="scope">
            <span>{{scope.row.leaseDeadlineDateStart}}</span>
          </template>
        </el-table-column>

      <el-table-column align="center" width="110" label="第一年租金">
        <template slot-scope="scope">
          <span>{{scope.row.rentMoney}}元/月</span>
        </template>
      </el-table-column>

        <el-table-column align="center" label="付款方式" >
          <template slot-scope="scope">
            <span>{{scope.row.paymentTypeCode}}元/月</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="状态" >
          <template slot-scope="scope">
            <span>{{scope.row.contractStatusValue}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script>
import { upcontractList } from "@/api/upContract";
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
        date = date.substring(0, date.indexOf(" "));
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
      upcontractList(query)
        .then(response => {
          this.tableData = response.data;
          console.log(response.data);
        })
        .catch(error => {
          Utils.error(error);
        });
    },

    toView(row){
      this.$router.push({ path: `/contractmanagement/upstreamcontract/detailinfo/?contractCode=${row.contractCode}&statusName=${row.contractStatusValue}` });
    }
    
  }
};
</script>

<style lang="scss" scoped>
.housing_title {
  height: 50px;
  background-color: #ccc;
  line-height: 50px;
  text-indent: 10px;
}
.main {
  padding-left: 20px;
  padding-top: 10px;
}
.housing_detail {
  margin-bottom: 20px;
}
.housing_detail_pic {
  display: inline-block;
  width: 100px;
  height: 50px;
}
</style>

