<script>
import { useCounterStore } from "../stores/counter";
export default {
  name: "AboutView",
  setup() {
    const CounterStore = useCounterStore();
    return {
      CounterStore,
    };
  },
};
</script>
<template>
  <p>teko home {{ CounterStore.opoHayo }}</p>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
