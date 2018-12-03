<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" style="max-width: 500px; height: 400px">

          <div class="modal-header">
            <slot name="header">
              <h3 slot="header" class="text">修改特工</h3>
              <i class="el-icon-close close" @click="$emit('close')" title="关闭窗口"></i>
            </slot>
          </div>

          <div class="modal-body" v-loading="getDataLoading" element-loading-text="请给我点时间！">
            <slot name="body">
              <el-form class="form-container" :rules="rules" ref="submitForm" :model="house" label-width="100px">
                <el-form-item label="新管家：" prop="steward">
                  <el-select v-model="house.steward" style="width: 200px;" clearable>
                    <el-option v-for="item in stateOptions"
                               :key="item.userCode"
                               :label="item.userName"
                               :value="item.userCode">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="修改原因：" prop="reasonUpdated">
                  <el-input type="textarea" v-model="house.reasonUpdated" placeholder="修改原因"></el-input>
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
  import { info, updateSteward, userInfo } from '@/api/house';

  export default {
    props: {
      dataId: {
        type: String,
        default: null
      },
      communityCode: {
        type: String,
        default: null
      }
    },
    data() {
      return {
        submitLoading: false,
        getDataLoading: false,
        stewardName: "",
        // communityCode: this.communityCode,
        house: {
          houseCode: this.dataId,
          steward: "",
          reasonUpdated: "",
          version: ""
        },
        filters: {
        },
        stateOptions: [],
        rules: {
          steward: [
            { required: true, message: '请选择管家', trigger: 'blur' }
          ],
          reasonUpdated: [
            { required: true, message: '请填写修改原因', trigger: 'blur' }
          ]
        }
      };
    },
    created() {
      this.userInfo();
      this.getDetail();
    },
    methods: {
      getDetail() {
        this.getDataLoading = true;
        info(this.dataId).then(response => {
          // this.house = response.data;
          this.house.steward = response.data.stewardName;
          this.stewardName = response.data.stewardName;// 原来管家名称
          this.house.reasonUpdated = response.data.reasonUpdated;
          this.house.version = response.data.version;
          console.log(this.house);
          this.getDataLoading = false;
        }).catch(error => {
          Utils.error(error);
          this.getDataLoading = false;
        });
      },
      userInfo() {
        userInfo(this.communityCode).then(response => {
          this.stateOptions = response.data;
        });
      },
      submit() {
        this.$refs["submitForm"].validate(valid => {
          if (valid) {
            if (this.stewardName === this.house.steward) {
              Utils.error("房源已经属于该管家了！");
              return false;
            }
            this.submitLoading = true;
            delete this.house.createTime;
            delete this.house.updateTime;
            console.log(this.house);
            updateSteward(this.house).then(response => {
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
