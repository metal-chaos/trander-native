<template>
  <dl class="map_info_items p-map_kw_info_items">
    <dt class="title">Let's give a shot!</dt>
    <dd class="list info mg_5_t mg_5_b">
      <IconText
        :text="name"
        :image="icon"
        className="c-wrap_icon_text_general"
      ></IconText>
    </dd>
    <dd class="list info mg_10_l">
      <Rating
        :rating="rating"
        :ratingsTotal="userRatingsTotal"
        :ratingImg="ratingPath"
        color="green"
      ></Rating>
    </dd>
    <dd class="list info">Distance：{{ distance }} km</dd>
    <dd class="list info">Direction：{{ direction }}</dd>
    <dd class="list">
      <ul class="flex items">
        <li class="item">
          <i
            class="fas fa-walking"
            :class="[
              walking === RECOMMEND_FREQUENCY.NONE
                ? 'none'
                : walking === RECOMMEND_FREQUENCY.MIDDLE
                ? 'middle'
                : 'high',
            ]"
          ></i>
        </li>
        <li class="item">
          <i
            class="fas fa-biking"
            :class="[
              bycicle === RECOMMEND_FREQUENCY.NONE
                ? 'none'
                : bycicle === RECOMMEND_FREQUENCY.MIDDLE
                ? 'middle'
                : 'high',
            ]"
          ></i>
        </li>
        <li class="item">
          <i
            class="fas fa-car"
            :class="[
              car === RECOMMEND_FREQUENCY.NONE
                ? 'none'
                : car === RECOMMEND_FREQUENCY.MIDDLE
                ? 'middle'
                : 'high',
            ]"
          ></i>
        </li>
        <a :href="googleMapUrl" target="_blank" class="link">
          <li class="item"><img src="/assets/icons/kws/google-maps.svg" /></li>
        </a>
        <a :href="streetViewUrl" target="_blank" class="link">
          <li class="item"><img src="/assets/icons/kws/street-view.svg" /></li>
        </a>
      </ul>
    </dd>
    <Keyword></Keyword>
    <SliderTextList
      :keywords="exKeywords"
      @input="updateKeyword"
    ></SliderTextList>
    <ValidationCommon
      v-if="errorMessages"
      :errorMessages="errorMessages"
    ></ValidationCommon>
    <dd class="container head_share">
      <a :href="twitterUrl" target="_blank" class="link">
        <ContainerIconText
          text="Share on Twitter"
          :image="twitter"
          className="c-wrap_icon_text"
        ></ContainerIconText>
      </a>
    </dd>
  </dl>
</template>

<script>
import { mapState } from "vuex";
import CONST_EXTERNAL from "@/const/external.ts";
import IconText from "../../atoms/container/IconText.vue";
import Rating from "../../atoms/container/Rating.vue";
import Keyword from "../../molecules/mapInfo/kw/Keyword.vue";
import ValidationCommon from "../../atoms/validations/Common.vue";
import ContainerIconText from "../../atoms/container/IconText.vue";
import SliderTextList from "@/components/atoms/slider/TextList.vue";

export default {
  data() {
    return {
      exKeywords: [
        "tourist attraction",
        "hot spring",
        "temple",
        "shrine",
        "sushi",
        "park",
        "cafe",
      ],
      twitter: "/assets/icons/kws/twitter_2.svg",
    };
  },
  created() {
    this.RECOMMEND_FREQUENCY = CONST_EXTERNAL.RECOMMEND_FREQUENCY;
  },
  components: {
    IconText,
    Rating,
    Keyword,
    ValidationCommon,
    ContainerIconText,
    SliderTextList,
  },
  computed: {
    ...mapState({
      name: (state) => state.kw.name,
      lat: (state) => state.kw.lat,
      lng: (state) => state.kw.lng,
      placeId: (state) => state.kw.placeId,
      icon: (state) => state.kw.icon,
      rating: (state) => state.kw.rating,
      userRatingsTotal: (state) => state.kw.userRatingsTotal,
      ratingStar: (state) => state.kw.ratingStar,
      distance: (state) => state.kw.distance,
      direction: (state) => state.kw.direction,
      walking: (state) => state.kw.walking,
      bycicle: (state) => state.kw.bycicle,
      car: (state) => state.kw.car,
      modal: (state) => state.kw.modal,
      errorMessages: (state) => state.kw.errorMessages,
    }),
    twitterUrl() {
      const url = "https://trander.net/kw/share/" + this.placeId;
      const content =
        "How about this place?%0a%0a" +
        "%20%23Trander%0a%0a" +
        this.name +
        "%0a";
      return "https://twitter.com/intent/tweet?text=" + content + "&url=" + url;
    },
    googleMapUrl() {
      return (
        "https://www.google.com/maps/search/?api=1&query=" +
        this.lat +
        "," +
        this.lng +
        "&query_place_id=" +
        this.placeId
      );
    },
    streetViewUrl() {
      return (
        "https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=" +
        this.lat +
        "," +
        this.lng
      );
    },
    ratingPath() {
      return "/assets/icons/stars/rating_" + this.ratingStar + ".png";
    },
  },
  methods: {
    updateKeyword(e) {
      this.$store.commit("kw/setKeyword", e);
    },
  },
};
</script>
