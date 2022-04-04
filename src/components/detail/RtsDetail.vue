<template>
  <div class>
    <el-descriptions title="垃圾转运站详细信息" :column="1" border >
      <el-descriptions-item
        label="  名称  "
        label-class-name="my-label"
        content-class-name="my-content"
      >{{rts.rtsName}}</el-descriptions-item>
      <el-descriptions-item label="  地址  ">{{rts.rtsAddress}}</el-descriptions-item>
      <el-descriptions-item label="  面积  ">{{rts.rtsArea}}</el-descriptions-item>
      <el-descriptions-item label="  环卫工人  ">
        <el-table :data="rts.workers" border style="width: 100%;">
          <el-table-column prop="id" label="编号" width="100px"></el-table-column>
          <el-table-column prop="workerName" label="姓名" width="150px"></el-table-column>
          <el-table-column prop="idNumber" label="工号" width="180px"></el-table-column>
          <el-table-column prop="age" label="年龄" width="176px"></el-table-column>
          <el-table-column prop="address" label="地址" width="280px"></el-table-column>
          <el-table-column prop="company.companyName" label="公司" width="280px"></el-table-column>
        </el-table>
      </el-descriptions-item>
       <el-descriptions-item label="  环卫车辆  ">
        <el-table :data="rts.sanitationCars" border style="width: 100%;">
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
      @click="backRtsDetail()"
    >返回</el-button>
  </div>
</template>
<script>
import axios from "axios";
import bus from "@/eventBus.js";
export default {
  data() {
    return {
      rts: {},
      rtsid: 0
    };
  },
  methods: {
    async getRtsDetail() {
      var rtsid = this.rtsid;
      const { data: res } = await axios({
        method: "GET",
        params: {
          id: rtsid
        },
        url: "http://localhost:8088/tanghao/api/getRtsDetail"
      });
      this.rts = res;
    },
    backRtsDetail() {
      this.$router.push("/main/rts");
    }
  },
  created() {
    bus.$on("shareRts", val => {
      this.rtsid = val;
    });
  },
  watch: {
    rtsid(newVal, oldVal) {
      this.getRtsDetail();
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