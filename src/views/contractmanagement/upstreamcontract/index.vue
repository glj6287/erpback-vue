<template>
  <div class="app-container calendar-list-container">
    <el-form class="form-container" :model="listQuery" :inline="true" ref="searchForm">
      <el-form-item label="房源编号:" prop="houseCode">
        <el-input v-model="listQuery.houseCode" size="small" placeholder="房源编号" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item label="合同编号:" prop="contractCode">
        <el-input v-model="listQuery.contractCode" size="small" placeholder="合同编号" @keyup.enter.native="search"></el-input>
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
              style="width: 174px;"
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
      <el-form-item label="门牌号:" prop="houseNo">
        <el-row :gutter="2" >
          <el-col :span="8"><div class="grid-content bg-purple"><el-input v-model="listQuery.houseNo" size="small" placeholder="门牌号" @keyup.enter.native="search"/></div></el-col>
          <el-col :span="1"><div class="grid-content bg-purple">号</div></el-col>
          <el-col :span="8"><div class="grid-content bg-purple"><el-input v-model="listQuery.houseRoomNo" size="small" placeholder="门牌室" @keyup.enter.native="search" /></div></el-col>
          <el-col :span="1">室</el-col>
        </el-row>
      </el-form-item>

       <el-form-item label="业务模式:" prop="businessModeCode">
        <el-select v-model="listQuery.businessModeCode" size="small" style="width: 174px" clearable>
          <el-option v-for="item in businessModeOptions" :key="item.dictCode" :label="item.dictValue" :value="item.dictCode"></el-option>
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

      <el-form-item label="合同状态:" prop="contractStatusKey">
        <el-select v-model="listQuery.contractStatusKey" size="small" style="width: 174px" clearable>
          <el-option v-for="item in statusOptions" :key="item.id" :label="item.dictValue" :value="item.dictCode"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="付款方式:" prop="paymentTypeCode">
        <el-select v-model="listQuery.paymentTypeCode" size="small" style="width: 174px" clearable>
          <el-option v-for="item in paymentTypeOptions" :key="item.dictCode" :label="item.dictValue" :value="item.dictCode"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="起租日期:">
        <el-form-item prop="handOverDateStart">
          <el-date-picker v-model="listQuery.handOverDateStart" @change="handOverDateStartChange" type="date" size="small" placeholder="开始日期" style="width:120px;"></el-date-picker>
           <el-form-item prop="handOverDateEnd">
             <el-date-picker v-model="listQuery.handOverDateEnd" @change="handOverDateEndChange" type="date" size="small" placeholder="结束日期" style="width:120px;"></el-date-picker>
           </el-form-item>
        </el-form-item>
      </el-form-item>

       <el-form-item label="预计退租:">
        <el-form-item prop="leaseDeadlineDateStart">
          <el-date-picker v-model="listQuery.leaseDeadlineDateStart" @change="leaseDeadlineDateStartChange" type="date" size="small" placeholder="结束日期" style="width:120px;"></el-date-picker>
          <el-form-item prop="leaseDeadlineDateEnd">
             <el-date-picker v-model="listQuery.leaseDeadlineDateEnd" @change="leaseDeadlineDateEndChange" type="date" size="small" placeholder="结束日期" style="width:120px;"></el-date-picker>
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

      <el-form-item label="创建时间:">
        <el-form-item prop="createTimeStart">
          <el-date-picker v-model="listQuery.createTimeStart" @change="createTimeStartChange" type="date" size="small" placeholder="结束日期" style="width:120px;"></el-date-picker>
           <el-form-item prop="createTimeEnd">
             <el-date-picker v-model="listQuery.createTimeEnd" @change="createTimeEndChange" type="date" size="small" placeholder="结束日期" style="width:120px;"></el-date-picker>
           </el-form-item>
        </el-form-item>
      </el-form-item>

       <el-form-item label="签约特工:" prop="signUser" >
        <el-input width="200" v-model="listQuery.signUser" size="small" placeholder="签约特工" @keyup.enter.native="search"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="search" size="small" v-loading="searchLoading" @click="search">查询</el-button>
      </el-form-item>

      <el-form-item>
        <el-button size="small" @click="resetForm('searchForm')">重置</el-button>
      </el-form-item>

      <el-form-item>
        <el-button v-if="$store.getters.buttons.includes('upcontractpayExport')"
                   size="small"  @click="toExport">导出</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="list" v-loading="listLoading" border stripe fit style="width: 100%">

      <el-table-column min-width="180" label="合同编号" fixed align="center">
        <template slot-scope="scope">
           <el-button @click="toView(scope.row)" type="text">{{scope.row.contractCode}}</el-button>
        </template>
      </el-table-column>

      <el-table-column align="center" width="120" label="房源编号">
        <template slot-scope="scope">
          <span>{{scope.row.houseCode}}</span>
        </template>
      </el-table-column>

      <el-table-column width="130" label="门牌号">
        <template slot-scope="scope">
          <span>{{scope.row.houseNo}}号{{scope.row.houseRoomNo}}室</span>
        </template>
      </el-table-column>

      <el-table-column align="left"  min-width="180" label="小区名称">
        <template slot-scope="scope">
          <span>{{scope.row.neighborhoodCode}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="100" label="合同类型">
        <template slot-scope="scope">
          <span>{{scope.row.contractType}}</span>
        </template>
      </el-table-column>

      <el-table-column width="100" label="签约公司">
        <template slot-scope="scope">
          <span>{{scope.row.signCompany}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="150" label="业务模式">
        <template slot-scope="scope">
          <span>{{scope.row.businessModeCode}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="185" label="租期">
        <template slot-scope="scope">
          <span>{{scope.row.leaseDeadlineDateStart | dateStartFilter}}-{{scope.row.leaseDeadlineDateEnd | dateEndFilter}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="130" label="实际退租日期">
        <template slot-scope="scope">
          <span>{{scope.row.throwLeaseTime | leaseTimeFilter}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="110" label="第一年租金">
        <template slot-scope="scope">
          <span>{{scope.row.rentMoney}}元/月</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="100" label="付款方式">
        <template slot-scope="scope">
          <span>{{scope.row.paymentTypeCode}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="110" label="合同状态">
        <template slot-scope="scope">
          <span>{{scope.row.contractStatusValue }}</span>
        </template>
      </el-table-column>


      <el-table-column align="center" min-width="180" label="创建时间">
        <template slot-scope="scope">
          <span>{{scope.row.createTime | dateFilter}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="120" label="签约特工">
        <template slot-scope="scope">
          <span>{{scope.row.signUser}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="100" label="操作" fixed="right" v-if="$store.getters.buttons.includes('upstreamcontractRetire')" >
        <template slot-scope="scope">
          <el-button v-if="scope.row.contractStatusKey === '8002' && (scope.row.houseStatus==='1001' || scope.row.houseStatus==='1002')"  @click="handleClick(scope.row)" type="text">退租</el-button>
        </template>
      </el-table-column>

    </el-table>
    <div class="block pagination-container" style="text-align: right;">
      <pagination-modal :total=total :page.sync=listQuery.page :pageSize.sync=listQuery.pageSize @getList="getList"></pagination-modal>
    </div>
      <edit-modal v-if="showModal" @close="showModal = false" @refresh="getList" :dataId="dataId" :version="version" :dateStartTime="dateStartTime"></edit-modal>
  </div>
</template>

<script>
  import EditModal from './edit'
  import { selectCommunityListMyAll } from "@/api/house";
  import { upcontractList, exportUpContract } from "@/api/upContract";
  import Utils from "@/utils/common";
  import { signCompany, businessMode, contractType, paymentType, contractUpType, findNeighborhoodInfoMyAll } from "@/api/basedata";

  export default {
    name: "upcontractList",
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
        businessModeOptions: [],
        contractTypeOptions: [],
        paymentTypeOptions: [],
        statusOptions: [],
        dataId: "",
        version: null,
        total: 0,
        currentPage: 1,
        listQuery: {
          houseCode: "",
          contractCode: "",
          communityCode: "",
          neigbodCode: "",
          businessModeCode: "",
          signCompany: "",
          contractType: "",
          contractStatusKey: "",
          paymentTypeCode: "",
          handOverDateStart: null,
          handOverDateEnd: null,
          leaseDeadlineDateStart: null,
          leaseDeadlineDateEnd: null,
          throwLeaseTimeStart: null,
          throwLeaseTimeEnd: null,
          createTimeStart: null,
          createTimeEnd: null,
          signUser: "",
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
          date = date.substring(0, date.indexOf('.'));
          return date.replace(/-/g, ".");
        }
        return '-';
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
          return date.replace(/-/g, ".");
        }
        return "";
      }
    },
    created() {
      this.deadlineOptions();
      this.getList();
    },
    methods: {
      getList() {
        this.listLoading = true;
        upcontractList(this.listQuery).then(response => {
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
          this.listQuery.handOverDateStart = value + " 00:00:00";
        }
      },
      handOverDateEndChange(value) {
        if (value != null && value !== "") {
          this.listQuery.handOverDateEnd = value + " 23:59:59";
        }
      },
      leaseDeadlineDateStartChange(value) {
        if (value != null && value !== "") {
          this.listQuery.leaseDeadlineDateStart = value + " 00:00:00";
        }
      },
      leaseDeadlineDateEndChange(value) {
        if (value != null && value !== "") {
          this.listQuery.leaseDeadlineDateEnd = value + " 23:59:59";
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
          this.listQuery.createTimeStart = value + " 00:00:00";
        }
      },
      createTimeEndChange(value) {
        if (value != null && value !== "") {
          this.listQuery.createTimeEnd = value + " 23:59:59";
        }
      },
      toView(row) {
        this.$router.push({ path: `upstreamcontract/detailinfo/?contractCode=${row.contractCode}&statusName=${row.contractStatusValue}` });
      },
      deadlineOptions() {
        findNeighborhoodInfoMyAll().then(response => {
          this.neighborhoodCodeOptions = response.data;
        });
        selectCommunityListMyAll().then(response => {
          this.communityCodeOptions = response.data;
        });
        signCompany().then(response => {
          this.signCompanyOptions = response.data;
        });
        contractType().then(response => {
          this.contractTypeOptions = response.data;
        });
        businessMode().then(response => {
          this.businessModeOptions = response.data;
        });
        paymentType().then(response => {
          this.paymentTypeOptions = response.data;
        });
        contractUpType().then(response => {
          this.statusOptions = response.data;
        });
      },
      // 退租
      handleClick(item) {
        this.dataId = item.contractCode;
        this.version = item.version;
        this.dateStartTime = item.leaseDeadlineDateStart;
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
        exportUpContract(this.listQuery).then(response => {
        }).catch(error => {
          Utils.error(error);
        });
      }
    }
};
</script>

<style>
</style>
