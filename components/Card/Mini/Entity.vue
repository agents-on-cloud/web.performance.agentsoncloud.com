<template>
  <v-card id="Entity-mini-card" class="px-10 py-5" elevation="10">
    <div>
      <h4 class="max-w-full text-ellipsis whitespace-nowrap mb-5 text-center">
        <!-- TODO: Embedd the type into entity type maybe? -->
        <v-icon class="mr-2">
          {{
            entity.reviewedName.includes("room") ? "mdi-server" : "mdi-cog"
          }}
        </v-icon>
        {{ entity.reviewedName }}
      </h4>
      <MetricsScore :value="entity.score" />
    </div>
  </v-card>
</template>

<script>
export default {
  props: ["entity"],
};
</script>

<style>
#Entity-mini-card {
  border: 1px solid rgb(126, 126, 126);
}
</style>