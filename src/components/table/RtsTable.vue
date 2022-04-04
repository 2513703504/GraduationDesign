<template>
  <div>
    <div>
      <el-input v-model="Rts.name" placeholder="请输入名称" size="large"></el-input>
      <el-input v-model="Rts.address" placeholder="请输入地址" size="large"></el-input>
      <el-button
        id="search"
        icon="el-icon-search"
        round
        type="primary"
        size="medium"
        @click="rtsSearch(Rts)"
      >查询</el-button>
      <el-button
        id="search"
        icon="el-icon-circle-plus-outline"
        round
        type="primary"
        size="medium"
        @click="insertRts()"
      >添加</el-button>
      <el-button
        id="search"
        icon="el-icon-search"
        round
        type="primary"
        size="medium"
        @click="backRtsSearch()"
        v-if="!status"
      >返回</el-button>
    </div>

    <el-table :data="rts" border style="width: 100%;">
      <el-table-column prop="id" label="编号" width="100"></el-table-column>
      <el-table-column prop="rtsName" label="名称" width="232"></el-table-column>
      <el-table-column prop="rtsAddress" label="地址" width="422"></el-table-column>
      <el-table-column prop="rtsArea" label="面积(m^2)" width="232"></el-table-column>
      <el-table-column label="操作" width="280">
        <template slot-scope="scope">
          <el-button
            @click="deleteRts(scope.row.id)"
            type="danger"
            icon="el-icon-delete"
            circle
            size="mini"
          ></el-button>
          <el-button
            @click="showRtsDetail(scope.row.id)"
            type="success"
            icon="el-icon-tickets"
            circle
            size="mini"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-pagination
        v-if="status"
        background
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
      rts: [],
      pageInfo: {},
      Rts: {
        name: "",
        address: ""
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
        url: "http://localhost:8088/tanghao/api/listRtsByPage"
      });
      this.rts = res.rts;
      this.pageInfo = res.pageInfo;
      this.status = res.status;
    },
    async jumpPage() {
      console.log(this)
      var currentPage = this.$children[5].$children[1].$props.currentPage;

      const { data: res } = await axios({
        method: "GET",
        params: {
          currPage: currentPage
        },
        url: "http://localhost:8088/tanghao/api/listRtsByPage"
      });
      this.rts = res.rts;
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
        url: "http://localhost:8088/tanghao/api/listRtsByPage"
      });
      this.rts = res.rts;
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
        url: "http://localhost:8088/tanghao/api/listRtsByPage"
      });
      this.rts = res.rts;
      this.pageInfo = res.pageInfo;
      this.status = res.status;
    },
    async rtsSearch(rts) {
      const { data: res } = await axios({
        method: "GET",
        params: {
          rtsName: this.Rts.name,
          rtsAddress: this.Rts.address
        },
        url: "http://localhost:8088/tanghao/api/listRtsByCondition"
      });
      this.rts = res.rts;
      this.status = res.status;
    },
    backRtsSearch() {
      this.getFirstLoad();
    },
    deleteRts(id) {
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
    showRtsDetail(id) {
      this.id = id;
      this.$router.push("/main/rtsDetail/" + id);
    },
    insertRts(){
      this.$router.push('/main/rtsInsert')
    },
    async deleteOne(id) {
      const { data: res } = await axios({
        method: "GET",
        async: false,
        params: {
          id: id
        },
        url: "http://localhost:8088/tanghao/api/deleteOneRts"
      });
      var result = res.result;
      return result;
    },
  },
  created() {
    this.getFirstLoad();
  },
  destroyed() {
    bus.$emit("shareRts", this.id);
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