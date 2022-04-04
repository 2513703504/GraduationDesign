<template>
  <div>
    <div>
      <el-input v-model="publicLavatory.plAddress" placeholder="请输入地址" size="large"></el-input>
      <el-button
        id="search"
        icon="el-icon-search"
        round
        type="primary"
        size="medium"
        @click="publicLavatorySearch(publicLavatory)"
      >查询</el-button>
      <el-button
        id="search"
        icon="el-icon-circle-plus-outline"
        round
        type="primary"
        size="medium"
        @click="InsertPublicLavatory()"
      >添加</el-button>
      <el-button
        id="search"
        icon="el-icon-back"
        round
        type="primary"
        size="medium"
        @click="backPublicLavatorySearch()"
        v-if="!status"
      >返回</el-button>
    </div>
    <div>
      <el-table :data="publicLavatories" border style="width: 100%;">
        <el-table-column prop="id" label="编号" width="100"></el-table-column>
        <el-table-column prop="plName" label="名称" width="232"></el-table-column>
        <el-table-column prop="plAddress" label="地址" width="452"></el-table-column>
        <el-table-column prop="plArea" label="面积" width="200"></el-table-column>
        <el-table-column label="操作" width="280">
          <template slot-scope="scope">
            <el-button
              @click="deletePublicLavatory(scope.row.id)"
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
            ></el-button>
            <el-button
              @click="showPublicLavatoryDetail(scope.row.id)"
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
import bus from "@/eventBus.js";
export default {
  data() {
    return {
      publicLavatories: [],
      pageInfo: {},
      publicLavatory: {
        plAddress: ""
      },
      status: true,
      id: 0
    };
  },
  methods: {
    async getFirstLoad() {
      const { data: res } = await axios({
        method: "GET",
        params: {
          currPage: 1
        },
        url: "http://localhost:8088/tanghao/api/listPlByPage"
      });
      this.publicLavatories = res.publicLavatories;
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
        url: "http://localhost:8088/tanghao/api/listPlByPage"
      });
      this.publicLavatories = res.publicLavatories;
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
        url: "http://localhost:8088/tanghao/api/listPlByPage"
      });
      this.publicLavatories = res.publicLavatories;
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
        url: "http://localhost:8088/tanghao/api/listPlByPage"
      });
      this.publicLavatories = res.publicLavatories;
      this.pageInfo = res.pageInfo;
      this.status = res.status;
    },
    deletePublicLavatory(id) {
      console.log(id);
      this.$confirm("确定要删除这条信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          console.log(id);
          this.deleteOne(id).then(res => {
            var result = res;
            if (result) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.jumpPage();
            } else {
              this.$message({
                type: "info",
                message: "删除失败!"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    showPublicLavatoryDetail(id) {
      this.id = id;
      this.$router.push("/main/plDetail/" + id);
    },
    async publicLavatorySearch(publicLavatory) {
      const { data: res } = await axios({
        method: "GET",
        params: {
          plAddress: this.publicLavatory.plAddress
        },
        url: "http://localhost:8088/tanghao/api/listPlByCondition"
      });
      this.publicLavatories = res.publicLavatories;
      this.status = res.status;
    },
    backPublicLavatorySearch() {
      this.getFirstLoad();
    },
    async deleteOne(id) {
      const { data: res } = await axios({
        method: "GET",
        async: false,
        params: {
          id: id
        },
        url: "http://localhost:8088/tanghao/api/deleteOnePl"
      });
      var result = res.result;
      return result;
    },
    InsertPublicLavatory(){
      this.$router.push('/main/plInsert')
    }
  },
  created() {
    this.getFirstLoad();
  },
  destroyed() {
    bus.$emit("share", this.id);
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