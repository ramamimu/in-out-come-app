<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="border-bottom pb-3 px-5 mb-3 shadow-sm">
    <div class="d-flex justify-content-between">
      <h2>Money Tracker Apps</h2>
      <div class="d-flex gap-2">
        <input
          style="width: 180px"
          type="text"
          class="form-control"
          placeholder="search"
          aria-describedby="basic-addon1"
          v-model="input_search"
        />
        <button
          type="button"
          class="btn btn-primary"
          @click="$router.push('Create')"
        >
          Add New
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useToolsStore, useCRUDStore } from "../stores/counter";
export default {
  name: "Header",
  setup() {
    const toolsStore = useToolsStore();
    const CRUDStore = useCRUDStore();
    return {
      toolsStore,
      CRUDStore,
    };
  },
  data() {
    return {
      input_search: "",
    };
  },
  watch: {
    input_search: function () {
      this.CRUDStore.searchTerm = this.input_search;
    },
  },
};
</script>
