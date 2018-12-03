<template>
  <div class="app-container calendar-list-container">
    <el-form class="form-container" :model="listQuery" :inline="true" ref="searchForm">
      <el-form-item label="起租日期:" prop="startDate">
        <!--<el-input v-model="listQuery.startDate" size="small" placeholder="起租日期" @keyup.enter.native="search"></el-input>-->
        <el-date-picker
          v-model="listQuery.startDate"
          @change="startDateChange"
          size="small"
          type="date"
          placeholder="选择日期"
          >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="退租日期:" prop="endDate">
        <!--<el-input v-model="listQuery.endDate" size="small" placeholder="退租日期" @keyup.enter.native="search"></el-input>-->
        <el-date-picker
          v-model="listQuery.endDate"
          @change="endDateChange"
          size="small"
          type="date"
          placeholder="选择日期"
          >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="签约时间:" prop="signDate">
        <!--<el-input v-model="listQuery.signDate" size="small" placeholder="签约时间" @keyup.enter.native="search"></el-input>-->
        <el-date-picker
          v-model="listQuery.signDate"
          @change="signDateChange"
          size="small"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="宽带费:" prop="broadbandFee">
        <el-input v-model="listQuery.broadbandFee" size="small" placeholder="宽带费" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item label="每期租金:" prop="monthRepayFee">
        <el-input v-model="listQuery.monthRepayFee" size="small" placeholder="每期租金" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item label="押金:" prop="guaranteeFee">
        <el-input v-model="listQuery.guaranteeFee" size="small" placeholder="押金" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <!--<el-form-item label="是否固定租定:" prop="isFixed">-->
        <!--<el-input v-model="listQuery.isFixed" size="small" placeholder="是否固定租定" @keyup.enter.native="search"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="租金策略-折扣:" prop="discount">-->
        <!--<el-input v-model="listQuery.discount" size="small" placeholder="折扣" @keyup.enter.native="search"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="租金策略-付几:" prop="pay">-->
        <!--<el-input v-model="listQuery.pay" size="small" placeholder="付几" @keyup.enter.native="search"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="租金策略-押几:" prop="mortgage">-->
        <!--<el-input v-model="listQuery.mortgage" size="small" placeholder="押几" @keyup.enter.native="search"></el-input>-->
      <!--</el-form-item>-->
      <el-form-item label="付款方式:" prop="paymentTypeValue">
        <el-select v-model="listQuery.paymentTypeValue" size="small" style="width: 174px;" clearable>
          <el-option v-for="item in paymentTypeOptions" :key="item.dictCode" :label="item.dictValue" :value="item.dictValue"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="search" v-loading="searchLoading" @click="search">查询</el-button>
        <el-button size="small" @click="resetForm('searchForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="list" v-loading="listLoading" border stripe fit  style="width: 100%">

      <el-table-column align="center" label="开始日期" >
        <template slot-scope="scope">
          <span>{{ scope.row.beginDate }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="结束日期" >
        <template slot-scope="scope">
          <span>{{scope.row.endDate}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="最晚付款日期" >
        <template slot-scope="scope">
          <span>{{scope.row.dueFee}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="付款方式" >
        <template slot-scope="scope">
          <span>{{scope.row.paymentTypeValue}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="期次" >
        <template slot-scope="scope">
          <span>{{scope.row.monthNo}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="总期数" >
        <template slot-scope="scope">
          <span>{{scope.row.periods}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="每期租金" >
        <template slot-scope="scope">
          <span>{{scope.row.repayFee}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="年宽带费">
        <template slot-scope="scope">
          <span>{{scope.row.yearBroadbandFee}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="宽带费">
        <template slot-scope="scope">
          <span>{{scope.row.broadbandFee}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="每期多少个月">
        <template slot-scope="scope">
          <span>{{scope.row.months}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="月租金">
        <template slot-scope="scope">
          <span>{{scope.row.monthRepayFee}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="押金">
        <template slot-scope="scope">
          <span>{{scope.row.guaranteeFee}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="应收总额(租金)">
        <template slot-scope="scope">
          <span>{{scope.row.totalRepayFee}}</span>
        </template>
      </el-table-column>

    </el-table>

  </div>
</template>

<script>
  import { getBill } from "@/api/commonbill";
  import { paymentType } from "@/api/basedata";
  export default {
    name: "bill-list",
    data() {
      return {
        list: null,
        listLoading: false,
        searchLoading: false,
        paymentTypeOptions: [],
        listQuery: {
          startDate: "",
          endDate: "",
          signDate: "",
          broadbandFee: "",
          monthRepayFee: "",
          guaranteeFee: "",
          // isFixed: "",
          // discount: "",
          // pay: "",
          // mortgage: "",
          paymentTypeValue: ""
        }
      };
    },
    filters: {
    },
    created() {
      // this.getList();
      this.getOption();
    },
    methods: {
      getList() {
        // this.listLoading = true;
        getBill(this.listQuery).then(response => {
          this.list = response.data;
          this.listLoading = false;
          this.searchLoading = false;
        }).catch(function(error) {
          console.log(error);
          this.listLoading = false;
          this.searchLoading = false;
        });
      },
      startDateChange(value) {
        if (value != null && value !== "") {
          this.listQuery.startDate = value;
        }
      },
      endDateChange(value) {
        if (value != null && value !== "") {
          this.listQuery.endDate = value;
        }
      },
      signDateChange(value) {
        if (value != null && value !== "") {
          this.listQuery.signDate = value;
        }
      },
      getOption() {
        paymentType().then(response => {
          this.paymentTypeOptions = response.data;
        });
      },
      search() {
        // this.searchLoading = true;
        this.getList();
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>
