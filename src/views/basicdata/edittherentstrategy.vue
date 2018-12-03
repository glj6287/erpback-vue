<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" style="max-width: 620px;height: 600px;">
          <div class="modal-header">
            <slot name="header">
              <h3 slot="header" class="text">{{isEdit ? '修改' : '新增'}}租金策略</h3>
              <i class="el-icon-close close" @click="$emit('close')" title="关闭窗口"></i>
            </slot>
          </div>
          <div class="modal-body" v-loading="getDataLoading"  element-loading-text="请给我点时间！">
            <slot name="body">
              <el-form class="form-container" :rules="rules"  ref="submitForm" :model="rentstrategy" label-width="100px">

                <el-form-item label="付款方式:" prop="paymentTypeKey">
                  <el-select v-model="rentstrategy.paymentTypeKey" value-key="paymentTypeKey"  placeholder="请选择">
                    <el-option
                      v-for="item in options4"
                      :key="item.dictCode"
                      :label="item.dictValue"
                      :value="item.dictCode">
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="是否启用:">
                  <el-switch v-model="rentstrategy.isDeleted"
                             on-text="否" off-text="是"
                             on-value="1" off-value="0"></el-switch>
                </el-form-item>

                <el-form-item label="金融产品:">
                  <el-switch v-model="rentstrategy.isFinancialProducts"
                             on-text="否" off-text="是"
                             on-value="1" off-value="0"></el-switch>
                </el-form-item>

                <el-form-item label="折扣（折）:" prop="discount">
                  <el-input v-model.model="rentstrategy.discount" placeholder="折扣（折）"></el-input>
                </el-form-item>
                <el-form-item label="最大值（月）:" prop="maxmonth">
                  <el-input v-model.number=rentstrategy.maxmonth placeholder="最大值（月）"></el-input>
                </el-form-item>
                <el-form-item label="最小值（月）:" prop="minmonth">
                  <el-input v-model.number=rentstrategy.minmonth placeholder="最小值（月）"></el-input>
                </el-form-item>
                <el-form-item label="押,付(值)" prop="remark">
                  <el-input v-model.model=rentstrategy.remark placeholder="押,付(值)"></el-input>
                </el-form-item>
              </el-form>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <el-button type="primary" v-loading="submitLoading" @click="submit">提交</el-button>
              <el-button @click="$emit('close')">取消</el-button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import Utils from "@/utils/common";
import { getRentstrategyCodeInfo, getPaymentData,
  submit } from "@/api/therentstrategy";
export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    rentstrategyCode: {
      type: String,
      default: ""
    }
  },
  data() {
    var checkMonth = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('数值不能为空'));
      }
      if (!Number.isInteger(value)) {
        callback(new Error('请输入数字值'));
      } else {
          callback();
      }
    };
    var checkRemark = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('押，付(值)不能为空'));
      }
      var row =[];
      if(value.indexOf(",") !== -1){
        row = value.split(",");
      }else{
        return callback(new Error('押，付(值)格式有误'));
      }
      if(row.length === 2){
        callback();
      }else{
        return callback(new Error('押，付(值)格式有误'));
      }
    }
    var checkDiscount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('折扣不能为空'));
      }
      var f = parseFloat(value);
      if (isNaN(f)) {
        return callback(new Error('数值格式有误'));
      }else{
        callback();
      }
    }
    return {
      getDataLoading: false,
      submitLoading:false,
      // rentstrategyCode:this.rentstrategyCode,
      rentstrategy:{
        discount:"",
        isFinancialProducts:"",
        isDeleted:"",
        maxmonth:"",
        minmonth:"",
        paymentTypeKey:"",
        paymentTypeValue:"",
        rentstrategyCode:"",
        remark:""
      },
      paymentList:[],
      options4:[],
      rules: {
        minmonth: [
          { validator: checkMonth,  required: true, trigger: 'blur' }
        ],
        maxmonth: [
          { validator: checkMonth,  required: true, trigger: 'blur' }
        ],
        discount: [
          { validator: checkDiscount,  required: true, trigger: 'blur' }
        ],
        paymentTypeKey: [
          { required: true, message: "请选择付款方式", trigger: "change" }
        ],
        remark:[ {validator: checkRemark,  required: true, trigger: 'blur'}]
      }
    }
  },
  created() {
    if(this.isEdit){
      this.getDetail();
    }
    this.getPaymentType();
  },
  methods: {
    getDetail() {
      this.getDataLoading = true;
      getRentstrategyCodeInfo(this.rentstrategyCode)
        .then(response => {
          console.log(this.rentstrategy)
          this.rentstrategy = response.data;
          console.log(this.rentstrategy)
          this.getDataLoading = false;
        })
        .catch(error => {
          Utils.error(error);
          this.getDataLoading = false;
        });
    },
    getPaymentType(){
      getPaymentData().then(response => {
        var paymentList = response.data;
        paymentList.forEach(ele => {
          this.options4.push(ele);
        });
      });
    },
    submit() {
      this.$refs["submitForm"].validate(valid => {
        if(this.rentstrategy.maxmonth < this.rentstrategy.minmonth){
            Utils.warning("最大值必须大于最小值");
            return;
        }
        if (valid) {
          this.submitLoading = true;
          delete this.rentstrategy.updateTime;
          delete this.rentstrategy.createTime;
          submit(this.rentstrategy)
            .then(response => {
              this.submitLoading = false;
              this.$emit("close");
              this.$emit("getList");
              Utils.success(`操作成功`);
            })
            .catch(error => {
              Utils.error(error);
              this.submitLoading = false;
            });
        } else {
          return false;
        }
      });
    }
  }
}
</script>

<style scoped>

</style>
