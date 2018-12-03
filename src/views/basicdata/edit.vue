<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" style="max-width: 600px;height: 700px;">

          <div class="modal-header">
            <slot name="header">
              <h3 slot="header" class="text">{{isEdit ? '修改' : '新增'}}社区</h3>
              <i class="el-icon-close close" @click="$emit('close')" title="关闭窗口"></i>
            </slot>
          </div>

          <div class="modal-body" v-loading="getDataLoading" element-loading-text="请给我点时间！">
            <slot name="body">
               <el-form class="form-container" :rules="rules" ref="submitForm" :model="user" label-width="100px">
                <el-form-item label="社区名称" prop="name">
                  <el-input v-model="user.name"  placeholder="社区名称"></el-input>
                </el-form-item>
              </el-form>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <el-button v-if="!isEdit" type="primary" v-loading="submitLoading" @click="submit">提交</el-button>
              <el-button v-if="isEdit" type="primary" v-loading="submitLoading" @click="submitChange">修改</el-button>
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
import { submitUserName, submitChangeName } from "@/api/community";
export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ""
    },
    id: {
      type: Number,
      default: null
    },
    version: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      submitLoading: false,
      getDataLoading: false,
      user: {
        name: this.name
      },
      // id:this.id,
      rules: {
        // jobNum: [
        //   { required: true, message: '请输入用户工号', trigger: 'blur' },
        //   { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        // ],
      }
    };
  },
  created() {
    // this.getList()
  },
  methods: {
    // 提交修改
    submit() {
      this.$refs["submitForm"].validate(valid => {
        if (valid) {
          this.submitLoading = true;
          submitUserName(this.user.name)
            .then(response => {
              this.submitLoading = false;
              this.$emit("close");
              this.$emit("getList");
              Utils.success(`${this.isEdit ? "修改" : "添加"}成功`);
            })
            .catch(error => {
              Utils.error(error);
              this.submitLoading = false;
            });
        } else {
          return false;
        }
      });
    },

    submitChange() {
      this.$refs["submitForm"].validate(valid => {
        if (valid) {
          this.submitLoading = true;
          submitChangeName(this.id, this.user.name, this.version)
            .then(response => {
              console.log(response.data);
              this.submitLoading = false;
              this.$emit("close");
              this.$emit("getList");
              Utils.success(`${this.isEdit ? "修改" : "添加"}成功`);
            })
            .catch(error => {
              Utils.error(error);
              this.submitLoading = false;
            });
        } else {
          return false;
        }
      });
    }

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
  height: 210px !important;
}
</style>
