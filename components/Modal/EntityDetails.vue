<template>
  <v-dialog
    :overlay-opacity="0.95"
    v-model="openEntityDialog"
    persistent
    class="max-w-7xl"
  >
    <CardDetailsEntity class="relative" @closeDialog="closeDialog">
      <div class="absolute right-[10px] top-[10px] w-fit">
        <v-icon @click="closeDialog" dark> mdi-close-thick </v-icon>
      </div>
    </CardDetailsEntity>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["getOverviewReviews", "openEntityDialog"]),
  },
  methods: {
    closeDialog() {
      this.$store.commit("toggleEntityDialog", false);
    },
  },
};
</script>

<style>
.v-dialog--active {
  position: absolute;
  top: 50px;
}
</style>