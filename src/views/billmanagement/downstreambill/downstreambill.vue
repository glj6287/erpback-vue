<template>
  <div class="app-container calendar-list-container">
    <el-form class="form-container" :model="listQuery" :inline="true" ref="searchForm">

      <el-form-item label="下游合同:" prop="dsContractCodeLike">
        <el-input v-model="listQuery.dsContractCodeLike" size="small" placeholder="请输入" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item label="账单编号:" prop="tenatBillCodeLike">
        <el-input v-model="listQuery.tenatBillCodeLike" size="small" placeholder="请输入" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item label="房源编号:" prop="houseCodeLike">
        <el-input v-model="listQuery.houseCodeLike" size="small" placeholder="请输入" @keyup.enter.native="search"></el-input>
      </el-form-item>

      <el-form-item label="租客:" prop="tenantsNameLike">
        <el-input v-model="listQuery.tenantsNameLike" size="small" placeholder="租客/企业/手机号" @keyup.enter.native="search"></el-input>
      </el-form-item>

      <el-form-item label="账期开始:">
        <el-form-item prop="startDate1">
          <el-date-picker v-model="listQuery.startDate1" @change="startDate1Change" type="date" size="small" placeholder="开始日期" style="width:120px;"></el-date-picker>
          <el-form-item prop="startDate2">
            <el-date-picker v-model="listQuery.startDate2" @change="startDate2Change" type="date" size="small" placeholder="截止日期" style="width:120px;"></el-date-picker>
          </el-form-item>
        </el-form-item>
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

      <el-form-item label="签约公司:" prop="signCompany">
        <el-select v-model="listQuery.signCompany" size="small" style="width: 174px" clearable>
          <el-option v-for="item in signCompanyOptions" :key="item.dictCode" :label="item.dictValue" :value="item.dictCode"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="付款人:" prop="payNameLike">
        <!--<el-input v-model="listQuery.payNameLike" size="small" placeholder="请输入" @keyup.enter.native="search"></el-input>-->

        <el-select
          v-model="listQuery.payNameLike"
          size="small"
          filterable
          remote
          reserve-keyword
          placeholder="请输入付款人名称"
          style="width: 174px;"
          clearable>
          <el-option
            v-for="item in getPayNameAllOptions"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="质押方:" prop="pledgePartyCode">
        <el-select v-model="listQuery.pledgePartyCode" size="small" style="width: 174px" clearable>
          <el-option v-for="item in getPledgePartyOptions" :key="item.dictCode" :label="item.dictValue" :value="item.dictCode"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="下游合同状态:" prop="pledgePartyCode">
        <el-select v-model="listQuery.dsContractStatus" size="small" style="width: 174px" clearable>
          <el-option v-for="item in dsContractStatusOptions" :key="item.value" :label="item.lable" :value="item.value"></el-option>
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

      <el-table-column min-width="275" label="账单编号" align="center">
        <template slot-scope="scope">
          <el-button @click="toViewBill(scope.row)" type="text">{{scope.row.tenatBillCode}}</el-button>
        </template>
      </el-table-column>
      
      <el-table-column min-width="180" label="下游合同" align="center">
        <template slot-scope="scope">
          <el-button @click="toViewDsContract(scope.row)" type="text">{{scope.row.dsContractCode}}</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" width="120" label="房源编号">
        <template slot-scope="scope">
          <el-button @click="toViewHouse(scope.row)" type="text">{{scope.row.houseCode}}</el-button>
        </template>
      </el-table-column>

      <el-table-column width="100" label="签约公司">
        <template slot-scope="scope">
          <span>{{scope.row.signCompanyText}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="220" label="租客名称">
        <template slot-scope="scope">
          <span>{{scope.row.tenantsName}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center"  min-width="195" label="账期">
        <template slot-scope="scope">
          <span>{{scope.row.startDate | formatTime}} - {{scope.row.endDate | formatTime}}</span>
        </template>
      </el-table-column>

      <el-table-column width="150" label="最晚付款日期">
        <template slot-scope="scope">
          <span>{{scope.row.dueDate | formatTime}}</span>
        </template>
      </el-table-column>

      <el-table-column width="150" label="付款方式">
        <template slot-scope="scope">
          <span>{{scope.row.paymentTypeValue}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="200" label="期次">
        <template slot-scope="scope">
          <span>第{{scope.row.currentPeriod}}期（共{{scope.row.countPeriod}}期）</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="130" label="应收总额">
        <template slot-scope="scope">
          <span>{{scope.row.totalRepayFee}}元</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="110" label="已收总额">
        <template slot-scope="scope">
          <span>{{scope.row.realRepay}}元</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="100" label="收款状态">
        <template slot-scope="scope">
          <span>{{scope.row.settleTypeText}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="110" label="账单状态">
        <template slot-scope="scope">
          <span>{{scope.row.isActiveText }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="130" label="质押方" v-if="$store.getters.buttons.includes('downcontractPledgeLook')">
        <template slot-scope="scope">
          <span>{{scope.row.pledgePartyValue}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="110" fixed="right" label="操作" v-if="$store.getters.buttons.includes('downstreambillCancel')">
        <template slot-scope="scope">
          <el-button v-if="scope.row.settleType==='1101' || scope.row.settleType==='1102'"  @click="handleClick(scope.row)" type="text">销账</el-button>
        </template>
      </el-table-column>

    </el-table>
    <div class="block pagination-container" style="text-align: right;">
      <pagination-modal :total=total :page.sync=listQuery.page :pageSize.sync=listQuery.pageSize @getList="getList"></pagination-modal>
    </div>

  </div>
</template>

<script>

  import { receivableOrderStatus, signCompany, getReceivablePayStatus, getPledgeParty } from "@/api/basedata";
  import { selectTenantBillInfo, selectPayNameAll } from "@/api/bill";

  export default {
    data() {
      return {
        list: null,
        listLoading: false,
        searchLoading: false,
        receivableOrderStatusOptions: [],
        receivablePayStatusOptions: [],
        signCompanyOptions: [],
        getPledgePartyOptions: [],
        getPayNameAllOptions: [],
        dsContractStatusOptions: [],
        currentPage: 1,
        total: 0,
        listQuery: {
          tenatBillCodeLike: "",
          dsContractCodeLike: "",
          dsContractStatus: "",
          houseCodeLike: "",
          settleType: "",
          isActive: "",
          startDate1: "",
          startDate2: "",
          tenantsNameLike: "",
          signCompany: "",
          payNameLike: "",
          pledgePartyCode: "",
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
      this.signCompanys();
      this.getPledgeParty();
      this.selectPayNameAll();
    },
    methods: {
      getList() {
        this.listLoading = true;
        selectTenantBillInfo(this.listQuery)
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
      startDate1Change(value) {
        if (value != null && value !== "") {
          this.listQuery.startDate1 = value + " 00:00:00";
        }
      },
      startDate2Change(value) {
        if (value != null && value !== "") {
          this.listQuery.startDate2 = value + " 23:59:59";
        }
      },
      // resetForm(formName) {
      //   this.$refs[formName].resetFields();
      // },
      handleClick(row) {
        this.$router.push({ path: `/billmanagement/downstreambill/downstreambilldetail/?tenatBillCode=${row.tenatBillCode}&settleTypeText=${row.settleTypeText}&isActiveText=${row.isActiveText}&isChangeoff=1` });
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
      // 签约公司
      signCompanys() {
        signCompany().then(response => {
          this.signCompanyOptions = response.data;
        });
      },
      selectPayNameAll() {
        selectPayNameAll().then(response => {
          this.getPayNameAllOptions = response.data;
        });
        this.dsContractStatusOptions = [
          { "lable": "已生效", "value": "2302" },
          { "lable": "已失效", "value": "2305" }
        ];
      },
      // 质押方
      getPledgeParty() {
        getPledgeParty().then(response => {
          this.getPledgePartyOptions = response.data;
        });
      },
      toViewHouse(row) {
        this.$router.push({ path: `/house/detail/?houseCode=${row.houseCode}` });
      },
      toViewBill(row) {
        this.$router.push({ path: `/billmanagement/downstreambill/downstreambilldetail/?tenatBillCode=${row.tenatBillCode}&settleTypeText=${row.settleTypeText}&isActiveText=${row.isActiveText}` });
      },
      toViewDsContract(row) {
        this.$router.push({ path: `/contractmanagement/downstreamcontract/auditcontract/?dsContractCode=${row.dsContractCode}` });
      }
    }
  };
</script>

<style>

</style>
