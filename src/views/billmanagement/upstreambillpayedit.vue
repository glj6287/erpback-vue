<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" style="max-width: 700px;height: 700px;">

          <div class="modal-header">
            <slot name="header">
              <h3 slot="header" class="text">上游账单销账</h3>
              <i class="el-icon-close close" @click="$emit('close')" title="关闭窗口"></i>
            </slot>
          </div>

          <div class="modal-body" v-loading="getDataLoading" element-loading-text="请给我点时间！">
            <slot name="body">
              <el-form class="form-container" :rules="rules" ref="submitForm" :model="billRecord" label-width="120px">
                <el-form-item label="本次支付金额:" prop="payMoney">
                  <el-row>
                    <el-col :span="23">
                      <el-input v-model="billRecord.payMoney" placeholder="本次支付金额" :maxlength="inputMaxL"  @input="inputMaxL = /^\d+\.?\d{0,1}$/.test(billRecord.payMoney) ? null : billRecord.payMoney.length - 1"></el-input>
                    </el-col>
                    <el-col :span="1">
                      &nbsp;元
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="本次支付账户:" prop="payBankNumber">
                  <el-input v-model="billRecord.payBankNumber" placeholder="本次支付账户"></el-input>
                </el-form-item>
                <el-form-item label="本次支付备注:" prop="remarks">
                  <el-input type="textarea"
                            :rows="2" v-model="billRecord.remarks" placeholder="备注"></el-input>
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
  import Utils from "@/utils/common";
  import { saveUpPayableRecord } from "@/api/bill";

  export default {
    props: {
      dataId: {
        type: String,
        default: null
      }
    },
    data() {
      return {
        submitLoading: false,
        getDataLoading: false,
        billRecord: {
          payableBillCode: this.dataId,
          payMoney: "",
          payBankNumber: "",
          remarks: ""
        },
        inputMaxL: 99999999999999,
        rules: {
          payMoney: [
            { required: true, message: "请输入支付金额", trigger: "blur" },
            { type: 'number', message: '金额必须为数字值', trigger: 'blur', transform(value) {
              return Number(value);
            }
            }
          ],
          payBankNumber: [
            { required: true, message: "请输入支付账户", trigger: "blur" }
          ],
          remarks: [
            { required: true, message: "请输入备注", trigger: "blur" }
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
            console.log(this.billRecord);
            saveUpPayableRecord(this.billRecord).then(response => {
              this.submitLoading = false;
              this.$emit("close");
              this.$emit("refresh");
              Utils.success(`销账成功`);
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
  .modal-container {
    max-width: 600px !important;
    height: 60% !important;
  }
</style>
