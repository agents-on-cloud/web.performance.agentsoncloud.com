<template>
  <v-card id="entity-mini-card" class="px-10 py-5" elevation="10">
    <header class="flex mr-5">
      <div class="basis-1/3">
        <h2>{{ review.reviewedName }} - Review Details</h2>
        <h4 class="text-gray-400 font-light whitespace-nowrap">
          Type:
          <MetricsType class="inline-block" :value="review.reviewedType" />
        </h4>
      </div>
      <div class="basis-1/3 text-center">
        <h3>Reviewed By</h3>
        <h4 class="text-gray-400 font-light whitespace-nowrap">
          <MetricsName
            :name="review.reviewerName"
            type="providers"
            :id="review.reviewerId"
          />
        </h4>
      </div>
      <div class="basis-1/3 text-right">
        <h2>ID - {{ review.id }}</h2>
        <MetricsDateTime class="text-sm" :value="review.createdAt" />
      </div>
    </header>
    <slot></slot>
    <div class="flex mt-5">
      <div class="basis-1/2">
        <MetricsStars
          :class="!review.score ? 'inapplicable' : ''"
          :value="review.score"
          title="Score"
        />
        <div class="behavioral-grid">
          <MetricsTime
            :hidden="!review.timeUtility"
            :value="review.timeUtility"
            title="Time Utility"
          />
          <MetricsTime
            :hidden="!review.servicesUtility"
            :value="review.servicesUtility"
            title="Service Utility"
          />
          <MetricsNumber
            :hidden="!review.returningCustomers"
            :value="review.returningCustomers"
            title="Returning Customers"
          />
          <MetricsTime
            :hidden="!review.responseTime"
            :value="review.responseTime"
            title="Response Time"
          />
          <MetricsCash
            :hidden="!review.payments"
            :mini="true"
            :value="review.payments"
            title="Payments"
          />
          <MetricsCash
            :hidden="!review.sales"
            :mini="true"
            :value="review.sales"
            title="Sales"
          />
          <MetricsCash
            :hidden="!review.profit"
            :mini="true"
            :value="review.profit"
            title="Cash"
          />
          <MetricsNumber
            :hidden="!review.bookings"
            :mini="true"
            :value="review.bookings"
            title="Number of Bookings"
          />

          <MetricsNumber
            :hidden="!review.number_of_reviews"
            :value="review.number_of_reviews"
            title="# of Reviews"
          />
        </div>
      </div>
      <div class="basis-1/2">
        <MetricsStars
          :class="!review.socialScore ? 'inapplicable' : ''"
          :value="review.socialScore"
          title="Social Score"
        />
        <div class="behavioral-grid">
          <MetricsStars
            :class="!review.durability ? 'inapplicable' : ''"
            :value="review.durability"
            title="Durability"
          />
          <MetricsStars
            :class="!review.cleanliness ? 'inapplicable' : ''"
            :value="review.cleanliness"
            title="Cleanliness"
          />
          <MetricsStars
            :class="!review.responseQuality ? 'inapplicable' : ''"
            :value="review.responseQuality"
            title="Response Quality"
          />
          <MetricsStars
            :class="!review.availability ? 'inapplicable' : ''"
            :value="review.availability"
            title="Availability"
          />
          <MetricsStars
            :class="!review.reachability ? 'inapplicable' : ''"
            :value="review.reachability"
            title="Reachability"
          />
          <MetricsStars
            :class="!review.usefulness ? 'inapplicable' : ''"
            :value="review.usefulness"
            title="Usefulness"
          />
          <MetricsStars
            :class="!review.manner ? 'inapplicable' : ''"
            :value="review.manner"
            title="Manner"
          />
          <MetricsStars
            :class="!review.communication ? 'inapplicable' : ''"
            :value="review.communication"
            title="Communication"
          />
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  props: ["review"],
};
</script>

<style scoped>
.behavioral-grid {
  margin-top: 20px;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
.inapplicable {
  color: rgba(209, 209, 209, 0.666);
}
</style>