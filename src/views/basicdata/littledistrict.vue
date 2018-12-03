<template>
  <div class="app-container">
    <el-form class="form-container" :model="listQuery" :inline="true" label-width="100px" ref="searchForm">
      <el-form-item label="小区名称:" prop="name">
        <el-input v-model="listQuery.name" size="small" placeholder="请输入小区名称" @keyup.enter.native="search"></el-input>
      </el-form-item>
       <el-form-item label="社区名称:" prop="communityCode">
        <!-- <el-input v-model="listQuery.custName" size="small" placeholder="请输入" @keyup.enter.native="search"></el-input> -->
        <el-select v-model="listQuery.communityCode" placeholder="请选择" size="small" clearable  @keyup.enter.native="search">
          <el-option
            v-for="item in options1"
            :key="item.id"
            :label="item.name"
            :value="item.communityCode">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="search" size="small" v-loading="searchLoading" @click="search">查询</el-button>
      </el-form-item>

      <el-form-item>
        <el-button v-if="$store.getters.buttons.includes('littledistrictAdd')"
          size="small" type="success" icon="plus" @click="showAddDialog()">添加</el-button>
        <!-- v-if="$store.getters.buttons.includes('btnOrgUserAdd')" -->
      </el-form-item>

    </el-form>
     <el-table :data="list" v-loading="listLoading" border stripe fit style="width: 100%">
       <el-table-column align="center" max-width="100" label="社区编码">
         <template slot-scope="scope">
           <span>{{scope.row.communityCode}}</span>
         </template>
       </el-table-column>

      <el-table-column align="left" max-width="150" label="小区名称">
        <template slot-scope="scope">
         <el-button @click="toView(scope.row)" type="text">{{scope.row.name}}</el-button>
        </template>
      </el-table-column>

       <el-table-column align="left" max-width="300" label="小区地址">
        <template slot-scope="scope">
          <span>{{scope.row.province}}{{scope.row.city}}{{scope.row.area}}{{scope.row.address}}</span>
        </template>
      </el-table-column>

      <el-table-column v-if="$store.getters.buttons.includes('littledistrictUpdate') || $store.getters.buttons.includes('littledistrictDelete')"
                 max-width="100px"
                  align="center"
                  label="操作">
        <template slot-scope="scope">
        <el-button v-if="$store.getters.buttons.includes('littledistrictUpdate')"
          type="text" size="small" class="preview-img"
                   @click="showEditDialog(scope.row)">
                      修改
        </el-button>
        <el-button v-if="$store.getters.buttons.includes('littledistrictDelete')"
          @click.native.prevent="deleteFile(scope.row)" type="text" size="small">
                      删除
        </el-button>
        </template>
      </el-table-column>

    </el-table>
     <newdistrict-modal v-if="showModal" @close="showModal = false" @getList="getList" :neigbodCode=neigbodCode :isEdit="isEdit"></newdistrict-modal>
     <pagination-modal style="text-align:left;" :total=total :page.sync=listQuery.page :pageSize.sync=listQuery.pageSize @getList=getList></pagination-modal>
     <!-- @getList="getList" -->
    </div>
</template>

<script>
import {
  getLittleList,
  getCommunityList,
  deleteMenuBtn
} from "@/api/littledistrict";
import NewdistrictModal from "./newdistrict";
import Utils from "@/utils/common";
export default {
  name: "littledistrict",
  components: {
    NewdistrictModal
  },
  data() {
    return {
      listQuery: {
        page: 1,
        pageSize: 10,
        name: "",
        communityCode: "",
        neihodId: "",
        neigbodCode: ""
      },
      neighborhoodCodeOptions: [],
      neigbodCode: "",
      isEdit: false,
      showModal: false,
      list: null,
      searchLoading: false,
      listLoading: false,
      total: 0,
      currentPage: 1,
      options1: []
    };
  },
  created() {
    this.getcommunityCode();
    this.getList();
  },
  methods: {
    getcommunityCode() {
      getCommunityList(this.listQuery).then(response => {
        response.data.Item.forEach(ele => {
          this.options1.push(ele);
        });
      });
    },

    getList() {
      this.listLoading = true;
      getLittleList(this.listQuery)
        .then(response => {
          console.log(response.data.Item)
          this.list = response.data.Item;
          this.total = response.count;
          this.listLoading = false;
          this.searchLoading = false;
        })
        .catch(error => {
          this.listLoading = false;
          this.searchLoading = false;
        });
    },
    //删除
    deleteFile(row) {
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.listLoading = true;
        deleteMenuBtn(row.neigbodCode, row.version)
          .then(response => {
            this.listLoading = false;
            Utils.success("删除成功");
            this.getList();
          })
          .catch(error => {
            Utils.error(error);
            this.listLoading = false;
          });
      });
    },
    //下拉选择项改变一个就请求数据
    // searchCommunity(){
    //   this.getList()
    // },
    search() {
      this.searchLoading = true;
      this.listQuery.pag = 1;
      this.getList();
    },
    showEditDialog(item) {
      // console.log(12121212);
      // console.log(this.neigbodCode);
      this.neigbodCode = item.neigbodCode;
      this.isEdit = true;
      this.showModal = true;
    },
    showAddDialog() {
      this.isEdit = false;
      this.showModal = true;
    },
    toView(row) {
      console.log("ok")
      console.log(row.neigbodCode)
      this.$router.push({ path: `/basicdata/moduledetails/?neigbodCode=${row.neigbodCode}` });
      // /${row.agreementNo}
    },
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
