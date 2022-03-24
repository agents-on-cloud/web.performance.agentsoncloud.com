<template>
  <div v-if="!mini" class="text-center self-start">
    <h5 class="mb-4"><v-icon class="mx-2">mdi-cash</v-icon>Profits</h5>
    <div class="text-xs flex justify-around gap-2">
      <div>
        <!-- TODO: map total from billing and return to fill this part -->
        <span>Percentile</span>
        {{ (Math.random() * 100).toFixed(1) }} %
      </div>
      <div class="relative">
        <span>Total</span>
        {{ value.toFixed(1) }}
        <span class="absolute -right-3 top-1/2">$</span>
      </div>
    </div>
  </div>
  <div v-else class="text-center">
    {{ value > 0 ? parsedAmount + " $" : "-" }}
  </div>
</template>

<script>
export default {
  props: ["value", "mini"],
  data() {
    return {
      parsedAmount: 0,
    };
  },
  watch: {
    value() {
      this.parseAmount();
    },
  },
  methods: {
    parseAmount() {
      this.parsedAmount =
        this.value > 1000 ? parseInt(this.value / 1000) + "K" : this.value;
    },
  },
  mounted() {
    this.parseAmount();
  },
};
</script>

<style scoped>
span {
  color: rgb(146, 146, 146);
  display: block;
}
</style>