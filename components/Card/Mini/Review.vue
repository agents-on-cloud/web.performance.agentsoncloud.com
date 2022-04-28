<template>
  <v-card elevation="10" class="w-64 mx-3 p-4">
    <h4 v-if="!hideTitle" class="text-center mb-4 clamped-title">
      <MetricsName
        :name="review.reviewedName + ' Review'"
        :type="review.reviewedType"
        :id="review.reviewedId"
      />
    </h4>
    <div class="h-60 flex flex-col">
      <header class="mb-2 flex flex-grow-0">
        <div class="flex text-center self-start w-1/2">
          <v-icon color="indigo" class="mr-2"
            >{{
              review.reviewerName !== "System"
                ? "mdi-account-circle"
                : "mdi-server"
            }}
          </v-icon>
          <h5 class="self-center text-left max-w-[90px]">
            <MetricsName
              :name="review.reviewerName"
              type="providers"
              :id="review.reviewerId"
            />
          </h5>
        </div>
        <div class="text-center self-start w-32 flex-grow">
          <v-icon small>mdi-calendar-month</v-icon>
          <span class="font-light text-gray-400 text-xs">{{
            review.createdAt ? review.createdAt.substr(0, 10) : ""
          }}</span>
        </div>
      </header>
      <v-divider></v-divider>
      <div class="flex flex-col justify-center gap-1">
        <div class="text-center flex flex-grow-0 justify-center">
          <h5>Total Score</h5>
          <span class="text-gray-400 text-xs text-caption ml-2">
            ({{ (review.score * 100).toFixed(1) }})
          </span>
        </div>
        <MetricsStars :value="review.score" />
        <div class="text-center flex flex-grow-0 justify-center mt-5">
          <h5>Total Social Score</h5>
          <span class="text-gray-400 text-xs text-caption ml-2">
            ({{ (review.socialScore * 100).toFixed(1) }})
          </span>
        </div>
        <MetricsStars v-if="review.socialScore" :value="review.socialScore" />
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  props: ["review", "hideTitle"],
};
</script>