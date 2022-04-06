<template>
  <ListTable
    :headers="headers"
    :items="items"
    :itemsCount="itemsCount"
    :loading="loading"
    @trigger-update="fetchUpdate"
  />
</template>

<script>
import { mapGetters } from "vuex";
import { parseEntitiesTable, parseReviewsTable } from "../../utils";

export default {
  props: ["type", "toggleUpdate"],
  data() {
    return {
      headers: [],
      items: [],
      itemsCount: 10,
      loading: false,
      options: {},
    };
  },
  methods: {
    updateTable() {
      ({ headers: this.headers, items: this.items } = (
        this.type === "reviews" ? parseReviewsTable : parseEntitiesTable
      )(this.getAllReviews(this.type).rows, this.type));

      this.itemsCount = this.getAllReviews(this.type).count;
      typeof this.itemsCount === "object" && (this.itemsCount = 0);
    },

    async fetchUpdate({ sortBy, sortDesc, page, itemsPerPage }) {
      this.loading = true;
      await this.$store.dispatch("sortReviews", {
        type: this.type,
        limit: itemsPerPage,
        offset: itemsPerPage * (page - 1) || null,
        orderBy: sortBy,
        orderDesc: sortDesc,
      });
      this.updateTable();
      this.loading = false;
    },
  },
  computed: {
    ...mapGetters(["getAllReviews"]),
  },
  mounted() {
    this.updateTable();
    console.log({
      headers: JSON.stringify(this.headers),
      items: JSON.stringify(this.items),
    });
  },
  watch: {
    toggleUpdate() {
      this.options.page = 1;
      this.updateTable();
    },
  },
};
</script>