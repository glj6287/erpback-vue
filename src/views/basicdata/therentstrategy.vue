<template>
  <div class="app-container">
    <el-form class="form-container" :model="listQuery" :inline="true" label-width="100px" ref="searchForm">
      <el-form-item label="付款方式:" prop="paymentTypeKey">
        <el-select v-model="listQuery.paymentTypeKey" value-key="paymentTypeKey"  placeholder="请选择" clearable>
          <el-option
            v-for="item in options4"
            :key="item.dictCode"
            :label="item.dictValue"
            :value="item.dictCode">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="可用租期:" prop="month">
        <el-input v-model="listQuery.month" size="small" placeholder="请输入期数值" @keyup.enter.native="search"></el-input>
      </el-form-item>

      <el-form-item label="是否启用:" prop="isDeleted">
        <el-select v-model="listQuery.isDeleted" value-key="isDeleted"  placeholder="请选择" clearable>
          <el-option
            v-for="item in stateOptions"
            :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="search" size="small" v-loading="searchLoading" @click="search">查询</el-button>
      </el-form-item>

    </el-form>
    <el-table :data="list" v-loading="listLoading" border stripe fit style="width: 100%">
      <el-table-column align="center" max-width="150" label="编号">
        <template slot-scope="scope">
          <span>{{scope.row.rentstrategyCode}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" max-width="200" label="付款方式">
        <template slot-scope="scope">
          <span>{{scope.row.paymentTypeValue}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" max-width="200" label="折扣（折）">
        <template slot-scope="scope">
          <span>{{scope.row.discount}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" max-width="200" label="是否是金融产品">
        <template slot-scope="scope">
          <span v-if="scope.row.isFinancialProducts == 0">{{scope.row.isFinancialProducts | statusfilter}}</span>
          <span v-if="scope.row.isFinancialProducts == 1" style="color:#c03639">{{scope.row.isFinancialProducts | statusfilter}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" max-width="200" label="是否启用">
        <template slot-scope="scope">
          <span v-if="scope.row.isDeleted == 0">{{scope.row.isDeleted | statusfilter}}</span>
          <span v-if="scope.row.isDeleted == 1" style="color:#c03639">{{scope.row.isDeleted | statusfilter}}</span>
        </template>
      </el-table-column>

      <el-table-column align="left" max-width="300" label="可用租期">
        <template slot-scope="scope">
          <span>{{scope.row.minmonth | minfilter}}{{scope.row.maxmonth | maxfilter}}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="$store.getters.buttons.includes('therentstrategyUpdate') || $store.getters.buttons.includes('therentstrategyDelete')"
        max-width="100px"
        align="center"
        label="操作">
        <template slot-scope="scope" >
          <el-button v-if="$store.getters.buttons.includes('therentstrategyUpdate')"
                     type="text" size="small" class="preview-img"
                     @click="showEditDialog(scope.row)">
            修改
          </el-button>
          <!--<el-button v-if="$store.getters.buttons.includes('therentstrategyDelete')"-->
                     <!--@click="deletel(scope.row)" type="text" size="small">删除-->
          <!--</el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <el-form class="form-container" :inline="true" label-width="100px" ref="searchForm">
      <el-form-item>
        <el-button v-if="$store.getters.buttons.includes('therentstrategyAdd')"
                   size="small" type="success" icon="plus" @click="showAddDialog()">添加</el-button>
        <!-- v-if="$store.getters.buttons.includes('btnOrgUserAdd')" -->
      </el-form-item>
    </el-form>

    <newdistrict-modal v-if="showModal" @close="showModal = false" @getList="getList" :rentstrategyCode=rentstrategyCode :isEdit="isEdit"></newdistrict-modal>
    <pagination-modal style="text-align:right;" :total=total :page.sync=listQuery.page :pageSize.sync=listQuery.pageSize @getList=getList></pagination-modal>
  </div>
</template>

<script>
import {
  getPageInfo, deletel
} from "@/api/therentstrategy";
import NewdistrictModal from "./edittherentstrategy";
import Utils from "@/utils/common";
import { paymentType } from "@/api/basedata";

export default {
  name: "therentstrategy",
  components: {
    NewdistrictModal
  },
data(){
      return{
        listQuery: {
          page: 1,
          pageSize: 10,
          paymentTypeKey: "",
          month: "",
          isDeleted: ""
        },
        stateOptions: [
          {
            value: "1",
            label: "否"
          },
          {
            value: "0",
            label: "是"
          }
        ],
        list: [],
        listLoading: false,
        showModal:false,
        isEdit: false,
        rentstrategyCode:null,
        options4:[],
        searchLoading:false,
        total:0
      };
    },
  created() {
    this.getList();
    this.paymentType();
  },
  filters: {
    statusfilter: function(val) {
        if (val === "0") {
          return "是";
        } else {
          return "否";
        }
    },
    maxfilter: function(val) {
      if (val != null) {
        return "，小于" + val + "个月";
      } else {
        return "";
      }
    },
    minfilter: function(val) {
      if (val != null) {
        return "大于等于" + val + "个月";
      } else {
        return "";
      }
    }
  },
  methods: {
    getList() {
      this.listLoading = true;
      getPageInfo(this.listQuery)
        .then(response => {
          console.log(response.data)
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
    showEditDialog(item) {
      this.rentstrategyCode = item.rentstrategyCode;
      this.isEdit = true;
      this.showModal = true;
    },
    showAddDialog() {
      this.isEdit = false;
      this.showModal = true;
    },
    deletel(row) {
      this.$confirm("确认删除?", "提示", {
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        type: "warning"
      }).then(() => {
        this.listLoading = true;
        console.log(row);
        deletel(row.rentstrategyCode, row.version)
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
    search(){
      this.searchLoading = true;
      this.getList();
    },
    paymentType(){
      paymentType()
        .then(response => {
          this.options4 = response.data;
        });
    }
  }
};
</script>

<style>

</style>
