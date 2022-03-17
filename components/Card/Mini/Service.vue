<template>
  <v-card id="service-mini-card" class="px-10 py-5" elevation="10">
    <div>
      <h4 class="max-w-full text-ellipsis whitespace-nowrap mb-5 text-center">
        <!-- TODO: Embedd the type into service type maybe? -->
        {{ service.reviewedName }}
      </h4>
      <MetricsScore :value="service.avg_score" />
    </div>
  </v-card>
</template>

<script>
export default {
  props: ["service"],
};
</script>

<style>
#service-mini-card {
  border: 1px solid rgb(126, 126, 126);
}
</style>