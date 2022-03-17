<template>
  <div class="text-xs text-center self-start">
    <h5 class="mb-4">
      <v-icon class="mx-2" small>mdi-calendar-multiple-check</v-icon>
      Total Bookings
    </h5>
    <div class="flex justify-around gap-2">
      <div>
        <!-- TODO: map total from billing and return to fill this part -->
        <span class="text-gray-400 block">Percentile</span>
        {{ (Math.random() * 100).toFixed(1) }} %
      </div>
      <div>
        <span class="text-gray-400 block">Total</span>
        {{ parseInt(value) }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["value"],
};
</script>