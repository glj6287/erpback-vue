<template>
  <div class="app-container">
    <el-form class="form-container" :model="listQuery" :inline="true" label-width="100px" ref="searchForm">
      <el-form-item label="社区名称:" prop="name">
        <el-input v-model="listQuery.name" size="small" placeholder="请输入" @keyup.enter.native="search"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="search" size="small" v-loading="searchLoading" @click="search">查询</el-button>
      </el-form-item>

      <el-form-item>
        <el-button v-if="$store.getters.buttons.includes('communityAdd')"
          size="small" type="success" icon="plus" @click="showAddDialog">添加</el-button>
        <!-- v-if="$store.getters.buttons.includes('btnOrgUserAdd')" -->
      </el-form-item>

    </el-form>
     <el-table :data="list" v-loading="listLoading" border stripe fit style="width: 100%">

      <el-table-column align="center" min-width="100" label="编号">
        <template slot-scope="scope">
          <span>{{scope.row.communityCode}}</span>
        </template>
      </el-table-column>

      <el-table-column align="left" min-width="180" label="社区名称">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
<!--
       <el-table-column align="left" min-width="180" label="备注">
         <template scope="scope">
           <span>{{scope.row.remarks}}</span>
         </template>
       </el-table-column>
-->

      <el-table-column v-if="$store.getters.buttons.includes('communityUpdate') || $store.getters.buttons.includes('communityDelete')"
                 min-width="80px"
                  align="center"
                  label="操作">
        <template slot-scope="scope">
        <el-button v-if="$store.getters.buttons.includes('communityUpdate')"
          type="text" size="small" class="preview-img"
                   @click="showEditDialog(scope.row)">
                      修改
        </el-button>
        <el-button v-if="$store.getters.buttons.includes('communityDelete')"
          @click.native.prevent="deleteFile(scope.row)" type="text" size="small">
                      删除
        </el-button>
        </template>
      </el-table-column>

    </el-table>
     <edit-modal v-if="showModal" @close="showModal = false" @getList="getList" :isEdit="isEdit" :name="name" :id=id :version=version></edit-modal>
     <pagination-modal style="text-align:left;" :total=total  :page.sync=listQuery.page  :pageSize.sync=listQuery.size  @getList="getList"></pagination-modal>

    </div>
</template>

<script>
import { getCommunityList,deleteMenuBtn} from "@/api/community";
import Utils from "@/utils/common";
import EditModal from "./edit";
export default {
  name: "community",
  components: {
    EditModal
  },
  data() {
    return {
      listQuery: {
        page: 1,
        size: 10,
        name: "",
        id: "",
        communityCode: ""
      },
      name: "",
      id: null,
      version: null,
      isEdit: false,
      showModal: false,
      list: null,
      searchLoading: false,
      listLoading: false,
      total: 0
      // currentPage: 1
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      getCommunityList(this.listQuery)
        .then(response => {
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

    search() {
      this.searchLoading = true;
      this.listQuery.page = 1;
      this.getList();
    },
    showEditDialog(item) {
      this.id = item.id;
      this.name = item.name;
      this.version = item.version;
      this.isEdit = true;
      this.showModal = true;
    },
    showAddDialog() {
      this.name = ""
      this.isEdit = false;
      this.showModal = true;
    },
     deleteFile(row) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        console.log(row.version)
        deleteMenuBtn(row.id, row.version).then(response => {
          this.listLoading = false
          Utils.success(`${response.code == "000000" ? "此社区已删除！" : "该社区下有有效的小区关联，不能删除！"}`)
          this.getList()
        }).catch(error => {
          Utils.error(error)
          this.listLoading = false
        })
      })
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
