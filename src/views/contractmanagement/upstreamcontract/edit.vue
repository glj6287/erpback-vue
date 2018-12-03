<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" style="max-width: 25%; max-height:40%">

          <div class="modal-header">
            <slot name="header">
              <h3 slot="header" class="text">退租</h3>
              <i class="el-icon-close close" @click="$emit('close')" title="关闭窗口"></i>
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <el-form class="form-container" :rules="rules" ref="submitForm" :model="throwLease">
                <el-form-item label="实际退租日期:" prop="throwLeaseTime" >
                  <el-date-picker
                    v-model="throwLease.throwLeaseTime"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    :picker-options="pickerOptions"
                  />
                </el-form-item>
                <el-form-item label="退租原因:" prop="remark">
                  <el-select v-model="throwLease.remark" style="width: 220px;">
                    <el-option v-for="item in stateOptions" :key="item.label" :label="item.value" :value="item.value" />
                  </el-select>
                </el-form-item>
              </el-form>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <el-button @click="$emit('close')">取消</el-button>
              <el-button type="primary" v-loading="submitLoading" @click="submit">确定</el-button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import Utils from '@/utils/common'
  import { throwLease } from "@/api/upContract";

  export default {
    props: {
      dataId: {
        type: String,
        default: ""
      },
      version: {
        type: Number,
        default: null
      },
      dateStartTime: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        submitLoading: false,
        throwLease: {
          throwLeaseTime: null,
          remark: "",
          version: this.version,
          contractCode: this.dataId,
          dateStartTime1: this.dateStartTime
        },
        pickerOptions: {
          disabledDate(time) {
            return new Date(time) > Date.now();
          }
        },
        stateOptions: [
          { value:"到期终止", label:"1" },
          { value:"我方违约", label:"2" },
          { value:"房东违约", label:"3" }
        ],
        rules: {
          throwLeaseTime: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          remark: [
            { required: true, message: '请选择退租原因', trigger: 'blur' }
          ]
        }
      };
    },
    created() {
    },
    methods: {
      submit() {
        this.$refs["submitForm"].validate(valid => {
          if (valid) {
            this.submitLoading = true;
            console.log(this.throwLease);
            throwLease(this.throwLease).then(response => {
              this.submitLoading = false;
              this.$emit("close");
              this.$emit("refresh");
              Utils.success("退租成功");
            }).catch(error => {
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
  /*.el-cascader, .el-select {*/
    /*width: 100%;*/
  /*}*/
</style>
