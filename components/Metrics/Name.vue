<template>
  <div class="text-center">
    <h4>{{ title }}</h4>
    <div
      class="
        w-full
        one-line
        cursor-pointer
        hover:text-cyan-200
        inline-block
        items-center
      "
      @click="openDetailsModal"
    >
      {{ name }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["id", "name", "type", "title"],
  methods: {
    async openDetailsModal() {
      this.$store.commit("setEntityInfo", {
        id: this.id,
        name: this.name,
        type: this.type,
      });

      await this.$store.dispatch("getEntityReviews");

      this.$store.commit("toggleEntityDialog", true);
    },
  },
};
</script>