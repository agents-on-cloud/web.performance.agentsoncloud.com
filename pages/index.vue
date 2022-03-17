<template>
  <section class="">
    <header
      class="flex justify-between items-center border-b-2 px-10 h-20 my-auto"
    >
      <h1>The Overview Page</h1>
      <div class="cursor-pointer">Settings</div>
    </header>
    <!-- TODO: The facilities should be included, but everything is averaged per faiclity and is chosen first  -->
    <main id="overview-container" class="my-15 relative">
      <FiltersDaysBefore />
      <OverviewFacilities
        @openDialog="openDialogHandler('facilities')"
        :facilityReviews="getGroupedWorstReviews.facilities"
      />
      <div class="flex gap-5">
        <OverviewProviders
          class="w-1/2"
          @openDialog="openDialogHandler('providers')"
          :providerReviews="getGroupedWorstReviews.providers"
        />
        <OverviewConsumers
          class="w-1/2"
          @openDialog="openDialogHandler('consumers')"
          :consumerReviews="getGroupedWorstReviews.consumers"
        />
      </div>
      <div class="flex gap-5">
        <OverviewServices
          class="w-1/2"
          @openDialog="openDialogHandler('services')"
          :serviceReviews="getGroupedWorstReviews.services"
        />
        <OverviewSuppliers
          class="w-1/2"
          @openDialog="openDialogHandler('suppliers')"
          :supplierReviews="getGroupedWorstReviews.suppliers"
        />
      </div>
      <OverviewReviews
        @openDialog="openDialogHandler('reviews')"
        :reviews="getWorstReviews"
      />
      <v-dialog v-model="dialog">
        <ListEntities :type="type" />
      </v-dialog>
    </main>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      dialog: false,
      type: null,
    };
  },
  methods: {
    openDialogHandler(type) {
      this.type = type;
      this.dialog = true;
      console.log("emitting ", type, this.type);
    },
  },
  computed: {
    ...mapGetters(["getGroupedWorstReviews", "getWorstReviews"]),
    ReviewCards() {},
  },
  mounted() {
    this.$store.dispatch("getAllReviews");
    this.$store.dispatch("getGroupedWorstReviews");
    this.$store.dispatch("getGroupedReviews");
    this.$store.dispatch("getWorstReviews");
  },
};
</script>

<style>
#overview-container > * {
  max-height: 455px;
  overflow-y: auto;
  margin-bottom: 20px;
}
</style>
