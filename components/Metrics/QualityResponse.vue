<template>
  <div>
    <h4 class="mb-4 whitespace-nowrap">
      <v-icon class="mx-2">mdi-quality-high</v-icon>Quality Of Response
      <span class="text-gray-400 text-xs text-caption ml-1">
        ({{ value }})
      </span>
    </h4>
    <div class="text-l flex justify-around gap-2">
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
      ></v-rating>
    </div>
  </div>
</template>

<script>
export default {
  props: ["value"],
};
</script>