<template>
  <dl class="map_info_introduction p-map_kw">
    <dt class="title">Explore with keyword</dt>
    <dd class="description">
      Here's where you're going today
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
  </dl>
</template>

<script>
import { mapState } from "vuex";
import Keyword from "@/components/molecules/mapInfo/kw/Keyword.vue";
import ValidationCommon from "@/components/atoms/validations/Common.vue";
import SliderTextList from '@/components/atoms/slider/TextList.vue'

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
    };
  },
  components: {
    Keyword,
    ValidationCommon,
    SliderTextList,
  },
  computed: {
    ...mapState({
      errorMessages: (state) => state.kw.errorMessages,
    }),
  },
  methods: {
    updateKeyword(e) {
      this.$store.commit("kw/setKeyword", e);
    },
  },
};
</script>
