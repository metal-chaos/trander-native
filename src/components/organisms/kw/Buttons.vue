<template>
  <div class="p-map_kw_google_btns">
    <div class="container wide">
      <a :href="twitterUrl" target="_blank" class="link">
        <IconText
          text="Share on Twitter"
          :image="twitter"
          className="c-wrap_icon_text"
        ></IconText>
      </a>
    </div>
    <div class="container general">
      <a :href="googleMapUrl" target="_blank" class="link">
        <IconText
          text="Google Map"
          :image="googleMap"
          className="c-wrap_icon_text"
        ></IconText>
      </a>
    </div>
    <div class="container general">
      <a :href="streetViewUrl" target="_blank" class="link">
        <IconText
          text="Street View"
          :image="streetView"
          className="c-wrap_icon_text"
        ></IconText>
      </a>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import IconText from "@/components/atoms/container/IconText.vue";

export default {
  data() {
    return {
      twitter: "/assets/icons/kws/twitter_2.svg",
      googleMap: "/assets/icons/kws/google-maps.svg",
      streetView: "/assets/icons/kws/street-view.svg",
    };
  },
  components: {
    IconText,
  },
  computed: {
    ...mapState({
      name: (state) => state.kw.name,
      lat: (state) => state.kw.lat,
      lng: (state) => state.kw.lng,
      placeId: (state) => state.kw.placeId,
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
  },
};
</script>
