<template>
  <div class="text-center self-start">
    <h4 class="mb-4">
      <v-icon class="mx-2" small>timer-outline</v-icon>Timely Response
    </h4>
    <div class="flex justify-around">
      <div>
        <!-- TODO: map total from ?where? and return to fill this part -->
        <span class="text-xs text-gray-400 block">Percentile</span>
        {{ (Math.random() * 100).toFixed(1) }} %
      </div>
      <div class="relative">
        <span class="text-xs text-gray-400 block">Total</span>
        {{ value }} minutes
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["value"],
};
</script>