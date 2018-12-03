<template>
  <div class="app-container calendar-list-container">
    <el-form class="form-container" :model="listQuery" :inline="true" ref="searchForm">
      <el-form-item label="房源编号" prop="houseCode">
        <el-input v-model="listQuery.houseCode" size="small" placeholder="房源编号" @keyup.enter.native="search"></el-input>
      </el-form-item>

      <el-form-item label="社区名称" prop="communityCode">
        <el-select v-model="listQuery.communityCode" size="small" style="width: 174px;" clearable>
          <el-option v-for="item in communityCodeOptions" :key="item.communityCode" :label="item.communityName" :value="item.communityCode"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="小区名称" prop="neighborhoodCode">
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


      <el-form-item label="照片状态" prop="isHavePhoto">
        <el-select v-model="listQuery.isHavePhoto" size="small" style="width: 174px;" clearable>
          <el-option v-for="item in imageStatusOptions" :key="item.value" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="门牌号" prop="houseNo">
        <el-row :gutter="2" >
          <el-col :span="4"><div class="grid-content bg-purple"><el-input v-model="listQuery.houseNo" size="small" placeholder="门牌号" @keyup.enter.native="search"/></div></el-col>
          <el-col :span="1"><div class="grid-content bg-purple">号</div></el-col>
         <el-form-item  prop="houseRoomNo">
          <el-col :span="8"><div class="grid-content bg-purple"><el-input v-model="listQuery.houseRoomNo" size="small" placeholder="门牌室" @keyup.enter.native="search" /></div></el-col>
          <el-col :span="1">室</el-col>
         </el-form-item>
        </el-row>
      </el-form-item>
      <el-form-item label="所属公司" prop="signCompany">
        <el-select v-model="listQuery.signCompany" size="small" style="width: 174px;" clearable>
          <el-option v-for="item in companyOptions" :key="item.id" :label="item.dictValue" :value="item.dictCode"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="房源状态" prop="status">
        <el-select v-model="listQuery.status" size="small" style="width: 174px;" clearable>
          <el-option v-for="item in statusOptions" :key="item.id" :label="item.dictValue" :value="item.dictCode"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否删除" prop="isDeleted">
        <el-select v-model="listQuery.isDeleted" size="small" style="width: 174px;" clearable>
          <el-option v-for="item in isDeletedOptions" :key="item.value" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="管家" prop="stewardName">
        <el-input v-model="listQuery.stewardName" size="small" placeholder="管家" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="search" v-loading="searchLoading" @click="search">查询</el-button>
        <el-button size="small" @click="resetForm('searchForm')">重置</el-button>
        <!--<el-button v-if="$store.getters.buttons.includes('houseExport')" size="small" type="primary" @click="exportHouse" v-loading="exportLoading" >导出</el-button>-->
      </el-form-item>
    </el-form>

    <el-table :data="list" v-loading="listLoading" border stripe fit  style="width: 100%">

      <el-table-column label="房源编号" align="center" fixed width="150px">
        <template slot-scope="scope" >
          <el-button @click="toView(scope.row)" type="text">{{scope.row.houseCode}}</el-button>
          <!--<span>{{ scope.row.houseCode }}</span>-->
        </template>
      </el-table-column>

      <el-table-column label="所属公司" width="100px">
        <template slot-scope="scope">
          <span>{{scope.row.signCompanyName}}</span>
        </template>
      </el-table-column>

      <el-table-column label="社区名称" width="150px">
        <template slot-scope="scope">
          <span>{{scope.row.communityName}}</span>
        </template>
      </el-table-column>

      <el-table-column label="小区名称" min-width="180px">
        <template slot-scope="scope">
          <span>{{scope.row.neighborhoodName}}</span>
        </template>
      </el-table-column>

      <el-table-column label="门牌号" width="150px">
        <template slot-scope="scope">
          <span>{{scope.row.houseNoText}}</span>
        </template>
      </el-table-column>

      <el-table-column label="房型" width="150px">
        <template slot-scope="scope">
          <span>{{scope.row.layoutText}}</span>
        </template>
      </el-table-column>

      <el-table-column label="面积" width="100px">
        <template slot-scope="scope">
          <span>{{scope.row.houseArea}}㎡</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="拿房价" width="150px" v-if="$store.getters.buttons.includes('btnTakeHousePrice')">
        <template slot-scope="scope">
          <span>{{scope.row.takeHousePrice}}元/月</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="底价" width="150px" v-if="$store.getters.buttons.includes('btnFixedPrice')">
        <template slot-scope="scope">
          <span>{{scope.row.fixedPrice}}元/月</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="售价" width="150px">
        <template slot-scope="scope">
          <span>{{scope.row.sellingPrice}}元/月</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="照片状态" width="100px">
        <template slot-scope="scope">
          <span>{{scope.row.isHavePhoto | isHavePhotoFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="空置期" width="100px">
        <template slot-scope="scope">
          <span v-if="scope.row.vacancyPeriod === null" style="color: #cccccc;">无</span>
          <span v-if="scope.row.vacancyPeriod !== null">{{scope.row.vacancyPeriod}}天</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="房源状态" width="100px">
        <template slot-scope="scope">
          <span>{{scope.row.status | statusFilter}}</span>
        </template>
      </el-table-column>
      <!--<el-table-column align="center" label="远期房态" width="100px">-->
        <!--<template scope="scope">-->
          <!--<span></span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center" label="是否删除" width="100px">
        <template slot-scope="scope">
          <span v-if="scope.row.isDeleted === true" style="color: #c03639;">是</span>
          <span v-if="scope.row.isDeleted == false">否</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="管家" width="150px">
        <template slot-scope="scope">
          <span>{{scope.row.stewardName}}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination-modal :total=total :page.sync=listQuery.page :pageSize.sync=listQuery.pageSize @getList="getList"></pagination-modal>
    <edit-modal v-if="showModal" @close="showModal = false" :dataId="dataId"></edit-modal>
    <steward-modal v-if="showStewardModal" @close="showStewardModal = false" @refresh="getList" :dataId="dataId" :communityCode="communityCode"></steward-modal>
    <price-modal v-if="showPriceModal" @close="showPriceModal = false" @refresh="getList" :dataId="dataId"></price-modal>

  </div>
</template>

<script>
  import EditModal from "./imageedit";
  import StewardModal from "./stewardedit";
  import PriceModal from "./priceedit";
  import Utils from "@/utils/common";
  import { pageAll } from "@/api/house";
  import { findNeighborhoodInfoMyAll, selectCommunityListMyAll, houseStatus, signCompany } from "@/api/basedata";

  export default {
    name: "houseList",
    components: {
      EditModal,
      StewardModal,
      PriceModal
    },
    data() {
      return {
        list: null,
        listLoading: false,
        searchLoading: false,
        exportLoading: false,
        showModal: false,
        showStewardModal: false,
        showPriceModal: false,
        dataId: "",
        communityCode: "",
        neighborhoodCodeOptions: [],
        communityCodeOptions: [],
        imageStatusOptions: [
          { value: true, name: "有" },
          { value: false, name: "无" }
        ],
        isDeletedOptions: [
          { value: true, name: "是" },
          { value: false, name: "否" }
        ],
        companyOptions: [],
        statusOptions: [],
        total: 0,
        listQuery: {
          houseCode: "",
          neighborhoodCode: "",
          houseNo: "",
          houseRoomNo: "",
          communityCode: "",
          isHavePhoto: null,
          isDeleted: false,
          signCompany: "",
          stewardName: "",
          status: "",
          page: 1,
          pageSize: 10
        }
      };
    },
    filters: {
      statusFilter(status) {
        const stateMap = {
          "1001": "配置中",
          "1002": "可出租",
          "1003": "已锁定",
          "1004": "已出租",
          "1005": "已入住",
          "1006": "已停用",
          "1007": "已作废"
        };
        return stateMap[status];
      },
      isHavePhotoFilter(isHavePhoto) {
        const stateMap = {
          true: "有",
          false: "无"
        };
        return stateMap[isHavePhoto];
      }
    },
    created() {
      this.deadlineOptions();
      this.getList();
    },
    methods: {
      getList() {
        this.listLoading = true;
        pageAll(this.listQuery).then(response => {
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
      deadlineOptions() {
        findNeighborhoodInfoMyAll().then(response => {
          this.neighborhoodCodeOptions = response.data;
        });
        selectCommunityListMyAll().then(response => {
          this.communityCodeOptions = response.data;
        });
        houseStatus().then(response => {
          this.statusOptions = response.data;
        });
        signCompany().then(response => {
          this.companyOptions = response.data;
        });
      },
      // exportHouse() {
      //   this.exportLoading = true;
      //   exportExcel(this.listQuery).then(response => {
      //     this.exportLoading = false;
      //   }).catch(error => {
      //     console.log(error);
      //     this.exportLoading = false;
      //   });
      // },
      toView(row) {
        console.log(row);
        this.$router.push({ path: `detail/?houseCode=${row.houseCode}` });
      },
      search() {
        this.searchLoading = true;
        this.listQuery.page = 1;
        this.getList();
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>
