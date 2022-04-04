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
        :icon="{url:require('/src/assets/image/icon/公共厕所.png'), size: {width: 50, height: 50}}"
        style="background-size:100% 100%;"
        v-for="item in Pls"
        :key="item.id"
        @click="showDetail(item)"
      ></bm-marker>
      <bm-info-window :show="infoWindow" :position="position">
        <p v-text="pl.plName"></p>
        <p v-text="pl.plAddress"></p>
 
        <p v-text="pl.lng"></p>
        <p v-text="pl.lat"></p>
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
      Pls: [],
      infoWindow: false,
      position: {
        lng: "",
        lat: ""
      },
      pl: {}
    };
  },
  methods: {
    handler({ Bmap, map }) {
      map.enableScrollWheelZoom(true);
      map.setCurrentCity("重庆");
      map.addEventListener("click", function(e) {
        console.log(e.point.lng, e.point.lat);
      });
    },
    async getLoacation() {
      const { data: res } = await axios({
        method: "GET",
        url: "http://localhost:8088/tanghao/api/listPl"
      });
      console.log(res);
      this.Pls = res;
    },
    showDetail(pl){
      this.position.lng=pl.lng;
      this.position.lat=pl.lat;
      this.pl=pl;
      this.infoWindow=true
    }
  },
  created() {
    this.getLoacation();
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