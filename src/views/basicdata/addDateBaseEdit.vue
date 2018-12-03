<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" style="max-width: 600px;height: 700px;">

          <div class="modal-header">
            <slot name="header">
              <h3 slot="header" class="text">数据库名新增</h3>
              <i class="el-icon-close close" @click="$emit('close')" title="关闭窗口"></i>
            </slot>
          </div>

          <div class="modal-body" v-loading="getDataLoading" :model="user" element-loading-text="请给我点时间！">
            <slot name="body">
               <el-form class="form-container"  ref="submitForm" label-width="100px">
                        <el-form-item label="年份" prop="year">
                                <el-input v-model="user.year"  ></el-input>
                        </el-form-item>
                         <el-form-item label="数据库名称" prop="name">
                                <el-input v-model="user.name"  ></el-input>
                        </el-form-item>
               </el-form>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
               <el-button type="primary" v-loading="submitLoading" @click="submit">确定</el-button>
               <el-button @click="$emit('close')">取消</el-button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Utils from "@/utils/common";
import { fnAddBaseUpdate } from "@/api/jdDataProcessing";
export default {
  props: {
    // isEdit: {
    //   type: Boolean,
    //   default: false
    // },
  },
  data() {
    return {
      user: {
        year: "",
        namne: ""
      },
      submitLoading: false,
      getDataLoading: false,
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
    // 提交修改
    submit() {
      this.submitLoading = true;
      fnAddBaseUpdate(this.user)
        .then(response => {
          console.log(response.data);
          this.$emit("close");
          this.$emit("getList");
          Utils.success(response.msg);
        })
        .catch(error => {
          Utils.error(error);
          this.submitLoading = false;
        });

      //   this.$refs["submitForm"].validate(valid => {
      //     if (valid) {
      //       this.submitLoading = true;
      //       submitUserName(this.user.name)
      //         .then(response => {
      //           this.submitLoading = false;
      //
      //           Utils.success(`${this.isEdit ? "修改" : "添加"}成功`);
      //         })
      //         .catch(error => {
      //
      //         });
      //     } else {
      //       return false;
      //     }
      //   });
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
  max-width: 400px !important;
  height: 290px !important;
}
</style>
