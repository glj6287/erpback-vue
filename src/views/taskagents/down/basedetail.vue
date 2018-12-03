<template>
  <div class="app-container" v-loading="getDataLoading" >
    <h3 class="housing_title">房源信息</h3>
    <div class="main">
      <el-row class="housing_detail">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span>小区名称:</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <span v-if="dsContractViewVo.rentApplyVo.houseInfoVo != null">{{dsContractViewVo.rentApplyVo.houseInfoVo.neighborhoodName}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span>门牌号:</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <span v-if="dsContractViewVo.rentApplyVo.houseInfoVo != null">{{dsContractViewVo.rentApplyVo.houseInfoVo.houseNoText}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span>地址:</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <span v-if="dsContractViewVo.rentApplyVo.houseInfoVo != null">{{dsContractViewVo.rentApplyVo.houseInfoVo.address}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span>房型:</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <span v-if="dsContractViewVo.rentApplyVo.houseInfoVo != null">{{dsContractViewVo.rentApplyVo.houseInfoVo.layoutText}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span>面积:</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <span v-if="dsContractViewVo.rentApplyVo.houseInfoVo != null">{{dsContractViewVo.rentApplyVo.houseInfoVo.houseArea}}㎡</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span>楼层:</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
                <span v-if="dsContractViewVo.rentApplyVo.houseInfoVo != null">
                  {{dsContractViewVo.rentApplyVo.houseInfoVo.curFloor}}/{{dsContractViewVo.rentApplyVo.houseInfoVo.totalFloor}}层
                </span>
          </div>
        </el-col>
      </el-row>
    </div>

    <h3 class="housing_title">租约信息</h3>
    <div class="main">
      <el-row class="housing_detail">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span>签约公司:</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <span v-if="dsContractViewVo.rentApplyVo.rentOutVo != null">{{dsContractViewVo.rentApplyVo.rentOutVo.signCompanyText}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span>合同类型:</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
           <span v-if="dsContractViewVo.rentApplyVo.rentOutVo != null">
             {{dsContractViewVo.rentApplyVo.rentOutVo.contractTypeText}}
           </span>
          </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span>租期:</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
           <span v-if="dsContractViewVo.rentApplyVo.rentOutVo != null">
             {{dsContractViewVo.rentApplyVo.rentOutVo.dateStartedRent}}-{{dsContractViewVo.rentApplyVo.rentOutVo.dateEndedRent}}
           </span>
          </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span>灵活期:</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <span v-if="dsContractViewVo.rentApplyVo.rentOutVo.dateStartedFlexible === null">无</span>
            <span v-if="dsContractViewVo.rentApplyVo.rentOutVo.dateStartedFlexible !== null">{{ dsContractViewVo.rentApplyVo.rentOutVo.dateStartedFlexible }}-{{ dsContractViewVo.rentApplyVo.rentOutVo.dateEndedFlexible }}</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4" v-if="dsContractViewVo.rentApplyVo.rentOutVo != null">
          <div class="grid-content bg-purple"><span>纯租金:</span></div>
        </el-col>
        <el-col :span="10" v-if="dsContractViewVo.rentApplyVo.rentOutVo != null">
          <div v-if="dsContractViewVo.rentApplyVo.rentOutVo.isGThanTwoYear === false ">
            <div class="grid-content bg-purple-light"><span>{{ dsContractViewVo.rentApplyVo.rentOutVo.pureRentMoney }}元/月</span></div>
          </div>
          <div v-if="dsContractViewVo.rentApplyVo.rentOutVo.isGThanTwoYear === true ">
            <div class="grid-content bg-purple-light">
              <ul style="padding: 0px;">
                <li v-for="rentVo in dsContractViewVo.rentApplyVo.rentOutVo.pureRentList" style="list-style: none"><span>{{ rentVo.rentStartedTimeText }} - {{ rentVo.rentEndedTimeText }} : {{ rentVo.monthMoney }}元/月</span></li>
              </ul>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span>增配租金:</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
           <span v-if="dsContractViewVo.rentApplyVo.rentOutVo != null">
             {{dsContractViewVo.rentApplyVo.rentOutVo.additionMoney}}元/月
           </span>
          </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
          <div class="grid-content bg-purple"><span>租金:</span></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light"><span v-if="dsContractViewVo.rentApplyVo.rentOutVo != null">{{ dsContractViewVo.rentApplyVo.rentOutVo.totalRentMoney }}元/月</span></div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span>押金:</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
           <span v-if="dsContractViewVo.rentApplyVo.rentOutVo != null">
             {{dsContractViewVo.rentApplyVo.rentOutVo.guaranteeMoney}}元
           </span>
          </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span>付款方式:</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
           <span v-if="dsContractViewVo.rentApplyVo.rentOutVo != null">
             {{dsContractViewVo.rentApplyVo.rentOutVo.paymentTypeValue}}
           </span>
          </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span>宽带费:</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
           <span v-if="dsContractViewVo.rentApplyVo.rentOutVo != null">
             {{dsContractViewVo.rentApplyVo.rentOutVo.networkFeeText}}
           </span>
          </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span>非首次付款日:</span>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="grid-content bg-purple-light">
           <span v-if="dsContractViewVo.rentApplyVo.rentOutVo != null">
             {{dsContractViewVo.rentApplyVo.rentOutVo.noFirstPaymentDay}}日
           </span>
          </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span>实际退租日期:</span>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="grid-content bg-purple-light">
           <span>
             {{dsContractViewVo.contract.throwLeaseTime}}
           </span>
          </div>
        </el-col>
      </el-row>
    </div>


    <h3 class="housing_title">租客信息</h3>
    <div class="main" v-if="dsContractViewVo.tenantsInfo.tenantsType === 'personal'">
      <el-row class="housing_detail">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span>租客类型:</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <span>{{dsContractViewVo.rentApplyVo.rentOutVo.renterTypeText}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span>姓名:</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <span>{{dsContractViewVo.tenantsInfo.tenantsName}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span>性别:</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <span>{{dsContractViewVo.tenantsInfo.sexText}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span>国籍:</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <span>{{dsContractViewVo.tenantsInfo.natiChineseName}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span>手机号码:</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <span>{{dsContractViewVo.tenantsInfo.contactPhone | contactPhoneFilter }}</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span>证件类型:</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <span>{{dsContractViewVo.tenantsInfo.certificatesTypeText}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span>证件号码:</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <span>{{dsContractViewVo.tenantsInfo.certificatesNo | certificatesNoFilter}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span>证件照片:</span>
          </div>
        </el-col>
        <el-col :span="20">
          <div class="grid-content bg-purple-light">
           <span v-if="dsContractViewVo.picvoList != null && dsContractViewVo.picvoList.length>0">
             <img v-for="item in dsContractViewVo.picvoList" :src="item.attcUrlSmall" :key="item.attcCode" @click="showImageClick(item.attcUrl)" />
           </span>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="main" v-if="dsContractViewVo.tenantsInfo.tenantsType === 'enterprise'">
      <el-row class="housing_detail">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span>租客类型:</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <span>{{dsContractViewVo.rentApplyVo.rentOutVo.renterTypeText}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span>企业名称:</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <span>{{dsContractViewVo.tenantsInfo.companyName}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span>统一社会信用代码:</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <span>{{dsContractViewVo.infodetail.socialCreditCode}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span>公司电话:</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <span>{{dsContractViewVo.tenantsInfo.companyPhone}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="housing_detail">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span>公司地址:</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <span>{{dsContractViewVo.tenantsInfo.companyAddress}}</span>
          </div>
        </el-col>
      </el-row>

    </div>

    <h3 class="housing_title">租客来源</h3>
    <div class="main">
      <el-row class="housing_detail">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span>租客来源:</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <span v-if="dsContractViewVo.rentApplyVo.rentOutVo != null">{{dsContractViewVo.rentApplyVo.rentOutVo.renterSourceText}}</span>
          </div>
        </el-col>
      </el-row>
      <span v-if="dsContractViewVo.rentApplyVo.rentOutVo != null && dsContractViewVo.rentApplyVo.rentOutVo.renterSource !== '1901' && dsContractViewVo.rentApplyVo.rentOutVo.renterSource !== '1902'">

     <el-row class="housing_detail">
       <el-col :span="4">
         <div class="grid-content bg-purple">
           <span>中介名称:</span>
         </div>
       </el-col>
       <el-col :span="6">
         <div class="grid-content bg-purple-light">
           <span v-if="dsContractViewVo.rentApplyVo.rentOutVo != null && dsContractViewVo.rentApplyVo.rentOutVo.agentInfo != null ">
             {{dsContractViewVo.rentApplyVo.rentOutVo.agentInfo.agentName}}
           </span>
         </div>
       </el-col>
     </el-row>
     <el-row class="housing_detail">
       <el-col :span="4">
         <div class="grid-content bg-purple">
           <span>联系人:</span>
         </div>
       </el-col>
       <el-col :span="6">
         <div class="grid-content bg-purple-light">
           <span v-if="dsContractViewVo.rentApplyVo.rentOutVo != null && dsContractViewVo.rentApplyVo.rentOutVo.agentInfo != null" >
             {{dsContractViewVo.rentApplyVo.rentOutVo.agentInfo.contactName}}
           </span>
         </div>
       </el-col>
     </el-row>
     <el-row class="housing_detail">
       <el-col :span="4">
         <div class="grid-content bg-purple">
           <span>联系人电话:</span>
         </div>
       </el-col>
       <el-col :span="6">
         <div class="grid-content bg-purple-light">
           <span v-if="dsContractViewVo.rentApplyVo.rentOutVo != null && dsContractViewVo.rentApplyVo.rentOutVo.agentInfo != null">
             {{dsContractViewVo.rentApplyVo.rentOutVo.agentInfo.contactMobile}}
           </span>
         </div>
       </el-col>
     </el-row>
     <el-row class="housing_detail">
       <el-col :span="4">
         <div class="grid-content bg-purple">
           <span>佣金:</span>
         </div>
       </el-col>
       <el-col :span="6">
         <div class="grid-content bg-purple-light">
           <span v-if="dsContractViewVo.rentApplyVo.rentOutVo != null && dsContractViewVo.rentApplyVo.rentOutVo.agentInfo != null">
             {{dsContractViewVo.rentApplyVo.rentOutVo.agentInfo.brokerage}}元/月
           </span>
         </div>
       </el-col>
     </el-row>
     </span>
    </div>

    <h3 class="housing_title">发票信息</h3>
    <div class="main">
    <span v-for="item in dsContractViewVo.receiptList">
     <el-row class="housing_detail">
       <el-col :span="4">
         <div class="grid-content bg-purple">
           <span>发票类型:</span>
         </div>
       </el-col>
       <el-col :span="6">
         <div class="grid-content bg-purple-light">
           <span>{{item.receiptType | receiptTypeFilter}}</span>
         </div>
       </el-col>
     </el-row>
      <el-row class="housing_detail">
         <el-col :span="4">
           <div class="grid-content bg-purple">
             <span>税号:</span>
           </div>
         </el-col>
         <el-col :span="6">
           <div class="grid-content bg-purple-light">
             <span>{{item.taxNumber}}</span>
           </div>
         </el-col>
      </el-row>
      <el-row class="housing_detail">
       <el-col :span="4">
         <div class="grid-content bg-purple">
           <span>发票抬头:</span>
         </div>
       </el-col>
       <el-col :span="6">
         <div class="grid-content bg-purple-light">
           <span>{{item.receiptName}}</span>
         </div>
       </el-col>
      </el-row>
      <el-row class="housing_detail">
       <el-col :span="4">
         <div class="grid-content bg-purple">
           <span>开票金额:</span>
         </div>
       </el-col>
       <el-col :span="6">
         <div class="grid-content bg-purple-light">
           <span v-if="item.money !== null">{{item.money}} 元</span>
         </div>
       </el-col>
      </el-row>

      <span v-if="item.receiptType === '1'">
        <el-row class="housing_detail">
         <el-col :span="4">
           <div class="grid-content bg-purple">
             <span>开户行:</span>
           </div>
         </el-col>
         <el-col :span="6">
           <div class="grid-content bg-purple-light">
             <span>{{item.bankSubbranchName}}</span>
           </div>
         </el-col>
        </el-row>
        <el-row class="housing_detail">
         <el-col :span="4">
           <div class="grid-content bg-purple">
             <span>开户号:</span>
           </div>
         </el-col>
         <el-col :span="6">
           <div class="grid-content bg-purple-light">
             <span>{{item.bankCard}}</span>
           </div>
         </el-col>
        </el-row>
        <el-row class="housing_detail">
         <el-col :span="4">
           <div class="grid-content bg-purple">
             <span>电话:</span>
           </div>
         </el-col>
         <el-col :span="6">
           <div class="grid-content bg-purple-light">
             <span>{{item.phone}}</span>
           </div>
         </el-col>
        </el-row>
        <el-row class="housing_detail">
         <el-col :span="4">
           <div class="grid-content bg-purple">
             <span>地址:</span>
           </div>
         </el-col>
         <el-col :span="6">
           <div class="grid-content bg-purple-light">
             <span>{{item.address}}</span>
           </div>
         </el-col>
        </el-row>
      </span>

      <el-row class="housing_detail">
         <el-col :span="4">
           <div class="grid-content bg-purple">
             <span>收款银行:</span>
           </div>
         </el-col>
         <el-col :span="6">
           <div class="grid-content bg-purple-light">
             <span>{{item.bankName}}</span>
           </div>
         </el-col>
      </el-row>
      <el-row class="housing_detail">
       <el-col :span="4">
         <div class="grid-content bg-purple">
           <span>收件人:</span>
         </div>
       </el-col>
       <el-col :span="6">
         <div class="grid-content bg-purple-light">
           <span>{{dsContractViewVo.addresseeInfo.name}}</span>
         </div>
       </el-col>
      </el-row>
      <el-row class="housing_detail">
       <el-col :span="4">
         <div class="grid-content bg-purple">
           <span>手机号码:</span>
         </div>
       </el-col>
       <el-col :span="6">
         <div class="grid-content bg-purple-light">
           <span>{{dsContractViewVo.addresseeInfo.phone}}</span>
         </div>
       </el-col>
      </el-row>
      <el-row class="housing_detail">
       <el-col :span="4">
         <div class="grid-content bg-purple">
           <span>邮箱地址:</span>
         </div>
       </el-col>
       <el-col :span="6">
         <div class="grid-content bg-purple-light">
           <span>{{dsContractViewVo.addresseeInfo.email}}</span>
         </div>
       </el-col>
      </el-row>
      <el-row class="housing_detail">
       <el-col :span="4">
         <div class="grid-content bg-purple">
           <span>寄送地址:</span>
         </div>
       </el-col>
       <el-col :span="6">
         <div class="grid-content bg-purple-light">
           <span>
             {{dsContractViewVo.addresseeInfo.provinceValue}}{{dsContractViewVo.addresseeInfo.cityValue}}
             {{dsContractViewVo.addresseeInfo.areaValue}}{{dsContractViewVo.addresseeInfo.detailedAddress}}
           </span>
         </div>
       </el-col>
      </el-row>
    </span>
    </div>

    <h3 class="housing_title">附件</h3>
    <div class="main" v-if="dsContractViewVo.rentApplyVo.rentOutVo != null && dsContractViewVo.rentApplyVo.rentOutVo.renterType === 'personal'">
      <el-row class="housing_detail">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span>电子合同:</span>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="grid-content bg-purple-light">
           <span v-for="item in dsContractViewVo.dzhtlistFile">
             <el-button @click="toView(item)" type="text">{{item.attcName}}</el-button><br/>
           </span>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="main" v-if="dsContractViewVo.rentApplyVo.rentOutVo != null && dsContractViewVo.rentApplyVo.rentOutVo.renterType === 'enterprise'">
      <el-row class="housing_detail">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span>纸质合同:</span>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="grid-content bg-purple-light">
           <span>
             <img v-for="item in dsContractViewVo.zzhtlistFile" :src="item.attcUrlSmall" :key="item.attcCode" @click="showImageClick(item.attcUrl)"/>
           </span>
          </div>
        </el-col>
      </el-row>
    </div>

    <h3 class="housing_title">签约人</h3>
    <div class="main">
      <el-row class="housing_detail">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span>特工姓名:</span>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="grid-content bg-purple-light">
            <span>{{ dsContractViewVo.contract.signName }}</span>
          </div>
        </el-col>
      </el-row>
    </div>

    <h3 class="housing_title">质押方</h3>
    <div class="main" v-if="$store.getters.buttons.includes('downcontractPledgeLook')">
      <el-table :data="downPledgeList" v-loading="getDataLoading" border stripe fit  style="width: 100%">

        <el-table-column align="center" label="编码" >
          <template slot-scope="scope" >
            <span>{{scope.row.pledgeCode}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="质押方" >
          <template slot-scope="scope" >
            <span>{{scope.row.pledgePartyValue}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="质押开始时间" >
          <template slot-scope="scope">
            <span>{{scope.row.pledgeStartStr}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="质押结束时间" >
          <template slot-scope="scope">
            <span>{{scope.row.pledgeEndStr}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="创建日期" >
          <template slot-scope="scope">
            <span>{{scope.row.createTime | dateFilter}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="备注" >
          <template slot-scope="scope">
            <span>{{scope.row.remark}}</span>
          </template>
        </el-table-column>

      </el-table>
    </div>

    <!-- 图片预览 -->
    <div class="images" v-viewer="{navbar:false,toolbar: true}"   v-show="false">
      <img  :src=imageSrc >
    </div>
  </div>
</template>

<script>
  import { downcontractDetail, getDownPledge } from "@/api/downContract";
  import Utils from "@/utils/common";
  import Viewer from "v-viewer";
  import 'viewerjs/dist/viewer.css'
  import Vue from "vue";
  export default {
    data() {
      return {
        imageSrc: "", //图片预览,
        getDataLoading: false,
        dsContractCode: this.$route.query.dsContractCode,
        dsContractViewVo: {
          contract: "",
          rentApplyVo: "",
          zzhtlistFile: [],
          dzhtlistFile: [],
          tenantsInfo: "",
          infodetail: "",
          picvoList: [],
          receiptList: [],
          addresseeInfo: ""
        },
        downPledgeList: []
      };
    },
    filters: {
      receiptTypeFilter(status) {
        const statusMap = {
          "1": "增值税发票",
          "0": "电子发票"
        };
        return statusMap[status];
      },
      contactPhoneFilter: function(value) {
        if (!value) {
          return '';
        }
        return value.substr(0, 3) + "******" + value.substr(-2);
      },
      certificatesNoFilter: function(value) {
        if (!value) {
          return '';
        }
        return value.substr(0, 3) + "******" + value.substr(-2);
      }
    },
    created() {
      this.getDetail();
      this.getDownPledge();
    },
    methods: {
      getDetail() {
        downcontractDetail(this.dsContractCode).then(response => {
          console.log(response.data)
          this.dsContractViewVo = response.data;
        }).catch(error => {
          Utils.error(error);
        });
      },
      toView(row) {
        if (row.attcUrl !== null && row.attcUrl !== "") {
          window.open(row.attcUrl, '_blank');
        }
      },
      // 图片预览
      showImageClick(src) {
        // this.imageSrc = `${src}?t=${new Date().getTime()}`;
        this.imageSrc = src;
        this.$nextTick(() => {
          const viewer = this.$el.querySelector(".images").$viewer;
          viewer.show();
        });
      },
      getDownPledge() {
        getDownPledge(this.dsContractCode).then(response => {
          console.log(response.data)
          this.downPledgeList = response.data;
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
</style>

