<template>
  <v-rating
    title="Durability"
    empty-icon="mdi-star-outline"
    full-icon="mdi-star"
    half-icon="mdi-star-half-full"
    hover
    length="5"
    :value="value / 20"
    half-increments
    readonly
    class="text-center"
    size="26"
  ></v-rating>
</template>

<script>
export default {
  props: ["value", "text"],
};
</script>

<style lang="scss" scoped>
</style>