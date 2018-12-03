<template>
  <div class="app-container calendar-list-container">
    <el-form class="form-container" :model="listQuery" :inline="true" label-width="100px" ref="searchForm">

      <el-form-item label="banner所属:" prop="belongto">
        <el-select v-model="listQuery.belongto" size="small" style="width: 174px;" clearable>
          <el-option v-for="item in belongToOptions" :key="item.id" :label="item.dictValue" :value="item.dictCode"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item style="margin-left:43px;">
        <el-button type="primary" icon="search" size="small" v-loading="searchLoading" @click="search">查询</el-button>
        <el-button size="small" @click="resetForm('searchForm')">重置</el-button>
        <el-button v-if="$store.getters.buttons.includes('btnAddBanner')"
          type="primary" icon="plus" size="small" @click="addBanner()">新增</el-button>
      </el-form-item>

    </el-form>

    <el-table :data="list" v-loading="listLoading" border stripe fit style="width: 100%">

      <el-table-column width="80" label="序号" align="center" type="index">
      </el-table-column>
      <el-table-column align="center" label="编码" min-width="150">
        <template slot-scope="scope">
          <span>{{scope.row.identifier}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="150" label="图片" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.picturesurlSmall" @click="showImageClick(scope.row.picturesurl)" />
        </template>
      </el-table-column>
      <el-table-column align="center"  label="跳转URL" min-width="300">
        <template slot-scope="scope">
          <span>{{scope.row.actionurl}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"  min-width="150" label="状态">
        <template slot-scope="scope">
          <span>{{scope.row.statusname}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="150" label="归属">
        <template slot-scope="scope">
          <span>{{scope.row.belongtoText}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="150" label="顺序">
        <template slot-scope="scope">
          <span>{{scope.row.orderby}}</span>
        </template>
      </el-table-column>
      <el-table-column width="250" label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button v-if="$store.getters.buttons.includes('btnPublishBanner') && scope.row.status !== '2802'"
            type="success" size="small"  @click="publishBanner(scope.row)">发布</el-button>
          <el-button v-if="$store.getters.buttons.includes('btnEditBanner')"
                     type="primary" size="small" icon="edit" @click="editBanner(scope.row)"></el-button>
          <el-button v-if="$store.getters.buttons.includes('btnDownlineBanner') && scope.row.status!=='2803'"
                     type="warning" size="small"  @click="downlineBanner(scope.row)">下线</el-button>
          <el-button v-if="$store.getters.buttons.includes('btnDelBanner') && scope.row.status!=='2802'"
                     type="danger" size="small" icon="delete"  @click="delBanner(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination-modal :total=total :page.sync=listQuery.page :pageSize.sync=listQuery.pageSize @getList="getList"></pagination-modal>
    <edit-modal v-if="showModal" @close="showModal = false" @refresh="getList" :isEdit="isEdit" :dataId="dataId"></edit-modal>


      <!-- 图片预览 -->
       <div class="images" v-viewer="{navbar:false,toolbar:true}"   v-show="false">
         <img  :src=imageSrc >
       </div>
    </div>
</template>

<script>
import Utils from "@/utils/common";
import { bannerList, updateStatus, deleteBanner } from "@/api/website";
import { getBannerBelongto } from "@/api/basedata";
import EditModal from "./banneredit";
import "viewerjs/dist/viewer.css";
import Viewer from "v-viewer";

export default {
  name: "bannerList",
  components: {
    EditModal
  },
  data() {
    return {
      imageSrc:"",
      showModal: false,
      isEdit: false,
      list: null,
      listLoading: false,
      searchLoading: false,
      belongToOptions: [],
      total: 0,
      dataId: "",
      listQuery: {
        page: 1,
        pageSize: 10,
        belongto: ""
      },
      banner: {
        belongto: "",
        status: "",
        oldStatus: "",
        identifier: ""
      }
    };
  },
  created() {
    this.getList();
    this.deadlineOptions();
  },
  methods: {
    getList() {
      this.listLoading = false;
      bannerList(this.listQuery)
        .then(response => {
          this.list = response.data;
          this.total = response.count;
          this.listLoading = false;
          this.searchLoading = false;
        })
        .catch(error => {
          console.log(error);
          this.listLoading = false;
          this.searchLoading = false;
        });
    },
    deadlineOptions() {
      getBannerBelongto().then(response => {
        this.belongToOptions = response.data;
      });
    },
    // 添加
    addBanner() {
      this.showModal = true;
      this.isEdit = false;
    },
    // 修改
    editBanner(row) {
      this.showModal = true;
      this.dataId = row.identifier;
      this.isEdit = true;
    },
    // 发布
    publishBanner(row) {
      this.$confirm("确认发布?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.banner.belongto = row.belongto;
          this.banner.identifier = row.identifier;
          this.banner.status = "2802";
          this.banner.oldStatus = row.status;
          updateStatus(this.banner)
            .then(response => {
              Utils.success(`发布成功`);
              this.getList();
            })
            .catch(error => {
              Utils.error(error);
              this.getList();
            });
        })
        .catch(() => {});
    },
    // 下线
    downlineBanner(row) {
      this.$confirm("确认下线?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.banner.identifier = row.identifier;
          this.banner.status = "2803";
          this.banner.oldStatus = row.status;
          updateStatus(this.banner)
            .then(response => {
              Utils.success(`下线成功`);
              this.getList();
            })
            .catch(error => {
              Utils.error(error);
              this.getList();
            });
        })
        .catch(() => {});
    },
    // 删除
    delBanner(row) {
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteBanner(row.identifier)
            .then(response => {
              Utils.success(`删除成功`);
              this.getList();
            })
            .catch(error => {
              Utils.error(error);
              this.getList();
            });
        })
        .catch(() => {});
    },
    search() {
      this.searchLoading = true;
      this.getList();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
.itemblock {
  display: block;
}
</style>
