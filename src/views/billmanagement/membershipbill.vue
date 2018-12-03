<template>
  <div class="app-container calendar-list-container">
    <el-form class="form-container" :model="listQuery" :inline="true" label-width="100px" ref="searchForm">
      <el-form-item label="房源编号:" prop="houseCode">
        <el-input v-model="listQuery.houseCode" size="small" placeholder="" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item label="上游合同:" prop="contractCode">
        <el-input v-model="listQuery.contractCode" size="small" placeholder="" @keyup.enter.native="search"></el-input>
      </el-form-item>

      <el-form-item label="收款状态:" prop="settleType" >
        <el-select v-model="listQuery.settleType" size="small" style="width: 174px" clearable>
          <el-option v-for="item in receivablePayStatusOptions" :key="item.dictValue" :label="item.dictValue" :value="item.dictCode"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="账单状态:" prop="isActive" >
        <el-select v-model="listQuery.isActive" size="small" style="width: 174px" clearable>
          <el-option v-for="item in receivableOrderStatusOptions" :key="item.dictValue" :label="item.dictValue" :value="item.dictCode"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item style="margin-left:43px;">
        <el-button type="primary" icon="search" size="small" v-loading="searchLoading" @click="search">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="list" v-loading="listLoading" border stripe fit style="width: 100%">

      <el-table-column min-width="150" label="账单编号" align="center">
        <template slot-scope="scope">
          <el-button @click="toViewBill(scope.row)" type="text">{{scope.row.receBillCode}}</el-button>
        </template>
      </el-table-column>

      <el-table-column  width="180" label="上游合同" align="center">
        <template slot-scope="scope">
          <el-button @click="toViewContract(scope.row)" type="text">{{scope.row.contractCode}}</el-button>
        </template>
      </el-table-column>

      <el-table-column width="120" label="房源编号" align="center">
        <template slot-scope="scope">
          <el-button @click="toViewHouse(scope.row)" type="text">{{scope.row.houseCode}}</el-button>
        </template>
      </el-table-column>

      <el-table-column align="center" label="会员费" min-width="140" >
        <template slot-scope="scope">
          <span>{{scope.row.membershipFee}}元</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="120" label="已收金额">
        <template slot-scope="scope">
          <span>{{scope.row.receivedMoney}}元</span>
        </template>
      </el-table-column>

      <el-table-column align="center"  width="100" label="收款状态">
        <template slot-scope="scope">
          <span>{{scope.row.settleTypeText}}</span>
        </template>
      </el-table-column>

      <el-table-column width="120" label="账单状态" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.isActiveText}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="110" label="操作" v-if="$store.getters.buttons.includes('shipBillCancel')" >
        <template slot-scope="scope">
          <el-button v-if="scope.row.settleType==='1101' || scope.row.settleType==='1102'"  @click="handleClick(scope.row)" type="text">销账</el-button>
        </template>
      </el-table-column>

    </el-table>

    <div class="block pagination-container" style="text-align: right;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="listQuery.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

    <!-- <edit-modal v-if="showModal" :agreementNo="agreementNo" @close="showModal = false"></edit-modal> -->
  </div>
</template>

<script>
  import { receivableOrderStatus, getReceivablePayStatus } from "@/api/basedata";
  import { selectReceivableBilInfo } from "@/api/bill";

  export default {
    data() {
      return {
        showModal: false,
        list: null,
        listLoading: false,
        searchLoading: false,
        receivableOrderStatusOptions: [],
        receivablePayStatusOptions: [],
        currentPage: 1,
        total: 0,
        listQuery: {
          contractCode: "",
          houseCode: "",
          settleType: "",
          isActive: "",
          page: 1,
          pageSize: 10
        },
        dictQuery: {
          dictType: ""
        }
      };
    },
    filters: {
      formatTime(date) {
        if (date) {
          return date.substring(0, date.indexOf(" ")).replace(/-/g, ".");
        }
        return "-";
      }
    },
    created() {
      this.getList();
      this.receivableOrderStatus();
      this.receivablePayStatus();
    },
    methods: {
      getList() {
        this.listLoading = true;
        selectReceivableBilInfo(this.listQuery)
          .then(response => {
            this.list = response.data.Item;
            this.total = response.count;
            this.listLoading = false;
            this.searchLoading = false;
          })
          .catch(error => {
            console.log(error);
            this.listLoading = false;
            this.searchLoading = false;
          });
      },
      handleSizeChange(n) {
        this.listQuery.pageSize = n;
        this.getList();
      },
      handleCurrentChange(n) {
        this.listQuery.page = n;
        this.getList();
      },
      search() {
        this.searchLoading = true;
        this.currentPage = 1;
        this.getList();
      },
      // resetForm(formName) {
      //   this.$refs[formName].resetFields();
      // },
      handleClick(row) {
        this.$router.push({ path: `/billmanagement/receichargeoffbill/?receBillCode=${row.receBillCode}&settleTypeText=${row.settleTypeText}&isActiveText=${row.isActiveText}` });
      },
      // 应收账单状态
      receivableOrderStatus() {
        receivableOrderStatus().then(response => {
          this.receivableOrderStatusOptions = response.data;
        });
      },
      // 应收账单支付状态
      receivablePayStatus() {
        getReceivablePayStatus(this.dictQuery).then(response => {
          this.receivablePayStatusOptions = response.data;
        });
      },
      toViewHouse(row) {
        this.$router.push({ path: `/house/detail/?houseCode=${row.houseCode}` });
      },
      toViewBill(row) {
        this.$router.push({ path: `/billmanagement/receivablebilldetail/?receBillCode=${row.receBillCode}&settleTypeText=${row.settleTypeText}&isActiveText=${row.isActiveText}` });
      },
      toViewContract(row) {
        this.$router.push({ path: `/contractmanagement/upstreamcontract/detailinfo/?contractCode=${row.contractCode}&statusName=${row.contractStatusValue}` });
      }
    }
  };
</script>

<style>

</style>
