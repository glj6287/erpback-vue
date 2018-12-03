<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" style="max-width: 950px;">

          <div class="modal-header">
            <slot name="header">
              <h3 slot="header" class="text">发票登记</h3>
              <i class="el-icon-close close" @click="$emit('close')" title="关闭窗口"></i>
            </slot>
          </div>

          <div class="modal-body" v-loading="getDataLoading" element-loading-text="请给我点时间！">
             <el-form class="form-container"  :model="listQuery" :rules="rules" label-width="100px"  :inline="true" ref="searchForm" style="text-align:center">
                 <el-form-item label="实际开票日期"  prop="realKpday" class="uodateBecome">
                    <el-date-picker v-model="listQuery.realKpday" @change="createTimeEndChange" type="date" size="small" placeholder="" style="width:180px;"></el-date-picker>
                </el-form-item>
                 <el-form-item label="发票号码" prop="fpNum">
                    <el-input v-model="listQuery.fpNum" size="small"
                            ></el-input>
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
import { fnChangekpdetails } from "@/api/kpmanage";
export default {
  props: {
    sjrealKpday: {
      type: String,
      default: ""
    },
    sjId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      downloadType: "",
      submitLoading: false,
      getDataLoading: false,
      dutySearchLoading: false,
      id: this.sjId,
      listQuery: {
        realKpday: this.sjrealKpday,
        fpNum: null
      },
      rules: {
          fpNum: [
            { required: true, message: '八位数字！', trigger: 'blur'},
            { pattern: /^(\d{8})?$/, message: '八位数字！', trigger: 'blur'}
          ]
        }
    };
  },
  created() {
    // console.log(this.listQuery.realKpday);
  },
  methods: {
    //确定
    createTimeEndChange(value) {
      if (value != null && value !== "") {
        this.listQuery.realKpday = value + " 23:59:59";
      }
    },

    //点击确定修改
    confirmHandle() {
      this.submitLoading = true;
      fnChangekpdetails(this.id, this.listQuery)
        .then(response => {
          if (response.code == "000000") {
            Utils.success("修改成功!");
            this.$emit("getList");
            this.$emit("close");
            this.submitLoading = true;
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
  width: 25%;
  height: calc(100% - 620px);
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
