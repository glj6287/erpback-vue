<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" style="max-width: 600px;">

          <div class="modal-header">
            <slot name="header">
              <h3 slot="header" class="text">{{isEdit ? '编辑' : '新增'}}banner</h3>
              <i class="el-icon-close close" @click="$emit('close')" title="关闭窗口"></i>
            </slot>
          </div>

          <div class="modal-body" v-loading="getDataLoading" element-loading-text="请给我点时间！">
            <slot name="body">
              <el-form class="form-container" :model="banner" :rules="rules" ref="submitForm" label-width="110px">
                <el-form-item label="banner所属:" prop="belongto" class="itemblock">
                  <el-select v-model="banner.belongto" size="small" style="width: 174px;" @change="itemChange(banner.belongto)">
                    <el-option v-for="item in belongToOptions" :key="item.id" :label="item.dictValue" :value="item.dictCode"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="banner图片:" prop="picturesid" class="itemblock">
                  <el-upload
                    list-type="picture-card"
                    ref="uploadForm"
                    :headers="headers"
                    :action="uploadAction"
                    :before-upload="handlebeforeUpload"
                    :on-change="loadJsonFromFile"
                    :on-success="handleSuccess"
                    :on-error="handleError"
                    :on-remove="handleRemove"
                    >
                    <i class="el-icon-plus"></i>
                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过5M</div>
                  </el-upload>
                </el-form-item>
                <el-form-item label="跳转url:" prop="actionurl" >
                  <el-input v-model="banner.actionurl" placeholder="跳转url"></el-input>
                </el-form-item>
                <el-form-item label="显示顺序:" prop="orderby">
                  <el-input v-model="banner.orderby" @keyup.native="Number" placeholder="显示顺序"></el-input>
                </el-form-item>
              </el-form>
            </slot>
          </div>

          <div class="modal-footer" >
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
  import { getbanner, submitBanner } from "@/api/website";
  import { getBannerBelongto } from "@/api/basedata";
  import { getToken } from "@/utils/auth";

  export default {
    props: {
      isEdit: {
        type: Boolean,
        default: false
      },
      dataId: {
        type: String,
        default: ""
      }
    },
    data() {
      var validateImgFile = (rule, value, callback) => {
        if (this.uploadFileCode === "") {
          callback(new Error("请上传banner图片"));
        } else {
          callback();
        }
      };
      return {
        uploadAction: "",
        submitLoading: false,
        getDataLoading: false,
        belongToOptions: [],
        fileList: [],
        uploadFileCode: "",
        banner: {
          identifier: this.dataId,
          belongto: "",
          actionurl: "",
          picturesid: "",
          orderby: ""
        },
        headers: {
          "Authorization": getToken()
        },
        rules: {
          belongto: [
            { required: true, message: "请选择banner归属", trigger: "blur" }
          ],
          picturesid: [
            { validator: validateImgFile, trigger: "blur" }
          ]
        }
      };
    },
    created() {
      if (this.isEdit) {
        console.log(this.isEdit);
        this.getDetail();
      }
      this.deadlineOptions();
    },
    methods: {
      getDetail() {
        this.getDataLoading = true;
        getbanner(this.dataId)
          .then(response => {
            // 这个控件需要用字符串才能设置默认值
            this.banner.belongto = `${response.data.belongto}`;
            this.banner.actionurl = `${response.data.actionurl}`;
            this.banner.picturesid = `${response.data.picturesid}`;
            this.banner.orderby = `${response.data.orderby}`;
            this.uploadFileCode = this.banner.picturesid;
            this.getDataLoading = false;
          })
          .catch(error => {
            Utils.error(error);
            this.getDataLoading = false;
          });
      },
      deadlineOptions() {
        getBannerBelongto().then(response => {
          this.belongToOptions = response.data;
        });
      },
      itemChange(val) {
        if (val === "banner_pc") {
          this.uploadAction = `${process.env.BASE_API}/banner/uploadBannerImg/1229`;
        } else {
          this.uploadAction = `${process.env.BASE_API}/banner/uploadBannerImg/1230`;
        }
      },
      submit() {
        this.$refs["submitForm"].validate(valid => {
          if (valid) {
            this.submitLoading = true;
            if (!this.isEdit) {
              this.banner.identifier = "";
            }
            this.banner.picturesid = this.uploadFileCode;
            submitBanner(this.isEdit, this.banner).then(response => {
              this.submitLoading = false;
              this.$emit("close");
              this.$emit("refresh");
              Utils.success(`${this.isEdit ? "修改" : "添加"}成功`);
              this.$refs.uploadForm.clearFiles();
            }).catch(error => {
              Utils.error(error);
              this.submitLoading = false;
              this.$refs.uploadForm.clearFiles();
            });
          } else {
            return false;
          }
        });
      },
      handlebeforeUpload(file) {
        const isImage = file.type === 'image/jpeg'||'image/gif'||'image/png';
        const isLt2M = file.size / 1024 / 1024 < 5;
        if (!isImage) {
          this.$message.error('只能上传jpg/png文件!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 5MB!');
        }
        if (this.banner.belongto === "") {
          this.$message.error("请选择banner归属");
          return false;
        }
        if ((isImage && isLt2M)) {
          this.handleRemove();
        }
        return isImage && isLt2M;
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      loadJsonFromFile(file, fileList) {
        this.fileList = fileList;
        console.log(this.fileList.length);
      },
      handleSuccess(response, file, fileList) {
        console.log(response);
        if (response.code === "000000") {
          this.$message.success("上传成功！");
          this.uploadFileCode = response.data.attcCodes;
        } else {
          this.$message.error(response.msg);
        }
      },
      handleError(err, file, fileList) {
        console.log(err);
        this.$message.error("上传失败！");
        this.$refs.uploadForm.clearFiles();
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  /*.el-cascader, .el-select {*/
    /*width: 100%;*/
  /*}*/
  .modal-container {
    max-width: 700px !important;
    height: 70% !important;
  }
</style>
