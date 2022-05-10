<template>
  <div class="text-center">
    {{ time }}
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: ["value", "mini"],
  data: function () {
    return {
      time: "-",
    };
  },
  methods: {
    updateTime() {
      // duration longer than 1 day is represented as that
      console.log(moment.duration(this.value).asDays() > 1, moment.duration(this.value).asDays());
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
  watch: {
    value() {
      this.updateTime();
    },
  },
};
</script>