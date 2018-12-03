<template>
  <div class="app-container calendar-list-container">
    <el-form class="form-container" :model="listQuery" :inline="true" label-width="100px" ref="searchForm">
      <el-form-item label="上游合同:" prop="contractCode">
        <el-input v-model="listQuery.contractCode" size="small" placeholder="上游合同" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item label="账单编号:" prop="payableBillCode">
        <el-input v-model="listQuery.payableBillCode" size="small" placeholder="账单编号" @keyup.enter.native="search"></el-input>
      </el-form-item>

      <el-form-item label="房源编号:" prop="houseCode">
        <el-input v-model="listQuery.houseCode" size="small" placeholder="房源编号" @keyup.enter.native="search"></el-input>
      </el-form-item>

      <el-form-item label="收款人姓名:" prop="payeeName">
        <el-input v-model="listQuery.payeeName" size="small" placeholder="收款人姓名" @keyup.enter.native="search"></el-input>
      </el-form-item>

       <el-form-item label="账期开始:">
        <el-form-item prop="billStartDataStr">
          <el-date-picker v-model="listQuery.billStartDataStr" @change="billStartDataStrChange" type="date" size="small" placeholder="开始日期" style="width:120px;"></el-date-picker>
          <el-form-item prop="billEndDataStr">
            <el-date-picker v-model="listQuery.billEndDataStr" @change="billEndDataStrChange" type="date" size="small" placeholder="截止日期" style="width:120px;"></el-date-picker>
          </el-form-item>
        </el-form-item>
      </el-form-item>

       <el-form-item label="应付日期:">
        <el-form-item prop="payableStartDateStr">
          <el-date-picker v-model="listQuery.payableStartDateStr" @change="payableStartDateStrChange" type="date" size="small" placeholder="开始日期" style="width:120px;"></el-date-picker>
          <el-form-item prop="payableEndDateStr">
            <el-date-picker v-model="listQuery.payableEndDateStr" @change="payableEndDateStrChange" type="date" size="small" placeholder="截止日期" style="width:120px;"></el-date-picker>
          </el-form-item>
        </el-form-item>
      </el-form-item>

      <el-form-item label="支付状态:" prop="settleStatus" >
        <el-select v-model="listQuery.settleStatus" size="small" style="width: 174px" clearable>
          <el-option v-for="item in payablePayStatusOptions" :key="item.dictValue" :label="item.dictValue" :value="item.dictCode"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="账单状态:" prop="isActive" >
        <el-select v-model="listQuery.isActive" size="small" style="width: 174px" clearable>
          <el-option v-for="item in payableOrderStatusOptions" :key="item.dictValue" :label="item.dictValue" :value="item.dictCode"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item style="margin-left:43px;">
        <el-button type="primary" icon="search" size="small" v-loading="searchLoading" @click="search">查询</el-button>
      </el-form-item>

      <el-form-item>
        <el-button v-if="$store.getters.buttons.includes('upbillpayExport')"
          size="small"  @click="toExport">导出</el-button>
      </el-form-item>

      <el-form-item>
        <el-button v-if="$store.getters.buttons.includes('upbillpayCancel')"
          size="small" @click="showupload">批量销账</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="list" v-loading="listLoading" border stripe fit style="width: 100%">

      <el-table-column min-width="210" label="账单编号" align="center">
        <template slot-scope="scope">
          <el-button @click="toViewBill(scope.row)" type="text">{{scope.row.payableBillCode}}</el-button>
        </template>
      </el-table-column>

      <el-table-column  min-width="180" label="上游合同" align="center">
        <template slot-scope="scope">
          <el-button @click="toViewContract(scope.row)" type="text">{{scope.row.contractCode}}</el-button>
        </template>
      </el-table-column>

      <el-table-column min-width="180" label="房源编号" align="center">
        <template slot-scope="scope">
           <el-button @click="toViewHouse(scope.row)" type="text">{{scope.row.houseCode}}</el-button>
        </template>
      </el-table-column>

      <el-table-column align="center" label="收款人姓名" min-width="120" >
        <template slot-scope="scope">
          <span>{{scope.row.payeeName}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="190" label="账期">
        <template slot-scope="scope">
          <span>{{scope.row.billStartData | formatTime}} - {{scope.row.billEndData | formatTime}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center"  min-width="120" label="应付日期">
        <template slot-scope="scope">
          <span>{{scope.row.payableDate | formatTime}}</span>
        </template>
      </el-table-column>

      <el-table-column width="120" label="付款方式" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.paymentTypeText}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="135" label="期次">
        <template slot-scope="scope">
          <span>第{{scope.row.currentPeriod}}期(共{{scope.row.countPeriod}}期)</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="110" label="应付总额">
        <template slot-scope="scope">
          <span>{{scope.row.payableMoney}}元</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="110" label="已付总额">
        <template slot-scope="scope">
          <span>{{scope.row.paidMoney}}元</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="110" label="支付状态">
        <template slot-scope="scope">
          <span>{{scope.row.settleStatusText}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="110" label="账单状态">
        <template slot-scope="scope">
          <span>{{scope.row.isActiveText }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" label="备注">
        <template slot-scope="scope">
          <span>{{scope.row.remarks }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" fixed="right" width="180">
        <template slot-scope="scope">
          <el-button v-if="$store.getters.buttons.includes('updateupBillCancel')"
            type="text" size="small" @click='showEditBillDialog(scope.row)'>销账</el-button>
          <el-button v-if="$store.getters.buttons.includes('updateUpPayableMoney')"
            type="text" size="small" @click='showEditPayableMoneyDialog(scope.row)'>修改应付总额</el-button>
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

    <!-- <edit-modal v-if="showModal" :agreementNo="agreementNo" @close="showModal = false"></edit-modal> -->
    <el-dialog title="批量销账" :visible.sync="dialogFormVisible">
          <el-upload
            ref="uploadForm1"
            :headers="headers"
            :action="uploadAction"
            :on-change="loadJsonFromFile"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            accept=".xls,.xlsx"
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <!--<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload()">上传到服务器</el-button>-->
            <div slot="tip" class="el-upload__tip">只能上传excel文件，且不超过500kb</div>
          </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitUpload()">销 账</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>

    <edit-modal v-if="showModal" @close="showModal = false" @refresh="getList" :dataId="dataId"></edit-modal>
    <payable-modal v-if="showPayableModal" @close="showPayableModal = false" @refresh="getList" :dataId="dataId" :payableMoney="payableMoney"></payable-modal>
  </div>
</template>

<script>
  import { getPayablePayStatus, payableOrderStatus } from "@/api/basedata";
  import { exportUpPayBill, selectPayBillInfo } from "@/api/bill";
  import Utils from "@/utils/common";
  import { getToken } from "@/utils/auth";
  import EditModal from "./upstreambillpayedit";
  import PayableModal from "./upstreambillpayableedit";

  export default {
    components: {
      EditModal,
      PayableModal
    },
    data() {
      return {
        showModal: false,
        showPayableModal: false,
        dataId: "",
        payableMoney: null,
        list: null,
        listLoading: false,
        searchLoading: false,
        dialogFormVisible: false,
        selectFileList: [],
        payableOrderStatusOptions: [],
        payablePayStatusOptions: [],
        uploadAction: `${process.env.BASE_API}/upBill/readExcelPayBill`,
        currentPage: 1,
        total: 0,
        listQuery: {
          contractCode: "",
          payableBillCode: "",
          houseCode: "",
          billStartDataStr: "",
          billEndDataStr: "",
          payableStartDateStr: "",
          payableEndDateStr: "",
          settleStatus: "",
          isActive: "",
          payeeName: "",
          page: 1,
          pageSize: 10
        },
        dictQuery: {
          dictType: ""
        },
        headers: {
          'Authorization': getToken()
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
      this.payableOrderStatus();
      this.payablePayStatus();
    },
    methods: {
      getList() {
        this.listLoading = true;
        selectPayBillInfo(this.listQuery)
          .then(response => {
            this.list = response.data.Item;
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
      billStartDataStrChange(value) {
        if (value != null && value !== "") {
          this.listQuery.billStartDataStr = value + " 00:00:00";
        }
      },
      billEndDataStrChange(value) {
        if (value != null && value !== "") {
          this.listQuery.billEndDataStr = value + " 23:59:59";
        }
      },
      payableStartDateStrChange(value) {
        if (value != null && value !== "") {
          this.listQuery.payableStartDateStr = value + " 00:00:00";
        }
      },
      payableEndDateStrChange(value) {
        if (value != null && value !== "") {
          this.listQuery.payableEndDateStr = value + " 23:59:59";
        }
      },
      // resetForm(formName) {
      //   this.$refs[formName].resetFields();
      // },
      // handleEdit(row) {
      //   this.agreementNo = row.agreementNo;
      //   this.showModal = true;
      // },
      // 应付账单状态
      payableOrderStatus() {
        payableOrderStatus().then(response => {
          this.payableOrderStatusOptions = response.data;
        });
      },
      // 应付支付状态
      payablePayStatus() {
        getPayablePayStatus(this.dictQuery).then(response => {
          this.payablePayStatusOptions = response.data;
        });
      },
      toViewHouse(row) {
        this.$router.push({ path: `/house/detail/?houseCode=${row.houseCode}` });
      },
      toViewBill(row) {
        this.$router.push({ path: `/billmanagement/payablebilldetail/?payableBillCode=${row.payableBillCode}&settleStatusText=${row.settleStatusText}&isActiveText=${row.isActiveText}` });
      },
      toViewContract(row) {
        this.$router.push({ path: `/contractmanagement/upstreamcontract/detailinfo/?contractCode=${row.contractCode}&statusName=${row.contractStatusValue}` });
      },
      toExport(row) {
        this.listQuery.pageSize = "999999999";
        exportUpPayBill(this.listQuery).then(response => { });
      },
      showupload() {
        this.dialogFormVisible = true;
        if (this.selectFileList.length > 0) {
          this.$refs.uploadForm1.clearFiles();
        }
      },
      submitUpload() {
        if (this.selectFileList.length > 0) {
          console.log("进入方法")
          this.$refs.uploadForm1.submit();
        } else {
          Utils.error("请先上传文件再点击销账");
        }
      },
      uploadSuccess(response, file) {
        console.log(response);
        if (response.code === "000000") {
          this.$message.success("销账成功！");
          this.dialogFormVisible = false;
        } else {
          this.$message.error("销账失败！" + response.msg);
        }
      },
      uploadError(err, file) {
        this.$message.error("销账失败！");
      },
//      handleRemove(file, fileList) {
//        console.log(file, fileList);
//      },
//      handlePreview(file) {
//        console.log(file);
//      },
      loadJsonFromFile(file, fileList) {
        this.selectFileList = fileList;
      },
      showEditBillDialog(item) {
        this.dataId = item.payableBillCode;
        this.showModal = true;
      },
      // 修改应付总额
      showEditPayableMoneyDialog(item) {
        this.dataId = item.payableBillCode;
        this.payableMoney = item.payableMoney;
        this.showPayableModal = true;
      }
    }
  };
</script>
<style scoped>
.form-static {
  padding: 0 10px;
}
</style>

