<template>
  <div>
    <div class="map">
      <el-descriptions title="详细信息" :column="3" border>
        <el-descriptions-item
          label="名称"
          label-class-name="my-label"
          content-class-name="my-content"
        >{{wtp.wtpName}}</el-descriptions-item>
        <el-descriptions-item label="地址">{{wtp.wtpAddress}}</el-descriptions-item>
        <el-descriptions-item label="面积">{{wtp.wtpArea}}</el-descriptions-item>
        <el-descriptions-item label="运输车辆信息" :contentStyle="{'text-align': 'right'}">
          <el-table :data="wtp.cars" border style="width: 100%;">
            <el-table-column prop="id" label="编号" width="300px"></el-table-column>
            <el-table-column prop="scNumber" label="车牌号" width="410px"></el-table-column>
            <el-table-column prop="scType" label="车辆类型" width="410px">吸粪车</el-table-column>
          </el-table>
        </el-descriptions-item>
         <!-- <el-descriptions-item label="地图展示"></el-descriptions-item> -->
      </el-descriptions>
       <Map :location="location" :name="wtp.wtpName" :iconLocation="icon"></Map>
    </div>
    <div></div>
  </div>
</template>
<script>
import Map from "@/components/map/Map.vue";
import axios from "axios";
import { watch } from "fs";
export default {
  data() {
    return {
      wtp: {},
      location: {
        lng: "",
        lat: ""
      },
      icon:'粪便垃圾处理用地'
    };
  },
  props: ["wtpid"],
  components: {
    Map
  },
  methods: {
    async getLocation() {
      const { data: res } = await axios({
        method: "GET",
        params: {
          id: this.wtpid
        },
        url: "http://localhost:8088/tanghao/api/getWtpDetail"
      });
      this.wtp = res;
      this.location.lng = res.lng;
      this.location.lat = res.lat;
      console.log(res);
    }
  },
  created() {
    this.getLocation();
  },
  watch: {
    wtpid(newVal, oldVal) {
      this.getLocation();
    }
  }
};
</script>
<style lang='less'>
.el-table {
  display: inline-block;
}
</style>