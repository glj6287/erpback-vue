<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" style="max-width: 600px;height: 700px;">

          <div class="modal-header">
            <slot name="header">
              <h3 slot="header" class="text">{{isEdit ? '修改' : '新增'}}小区</h3>
              <i class="el-icon-close close" @click="$emit('close')" title="关闭窗口"></i>
            </slot>
          </div>

          <div class="modal-body" v-loading="getDataLoading" element-loading-text="请给我点时间！">
            <slot name="body">
               <el-form class="form-container" :rules="rules" ref="submitForm" :model="user" label-width="100px">
                <el-form-item label="小区名称:" prop="name">
                  <el-input v-model="user.name" placeholder="小区名称"></el-input>
                </el-form-item>
                <el-form-item label="社区名称:" prop="communityCode">

                  <el-select v-model="user.communityCode" value-key="communityCode"  placeholder="请选择">
                    <el-option
                      v-for="item in options4"
                      :key="item.communityCode"
                      :label="item.name"
                      :value="item.communityCode">
                    </el-option>
                  </el-select>

                  <!--<el-input v-model="user.communityCode" placeholder="社区名称"></el-input>-->
                </el-form-item>
                 <el-form-item label="小区地址:" prop="provinceItem">
                     <el-select v-model="provinceItem" value-key="id"  placeholder="选择省/地区" @change=selectedVal  style="width: 180px">
                        <el-option
                        v-for="item in options1"
                        :key="item.id"
                        :label="item.name"
                        :value="item">
                        </el-option>
                     </el-select>
                     <el-select v-model="cityItem" value-key="id" placeholder="选择城市" @change=sendCityPid style="width: 200px">
                        <el-option
                        v-for="item in options2"
                        :key="item.id"
                        :label="item.name"
                        :value="item">
                        </el-option>
                     </el-select>
                     <el-select v-model="areaItem" value-key="id" placeholder="选择区/县" @change=sendAreaPid style="width: 150px">
                        <el-option
                        v-for="item in options3"
                        :key="item.id"
                        :label="item.name"
                        :value="item">
                        </el-option>
                     </el-select>
                     <el-select v-model="roadItem" value-key="id" placeholder="选择街道/镇" style="width: 150px">
                      <el-option
                        v-for="item in optionsRoad"
                        :key="item.id"
                        :label="item.name"
                        :value="item">
                      </el-option>
                     </el-select>
                 </el-form-item>
                 <el-form-item prop="address">
                    <el-input v-model="user.address" placeholder="详细地址:如道路等"></el-input>
                 </el-form-item>
                 <el-form-item label="建筑年代:" prop="architecturalAge">
                   <el-input v-model="user.architecturalAge" placeholder="建筑年代"></el-input>
                 </el-form-item>
                 <el-form-item label="物业名称:" prop="propertyName">
                   <el-input v-model="user.propertyName" placeholder="物业名称"></el-input>
                 </el-form-item>
                <el-form-item label="物业电话:" prop="propertyTelephone">
                  <el-input v-model="user.propertyTelephone" placeholder="物业电话"></el-input>
                </el-form-item>
                <el-form-item label="交通情况:" prop="trafficsituation">
                  <el-input type="textarea" v-model="user.trafficsituation" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="周边配套:">
                  <el-input type="textarea" v-model="user.aroundsupporting" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="小区照片:">
                 <el-upload
                    :action="action"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :on-success="handleSuccess"
                    :headers="headers"
                    >
                    <i class="el-icon-plus"></i>
                  </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                      <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item>
              </el-form>
            </slot>
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <el-button @click="$emit('close')">取消</el-button>
              <el-button v-if="!isEdit" type="primary" v-loading="submitLoading" @click="submit">提交</el-button>
                <el-button v-if="isEdit" type="primary" v-loading="submitLoading" @click="submitChange">修改</el-button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Utils from "@/utils/common";
import {
  getCascaderData,
  getCity,
  getArea,
  getRoad,
  submitHus,
  getHusDetail,
  submitChangeDta,
  selectCommunityListAll
} from "@/api/littledistrict";
import { getToken } from "@/utils/auth";
export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    neigbodCode: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      action: "",
      uploadData: null,
      dialogImageUrl: "",
      dialogVisible: false,
      submitLoading: false,
      getDataLoading: false,
      options1: [],
      options2: [],
      options3: [],
      options4: [],
      optionsRoad: [],
      id2: "",
      id1: "",
      id3: "",
      provinceItem: null,
      cityItem: null,
      areaItem: null,
      roadItem: null,
      user: {
        name: "",
        communityCode: "",
        address: null,
        architecturalAge: "",
        propertyName: "",
        propertyTelephone: "",
        trafficsituation: "",
        aroundsupporting: "",
        propertyCode: "",
        propertyId: "",
        neighborhoodId: "",
        neigbodCode: "",
        provinceCode: null,
        cityCode: null,
        areaCode: null,
        plateCode: "",
        province: "",
        city: "",
        area: "",
        plate: "",
        attcCodes: "",
        version: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入小区名称", trigger: "blur" }
        ],
        communityCode: [
          { required: true, message: '请选择社区', trigger: 'blur' }
        ]
      },
      headers: {
        'Authorization': getToken()
      }
    };
  },
  created() {
    this.action =`${process.env.BASE_API}/file/singleUploadImage/1217`
  },
  mounted() {
    this.getCascaderList();
    this.getList();
    this.selectCommunityCode();
  },
  methods: {
    getList() {
      this.getDataLoading = true;
      if (this.isEdit) {
        this.getDetail();
      }
      this.getDataLoading = false;
    },

    getDetail() {
      this.getDataLoading = true;
      getHusDetail(this.neigbodCode)
        .then(response => {
          this.user = response.data;
          console.log(response.data);
          this.provinceItem = response.data.province;
          this.cityItem = response.data.city;
          this.areaItem = response.data.area;
          this.roadItem = response.data.plate;
          if (response.data.provinceCode !== "" && response.data.cityCode !== "") {
            this.getCityList(response.data.provinceCode);
            this.getAreaList(response.data.cityCode);
          }
          if (response.data.areaCode !== "") {
            this.getRoadList(response.data.areaCode);
          }
          this.getDataLoading = false;
        })
        .catch(error => {
          Utils.error(error);
          this.getDataLoading = false;
        });
    },

    // 所有社区
    selectCommunityCode() {
      selectCommunityListAll().then(response => {
        var communityList = response.data;
        communityList.forEach(ele => {
          this.options4.push(ele);
        });
      });
    },
    // 省
    getCascaderList() {
      getCascaderData().then(response => {
        var cascaderDate = response.data;
        cascaderDate.forEach(ele => {
          this.options1.push(ele);
        });
      });
    },

    // 获取省的Id去请求市的数据
    selectedVal(val) {
      var choosenItem = this.options1.filter(item => item.id === val.id)[0];
      console.log(choosenItem)
      this.id2 = choosenItem.id;
      this.getCityList(this.id2);
      this.options2 = [];
      this.options3 = [];
      this.cityItem = "";
      this.areaItem = "";
    },

    // 市
    getCityList(id2) {
      getCity(id2).then(response => {
        var cityData = response.data;
        console.log(response.data)
        cityData.forEach(ele => {
          this.options2.push(ele);
        });
      });
    },

    // 根据二级id获取三级数据
    sendCityPid(val) {
      var sendPid = this.options2.filter(item => item.id === val.id)[0];
      this.id1 = sendPid.id;
      this.getAreaList(this.id1);
      this.options3 = [];
      this.areaItem = "";
    },

    // 区域
    getAreaList(id1) {
      getArea(id1).then(response => {
        var areaData = response.data;
        areaData.forEach(ele => {
          this.options3.push(ele);
        });
      });
    },
    sendAreaPid(val) {
      var sendPid = this.options3.filter(item => item.id === val.id)[0];
      this.id3 = sendPid.id;
      this.getRoadList(this.id3);
      this.optionsRoad = [];
      this.roadItem = "";
    },
    // 街道
    getRoadList(id3) {
      getRoad(id3).then(response => {
        var roadData = response.data;
        roadData.forEach(ele => {
          this.optionsRoad.push(ele);
        });
      });
    },

    submit() {
      this.$refs["submitForm"].validate(valid => {
        if (valid) {
          this.submitLoading = true;
          this.user.provinceCode = this.provinceItem.id;
          this.user.province = this.provinceItem.name;
          this.user.cityCode = this.cityItem.id;
          this.user.city = this.cityItem.name;
          this.user.areaCode = this.areaItem.id;
          this.user.area = this.areaItem.name;
          this.user.plateCode = this.roadItem.id;
          this.user.plate = this.roadItem.name;
          console.log(this.user)
          submitHus(this.user)
            .then(response => {
              this.submitLoading = false;
              this.$emit("close");
              this.$emit("getList");
              Utils.success(`添加成功`);
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

    // 修改
    submitChange() {
      this.$refs["submitForm"].validate(valid => {
        if (valid) {
          this.submitLoading = true;
          this.submitLoading = true;
          this.user.provinceCode = this.provinceItem.id;
          this.user.province = this.provinceItem.name;
          this.user.cityCode = this.cityItem.id;
          this.user.city = this.cityItem.name;
          this.user.areaCode = this.areaItem.id;
          this.user.area = this.areaItem.name;
          this.user.plateCode = this.roadItem.id;
          this.user.plate = this.roadItem.name;
          console.log(this.user)
          submitChangeDta(this.user)
            .then(response => {
              this.submitLoading = false;
              this.$emit("close");
              this.$emit("getList");
              Utils.success(`修改成功`);
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

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    handleSuccess(response, file, fileList) {
      var files =[]
      var filesGather = fileList
      filesGather.forEach(itm => {
        files.push(itm.raw)
      })
      this.dialogImageUrl = files;
      this.attcCodes = response.data.attcCodes
      if (fileList.length > 5) {
        Utils.warning("上传照片不能超过五张");
        fileList.length = 5;
      }
    },
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-cascader,
.el-select {
  width: 100%;
}
.el-cascader[data-v-26f10c41],
.el-select[data-v-26f10c41] {
  width: 28%;
}
.modal-container {
  max-width: 50% !important;
  height: 80% !important;
}
.el-textarea__inner {
  resize: none !important;
}
.village_pic {
  display: inline-block;
  width: 100px;
  height: 100px;
  background-color: cyan;
}
.el-upload--picture-card {
  width: 100px !important;
  height: 100px !important;
  line-height: 100px !important;
}
</style>
