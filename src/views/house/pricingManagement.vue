<template>
  <div class="app-container">
    <el-form class="form-container"  :model="listQuery"  :inline="true" ref="searchForm">

      <el-form-item label="小区名称:" prop="neigbodCode">
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

      <el-form-item label="房型" prop="company">
        <el-input-number v-model="listQuery.layoutRoom" controls-position="right"  :min="0" :max="10"></el-input-number>
        室
        <el-input-number v-model="listQuery.layoutHall" controls-position="right"  :min="0" :max="10"></el-input-number>
        厅
        <el-input-number v-model="listQuery.layoutToilet" controls-position="right"  :min="0" :max="10"></el-input-number>
        卫
      </el-form-item>

      <el-form-item label="面积" prop="houseArea">
                <el-input v-model="listQuery.houseArea" size="small" placeholder="请面积" @keyup.enter.native="search" style="width:80px"></el-input>
      </el-form-item>

      <el-form-item label="房源编号" prop="houseCode">
        <el-input v-model="listQuery.houseCode" size="small" placeholder="房源编号" @keyup.enter.native="search"></el-input>
      </el-form-item>

      <el-form-item label="门牌号">
        <el-input v-model="listQuery.houseNo" size="small" placeholder="门牌号" @keyup.enter.native="search" style="width:80px"></el-input>
        号
        <el-input v-model="listQuery.houseRoomNo" size="small" placeholder="门牌室" @keyup.enter.native="search" style="width:80px"></el-input>
        室
      </el-form-item>

      <el-form-item>
        <el-button size="small" type="primary" icon="search" v-loading="searchLoading" @click="search()">计算</el-button>
        <el-button size="small" v-loading="searchLoading" @click="addVillage">添加小区</el-button>
        <el-button size="small" @click="resetForm('searchForm')">重置</el-button>
      </el-form-item>
    </el-form>


    <el-table :data="list" v-loading="listLoading" border stripe fit style="width: 100%" tooltip-effect="dark">

      <el-table-column label="房源编号" align="center" fixed min-width="110">
        <template slot-scope="scope">
            <el-button @click="toView(scope.row.houseCode)" type="text">{{scope.row.houseCode}}</el-button>
        </template>
      </el-table-column>

      <el-table-column align="center" label="社区名称" min-width="150">
        <template slot-scope="scope">
          <span>{{scope.row.communityName}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="小区名称" min-width="150">
        <template slot-scope="scope">
          <span>{{scope.row.neigbodName}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="门牌号" min-width="150">
        <template slot-scope="scope">
          <span>{{scope.row.houseNoText}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="房型" min-width="150">
        <template slot-scope="scope">
          <span>{{scope.row.layoutText}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="面积" min-width="150">
        <template slot-scope="scope">
          <span>{{scope.row.houseArea}}㎡</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="推荐出租价格" min-width="150">
        <template slot-scope="scope">
          <span>{{scope.row.recommendRentalPrice}}元</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="房源级别" min-width="200">
        <template slot-scope="scope">
          <span style="color:blue;">正在努力研发，下次见哟...</span>
          <!--<span>{{scope.row.houseType}}</span>-->
        </template>
      </el-table-column>

      <el-table-column align="center" label="数据来源" min-width="180">
        <template slot-scope="scope">
          <span>{{scope.row.dataSource}}</span>
        </template>
      </el-table-column>
    </el-table>

   <pagination-modal :total=total :page.sync=listQuery.page :pageSize.sync=listQuery.pageSize @getList="pricingList"></pagination-modal>

  </div>
</template>
<script>
import { pricingList } from "@/api/pricing";
import { findNeighborhoodInfoMyAll } from "@/api/basedata";
  import Utils from "@/utils/common";
export default {
  data() {
    return {
      list: null,
      listLoading: false,
      exitOptions: [{ dictCode: "aa", dictValue: "aa" }],
      neighborhoodCodeOptions: [],
      searchLoading: false,
      total: 0,
      listQuery: {
        neigbodCode: "",
        houseCode: "",
        houseNo: "",
        houseRoomNo: "",
        layoutRoom: "",
        layoutHall: "",
        layoutToilet: "",
        houseArea: "",
        page: 1,
        pageSize: 5
      }
    };
  },
  created() {
    this.deadlineOptions();
  },
  methods: {
    pricingList() {
      this.listLoading = true;
      pricingList(this.listQuery)
        .then(response => {
          // console.log(response.data);
          this.list = response.data.list;
          this.total = response.data.total;
          this.listLoading = false;
          this.searchLoading = false;
        })
        .catch(error => {
          this.listLoading = false;
          this.searchLoading = false;
        });
    },
    deadlineOptions() {
      findNeighborhoodInfoMyAll(null).then(response => {
        // console.log(response.data);
        this.neighborhoodCodeOptions = response.data;
      });
    },
    toView(row) {
      this.$router.push({ path: `detail/?houseCode=${row.houseCode}` });
    },
    search() { 
      if(this.listQuery.neigbodCode == "" || this.listQuery.neigbodCode == null){
         return Utils.info('请选择小区名称！')
      }
      this.searchLoading = true;
      this.listQuery.page = 1;
      this.pricingList();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //添加小区
    addVillage() {
      this.$router.push({ path: `/basicdata/littledistrict` });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-message-box__header {
  padding: 0 !important;
}
.el-message-box__content {
  font-size: 18px !important;
}
</style>
