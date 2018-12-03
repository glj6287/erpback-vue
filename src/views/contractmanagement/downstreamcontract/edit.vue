<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" style="width: 500px;height: 500px">

          <div class="modal-header">
            <slot name="header">
              <h3 slot="header" class="text">修改质押</h3>
              <i class="el-icon-close close" @click="$emit('close')" title="关闭窗口"></i>
            </slot>
          </div>

          <div class="modal-body" v-loading="getDataLoading" element-loading-text="请给我点时间！">
            <slot name="body">
              <el-form class="form-container" :rules="rules" ref="submitForm" :model="pledge">
                <el-form-item label="质押方:" prop="pledgeParty">
                  <el-select v-model="pledge.pledgeParty" size="small" style="width: 200px;" clearable>
                    <el-option v-for="item in pledgePartyOptions" :key="item.dictCode" :label="item.dictValue" :value="item.dictCode"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="开始时间:" prop="pledgeStart">
                  <el-select v-model="pledge.pledgeStart" size="small" style="width: 200px;" clearable>
                    <el-option v-for="item in pledgeStartOptions" :key="item.id" :label="'第'+ item.currentPeriod + '期 | ' + item.startDate" :value="item.startDate"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="结束时间:" prop="pledgeEnd">
                  <el-select v-model="pledge.pledgeEnd" size="small" style="width: 200px;" clearable>
                    <el-option v-for="item in pledgeEndOptions" :key="item.id" :label="'第' + item.currentPeriod + '期 | ' + item.endDate" :value="item.endDate"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="备注:" prop="remark">
                  <el-input type="textarea"
                            :rows="2" v-model="pledge.remark" placeholder="备注"></el-input>
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
  import Utils from '@/utils/common';
  import { getPledge, getTenantsBill, saveAndUpdateDownPledge } from "@/api/downContract";
  import { getPledgeParty } from "@/api/basedata";

  export default {
    props: {
      dataId: {
        type: String,
        default: ""
      },
      contractCode: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        submitLoading: false,
        getDataLoading: false,
        pledgePartyOptions: [],
        pledgeStartOptions: [],
        pledgeEndOptions: [],
        pledge: {
          pledgeCode: this.dataId,
          dsContractCode: this.contractCode,
          pledgeParty: "",
          pledgeStart: "",
          pledgeEnd: "",
          remark: ""
        },
        rules: {
          pledgeParty: [
            { required: true, message: '请选择质押方', trigger: 'change' }
          ],
          pledgeStart: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          pledgeEnd: [
            { required: true, message: '请选择', trigger: 'change' }
          ]
        }
      };
    },
    created() {
      this.getDetail();
      this.deadlineOptions();
    },
    methods: {
      getDetail() {
        // console.log(this.dataId)
        if (this.dataId !== null && this.dataId !== "") {
          this.getDataLoading = true;
          getPledge(this.dataId)
            .then(response => {
              // console.log(response.data)
              // this.pledge = response.data;
              // 这个控件需要用字符串才能设置默认值
              this.pledge.pledgeParty = `${response.data.pledgeParty}`;
              this.pledge.pledgeStart = `${response.data.pledgeStartStr}`;
              this.pledge.pledgeEnd = `${response.data.pledgeEndStr}`;
              this.pledge.remark = `${response.data.remark}`;
              this.getDataLoading = false;
            });
        }
      },
      deadlineOptions() {
        getPledgeParty().then(response => {
          this.pledgePartyOptions = response.data;
        });
        // console.log(this.pledge.dsContractCode)
        getTenantsBill(this.pledge.dsContractCode).then(response => {
          console.log(response.data)
          this.pledgeStartOptions = response.data;
          this.pledgeEndOptions = response.data;
        });
      },
      submit() {
        this.$refs["submitForm"].validate(valid => {
          if (valid) {
            var time1 = new Date(this.pledge.pledgeStart).getTime();
            var time2 = new Date(this.pledge.pledgeEnd).getTime();
            if (time1 >= time2) {
              Utils.warning("开始时间不能大于结束时间！");
              return false;
            }
            this.submitLoading = true;
            saveAndUpdateDownPledge(this.pledge).then(response => {
              this.submitLoading = false;
              this.$emit("close");
              this.$emit("refresh");
              Utils.success(`操作成功`);
            }).catch(error => {
              // Utils.error(error);
              this.submitLoading = false;
            });
          } else {
            return false;
          }
        });
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  /*.el-cascader, .el-select {*/
    /*width: 100%;*/
  /*}*/
</style>
