<template>
  <div>
    <baidu-map class="map" :center="map.center" :zoom="map.zoom" @ready="handler">

      <bm-view style="width:100%;height:400px;flex:1;"></bm-view>
      <!--缩放-->
      <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"></bm-navigation>
      <!--定位-->
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
      <!--点-->
      <bm-marker :position="map.center" :dragging="map.dragging" animation="BMAP_ANIMATION_DROP">
      </bm-marker>
      <bm-marker :position="location" :dragging="true" animation="BMAP_ANIMATION_DROP"  :icon="{url:require('/src/assets/image/icon/'+iconLocation+'.png'), size: {width: 50, height: 50}}" style="background-size:100% 100%; ">
           <bm-info-window :show="true">{{ name }}</bm-info-window>
      </bm-marker>
    </baidu-map>
  </div>
</template>
<script>

export default {
  name: "demo",
  data() {
    return {
      map: {
        center: { lng: '106.583541', lat: '29.563475' },
        zoom: 10,
        show: true,
        dragging: true
      },
    };
  },
  props:['location','name','iconLocation'],
  methods: {
    handler({ Bmap, map }) {
      map.enableScrollWheelZoom(true);
      map.setCurrentCity("重庆");
      map.addEventListener("click", function(e) {
        console.log(e.point.lng, e.point.lat);
      });
    },
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