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
      <OverviewFacilities
        @openDialog="openDialogHandler('facilities')"
        :facilityReviews="getOverviewReviews('facilities')"
      />
      <div class="flex gap-5">
        <OverviewProviders
          class="w-1/2"
          @openDialog="openDialogHandler('providers')"
          :providerReviews="getOverviewReviews('providers')"
        />
        <OverviewConsumers
          class="w-1/2"
          @openDialog="openDialogHandler('consumers')"
          :consumerReviews="getOverviewReviews('consumers')"
        />
      </div>
      <div class="flex gap-5">
        <OverviewServices
          class="w-1/2"
          @openDialog="openDialogHandler('services')"
          :serviceReviews="getOverviewReviews('services')"
        />
        <OverviewSuppliers
          class="w-1/2"
          @openDialog="openDialogHandler('suppliers')"
          :supplierReviews="getOverviewReviews('suppliers')"
        />
      </div>
      <OverviewReviews
        @openDialog="openDialogHandler('reviews')"
        :reviews="getOverviewReviews('reviews')"
      />
      <v-dialog :overlay-opacity="0.95" v-model="dialog1" class="max-w-7xl">
        <ListEntities :type="type" />
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
      dialog1: false,
      type: null,
    };
  },
  methods: {
    openDialogHandler(type) {
      this.type = type;
      this.dialog1 = true;
    },
  },
  computed: {
    ...mapGetters(["getOverviewReviews", "openEntityDialog"]),
  },
  async mounted() {
    this.$store.dispatch("getOverviewReviews");
    this.$store.dispatch("getAllReviews");
    this.$store.commit("setEntityInfo", {
      id: "Zola Treutel",
      type: "providers",
    });
    await this.$store.dispatch("getEntityReviews");
    await this.$store.commit("toggleEntityDialog")
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
