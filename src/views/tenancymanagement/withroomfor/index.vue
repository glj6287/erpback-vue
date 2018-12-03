<template>
  <div class="app-container calendar-list-container">
    <el-form class="form-container" :model="listQuery" :inline="true" label-width="100px" ref="searchForm">
      <el-form-item label="申请单号:" prop="applyCode">
        <el-input v-model="listQuery.applyCode" size="small" placeholder="申请单号" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item label="房源编号:" prop="houseCode">
        <el-input v-model="listQuery.houseCode" size="small" placeholder="房源编号" @keyup.enter.native="search"></el-input>
      </el-form-item>

      <el-form-item label="小区名称:" prop="neighborhoodCode">
        <!-- <el-select v-model="listQuery.neighborhoodCode" size="small" style="width: 174px;" clearable>
          <el-option v-for="item in neighborhoodCodeOptions" :key="item.neigbodCode" :label="item.name" :value="item.neigbodCode"></el-option>
        </el-select> -->
         <el-select
              v-model="listQuery.neighborhoodCode"
              size="small"
              filterable
              remote
              reserve-keyword
              placeholder="请输入小区名称"
              clearable>
              <el-option
                v-for="item in neighborhoodCodeOptions"
                :key="item.neigbodCode"
                :label="item.name"
                :value="item.neigbodCode">
              </el-option>
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

      <el-form-item label="社区名称:" prop="communityCode">
        <el-select v-model="listQuery.communityCode" size="small" style="width: 174px;" clearable>
          <el-option v-for="item in communityCodeOptions" :key="item.communityCode" :label="item.communityName" :value="item.communityCode"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="状态:" prop="applyStatus" >
        <el-select v-model="listQuery.applyStatus" size="small" style="width: 174px" clearable>
          <el-option v-for="item in applyStatusOptions" :key="item.dictValue" :label="item.dictValue" :value="item.dictCode"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="申请特工:" prop="creatorName" >
        <el-input width="2000" v-model="listQuery.creatorName" size="small" placeholder="申请特工" @keyup.enter.native="search"></el-input>
      </el-form-item>

      <el-form-item style="margin-left:43px;">
        <el-button type="primary" icon="search" size="small" v-loading="searchLoading" @click="search">查询</el-button>
      </el-form-item>

      <el-form-item>
        <el-button size="small" @click="resetForm('searchForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="list" v-loading="listLoading" border stripe fit style="width: 100%">

      <el-table-column min-width="180" label="申请单号" align="center" fixed>
        <template slot-scope="scope">
          <el-button @click="toView(scope.row)" type="text">{{scope.row.applyCode}}</el-button>
        </template>
      </el-table-column>

      <el-table-column  width="180" label="合同类型" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.contractTypeText}}</span>
        </template>
      </el-table-column>

      <el-table-column width="120" label="签约公司" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.signCompanyText}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="业务模式" min-width="155" >
        <template slot-scope="scope">
          <span>{{scope.row.businessModeText}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="120" label="房源编号">
        <template slot-scope="scope">
          <span>{{scope.row.houseCode}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center"  min-width="170" label="社区名称">
        <template slot-scope="scope">
          <span>{{scope.row.communityName}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="180" label="小区名称" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.neighborhoodName}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="120" label="门牌号">
        <template slot-scope="scope">
          <span>{{scope.row.houseNoText}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="110" label="房型">
        <template slot-scope="scope">
          <span>{{scope.row.layoutText}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="110" label="面积">
        <template slot-scope="scope">
          <span>{{scope.row.houseArea}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="110" label="租约期限">
        <template slot-scope="scope">
          <span>{{scope.row.leaseDeadline}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="110" label="第一年租金">
        <template slot-scope="scope">
          <span>{{scope.row.monthMoney }}元/月</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="状态" >
        <template slot-scope="scope">
          <span>{{scope.row.applyStatusText}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="165" label="申请时间">
        <template slot-scope="scope">
          <span>{{scope.row.applyDate}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="100" label="申请特工">
        <template slot-scope="scope">
          <span>{{scope.row.creatorName}}</span>
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

  </div>
</template>

<script>
  import { findNeighborhoodInfoMyAll, selectCommunityListMyAll, getHouseApplyList } from "@/api/house";
  import { houseOrderStatus } from "@/api/basedata";

  export default {
    name: "withroomforList",
    data() {
      return {
        showModal: false,
        list: null,
        neighborhoodCodeOptions: [],
        communityCodeOptions: [],
        applyStatusOptions: [],
        agreementNo: "", // 协议编号
        listLoading: false,
        searchLoading: false,
        validOptions: [],
        currentPage: 1,
        itemStatusKey: "",
        total: 0,
        listQuery: {
          applyCode: "",
          houseCode: "",
          communityCode: "",
          neighborhoodCode: "",
          houseNo: "",
          houseRoomNo: "",
          applyStatus: "",
          creatorName: "",
          page: 1,
          pageSize: 10
        }
      };
    },
    filters: {
      formatTime(date) {
        if (date) {
          return date.substring(0, date.indexOf("."));
        }
        return "-";
      }
    },
    created() {
      this.getList();
      this.neighborhoodCodes();
      this.selectCommunityCode();
      this.selectHouseOrderStatus();
    },
    methods: {
      getList() {
        this.listLoading = false;
        getHouseApplyList(this.listQuery)
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
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.listQuery.houseRoomNo = "";
      },
      // contractStartChange(value) {
      //   this.listQuery.contractDateStart = value;
      // },
      // contractEndChange(value) {
      //   this.contractDateEnd = value;
      // },
      // creditedStartChange(value) {
      //   this.creditedDateStart = value;
      // },
      // creditedEndChange(value) {
      //   this.creditedDateEnd = value;
      // },
      // handleEdit(row) {
      //   this.agreementNo = row.agreementNo;
      //   this.showModal = true;
      // },

      // 当前用户下的所有的小区
      neighborhoodCodes() {
        findNeighborhoodInfoMyAll(null).then(response => {
          this.neighborhoodCodeOptions = response.data;
        });
      },
      // 当前用户下的所有社区
      selectCommunityCode() {
        selectCommunityListMyAll().then(response => {
          this.communityCodeOptions = response.data;
        });
      },
      // 所有拿房状态
      selectHouseOrderStatus() {
        houseOrderStatus().then(response => {
          this.applyStatusOptions = response.data;
        });
      },
      toView(row) {
        this.$router.push({ path: `withroomfor/housecollection/?applyCode=${row.applyCode}&applyStatusText=${row.applyStatusText}` });
      }
    }
};
</script>
<style scoped>
.form-static {
  padding: 0 10px;
}
</style>

