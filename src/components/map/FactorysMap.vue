<template>
  <div>
    <baidu-map class="map" :center="map.center" :zoom="map.zoom" @ready="handler">
      <!--缩放-->
      <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"></bm-navigation>
      <!--定位-->
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
      <!--点-->
      <bm-marker :position="map.center" :dragging="map.dragging" animation="BMAP_ANIMATION_DROP"></bm-marker>
      <bm-marker
        :position="{lng:item.lng,lat:item.lat}"
        :dragging="true"
        animation="BMAP_ANIMATION_DROP"
        :icon="{url:require('/src/assets/image/icon/垃圾填埋场svg.png'), size: {width: 50, height: 50}}"
        style="background-size:100% 100%;"
        v-for="item in landfills"
        :key="item.id"
        @click="showLandfill(item)"
      ></bm-marker>
      <bm-marker
        :position="{lng:item.lng,lat:item.lat}"
        :dragging="true"
        animation="BMAP_ANIMATION_DROP"
        :icon="{url:require('/src/assets/image/icon/plant.png'), size: {width: 50, height: 50}}"
        style="background-size:100% 100%;"
        v-for="item in dwis"
        :key="item.id+'dwi'"
        @click="showDwi(item)"
      ></bm-marker>
      <bm-marker
        :position="{lng:item.lng,lat:item.lat}"
        :dragging="true"
        animation="BMAP_ANIMATION_DROP"
        :icon="{url:require('/src/assets/image/icon/粪便垃圾处理用地.png'), size: {width: 50, height: 50}}"
        style="background-size:100% 100%;"
        v-for="item in wtps"
        :key="item.id+'wtp'"
        @click="showWtp(item)"
      ></bm-marker>
      <bm-marker
        :position="{lng:item.lng,lat:item.lat}"
        :dragging="true"
        animation="BMAP_ANIMATION_DROP"
        :icon="{url:require('/src/assets/image/icon/washCarPlant.png'), size: {width: 50, height: 50}}"
        style="background-size:100% 100%;"
        v-for="item in vcss"
        :key="item.id+'vcs'"
        @click="showVcs(item)"
      ></bm-marker>
      <bm-marker
        :position="{lng:item.lng,lat:item.lat}"
        :dragging="true"
        animation="BMAP_ANIMATION_DROP"
        :icon="{url:require('/src/assets/image/icon/污水处理厂.png'), size: {width: 50, height: 50}}"
        style="background-size:100% 100%;"
        v-for="item in stps"
        :key="item.id+'stp'"
        @click="showStp(item)"
      ></bm-marker>

      <bm-info-window :show="infoWindow" :position="position" @close="infoWindow=false" @clickclose="infoWindow=false">
        <p v-text="dwi.dwiName"></p>
        <p v-text="dwi.dwiAddress"></p>
        <p v-text="dwi.lng"></p>
        <p v-text="dwi.lat"></p>
      </bm-info-window>
      <bm-info-window :show="infoWindow1" :position="position" @close="infoWindow1=false" @clickclose="infoWindow1=false">
        <p v-text="stp.stpName"></p>
        <p v-text="stp.stpAddress"></p>
        <p v-text="stp.lng"></p>
        <p v-text="stp.lat"></p>
      </bm-info-window>
      <bm-info-window :show="infoWindow2" :position="position" @close="infoWindow2=false" @clickclose="infoWindow2=false">
        <p v-text="vcs.vcsName"></p>
        <p v-text="vcs.vcsAddress"></p>
        <p v-text="vcs.lng"></p>
        <p v-text="vcs.lat"></p>
      </bm-info-window>
      <bm-info-window :show="infoWindow3" :position="position" @close="infoWindow3=false" @clickclose="infoWindow3=false">
        <p v-text="wtp.wtpName"></p>
        <p v-text="wtp.wtpAddress"></p>
        <p v-text="wtp.lng"></p>
        <p v-text="wtp.lat"></p>
      </bm-info-window>
      <bm-info-window :show="infoWindow4" :position="position" @close="infoWindow4=false" @clickclose="infoWindow4=false">
        <p v-text="landfill.landfillName"></p>
        <p v-text="landfill.landfillAddress"></p>
        <p v-text="landfill.lng"></p>
        <p v-text="landfill.lat"></p>
      </bm-info-window>
    </baidu-map>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      map: {
        center: { lng: 106.583541, lat: 29.563475 },
        zoom: 11,
        show: true,
        dragging: true
      },
      landfills: [],
      dwis: [],
      stps: [],
      vcss: [],
      wtps: [],
      infoWindow: false,
      infoWindow1: false,
      infoWindow2: false,
      infoWindow3: false,
      infoWindow4: false,
      position: {
        lng: "",
        lat: ""
      },
      dwi: {},
      stp: {},
      vcs: {},
      wtp: {},
      landfill: {}
    };
  },
  methods: {
    handler({ Bmap, map }) {
      map.enableScrollWheelZoom(true);
      map.setCurrentCity("重庆");
      // map.addEventListener("click", function(e) {
      //   console.log(e.point.lng, e.point.lat);
      // });
    },
    async getLandfillLocation() {
      const { data: res } = await axios({
        method: "GET",
        url: "http://localhost:8088/tanghao/api/listLandfills"
      });
      console.log(res);
      this.landfills = res;
    },
    async getDwiLocation() {
      const { data: res } = await axios({
        method: "GET",
        url: "http://localhost:8088/tanghao/api/listDwi"
      });
      console.log(res);
      this.dwis = res;
    },
    async getStpLocation() {
      const { data: res } = await axios({
        method: "GET",
        url: "http://localhost:8088/tanghao/api/listStp"
      });
      console.log(res);
      this.stps = res;
    },
    async getVcsLocation() {
      const { data: res } = await axios({
        method: "GET",
        url: "http://localhost:8088/tanghao/api/listVcs"
      });
      console.log(res);
      this.vcss = res;
    },
    async getWtpLocation() {
      const { data: res } = await axios({
        method: "GET",
        url: "http://localhost:8088/tanghao/api/listWtp"
      });
      console.log(res);
      this.wtps = res;
    },
    showLandfill(landfill) {
      this.position.lng = landfill.lng;
      this.position.lat = landfill.lat;
      this.landfill = landfill;
      this.infoWindow4 = true;
    },
    showDwi(dwi) {
      this.position.lng = dwi.lng;
      this.position.lat = dwi.lat;
      this.dwi = dwi;
      this.infoWindow = true;
    },
    showWtp(wtp) {
      this.position.lng = wtp.lng;
      this.position.lat = wtp.lat;
      this.wtp = wtp;
      this.infoWindow3 = true;
    },
    showVcs(vcs) {
      this.position.lng = vcs.lng;
      this.position.lat = vcs.lat;
      this.vcs = vcs;
      this.infoWindow2 = true;
    },
    showStp(stp) {
      this.position.lng = stp.lng;
      this.position.lat = stp.lat;
      this.stp = stp;
      this.infoWindow1 = true;
    }
  },
  created() {
    this.getLandfillLocation();
    this.getDwiLocation();
    this.getStpLocation();
    this.getVcsLocation();
    this.getWtpLocation();
  }
};
</script>
<style lang='less'>
.map {
  width: 100%;
  height: 600px;
}
.BMap_cpyCtrl {
  display: none;
}
</style>