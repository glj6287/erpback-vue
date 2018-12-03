<template>
  <div class="app-container calendar-list-container">
    <el-form class="form-container" :model="listQuery" :inline="true" ref="searchForm">
      <el-form-item label="房源编号" prop="houseCode">
        <el-input v-model="listQuery.houseCode" size="small" placeholder="房源编号" @keyup.enter.native="search"></el-input>
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

      <el-form-item label="社区名称" prop="communityCode">
        <el-select v-model="listQuery.communityCode" size="small" style="width: 174px;" clearable>
          <el-option v-for="item in communityCodeOptions" :key="item.communityCode" :label="item.communityName" :value="item.communityCode"></el-option>
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

      <el-form-item label="管家" prop="stewardName">
        <el-input v-model="listQuery.stewardName" size="small" placeholder="管家" @keyup.enter.native="search"></el-input>
      </el-form-item>

      <el-form-item label="房源状态" prop="status">
        <el-select v-model="listQuery.status" size="small" style="width: 174px;" clearable>
          <el-option v-for="item in statusOptions" :key="item.id" :label="item.dictValue" :value="item.dictCode"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="托管编号" prop="collocationCode">
        <el-input v-model="listQuery.collocationCode" size="small" placeholder="托管编号" @keyup.enter.native="search"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button size="small" type="primary" icon="search" v-loading="searchLoading" @click="search">查询</el-button>
        <el-button size="small" @click="resetForm('searchForm')">重置</el-button>
        <el-button v-if="$store.getters.buttons.includes('houseExport')"
                   size="small" type="primary" @click="exportHouse" v-loading="exportLoading" >导出</el-button>
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

      <el-table-column label="托管编号" width="100px">
        <template slot-scope="scope">
          <span v-if="scope.row.collocationCode == null ">无</span>
          <span v-else>{{scope.row.collocationCode}}</span>
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
          <span>{{scope.row.vacancyPeriod}}天</span>
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
      <el-table-column align="center" label="管家" width="150px">
        <template slot-scope="scope">
          <span>{{scope.row.stewardName}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" fixed="right" min-width="310px">
        <template slot-scope="scope">&nbsp;&nbsp;
          <el-button v-if="$store.getters.buttons.includes('houseImage')"
            @click="imageHandleClick(scope.row)" type="text" >图片</el-button>
          <el-button v-if="$store.getters.buttons.includes('houseUpdateSteward')"
                     @click="handleStewardClick(scope.row)" type="text" >修改管家</el-button>
          <el-button v-if="$store.getters.buttons.includes('houseEnableStatus') && (scope.row.status === '1006')"
                     @click="handleEnableClick(scope.row)" type="text" >启用</el-button>
          <el-button v-if="$store.getters.buttons.includes('houseEnableStatus') && (scope.row.status === '1001' || scope.row.status === '1002')"
                     @click="handleDisEnableClick(scope.row)" type="text" >停用</el-button>
          <el-button v-if="$store.getters.buttons.includes('houseUpdatePrice')"
                     @click="handlePriceClick(scope.row)" type="text" >修改价格</el-button>
          <el-button v-if="$store.getters.buttons.includes('houseDelete')"
                     @click="deleteClick(scope.row)" type="text" >删除</el-button>
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
  import { houseList, exportExcel, enableHouse, delHouse } from "@/api/house";
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
          signCompany: "",
          stewardName: "",
          status: "",
          collocationCode:"",
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
        houseList(this.listQuery).then(response => {
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
      exportHouse() {
        this.exportLoading = true;
        exportExcel(this.listQuery).then(response => {
          this.exportLoading = false;
        }).catch(error => {
          console.log(error);
          this.exportLoading = false;
        });
      },
      toView(row) {
        console.log(row + '11111111111');
        this.$router.push({ path: `detail/?houseCode=${row.houseCode}` });
      },
      // 图片展示
      imageHandleClick(row) {
        this.dataId = row.houseCode;
        this.showModal = true;
      },
      // 修改管家
      handleStewardClick(row) {
        this.dataId = row.houseCode;
        this.communityCode = row.communityCode;
        this.showStewardModal = true;
      },
      // 修改价格
      handlePriceClick(row) {
        this.dataId = row.houseCode;
        this.showPriceModal = true;
      },
      // 启用
      handleEnableClick(row) {
        this.$confirm('确定启用吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          enableHouse(row.houseCode, "1", row.version).then(response => {
            this.getList();
            Utils.success(`启用成功`);
          }).catch(error => {
            console.log(error)
            this.exportLoading = false;
          });
        }).catch(() => {
        });
      },
      // 停用
      handleDisEnableClick(row) {
        this.$confirm('确定停用吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
          enableHouse(row.houseCode, "2", row.version).then(response => {
            this.getList();
            Utils.success(`停用成功`);
          }).catch(error => {
            console.log(error)
            this.exportLoading = false;
          });
        }).catch(() => {
        });
      },
      // 逻辑删除房源 Added By KangHua 2018-10-08
      deleteClick(row) {
        this.$confirm("房源删除后无法再显示，您确定删除此房源吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          delHouse(row.houseCode, row.version).then(response => {
            this.getList();
            Utils.success(`删除成功`);
          }).catch(error => {
            console.log(error)
            this.exportLoading = false;
          });
        }).catch(() => {
        });
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
