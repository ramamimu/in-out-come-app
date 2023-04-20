<template>
  <div class="shadow-sm py-5">
    <div class="container position-relative">
      <h2 class="text-center">Create Transaction</h2>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="hover:bg-gray-200 p-2 position-absolute top-0"
        style="width: 50px; margin-right: 10px; cursor: pointer"
        @click="$router.go(-1)"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
        />
      </svg>
      <!-- </button> -->
      <div class="form mx-auto" style="max-width: 500px">
        <form id="new-transaction-form" @submit.prevent="addTransaction()">
          <div class="mb-2">
            <h6>Title</h6>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Add your transaction..."
              v-model="input_title"
              required
            />
          </div>
          <hr />
          <div>
            <h6>Mutation Type</h6>
            <div class="mutation-type-input">
              <label class="px-2"
                ><input
                  type="radio"
                  name="mutation"
                  id="mutation-income"
                  value="Income"
                  v-model="input_mutation"
                  required
                />
                Income
              </label>

              <label>
                <input
                  type="radio"
                  name="mutation"
                  id="mutation-outcome"
                  value="Outcome"
                  v-model="input_mutation"
                  required
                />
                Outcome
              </label>
            </div>
          </div>
          <hr />
          <div class="pb-2">
            <h6>Date</h6>
            <input
              type="date"
              name="date"
              id="date"
              v-model="input_date"
              required
            />
          </div>
          <hr />
          <div>
            <h6>How Much?</h6>
            <input
              type="amount"
              name="amount"
              id="amount"
              placeholder="Amount of Money"
              v-model="input_amount"
              required
            />
          </div>
          <hr />

          <div v-if="input_mutation == 'Income'">
            <h6>Income Category</h6>

            <div>
              <input
                type="radio"
                name="category"
                id="category-income"
                value="Salary"
                v-model="input_category"
                required
              />
              <label>Salary</label>
            </div>

            <div>
              <input
                type="radio"
                name="category"
                id="category-income"
                value="Side Hustle"
                v-model="input_category"
                required
              />
              <label>Side Hustle</label>
            </div>

            <div>
              <input
                type="radio"
                name="category"
                id="category-income"
                value="Other"
                v-model="input_category"
                required
              />
              <label>Other</label>
            </div>
          </div>

          <div v-if="input_mutation == 'Outcome'">
            <h6>Outcome Category</h6>
            <!-- <div>
              <input
                type="radio"
                name="category"
                id="category-outcome"
                value="Food and Drink"
                v-model="input_category"
                required
              />
              <label>Food and Drink</label>
            </div> -->

            <div>
              <input
                type="radio"
                name="category"
                id="category-outcome"
                value="Rent"
                v-model="input_category"
                required
              />
              <label>Rent</label>
            </div>

            <div>
              <input
                type="radio"
                name="category"
                id="category-outcome"
                value="Transportation"
                v-model="input_category"
                required
              />
              <label>Transportation</label>
            </div>

            <div>
              <input
                type="radio"
                name="category"
                id="category-outcome"
                value="Subscription"
                v-model="input_category"
                required
              />
              <label>Subscription</label>
            </div>

            <div>
              <input
                type="radio"
                name="category"
                id="category-outcome"
                value="Internet"
                v-model="input_category"
                required
              />
              <label>Internet</label>
            </div>

            <div>
              <input
                type="radio"
                name="category"
                id="category-outcome"
                value="Grocery"
                v-model="input_category"
                required
              />
              <label>Grocery</label>
            </div>

            <div>
              <input
                type="radio"
                name="category"
                id="category-outcome"
                value="Entertainment"
                v-model="input_category"
                required
              />
              <label>Entertainment</label>
            </div>

            <div>
              <input
                type="radio"
                name="category"
                id="category-outcome"
                value="Clothing"
                v-model="input_category"
                required
              />
              <label>Clothing</label>
            </div>

            <div>
              <input
                type="radio"
                name="category"
                id="category-outcome"
                value="Furniture"
                v-model="input_category"
                required
              />
              <label>Furniture</label>
            </div>
          </div>
          <hr />

          <div class="pb-3">
            <h6>Payment Type</h6>
            <div>
              <input
                type="radio"
                name="payment"
                value="Bank Transfer"
                v-model="input_paymentmethod"
                required
              />
              <label> Transfer Bank</label>
            </div>
            <div>
              <input
                type="radio"
                name="payment"
                value="Cash"
                v-model="input_paymentmethod"
                required
              />
              <label>Cash</label>
            </div>
            <div>
              <input
                type="radio"
                name="payment"
                value="Dana"
                v-model="input_paymentmethod"
                required
              />
              <label>Dana</label>
            </div>
            <div>
              <input
                type="radio"
                name="payment"
                value="Shopee Pay"
                v-model="input_paymentmethod"
                required
              />
              <span class="bubble ShopeePay"></span>
              <label>Shopee Pay</label>
            </div>

            <div>
              <input
                type="radio"
                name="payment"
                value="GoPay"
                v-model="input_paymentmethod"
                required
              />
              <label>GoPay</label>
            </div>

            <div>
              <input
                type="radio"
                name="payment"
                value="OVO"
                v-model="input_paymentmethod"
                required
              />
              <label>OVO</label>
            </div>
          </div>

          <button type="submit" class="btn btn-primary">Save Changes</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useToolsStore, useCRUDStore } from "../stores/counter";
import { useToast } from "../stores/toast";
import {
  MUTATION,
  PAYMENT_METHOD,
  INCOME_CATEGORY,
  OUTCOME_CATEGORY,
} from "../stores/utils";

export default {
  name: "CreateView",
  data() {
    return {
      input_title: "",
      input_date: "",
      input_mutation: "",
      input_amount: "",
      input_category: "",
      input_paymentmethod: "",
    };
  },
  setup() {
    const ToolsStore = useToolsStore();
    const CRUDStore = useCRUDStore();
    const Toast = useToast();
    return {
      CRUDStore,
      ToolsStore,
      Toast,
    };
  },
  watch: {
    input_mutation: function () {
      this.input_category = "";
      this.input_paymentmethod = "";
    },
  },
  methods: {
    reset() {
      this.input_title = "";
      this.input_date = "";
      this.input_mutation = "";
      this.input_amount = "";
      this.input_category = "";
      this.input_paymentmethod = "";
    },
    saveCategory(mutation, category) {
      var kategori;
      if (mutation == "Income") {
        kategori = INCOME_CATEGORY[category];
      } else if (mutation == "Outcome") {
        kategori = OUTCOME_CATEGORY[category];
      }
      return kategori;
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
    dateToEpoch(date) {
      var parts = date.split("-");
      var mydate = new Date(parts[0], parts[1], parts[2]);
      return mydate.getTime().toString();
    },
    async addTransaction() {
      const requestOption = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: this.input_title,
          date: this.dateToEpoch(this.input_date),
          mutation: MUTATION[this.input_mutation],
          amount: parseInt(this.input_amount),
          category: this.saveCategory(this.input_mutation, this.input_category),
          paymentmethod: PAYMENT_METHOD[this.input_paymentmethod],
        }),
      };
      console.log("add transaction", requestOption);

      await fetch("http://localhost:9090/add", requestOption)
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            this.Toast.showToast("Transaction added successfully", true);
          } else {
            this.Toast.showToast("Failed to add transaction", false);
          }
        })
        .catch((error) => {
          this.Toast.showToast("Failed to add transaction", false);
          console.log(error);
        });

      this.reset();
    },
  },
};
</script>

<style>
.mutation-type-input {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: fit-content;
  align-items: center;
  margin-bottom: 10px;
}

.category-input {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: fit-content;
  align-items: center;
  margin-bottom: 10px;
}

.payment-type-input {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: fit-content;
  align-items: center;
  margin-bottom: 10px;
}
</style>
