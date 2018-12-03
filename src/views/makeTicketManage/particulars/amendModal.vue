<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" style="max-width: 950px;">

          <div class="modal-header">
            <slot name="header">
              <h3 slot="header" class="text">修改</h3>
              <i class="el-icon-close close" @click="$emit('close')" title="关闭窗口"></i>
            </slot>
          </div>

          <div class="modal-body" v-loading="getDataLoading" element-loading-text="请给我点时间！">
             <el-form class="form-container" :model="listQuery" label-width="100px" :inline="true" ref="searchForm">

                <el-form-item label="修改方式" prop="updateManner">
                    <el-select size="small" v-model="listQuery.modifyType" placeholder="请选择" clearable>
                    <el-option v-for="item in exitOptions" :key="item.dictValue" :label="item.dictValue"
                                :value="item.dictCode"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="修改类别" prop="modifyItem">
                    <el-select size="small" v-model="listQuery.modifyItem" placeholder="请选择" clearable>
                    <el-option v-for="item in updateSelectType" :key="item.itemKey" :label="item.itemName"
                                :value="item.itemKey"></el-option>
                    </el-select>
                </el-form-item>

                 <el-form-item label="修改为" prop="modifyVal">
                    <el-input v-model="listQuery.modifyVal" size="small" placeholder="" style="width:200px"></el-input>
                </el-form-item>

                <el-form-item label="房号" prop="houseCode">
                    <el-input v-model="listQuery.houseCode" size="small" placeholder="" :disabled="isCompile" style="width:200px"></el-input>
                </el-form-item>

                <el-form-item label="应开票日期" prop="kpdayBegin">
                    <el-input v-model="listQuery.kpday" size="small"
                            :disabled="isCompile" style="width:200px"></el-input>
                </el-form-item>

                <el-form-item label="合同起始" prop="firstdate">
                    <el-input v-model="listQuery.firstdate" size="small"
                            :disabled="isCompile" style="width:200px"></el-input>
                </el-form-item>

                <el-form-item label="合同终止" prop="enddate">
                    <el-input v-model="listQuery.enddate" size="small"
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
import { fnGetUpdateList, fnModificationPort } from "@/api/kpmanage";
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
      rowObject: this.rows,
      exitOptions: [
        { dictCode: "1", dictValue: "修改本条" },
        { dictCode: "2", dictValue: "批量修改" }
      ],
      updateSelectType: [],
      downloadType: "",
      submitLoading: false,
      getDataLoading: false,
      dutySearchLoading: false,
      listQuery: {
        modifyType: "", // 修改方式
        modifyItem: "", // 修改的项
        modifyVal: "", // 修改的值
        houseCode: this.rows.houseCode, // 房源编号
        kpday: this.formatTime(this.rows.kpday), // 应开票日期
        firstdate: this.formatTime(this.rows.firstdate), // 合同起始日期
        enddate: this.formatTime(this.rows.enddate), // 合同终止
        kpfirst: this.formatTime(this.rows.kpfirst), // 开票起始
        kpend: this.formatTime(this.rows.kpend) // 开票终止
      }
    };
  },
  created() {
    this.getUpdateList();
  },
  methods: {
    formatTime(date) {
      if (date) {
        return date.substring(0, date.indexOf(" "));
      }
      return "-";
    },
    // 获取修改方式,类别枚举信息
    getUpdateList() {
      fnGetUpdateList().then(response => {
        this.updateSelectType = response.data;
      });
    },
    // 确定
    confirmHandle() {
      fnModificationPort(this.listQuery)
        .then(response => {
          if (response.code === "000000") {
            this.$message.success("处理成功！");
            this.$emit("getList");
            this.$emit("close");
          } else {
            this.$message.error("处理失败！" + response.msg);
          }
        })
        .catch(error => {
          this.submitLoading = false;
        });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.modal-container {
  width: 25%;
  height: calc(100% - 200px);
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
