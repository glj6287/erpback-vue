<template>
  <div class="app-container calendar-list-container">
    <el-table :data="list" v-loading.body="listLoading" border stripe fit  style="width: 100%">
      <el-table-column min-width="150" label="事项类型" align='center'>
        <template slot-scope="scope">
          <span>上游合同审核</span>
        </template>
      </el-table-column>

      <el-table-column min-width="180" label="时间" align='center'>
        <template slot-scope="scope">
          <span>已等待{{scope.row.daylong}}天{{scope.row.hourlong}}小时</span>
        </template>
      </el-table-column>

      <el-table-column min-width="200" label="单号" align='center'>
        <template slot-scope="scope">
          <span>{{scope.row.applyCode}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="180" label="社区名称" align='center'>
        <template slot-scope="scope">
          <span>{{scope.row.communityName}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="200" label="小区名称" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.neighborhoodName}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="200" label="门牌号" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.houseNo}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="100" label="状态" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.typeName}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="80" label="操作" align="center" v-if="$store.getters.buttons.includes('upContractHandler')">
        <template slot-scope="scope">
          <el-button @click="toView(scope.row)" type="text">处理</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--<pagination-modal style="text-align:left;" :total=total :page.sync=listQuery.page :pageSize.sync=listQuery.pageSize @getList=getList></pagination-modal>-->
  </div>
</template>

<script>
  import { upContractList } from '@/api/taskagent';
  // import Utils from "@/utils/common";

  export default {
    name: "taskagents",
    data() {
      return {
        listQuery: {
          page: 1,
          pageSize: 10
        },
        listLoading: false,
        list: null,
        total: 0
      };
    },
    created() {
      this.getList();
    },
    methods: {
      getList() {
        this.listLoading = true;
        upContractList().then(response => {
          this.list = response.data.data;
          this.listLoading = false;
        }).catch(function(error) {
          console.log(error);
          this.listLoading = false;
        });
      },
      toView(row) {
        console.log(row);
        this.$router.push({ path: `taskagents/auditcontract/?contractCode=${row.applyCode}&statusName=${row.typeName}&version=${row.version}` });
      }
    }
  };
</script>

<style>
</style>
