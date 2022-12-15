import { defineStore } from "pinia";

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

export const useCRUDStore = defineStore({
  id: "CRUD-Store",
  state: () => ({
    transactions: [],
    incomes: [],
    outcomes: [],
  }),
  actions: {},
});
