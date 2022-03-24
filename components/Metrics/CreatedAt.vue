<template>
  <div class="text-gray-400 text-xs">
    {{ createdAt ? createdAt.substr(0, 10) : "" }}
  </div>
</template>

<script>
export default {
  props: ["createdAt"],
};
</script>