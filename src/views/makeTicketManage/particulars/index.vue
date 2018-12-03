<template>
  <div class="app-container">
    <el-form class="form-container" :model="listQuery" :inline="true" ref="searchForm">
      <el-form-item label="房号" prop="houseCode">
        <el-input v-model="listQuery.houseCode" size="small" placeholder="房源编号" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item label="开票抬头" prop="company">
        <el-input v-model="listQuery.company" size="small" placeholder="开票抬头" @keyup.enter.native="search"></el-input>
      </el-form-item>

      <el-form-item label="开票状态" prop="kpState">
        <el-select size="small" v-model="listQuery.kpState" placeholder="请选择" clearable>
          <el-option v-for="item in exitOptions" :key="item.dictValue" :label="item.dictValue"
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

       <el-form-item label="应开票日期:">
        <el-form-item prop="kpdayBegin">
          <el-date-picker v-model="listQuery.kpdayBegin" @change="createTimeStartChange" type="date" size="small" placeholder="" style="width:120px;"></el-date-picker>
          <!-- <el-date-picker v-model="listQuery.kpdayBegin"  type="date" size="small" placeholder="" style="width:120px;"></el-date-picker> -->
          -
          <el-form-item prop="kpdayEnd">
            <el-date-picker v-model="listQuery.kpdayEnd" @change="createTimeEndChange" type="date" size="small" placeholder="" style="width:120px;"></el-date-picker>
            <!-- <el-date-picker v-model="listQuery.kpdayEnd"  type="date" size="small" placeholder="" style="width:120px;"></el-date-picker> -->
          </el-form-item>
        </el-form-item>
      </el-form-item>


      <el-form-item>
        <el-button size="small" @click="resetForm('searchForm')">重置</el-button>
        <el-button size="small" type="primary" icon="search" v-loading="searchLoading" @click="search">查询</el-button>
        <el-button v-if="$store.getters.buttons.includes('kpDetailExport')"
                   size="small" type="primary"  @click="exportMakeInvoice" v-loading="exportLoading">导出开票明细</el-button>
        <el-button v-if="$store.getters.buttons.includes('kpDetailImportKp')"
                   size="small" type="primary"  @click="ImportInvoice" v-loading="exportLoading">导入已开票</el-button>
        <el-button v-if="$store.getters.buttons.includes('kpDetailImportKd')"
                   size="small" type="primary"  @click="ImportExpressage" v-loading="exportLoading">导入已快递</el-button>
        <el-button size="small" type="primary"  @click="downTemplate('kp')" v-loading="exportLoading">下载已开票模板</el-button>
        <el-button size="small" type="primary"  @click="downTemplate('kd')" v-loading="exportLoading">下载已快递模板</el-button>
        <!-- <el-button size="small" type="primary"  @click="fnAddModal">开票起止调整</el-button> -->
        <!--<el-button v-if="$store.getters.buttons.includes('houseExport')"
                   size="small" type="primary" icon="file" @click="exportKpTotal" v-loading="exportLoading">导出
        </el-button>-->
      </el-form-item>
    </el-form>

    <div>
        <el-button v-if="$store.getters.buttons.includes('kpDetailDown')"
                   size="small" type="primary"  @click="downloadKpDetail">下载开票明细</el-button>
        <el-button v-if="$store.getters.buttons.includes('kpDetailDownPay')"
                   size="small" type="primary"  @click="downloadFkNotification">下载付款通知书</el-button>
        <el-button v-if="$store.getters.buttons.includes('kpDetailDownKd')"
                   size="small" type="primary"  @click="downloadKdDetail">下载快递明细</el-button>
        <el-button v-if="$store.getters.buttons.includes('kpDetailCancel')"
                   size="small" type="primary"  @click="cancelInvoice">取消开票</el-button>
    </div>

    <!-- 开票总表表格-->
    <el-table :data="list" v-loading="listLoading" border stripe fit style="width: 100%" tooltip-effect="dark"  @selection-change="handleSelectionChange">

       <el-table-column
        type="selection"
        width="55">
       </el-table-column>

      <el-table-column label="房号" align="center" fixed min-width="110">
        <template slot-scope="scope">
          <span>{{ scope.row.houseCode }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="物业地址" min-width="350">
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

      <el-table-column align="center" label="应开票日期" min-width="200">
        <template slot-scope="scope">
          <span>{{scope.row.kpday | formatTime}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="本期租金" min-width="150">
        <template slot-scope="scope">
          <span>{{scope.row.permonth}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="方式" min-width="180">
        <template slot-scope="scope">
          <span>{{scope.row.otherstyle}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="类型" min-width="100">
        <template slot-scope="scope">
          <span>{{scope.row.kpstyle}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="状态" min-width="100">
        <template slot-scope="scope">
          <span>{{scope.row.kpState}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="发票号" min-width="180">
        <template slot-scope="scope">
          <span>{{scope.row.fpNum}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="实际开票日期" min-width="150">
        <template slot-scope="scope">
          <span>{{scope.row.realKpday | formatTime}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="快递号" min-width="210">
        <template slot-scope="scope">
          <span>{{scope.row.kdNum}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="寄件时间" min-width="210">
        <template slot-scope="scope">
          <span>{{scope.row.kdDate | formatTime}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="收件状态" min-width="150">
        <template slot-scope="scope">
          <span>{{scope.row.kdState}}</span>
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

       <el-table-column align="center" label="开户行及账号" min-width="220">
        <template slot-scope="scope">
          <span>{{scope.row.banknum}}</span>
        </template>
      </el-table-column>

       <el-table-column align="center" label="收件地址" min-width="220">
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

       <el-table-column align="center" label="月租金" min-width="150">
        <template slot-scope="scope">
          <span>{{scope.row.realpermonth}}</span>
        </template>
      </el-table-column>

       <el-table-column align="center" label="是否退租" min-width="150">
        <template slot-scope="scope">
          <span>{{scope.row.isexit}}</span>
        </template>
      </el-table-column>

       <el-table-column align="center" label="退租日期" min-width="150">
        <template slot-scope="scope">
          <span>{{scope.row.exitdate | formatTime}}</span>
        </template>
      </el-table-column>

       <el-table-column align="center" label="备注" min-width="150">
        <template slot-scope="scope">
          <span>{{scope.row.mark}}</span>
        </template>
      </el-table-column>

       <el-table-column align="center" label="小区名称" min-width="150">
        <template slot-scope="scope">
          <span>{{scope.row.areaname}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" fixed="right" min-width="270">
        <template slot-scope="scope">
          <!-- <span v-if="scope.row.ischecked === '未审核' "> -->
            <!--v-if="$store.getters.buttons.includes('kpTotalModify')"-->
            <!-- <el-button
               @click="fnEditModal(scope.row)" type="text">修改
            </el-button> -->
            <!--v-if="$store.getters.buttons.includes('kpTotalDel')"-->
            <!-- <el-button
              @click="deleteClick(scope.row)" type="text">删除
            </el-button> -->
            <!--v-if="$store.getters.buttons.includes('kpTotalCheck')"-->
            <!-- <el-button
              @click="checkPass(scope.row)" type="text">审核
            </el-button> -->
          <!-- </span> -->
          <!-- <span v-if="scope.row.ischecked === '已审核' "> -->
            <!--v-if="$store.getters.buttons.includes('kpTotalBackCheck')"-->
            <!-- <el-button
              @click="checkRefuse(scope.row)" type="text">反审核
            </el-button>
          </span> -->

              <el-button @click="fnEditModal(scope.row)" type="text">详情 </el-button>

              <span v-if="scope.row.kpState === '未开票' && scope.row.isexit === '未退租'">

                <el-button v-if="$store.getters.buttons.includes('kpDetailModify')"
                  @click="amendClick(scope.row)" type="text">修改
                </el-button>

                <el-button v-if="$store.getters.buttons.includes('kpDetailKpDay')"
                  @click="oughtHandleClick(scope.row)" type="text">应开日
                </el-button>

                <el-button v-if="$store.getters.buttons.includes('kpDetailFpNum')"
                  @click="invoiceHandleClick(scope.row)" type="text">发票号
                </el-button>

                  <el-button v-if="$store.getters.buttons.includes('kpDetailExit')"
                  @click="surrenderHandleClick(scope.row)" type="text">退租
                </el-button>
              </span>

        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="uploadTitle" :visible.sync="uploadDialogFormVisible">
      <el-upload
        ref="uploadForm1"
        :headers="headers"
        :action="uploadAction"
        :on-change="loadJsonFromFile"
        :on-success="uploadSuccess"
        :on-error="uploadError"
        accept=".xlsx"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <!--<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload()">上传到服务器</el-button>-->
        <div slot="tip" class="el-upload__tip">只能上传excel文件，且使用的是模板格式</div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitUpload()">开始更新</el-button>
        <el-button @click="uploadDialogFormVisible = false">关 闭</el-button>
      </div>
    </el-dialog>

    <pagination-modal :total=total :page.sync=listQuery.page :pageSize.sync=listQuery.pageSize @getList="getList"></pagination-modal>
    <edit-modal v-if="showModal" @close="showModal = false" :isEdit=isEdit></edit-modal>
    <selected-modal v-if="showSelectedModal" @close="showSelectedModal = false"  :idsList=ids  :kpstyleList=kpstyleList :downloads=downloads></selected-modal>
    <rowDetails-modal v-if="showRowDetailsModal" @close="showRowDetailsModal = false" :detailsId=detailsId></rowDetails-modal>
    <amend-modal v-if="showAmendModal" @close="showAmendModal=false" :rows=rows @getList="getList"></amend-modal>
    <ought-modal v-if="showOughtDayModal" @close="showOughtDayModal=false" :kpdays=kpdays :kpId=kpId  @getList="getList"></ought-modal>
    <invoiceNumber-modal v-if="showInvoiceNumberModal" @close="showInvoiceNumberModal=false" :sjrealKpday=sjrealKpday :sjId=sjId @getList="getList"></invoiceNumber-modal>
    <surrender-modal v-if="showSurrenderModal" @close="showSurrenderModal=false" :rows=TzRows></surrender-modal>
  </div>
</template>
<script>
import EditModal from "./editAddModal";
import SelectedModal from "./selectedModal";
import RowDetailsModal from "./rowDetails";
import AmendModal from "./amendModal";
import OughtModal from "./oughtDay";
import InvoiceNumberModal from "./invoiceNumber";
import SurrenderModal from "./surrender";
import {
  selectByKpMxTotal,
  exportExcelDetail,
  downTemplate
} from "@/api/kpmanage";
import Utils from "@/utils/common";
import { getToken } from "@/utils/auth";

export default {
  components: {
    EditModal,
    SelectedModal,
    RowDetailsModal,
    AmendModal,
    OughtModal,
    InvoiceNumberModal,
    SurrenderModal
  },
  data() {
    return {
      list: null,
      listLoading: false,
      searchLoading: false,
      exportLoading: false,
      showModal: false,
      showSelectedModal: false,
      showRowDetailsModal: false,
      showAmendModal: false,
      showOughtDayModal: false,
      showInvoiceNumberModal: false,
      showSurrenderModal: false,
      isEdit: false,
      selectedVal: [],
      ids: [],
      kpstyleList: [],
      downloads: null,
      detailsId: null,
      rows: null,
      kpdays: "",
      kpId: null,
      sjrealKpday: null,
      sjId: null,
      TzRows: null,
      // sjFpNum:"",
      // dialogFormVisible:false,
      // form:{
      //   name:""
      // },
      total: null,
      exitOptions: [
        { dictCode: "未退租", dictValue: "未退租" },
        { dictCode: "已退租", dictValue: "已退租" }
      ],
      listQuery: {
        houseCode: "", // 房号
        company: "", // 开票抬头
        kpState: "", // 开票状态
        areaname: "", // 小区
        wuyeAddress: "", //  物业地址
        kpdayBegin: "", // 应开票起始日期
        kpdayEnd: "", // 应开票结束日期
        page: 1,
        pageSize: 10
      },
      uploadTitle: null,
      selectFileList: [],
      headers: {
        Authorization: getToken()
      },
      uploadAction: null,
      uploadDialogFormVisible: false
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
      selectByKpMxTotal(this.listQuery)
        .then(response => {
          console.log(response.data);
          this.list = response.data;
          this.total = response.count;
        })
        .catch(error => {
          Utils.error(error);
        });
      this.searchLoading = false;
    },
    createTimeStartChange(value) {
      if (value != null && value !== "") {
        this.listQuery.kpdayBegin = value;
      }
    },
    createTimeEndChange(value) {
      if (value != null && value !== "") {
        this.listQuery.kpdayEnd = value;
      }
    },

    // 重置功能
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    // 导出开票明细
    exportMakeInvoice() {
      this.$confirm("确定导出?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.exportLoading = true;
          exportExcelDetail(this.listQuery)
            .then(response => {
              this.exportLoading = false;
            })
            .catch(error => {
              console.log(error);
              this.exportLoading = false;
            });
        })
        .catch(() => {
          this.exportLoading = false;
        });
    },

    // 下载模板
    downTemplate(type) {
      downTemplate(type)
        .then(response => {
          this.exportLoading = false;
        })
        .catch(error => {
          console.log(error);
          this.exportLoading = false;
        });
    },

    // 导入已开票
    ImportInvoice() {
      //      this.showModal = !false;
      //      this.isEdit = false;
      this.uploadTitle = "导入已开票";
      this.uploadDialogFormVisible = true;
      this.uploadAction = `${process.env.BASE_API}/kpdetails/importKped`;
    },

    // 导入已快递
    ImportExpressage() {
      //      this.showModal = !false;
      //      this.isEdit = !false;
      this.uploadTitle = "导入已快递";
      this.uploadDialogFormVisible = true;
      this.uploadAction = `${process.env.BASE_API}/kpdetails/importKded`;
    },

    submitUpload() {
      if (this.selectFileList.length > 0) {
        this.$refs.uploadForm1.submit();
      } else {
        Utils.error("请先选取文件再点击开始更新");
      }
    },
    uploadSuccess(response, file) {
      console.log(response);
      if (response.code === "000000") {
        this.$message.success("处理成功！");
        this.uploadDialogFormVisible = false;
        this.$refs.uploadForm1.clearFiles();
      } else {
        this.$message.error("处理失败！" + response.msg);
        this.$refs.uploadForm1.clearFiles();
      }
    },
    uploadError(err, file) {
      this.$message.error("处理失败！");
      this.$refs.uploadForm1.clearFiles();
    },
    loadJsonFromFile(file, fileList) {
      this.selectFileList = fileList;
    },

    //全选
    handleSelectionChange(val) {
      this.ids = [];
      this.kpstyleList = [];
      this.multipleSelection = val;
      this.selectedVal = val;
      if (this.selectedVal.length !== 0) {
        this.selectedVal.forEach(ele => {
          this.ids.push(ele.id);
          this.kpstyleList.push(ele.kpstyle);
        });
      }
    },

    //下载开票明细
    downloadKpDetail() {
      if (this.selectedVal.length == 0) {
        Utils.error("没有勾选");
        return;
      } else {
        this.downloads = 0;
        this.showSelectedModal = true;
      }
    },
    //下载付款通知书
    downloadFkNotification() {
      if (this.selectedVal.length == 0) {
        Utils.error("没有勾选");
        return;
      }
      this.downloads = 1;
      this.showSelectedModal = true;
    },
    //下载快递明细
    downloadKdDetail() {
      if (this.selectedVal.length == 0) {
        Utils.error("没有勾选");
        return;
      }
      this.downloads = 2;
      this.showSelectedModal = true;
    },
    //取消开票
    cancelInvoice() {
      if (this.selectedVal.length == 0) {
        Utils.error("没有勾选");
        return;
      }
      this.$confirm("确定取消开票?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.exportLoading = false;
        })
        .catch(() => {
          this.exportLoading = false;
        });
    },

    //详情
    fnEditModal(row) {
      this.showRowDetailsModal = !false;
      this.detailsId = row.id;
    },

    //修改
    amendClick(row) {
      this.showAmendModal = !false;
      this.rows = row;
      // console.log(row);
    },
    //应开日
    oughtHandleClick(row) {
      this.showOughtDayModal = !false;
      this.kpId = row.id;
      this.kpdays = row.kpday;
    },
    //发票号
    invoiceHandleClick(row) {
      this.showInvoiceNumberModal = !false;
      this.sjrealKpday = row.realKpday;
      this.sjId = row.id;
    },
    //退租
    surrenderHandleClick(row) {
      this.showSurrenderModal = !false;
      this.TzRows = row;
    }

    //  新增
    // fnAddModal() {
    //   this.showModal = true;
    // },
    // // 修改
    // fnEditModal() {
    //   this.showModal = true;
    // },
    // // 导出功能
    // exportKpTotal() {
    //   this.exportLoading = true;
    //   exportExcel(this.listQuery)
    //     .then(response => {
    //       this.exportLoading = false;
    //     })
    //     .catch(error => {
    //       console.log(error);
    //       this.exportLoading = false;
    //     });
    // },
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
