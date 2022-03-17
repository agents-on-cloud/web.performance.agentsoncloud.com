<template>
  <div class="text-center items-center flex justify-around min-w-max">
    <h5><v-icon class="mx-2" small>mdi-refresh</v-icon>Returning Customers</h5>
    <div class="text-xs min-w-max">{{ value.toFixed(1) }}<span> %</span></div>
  </div>
</template>

<script>
export default {
  props: ["value"],
};
</script>