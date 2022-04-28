<template>
<div>

  <v-rating
    :title="(value * 100 / 20).toFixed(1)"
    empty-icon="mdi-star-outline"
    full-icon="mdi-star"
    half-icon="mdi-star-half-full"
    hover
    length="5"
    :value="value * 100 / 20"
    v-if="value"
    half-increments
    readonly
    class="text-center"
    size="26"
  ></v-rating>
  <span v-else>-</span>
</div>
  
</template>

<script>
export default {
  props: ["value", "text"],
};
</script>

<style lang="scss" scoped>
</style>