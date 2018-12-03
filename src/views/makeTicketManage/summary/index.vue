<template>
  <div class="app-container">
    <el-form class="form-container" :model="listQuery" :inline="true" ref="searchForm">
      <el-form-item label="房号" prop="houseCode">
        <el-input v-model="listQuery.houseCode" size="small" placeholder="房源编号" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item label="开票抬头" prop="company">
        <el-input v-model="listQuery.company" size="small" placeholder="开票抬头" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item label="是否审核" prop="ischecked">
        <el-select size="small" v-model="listQuery.ischecked" placeholder="请选择" clearable>
          <el-option v-for="item in checkOptions" :key="item.dictValue" :label="item.dictValue"
                     :value="item.dictCode"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="小区名称" prop="areaname">
        <el-input v-model="listQuery.areaname" size="small" placeholder="小区名称" @keyup.enter.native="search"></el-input>
      </el-form-item>

      <el-form-item label="物业地址" prop="wuyeAddress">
        <el-input v-model="listQuery.wuyeAddress" size="small" placeholder="物业地址"
                  @keyup.enter.native="search"></el-input>
      </el-form-item>

      <el-form-item label="是否退租" prop="isexit">
        <el-select size="small" v-model="listQuery.isexit" placeholder="请选择" clearable>
          <el-option v-for="item in exitOptions" :key="item.dictValue" :label="item.dictValue"
                     :value="item.dictCode"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button size="small" type="primary" icon="search" v-loading="searchLoading" @click="search">查询</el-button>
        <el-button v-if="$store.getters.buttons.includes('kpTotalAdd')"
                   size="small" type="primary" icon="plus" @click="fnAddModal">新增</el-button>
        <!--<el-button size="small" @click="resetForm('searchForm')">重置</el-button>-->
        <el-button v-if="$store.getters.buttons.includes('kpTotalExport')"
                   size="small" type="primary" icon="document" @click="exportKpTotal" v-loading="exportLoading">导出
        </el-button>
        <!--<el-button size="small" type="primary" icon="document" @click="exportKpTotal" v-loading="exportLoading">导出-->
        <!--</el-button>-->
      </el-form-item>
    </el-form>


    <!-- 开票总表表格-->
    <el-table :data="list" v-loading="listLoading" border stripe fit style="width: 100%">
      <el-table-column label="房号" align="center" fixed width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.houseCode }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="小区名称" min-width="200">
        <template slot-scope="scope">
          <span>{{scope.row.areaname}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="物业地址" min-width="300">
        <template slot-scope="scope">
          <span>{{scope.row.wuyeAddress}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="合同起始" min-width="150">
        <template slot-scope="scope">
          <span>{{scope.row.firstdate | formatTime}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="合同终止" min-width="150">
        <template slot-scope="scope">
          <span>{{scope.row.enddate | formatTime}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="开票起始" min-width="150">
        <template slot-scope="scope">
          <span>{{scope.row.kpfirst | formatTime}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="开票终止" min-width="150">
        <template slot-scope="scope">
          <span>{{scope.row.kpend | formatTime}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="月租金" min-width="150">
        <template slot-scope="scope">
          <span>{{scope.row.permonth}}元</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="开票方式" min-width="150">
        <template slot-scope="scope">
          <span>{{scope.row.otherstyle}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="开票日" min-width="150">
        <template slot-scope="scope">
          <span>{{scope.row.kpday}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="发票类型" min-width="100">
        <template slot-scope="scope">
          <span>{{scope.row.kpstyle}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="审核状态" min-width="100">
        <template slot-scope="scope">
          <span>{{scope.row.ischecked}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="开票抬头" min-width="300">
        <template slot-scope="scope">
          <span>{{scope.row.company}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="税号" min-width="150">
        <template slot-scope="scope">
          <span>{{scope.row.shuihao}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="开户行及账号" min-width="250">
        <template slot-scope="scope">
          <span>{{scope.row.banknum}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="收件地址" min-width="250">
        <template slot-scope="scope">
          <span>{{scope.row.address}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="收件人姓名" min-width="150">
        <template slot-scope="scope">
          <span>{{scope.row.telperson}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="收件人电话" min-width="150">
        <template slot-scope="scope">
          <span>{{scope.row.telnum}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" fixed="right" min-width="150">
        <template slot-scope="scope">
          <span v-if="scope.row.ischecked === '未审核' ">

            <el-button v-if="$store.getters.buttons.includes('kpTotalModify')"
               @click="fnEditModal(scope.row)" type="text">修改
            </el-button>

            <el-button v-if="$store.getters.buttons.includes('kpTotalDel')"
              @click="deleteClick(scope.row)" type="text">删除
            </el-button>

            <el-button v-if="$store.getters.buttons.includes('kpTotalCheck')"
              @click="checkPass(scope.row)" type="text">审核
            </el-button>
          </span>
          <span v-if="scope.row.ischecked === '已审核' ">

            <el-button v-if="$store.getters.buttons.includes('kpTotalBackCheck')"
              @click="checkRefuse(scope.row)" type="text">反审核
            </el-button>
          </span>
        </template>
      </el-table-column>
    </el-table>

    <!-- <pagination-modal :total=total :page.sync=listQuery.page :pageSize.sync=listQuery.pageSize @getList="getList"></pagination-modal> -->
    <edit-modal v-if="showModal" @close="showModal = false" :isEdit="isEdit" :id="id" @getList=getList></edit-modal>

  </div>
</template>
<script>
  import EditModal from "./editAddModal";
  import { selectByKpTotal, exportKpTotal, delKpTotal, checkPass, checkRefuse } from "@/api/kpmanage";
  import Utils from "@/utils/common";

  export default {
    components: {
      EditModal
    },
    data() {
      return {
        list: null,
        listLoading: false,
        searchLoading: false,
        exportLoading: false,
        showModal: false,
        isEdit: false,
        id: null,
        checkOptions: [{ dictCode: "未审核", dictValue: "未审核" }, { dictCode: "已审核", dictValue: "已审核" }],
        exitOptions: [{ dictCode: "未退租", dictValue: "未退租" }, { dictCode: "已退租", dictValue: "已退租" }],
        listQuery: {
          houseCode: null, // 房号
          company: null, // 开票抬头
          ischecked: null, // 是否审核
          areaname: null, // 小区
          wuyeAddress: null, //  物业地址
          isexit: null // 是否退租
        }
      };
    },
    filters: {
      formatTime(date) {
        if (date) {
          return date.substring(0, date.indexOf(" ")).replace(/-/g, ".");
        }
        return "-";
      }
    },
    created() {
      this.getList();
    },
    methods: {
      // 按下ent键出发查询按钮
      search() {
        this.getList();
      },
      getList() {
        this.searchLoading = true;
        selectByKpTotal(this.listQuery)
          .then(response => {
            this.list = response.data;
          })
          .catch(error => {
            Utils.error(error);
          });
        this.searchLoading = false;
      },
      //  新增
      fnAddModal(row) {
        this.showModal = true;
        this.isEdit = false;
        this.id = null;
      },
      // 修改
      fnEditModal(row) {
        this.showModal = true;
        this.isEdit = true;
        this.id = row.id;
      },
      // 导出功能
      exportKpTotal() {
        this.exportLoading = true;
        exportKpTotal(this.listQuery)
          .then(response => {
            this.exportLoading = false;
          })
          .catch(error => {
            console.log(error);
            this.exportLoading = false;
          });
      },
      // 删除
      deleteClick(row) {
        this.$confirm("您确定删除此开票信息吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
         .then(() => {
           delKpTotal(row.id)
             .then(response => {
               this.getList();
               Utils.success(`删除成功`);
             })
             .catch(error => {
               console.log(error);
               this.exportLoading = false;
             });
         })
         .catch(() => {});
      },
      // 审核
      checkPass(row) {
        this.$confirm("您确定审核此开票信息吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
         .then(() => {
           checkPass(row.id)
             .then(response => {
               this.getList();
               Utils.success(`审核成功`);
             })
             .catch(error => {
               console.log(error);
               this.exportLoading = false;
             });
         })
         .catch(() => {});
      },
      // 反审核
      checkRefuse(row) {
        this.$confirm("您确定反审核此开票信息吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
         .then(() => {
           checkRefuse(row.id)
             .then(response => {
               this.getList();
               Utils.success(`反审核成功`);
             })
             .catch(error => {
               console.log(error);
               this.exportLoading = false;
             });
         })
         .catch(() => {});
      },
      // 重置功能
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>

<style>
</style>
