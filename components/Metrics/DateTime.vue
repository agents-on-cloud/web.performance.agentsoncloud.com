<template>
  <div class="text-gray-400 text-xs">
    {{ value ? value.substr(0, 10) : "" }}
  </div>
</template>

<script>
export default {
  props: ["value"],
};
</script>