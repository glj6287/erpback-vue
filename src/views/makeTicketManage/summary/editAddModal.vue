<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" style="max-width: 950px;">

          <div class="modal-header">
            <slot name="header">
              <h3 slot="header" class="text">新增/修改</h3>
              <i class="el-icon-close close" @click="closeModal" title="关闭窗口"></i>
            </slot>
          </div>

          <div class="modal-body" v-loading="getDataLoading" element-loading-text="请给我点时间！">

              <el-form class="form-container" :model="editTotal" :rules="rules" ref="submitForm">
                  <el-row>
                    <div class="grid-content bg-purple-dark">
                        <el-col :span="7">
                                <el-form-item label="发票类型" prop="kpstyle">
                                    <el-select v-model="editTotal.kpstyle" placeholder="请选择" size="small" clearable :disabled="isReadOnly">
                                      <el-option v-for="item in kpstyleOptions" :key="item.dictValue" :label="item.dictValue"
                                                 :value="item.dictCode"></el-option>
                                    </el-select>
                                 </el-form-item>
                        </el-col>
                      <el-col :span="1">&nbsp;</el-col>
                              <el-col :span="7">
                                 <el-form-item label="收款银行" prop="getmoneyBank">
                                    <el-select v-model="editTotal.getmoneyBank" size="small" clearable :disabled="isReadOnly">
                                      <el-option v-for="item in getmoneyBankOptions" :key="item.dictValue" :label="item.dictValue"
                                                 :value="item.dictCode"></el-option>
                                    </el-select>
                                 </el-form-item>
                        </el-col>
                      <el-col :span="1">&nbsp;</el-col>
                      <el-col :span="7">&nbsp;</el-col>
                    </div>
                  </el-row>

                  <el-row>
                        <div class="grid-content bg-purple-dark">
                          <el-col :span="7">
                              <el-form-item label="房号" prop="houseCode">
                                    <el-input v-model="editTotal.houseCode"  size="small" placeholder="请输入房号" v-bind:disabled="isReadOnly"></el-input>
                              </el-form-item>
                          </el-col>
                          <el-col :span="1">&nbsp;</el-col>
                          <el-col :span="7">
                              <el-form-item label="合同起始:" prop="firstdate">
                                    <el-date-picker
                                    v-model="editTotal.firstdate"
                                    @change="firstdateChange"
                                    size="small"
                                    type="date"
                                    placeholder="选择日期"
                                    :disabled="isReadOnly"
                                    >
                                    </el-date-picker>
                                </el-form-item>
                          </el-col>
                          <el-col :span="1">&nbsp;</el-col>
                          <el-col :span="7">
                                <el-form-item label="合同终止:" prop="enddate">
                                    <el-date-picker
                                    v-model="editTotal.enddate"
                                    @change="enddateChange"
                                    size="small"
                                    type="date"
                                    placeholder="选择日期"
                                    :disabled="isReadOnly"
                                    >
                                    </el-date-picker>
                             </el-form-item>
                          </el-col>
                        </div>
                  </el-row>

                   <el-row>
                        <div class="grid-content bg-purple-dark">
                          <el-col :span="7">
                              <el-form-item label="开票起始:" prop="kpfirst">
                                    <el-date-picker
                                    v-model="editTotal.kpfirst"
                                    @change="kpfirstChange"
                                    size="small"
                                    type="date"
                                    placeholder="选择日期"
                                    >
                                    </el-date-picker>
                                </el-form-item>
                          </el-col>
                          <el-col :span="1">&nbsp;</el-col>
                          <el-col :span="7">
                                <el-form-item label="开票终止:" prop="kpend">
                                    <el-date-picker
                                    v-model="editTotal.kpend"
                                    @change="kpendChange"
                                    size="small"
                                    type="date"
                                    placeholder="选择日期"
                                    >
                                    </el-date-picker>
                             </el-form-item>
                          </el-col>
                          <el-col :span="1">&nbsp;</el-col>
                          <el-col :span="7">
                              <el-form-item label="月租金" prop="permonth">
                                    <el-input v-model="editTotal.permonth" size="small" placeholder="请输入月租金"></el-input>
                             </el-form-item>
                    </el-col>
                        </div>
                  </el-row>
                  <el-row>
                        <div class="grid-content bg-purple-dark">
                          <el-col :span="7">
                              <el-form-item label="开票方式" prop="otherstyle">
                                    <el-input v-model="editTotal.otherstyle" placeholder="例: 3月开" size="small" v-bind:disabled="isReadOnly"></el-input>
                             </el-form-item>
                          </el-col>
                          <el-col :span="1">&nbsp;</el-col>
                          <el-col :span="7">
                             <el-form-item label="开票日" prop="kpday">
                                    <el-input v-model="editTotal.kpday" placeholder="例: 本1 上1 次1" size="small" v-bind:disabled="isReadOnly" ></el-input>
                             </el-form-item>
                          </el-col>
                          <el-col :span="1">&nbsp;</el-col>
                          <el-col :span="7">
                             <el-form-item label="开票抬头" prop="company">
                                    <el-input v-model="editTotal.company"  size="small" placeholder="请输入开票抬头" v-bind:disabled="isReadOnly"></el-input>
                             </el-form-item>
                          </el-col>
                        </div>
                  </el-row>

                   <el-row>
                        <div class="grid-content bg-purple-dark">
                          <el-col :span="7">
                              <el-form-item label="开票内容" prop="contant">
                                    <el-input v-model="editTotal.contant" placeholder="例:租金 服务费" size="small" v-bind:disabled="isReadOnly" ></el-input>
                             </el-form-item>
                          </el-col>
                          <el-col :span="1">&nbsp;</el-col>
                          <el-col :span="7">
                             <el-form-item label="税号" prop="shuihao">
                                    <el-input v-model="editTotal.shuihao"  size="small" placeholder="请输入税号" v-bind:disabled="isReadOnly"></el-input>
                             </el-form-item>
                          </el-col>
                          <el-col :span="1">&nbsp;</el-col>
                          <el-col :span="7">
                             <el-form-item label="开户行+账号" prop="banknum">
                                    <el-input v-model="editTotal.banknum"  size="small" placeholder="请输入开户行+账号" v-bind:disabled="isReadOnly"></el-input>
                             </el-form-item>
                          </el-col>
                        </div>
                  </el-row>

                   <el-row>
                        <div class="grid-content bg-purple-dark">
                          <el-col :span="7">
                              <el-form-item label="收件地址" prop="address">
                                    <el-input v-model="editTotal.address"  size="small" placeholder="请输入收件地址" v-bind:disabled="isReadOnly"></el-input>
                             </el-form-item>
                          </el-col>
                          <el-col :span="1">&nbsp;</el-col>
                          <el-col :span="7">
                             <el-form-item label="收件人姓名" prop="telperson">
                                    <el-input v-model="editTotal.telperson"  size="small" placeholder="请输入收件人姓名" v-bind:disabled="isReadOnly"></el-input>
                             </el-form-item>
                          </el-col>
                          <el-col :span="1">&nbsp;</el-col>
                          <el-col :span="7">
                             <el-form-item label="收件人电话" prop="telnum">
                                    <el-input v-model="editTotal.telnum"  size="small" placeholder="请输入收件人电话" v-bind:disabled="isReadOnly"></el-input>
                             </el-form-item>
                          </el-col>
                        </div>
                  </el-row>
              </el-form>
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <el-button type="primary" v-loading="submitLoading" @click="submit">提交</el-button>
              <el-button type="primary" v-loading="submitLoading" @click="houseImport" v-if="houseImportVisible">房号数据导入</el-button>
            </slot>
          </div>

        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Utils from "@/utils/common";
import { modifyKpTotal, addKpTotal, houseImport, selectByKpTotal } from "@/api/kpmanage";

export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      houseImportVisible: true,
      isReadOnly: false,
      submitLoading: false,
      getDataLoading: false,
      dutySearchLoading: false,
      kpstyleOptions: [
        { dictCode: "普5", dictValue: "普5" },
        { dictCode: "普6", dictValue: "普6" },
        { dictCode: "专", dictValue: "专" }],
      getmoneyBankOptions: [
        { dictCode: "招行201", dictValue: "招行201" },
        { dictCode: "招行505", dictValue: "招行505" },
        { dictCode: "招行306", dictValue: "招行306" },
        { dictCode: "招行903", dictValue: "招行903" },
        { dictCode: "工行711", dictValue: "工行711" },
        { dictCode: "平安009", dictValue: "平安009" },
        { dictCode: "平安594", dictValue: "平安594" },
        { dictCode: "上海842", dictValue: "上海842" },
        { dictCode: "建行419", dictValue: "建行419" },
        { dictCode: "华瑞430", dictValue: "华瑞430" },
        { dictCode: "华瑞165", dictValue: "华瑞165" },
        { dictCode: "支付宝", dictValue: "支付宝" },
        { dictCode: "微信", dictValue: "微信" },
        { dictCode: "现金", dictValue: "现金" }],
      editTotal: {
        id: this.dataId,
        kpstyle: null,
        getmoneyBank: null,
        houseCode: null,
        firstdate: null,
        enddate: null,
        kpfirst: null,
        kpend: null,
        permonth: null,
        otherstyle: null,
        kpday: null,
        company: null,
        contant: null,
        shuihao: null,
        banknum: null,
        address: null,
        telperson: null,
        telnum: null
      },
      rules: {
        kpstyle: [
          { required: true, message: "请选择发票类型", trigger: "change" }],
        getmoneyBank: [
          { required: true, message: "请选择收款银行", trigger: "change" }],
        houseCode: [
          { required: true, message: "请输入房源编号", trigger: "blur" }],
        firstdate: [
          { required: true, message: "请输入合同起始", trigger: "change" }],
        enddate: [
          { required: true, message: "请输入合同终止", trigger: "change" }],
        kpfirst: [
          { required: true, message: "请输入开票起始", trigger: "change" }],
        kpend: [
          { required: true, message: "请输入开票终止", trigger: "change" }],
        permonth: [
          { required: true, message: "请输入月租金", trigger: "blur" },
          { type: "number", message: "金额必须为数字值", trigger: "blur", transform(value) {
            return Number(value);
          } }],
        otherstyle: [
          { required: true, message: "请输入开票方式", trigger: "blur" }],
        kpday: [
          { required: true, message: "请输入开票日", trigger: "blur" }],
        company: [
          { required: true, message: "请输入开票抬头", trigger: "blur" }],
        contant: [
          { required: true, message: "请输入开票内容", trigger: "blur" }],
        shuihao: [
          { required: true, message: "请输入税号", trigger: "blur" }],
        banknum: [
          { required: true, message: "请输入银行名称+账号", trigger: "blur" }],
        address: [
          { required: true, message: "请输入收件地址", trigger: "blur" }],
        telperson: [
          { required: true, message: "请输入收件人姓名", trigger: "blur" }],
        telnum: [
          { required: true, message: "请输入收件人电话", trigger: "blur" }]
      }
    };
  },
  created() {
    // 如果是修改则导入原始数据
    if (this.isEdit) {
      this.houseImportVisible = false;
      this.getDetail();
    }
  },
  methods: {
    getDetail() {
      var data = {
        id: this.id
      };
      selectByKpTotal(data)
        .then(response => {
          this.editTotal = response.data[0];
          this.editTotal.permonth = response.data[0].permonth + "";
        })
        .catch(error => {
          Utils.error(error);
        });
    },

    firstdateChange(value) {
      if (value != null && value !== "") {
        this.editTotal.firstdate = value;
      }
    },
    enddateChange(value) {
      if (value != null && value !== "") {
        this.editTotal.enddate = value;
      }
    },
    kpfirstChange(value) {
      if (value != null && value !== "") {
        this.editTotal.kpfirst = value;
      }
    },
    kpendChange(value) {
      if (value != null && value !== "") {
        this.editTotal.kpend = value;
      }
    },
    houseImport() {
      if (this.editTotal.houseCode) {
        houseImport(this.editTotal).then(response => {
          if (response) {
            if (response.count > 0) {
              this.editTotal = response.data;
              this.editTotal.id = null;
              this.editTotal.permonth = response.data.permonth + "";
              this.isReadOnly = true;
            } else {
              this.$message.warning("无该房号数据！");
            }
          }
        }).catch(error => {
          console.log(error);
        });
      } else {
        this.$message.warning("请输入房号！");
      }
    },
    submit() {
      this.$refs["submitForm"].validate(valid => {
        if (valid) {
          this.submitLoading = true;
          if (this.isEdit) {
            modifyKpTotal(this.editTotal)
              .then(response => {
                console.log(response);
                Utils.success(`${this.isEdit ? "修改" : "添加"}成功`);
                this.$emit("getList");
                this.$emit("close");
                this.$refs["submitForm"].resetFields();
              })
              .catch(error => {
                console.log(error);
              });
            this.submitLoading = false;
          } else {
            addKpTotal(this.editTotal)
              .then(response => {
                console.log(response);
                Utils.success(`${this.isEdit ? "修改" : "添加"}成功`);
                this.$emit("getList");
                this.$emit("close");
                this.$refs["submitForm"].resetFields();
              })
              .catch(error => {
                console.log(error);
              });
            this.submitLoading = false;
          }
        } else {
          return false;
        }
      });
    },
    closeModal() {
      this.$refs["submitForm"].resetFields();
      this.$emit('close');
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-cascader,
.el-select {
  width: 100%;
}
</style>
