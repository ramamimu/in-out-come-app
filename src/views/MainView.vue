<template>
  <h1>Money Mutation List</h1>
  <div class="Search-Bar">
    <input
      type="text"
      class="Search-Box"
      placeholder="Search records"
      v-model="searchInput"
    />
  </div>
  <table>
    <thead>
      <tr>
        <th
          v-for="(column, index) in columns"
          :key="index"
          class="table-header"
          @click="sortIndex(column)"
        >
          {{ column }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in renderList()" :key="index" class="item-row">
        <td
          v-for="(rowItem, itemIndex) in row"
          :key="itemIndex"
          class="item-column"
        >
          <template v-if="itemIndex != 'id'">
            {{ rowItem }}
          </template>
          <template v-else>
            <button
              class="btn btn-success"
              @click="$router.push({ name: 'Edit', params: { id: row.id } })"
            >
              Edit
            </button>
            <button class="btn btn-danger" @click="removeTransaction(row.id)">
              Delete
            </button>
          </template>
        </td>
      </tr>
    </tbody>
  </table>
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
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

export default {
  name: "MainView",
  data() {
    return {
      columns: [
        "Title",
        "Mutation",
        "Date",
        "Amount",
        "Category",
        "Payment Method",
        "Action",
      ],
      MoneyTrackers: [],
      rows: [],
      term: "",
      sortColumn: "",
      sortDirection: true,
      // Sort direction default is true means descending, false means ascending
      searchInput: "",
      clickIndexName: "title",
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
    this.rows = [...this.MoneyTrackers];
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
    stringChecker(word) {
      return Object.prototype.toString.call(word) === "[object String]";
    },
    async load() {
      try {
        const moneyTrackerRef = collection(db, "MoneyTracker");
        const q = query(moneyTrackerRef, orderBy("date", "asc"));
        // const q = query(moneyTrackerRef, orderBy(this.sortColumn,this.sortDirection));
        const querySnapshot = await getDocs(q);

        this.MoneyTrackers = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
        });

        querySnapshot.forEach((doc) => {
          let utcSeconds = doc.data().date;
          let d = new Date(parseInt(utcSeconds));

          this.MoneyTrackers.push({
            title: doc.data().title,
            mutation: this.ToolsStore.convertToText(
              MUTATION,
              doc.data().mutation
            ),
            date: d.toDateString(),
            amount: doc.data().amount,
            category: this.checkMutationCategory(
              doc.data().mutation,
              doc.data().category
            ),
            paymentMethod: this.ToolsStore.convertToText(
              PAYMENT_METHOD,
              doc.data().paymentmethod
            ),
            id: doc.id,
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
    searchFilter(row, term) {
      console.log("Dalem Fungsi searchFilter");
      return row.join(" ").toLowerCase().includes(term.toLowerCase());
    },
    performSearch(rows, term) {
      console.log("Dalem Fungsi Performsearch");
      const results = this.searchFilter(rows, term);
      console.log("Ini Results", results);
      return results;
    },
    renderList() {
      let searchList;
      this.searchInput != ""
        ? (searchList = this.MoneyTrackers.filter((item) => {
            return item["title"]
              .toLowerCase()
              .includes(this.searchInput.toLowerCase());
          }))
        : (searchList = this.MoneyTrackers);
      if (this.clickIndexName == "amount") {
        searchList.sort((a, b) => {
          if (this.sortDirection == true) {
            return a.amount - b.amount;
          } else if (this.sortDirection == false) {
            return b.amount - a.amount;
          }
        });
      } else {
        searchList.sort((a, b) => {
          if (this.sortDirection == true) {
            if (a[this.clickIndexName] < b[this.clickIndexName]) {
              return -1;
            } else if (a[this.clickIndexName] > b[this.clickIndexName]) {
              return 1;
            }
          } else if (this.sortDirection == false) {
            if (a[this.clickIndexName] > b[this.clickIndexName]) {
              return -1;
            } else if (a[this.clickIndexName] < b[this.clickIndexName]) {
              return 1;
            }
          }
        });
      }
      return searchList;
    },
    sortIndex(index) {
      console.log("index", index);
      this.clickIndexName = index.split(" ").join("").toLowerCase();
      console.log("KlikIndeks", this.clickIndexName);

      // If Descending
      if (this.sortDirection == true) {
        // Change to Ascending
        this.sortDirection = false;
      }
      // if Ascending
      else if (this.sortDirection == false) {
        // Change to Descending
        this.sortDirection = true;
      }
    },
  },
};
</script>

<style></style>
