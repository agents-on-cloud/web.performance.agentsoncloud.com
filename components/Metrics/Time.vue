<template>
  <div class="text-center">
    {{
      (value && new Date(value * 1000).toISOString().substr(11, 8)) || "-"
    }}
  </div>
</template>

<script>
export default {
  props: ["value", "mini"],
};
</script>