<template>
  <div class="main_box">
    <el-container class="main_container">
      <el-header>
        <div class="city_logo_container">
          <img src="../assets/image/city_logo.jpg">
          <span id="main_title">重庆环境管理系统</span>
          <el-button type="info" round size="mini" id="quit">退出</el-button>
        </div>
      </el-header>

      <el-container>
        <el-aside width="230px">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#909399"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-submenu index="9">
              <template slot="title">
                <i class="el-icon-map-location"></i>
                <span>地图导航</span>
              </template>
              <el-menu-item-group>
                <router-link class="link" to="/main/caompanyMap">
                  <el-menu-item index="9-1">环卫公司</el-menu-item>
                </router-link>
                <router-link class="link" to="/main/sanitationParkMap">
                  <el-menu-item index="9-2">环卫停车厂</el-menu-item>
                </router-link>
                <router-link class="link" to="/main/publicLavatoryMap">
                  <el-menu-item index="9-3">公共厕所</el-menu-item>
                </router-link>
                <router-link class="link" to="/main/rubbishTransferStationMap">
                  <el-menu-item index="9-4">垃圾转运站</el-menu-item>
                </router-link>
                <router-link class="link" to="/main/factorysMap">
                  <el-menu-item index="9-5">垃圾处理工厂</el-menu-item>
                </router-link>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>环卫设施管理</span>
              </template>
              <el-menu-item-group>
                <router-link class="link" to="/main/pl">
                  <el-menu-item index="1-1">公共厕所</el-menu-item>
                </router-link>
                <router-link class="link" to="/main/rts">
                  <el-menu-item index="1-2">垃圾转运站</el-menu-item>
                </router-link>
                <router-link class="link" to="/main/park">
                  <el-menu-item index="1-3">环卫停车场</el-menu-item>
                </router-link>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>环卫公司管理</span>
              </template>
              <el-menu-item-group>
                <router-link class="link" to="/main/company">
                  <el-menu-item index="2-1">环卫公司</el-menu-item>
                </router-link>
                <router-link class="link" to="/main/worker">
                  <el-menu-item index="2-2">环卫工人</el-menu-item>
                </router-link>
                <router-link class="link" to="/main/car">
                  <el-menu-item index="2-3">环卫车辆</el-menu-item>
                </router-link>
              </el-menu-item-group>
            </el-submenu>
            <router-link class="link" to="/main/street">
              <el-menu-item index="7">
                <i class="el-icon-location"></i>
                <span slot="title">街道信息管理</span>
              </el-menu-item>
            </router-link>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-office-building"></i>
                <span>污水处理厂管理</span>
              </template>
              <el-menu-item-group>
                <router-link class="link" to="/main/stpFactory/1">
                  <el-menu-item index="3-1">石龙污水处理厂</el-menu-item>
                </router-link>
                <router-link class="link" to="/main/stpFactory/2">
                  <el-menu-item index="3-2">歇马污水处理厂</el-menu-item>
                </router-link>
                <router-link class="link" to="/main/stpFactory/3">
                  <el-menu-item index="3-3">东泉污水处理厂</el-menu-item>
                </router-link>
                <router-link class="link" to="/main/stpFactory/4">
                  <el-menu-item index="3-4">北碚污水处理厂</el-menu-item>
                </router-link>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-office-building"></i>
                <span>垃圾焚烧发电厂管理</span>
              </template>
              <el-menu-item-group>
                <router-link class="link" to="/main/dwiFactory/1">
                  <el-menu-item index="4-1">同兴垃圾焚烧发电厂</el-menu-item>
                </router-link>
                <router-link class="link" to="/main/dwiFactory/2">
                  <el-menu-item index="4-2">丰盛垃圾焚烧发电厂</el-menu-item>
                </router-link>
                <router-link class="link" to="/main/dwiFactory/3">
                  <el-menu-item index="4-3">洛碛垃圾焚烧发电厂</el-menu-item>
                </router-link>
                <router-link class="link" to="/main/dwiFactory/4">
                  <el-menu-item index="4-4">江津垃圾焚烧发电厂</el-menu-item>
                </router-link>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-office-building"></i>
                <span>垃圾填埋厂管理</span>
              </template>
              <el-menu-item-group>
                <router-link class="link" to="/main/landfillFactory/1">
                  <el-menu-item index="5-1">长生桥垃圾填埋场</el-menu-item>
                </router-link>
                <router-link class="link" to="/main/landfillFactory/2">
                  <el-menu-item index="5-2">黑石子垃圾填埋场</el-menu-item>
                </router-link>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="6">
              <template slot="title">
                <i class="el-icon-office-building"></i>
                <span>粪便处理厂管理</span>
              </template>
              <el-menu-item-group>
                <router-link class="link" to="/main/wtpFactory/1">
                  <el-menu-item index="6-1">大溪沟粪便处理厂</el-menu-item>
                </router-link>
                <router-link class="link" to="/main/wtpFactory/2">
                  <el-menu-item index="6-2">黄沙溪粪便处理厂</el-menu-item>
                </router-link>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="8">
              <i class="el-icon-s-data"></i>
              <span slot="title">数据分析</span>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
>
<script>
export default {
  data() {
    return {

    };
  },

};
</script>
<style lang="less" scoped>
#quit {
  font-size: 5px;
  position: absolute;
  top: 15px;
  right: 0px;
}
.city_logo_container {
  height: 60px;
}
#main_title {
  font-size: 40px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  position: absolute;
  left: 55px;
}
.city_logo_container img {
  height: 60px;
  width: 55px;
  position: absolute;
  left: 0%;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  height: 650px;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 16px;
}

body > .el-container {
  margin-bottom: 40px;
}
.el-aside {
  background-color: #545c64;
}
.link {
  text-decoration: none;
}
</style>   
