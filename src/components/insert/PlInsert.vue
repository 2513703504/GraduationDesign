<template>
  <div class="form-box">
    <el-tag type="info">添加公厕信息</el-tag>
    <el-form ref="form" :model="form" label-width="80px" :label-position="labelPosition">
      <el-form-item label="类型">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="城区">
        <el-select v-model="form.region" placeholder="请选择区域">
          <el-option label="南岸区" value="南岸区"></el-option>
          <el-option label="巴南区" value="巴南区"></el-option>
          <el-option label="渝中区" value="渝中区"></el-option>
          <el-option label="渝北区" value="渝北区"></el-option>
          <el-option label="江北区" value="江北区"></el-option>
          <el-option label="大渡口区" value="大渡口区"></el-option>
          <el-option label="沙坪坝区" value="沙坪坝区"></el-option>
          <el-option label="两江新区" value="两江新区"></el-option>
          <el-option label="高新区" value="高新区"></el-option>
          <el-option label="北碚区" value="北碚区"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="详细地址">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="面积">
        <el-input v-model="form.area"></el-input>
      </el-form-item>
      <el-form-item label="经度">
        <el-input v-model="form.lng"></el-input>
      </el-form-item>
      <el-form-item label="纬度">
        <el-input v-model="form.lat"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即添加</el-button>
        <el-button @click="back()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        name: "公厕",
        region: "",
        address: "",
        area: "",
        lng: "",
        lat: ""
      },
      labelPosition: "left"
    };
  },
  methods: {
    async postAxios() {
      const { data: res } = await axios({
        method: "POST",
        data: {
          plName: this.form.name,
          plAddress: this.form.region + this.form.address,
          plArea: this.form.area,
          lng: this.form.lng,
          lat: this.form.lat
        },
        url: "http://localhost:8088/tanghao/api/insertPl"
      });
      return res;
    },
    onSubmit() {
      this.postAxios().then(res => {
        if (res) {
          this.$message({
            type: "success",
            message: "添加成功!"
          });
        } else {
          this.$message({
            type: "info",
            message: "添加失败!"
          });
        }
      });
    },
    back(){
      this.$router.push('/main/pl')
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