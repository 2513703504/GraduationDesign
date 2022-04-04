<template>
  <div class>
    <el-descriptions title="街道详细信息" :column="3" border >
      <el-descriptions-item
        label="  名称  "
        label-class-name="my-label"
        content-class-name="my-content"
      >{{street.streetName}}</el-descriptions-item>
      <el-descriptions-item label="  地址  ">{{street.streetAddress}}</el-descriptions-item>
      <el-descriptions-item label="  垃圾箱  ">{{count}}</el-descriptions-item>
       <el-descriptions-item label="  环卫车辆  ">
        <el-table :data="street.cars" border style="width: 100%;">
          <el-table-column prop="id" label="编号" width="300px"></el-table-column>
          <el-table-column prop="scNumber" label="车牌" width="430px"></el-table-column>
          <el-table-column prop="scType" label="类型" width="436px"></el-table-column>
        </el-table>
      </el-descriptions-item>
    </el-descriptions>
    <el-button
      id="search"
      icon="el-icon-back"
      round
      type="primary"
      size="medium"
      @click="backStreetDetail()"
    >返回</el-button>
  </div>
</template>
<script>
import axios from "axios";
import bus from "@/eventBus.js";
import { readdir } from 'fs';
export default {
  data() {
    return {
      street: {},
      streetid: 0,
      count:0
    };
  },
  methods: {
    async getStreetDetail() {
      var streetid = this.streetid;
      const { data: res } = await axios({
        method: "GET",
        params: {
          id: streetid
        },
        url: "http://localhost:8088/tanghao/api/getStreetDetail"
      });
      this.street = res;
      this.count=res.bins.length
    },
    backStreetDetail() {
      this.$router.push('/main/street');
    }
  },
  created() {
    bus.$on("shareStreet", val => {
      this.streetid = val;
    });
  },
  watch: {
    streetid(newVal, oldVal) {
      this.getStreetDetail();
    }
  }
};
</script>
<style lang='less' scoped>
#search {
  float: left;
  margin: 58px 30px 0 0;
}
</style>