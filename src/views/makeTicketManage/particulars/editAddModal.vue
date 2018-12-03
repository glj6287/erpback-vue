<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" style="max-width: 950px;">

          <div class="modal-header">
            <slot name="header">
              <h3 slot="header" class="text">已{{isEdit == false ? "开票" : "快递"}}导入</h3>
              <i class="el-icon-close close" @click="$emit('close')" title="关闭窗口"></i>
            </slot>
          </div>

          <div class="modal-body" v-loading="getDataLoading" element-loading-text="请给我点时间！">
              <!-- <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                 multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList" style="display:inline-block">
                <el-button size="small" type="primary">选择文件</el-button>
              </el-upload> -->
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <el-button type="primary" v-loading="submitLoading" @click="closed">关闭</el-button>
              <el-button type="primary" v-loading="submitLoading">开始更新</el-button>
            </slot>
          </div>

        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Utils from "@/utils/common";
// import { modifyKpTotal, addKpTotal, houseImport } from "@/api/kpmanage";

export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      submitLoading: false,
      getDataLoading: false,
      dutySearchLoading: false
    };
  },
  created() {
    
  },
  methods: {
    closed() {
      this.$emit("close");
    }
    // getDetail() {
    //   var data = {
    //     id: this.id
    //   };
    // },
    // firstdateChange(value) {
    //   if (value != null && value !== "") {
    //     this.editTotal.firstdate = value;
    //   }
    // },
    // enddateChange(value) {
    //   if (value != null && value !== "") {
    //     this.editTotal.enddate = value;
    //   }
    // },
    // kpfirstChange(value) {
    //   if (value != null && value !== "") {
    //     this.editTotal.kpfirst = value;
    //   }
    // },
    // kpendChange(value) {
    //   if (value != null && value !== "") {
    //     this.editTotal.kpend = value;
    //   }
    // },
    // houseImport() {
    //   if (this.editTotal.houseCode) {
    //     houseImport(this.editTotal).then(response => {
    //       if (response) {
    //         if (response.count > 0) {
    //           this.editTotal = response.data;
    //           this.editTotal.id = null;
    //           this.editTotal.permonth = response.data.permonth + "";
    //         } else {
    //           this.$message.warning("无该房号数据！");
    //         }
    //       }
    //     }).catch(error => {
    //       console.log(error);
    //     });
    //   } else {
    //     this.$message.warning("请输入房号！");
    //   }
    // },


  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.modal-container {
  width: 30%;
  height: auto;
}
.layui-upload-file {
  display: none !important;
  opacity: 0.01;
  filter: Alpha(opacity=1);
}
.el-cascader,
.el-select {
  width: 100%;
}
</style>
