<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" style="max-width: 950px;">

          <div class="modal-header">
            <slot name="header">
              <h3 slot="header" class="text">下载类型</h3>
              <i class="el-icon-close close" @click="$emit('close')" title="关闭窗口"></i>
            </slot>
          </div>

          <div class="modal-body" v-loading="getDataLoading" element-loading-text="请给我点时间！">
               <div class="demo-input-suffix">
                <!-- 下载类型： -->
                <el-select v-model="downloadType" placeholder="请选择" @change="selectedHandle">
                    <el-option
                    v-for="item in options"
                    :key="item.dictCode"
                    :label="item.dictValue"
                    :value="item.dictValue">
                    </el-option>
                </el-select>
                </div>
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
import {
  downloadFileTable,
  downloadFkFileTable,
  downloadKdFileTable
} from "@/api/kpmanage";

export default {
  props: {
    idsList: {
      type: Array,
      default: null
    },
    kpstyleList: {
      type: Array,
      default: null
    },
    downloads: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      ids: this.idsList, //选中的数据id集合
      kpstyleLists: this.kpstyleList,
      kpstyle: "",
      downloadOrder: this.downloads, //下载类型
      options: [
        { dictCode: "普5", dictValue: "普5" },
        { dictCode: "普6", dictValue: "普6" },
        { dictCode: "专", dictValue: "专" }
      ],
      downloadType: "",
      submitLoading: false,
      getDataLoading: false,
      dutySearchLoading: false
    };
  },
  created() {
    console.log(this.kpstyleList);
  },
  methods: {
    closed() {
      this.$emit("close");
    },
    selectedHandle(val) {
      this.kpstyle = val;
    },

    //下载开票明细
    confirmHandle() {
      if (this.downloadType == "" || this.downloadType == null) {
        this.submitLoading = true;
        Utils.error("必填项不能为空!");
      } else {
        if (this.kpstyleLists.length !== 0) {
          for (let i = 0; i < this.kpstyleList.length; i++) {
            if (this.kpstyleList[i] !== this.kpstyle) {
              Utils.warning("没有数据");
              this.$emit("close");
              return;
            }
          }
        }
        if (this.downloadOrder == 0) {
          downloadFileTable(this.ids, this.kpstyle)
            .then(response => {
              //  this.submitLoading = true;
            })
            .catch(error => {
              this.submitLoading = false;
            });
        } else if (this.downloadOrder == 1) {
          downloadFkFileTable(this.ids, this.kpstyle)
            .then(response => {
              //  this.submitLoading = true;
            })
            .catch(error => {
              this.submitLoading = false;
            });
        } else if (this.downloadOrder == 2) {
          downloadKdFileTable(this.ids, this.kpstyle)
            .then(response => {
              //  this.submitLoading = true;
            })
            .catch(error => {
              this.submitLoading = false;
            });
        }
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.modal-container {
  width: 30%;
  height: calc(100% - 550px);
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
</style>
