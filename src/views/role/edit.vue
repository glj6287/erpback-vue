<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" style="max-width: 600px;">

          <div class="modal-header">
            <slot name="header">
              <h3 slot="header" class="text">{{isEdit ? '编辑' : '新增'}}角色信息</h3>
              <i class="el-icon-close close" @click="$emit('close')" title="关闭窗口"></i>
            </slot>
          </div>

          <div class="modal-body" v-loading="getDataLoading" element-loading-text="请给我点时间！">
            <slot name="body">
              <el-form class="form-container" :rules="rules" ref="submitForm" :model="role">
                <el-form-item label="角色名称" prop="roleName">
                  <el-input v-model="role.roleName" placeholder="角色名称"></el-input>
                </el-form-item>
                <el-form-item label="角色编码" prop="roleCode">
                  <el-input v-model="role.roleCode" placeholder="角色编码"></el-input>
                </el-form-item>
                <el-form-item label="是否有效">
                  <el-switch v-model="role.state"
                             active-color="#13ce66" inactive-color="#ccc"
                             on-text="有效" off-text="无效"
                             on-value="1" off-value="0"></el-switch>
                </el-form-item>
              </el-form>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <el-button @click="$emit('close')">取消</el-button>
              <el-button type="primary" v-loading="submitLoading" @click="submit">提交</el-button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import Utils from '@/utils/common'
  import {roleAdd} from '@/api/role'

  export default {
    props: {
      isEdit: {
        type: Boolean,
        default: false
      },
      dataId: {
        type: Number,
        default: null
      }
    },
    data() {
      return {
        submitLoading: false,
        getDataLoading: false,
        role: {
          dataId: this.dataId,
          roleName: '',
          roleCode: '',
          state: '0'
        },
        rules: {
          roleName: [
            { required: true, message: '请输入角色名称', trigger: 'blur' }
          ],
          roleCode: [
            { required: true, message: '请输入角色编码', trigger: 'blur' }
          ]
        }
      }
    },
    created() {
      if (this.isEdit) {
        console.log(this.isEdit);
      }
    },
    methods: {
      submit() {
        this.$refs['submitForm'].validate((valid) => {
          if (valid) {
            this.submitLoading = true
            roleAdd(this.role).then(response => {
              this.submitLoading = false
              this.$emit('close')
              this.$emit('refresh')
              Utils.success(`${this.isEdit ? '修改' : '添加'}成功`)
            }).catch(error => {
              this.submitLoading = false
            })
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  /*.el-cascader, .el-select {*/
    /*width: 100%;*/
  /*}*/
</style>
