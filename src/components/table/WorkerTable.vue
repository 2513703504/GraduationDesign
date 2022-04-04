<template>
  <div>
    <div>
      <el-input v-model="worker.workerName" placeholder="请输入名称" size="large"></el-input>
      <el-input v-model="worker.idNumber" placeholder="请输入工号" size="large"></el-input>
      <el-input v-model="worker.address" placeholder="请输入地址" size="large"></el-input>
      <el-button
        id="search"
        icon="el-icon-search"
        round
        type="primary"
        size="medium"
        @click="workerSearch(worker)"
      >查询</el-button>
      <el-button
        id="search"
        icon="el-icon-back"
        round
        type="primary"
        size="medium"
        @click="backWorkerSearch()"
        v-if="!status"
      >返回</el-button>
    </div>
    <div>
      <el-table :data="workers" border style="width: 100%;">
        <el-table-column prop="id" label="编号" width="100"></el-table-column>
        <el-table-column prop="workerName" label="姓名" width="150"></el-table-column>
        <el-table-column prop="idNumber" label="工号" width="180"></el-table-column>
        <el-table-column prop="age" label="年龄" width="142"></el-table-column>
        <el-table-column prop="address" label="地址" width="332"></el-table-column>
         <el-table-column prop="company.companyName" label="公司" width="360"></el-table-column>
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
      workers: [],
      pageInfo: {},
      worker: {
        workerName:"",
        idNumber: "",
        address:""
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
        url: "http://localhost:8088/tanghao/api/listWorkerByPage"
      });
      this.workers = res.workers;
      this.pageInfo = res.pageInfo;
      this.status = res.status;
    },
    async jumpPage() {
      console.log(this.$children[5].$children[1]._props.currentPage);
      var currentPage = this.$children[5].$children[1]._props.currentPage;
      const { data: res } = await axios({
        method: "GET",
        params: {
          currPage: currentPage
        },
        url: "http://localhost:8088/tanghao/api/listWorkerByPage"
      });
      this.workers = res.workers;
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
        url: "http://localhost:8088/tanghao/api/listWorkerByPage"
      });
      this.workers = res.workers;
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
        url: "http://localhost:8088/tanghao/api/listWorkerByPage"
      });
      this.workers = res.workers;
      this.pageInfo = res.pageInfo;
      this.status = res.status;
    },
    deleteWorker(id) {
      console.log(id);
    },
    updateWorker() {},
    async workerSearch(worker) {
      const { data: res } = await axios({
        method: "GET",
        params: {
          workerName:this.worker.workerName,
          idNumber: this.worker.idNumber,
          address:this.worker.address
        },
        url: "http://localhost:8088/tanghao/api/listWorkerByCondition"
      });
      this.workers = res.workers;
      this.status = res.status;
    },
    backWorkerSearch() {
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