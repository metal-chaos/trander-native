<template>
  <dl class="map_info_items">
    <dt class="title">Let's give a shot!</dt>
    <dd class="list">
      <img :src="setCountryImg" class="country_flag">
      <span class="desc">{{region + " " + cityName }}</span>
    </dd>
    <dd class="list info">Distance：{{distance}} km</dd>
    <dd class="list info">Direction：{{direction}}</dd>
    <dd class="list">
      <ul class="flex items">
        <li class="item"><i class="fas fa-walking" :class="[
          walking === RECOMMEND_FREQUENCY.NONE ? 'none'
          : walking === RECOMMEND_FREQUENCY.MIDDLE ? 'middle'
          : 'high'
        ]"></i></li>
        <li class="item"><i class="fas fa-biking" :class="[
          bycicle === RECOMMEND_FREQUENCY.NONE ? 'none'
          : bycicle === RECOMMEND_FREQUENCY.MIDDLE ? 'middle'
          : 'high'
        ]"></i></li>
        <li class="item"><i class="fas fa-car" :class="[
          car === RECOMMEND_FREQUENCY.NONE ? 'none'
          : car === RECOMMEND_FREQUENCY.MIDDLE ? 'middle'
          : 'high'
        ]"></i></li>
      </ul>
    </dd>
    <!-- TODO: -->
    <!-- <RouterLink v-if="showAngleBtn" class="negate_btn show_detail" :to="{name: 'cityDetail', params: {cityId: cityId}}">
      <button class="item_btn"><i class="fas fa-angle-up"></i></button>
    </RouterLink>
    <RouterLink v-else class="negate_btn show_detail" :to="{name: 'index'}">
      <button class="item_btn"><i class="fas fa-angle-right"></i></button>
    </RouterLink> -->
  </dl>
</template>

<script>
import { mapState } from 'vuex'
import CONST_EXTERNAL from '@/const/external.ts'

export default {
  created() {
    this.RECOMMEND_FREQUENCY = CONST_EXTERNAL.RECOMMEND_FREQUENCY
  },
  computed: {
    ...mapState({
      countryCode: state => state.external.countryCode,
      cityName: state => state.external.cityName,
      region: state => state.external.region,
      distance: state => state.external.distance,
      direction: state => state.external.direction,
      walking: state => state.external.walking,
      bycicle: state => state.external.bycicle,
      car: state => state.external.car,
      cityId: state => state.external.cityId,
    }),
    setCountryImg() {
      if (this.countryCode != null) {
        return 'https://www.countryflags.io/' + this.countryCode + '/flat/32.png';
      }
      return '';
    },
    showAngleBtn() {
      return !Object.keys(this.$route.params).length
    },
  }
}
</script>