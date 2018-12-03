<template>
 <div class="app-container" v-loading="getDataLoading" element-loading-text="请给我点时间！">
   <div class="odd">
     <h3><span style="margin-right:10px">账单编号:</span><span style="margin-right:20px">{{this.receBillCode}} {{this.settleTypeText}}</span></h3>
   </div>
   <h3 class="housing_title">基本信息</h3>
    <div class="main">
     <el-row class="housing_detail">
        <el-col :span="4">
            <div class="grid-content bg-purple">
                <span>上游合同:</span>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple-light">
              <el-button @click="toViewContract(receBillInfo)" type="text">{{receBillInfo.contractCode}}</el-button>
            </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
            <div class="grid-content bg-purple">
                <span>房源编号:</span>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple-light">
              <el-button @click="toViewHouse(receBillInfo)" type="text">{{receBillInfo.houseCode}}</el-button>
            </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
            <div class="grid-content bg-purple">
                <span>创建日期:</span>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple-light">
                <span>{{receBillInfo.createTime | formatTime}}</span>
            </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
            <div class="grid-content bg-purple">
                <span>会员费:</span>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple-light">
                <span>{{receBillInfo.membershipFee}}元</span>
            </div>
        </el-col>
      </el-row>
    </div>

   <h3 class="housing_title">收款记录</h3>
   <div class="main">
     <el-table :data="receBillInfo.receivableRecordList" v-loading="listLoading" border stripe fit style="width: 100%">

       <el-table-column min-width="150" label="收款时间" align="center">
         <template slot-scope="scope">
           <span>{{scope.row.createTime | formatTime}}</span>
         </template>
       </el-table-column>

       <el-table-column  width="180" label="收款金额" align="center">
         <template slot-scope="scope">
           <span>{{scope.row.payMoney}}元</span>
         </template>
       </el-table-column>

       <el-table-column width="120" label="收款账户" align="center">
         <template slot-scope="scope">
           <span>{{scope.row.payeeBankName}}</span>
         </template>
       </el-table-column>

       <el-table-column width="120" label="收款凭证" align="center">
         <template slot-scope="scope">
           <img :src="scope.row.attcUrlSmall" @click="showImageClick(scope.row.attcUrl)"/>
         </template>
       </el-table-column>

       <el-table-column align="center" label="备注" min-width="140" >
         <template slot-scope="scope">
           <span>{{scope.row.remarks}}</span>
         </template>
       </el-table-column>

       <el-table-column align="center" width="120" label="处理人">
         <template slot-scope="scope">
           <span>{{scope.row.operator}}</span>
         </template>
       </el-table-column>

     </el-table>
   </div>
   <h3 class="housing_title">销账</h3>
   <div class="main">
   <el-form class="form-container" :model="paramInsert" ref="validateForm" :rules="rules" :inline="true" style="max-width: 500px">
     <div>
       <el-form-item label="收款金额:" prop="payMoney" class="itemblock" >
         <el-input  size="small" v-model="paramInsert.payMoney" placeholder="" @keyup.native="number" style="max-width: 170px"></el-input> 元
       </el-form-item>
       <el-form-item label="收款银行:" prop="payeeBankNumber" class="itemblock">
         <el-select v-model="paramInsert.payeeBankNumber" size="small" style="width: 174px" clearable>
           <el-option v-for="item in receivableBankOptions" :key="item.dictValue" :label="item.dictValue"
                      :value="item.dictCode"></el-option>
         </el-select>
       </el-form-item>

       <el-form-item label="收款凭证:" prop="receImgFile" class="itemblock">
         <span>
           <el-upload
             ref="uploadForm"
             :action="receImgFileAction"
             :headers="headers"
             list-type="picture-card"
             :before-upload="handlebeforeUpload"
             :on-change="loadJsonFromFile"
             :on-success="handleSuccess"
             :on-error="handleError"
             :on-preview="handlePictureCardPreview"
             :on-remove="handleRemove"
             >
             <i class="el-icon-plus"></i>
             <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过5M</div>
           </el-upload>
           <el-dialog :visible.sync="dialogVisible">
             <img width="100%" :src="dialogImageUrl" alt="">
           </el-dialog>
         </span>
       </el-form-item>

       <el-form-item label="备注:" prop="remarks" class="itemblock">
         <el-input
           type="textarea"
           :rows="4"
           placeholder="请输入内容"
           v-model="paramInsert.remarks">
         </el-input>
       </el-form-item>

       <el-form-item style="margin-left:43px;" class="itemblock">
         <el-button type="primary" size="medium" v-loading="insertLoading" @click="receiChargeOffBill">提交</el-button>
       </el-form-item>
     </div>
   </el-form>
   </div>
   <!-- 图片预览 -->
   <div class="images" v-viewer="{navbar:false,toolbar: true}"   v-show="false">
     <img  :src=imageSrc >
   </div>
 </div>
</template>

<script>
import { selectReceivableBilInfo, receiChargeOffBill } from "@/api/bill";
import Utils from "@/utils/common";
import { dictDataList } from "@/api/dict";
import { getToken } from "@/utils/auth";

import Viewer from "v-viewer";
import 'viewerjs/dist/viewer.css'
import Vue from "vue";

export default {
  data() {
    var validateImgFile = (rule, value, callback) => {
      if (this.fileList.length === 0) {
        callback(new Error('请上传收款凭证'));
      } else {
        callback();
      }
    };
    return {
      imageSrc: "", // 图片预览,
      getDataLoading: false,
      listLoading: false,
      insertLoading: false,
      dialogImageUrl: "",
      dialogVisible: false,
      receImgFileAction: "",
      uploadFileCode: "",
      receBillCode: this.$route.query.receBillCode,
      isActiveText: this.$route.query.isActiveText,
      settleTypeText: this.$route.query.settleTypeText,
      receivableBankOptions: [],
      queryList: {
        receBillCode: ""
      },
      paramInsert: {
        receBillCode: "",
        payeeBankNumber: "",
        payMoney: "",
        receivableMoney: "",
        remarks: "",
        receImgFile: "",
        certificateCode: ""
      },
      receBillInfo: "",
      list: [],
      fileList: [],
      dictQuery: {
        dictType: ""
      },
      headers: {
        'Authorization': getToken()
      },
      rules: {
        payMoney: [
          { required: true, message: '请输入收款金额', trigger: 'blur' },
          { type: 'number', message: '金额必须为数字值', trigger: 'blur', transform(value) {
            return Number(value);
          }}
        ],
        payeeBankName: [
          { required: true, message: '请选择收款银行', trigger: 'change' }
        ],
        receImgFile: [
          { validator: validateImgFile, message: '请上传收款凭证照片', trigger: 'blur' }
        ]
      }
    };
  },
  filters: {
    formatTime(date) {
      if (date) {
        return date.substring(0, date.indexOf(" ")).replace(/-/g, ".");
      }
      return "-";
    }
  },
  created() {
    this.getDetail();
    this.receivableBank();
    this.receImgFileAction = `${process.env.BASE_API}/upBill/uploadReceiChargeOffBillImg`;
  },
  methods: {
    getDetail() {
      this.queryList.receBillCode = this.receBillCode;
      selectReceivableBilInfo(this.queryList)
        .then(response => {
          this.receBillInfo = response.data.Item[0];
        })
        .catch(error => {
          Utils.error(error);
        });
    },
    number() {
      this.paramInsert.payMoney = this.paramInsert.payMoney.replace(/[^\.\d]/g,'');
      this.paramInsert.payMoney = this.paramInsert.payMoney.replace('.','');
    },
    // 收款银行列表
    receivableBank() {
      this.dictQuery.dictType = "BANK_TYPE";
      dictDataList(this.dictQuery).then(response => {
        this.receivableBankOptions = response.data;
      });
    },
    receiChargeOffBill() {
      this.$refs["validateForm"].validate((valid) => {
        if (valid) {
          this.paramInsert.receBillCode = this.receBillCode;
          this.paramInsert.certificateCode = this.uploadFileCode;
          console.log(this.paramInsert)
          receiChargeOffBill(this.paramInsert).then(response => {
            this.$message.success("销账成功！");
            this.getDetail();
            this.$refs.validateForm.resetFields();
            this.$refs.uploadForm.clearFiles();
          }).catch(e => {
            // 错误
            this.$message.error(e);
          });
        } else {
          return false;
        }
      });
    },
    toViewHouse(row) {
      this.$router.push({ path: `/house/detail/?houseCode=${row.houseCode}` });
    },
    toViewContract(row) {
      this.$router.push({ path: `/contractmanagement/upstreamcontract/detailinfo/?contractCode=${row.contractCode}&statusName=${row.contractStatusValue}` });
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
      if (isImage && isLt2M) {
        this.handleRemove();
      }
      return isImage && isLt2M;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
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
    },
    // 图片预览
    showImageClick(src) {
      // this.imageSrc = `${src}?t=${new Date().getTime()}`;
      this.imageSrc = src;
      this.$nextTick(() => {
        const viewer = this.$el.querySelector(".images").$viewer;
        viewer.show();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
    .housing_title{
        height: 50px;
        background-color: #ccc;
        line-height: 50px;
        text-indent: 10px;
    }
    .main{
        padding-left: 20px;
        padding-top: 10px;
    }
    .housing_detail{
        margin-bottom: 20px;
    }
    .housing_detail_pic{
        display: inline-block;
        width: 100px;
        height: 50px;
    }
    .itemblock{
      display: block;
    }
</style>

