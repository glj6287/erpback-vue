<template>
  <div class="tab-container">
    <h3 class="housing_title">合同编号：{{dsContractCode}} {{statusName}}</h3>
    <el-tabs style='margin-top:15px;' v-model="activeName" type="border-card">
      <el-tab-pane label="基本信息" name="baseInfo">
        <keep-alive>
          <base-pane v-if='activeName=="baseInfo"'></base-pane>
        </keep-alive>
      </el-tab-pane>

      <el-tab-pane label="日志" name="loggerInfo">
        <keep-alive>
          <logger-pane v-if='activeName=="loggerInfo"'></logger-pane>
        </keep-alive>
      </el-tab-pane>

      <div class="app-container">
      <h3 class="housing_title">审核</h3>
      <div class="main">
        <slot name="body">
          <el-form class="form-container" :rules="rules" ref="submitForm" :model="audit" style="max-width: 500px">
            <el-form-item label="审核结果:" prop="auditresult">
              <el-radio-group v-model="audit.auditresult" @change="changeHandler">
                <el-radio :label="1">通过</el-radio>
                <el-radio :label="2">驳回</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item v-if="showconsentDepict" label="批注:">
              <el-input type="textarea" :rows="2" v-model="audit.depict" placeholder=""></el-input>
            </el-form-item>
            <el-form-item v-if="showturnDownDepict" label="批注:" prop="turnDownDepict">
              <el-input type="textarea" :rows="2" v-model="audit.turnDownDepict" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-form>
        </slot>
        <slot name="footer">
          <el-button type="primary" v-loading="submitLoading" @click="submit">提交</el-button>
        </slot>
      </div>
      </div>
    </el-tabs>


  </div>
</template>

<script>

import BasePane from "./basedetail";
import LoggerPane from "./loggerdetail";

import { submitAudit } from "@/api/downContract";
import Utils from "@/utils/common";

export default {
  name: "contractInfo",
  components: { BasePane, LoggerPane },
  data() {
    return {
      activeName: "baseInfo",
      dsContractCode: this.$route.query.dsContractCode,
      statusName: this.$route.query.statusName,
      submitLoading: false,
      showturnDownDepict: false,
      showconsentDepict:false,
      audit: {
        dsContractCode: this.$route.query.dsContractCode,
        auditresult: null,
        turnDownDepict: "",
        depict:"",
        version: this.$route.query.version
      },
      rules: {
        auditresult: [
          { type: 'number', required: true, message: '请选择', trigger: 'blur' }
        ],
        turnDownDepict: [
          { required: true, message: '请输入批注', trigger: 'blur' }
        ]
      }
    };
  },
  created() {
  },
  methods: {
    changeHandler(val) {
      if (val === 2) {
        this.showturnDownDepict = true;
        this.showconsentDepict = false;
      } else {
        this.showturnDownDepict = false;
        this.showconsentDepict = true;
      }
    },
    submit() {
      this.$refs["submitForm"].validate(valid => {
        if (valid) {
          this.submitLoading = true;
          console.log(this.audit);
          submitAudit(this.audit).then(response => {
            this.submitLoading = false;
            this.$router.push('/taskagents/taskagentlist');
            Utils.success("审核成功");
          }).catch(error => {
            Utils.error(error);
            this.submitLoading = false;
          });
        } else {
          return false;
        }
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
    .tab-container{
      margin: 30px;
    }
    .main{
      padding-left: 20px;
      padding-top: 10px;
    }
</style>

