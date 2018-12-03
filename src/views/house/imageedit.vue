<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" style="max-width: 1024px;">

          <div class="modal-header">
            <slot name="header">
              <h3 slot="header" class="text">修改图片</h3>
              <i class="el-icon-close close" @click="$emit('close')" title="关闭窗口"></i>
            </slot>
          </div>

          <div class="modal-body" v-loading="getDataLoading" element-loading-text="请给我点时间！">
            <slot name="body">

              <div class="main">
                <el-row class="housing_detail">
                  <el-col :span="4">
                    <div class="grid-content bg-purple">
                      <span>客厅:</span>
                    </div>
                  </el-col>
                  <el-col :span="20">
                    <div class="grid-content bg-purple-light">
                      <span v-for="item in houseDetail.houseLivingFileList"  :key="item.attcCode">
                        <img  :src="item.attcUrlSmall"  @click="showImageClick(item.attcUrl)" /><el-button type="danger" size="mini" icon="delete" @click="deleteImageClick(item)"></el-button>&nbsp;
                      </span>
                      <span v-if="houseDetail.houseLivingFileList.length < this.maxCount">
                        <el-upload
                          :headers="headers"
                          :action="uploadActionLiving"
                          list-type="picture-card"
                          multiple
                          :show-file-list="false"
                          :on-preview="handlePictureCardPreview"
                          :before-upload="beforeLivingUpload"
                          :on-remove="handleRemove"
                          :on-change="loadJsonFromFile"
                          :on-success="uploadSuccess"
                          :on-error="uploadError">
                          <i class="el-icon-plus"></i>
                          </el-upload>
                          <!-- <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                          </el-dialog> -->
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
                      </span>
                    </div>
                  </el-col>
                </el-row>
                <hr/>
                <el-row class="housing_detail">
                  <el-col :span="4">
                    <div class="grid-content bg-purple">
                      <span>卧室:</span>
                    </div>
                  </el-col>
                  <el-col :span="20">
                    <div class="grid-content bg-purple-light">
                      <span v-for="item in houseDetail.houseBedRoomFileList" :key="item.attcCode">
                        <img  :src="item.attcUrlSmall" @click="showImageClick(item.attcUrl)" /><el-button type="danger" size="mini" icon="delete" @click="deleteImageClick(item)"></el-button>&nbsp;
                      </span>
                      <span v-if="houseDetail.houseBedRoomFileList.length < this.maxCount">
                        <el-upload
                          :headers="headers"
                          :action="uploadActionBedRoom"
                          list-type="picture-card"
                          multiple
                          :show-file-list="false"
                          :on-preview="handlePictureCardPreview"
                          :before-upload="beforeBedRoomUpload"
                          :on-remove="handleRemove"
                          :on-change="loadJsonFromFile"
                          :on-success="uploadSuccess"
                          :on-error="uploadError">
                          <i class="el-icon-plus"></i>
                        </el-upload>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
                      </span>
                    </div>
                  </el-col>
                </el-row>
                <hr/>
                <el-row class="housing_detail">
                  <el-col :span="4">
                    <div class="grid-content bg-purple">
                      <span>厨房:</span>
                    </div>
                  </el-col>
                  <el-col :span="20">
                    <div class="grid-content bg-purple-light">
                      <span  v-for="item in houseDetail.houseKitchenFileList" :key="item.attcCode">
                        <img  :src="item.attcUrlSmall"  @click="showImageClick(item.attcUrl)" /><el-button type="danger" size="mini" icon="delete" @click="deleteImageClick(item)"></el-button>&nbsp;
                      </span>
                      <span v-if="houseDetail.houseKitchenFileList.length < this.maxCount">
                        <el-upload
                          :headers="headers"
                          :action="uploadActionKitchen"
                          list-type="picture-card"
                          multiple
                          :show-file-list="false"
                          :on-preview="handlePictureCardPreview"
                          :before-upload="beforeKitchenUpload"
                          :on-remove="handleRemove"
                          :on-change="loadJsonFromFile"
                          :on-success="uploadSuccess"
                          :on-error="uploadError">
                          <i class="el-icon-plus"></i>
                        </el-upload>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
                      </span>
                    </div>
                  </el-col>
                </el-row>
                <hr/>
                <el-row class="housing_detail">
                  <el-col :span="4">
                    <div class="grid-content bg-purple">
                      <span>餐厅:</span>
                    </div>
                  </el-col>
                  <el-col :span="20">
                    <div class="grid-content bg-purple-light">
                      <span v-for="item in houseDetail.houseDiningFileList" :key="item.attcCode">
                        <img  :src="item.attcUrlSmall" @click="showImageClick(item.attcUrl)" /><el-button type="danger" size="mini" icon="delete" @click="deleteImageClick(item)"></el-button>&nbsp;
                      </span>
                      <span v-if="houseDetail.houseDiningFileList.length < this.maxCount">
                        <el-upload
                          :headers="headers"
                          :action="uploadActionDining"
                          list-type="picture-card"
                          multiple
                          :show-file-list="false"
                          :on-preview="handlePictureCardPreview"
                          :before-upload="beforeDiningUpload"
                          :on-remove="handleRemove"
                          :on-change="loadJsonFromFile"
                          :on-success="uploadSuccess"
                          :on-error="uploadError">
                          <i class="el-icon-plus"></i>
                        </el-upload>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
                      </span>
                    </div>
                  </el-col>
                </el-row>
                <hr/>
                <el-row class="housing_detail">
                  <el-col :span="4">
                    <div class="grid-content bg-purple">
                      <span>卫生间:</span>
                    </div>
                  </el-col>
                  <el-col :span="20">
                    <div class="grid-content bg-purple-light">
                      <span v-for="item in houseDetail.houseToiletFileList" :key="item.attcCode">
                        <img  :src="item.attcUrlSmall" @click="showImageClick(item.attcUrl)" /><el-button type="danger" size="mini" icon="delete" @click="deleteImageClick(item)"></el-button>&nbsp;
                      </span>
                      <span v-if="houseDetail.houseToiletFileList.length < this.maxCount">
                        <el-upload
                          :headers="headers"
                          :action="uploadActionToilet"
                          list-type="picture-card"
                          multiple
                          :show-file-list="false"
                          :on-preview="handlePictureCardPreview"
                          :before-upload="beforeToiletUpload"
                          :on-remove="handleRemove"
                          :on-change="loadJsonFromFile"
                          :on-success="uploadSuccess"
                          :on-error="uploadError">
                          <i class="el-icon-plus"></i>
                        </el-upload>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
                      </span>
                    </div>
                  </el-col>
                </el-row>
                <hr/>
                <el-row class="housing_detail">
                  <el-col :span="4">
                    <div class="grid-content bg-purple">
                      <span>其他:</span>
                    </div>
                  </el-col>
                  <el-col :span="20">
                    <div class="grid-content bg-purple-light">
                      <span v-for="item in houseDetail.houseOtherFileList" :key="item.attcCode">
                        <img  :src="item.attcUrlSmall" @click="showImageClick(item.attcUrl)"  /><el-button type="danger" size="mini" icon="delete" @click="deleteImageClick(item)"></el-button>&nbsp;
                      </span>
                      <span v-if="houseDetail.houseOtherFileList.length < this.maxCount">
                        <el-upload
                          :headers="headers"
                          :action="uploadActionOther"
                          list-type="picture-card"
                          multiple
                          :show-file-list="false"
                          :on-preview="handlePictureCardPreview"
                          :before-upload="beforeOtherUpload"
                          :on-remove="handleRemove"
                          :on-change="loadJsonFromFile"
                          :on-success="uploadSuccess"
                          :on-error="uploadError">
                          <i class="el-icon-plus"></i>
                        </el-upload>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
                      </span>
                    </div>
                  </el-col>
                </el-row>
                <hr/>
                <el-row class="housing_detail">
                  <el-col :span="4">
                    <div class="grid-content bg-purple">
                      <span>户型图:</span>
                    </div>
                  </el-col>
                  <el-col :span="20">
                    <div class="grid-content bg-purple-light">
                      <span v-for="item in houseDetail.houseLayoutFileList" :key="item.attcCode">
                        <img  :src="item.attcUrlSmall" @click="showImageClick(item.attcUrl)"  /><el-button type="danger" size="mini" icon="delete"  @click="deleteImageClick(item)"></el-button>&nbsp;
                      </span>
                      <span v-if="houseDetail.houseLayoutFileList.length < this.maxCount">
                        <el-upload
                          :headers="headers"
                          :action="uploadActionLayout"
                          list-type="picture-card"
                          multiple
                          :show-file-list="false"
                          :on-preview="handlePictureCardPreview"
                          :before-upload="beforeLayoutUpload"
                          :on-remove="handleRemove"
                          :on-change="loadJsonFromFile"
                          :on-success="uploadSuccess"
                          :on-error="uploadError">
                          <i class="el-icon-plus"></i>
                        </el-upload>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过5M</div>
                      </span>
                    </div>
                  </el-col>
                </el-row>
              </div>

            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">

            </slot>
          </div>

        </div>
      </div>
       <!-- 图片预览 -->
       <div class="images" v-viewer="{navbar:false,toolbar:true}"   v-show="false">
         <img :src=imageSrc >
       </div>
    </div>
  </transition>
</template>

<script>
import Utils from "@/utils/common";
import { houseImageList, deleteImage } from "@/api/house";
import { getToken } from "@/utils/auth";
import Viewer from "v-viewer";
import 'viewerjs/dist/viewer.css'
import Vue from "vue";
Vue.use(Viewer);

export default {
  props: {
    dataId: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      // imagesList:[],
      imageSrc: "", //图片预览,
      getDataLoading: false,
      houseCode: this.dataId,
      fileList: [],
      uploadActionLiving: `${process.env.BASE_API}/houseInfo/uploadImages/${
        this.dataId
      }/1210`, // 客厅
      uploadActionDining: `${process.env.BASE_API}/houseInfo/uploadImages/${
        this.dataId
      }/1211`, // 餐厅
      uploadActionKitchen: `${process.env.BASE_API}/houseInfo/uploadImages/${
        this.dataId
      }/1212`, // 厨房
      uploadActionBedRoom: `${process.env.BASE_API}/houseInfo/uploadImages/${
        this.dataId
      }/1213`, // 卧室
      uploadActionToilet: `${process.env.BASE_API}/houseInfo/uploadImages/${
        this.dataId
      }/1214`, // 卫生间
      uploadActionLayout: `${process.env.BASE_API}/houseInfo/uploadImages/${
        this.dataId
      }/1215`, // 户型图
      uploadActionOther: `${process.env.BASE_API}/houseInfo/uploadImages/${
        this.dataId
      }/1216`, // 其他
      maxCount: 5,
      upflag: true,
      houseDetail: {
        houseLivingFileList: [],
        houseDiningFileList: [],
        houseKitchenFileList: [],
        houseBedRoomFileList: [],
        houseToiletFileList: [],
        houseLayoutFileList: [],
        houseOtherFileList: []
      },
      headers: {
        Authorization: getToken()
      }
    };
  },
  created() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      this.getDataLoading = true;
      houseImageList(this.dataId)
        .then(response => {
          this.houseDetail = response.data;
          console.log(response.data);
          this.getDataLoading = false;
        })
        .catch(error => {
          Utils.error(error);
          this.getDataLoading = false;
        });
    },
    deleteImageClick(item) {
      console.log(item);
      deleteImage(this.dataId, item.attcCode)
        .then(response => {
          this.getDetail();
          Utils.success(`删除成功`);
        })
        .catch(error => {
          Utils.error(error);
        });
    },
    beforeLivingUpload(file) {
      return this.commonUpload(
        file,
        this.houseDetail.houseLivingFileList.length
      );
    },
    beforeDiningUpload(file) {
      return this.commonUpload(
        file,
        this.houseDetail.houseDiningFileList.length
      );
    },
    beforeKitchenUpload(file) {
      return this.commonUpload(
        file,
        this.houseDetail.houseKitchenFileList.length
      );
    },
    beforeBedRoomUpload(file) {
      return this.commonUpload(
        file,
        this.houseDetail.houseBedRoomFileList.length
      );
    },
    beforeToiletUpload(file) {
      return this.commonUpload(
        file,
        this.houseDetail.houseToiletFileList.length
      );
    },
    beforeLayoutUpload(file) {
      return this.commonUpload(
        file,
        this.houseDetail.houseLayoutFileList.length
      );
    },
    beforeOtherUpload(file) {
      return this.commonUpload(
        file,
        this.houseDetail.houseOtherFileList.length
      );
    },
    commonUpload(file, listlength) {
      if (this.fileList.length > this.maxCount - listlength) {
        this.$message.error("附件已达最大上传张数，超过的文件不予上传!");
        this.getDetail();
        return false;
      }
      const isImage = file.type === "image/jpeg" || "image/gif" || "image/png";
      const isLt2M = file.size / 1024 / 1024 < 5;
      if (!isImage) {
        this.$message.error("只能上传jpg/png文件!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 5MB!");
      }
      this.getDetail();
      return isImage && isLt2M;
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      // console.log(file.url);
    },
    uploadSuccess(response, file, fileList) {
      if (response.code === "000000") {
        this.getDetail();
        this.$message.success("上传成功！");
        this.upflag = true;
        this.fileList = [];
      } else {
        this.getDetail();
        this.$message.error(response.msg);
        this.upflag = true;
        this.fileList = [];
      }
    },
    uploadError(err, file, fileList) {
      console.log(err);
      this.getDetail();
      this.$message.error("上传失败！");
      this.upflag = true;
      this.fileList = [];
    },
    loadJsonFromFile(file, fileList) {
      if (this.upflag) {
        this.fileList = fileList;
        this.upflag = false;
      } else {
        // this.$refs.upload.clearFiles();
        this.fileList = [];
        this.upflag = true;
      }
    },
    // 图片预览
    showImageClick(src) {
      // this.imageSrc = `${src}?t=${new Date().getTime()}`;
      this.imageSrc = src;
      this.$nextTick(() => {
        const viewer = this.$el.querySelector(".images").$viewer;
        viewer.show();
      });
    },


  }
};
</script>

<style lang="scss" scoped>
.modal-container {
  max-width: 90% !important;
  height: 90% !important;
}
.housing_title {
  height: 50px;
  background-color: #ccc;
  line-height: 50px;
  text-indent: 10px;
}
.main {
  padding-left: 20px;
  padding-top: 10px;
}
.housing_detail {
  margin-bottom: 20px;
}
.housing_detail_pic {
  display: inline-block;
  width: 100px;
  height: 50px;
}
</style>
