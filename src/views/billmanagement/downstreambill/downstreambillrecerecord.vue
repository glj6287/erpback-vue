<template>
  <div class="app-container calendar-list-container">
    <el-form class="form-container" :model="listQuery" :inline="true" ref="searchForm">

      <el-form-item label="收款方式:" prop="payWayKey" >
        <el-select v-model="listQuery.payWayKey" size="small" style="width: 174px" clearable>
          <el-option v-for="item in downstreamPayWayOptions" :key="item.dictValue" :label="item.dictValue" :value="item.dictCode"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="收款账户:" prop="receivableAccountLike">
        <el-input v-model="listQuery.receivableAccountLike" size="small" placeholder="请输入" @keyup.enter.native="search"></el-input>
      </el-form-item>

      <el-form-item label="付款人:" prop="payNameLike">
        <el-input v-model="listQuery.payNameLike" size="small" placeholder="请输入" @keyup.enter.native="search"></el-input>
      </el-form-item>

      <el-form-item label="收款日期:">
        <el-form-item prop="receDateStart">
          <el-date-picker v-model="listQuery.receDateStart" @change="receDateStartChange" type="date" size="small" placeholder="开始日期" style="width:120px;"></el-date-picker>
          <el-form-item prop="receDateEnd">
            <el-date-picker v-model="listQuery.receDateEnd" @change="receDateEndChange" type="date" size="small" placeholder="结束日期" style="width:120px;"></el-date-picker>
          </el-form-item>
        </el-form-item>
      </el-form-item>

      <el-form-item label="房源编号:" prop="houseCodeLike">
        <el-input v-model="listQuery.houseCodeLike" size="small" placeholder="请输入" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item label="下游合同:" prop="dsContractCodeLike">
        <el-input v-model="listQuery.dsContractCodeLike" size="small" placeholder="请输入" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item label="账单编号:" prop="tenatBillCodeLike">
        <el-input v-model="listQuery.tenatBillCodeLike" size="small" placeholder="请输入" @keyup.enter.native="search"></el-input>
      </el-form-item>

      <el-form-item label="支付流水:" prop="paySerialNumberLike">
        <el-input v-model="listQuery.paySerialNumberLike" size="small" placeholder="请输入" @keyup.enter.native="search"></el-input>
      </el-form-item>

      <el-form-item label="收款公司:" prop="signCompany">
        <el-select v-model="listQuery.signCompany" size="small" style="width: 174px" clearable>
          <el-option v-for="item in signCompanyOptions" :key="item.dictCode" :label="item.dictValue" :value="item.dictValue"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="search" size="small" v-loading="searchLoading" @click="search">查询</el-button>
      </el-form-item>

      <!--<el-form-item>
        <el-button size="small" @click="resetForm('searchForm')">重置</el-button>
      </el-form-item>-->
    </el-form>

    <el-table :data="list" v-loading="listLoading" border stripe fit style="width: 100%">

      <el-table-column width="100" label="编号">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="110" label="收款金额">
        <template slot-scope="scope">
          <span>{{scope.row.payMoney}}元</span>
        </template>
      </el-table-column>


      <el-table-column min-width="120" label="收款方式">
        <template slot-scope="scope">
          <span>{{scope.row.payWayValue}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="120" label="收款账户">
        <template slot-scope="scope">
          <span>{{scope.row.receivableAccount}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center"  min-width="270" label="收款流水">
        <template slot-scope="scope">
          <span>{{scope.row.paySerialNumber}}</span>
        </template>
      </el-table-column>

      <el-table-column width="130" label="收款时间">
        <template slot-scope="scope">
          <span>{{scope.row.createTime | formatTime}}</span>
        </template>
      </el-table-column>

      <el-table-column width="130" label="收款公司">
        <template slot-scope="scope">
          <span>{{scope.row.signCompanyText}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="200" label="付款人">
        <template slot-scope="scope">
          <span>{{scope.row.payName}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="270" label="账单编号" align="center">
        <template slot-scope="scope">
          <el-button @click="toViewBill(scope.row)" type="text">{{scope.row.tenatBillCode}}</el-button>
        </template>
      </el-table-column>
      <el-table-column min-width="180" label="下游合同" align="center">
        <template slot-scope="scope">
          <el-button @click="toViewDsContract(scope.row)" type="text">{{scope.row.contractCode}}</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" width="120" label="房源编号">
        <template slot-scope="scope">
          <el-button @click="toViewHouse(scope.row)" type="text">{{scope.row.houseCode}}</el-button>
        </template>
      </el-table-column>

      <el-table-column align="center" width="200" label="处理人">
        <template slot-scope="scope">
          <span>{{scope.row.operator}}</span>
        </template>
      </el-table-column>

    </el-table>
    <div class="block pagination-container" style="text-align: right;">
      <pagination-modal :total=total :page.sync=listQuery.page :pageSize.sync=listQuery.pageSize @getList="getList"></pagination-modal>
    </div>

  </div>
</template>

<script>

  import { getDownstreamPayWay, signCompany } from "@/api/basedata";
  import { selectTenantsReceRecords } from "@/api/bill";

  export default {
    data() {
      return {
        list: null,
        listLoading: false,
        searchLoading: false,
        downstreamPayWayOptions: [],
        signCompanyOptions: [],
        currentPage: 1,
        total: 0,
        listQuery: {
          tenatBillCodeLike: "",
          dsContractCodeLike: "",
          houseCodeLike: "",
          signCompany: "",
          payNameLike: "",
          payWayKey: "",
          receivableAccountLike: "",
          receDateStart: "",
          receDateEnd: "",
          paySerialNumberLike: "",
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
      this.getDownstreamPayWay();
      this.signCompanys();
    },
    methods: {
      getList() {
        this.listLoading = true;
        selectTenantsReceRecords(this.listQuery)
          .then(response => {
            this.list = response.data;
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
      receDateStartChange(value) {
        if (value != null && value !== "") {
          this.listQuery.receDateStart = value + " 00:00:00";
        }
      },
      receDateEndChange(value) {
        if (value != null && value !== "") {
          this.listQuery.receDateEnd = value + " 23:59:59";
        }
      },
      // resetForm(formName) {
      //   this.$refs[formName].resetFields();
      // },
      handleClick(row) {
        this.$router.push({ path: `/billmanagement/receichargeoffbill/?receBillCode=${row.receBillCode}&settleTypeText=${row.settleTypeText}&isActiveText=${row.isActiveText}` });
      },
      // 支付方式
      getDownstreamPayWay() {
        getDownstreamPayWay().then(response => {
          this.downstreamPayWayOptions = response.data;
        });
      },
      // 签约公司
      signCompanys() {
        signCompany().then(response => {
          this.signCompanyOptions = response.data;
        });
      },
      toViewHouse(row) {
        this.$router.push({ path: `/house/detail/?houseCode=${row.houseCode}` });
      },
      toViewBill(row) {
        this.$router.push({ path: `/billmanagement/downstreambill/downstreambilldetail/?tenatBillCode=${row.tenatBillCode}&settleTypeText=${row.billSettleTypeText}&isActiveText=${row.billIsActiveText}` });
      },
      toViewDsContract(row) {
        this.$router.push({ path: `/contractmanagement/downstreamcontract/auditcontract/?dsContractCode=${row.contractCode}` });
      }
    }
  };
</script>

<style>

</style>
