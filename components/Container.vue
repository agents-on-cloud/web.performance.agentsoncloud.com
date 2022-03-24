<template>
  <v-container id="container" class="gap-5 justify-center relative">
    <!-- list of facilities -->
    <slot> <Empty/> </slot>
  </v-container>
</template>

<script>
export default {};
</script>


<style scoped>
.container {
  display: flex;
  grid-gap: 10px;
  flex-wrap: wrap;
}
</style>