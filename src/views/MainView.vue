<template>
  <div>
    <ApexChartVue></ApexChartVue>
  </div>
  <hr />
  <div></div>
  <h4>Date Filter</h4>
  <input type="date" v-model="startDate" />
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="w-6 h-6 mx-2"
    style="width: 20px"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
    />
  </svg>

  <input type="date" v-model="endDate" />

  <div class="shadow p-3 my-2 bg-body rounded">
    <table class="table table-sm align-middle my-2 bg-white table-hover">
      <thead class="bg-light py-5">
        <tr>
          <th
            v-for="(column, index) in columns"
            :key="index"
            class="table-header"
            style="cursor: pointer"
            @click="sortIndex(column)"
          >
            {{ column }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in renderList()" :key="index" class="item-row">
          <td>{{ item.title }}</td>
          <td>{{ convertMutationToText(item.mutation) }}</td>
          <td>{{ convertDatetoText(item.date) }}</td>
          <td>Rp{{ moneyHandling(item.amount) }}</td>
          <td>{{ checkMutationCategory(item.mutation, item.category) }}</td>
          <td>{{ convertPaymentMethodToText(item.paymentmethod) }}</td>
          <td>
            <button
              class="btn btn-outline-primary"
              @click="$router.push({ name: 'Edit', params: { id: item.id } })"
            >
              <i class="fa fa-edit" style="font-size: 20px"></i>
            </button>
            <button
              class="btn btn-outline-primary"
              @click="removeTransaction(item.id)"
            >
              <i class="fa fa-remove" style="font-size: 20px; color: red"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { useToolsStore, useCRUDStore } from "../stores/counter";
import {
  MUTATION,
  PAYMENT_METHOD,
  INCOME_CATEGORY,
  OUTCOME_CATEGORY,
} from "../stores/utils";
import ApexChartVue from "../components/ApexChart.vue";

export default {
  name: "MainView",
  components: {
    ApexChartVue,
  },
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
      term: "",
      sortColumn: "",
      sortDirection: true,
      // Sort direction default is true means descending, false means ascending
      clickIndexName: "title",
      startDate: "",
      endDate: "",
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
  methods: {
    checkMutationCategory(mutation, category) {
      let cek;
      if (mutation == 0) {
        cek = this.ToolsStore.convertToText(INCOME_CATEGORY, category);
      } else {
        cek = this.ToolsStore.convertToText(OUTCOME_CATEGORY, category);
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
    convertMutationToText(index) {
      return this.ToolsStore.convertToText(MUTATION, index);
    },
    convertPaymentMethodToText(index) {
      return this.ToolsStore.convertToText(PAYMENT_METHOD, index);
    },
    convertDatetoText(epochDate) {
      var myDate = new Date(Math.round(Number(epochDate)));
      var month;
      if (myDate.getUTCMonth() + 1 < 10) {
        month = "0" + (myDate.getUTCMonth() + 1);
      } else {
        month = myDate.getUTCMonth() + 1;
      }

      var day;
      if (myDate.getUTCDate() < 10) {
        day = "0" + myDate.getUTCDate();
      } else {
        day = myDate.getUTCDate();
      }
      var formattedDate = day + "/" + month + "/" + myDate.getUTCFullYear();
      return formattedDate;
    },
    dateToEpoch(date) {
      var parts = date.split("-");
      var mydate = new Date(parts[0], parts[1] - 1, parts[2]);
      return mydate.getTime().toString();
    },
    async removeTransaction(id) {
      const link = "http://localhost:9090/delete?id=" + id;
      const requestOption = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };
      fetch(link, requestOption).then((response) => console.log(response));
    },
    titleSorter() {},
    searchFilter(row, term) {
      return row.join(" ").toLowerCase().includes(term.toLowerCase());
    },
    performSearch(rows, term) {
      const results = this.searchFilter(rows, term);
      return results;
    },
    renderList() {
      let searchList;
      let startDate = this.dateToEpoch(this.startDate);
      let endDate = this.dateToEpoch(this.endDate);

      // Search Features
      this.CRUDStore.searchTerm != ""
        ? (searchList = this.CRUDStore.transactions.filter((item) => {
            return item["title"]
              .toLowerCase()
              .includes(this.CRUDStore.searchTerm.toLowerCase());
          }))
        : (searchList = this.CRUDStore.transactions);

      // Sorting Features
      if (this.clickIndexName == "amount") {
        searchList.sort((a, b) => {
          if (this.sortDirection == true) {
            return a.amount - b.amount;
          } else if (this.sortDirection == false) {
            return b.amount - a.amount;
          }
        });
      } else if (this.clickIndexName == "title") {
        if (this.sortDirection == true) {
          searchList.sort((a, b) => a.title.localeCompare(b.title));
        } else if (this.sortDirection == false) {
          searchList.sort((a, b) => b.title.localeCompare(a.title));
        }
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

      // Date Filter
      if (startDate != "NaN" && endDate != "NaN") {
        searchList = searchList.filter((item) => {
          return item["date"] >= startDate && item["date"] <= endDate;
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

<style>
.table-fit {
  width: 5px;
}
</style>
