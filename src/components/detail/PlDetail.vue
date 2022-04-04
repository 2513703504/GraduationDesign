<template>
  <div class>
    <el-descriptions title="公厕详细信息" :column="3" border >
      <el-descriptions-item
        label="  公厕  "
        label-class-name="my-label"
        content-class-name="my-content"
      >{{pl.plName}}</el-descriptions-item>
      <el-descriptions-item label="  地址  ">{{pl.plAddress}}</el-descriptions-item>
      <el-descriptions-item label="  面积  ">{{pl.plArea}}</el-descriptions-item>
      <el-descriptions-item label="  环卫工人  ">
        <el-table :data="pl.workers" border style="width: 100%;">
          <el-table-column prop="id" label="编号" width="100px"></el-table-column>
          <el-table-column prop="workerName" label="姓名" width="150px"></el-table-column>
          <el-table-column prop="idNumber" label="工号" width="180px"></el-table-column>
          <el-table-column prop="age" label="年龄" width="176px"></el-table-column>
          <el-table-column prop="address" label="地址" width="280px"></el-table-column>
          <el-table-column prop="company.companyName" label="公司" width="280px"></el-table-column>
        </el-table>
      </el-descriptions-item>
    </el-descriptions>
    <el-button
      id="search"
      icon="el-icon-back"
      round
      type="primary"
      size="medium"
      @click="backPlDetail()"
    >返回</el-button>
  </div>
</template>
<script>
import axios from "axios";
import bus from "@/eventBus.js";
export default {
  data() {
    return {
      pl: {},
      plid: 0
    };
  },
  methods: {
    async getPlDetail() {
      var plid = this.plid;
      const { data: res } = await axios({
        method: "GET",
        params: {
          id: plid
        },
        url: "http://localhost:8088/tanghao/api/getPlDetail"
      });
      this.pl = res;
    },
    backPlDetail() {
      this.$router.push("/main/pl");
    }
  },
  created() {
    bus.$on("share", val => {
      this.plid = val;
    });
  },
  watch: {
    plid(newVal, oldVal) {
      this.getPlDetail();
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