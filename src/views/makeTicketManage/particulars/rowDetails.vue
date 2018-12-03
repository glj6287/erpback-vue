<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" style="max-width: 950px;"> 
            <i class="el-icon-close close" @click="$emit('close')" title="关闭窗口"></i>
             <el-tabs v-model="activeName" type="border-card" style="height:100%">
                <el-tab-pane style="padding:20px" label="基本信息" name="baseDetail">
                    <div class="mt-15"><span class="titleHead">房号:</span><span>{{detailsObject.houseCode}}</span></div>
                    <div class="mt-15"><span class="titleHead">小区名称:</span><span>{{detailsObject.areaname}}</span></div>
                    <div class="mt-15"><span class="titleHead">物业地址:</span><span>{{detailsObject.wuyeAddress}}</span></div>
                    <div class="mt-15"><span class="titleHead">合同起始:</span><span>{{detailsObject.firstdate}}</span></div>
                    <div class="mt-15"><span class="titleHead">合同终止:</span><span>{{detailsObject.enddate}}</span></div>
                    <div class="mt-15"><span class="titleHead">月租金:</span><span>{{detailsObject.realpermonth}}</span></div>
                    <div class="mt-15"><span class="titleHead">收款银行:</span><span>{{detailsObject.getmoneyBank}}</span></div>
                    <div class="mt-15"><span class="titleHead">是否退租:</span><span>{{detailsObject.isexit}}</span></div>
                    <div class="mt-15"><span class="titleHead">退租日期:</span><span>{{detailsObject.exitdate}}</span></div>
                    <div class="mt-15"><span class="titleHead">备注:</span><span>{{detailsObject.mark}}</span></div>
                </el-tab-pane>
                <el-tab-pane style="padding:20px" label="开票" name="makeInvoice">
                    <div class="mt-15"><span class="titleHead">开票起始:</span><span>{{detailsObject.kpfirst}}</span></div>
                    <div class="mt-15"><span class="titleHead">开票终止:</span><span>{{detailsObject.kpend}}</span></div>
                    <div class="mt-15"><span class="titleHead">开票金额:</span><span>{{detailsObject.permonth}}</span></div>
                    <div class="mt-15"><span class="titleHead">开票方式:</span><span>{{detailsObject.otherstyle}}</span></div>
                    <div class="mt-15"><span class="titleHead">应开票日期:</span><span>{{detailsObject.kpday}}</span></div>
                    <div class="mt-15"><span class="titleHead">实际开票日期:</span><span>{{detailsObject.realKpday}}</span></div>
                    <div class="mt-15"><span class="titleHead">发票类型:</span><span>{{detailsObject.kpstyle}}</span></div>
                    <div class="mt-15"><span class="titleHead">发票号码:</span><span>{{detailsObject.fpNum}}</span></div>
                    <div class="mt-15"><span class="titleHead">开票抬头:</span><span>{{detailsObject.company}}</span></div>
                    <div class="mt-15"><span class="titleHead">开票内容:</span><span>{{detailsObject.contant}}</span></div>
                    <div class="mt-15"><span class="titleHead">税号:</span><span>{{detailsObject.shuihao}}</span></div>
                    <div class="mt-15"><span class="titleHead">开户行及账号:</span><span>{{detailsObject.shuihao}}</span></div>
                </el-tab-pane>
                <el-tab-pane style="padding:20px" label="邮寄" name="mail">
                    <div class="mt-15"><span class="titleHead">快递单号:</span><span>{{detailsObject.kdNum}}</span></div>
                    <div class="mt-15"><span class="titleHead">邮寄时间:</span><span>{{detailsObject.kdDate}}</span></div>
                    <div class="mt-15"><span class="titleHead">收件状态:</span><span>{{detailsObject.kdState}}</span></div>
                    <div class="mt-15"><span class="titleHead">收件地址:</span><span>{{detailsObject.address}}</span></div>
                    <div class="mt-15"><span class="titleHead">收件人姓名:</span><span>{{detailsObject.telperson}}</span></div>
                    <div class="mt-15"><span class="titleHead">收件人电话:</span><span>{{detailsObject.telnum}}</span></div>
                </el-tab-pane>
            </el-tabs>
      </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { examineDetails } from "@/api/kpmanage";

export default {
  props: {
    detailsId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      rowId: this.detailsId,
      activeName: "baseDetail",
      detailsObject: null,
      submitLoading: false,
      getDataLoading: false,
      dutySearchLoading: false
    };
  },
  created() {
    this.getRowDetails();
  },
  methods: {
    getRowDetails() {
      examineDetails(this.rowId).then(response => {
        this.detailsObject = response.data;
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.modal-container {
  width: 30%;
  height: calc(100% - 360px);
  padding: 0;
  position: relative;
}
.el-icon-close {
  position: absolute;
  right: 15px;
  top: 12px;
  z-index: 1;
  cursor: pointer;
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
.mt-15 {
  margin-bottom: 15px;
  .titleHead {
    display: inline-block;
    width: 120px;
    text-align: right;
    margin-right: 20px;
  }
}
</style>
