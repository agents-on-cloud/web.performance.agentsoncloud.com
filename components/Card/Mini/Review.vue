<template>
  <v-card elevation="10" class="w-64 mx-3 p-4">
    <h4 class="text-center mb-4 clamped-title">
      {{ review.reviewedName }} Review
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
          <h5 class="self-center text-left one-line">
            {{ review.reviewerName }}
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
      <div class="flex flex-col justify-center">
        <div class="text-center flex flex-grow-0 justify-center">
          <h5>Total Score</h5>
          <span class="text-gray-400 text-xs text-caption ml-2">
            ({{ (review.score / 20).toFixed(1) }})
          </span>
        </div>
        <v-rating
          title="Durability"
          empty-icon="mdi-star-outline"
          full-icon="mdi-star"
          half-icon="mdi-star-half-full"
          hover
          length="5"
          :value="review.score / 20"
          half-increments
          readonly
          class="text-center"
        ></v-rating>
      </div>
      <v-btn class="mb-5" elevation="2">Open Details</v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  props: ["review"],
};
</script>