<template>
  <div class="text-center" style="text-transform: capitalize">
    {{ value.replace(/.*\./, "") || "-" }}
  </div>
</template>

<script>
export default {
  props: ["value"],
};
</script>

<style lang="scss" scoped>
</style>