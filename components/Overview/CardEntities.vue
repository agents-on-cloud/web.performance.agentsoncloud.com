<template>
  <v-card class="flex flex-row">
    <v-card-title>
      {{ title }}
      <v-btn icon @click.stop="$emit('openDialog')">
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-card-title>
    <!-- TODO: Facilities should be displayed as nested, with multiple facilities  -->
    <Container>
      <!-- list of facilities -->
      <CardMiniEntity
        v-for="entity of entityReviews"
        :entity="entity"
        :key="entity.id"
      />
    </Container>
  </v-card>
</template>

<script>
export default {
  props: ["entityReviews", "title"],
};
</script>
