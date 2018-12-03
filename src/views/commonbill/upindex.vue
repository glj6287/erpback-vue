<template>
  <div class="app-container calendar-list-container">
    <el-form class="form-container" :model="listQuery" :inline="true" ref="searchForm">
      <el-form-item label="租期开始时间:" prop="tenancyStartDateStr">
        <el-date-picker v-model="listQuery.tenancyStartDate" @change="tenancyStartDateChange" size="small" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="租期结束时间:" prop="tenancyEndDateStr">
        <el-date-picker v-model="listQuery.tenancyEndDate" @change="tenancyEndDateChange" size="small" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="免租期开始时间:" prop="freeLeaseStartDate">
        <el-date-picker v-model="listQuery.freeLeaseStartDate" @change="freeLeaseStartDateChange" size="small" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="免租期结束时间:" prop="freeLeaseEndDateStr">
        <el-date-picker v-model="listQuery.freeLeaseEndDate" @change="freeLeaseEndDateChange" size="small" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="延长期开始时间:" prop="extendStartDateStr">
        <el-date-picker v-model="listQuery.extendStartDate" @change="extendStartDateChange" size="small" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="延长期结束时间:" prop="extendEndDateStr">
        <el-date-picker v-model="listQuery.extendEndDate" @change="extendEndDateChange" size="small" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="付款方式:" prop="paymentTypeCode">
        <el-select v-model="listQuery.paymentTypeCode" size="small" style="width: 174px;" clearable >
          <el-option v-for="item in paymentTypeOptions" :key="item.dictCode" :label="item.dictValue" :value="item.dictCode"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="押金:" prop="cashPledgeMoney">
        <el-input v-model="listQuery.cashPledgeMoney" size="small" placeholder="押金" @keyup.enter.native="search"></el-input>
      </el-form-item>
      <el-form-item label="租金类型:" prop="rentType">
        <el-select v-model="listQuery.rentType" size="small" style="width: 174px;" clearable >
          <el-option v-for="item in rentMoneyTypeOptions" :key="item.dictCode" :label="item.dictValue" :value="item.dictCode"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="租金:" prop="rentMoney">
        <el-input v-model="listQuery.rentMoney" size="small" placeholder="租金" @keyup.enter.native="search"></el-input>
      </el-form-item>

      <el-form-item label="阶梯租金列表"  prop="rentLadderVos" >
        <el-button type="primary" @click="addRow(listQuery.rentLadderVos)" size="mini" >新增</el-button>
        <template>
          <el-table border :data="listQuery.rentLadderVos" style="width: 600px" >
            <el-table-column prop="rentStartedTime" label="每年租金开始日期">
              <template slot-scope="scope">
                <el-date-picker v-model="scope.row.rentStartedTime" @change="rentStartedTimeChange" size="small" type="date" placeholder="选择日期" style="width:120px;"></el-date-picker>
              </template>
            </el-table-column>
            <el-table-column  prop="rentEndedTime" label="每年租金结束日期">
              <template slot-scope="scope">
                <el-date-picker v-model="scope.row.rentEndedTime" @change="rentEndedTimeChange" size="small" type="date" placeholder="选择日期" style="width:120px;"></el-date-picker>
              </template>
            </el-table-column>
            <el-table-column prop="monthMoney" label="每年月租金">
              <template slot-scope="scope">
                <el-input size="small" v-model="scope.row.monthMoney" placeholder="每年月租金" ></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" >
              <template slot-scope="scope">
                <el-button @click="deleteRow(scope.$index, listQuery.rentLadderVos)" size="mini" type="danger"> 移除 </el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-form-item>

      <el-form-item>
        <el-button size="small" type="primary" icon="search" @click="search">查询</el-button>
        <el-button size="small" @click="resetForm('searchForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="list" v-loading="listLoading" border stripe fit  style="width: 100%">

      <el-table-column align="center" label="账期开始时间" >
        <template slot-scope="scope">
          <span>{{ scope.row.billStartData }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="账期结束时间" >
        <template slot-scope="scope">
          <span>{{scope.row.billEndData}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="账单应付日期" >
        <template slot-scope="scope">
          <span>{{scope.row.payableDate}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="相差天数" >
        <template slot-scope="scope">
          <span>{{scope.row.days}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="当前期次" >
        <template slot-scope="scope">
          <span>{{scope.row.currentPeriod}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="租金" >
        <template slot-scope="scope">
          <span>{{scope.row.rent}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="应付金额" >
        <template slot-scope="scope">
          <span>{{scope.row.payableMoney}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="总期次">
        <template slot-scope="scope">
          <span>{{scope.row.countPeriod}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="相差月数">
        <template slot-scope="scope">
          <span>{{scope.row.months}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="第一期+押金">
        <template slot-scope="scope">
          <span>{{scope.row.cashPledge}}</span>
        </template>
      </el-table-column>

    </el-table>

  </div>
</template>

<script>
  import { getUpBill } from "@/api/commonbill";
  import { paymentType, getRentMoneyType } from "@/api/basedata";
  export default {
    name: "upbill-list",
    data() {
      return {
        list: null,
        listLoading: false,
        searchLoading: false,
        paymentTypeOptions: [],
        rentMoneyTypeOptions: [],
        listQuery: {
          tenancyStartDate: "",
          tenancyEndDate: "",
          freeLeaseStartDate: "",
          freeLeaseEndDate: "",
          extendStartDate: "",
          extendEndDate: "",
          paymentTypeCode: "",
          paymentRemark: "",
          cashPledgeMoney: "",
          rentType: "",
          rentMoney: "",
          rentLadderVos: []
        }
      };
    },
    filters: {
    },
    created() {
      this.getOption();
    },
    methods: {
      getList() {
        console.log(this.listQuery);
        getUpBill(this.listQuery).then(response => {
          console.log(response);
          this.list = response.data;
          // this.listLoading = false;
        }).catch(function(error) {
          console.log(error);
          // this.listLoading = false;
        });
      },
      tenancyStartDateChange(value) {
        if (value != null && value !== "") {
          this.listQuery.tenancyStartDate = value;
        }
      },
      tenancyEndDateChange(value) {
        if (value != null && value !== "") {
          this.listQuery.tenancyEndDate = value;
        }
      },
      freeLeaseStartDateChange(value) {
        if (value != null && value !== "") {
          this.listQuery.freeLeaseStartDate = value;
        }
      },
      freeLeaseEndDateChange(value) {
        if (value != null && value !== "") {
          this.listQuery.freeLeaseEndDate = value;
        }
      },
      extendStartDateChange(value) {
        if (value != null && value !== "") {
          this.listQuery.extendStartDate = value;
        }
      },
      extendEndDateChange(value) {
        console.log(value)
        if (value != null && value !== "") {
          this.listQuery.extendEndDate = value;
        }
      },
      rentStartedTimeChange(index, value) {
        console.log(index, value)
        if (value != null && value !== "") {
          // this.listQuery.rentLadderVos[index].rentStartedTime = value;
        }
      },
      rentEndedTimeChange(index, value) {
        if (value != null && value !== "") {
          // this.listQuery.rentLadderVos[index].rentEndedTime = value;
        }
      },
      // 删除改行
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      // 添加
      addRow(tableData, event) {
        tableData.push({ rentStartedTime: "", rentEndedTime: "", monthMoney: "" });
      },
      getOption() {
        paymentType().then(response => {
          this.paymentTypeOptions = response.data;
        });
        getRentMoneyType().then(response => {
          this.rentMoneyTypeOptions = response.data;
        });
      },
      search() {
        this.getList();
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>
