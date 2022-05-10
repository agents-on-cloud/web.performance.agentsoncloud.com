<template>
  <div class="text-center">
    <h4>{{ title }}</h4>
    <div style="text-transform: capitalize">
      {{ value.replace(/.*\./, "") || "-" }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["value", "title"],
};
</script>

<style lang="scss" scoped>
</style>