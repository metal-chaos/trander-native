<template>
  <div id="map_info">
    <SearchList></SearchList>
    <div class="map_info_desc">
      <template v-if="this.searchingUrl === this.URL_TYPE.CITY">
        <CityItem v-if="cityName"></CityItem>
        <CityIntroduction v-else></CityIntroduction>
      </template>
      <template v-if="this.searchingUrl === this.URL_TYPE.KW">
        <KwItem v-if="kwSuccessful"></KwItem>
        <KwIntroduction v-else></KwIntroduction>
      </template>
      <transition name="fade">
        <SuggestPushing v-show="suggestPushing"></SuggestPushing>
      </transition>
    </div>
    <button
      @click="
        searchingUrl === URL_TYPE.CITY
          ? setNewLocation()
          : searchingUrl === URL_TYPE.KW
          ? setLocationByKw()
          : false
      "
      class="button_map button_map_info"
    >
      <i class="fas fa-plus"></i>
    </button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { URL_TYPE } from "@/const/common.ts";
import SuggestPushing from "@/components/atoms/modal/Pushing.vue";
import CityItem from "../../molecules/mapInfo/city/Item.vue";
import CityIntroduction from "../../molecules/mapInfo/city/Introduction.vue";
import KwIntroduction from "../kw/Introduction.vue";
import KwItem from "../kw/Item.vue";
import SearchList from "../../molecules/tab/SearchList.vue";

export default {
  data() {
    return {
      URL_TYPE,
    };
  },
  components: {
    SuggestPushing,
    CityItem,
    CityIntroduction,
    KwItem,
    KwIntroduction,
    SearchList,
  },
  computed: {
    ...mapState({
      lat: (state) => state.external.lat,
      lng: (state) => state.external.lng,
      currentLat: (state) => state.external.currentLat,
      currentLng: (state) => state.external.currentLng,
      rangeOfDistance: (state) => state.external.rangeOfDistance,
      cityName: (state) => state.external.cityName,
      suggestPushing: (state) => state.external.suggestPushing,
      directionType: (state) => state.external.directionType,
      wikiDataId: (state) => state.external.wikiDataId,
      searchingUrl: (state) => state.external.searchingUrl,
      kwSuccessful: (state) => state.kw.successful,
      keyword: (state) => state.kw.keyword,
      kwLat: (state) => state.kw.lat,
      kwLng: (state) => state.kw.lng,
    }),
  },
  methods: {
    setNewLocation() {
      const data = {
        lat: this.currentLat,
        lng: this.currentLng,
        min: this.rangeOfDistance[0],
        max: this.rangeOfDistance[1],
        directionType: this.directionType,
      };
      const router = this.$router;
      this.showProgressBar(data, router);
    },
    async showProgressBar(data, router) {
      await this.$store.dispatch("external/setNewLocation", { data, router });
      this.setCityDetail();
    },
    setCityDetail() {
      const latLng = {
        params: {
          lat: this.lat,
          lng: this.lng,
        },
      };
      const wiki = {
        params: {
          wikiId: this.wikiDataId,
        },
      };
      this.$store.dispatch("external/getHotel", latLng);
      this.$store.dispatch("external/getFacility", latLng);
      this.$store.dispatch("external/getWeather", latLng);
      this.$store.dispatch("external/getWiki", wiki);
    },
    async setLocationByKw() {
      const data = {
        params: {
          lat: this.currentLat,
          lng: this.currentLng,
          keyword: this.keyword,
          min: this.rangeOfDistance[0],
          max: this.rangeOfDistance[1],
          directionType: this.directionType,
        },
      };
      await this.$store.dispatch("kw/getNearBySearch", data);
      const distanceLatLng = {
        params: {
          lat: this.currentLat,
          lng: this.currentLng,
          cityLat: this.kwLat,
          cityLng: this.kwLng,
        },
      };
      await this.$store.dispatch("kw/getDistance", distanceLatLng);
    },
  },
};
</script>
