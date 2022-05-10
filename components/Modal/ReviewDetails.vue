<template>
  <v-dialog
    :overlay-opacity="0.95"
    :value="openModal"
    persistent
    class="max-w-7xl"
  >
    <CardDetailsReview :review="review" class="relative">
      <div class="absolute right-[10px] top-[10px] w-fit">
        <v-icon @click.stop="$emit('closeReviewModal')" dark> mdi-close-thick </v-icon>
      </div>
    </CardDetailsReview>
  </v-dialog>
</template>

<script>
export default {
  props: ["review", "openModal"],
};
</script>

<style>
.v-dialog--active {
  position: absolute;
  top: 5px;
  max-height: 99% !important;
}
</style>