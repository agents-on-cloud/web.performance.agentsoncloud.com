<template>
  <div>
    <v-icon class="mr-2">mdi-cog</v-icon>
    <span>
      {{ value }}
      <span class="font-bold text-sm">%</span>
    </span>
  </div>
</template>

<script>
export default {
  props: ["value"],
};
</script>