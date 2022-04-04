<template>
  <div>
    <div>
      <el-input v-model="car.scType" placeholder="请输入车辆类型" size="large"></el-input>
      <el-button
        id="search"
        icon="el-icon-search"
        round
        type="primary"
        size="medium"
        @click="carSearch(car)"
      >查询</el-button>
      <el-button
        id="search"
        icon="el-icon-back"
        round
        type="primary"
        size="medium"
        @click="backCarSearch()"
        v-if="!status"
      >返回</el-button>
    </div>
    <div>
      <el-table :data="cars" border style="width: 100%;">
        <el-table-column prop="id" label="编号" width="100"></el-table-column>
        <el-table-column prop="scNumber" label="车牌号" width="432"></el-table-column>
        <el-table-column prop="scType" label="车辆类型" width="452"></el-table-column>
         <el-table-column prop="company.companyName" label="隶属公司" width="452"></el-table-column>
      </el-table>
    </div>
    <div>
      <el-pagination
        background
        v-if="status"
        layout="prev, pager, next"
        :page-count="pageInfo.pages"
        :current-page="pageInfo.pageNum"
        @current-change="jumpPage()"
        @next-click="nextPage()"
        @prev-click="prePage()"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { async } from "q";
export default {
  data() {
    return {
      cars: [],
      pageInfo: {},
      car: {
        scType:""
      },
      status: true
    };
  },
  methods: {
    async getFirstLoad() {
      const { data: res } = await axios({
        method: "GET",
        params: {
          currPage: 1
        },
        url: "http://localhost:8088/tanghao/api/listCarByPage"
      });
      this.cars = res.cars;
      this.pageInfo = res.pageInfo;
      this.status = res.status;
    },
    async jumpPage() {
      console.log(this.$children[3].$children[1]._props.currentPage);
      var currentPage = this.$children[3].$children[1]._props.currentPage;
      const { data: res } = await axios({
        method: "GET",
        params: {
          currPage: currentPage
        },
        url: "http://localhost:8088/tanghao/api/listCarByPage"
      });
      this.cars = res.cars;
      this.pageInfo = res.pageInfo;
      this.status = res.status;
    },
    async nextPage() {
      var currPage = this.pageInfo.pageNum;
      const { data: res } = await axios({
        method: "GET",
        params: {
          currPage: currPage + 1
        },
        url: "http://localhost:8088/tanghao/api/listCarByPage"
      });
      this.cars = res.cars;
      this.pageInfo = res.pageInfo;
      this.status = res.status;
    },
    async prePage() {
      var currPage = this.pageInfo.pageNum;
      const { data: res } = await axios({
        method: "GET",
        params: {
          currPage: currPage - 1
        },
        url: "http://localhost:8088/tanghao/api/listCarByPage"
      });
      this.cars = res.cars;
      this.pageInfo = res.pageInfo;
      this.status = res.status;
    },
    async carSearch(park) {
      const { data: res } = await axios({
        method: "GET",
        params: {
          scType:this.car.scType
        },
        url: "http://localhost:8088/tanghao/api/listCarByCondition"
      });
      this.cars = res.cars;
      this.status = res.status;
    },
    backCarSearch() {
      this.getFirstLoad();
    }
  },
  created() {
    this.getFirstLoad();
  }
};
</script>
<style lang='less' scoped>
.el-button {
  display: block;
  position: relative;
  float: right;
  top: 0px;
  margin: 0px 5px 0px 5px;
}
.el-input {
  width: 20%;
  padding: 10px;
  float: left;
}
#search {
  float: left;
  margin: 13px 10px 0 10px;
}
</style>