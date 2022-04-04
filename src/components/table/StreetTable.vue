<template>
  <div>
    <div>
      <el-input v-model="street.streetName" placeholder="请输入名称" size="large"></el-input>
      <el-input v-model="street.streetAddress" placeholder="请输入地址" size="large"></el-input>
      <el-button
        id="search"
        icon="el-icon-search"
        round
        type="primary"
        size="medium"
        @click="streetSearch(street)"
      >查询</el-button>
      <el-button
        id="search"
        icon="el-icon-back"
        round
        type="primary"
        size="medium"
        @click="backStreetSearch()"
        v-if="!status"
      >返回</el-button>
    </div>
    <div>
      <el-table :data="streets" border style="width: 100%;">
        <el-table-column prop="id" label="编号" width="100"></el-table-column>
        <el-table-column prop="streetName" label="名称" width="432"></el-table-column>
        <el-table-column prop="streetAddress" label="地址" width="452"></el-table-column>
        <el-table-column label="操作" width="280">
          <template slot-scope="scope">
          <el-button
            @click="showStreetDetail(scope.row.id)"
            type="success"
            icon="el-icon-tickets"
            circle
            size="mini"
          ></el-button>
          </template>
        </el-table-column>
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
import bus from '@/eventBus.js'
export default {
  data() {
    return {
      streets: [],
      pageInfo: {},
      street: {
        streetName:"",
        streetAddress: ""
      },
      status: true,
      id:0
    };
  },
  methods: {
    async getFirstLoad() {
      const { data: res } = await axios({
        method: "GET",
        params: {
          currPage: 1
        },
        url: "http://localhost:8088/tanghao/api/listStreetByPage"
      });
      this.streets = res.streets;
      this.pageInfo = res.pageInfo;
      this.status = res.status;
    },
    async jumpPage() {
      console.log(this.$children[4].$children[1]._props.currentPage);
      var currentPage = this.$children[4].$children[1]._props.currentPage;
      const { data: res } = await axios({
        method: "GET",
        params: {
          currPage: currentPage
        },
        url: "http://localhost:8088/tanghao/api/listStreetByPage"
      });
      this.streets = res.streets;
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
        url: "http://localhost:8088/tanghao/api/listStreetByPage"
      });
      this.streets = res.streets;
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
        url: "http://localhost:8088/tanghao/api/listStreetByPage"
      });
      this.streets = res.streets;
      this.pageInfo = res.pageInfo;
      this.status = res.status;
    },
    async streetSearch(street) {
      const { data: res } = await axios({
        method: "GET",
        params: {
          streetName:this.street.streetName,
          streetAddress: this.street.streetAddress
        },
        url: "http://localhost:8088/tanghao/api/listStreetByCondition"
      });
      this.streets = res.streets;
      this.status = res.status;
    },
    backStreetSearch() {
      this.getFirstLoad();
    },
    showStreetDetail(id){
        this.id=id
        this.$router.push('/main/streetDetail')
    }
  },
  created() {
    this.getFirstLoad();
  },
  destroyed(){
      bus.$emit("shareStreet",this.id)
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