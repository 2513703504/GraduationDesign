<template>
  <div>
    <el-tag type="info">修改环卫公司信息</el-tag>
    <el-form ref="form" :model="form" label-width="80px" :label-position="labelPosition">
      <el-form-item label="公司名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="详细地址">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="经度">
        <el-input v-model="form.lng"></el-input>
      </el-form-item>
      <el-form-item label="纬度">
        <el-input v-model="form.lat"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认修改</el-button>
        <el-button @click="back()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import bus from "@/eventBus.js";
import axios from "axios";
export default {
  data() {
    return {
      form: {
        id:0,
        name: '',
        address: '',
        lng: '',
        lat: ''
      },
      labelPosition: "left",
      company: {}
    };
  },
  methods: {
    async postAxios() {
      const { data: res } = await axios({
        method: "POST",
        data: {
          id:this.form.id,
          companyName: this.form.name,
          companyAddress: this.form.address,
          lng: this.form.lng,
          lat: this.form.lat
        },
        url: "http://localhost:8088/tanghao/api/updateCompany"
      });
      return res;
    },
    back() {
      this.$router.push("/main/company");
    },
    onSubmit() {
      this.postAxios().then(res => {
        if (res) {
          this.$message({
            type: "success",
            message: "修改成功!"
          });
        } else {
          this.$message({
            type: "info",
            message: "修改失败!"
          });
        }
      });
    }
  },
  created() {
    bus.$on("shareCompany", val => {
      this.company = val;
    });
  },
  watch: {
    company(newVal, oldVal) {
      this.form.id=newVal.id
      this.form.name = newVal.companyName;
      this.form.address = newVal.companyAddress;
      this.form.lng = newVal.lng;
      this.form.lat = newVal.lat;
    }
  }
};
</script>
<style lang='less' scoped>
.el-form {
  padding: 50px;
  width: 40%;
  position: absolute;
  left: 35%;
  border: 3px solid gray;
  border-radius: 2%;
  box-shadow: 0 0 2px 2px #fff;
}
</style>