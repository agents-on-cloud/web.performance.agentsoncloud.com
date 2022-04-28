<template>
  <section class="">
    <header
      class="flex justify-between items-center border-b-2 px-10 h-20 my-auto"
    >
      <h1>The Overview Page</h1>
      <div class="cursor-pointer">Settings</div>
    </header>
    <!-- TODO: The facilities should be included, but everything is averaged per faiclity and is chosen first  -->
    <FiltersDaysBefore />
    <main id="overview-container" class="mb-15 relative">
      <OverviewCardEntities
        @openDialog="openDialogHandler('facilities')"
        :entityReviews="getOverviewReviews('facilities')"
        title="Facilities Overview"
      />
      <div class="flex gap-5">
        <OverviewTableEntities
          class="w-1/2"
          type="providers"
          @openDialog="openDialogHandler('providers')"
          :reviews="getOverviewReviews('providers')"
        />
        <OverviewTableEntities
          class="w-1/2"
          type="consumers"
          @openDialog="openDialogHandler('consumers')"
          :reviews="getOverviewReviews('consumers')"
        />
      </div>
      <div class="flex gap-5">
        <OverviewCardEntities
          class="w-1/2"
          @openDialog="openDialogHandler('services')"
          :entityReviews="getOverviewReviews('services')"
          title="Services Overview"
        />
        <OverviewCardEntities
          class="w-1/2"
          @openDialog="openDialogHandler('suppliers')"
          :entityReviews="getOverviewReviews('suppliers')"
          title="Suppliers Overview"
        />
      </div>
      <OverviewReviews
        @openDialog="openDialogHandler('reviews')"
        :reviews="getOverviewReviews('reviews')"
      />
      <v-dialog :overlay-opacity="0.95" v-model="openDialog" class="max-w-7xl">
        <TablePerformanceWrapper :type="type" />
      </v-dialog>
      <v-dialog
        :overlay-opacity="0.95"
        v-model="openEntityDialog"
        class="max-w-7xl"
      >
        <CardDetailsEntity />
      </v-dialog>
    </main>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      openDialog: false,
      type: null,
    };
  },
  methods: {
    openDialogHandler(type) {
      this.type = type;
      this.openDialog = true;
    },
  },
  computed: {
    ...mapGetters(["getOverviewReviews", "openEntityDialog"]),
  },
  async mounted() {
    this.$store.dispatch("getOverviewReviews");
    this.$store.dispatch("getAllReviews");
    this.$store.dispatch("getMetrics");
    this.$store.commit("setEntityInfo", {
      id: "Zola Treutel",
      type: "providers",
    });
    await this.$store.dispatch("getEntityReviews");

    this.$store.commit("toggleEntityDialog");
  },
};
</script>

<style>
#overview-container > * {
  max-height: 455px;
  overflow-y: auto;
  margin-bottom: 20px;
}

.v-dialog {
  max-width: 1280px;
}
</style>
