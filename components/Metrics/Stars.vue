<template>
  <div class="text-center">
    <h4>{{ title }}</h4>
    <v-rating
      :title="((value * 100) / 20).toFixed(1)"
      empty-icon="mdi-star-outline"
      full-icon="mdi-star"
      half-icon="mdi-star-half-full"
      hover
      length="5"
      :value="(value * 100) / 20"
      v-if="value"
      half-increments
      readonly
      size="26"
    ></v-rating>
    <span v-else>-</span>
  </div>
</template>

<script>
export default {
  props: ["value", "title"],
};
</script>

<style lang="scss" scoped>
</style>