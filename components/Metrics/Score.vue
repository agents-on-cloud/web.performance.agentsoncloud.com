<template>
  <div class="flex gap-5 justify-center text-center">
    <h4>{{ title }}</h4>
    <h4>
      <v-icon class="mx-2" small>mdi-star-circle</v-icon>
      Score
    </h4>
    <div class="text-sm">{{ parseInt(value * 100) }}<span> %</span></div>
  </div>
</template>

<script>
export default {
  props: ["value", "title"],
};
</script>