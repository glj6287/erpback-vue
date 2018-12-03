<template>
  <div class="app-container"> 
      <div class="updateType">上传类型</div>
      <el-row class="btn_block">
        <el-col :span="24">
            <div class="grid-content bg-purple-dark">
                <el-button type="primary" @click="updataHandleClick">更新金蝶核算项目</el-button>
            </div>
        </el-col>
      </el-row>
       <el-row>
        <el-col :span="24">
            <div class="grid-content bg-purple-dark">
                <div class="updateType">金蝶数据库名设置</div>
               <el-form class="form-container"  :inline="true"  ref="searchForm">
                    <el-form-item label="年份:" prop="communityCode">
                        <!-- <el-input v-model="listQuery.custName" size="small" placeholder="请输入" @keyup.enter.native="search"></el-input> -->
                        <el-select v-model="vintage" placeholder="请选择" size="small" clearable  @keyup.enter.native="search">
                            <el-option
                                v-for="item in options1"
                                :key="item.dictCode"
                                :label="item.dictValue"
                                :value="item.dictValue">
                            </el-option>
                        </el-select>

                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" icon="search" size="small" v-loading="searchLoading" @click="search">查询</el-button>
                    </el-form-item>
                    
                    <el-form-item>
                        <el-button
                        size="small" type="success" icon="plus" @click="showAddDialog()">新增</el-button>
                    </el-form-item>
                </el-form>
               <el-table :data="list" v-loading="listLoading" border stripe fit style="width: 100%">
                    <el-table-column align="center" max-width="100" label="年份">
                        <template slot-scope="scope">
                        <span>{{scope.row.communityCode}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column align="center" max-width="150" label="数据库名称">
                        <template slot-scope="scope">
                        <el-button @click="toView(scope.row)" type="text">{{scope.row.name}}</el-button>
                        </template>
                    </el-table-column>

                    <el-table-column 
                                max-width="100px"
                                align="center"
                                label="操作">
                        <template slot-scope="scope">
                         <el-button  @click.native.prevent="deleteFile(scope.row)" type="text" size="small">删除</el-button>                                        
                        </template>
                    </el-table-column>
             </el-table> 
            </div>
        </el-col>
      </el-row>
     <edit-modal v-if="showModal" @close="showModal = false"  @getList="getList"></edit-modal>
     <add-modal v-if="showAddModal" @close="showAddModal = false"  @getList="getList"></add-modal>
     <!-- <pagination-modal style="text-align:left;" :total=total  :page.sync=listQuery.page  :pageSize.sync=listQuery.size  @getList="getList"></pagination-modal> -->
    </div>
</template>

<script>
import { getDataNameConfig } from "@/api/jdDataProcessing";
import Utils from "@/utils/common";
import EditModal from "./selectYearEdit";
import AddModal from "./addDateBaseEdit";
export default {
  name: "jdDataProcessing",
  components: {
    EditModal,
    AddModal
  },
  data() {
    return {
      vintage: "",
      list: null,
      listLoading: false,
      searchLoading: false,
      showModal: false,
      showAddModal: false,
      options1: [
        { dictCode: "2017", dictValue: "2017" },
        { dictCode: "2018", dictValue: "2018" },
        { dictCode: "2019", dictValue: "2019" },
        { dictCode: "2020", dictValue: "2020" },
        { dictCode: "2021", dictValue: "2021" },
        { dictCode: "2022", dictValue: "2022" }
      ]
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      getDataNameConfig(this.vintage)
        .then(response => {
          this.listLoading = true;
        })
        .catch(error => {
          this.listLoading = false;
        });
    },
    search() {
      this.getList();
    },
    updataHandleClick() {
      this.showModal = !false;
    },
    //新增
    showAddDialog(){
      this.showAddModal = !false  
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.updateType {
  margin-bottom: 40px;
}
.btn_block {
  margin-bottom: 80px;
}
</style>
