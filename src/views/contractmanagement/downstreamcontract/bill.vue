<template>
  <div class="app-container" >
      <el-table :data="houseFlowLogVo" v-loading="getDataLoading" border stripe fit  style="width: 100%">

        <el-table-column align="center" min-width="125" label="账单编号" >
          <template slot-scope="scope" >
            <!-- <span>{{scope.row.tenatBillCode}}</span> -->
            <el-button @click="toViewBill(scope.row)" type="text">{{scope.row.tenatBillCode}}</el-button>
          </template>
        </el-table-column>

        <el-table-column align="center" label="租客姓名" >
          <template slot-scope="scope">
            <span>{{scope.row.tenantsName}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" min-width="120" label="账期" >
          <template slot-scope="scope">
            <span>{{scope.row.createTime | dateFilter}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="最晚付款日期" min-width="120">
          <template slot-scope="scope">
            <span>{{scope.row.dueDate | formatTime}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="付款方式" >
          <template slot-scope="scope">
            <span>{{scope.row.paymentTypeValue}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="期次" min-width="90">
          <template slot-scope="scope">
            <span>第{{scope.row.currentPeriod}}期（共{{scope.row.countPeriod}}期）</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="应收总额" >
          <template slot-scope="scope">
            <span>{{scope.row.totalRepayFee}}元</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="已收总额" >
          <template slot-scope="scope">
            <span>{{scope.row.realRepay}}元</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="收款状态" >
          <template slot-scope="scope">
            <span>{{scope.row.settleTypeText}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="账单状态" >
          <template slot-scope="scope">
            <span>{{scope.row.isActiveText}}</span>
          </template>
        </el-table-column>

      </el-table>
        <pagination-modal :total=total :page.sync=listQuery.page :pageSize.sync=listQuery.pageSize @getList="getDetail"></pagination-modal>
  </div>
</template>

<script>
import { selectTenantBillInfo } from "@/api/bill";
import Utils from "@/utils/common";
  export default {
    data() {
      return {
        getDataLoading: false,
        dsContractCode: this.$route.query.dsContractCode,
        houseFlowLogVo: [],
        total: null,
        listQuery: {
          dsContractCode: this.$route.query.dsContractCode,
          page: 1,
          pageSize: 10
        }
      };
    },
    filters: {
      dateFilter(date) {
        if (date) {
          return date.replace(/-/g, ".");
        }
        return "";
      },
       formatTime(date) {
        if (date) {
          return date.substring(0, date.indexOf(" ")).replace(/-/g, ".");
        }
        return "-";
      }
    },
    created() {
      this.getDetail();
    },
    methods: {
      getDetail() {
        selectTenantBillInfo(this.listQuery).then(response => {
          console.log(response.data)
          this.houseFlowLogVo = response.data;
          this.total = response.count
        }).catch(error => {
          Utils.error(error);
        });
      },

       toViewBill(row) {
        this.$router.push({ path: `/billmanagement/downstreambill/downstreambilldetail/?tenatBillCode=${row.tenatBillCode}&settleTypeText=${row.settleTypeText}&isActiveText=${row.isActiveText}` });
      },
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

