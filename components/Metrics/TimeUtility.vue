<template>
  <div class="text-center items-center flex justify-around">
    <h5>
      <v-icon class="mx-2" small>mdi-store-clock</v-icon>Time Utility
    </h5>
    <div class="text-xs">{{ parseInt(value/60/24)}}<span> Hours</span></div>
  </div>
</template>

<script>
export default {
  props: ["value"],
};
</script>