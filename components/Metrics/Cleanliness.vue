<template>
  <div>
    <v-icon class="mr-2">mdi-vacuum</v-icon>
    <span>
      {{ value }}
      <span class="font-bold text-l">%</span>
    </span>
  </div>
</template>

<script>
export default {
  props: ["value"],
};
</script>