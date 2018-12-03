<template>
 <div class="app-container">
    <el-container>
        <el-header>
            <h3 class="housing_title">小区详情</h3>
        </el-header>
        <el-main class="housing">
            <div class="main">
              <el-row class="housing_detail">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>小区名称:</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-light">
                        <span>哈哈小区</span>
                    </div>
                </el-col>
              </el-row>
              <el-row class="housing_detail">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>社区名称:</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-light">
                        <span>嘻哈社区</span>
                    </div>
                </el-col>
              </el-row>
              <el-row class="housing_detail">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>小区地址:</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-light">
                        <span>上海市徐汇区徐家汇虹桥路1号</span>
                    </div>
                </el-col>
              </el-row>
              <el-row class="housing_detail">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>建筑年代:</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-light">
                        <span>1990年</span>
                    </div>
                </el-col>
              </el-row>
              <el-row class="housing_detail">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>物业名称:</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-light">
                        <span>哈哈物业哈哈物业哈哈物业哈哈物业哈哈物业</span>
                    </div>
                </el-col>
              </el-row>
              <el-row class="housing_detail">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>物业电话:</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-light">
                        <span>021-123456</span>
                    </div>
                </el-col>
              </el-row>
              <el-row class="housing_detail">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>交通情况:</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-light">
                        <span>这边这边这边这边这边这边</span>
                    </div>
                </el-col>
              </el-row>
              <el-row class="housing_detail">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>周边配套:</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-light">
                        <span>这边这边这边这边这边这边</span>
                    </div>
                </el-col>
              </el-row>
            </div>
        </el-main>
    </el-container>
 </div>
</template>

<script>
export default {

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
        margin-bottom: 30px;
    }
    .housing_detail_pic{
        display: inline-block;
        width: 100px;
        height: 50px;
    }
</style>

