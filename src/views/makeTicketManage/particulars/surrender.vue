<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" style="max-width: 950px;">

          <div class="modal-header">
            <slot name="header">
              <h3 slot="header" class="text">退租登记</h3>
              <i class="el-icon-close close" @click="$emit('close')" title="关闭窗口"></i>
            </slot>
          </div>

          <div class="modal-body" v-loading="getDataLoading" element-loading-text="请给我点时间！">
             <el-form class="form-container" :model="listQuery" label-width="80px" :inline="true" ref="searchForm" >

                <el-form-item label="房号" prop="houseCode">
                    <el-input v-model="listQuery.houseCode" size="small" placeholder="" :disabled="isCompile" style="width:200px"></el-input>
                </el-form-item>

                <el-form-item label="月租金" prop="permonth" >
                    <el-input v-model="listQuery.permonth" size="small"
                             :disabled="isCompile" style="width:200px"></el-input>
                </el-form-item>

                <el-form-item label="物业地址" prop="wuyeAddress">
                    <el-input v-model="listQuery.wuyeAddress" size="small"
                             :disabled="isCompile" style="width:200px"></el-input>
                </el-form-item>

                <el-form-item label="开票抬头" prop="company">
                    <el-input v-model="listQuery.company" size="small"
                             :disabled="isCompile" style="width:200px"></el-input>
                </el-form-item>

                <el-form-item label="开票起始" prop="kpfirst">
                    <el-input v-model="listQuery.kpfirst" size="small"
                             :disabled="isCompile" style="width:200px"></el-input>
                </el-form-item>

                <el-form-item label="开票终止" prop="kpend">
                    <el-input v-model="listQuery.kpend" size="small"
                            :disabled="isCompile" style="width:200px"></el-input>
                </el-form-item>

                <el-form-item label="退租日期"  prop="exitdate" class="uodateBecome">
                    <el-date-picker v-model="listQuery.exitdate" @change="createTimeEndChange" type="date" size="small" placeholder="" style="width:200px;"></el-date-picker>
                </el-form-item>

                <el-form-item label="剩余租金" prop="realpermonth">
                    <el-input v-model="listQuery.realpermonth" size="small" v-bind:placeholder="dayAmount"
                             style="width:200px"></el-input>
                </el-form-item>
           </el-form>
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <el-button type="primary" v-loading="submitLoading" @click="confirmHandle">确定</el-button>
            </slot>
          </div>

        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Utils from "@/utils/common";
import { fnChangeTzdetails } from "@/api/kpmanage";

export default {
  props: {
    rows: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      isCompile: true,
      labelPosition: "right",
      downloadType: "",
      submitLoading: false,
      getDataLoading: false,
      dutySearchLoading: false,
      dayAmount: this.getDayAmount(this.rows.realpermonth), // 日租金
      listQuery: {
        houseCode: this.rows.houseCode, //	房源编号
        kpfirst: this.formatTime(this.rows.kpfirst), // 开票起始日期
        exitdate: null, // 退租日期
        permonth: this.rows.permonth, // 月租金
        realpermonth: null, // 剩余租金
        firstdate: this.formatTime(this.rows.firstdate), //	合同起始日期
        wuyeAddress: this.rows.wuyeAddress,
        company: this.rows.company,
        kpend: this.formatTime(this.rows.kpend)
      }
    };
  },
  created() {
     // console.log(this.rows.wuyeAddress);
  },
  methods: {
    formatTime(date) {
      if (date) {
        return date.substring(0, date.indexOf(" "));
      }
      return "-";
    },
    // 获取日租金
    getDayAmount(monthAmount) {
      return "日租金：" + (monthAmount * 12 / 365).toFixed(2);
    },
    // 确定
    confirmHandle() {
      this.submitLoading = true;
      if(this.exitdate < this.listQuery.kpfirst){
        Utils.error('须大于等于开票起始')
        return;
      }else if(this.exitdate > this.listQuery.kpend){
        Utils.error('须小于等于开票终止')
        return;
      }
      fnChangeTzdetails(this.listQuery)
        .then(response => {
          if (response.code == "000000") {
            Utils.success(response.msg);
            this.submitLoading = true;
            this.$emit("getList");
            this.$emit("close");
          }
        })
        .catch(error => {
          this.submitLoading = false;
        });
    },
    createTimeEndChange(value) {
      if (value != null && value !== "") {
        this.listQuery.exitdate = value;
      }
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.modal-container {
  width: 20%;
  height: calc(100% - 230px);
}
.layui-upload-file {
  display: none !important;
  opacity: 0.01;
  filter: Alpha(opacity=1);
}
.el-cascader,
.el-select {
  width: 100%;
}
.el-form--inline .el-form-item {
  display: block;
}
</style>
