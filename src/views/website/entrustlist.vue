<template>
  <div class="app-container calendar-list-container">
    <el-form class="form-container" :model="listQuery" :inline="true" label-width="100px" ref="searchForm">

      <el-form-item label="预留时间:">
        <el-form-item prop="createdateStart">
          <el-date-picker v-model="listQuery.createdateStart" @change="createTimeStartChange" type="date" size="small" placeholder="结束日期" style="width:120px;"></el-date-picker>
          <el-form-item prop="createdateEnd">
            <el-date-picker v-model="listQuery.createdateEnd" @change="createTimeEndChange" type="date" size="small" placeholder="结束日期" style="width:120px;"></el-date-picker>
          </el-form-item>
        </el-form-item>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="search" size="small" v-loading="searchLoading" @click="search">查询</el-button>
        <el-button size="small" @click="resetForm('searchForm')">重置</el-button>
        <el-button v-if="$store.getters.buttons.includes('btnExportEntrust')"
                   type="primary" icon="document" size="small" v-loading="exportLoading" @click="exportExl">导出</el-button>
      </el-form-item>

    </el-form>

    <el-table :data="list" v-loading="listLoading" border stripe fit style="width: 100%">

      <el-table-column width="80" label="序号" align="center" type="index">
      </el-table-column>

      <el-table-column  min-width="150" label="姓名" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="150" label="小区" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.neighbourhoodname}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="150" label="房型">
        <template slot-scope="scope">
          <span>{{scope.row.layout}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="150" label="意向租金">
        <template slot-scope="scope">
          <span>{{scope.row.money}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="电话" min-width="150">
        <template slot-scope="scope">
          <span>{{scope.row.mobile}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="150" label="来源">
        <template slot-scope="scope">
          <span>{{scope.row.sourceText}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="150" label="渠道来源">
        <template slot-scope="scope">
          <span>{{scope.row.channelname}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="200" label="预留时间">
        <template slot-scope="scope">
          <span>{{scope.row.reservationtime}}</span>
        </template>
      </el-table-column>

    </el-table>

    <pagination-modal :total=total :page.sync=listQuery.page :pageSize.sync=listQuery.pageSize @getList="getList"></pagination-modal>

  </div>
</template>

<script>
  import { selectEntrustList, exportEntrust } from "@/api/website";

  export default {
    name: "entrustList",
    data() {
      return {
        list: null,
        listLoading: false,
        searchLoading: false,
        exportLoading: false,
        total: 0,
        listQuery: {
          page: 1,
          pageSize: 10,
          createdateStart: "",
          createdateEnd: ""
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
        selectEntrustList(this.listQuery)
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
      search() {
        this.searchLoading = true;
        this.getList();
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      createTimeStartChange(value) {
        if (value != null && value !== "") {
          this.listQuery.createdateStart = value + " 00:00:00";
        }
      },
      createTimeEndChange(value) {
        if (value != null && value !== "") {
          this.listQuery.createdateEnd = value + " 23:59:59";
        }
      },
      exportExl() {
        this.exportLoading = true;
        exportEntrust(this.listQuery).then(response => {
          this.exportLoading = false;
        }).catch(error => {
          console.log(error);
          this.exportLoading = false;
        });
      }
    }
  };
</script>
