<template>
  <div class="app-container calendar-list-container">
    <el-table :data="list" v-loading.body="listLoading" border stripe fit  style="width: 100%">
      <el-table-column min-width="150" label="任务类型" align='center'>
        <template slot-scope="scope">
          <span>下游合同审核</span>
        </template>
      </el-table-column>

      <el-table-column min-width="180" label="时间" align='center'>
        <template slot-scope="scope">
          <span>已等待{{scope.row.waitDays}}天{{scope.row.waitHours}}小时</span>
        </template>
      </el-table-column>

      <el-table-column min-width="200" label="单号" align='center'>
        <template slot-scope="scope">
          <span>{{scope.row.contractCode}}</span>
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
          <span>{{scope.row.houseNo}}号{{scope.row.houseRoomNo}}室</span>
        </template>
      </el-table-column>

      <el-table-column min-width="100" label="状态" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.statusName}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="100" label="操作" align="center" fixed="right" v-if="$store.getters.buttons.includes('downContractHandler')">
        <template slot-scope="scope">
          <el-button @click="toView(scope.row)" type="text">处理</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination-modal style="text-align:left;" :total=total :page.sync=listQuery.page :pageSize.sync=listQuery.pageSize @getList=getList></pagination-modal>
  </div>
</template>

<script>
  import { downList } from '@/api/downtaskagent';
  // import Utils from "@/utils/common";

  export default {
    name: 'downtaskagents',
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
        downList(this.listQuery).then(response => {
          this.list = response.data;
          this.total = response.count;
          this.listLoading = false;
        }).catch(function(error) {
          console.log(error);
          this.listLoading = false;
        });
      },
      toView(row) {
        console.log(row);
        this.$router.push({ path: `downtaskagents/auditcontract/?dsContractCode=${row.contractCode}&statusName=${row.statusName}&version=${row.version}` });
      }
    }
  };
</script>

<style>
</style>
