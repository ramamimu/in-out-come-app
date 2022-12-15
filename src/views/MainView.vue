<template>
  <div>
    <ApexChartVue></ApexChartVue>
  </div>
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

  <h3>Date Filter</h3>
  <input type="date" v-model="startDate" />
  <input type="date" v-model="endDate" />

  <div class="shadow p-3 mb-5 bg-body rounded">
    <table class="table table-sm align-middle mb-0 bg-white table-hover">
      <thead class="bg-light">
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
        <tr v-for="(item, index) in renderList()" :key="index" class="item-row">
          <td>{{ item.title }}</td>
          <td>{{ convertMutationToText(item.mutation) }}</td>
          <td>{{ convertDatetoText(item.date) }}</td>
          <td>Rp{{ moneyHandling(item.amount) }}</td>
          <td>{{ checkMutationCategory(item.mutation, item.category) }}</td>
          <td>{{ convertPaymentMethodToText(item.paymentmethod) }}</td>
          <td>
            <button class="btn btn-outline-primary"  @click="$router.push({ name: 'Edit', params: { id: item.id } })">
              <i
                class="fa fa-edit"
                style="font-size: 20px"
               
              ></i>
            </button>
            <button class="btn btn-outline-primary" @click="removeTransaction(item.id)">
              <i
                class="fa fa-remove"
                style="font-size: 20px; color: red"
          
              ></i>
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
      searchInput: "",
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

      if (myDate.getUTCMonth() + 1 < 10) {
        var month = "0" + (myDate.getUTCMonth() + 1);
      } else {
        var month = myDate.getUTCMonth() + 1;
      }

      if (myDate.getUTCDate() < 10) {
        var day = "0" + myDate.getUTCDate();
      } else {
        var day = myDate.getUTCDate();
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
        method: "POST",
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
      this.searchInput != ""
        ? (searchList = this.CRUDStore.transactions.filter((item) => {
            return item["title"]
              .toLowerCase()
              .includes(this.searchInput.toLowerCase());
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
  width: 1px;
}
</style>
