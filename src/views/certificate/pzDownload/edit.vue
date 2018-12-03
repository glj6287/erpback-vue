<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" style="max-width: 600px;height: 700px;">

          <div class="modal-header">
            <slot name="header">
              <h3 slot="header" class="text">选择凭证日期</h3>
              <i class="el-icon-close close" @click="$emit('close')" title="关闭窗口"></i>
            </slot>
          </div>

          <div class="modal-body" v-loading="getDataLoading" element-loading-text="请给我点时间！">
            <slot name="body">
               <el-form class="form-container"  ref="submitForm" label-width="60px">
                    <el-form-item label="年份" prop="name">
                        <el-date-picker v-model="year" @change="dateChange" type="date" size="small" style="width:200px;"></el-date-picker>
                    </el-form-item>
               </el-form>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
               <el-button type="primary" v-loading="submitLoading" @click="submit">开始更新</el-button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Utils from "@/utils/common";
import { exportMainBussCost } from "@/api/jdDataProcessing";
export default {
  props: {
    // isEdit: {
    //   type: Boolean,
    //   default: false
    // },
  },
  data() {
    return {
      year: "",
      submitLoading: false,
      getDataLoading: false,
      options1: [
        { dictCode: "2017", dictValue: "2017" },
        { dictCode: "2018", dictValue: "2018" },
        { dictCode: "2019", dictValue: "2019" },
        { dictCode: "2020", dictValue: "2020" },
        { dictCode: "2021", dictValue: "2021" },
        { dictCode: "2022", dictValue: "2022" }
      ],
      rules: {
        // jobNum: [
        //   { required: true, message: '请输入用户工号', trigger: 'blur' },
        //   { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        // ],
      }
    };
  },
  created() {},
  methods: {
    // getList() {},
    // 提交修改
    submit() {
      this.submitLoading = true;
      exportMainBussCost(this.year)
        .then(response => {
          this.$emit("close");
          this.$emit("getList");
          Utils.success(response.msg);
        })
        .catch(error => {
          this.submitLoading = false;
          Utils.error(error);
        });
    },

    dateChange(value) {
      if (value != null && value !== "") {
        this.year = value;
      }
    }
    // submitChange() {
    //   this.$refs["submitForm"].validate(valid => {
    //     if (valid) {
    //       this.submitLoading = true;
    //       submitChangeName(this.id, this.user.name, this.version)
    //         .then(response => {
    //           console.log(response.data);
    //           this.submitLoading = false;
    //           this.$emit("close");
    //           this.$emit("getList");
    //           Utils.success(`${this.isEdit ? "修改" : "添加"}成功`);
    //         })
    //         .catch(error => {
    //           Utils.error(error);
    //           this.submitLoading = false;
    //         });
    //     } else {
    //       return false;
    //     }
    //   });
    // }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-cascader,
.el-select {
  width: 100%;
}
.modal-body {
  margin: 20px 0;
  height: calc(100% - 106px);
  overflow-y: auto;
}
.modal-container {
  max-width: 350px !important;
  height: 210px !important;
}
</style>
