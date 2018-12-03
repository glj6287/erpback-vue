<template>
    <div class="app-container">
        <h3>不同租期可选的付款方式</h3>
        <div class="termList" id="termList">
         <ul>
                <li  v-for='(list, index) in lists' :key=list.id  class="lists-item"> 
                     <el-row>
                        <el-col :span="24">
                            <div class="grid-content bg-purple-dark">
                                <el-row :gutter="20">
                                    <el-col :span="16">
                                        <div class="grid-content bg-purple" style="margin-bottom:10px">
                                            <label style="margin-right:74px;">租期</label>   
                                            <span>{{lists[index].month}}个月</span><span><</span><span>租期</span><span><</span><span></span>
                                            <el-input v-model.number="lists[index].term" size="small" @blur="fnAddTerm(lists[index].term,lists[index].id)"  style="width:100px;margin-right:6px"  :disabled="lists[index].disabled"></el-input>个月
                                        </div>
                                        <div class="grid-content bg-purple" style="display:inline">
                                            <el-checkbox-group v-model="lists[index].checkList" style="display:inline-block;width:130%;">
                                                <label style="margin-right:30px;height:30px;display: inline-block;">付款方式*:</label> 
                                                <el-checkbox v-for="item in checkBoxLists" :label="item.dictCode" :key="item.id">{{item.dictValue}}</el-checkbox>
                                                <el-button type="danger" v-if="lists[index].isShow"  @click="fnDeleItem(lists.index)"  icon="el-icon-delete" size="mini" style="margin-left:20px">删除</el-button>
                                            </el-checkbox-group>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-col>
                 </el-row>
		        </li>
            </ul>
        </div>
        <el-button type="primary" @click="scve()">保存</el-button>
    </div>
</template>
<script>
import { getAll, deletel } from "@/api/therentstrategy";
import { paymentType,savePayment } from "@/api/basedata";
import Utils from "@/utils/common";
import Vue from "vue";
export default {
  data() {
    return {
      isShowDeleBtn: false,
      checkList: [],
      checkBoxLists: [],
      lists: [{ id: 1, month:0, term: "", checkList: [], disabled:false, isShow:true}],
      id: 0,
      count:1
    };
  },
  created() {
     this.getPaymentTypeList()
     this.lists[this.lists.length-1].isShow = false
  },
  methods: {
      //获取付款方式
    getPaymentTypeList(){
       paymentType().then(response => {
           if(response.code == "000000"){
               this.checkBoxLists = response.data
           }
       })
    },
      
    fnAddTerm(term,id) {
        // console.log(this.lists);
        if(term =="" || term == null){
            return
        }else if(term < this.lists[this.lists.length-1].month || term == this.lists[this.lists.length-1].month){
            Utils.warning('此月数要大于上个月数!')
            return
        }else{
            this.lists[this.lists.length-1].disabled = true;
        }
        this.lists.push({
        id: this.id++,
        term: "",
        month: term,
        checkList:this.checkList,
        disabled:false,
        isShow:true
      });
    },

    //删除当前项
    fnDeleItem(index) {        
        if(this.lists.length == 2) {
           this.lists[0].disabled = false;
        }
      this.lists.splice(this.lists.lastIndexOf(), 1);
    },

    //保存
    scve(){
        savePayment(this.lists).then(response => {
            console.log(response);
        })
    }   
   

  }
};
</script>


<style lang="scss" scoped>
h2 {
  text-indent: 60px;
  margin-bottom: 50px;
}
h3 {
  margin: 60px 0;
  text-indent: 60px;
}
.ml {
  padding-left: 45px;
  margin-bottom: 15px;
}
.lists-item {
  list-style: none;
  margin-bottom: 20px;
}
</style>


 <!-- <h2>租金折扣</h2>
        <el-form class="form-container" :model="listQuery" v-loading="listLoading" :inline="false" label-width="130px" ref="searchForm">
                <el-form-item label="押2付1*:" prop="name">
                    <el-input v-model.number="listQuery.a" size="small"  style="width:300px;margin-right:6px" ></el-input>折
                </el-form-item>
                <el-form-item label="押1付3*:" prop="communityCode">
                    <el-input v-model="listQuery.b" size="small"  style="width:300px;margin-right:6px" ></el-input>折
                </el-form-item>
                  <el-form-item label="押1付6*:" prop="name">
                    <el-input v-model="listQuery.a" size="small"  style="width:300px;margin-right:6px" ></el-input>折
                </el-form-item>
                <el-form-item label="押1付12*:" prop="communityCode">
                    <el-input v-model="listQuery.b" size="small"  style="width:300px;margin-right:6px" ></el-input>折
                </el-form-item>
                  <el-form-item label="押1付1*:" prop="name">
                    <el-input v-model="listQuery.a" size="small"  style="width:300px;margin-right:6px" ></el-input>折
                </el-form-item>
                <el-form-item label="押2付2*:" prop="communityCode">
                    <el-input v-model="listQuery.b" size="small"  style="width:300px;margin-right:6px" ></el-input>折
                </el-form-item>
                  <el-form-item label="押2付3*:" prop="name">
                    <el-input v-model="listQuery.a" size="small"  style="width:300px;margin-right:6px" ></el-input>折
                </el-form-item>
                <el-form-item label="押2付4*:" prop="communityCode">
                    <el-input v-model="listQuery.b" size="small"  style="width:300px;margin-right:6px" ></el-input>折
                </el-form-item>
                  <el-form-item label="押3付1*:" prop="name">
                    <el-input v-model="listQuery.a" size="small"  style="width:300px;margin-right:6px" ></el-input>折
                </el-form-item>
                <el-form-item label="押1付2*:" prop="communityCode">
                    <el-input v-model="listQuery.b" size="small"  style="width:300px;margin-right:6px" ></el-input>折
                </el-form-item>
                  <el-form-item label="押1付10*:" prop="name">
                    <el-input v-model="listQuery.a" size="small"  style="width:300px;margin-right:6px" ></el-input>折
                </el-form-item>
                <el-form-item label="押0付1*:" prop="communityCode">
                    <el-input v-model="listQuery.b" size="small"  style="width:300px;margin-right:6px" ></el-input>折
                </el-form-item>
                  <el-form-item label="押2付6*:" prop="name">
                    <el-input v-model="listQuery.a" size="small"  style="width:300px;margin-right:6px" ></el-input>折
                </el-form-item>
                <el-form-item label="押2付12*:" prop="communityCode">
                    <el-input v-model="listQuery.b" size="small"  style="width:300px;margin-right:6px" ></el-input>折
                </el-form-item>
                  <el-form-item label="押0付3*:" prop="name">
                    <el-input v-model="listQuery.a" size="small"  style="width:300px;margin-right:6px" ></el-input>折
                </el-form-item>
                <el-form-item label="押0付2*:" prop="communityCode">
                    <el-input v-model="listQuery.b" size="small"  style="width:300px;margin-right:6px" ></el-input>折
                </el-form-item>
                  <el-form-item label="押1付4*:" prop="name">
                    <el-input v-model="listQuery.a" size="small"  style="width:300px;margin-right:6px" ></el-input>折
                </el-form-item>
                <el-form-item label="押3付3*:" prop="communityCode">
                    <el-input v-model="listQuery.b" size="small"  style="width:300px;margin-right:6px" ></el-input>折
                </el-form-item>
                  <el-form-item label="押0付12*:" prop="name">
                    <el-input v-model="listQuery.a" size="small"  style="width:300px;margin-right:6px" ></el-input>折
                </el-form-item>
                <el-form-item label="押0付6*:" prop="communityCode">
                    <el-input v-model="listQuery.b" size="small"  style="width:300px;margin-right:6px" ></el-input>折
                </el-form-item>
                  <el-form-item label="(元宝)押1付1*:" prop="name">
                    <el-input v-model="listQuery.a" size="small"  style="width:300px;margin-right:6px" ></el-input>折
                </el-form-item>
                <el-form-item label="(华瑞)押1付1*:" prop="communityCode">
                    <el-input v-model="listQuery.b" size="small"  style="width:300px;margin-right:6px" ></el-input>折
                </el-form-item>
        </el-form>