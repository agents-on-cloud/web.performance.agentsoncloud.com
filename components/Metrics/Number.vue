<template>
  <div class="text-center">
    {{ value ? parseInt(value) : "-" }}
  </div>
</template>

<script>
export default {
  props: ["value"],
};
</script>