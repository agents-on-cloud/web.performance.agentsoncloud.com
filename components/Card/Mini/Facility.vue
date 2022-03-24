<template>
  <v-card id="facility-mini-card" class="px-10 py-5" elevation="10">
    <div>
      <h4 class="max-w-full text-ellipsis whitespace-nowrap mb-5 text-center">
        <!-- TODO: Embedd the type into facility type maybe? -->
        <v-icon class="mr-2">
          {{
            facility.reviewedName.includes("room") ? "mdi-server" : "mdi-cog"
          }}
        </v-icon>
        {{ facility.reviewedName.replace(/ (room|machine)/g, "") }}
      </h4>
      <MetricsScore :value="facility.score" />
    </div>
  </v-card>
</template>

<script>
export default {
  props: ["facility"],
};
</script>

<style>
#facility-mini-card {
  border: 1px solid rgb(126, 126, 126);
}
</style>