<template>
  <div class="c-modal__overlay p-map_kw_modal" @click="hiddenModal">
    <div class="c-modal__overlay__wrap__sml">
      <div class="c-modal__msg__section">
        <div>
          <dl class="c-head_title__mid__modal">
            <dt>How about this place?</dt>
            <dd>
              <div class="icon_color">
                <img :src="icon" class="icon" />
              </div>
              <span class="desc">{{ name }}</span>
            </dd>
          </dl>
          <p class="rating">
            <span class="number">{{ rating }}</span>
            <span class="star_wrap">
              <img :src="ratingPath" />
            </span>
            <span class="total_ratings">（{{ userRatingsTotal }}）</span>
          </p>
        </div>
        <Buttons></Buttons>
      </div>
      <button class="button__modal" @click="hiddenModal">OK</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Buttons from "./Buttons.vue";

export default {
  components: {
    Buttons,
  },
  computed: {
    ...mapState({
      name: (state) => state.kw.name,
      icon: (state) => state.kw.icon,
      rating: (state) => state.kw.rating,
      userRatingsTotal: (state) => state.kw.userRatingsTotal,
      ratingStar: (state) => state.kw.ratingStar,
      modal: (state) => state.kw.modal,
    }),
    ratingPath() {
      return "/assets/icons/stars/rating_" + this.ratingStar + ".png";
    },
  },
  methods: {
    hiddenModal() {
      this.$store.commit("kw/setModal", false);
    },
  },
};
</script>
