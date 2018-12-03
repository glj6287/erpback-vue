<template>
  <div class="app-container calendar-list-container">
    <el-table :data="list" v-loading.body="listLoading" border stripe fit  style="width: 100%">
      <el-table-column type="index" align="center" width="68"/>
      <el-table-column min-width="150" label="任务类型" align='center'>
        <template slot-scope="scope">
          <span v-if="scope.row.status === '8001'">上游合同审核</span>
          <span v-if="scope.row.status === '2301'">下游合同审核</span>
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

      <el-table-column min-width="100" label="操作" align="center" fixed="right"
                       v-if="$store.getters.buttons.includes('downContractHandler') || $store.getters.buttons.includes('upContractHandler')">
        <template slot-scope="scope">
          <el-button @click="toView(scope.row)" type="text">处理</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { selectTaskAgentVoList } from '@/api/taskagent';

  export default {
    name: 'taskagents',
    data() {
      return {
        listLoading: false,
        list: null
      };
    },
    created() {
      this.getList();
    },
    methods: {
      getList() {
        this.listLoading = true;
        selectTaskAgentVoList().then(response => {
          this.list = response.data;
          this.listLoading = false;
        }).catch(function(error) {
          console.log(error);
          this.listLoading = false;
        });
      },
      toView(row) {
        console.log(row);
        if (row.status === "8001") {
          this.$router.push({ path: `taskagents/auditcontract/?contractCode=${row.contractCode}&statusName=${row.statusName}&version=${row.version}` });
        }
        if (row.status === "2301") {
          this.$router.push({ path: `downtaskagents/auditcontract/?dsContractCode=${row.contractCode}&statusName=${row.statusName}&version=${row.version}` });
        }
      }

    }
  };
</script>

<style>
</style>
