<template>
  <div class="app-container calendar-list-container">
    <el-form class="form-container" :model="listQuery" :inline="true" label-width="100px" ref="searchForm">

      <el-form-item label="预留时间:">
        <el-form-item prop="datestart">
          <el-date-picker v-model="listQuery.datestart" @change="createTimeStartChange" type="date" size="small" placeholder="结束日期" style="width:120px;"></el-date-picker>
          <el-form-item prop="dateend">
            <el-date-picker v-model="listQuery.dateend" @change="createTimeEndChange" type="date" size="small" placeholder="结束日期" style="width:120px;"></el-date-picker>
          </el-form-item>
        </el-form-item>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="search" size="small" v-loading="searchLoading" @click="search">查询</el-button>
        <el-button size="small" @click="resetForm('searchForm')">重置</el-button>
        <el-button v-if="$store.getters.buttons.includes('btnExportVisitor')"
                   type="primary" icon="document" size="small" v-loading="exportLoading" @click="exportExl">导出</el-button>
      </el-form-item>

    </el-form>

    <el-table :data="list" v-loading="listLoading" border stripe fit style="width: 100%">

      <el-table-column width="80" label="序号" align="center" type="index">
      </el-table-column>

      <el-table-column min-width="150" label="姓名" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.username}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="150" label="性别" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.sexText}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="电话" min-width="150">
        <template slot-scope="scope">
          <span>{{scope.row.phone}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="150" label="来源">
        <template slot-scope="scope">
          <span>{{scope.row.sourcename}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="150" label="小区/酒店式公寓">
        <template slot-scope="scope">
          <span>{{scope.row.neighbourhoodname}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="150" label="门牌号/房型">
        <template slot-scope="scope">
          <span>{{scope.row.housenumber}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="150" label="渠道来源">
        <template slot-scope="scope">
          <span>{{scope.row.channelname}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="150" label="预留时间">
        <template slot-scope="scope">
          <span>{{scope.row.reservationtime}}</span>
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

  </div>
</template>

<script>
  import { visitorpage, exportVisitor } from "@/api/website";

  export default {
    name: "visitorList",
    data() {
      return {
        showModal: false,
        list: null,
        listLoading: false,
        searchLoading: false,
        exportLoading: false,
        currentPage: 1,
        total: 0,
        listQuery: {
          page: 1,
          pageSize: 10,
          datestart: "",
          dateend: ""
        }
      };
    },
    filters: {
      formatTime(date) {
        if (date) {
          return date.substring(0, date.indexOf("."));
        }
        return "-";
      }
    },
    created() {
      this.getList();

    },
    methods: {
      getList() {
        this.listLoading = false;
        visitorpage(this.listQuery)
          .then(response => {
            this.list = response.data;
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
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.listQuery.houseRoomNo = "";
      },
      createTimeStartChange(value) {
        if (value != null && value !== "") {
          this.listQuery.datestart = value + " 00:00:00";
        }
      },
      createTimeEndChange(value) {
        if (value != null && value !== "") {
          this.listQuery.dateend = value + " 23:59:59";
        }
      },
      exportExl() {
        this.exportLoading = true;
        exportVisitor(this.listQuery).then(response => {
          this.exportLoading = false;
        }).catch(error => {
          console.log(error);
          this.exportLoading = false;
        });
      }
    }
  };
</script>
