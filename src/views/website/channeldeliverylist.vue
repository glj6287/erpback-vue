<template>
  <div class="app-container calendar-list-container">
    <el-form class="form-container" :model="listQuery" :inline="true" label-width="100px" ref="searchForm">

      <el-form-item label="预留时间:">
        <el-form-item prop="datestart">
          <el-date-picker v-model="listQuery.datestart" @change="datestartChange" type="date" size="small" placeholder="起始日期" style="width:120px;"></el-date-picker>
          <el-form-item prop="dateend">
            <el-date-picker v-model="listQuery.dateend" @change="dateendChange" type="date" size="small" placeholder="结束日期" style="width:120px;"></el-date-picker>
          </el-form-item>
        </el-form-item>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="search" size="small" v-loading="searchLoading" @click="search">查询</el-button>
        <el-button size="small" @click="resetForm('searchForm')">重置</el-button>
        <el-button v-if="$store.getters.buttons.includes('btnExportChanneldelivery')"
                   type="primary" icon="document" size="small" v-loading="exportLoading" @click="exportExl">导出</el-button>
      </el-form-item>

    </el-form>

    <el-table :data="list" v-loading="listLoading" border stripe fit style="width: 100%">

      <el-table-column width="80" label="序号" align="center"  type="index">
      </el-table-column>

      <el-table-column  min-width="150" label="渠道号" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.channelname}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="150" label="事件编号" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.eventnumber}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="150" label="pv">
        <template slot-scope="scope">
          <span>{{scope.row.pv}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="150" label="uv">
        <template slot-scope="scope">
          <span>{{scope.row.uv}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="ip" min-width="150" >
        <template slot-scope="scope">
          <span>{{scope.row.ip}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="150" label="时间">
        <template slot-scope="scope">
          <span>{{scope.row.visittime}}</span>
        </template>
      </el-table-column>

    </el-table>

    <pagination-modal :total=total :page.sync=listQuery.page :pageSize.sync=listQuery.pageSize @getList="getList"></pagination-modal>

  </div>
</template>

<script>
  import { anchorList, exportanchorExcel } from "@/api/website";

  export default {
    name: "channeldeliveryList",
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
    created() {
      this.getList();
    },
    methods: {
      getList() {
        this.listLoading = false;
        anchorList(this.listQuery)
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
      datestartChange(value) {
        if (value != null && value !== "") {
          this.listQuery.datestart = value;
        }
      },
      dateendChange(value) {
        if (value != null && value !== "") {
          this.listQuery.dateend = value;
        }
      },
      exportExl() {
        this.exportLoading = true;
        exportanchorExcel(this.listQuery).then(response => {
          this.exportLoading = false;
        }).catch(error => {
          console.log(error);
          this.exportLoading = false;
        });
      }
    }
  };
</script>
