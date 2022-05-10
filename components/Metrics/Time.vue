<template>
  <div class="text-center">
    <h4>{{ title }}</h4>
    <div>
      {{ time }}
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: ["value", "mini", "title"],
  data: function () {
    return {
      time: "-",
    };
  },
  methods: {
    updateTime() {
      // duration longer than 1 day is represented as that
      console.log(this.value, moment.duration(this.value).asDays());
      this.time =
        (moment.duration(this.value).asDays() > 1 &&
          moment.duration(this.value).asDays() + " days") ||
        (this.value &&
          moment
            .utc(moment.duration(this.value).as("milliseconds"))
            .format("HH:mm:ss")) ||
        "-";
    },
  },
  mounted: function() {
    this.updateTime();
  },
  watch: {
    value() {
      this.updateTime();
    },
  },
};
</script>