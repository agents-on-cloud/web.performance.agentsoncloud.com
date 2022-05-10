<template>
  <div>
    <h4>{{ title }}</h4>
    <div class="text-gray-400 text-xs">
      {{ value ? value.substr(0, 10) : "" }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["value", "title"],
};
</script>