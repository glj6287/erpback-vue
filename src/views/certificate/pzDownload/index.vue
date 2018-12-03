<template>
    <div class="app-container"> 
      <div class="updateType">下载类型</div>
        <el-row class="btn_block">
            <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                    <el-button type="primary" @click="updataHandleClick">计提主营业务成本</el-button>
                </div>
            </el-col>
        </el-row>
       <edit-modal v-if="showModal" @close="showModal = false"></edit-modal>
    </div>
</template>

<script>
import EditModal from "./edit";
export default {
  components: {
    EditModal
  },
  data() {
    return {
      showModal: false
    };
  },
  methods:{
      updataHandleClick(){
          this.showModal = !false
      }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.updateType {
  margin-bottom: 40px;
}
.btn_block {
  margin-bottom: 80px;
}
</style>
