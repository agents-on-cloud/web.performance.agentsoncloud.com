<template>
  <div class="text-center">{{ value || "-" }}</div>
</template>

<script>
export default {
  props: ["value"],
};
</script>

<style lang="scss" scoped>
</style>