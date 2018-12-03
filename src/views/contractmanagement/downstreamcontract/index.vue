<template>
  <div class="app-container calendar-list-container">
    <el-form class="form-container" :model="listQuery" :inline="true" ref="searchForm">
      <el-form-item label="合同编号:" prop="dsContractCode">
        <el-input v-model="listQuery.dsContractCode" size="small" placeholder="合同编号" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item label="房源编号:" prop="houseCode">
        <el-input v-model="listQuery.houseCode" size="small" placeholder="房源编号" @keyup.enter.native="search"></el-input>
      </el-form-item>

      <el-form-item label="租客名称:" prop="tenantsName">
        <el-input v-model="listQuery.tenantsName" size="small" placeholder="租客/公司" @keyup.enter.native="search"></el-input>
      </el-form-item>

      <el-form-item label="特工姓名:" prop="signName">
        <el-input v-model="listQuery.signName" size="small" placeholder="特工姓名" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item label="门牌号:" prop="houseNo">
        <el-row :gutter="2" >
          <el-col :span="8"><div class="grid-content bg-purple"><el-input v-model="listQuery.houseNo" size="small" placeholder="门牌号" @keyup.enter.native="search"/></div></el-col>
          <el-col :span="1"><div class="grid-content bg-purple">号</div></el-col>
          <el-col :span="8"><div class="grid-content bg-purple"><el-input v-model="listQuery.houseRoomNo" size="small" placeholder="门牌室" @keyup.enter.native="search" /></div></el-col>
          <el-col :span="1">室</el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="小区名称:" prop="neigbodCode">
        <!-- <el-select v-model="listQuery.neigbodCode" size="small" style="width: 174px;" clearable>
          <el-option v-for="item in neighborhoodCodeOptions" :key="item.neigbodCode" :label="item.name" :value="item.neigbodCode"></el-option>
        </el-select> -->
         <el-select
              v-model="listQuery.neigbodCode"
              size="small"
              filterable
              remote
              reserve-keyword
              placeholder="请输入小区名称"
              style="width:174px;"
              clearable>
              <el-option
                v-for="item in neighborhoodCodeOptions"
                :key="item.neigbodCode"
                :label="item.name"
                :value="item.neigbodCode">
              </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="社区名称:" prop="communityCode">
        <el-select v-model="listQuery.communityCode" size="small" style="width: 174px;" clearable>
          <el-option v-for="item in communityCodeOptions" :key="item.communityCode" :label="item.communityName" :value="item.communityCode"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="签约公司:" prop="signCompany">
        <el-select v-model="listQuery.signCompany" size="small" style="width: 174px" clearable>
          <el-option v-for="item in signCompanyOptions" :key="item.dictCode" :label="item.dictValue" :value="item.dictCode"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="合同类型:" prop="contractType">
        <el-select v-model="listQuery.contractType" size="small" style="width: 174px" clearable>
          <el-option v-for="item in contractTypeOptions" :key="item.dictCode" :label="item.dictValue" :value="item.dictCode"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="合同状态:" prop="dsContractStatusKey">
        <el-select v-model="listQuery.dsContractStatusKey" size="small" style="width: 174px" clearable>
          <el-option v-for="item in statusOptions" :key="item.id" :label="item.dictValue" :value="item.dictCode"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="归档状态:" prop="recordStatusKey">
        <el-select v-model="listQuery.recordStatusKey" size="small" style="width: 174px" clearable>
          <el-option v-for="item in recodeStatusOptions" :key="item.dictCode" :label="item.dictValue" :value="item.dictCode"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="付款方式:" prop="paymentType">
        <el-select v-model="listQuery.paymentType" size="small" style="width: 174px" clearable>
          <el-option v-for="item in paymentTypeOptions" :key="item.rentstrategyCode" :label="item.name" :value="item.rentstrategyCode"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="签约时间:">
        <el-form-item prop="signTimeStart">
          <el-date-picker v-model="listQuery.signTimeStart" @change="createTimeStartChange" type="date" size="small" placeholder="结束日期" style="width:120px;"></el-date-picker>
          <el-form-item prop="signTimeEnd">
            <el-date-picker v-model="listQuery.signTimeEnd" @change="createTimeEndChange" type="date" size="small" placeholder="结束日期" style="width:120px;"></el-date-picker>
          </el-form-item>
        </el-form-item>
      </el-form-item>

      <el-form-item label="起租日期:">
        <el-form-item prop="dateStartedRentTimeStart">
          <el-date-picker v-model="listQuery.dateStartedRentTimeStart" @change="handOverDateStartChange" type="date" size="small" placeholder="开始日期" style="width:120px;"></el-date-picker>
          <el-form-item prop="dateStartedRentTimeEnd">
            <el-date-picker v-model="listQuery.dateStartedRentTimeEnd" @change="handOverDateEndChange" type="date" size="small" placeholder="结束日期" style="width:120px;"></el-date-picker>
          </el-form-item>
        </el-form-item>
      </el-form-item>

      <el-form-item label="预计退租:">
        <el-form-item prop="dateEndedRentTimeStart">
          <el-date-picker v-model="listQuery.dateEndedRentTimeStart" @change="leaseDeadlineDateStartChange" type="date" size="small" placeholder="结束日期" style="width:120px;"></el-date-picker>
          <el-form-item prop="dateEndedRentTimeEnd">
            <el-date-picker v-model="listQuery.dateEndedRentTimeEnd" @change="leaseDeadlineDateEndChange" type="date" size="small" placeholder="结束日期" style="width:120px;"></el-date-picker>
          </el-form-item>
        </el-form-item>
      </el-form-item>

      <el-form-item label="实际退租:">
        <el-form-item prop="throwLeaseTimeStart">
          <el-date-picker v-model="listQuery.throwLeaseTimeStart" @change="throwLeaseTimeStartChange" type="date" size="small" placeholder="结束日期" style="width:120px;"></el-date-picker>
          <el-form-item prop="throwLeaseTimeEnd">
            <el-date-picker v-model="listQuery.throwLeaseTimeEnd" @change="throwLeaseTimeEndChange" type="date" size="small" placeholder="结束日期" style="width:120px;"></el-date-picker>
          </el-form-item>
        </el-form-item>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="search" size="small" v-loading="searchLoading" @click="search">查询</el-button>
      </el-form-item>

      <el-form-item>
        <el-button size="small" @click="resetForm('searchForm')">重置</el-button>
      </el-form-item>

      <el-form-item>
        <el-button v-if="$store.getters.buttons.includes('dscontractpayExport')"
                   size="small"  @click="toExport">导出</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="list" v-loading="listLoading" border stripe fit style="width: 100%">

      <el-table-column min-width="180" label="合同编号" fixed align="center">
        <template slot-scope="scope">
          <el-button @click="toView(scope.row)" type="text">{{scope.row.dsContractCode}}</el-button>
        </template>
      </el-table-column>

      <el-table-column align="center" width="120" label="房源编号">
        <template slot-scope="scope">
          <el-button @click="toViewHouse(scope.row)" type="text">{{scope.row.houseCode}}</el-button>
        </template>
      </el-table-column>

      <el-table-column width="150" label="门牌号">
        <template slot-scope="scope">
          <span>{{scope.row.houseNo}}号{{scope.row.houseRoomNo}}室</span>
        </template>
      </el-table-column>

      <el-table-column align="left"  min-width="170" label="小区名称">
        <template slot-scope="scope">
          <span>{{scope.row.neighborhoodName}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center"  width="100" label="签约公司">
        <template slot-scope="scope">
          <span>{{scope.row.signCompany}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="100" label="合同类型">
        <template slot-scope="scope">
          <span>{{scope.row.contractType}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="230" label="租客名称">
        <template slot-scope="scope">
          <span v-if="scope.row.tenantsType === 'enterprise'">{{scope.row.companyName}}</span>
          <span v-else>{{scope.row.tenantsName}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="160" label="租金">
        <template slot-scope="scope">
          <span>{{scope.row.totalRentMoney}}元/月</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="200" label="租期">
        <template slot-scope="scope">
          <span>{{scope.row.dateStartedRent | dateStartFilter}}-{{scope.row.dateEndedRent | dateEndFilter}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="200" label="灵活期">
        <template slot-scope="scope">
          <span v-if="scope.row.dateStartedFlexible !== null && scope.row.dateStartedFlexible !=='' && scope.row.dateEndedFlexible !== null && scope.row.dateEndedFlexible !==''">
            {{scope.row.dateStartedFlexible | dateStartFilter}}-{{scope.row.dateEndedFlexible | dateEndFilter}}
          </span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="180" label="实际退租日期">
        <template slot-scope="scope">
          <span>{{scope.row.throwLeaseTime | leaseTimeFilter}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="155" label="付款方式">
        <template slot-scope="scope">
          <span>{{scope.row.paymentType}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="110" label="合同状态">
        <template slot-scope="scope">
          <span>{{scope.row.dsContractStatus }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="110" label="归档状态">
        <template slot-scope="scope">
          <span>{{scope.row.recordStatus }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="130" label="签约时间">
        <template slot-scope="scope">
          <span>{{scope.row.signTime}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="130" label="质押方" v-if="$store.getters.buttons.includes('downcontractPledgeLook')">
        <template slot-scope="scope">
          <span>{{scope.row.pledgePartyValue}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="200" label="质押时间" v-if="$store.getters.buttons.includes('downcontractPledgeLook')">
        <template slot-scope="scope">
          <span>{{scope.row.pledgeStart | dateFilterDate}}-{{scope.row.pledgeEnd | dateFilterDate}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="120" label="签约特工">
        <template slot-scope="scope">
          <span>{{scope.row.signName}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="180" label="操作" fixed="right"  >
        <template slot-scope="scope">
          <el-button v-if="$store.getters.buttons.includes('downstreamcontractFile') && (scope.row.dsContractStatusKey=='2302' || scope.row.dsContractStatusKey=='2305') && scope.row.recordStatusKey=='2501'"
                     @click="handleClick(scope.row)" type="text">合同归档</el-button>
          <el-button v-if="$store.getters.buttons.includes('downstreamcontractPledge')"
            @click="handlePledgeClick(scope.row)" type="text">修改质押</el-button>
        </template>
      </el-table-column>

    </el-table>
    <div class="block pagination-container" style="text-align: right;">
      <pagination-modal :total=total :page.sync=listQuery.page :pageSize.sync=listQuery.pageSize @getList="getList"></pagination-modal>
    </div>
    <edit-modal v-if="showModal" @close="showModal = false" @refresh="getList" :dataId="dataId" :contractCode="contractCode"></edit-modal>
  </div>
</template>

<script>
  import { pcDscontractList, updateRecordStatus, exportDsContract } from "@/api/downContract";
  import { getAll } from "@/api/therentstrategy";
  import { signCompany, getDownstreamContractType, paymentType,
    getContractDsType, getContractDsRecordStatus, findNeighborhoodInfoMyAll, selectCommunityListMyAll } from "@/api/basedata";
  import Utils from "@/utils/common";
  import EditModal from "./edit";

  export default {
    name: "downcontractList",
    components: {
      EditModal
    },
    data() {
      return {
        list: null,
        searchLoading: false,
        listLoading: false,
        showModal: false,
        neighborhoodCodeOptions: [],
        communityCodeOptions: [],
        signCompanyOptions: [],
        contractTypeOptions: [],
        paymentTypeOptions: [],
        statusOptions: [],
        recodeStatusOptions: [],
        total: 0,
        dataId: "",
        contractCode: "",
        listQuery: {
          houseCode: "",
          dsContractCode: "",
          tenantsName: "",
          signName: "",
          neigbodCode: "",
          communityCode: "",
          signCompany: "",
          contractType: "",
          dsContractStatusKey: "",
          recordStatusKey: "",
          paymentType: "",
          dateStartedRentTimeStart: null,
          dateStartedRentTimeEnd: null,
          dateEndedRentTimeStart: null,
          dateEndedRentTimeEnd: null,
          throwLeaseTimeStart: null,
          throwLeaseTimeEnd: null,
          signTimeStart: null,
          signTimeEnd: null,
          houseRoomNo: "",
          houseNo: "",
          page: 1,
          pageSize: 10
        }
      };
    },
    filters: {
      dateFilter(date) {
        if (date) {
          date = date.substring(0, date.indexOf("."));
          return date.replace(/-/g, ".");
        }
        return "";
      },
      dateFilterDate(date) {
        if (date) {
          date = date.substring(0, date.indexOf(" "));
          return date.replace(/-/g, ".");
        }
        return "";
      },
      dateStartFilter(date) {
        if (date) {
          return date.replace(/-/g, ".");
        }
        return "";
      },
      dateEndFilter(date) {
        if (date) {
          return date.replace(/-/g, ".");
        }
        return "";
      },
      leaseTimeFilter(date) {
        if (date) {
          date = date.substring(0, date.indexOf("."));
          return date.replace(/-/g, ".");
        }
        return "-";
      }
    },
    created() {
      this.deadlineOptions();
      this.getList();
    },
    methods: {
      getList() {
        this.listLoading = true;
        pcDscontractList(this.listQuery).then(response => {
          console.log(response.data);
          this.list = response.data;
          this.total = response.count;
          this.listLoading = false;
          this.searchLoading = false;
        }).catch(function(error) {
          console.log(error);
          this.listLoading = false;
          this.searchLoading = false;
        });
      },
      handOverDateStartChange(value) {
        if (value != null && value !== "") {
          this.listQuery.dateStartedRentTimeStart = value + " 00:00:00";
        }
      },
      handOverDateEndChange(value) {
        if (value != null && value !== "") {
          this.listQuery.dateStartedRentTimeEnd = value + " 23:59:59";
        }
      },
      leaseDeadlineDateStartChange(value) {
        if (value != null && value !== "") {
          this.listQuery.dateEndedRentTimeStart = value + " 00:00:00";
        }
      },
      leaseDeadlineDateEndChange(value) {
        if (value != null && value !== "") {
          this.listQuery.dateEndedRentTimeEnd = value + " 23:59:59";
        }
      },
      throwLeaseTimeStartChange(value) {
        if (value != null && value !== "") {
          this.listQuery.throwLeaseTimeStart = value + " 00:00:00";
        }
      },
      throwLeaseTimeEndChange(value) {
        if (value != null && value !== "") {
          this.listQuery.throwLeaseTimeEnd = value + " 23:59:59";
        }
      },
      createTimeStartChange(value) {
        if (value != null && value !== "") {
          this.listQuery.signTimeStart = value + " 00:00:00";
        }
      },
      createTimeEndChange(value) {
        if (value != null && value !== "") {
          this.listQuery.signTimeEnd = value + " 23:59:59";
        }
      },
      toView(row) {
        // console.log(row);
        this.$router.push({ path: `downstreamcontract/auditcontract/?dsContractCode=${row.dsContractCode}` });
      },
      toViewHouse(row) {
        this.$router.push({ path: `/house/detail/?houseCode=${row.houseCode}` });
      },
      deadlineOptions() {
        findNeighborhoodInfoMyAll(null).then(response => {
          this.neighborhoodCodeOptions = response.data;
        });
        selectCommunityListMyAll().then(response => {
          this.communityCodeOptions = response.data;
        });
        signCompany().then(response => {
          this.signCompanyOptions = response.data;
        });
        getDownstreamContractType().then(response => {
          this.contractTypeOptions = response.data;
        });
        getAll().then(response => {
          this.paymentTypeOptions = response.data;
        });
        getContractDsType().then(response => {
          this.statusOptions = response.data;
        });
        getContractDsRecordStatus().then(response => {
          this.recodeStatusOptions = response.data;
        });
      },
      // 归档
      handleClick(item) {
        this.$confirm("确认已收到纸质合同吗？", "提示", {
          cancelButtonText: "取消",
          confirmButtonText: "确定",
          type: "warning"
        }).then(() => {
          this.listLoading = true;
          updateRecordStatus(item.dsContractCode, item.version).then(response => {
            this.listLoading = false;
            this.getList();
            Utils.success(`操作成功`);
          });
        });
      },
      // 修改质押
      handlePledgeClick(item) {
        this.dataId = item.pledgeCode;
        this.contractCode = item.dsContractCode;
        this.showModal = true;
      },
      search() {
        this.searchLoading = true;
        this.listQuery.page = 1;
        this.getList();
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      toExport() {
        exportDsContract(this.listQuery).then(response => { }).catch(error => {
          Utils.error(error);
        });
      }
    }
  };
</script>

<style>
</style>
