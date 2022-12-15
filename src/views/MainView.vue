<template>
  <h1>Money Mutation List</h1>
  <!-- {{CRUDStore.transactions}} -->
  <button class="btn-create" @click="$router.push('Create')">Create New</button>
  <div class="Search-Bar">
    <input
      type="text"
      class="Search-Box"
      placeholder="Search records"
      v-model="searchInput"
    />
  </div>
  <table>
    <tbody>
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
      <tr v-for="(item, index) in renderList()" :key="index" class="item-row">
        <td>{{ item.title }}</td>
        <td>{{ convertMutationToText(item.mutation) }}</td>
        <td>{{ item.date }}</td>
        <td>Rp.{{ moneyHandling(item.amount) }}</td>
        <td>{{ checkMutationCategory(item.mutation, item.category) }}</td>
        <td>{{ convertPaymentMethodToText(item.paymentmethod) }}</td>
        <td>
          <button
            class="btn btn-success"
            @click="$router.push({ name: 'Edit', params: { id: item.id } })"
          >
            Edit
          </button>
          <button class="btn btn-danger" @click="removeTransaction(item.id)">
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { useToolsStore, useCRUDStore } from "../stores/counter";
import {
  MUTATION,
  PAYMENT_METHOD,
  INCOME_CATEGORY,
  OUTCOME_CATEGORY,
} from "../stores/utils";

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
    const ToolsStore = useToolsStore();
    const CRUDStore = useCRUDStore();
    return {
      ToolsStore,
      CRUDStore,
    };
  },
  mounted() {
    this.rows = [...this.MoneyTrackers];
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
    convertMutationToText(index) {
      return this.ToolsStore.convertToText(MUTATION, index);
    },
    convertPaymentMethodToText(index) {
      return this.ToolsStore.convertToText(PAYMENT_METHOD, index);
    },
    async removeTransaction(id) {
      const link = "http://localhost:9090/delete?id=" + id;
      const requestOption = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      };

      fetch(link, requestOption).then((response) => console.log(response));
    },
    searchFilter(row, term) {
      return row.join(" ").toLowerCase().includes(term.toLowerCase());
    },
    performSearch(rows, term) {
      const results = this.searchFilter(rows, term);
      return results;
    },
    renderList() {
      let searchList;
      this.searchInput != ""
        ? (searchList = this.CRUDStore.transactions.filter((item) => {
            return item["title"]
              .toLowerCase()
              .includes(this.searchInput.toLowerCase());
          }))
        : (searchList = this.CRUDStore.transactions);
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
      this.clickIndexName = index.split(" ").join("").toLowerCase();

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
