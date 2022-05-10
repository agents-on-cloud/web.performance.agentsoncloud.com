<template>
  <div class="text-center">
    <h4>{{ title }}</h4>
    <div>{{ value || "-" }}</div>
  </div>
</template>

<script>
export default {
  props: ["value", "title"],
};
</script>

<style lang="scss" scoped>
</style>