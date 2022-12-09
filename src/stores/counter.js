import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  state: () => {
    return { count: 10, opoHayo: "rere" };
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    },
  },
});

export const useToolsStore = defineStore("tools", {
  state: () => {
    return {};
  },

  actions: {
    convertToText(variables, numb) {
      for (let variable in variables) {
        if (variables[variable] == numb) return variable;
      }
      return null;
    },
  },
});
