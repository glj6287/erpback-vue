<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" style="max-width: 950px;">

          <div class="modal-header">
            <slot name="header">
              <h3 slot="header" class="text">应开票日期修改</h3>
              <i class="el-icon-close close" @click="$emit('close')" title="关闭窗口"></i>
            </slot>
          </div>

          <div class="modal-body" v-loading="getDataLoading" element-loading-text="请给我点时间！">
             <el-form class="form-container"  :model="listQuery" :inline="true" ref="searchForm" style="text-align:center">
                 <el-form-item  prop="uodateBecome" class="uodateBecome">
                    <!-- <el-input v-model="listQuery.uodateBecome" size="small" placeholder="" @keyup.enter.native="search"></el-input> -->
                    <el-date-picker v-model="listQuery.uodateBecomeTime" @change="createTimeEndChange" type="date" size="small" placeholder="" style="width:180px;"></el-date-picker>
                </el-form-item>
           </el-form> 
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <el-button type="primary" v-loading="submitLoading" @click="confirmHandle">确定</el-button>
            </slot>
          </div>

        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Utils from "@/utils/common";
import { fnOughtDay } from "@/api/kpmanage";
export default {
  props: {
    kpdays: {
      type: String,
      default: ""
    },
    kpId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      isCompile: true,
      downloadType: "",
      submitLoading: false,
      getDataLoading: false,
      dutySearchLoading: false,
      id: this.kpId,
      listQuery: {
        uodateBecomeTime: this.kpdays
      }
    };
  },

  created() {
    console.log(this.kpdays);
  },
  methods: {
    //确定
    confirmHandle() {},
    createTimeEndChange(value) {
      if (value != null && value !== "") {
        this.listQuery.uodateBecomeTime = value + " 23:59:59";
      }
    },

    //点击确定修改
    confirmHandle() {
      this.submitLoading = true;
      fnOughtDay(this.id, this.listQuery.uodateBecomeTime)
        .then(response => {
          if (response.code == "000000") {
            Utils.success("修改成功!");
            this.submitLoading = true;
            this.$emit("getList");
            this.$emit("close");
          }
        })
        .catch(error => {
          this.submitLoading = false;
          Utils.error(error);
        });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.modal-container {
  width: 20%;
  height: calc(100% - 600px);
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
.uodateBecome {
  padding-top: 25px;
}
</style>
