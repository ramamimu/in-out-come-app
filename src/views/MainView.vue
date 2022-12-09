<template>
  <h1>Money Mutation List</h1>
  <button class="btn-create" @click="$router.push('Create')">Create New</button>
  <div class="list" v-for="(transaction, id) in MoneyTrackers" :key="id">
    {{ transaction.title }}
    {{ transaction.mutation }}
    {{ transaction.date }}
    {{ transaction.amount }}
    {{ transaction.category }}
    {{ transaction.paymentMethod }}
    <button
      class="btn-edit"
      @click="$router.push({ name: 'Edit', params: { id: transaction.id } })"
    >
      Edit
    </button>
    <button class="btn-delete" @click="removeTransaction(transaction.id)">
      Delete
    </button>
  </div>
</template>

<script>
import { useCounterStore, useToolsStore } from "../stores/counter";
import {
  MUTATION,
  PAYMENT_METHOD,
  INCOME_CATEGORY,
  OUTCOME_CATEGORY,
} from "../stores/utils";
import { db } from "../firebase/config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

export default {
  name: "MainView",
  data() {
    return {
      MoneyTrackers: [],
    };
  },
  setup() {
    const CounterStore = useCounterStore();
    const ToolsStore = useToolsStore();
    return {
      CounterStore,
      ToolsStore,
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    checkMutationCategory(mutation, category) {
      if (mutation == 0) {
        var cek = this.ToolsStore.convertToText(INCOME_CATEGORY, category);
      } else {
        var cek = this.ToolsStore.convertToText(OUTCOME_CATEGORY, category);
      }
      return cek;
    },
    moneyHandling(amount) {
      var parts = amount.toString().split(".");
      const numberPart = parts[0];
      const decimalPart = parts[1];
      const thousands = /\B(?=(\d{3})+(?!\d))/g;
      return (
        numberPart.replace(thousands, ".") +
        (decimalPart ? "," + decimalPart : "")
      );
    },
    async load() {
      try {
        const querySnapshot = await getDocs(collection(db, "MoneyTracker"));
        this.MoneyTrackers = [];
        querySnapshot.forEach((doc) => {
          let utcSeconds = doc.data().date;
          let d = new Date(parseInt(utcSeconds));

          this.MoneyTrackers.push({
            id: doc.id,
            title: doc.data().title,
            mutation: this.ToolsStore.convertToText(
              MUTATION,
              doc.data().mutation
            ),
            date: d.toDateString(),
            amount: this.moneyHandling(doc.data().amount),
            category: this.checkMutationCategory(
              doc.data().mutation,
              doc.data().category
            ),
            paymentMethod: this.ToolsStore.convertToText(
              PAYMENT_METHOD,
              doc.data().paymentmethod
            ),
          });
        });
      } catch (err) {
        console.log(err.message);
      }
    },

    async removeTransaction(id) {
      try {
        await deleteDoc(doc(db, "MoneyTracker", id));
        this.load();
      } catch (err) {
        console.log(err.message);
      }
    },
  },
};
</script>

<style></style>
