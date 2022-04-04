<template>
  <div>
    <div class="map">
      <el-descriptions title="详细信息" :column="3" border>
        <el-descriptions-item
          label="名称"
          label-class-name="my-label"
          content-class-name="my-content"
        >{{stp.stpName}}</el-descriptions-item>
        <el-descriptions-item label="地址">{{stp.stpAddress}}</el-descriptions-item>
        <el-descriptions-item label="面积">{{stp.stpArea}}</el-descriptions-item>
        <el-descriptions-item label="运输车辆信息" :contentStyle="{'text-align': 'right'}">
          <el-table :data="stp.cars" border style="width: 100%;">
            <el-table-column prop="id" label="编号" width="300px"></el-table-column>
            <el-table-column prop="scNumber" label="车牌号" width="410px"></el-table-column>
            <el-table-column prop="scType" label="车辆类型" width="410px">吸污车</el-table-column>
          </el-table>
        </el-descriptions-item>
         <!-- <el-descriptions-item label="地图展示"></el-descriptions-item> -->
        
      </el-descriptions>
       <Map :location="location" :name="stp.stpName" :iconLocation="icon"></Map>
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
      stp: {},
      location: {
        lng: "",
        lat: ""
      },
      icon:'污水处理厂'
    };
  },
  props: ["stpid"],
  components: {
    Map
  },
  methods: {
    async getLocation() {
      const { data: res } = await axios({
        method: "GET",
        params: {
          id: this.stpid
        },
        url: "http://localhost:8088/tanghao/api/getStpDetail"
      });
      this.stp = res;
      this.location.lng = res.lng;
      this.location.lat = res.lat;
      console.log(res);
    }
  },
  created() {
    this.getLocation();
  },
  watch: {
    stpid(newVal, oldVal) {
      console.log(this.stpid);
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