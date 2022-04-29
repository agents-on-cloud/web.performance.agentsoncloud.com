<template>
  <v-card class="mt-4 mx-auto">
    <v-sheet
      class="relative mx-auto mb-4 h-[300px]"
      color="#8ea59f"
      elevation="12"
      max-width="calc(100% - 32px)"
    >
      <div class="relative">
        <div
          class="w-fit my-3 pr-6 absolute top-[-10px] right-5 z-10 text-black"
          v-if="array.length > 1"
        >
          <v-btn-toggle
            @change="scoreTypeHandler"
            v-model="scoreType"
            tile
            color="#000000"
            group
          >
            <v-btn value="score">Score</v-btn>
            <v-btn value="socialScore">Social Score</v-btn>
          </v-btn-toggle>
        </div>
        <v-sparkline
          :labels="labels"
          :value="value"
          color="#437467"
          line-width="0.5"
          padding="10"
          label-size="3"
          smooth
          fill
        ></v-sparkline>
        <v-sparkline
          class="absolute top-0 z-0"
          :value="allValues"
          color="#003333"
          line-width="1"
          padding="10"
          smooth
        ></v-sparkline>
      </div>
    </v-sheet>

    <v-card-text class="pt-0">
      <v-icon class="mr-2" small> mdi-clock </v-icon>
      <span class="text-caption grey--text font-weight-light"
        >last registration 26 minutes ago</span
      >
    </v-card-text>
  </v-card>
</template>

<script>
import moment from "moment";
export default {
  props: ["array"],
  data: () => ({
    labels: [],
    value: [],
    allValues: [],
    scoreType: "score",
  }),
  methods: {
    updateData() {
      this.allValues = [];
      this.labels = [];
      this.value = [];

      let everyXLabel =
        this.array.length > 12 ? parseInt(this.array.length / 12) : 1;
      let everyXAverage = 0;

      this.array.forEach((data, idx) => {
        this.allValues.push(data[this.scoreType]);
        let date = new Date(data.createdAt);
        everyXAverage += data[this.scoreType];

        if (idx % everyXLabel === 0) {
          this.labels.push(moment(date).format("M/Y"));
          this.value.push(everyXAverage / everyXLabel);
          everyXAverage = 0;
        }
      });
    },
    scoreTypeHandler() {
      this.updateData();
    },
  },
  watch: {
    array() {
      this.updateData();
    },
  },
  mounted: function () {
    this.updateData();
  },
};
</script>