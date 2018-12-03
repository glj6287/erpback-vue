<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" style="max-width: 500px; height: 400px">

          <div class="modal-header">
            <slot name="header">
              <h3 slot="header" class="text">修改价格</h3>
              <i class="el-icon-close close" @click="$emit('close')" title="关闭窗口"></i>
            </slot>
          </div>

          <div class="modal-body" v-loading="getDataLoading" element-loading-text="请给我点时间！">
            <slot name="body">
              <el-form class="form-container" :rules="rules" ref="submitForm" :model="house" label-width="100px">
                <el-form-item label="底价：" prop="fixedPrice" >
                  <el-row>
                    <el-col :span="20">
                      <el-input v-model="house.fixedPrice" placeholder="底价"></el-input>
                    </el-col>
                    <el-col :span="4">
                      &nbsp;元/月
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="售价：" prop="sellingPrice">
                  <el-row>
                    <el-col :span="20">
                      <el-input v-model="house.sellingPrice" placeholder="售价"></el-input>
                    </el-col>
                    <el-col :span="4">
                      &nbsp;元/月
                    </el-col>
                  </el-row>

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
  import { info, updatePrice } from '@/api/house';

  export default {
    props: {
      dataId: {
        type: String,
        default: null
      }
    },
    data() {
      const validateAmount = (rule, value, callback) => {
        if (value === null) {
          callback(new Error("请输入金额"));
        } else if (value === "0") {
          callback(new Error("金额不能为0"));
        } else if (/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/.test(value) === false) {
          callback(new Error("金额只能输入包含两位小数的数"));
        } else {
          callback();
        }
      };
      return {
        submitLoading: false,
        getDataLoading: false,
        house: {
          houseCode: this.dataId,
          fixedPrice: null,
          sellingPrice: null,
          version: ""
        },
        filters: {
        },
        stateOptions: [],
        rules: {
          fixedPrice: [
            { required: true, validator: validateAmount }
          ],
          sellingPrice: [
            { required: true, validator: validateAmount }
          ]
        }
      };
    },
    created() {
      this.getDetail();
    },
    methods: {
      getDetail() {
        this.getDataLoading = true;
        console.log(this.dataId);
        info(this.dataId).then(response => {
          // this.house = response.data;
          this.house.fixedPrice = response.data.fixedPrice;
          this.house.sellingPrice = response.data.sellingPrice;
          this.house.version = response.data.version;
          this.getDataLoading = false;
        }).catch(error => {
          Utils.error(error);
          this.getDataLoading = false;
        });
      },
      submit() {
        this.$refs["submitForm"].validate(valid => {
          if (valid) {
            this.submitLoading = true;
            delete this.house.createTime;
            delete this.house.updateTime;
            console.log(this.house)
            updatePrice(this.house).then(response => {
              this.submitLoading = false;
              this.$emit("close");
              this.$emit("refresh");
              Utils.success("修改成功");
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
