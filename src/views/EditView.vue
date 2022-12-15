<template>
  <h1>Edit Transaction</h1>
  <!-- {{CRUDStore.transactions}} -->
  <button class="btn-back" @click="$router.go(-1)">Back</button>
  <div class="form">
    <form id="new-transaction-form" @submit.prevent="saveChanges()">
      <div class="title-input">
        <h3>Title</h3>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Add your transaction..."
          v-model="input_title"
          required
        />
      </div>

      <h3>Mutation Type</h3>
      <div class="mutation-type-input">
        <label>
          <input
            type="radio"
            name="mutation"
            id="mutation-income"
            value="Income"
            v-model="input_mutation"
            required
          />
          <span class="bubble income"></span>
          <div>Income</div>
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
          <span class="bubble outcome"></span>
          <div>Outcome</div>
        </label>
      </div>

      <div class="date-input">
        <h3>Date</h3>
        <input
          type="date"
          name="date"
          id="date"
          v-model="input_date"
          required
        />
      </div>

      <div class="amount-input">
        <h3>How Much?</h3>
        <input
          type="amount"
          name="amount"
          id="amount"
          placeholder="Amount of Money"
          v-model="input_amount"
          required
        />
      </div>

      <div class="category-input" v-if="input_mutation == 'Income'">
        <h3>Income Category</h3>
        <br />
        <input
          type="radio"
          name="category"
          id="category-income"
          value="Salary"
          v-model="input_category"
          required
        />
        <span class="bubble Salary"></span>
        <div>Salary</div>

        <input
          type="radio"
          name="category"
          id="category-income"
          value="Side Hustle"
          v-model="input_category"
          required
        />
        <span class="bubble Side Hustle"></span>
        <div>Side Hustle</div>

        <input
          type="radio"
          name="category"
          id="category-income"
          value="Other"
          v-model="input_category"
          required
        />
        <span class="bubble Other"></span>
        <div>Other</div>
      </div>

      <div class="category-input" v-if="input_mutation == 'Outcome'">
        <h3>Outcome Category</h3>
        <input
          type="radio"
          name="category"
          id="category-outcome"
          value="Food and Drink"
          v-model="input_category"
          required
        />
        <span class="bubble Food and Drink"></span>
        <div>Food and Drink</div>

        <input
          type="radio"
          name="category"
          id="category-outcome"
          value="Rent"
          v-model="input_category"
          required
        />
        <span class="bubble Rent"></span>
        <div>Rent</div>

        <input
          type="radio"
          name="category"
          id="category-outcome"
          value="Transportation"
          v-model="input_category"
          required
        />
        <span class="bubble transportation"></span>
        <div>Transportation</div>

        <input
          type="radio"
          name="category"
          id="category-outcome"
          value="Subscription"
          v-model="input_category"
          required
        />
        <span class="bubble Subscription"></span>
        <div>Subscription</div>

        <input
          type="radio"
          name="category"
          id="category-outcome"
          value="Internet"
          v-model="input_category"
          required
        />
        <span class="bubble Internet"></span>
        <div>Internet</div>

        <input
          type="radio"
          name="category"
          id="category-outcome"
          value="Grocery"
          v-model="input_category"
          required
        />
        <span class="bubble Grocery"></span>
        <div>Grocery</div>

        <input
          type="radio"
          name="category"
          id="category-outcome"
          value="Entertainment"
          v-model="input_category"
          required
        />
        <span class="bubble Entertainment"></span>
        <div>Entertainment</div>

        <input
          type="radio"
          name="category"
          id="category-outcome"
          value="Clothing"
          v-model="input_category"
          required
        />
        <span class="bubble Clothing"></span>
        <div>Clothing</div>

        <input
          type="radio"
          name="category"
          id="category-outcome"
          value="Furniture"
          v-model="input_category"
          required
        />
        <span class="bubble Furniture"></span>
        <div>Furniture</div>
      </div>

      <div class="payment-type-input">
        <h3>Payment Type</h3>
        <input
          type="radio"
          name="payment"
          id="payment"
          value="Bank Transfer"
          v-model="input_paymentmethod"
          required
        />
        <span class="bubble Bank Transfer"></span>
        <div>Bank Transfer</div>

        <input
          type="radio"
          name="payment"
          id="payment"
          value="Cash"
          v-model="input_paymentmethod"
          required
        />
        <span class="bubble Cash"></span>
        <div>Cash</div>

        <input
          type="radio"
          name="payment"
          id="payment"
          value="Dana"
          v-model="input_paymentmethod"
          required
        />
        <span class="bubble Dana"></span>
        <div>Dana</div>

        <input
          type="radio"
          name="payment"
          id="payment"
          value="Shopee Pay"
          v-model="input_paymentmethod"
          required
        />
        <span class="bubble ShopeePay"></span>
        <div>Shopee Pay</div>

        <input
          type="radio"
          name="payment"
          id="payment"
          value="GoPay"
          v-model="input_paymentmethod"
          required
        />
        <span class="bubble GoPay"></span>
        <div>GoPay</div>

        <input
          type="radio"
          name="payment"
          id="payment"
          value="OVO"
          v-model="input_paymentmethod"
          required
        />
        <span class="bubble OVO"></span>
        <div>OVO</div>
      </div>

      <input type="submit" value="Save Changes" />
    </form>
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

export default {
  name: "EditView",
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
    const CRUDStore = useCRUDStore();
    const ToolsStore = useToolsStore();
    return {
      ToolsStore,
      CRUDStore,
    };
  },
  mounted() {
    this.load();
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
    saveCategory(mutation, category) {
      let kategori;
      if (mutation == "Income") {
        kategori = INCOME_CATEGORY[category];
      } else if (mutation == "Outcome") {
        kategori = OUTCOME_CATEGORY[category];
      }
      return kategori;
    },
    dateToEpoch(date) {
      var parts = date.split("-");
      var mydate = new Date(parts[0], parts[1] - 1, parts[2]);
      return mydate.getTime().toString();
    },
    async load() {
      try {
        const params_id = this.$route.params.id;
        this.CRUDStore.transactions.forEach((element) => {
          if (element.id == params_id) {
            console.log(element);
            this.input_title = element.title;
            this.input_date = this.dateToEpoch(element.date);
            console.log("elementdate", element.date);
            console.log("inputdate", this.input_date);
            this.input_mutation = element.mutation;
            this.input_amount = element.amount;
            this.input_category = element.category;
            this.input_paymentmethod = element.paymentMethod;
          }
        });
        // const querySnapshot = await getDoc(doc(db, "MoneyTracker", id));

        // let utcSeconds = querySnapshot.data().date;
        // let d = new Date(parseInt(utcSeconds));

        // this.input_title = querySnapshot.data().title;
        // this.input_mutation = this.ToolsStore.convertToText(
        //   MUTATION,
        //   querySnapshot.data().mutation
        // );

        // if (d.getMonth() + 1 < 10) {
        //   if (d.getDate() < 10) {
        //     this.input_date =
        //       d.getFullYear() + "-0" + (d.getMonth() + 1) + "-0" + d.getDate();
        //   } else {
        //     this.input_date =
        //       d.getFullYear() + "-0" + (d.getMonth() + 1) + "-" + d.getDate();
        //   }
        // } else {
        //   if (d.getDate() < 10) {
        //     this.input_date =
        //       d.getFullYear() + "-" + (d.getMonth() + 1) + "-0" + d.getDate();
        //   } else {
        //     this.input_date =
        //       d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
        //   }
        // }
        // this.input_amount = querySnapshot.data().amount;
        // this.input_category = this.checkMutationCategory(
        //   querySnapshot.data().mutation,
        //   querySnapshot.data().category
        // );
        // this.input_paymentmethod = this.ToolsStore.convertToText(
        //   PAYMENT_METHOD,
        //   querySnapshot.data().paymentmethod
        // );
      } catch (err) {
        console.log(err.message);
      }
    },
    async saveChanges() {
      const requestOption = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: this.input_title,
          date: this.dateToEpoch(this.input_date),
          amount: parseInt(this.input_amount),
          mutation: MUTATION[this.input_mutation],
          category: this.saveCategory(this.input_mutation, this.input_category),
          paymentmethod: PAYMENT_METHOD[this.input_paymentmethod],
        }),
      };

      const id = this.$route.params.id;

      const link = "http://localhost:9090/edit?id=" + id;

      fetch(link, requestOption).then((response) => console.log(response));

      // try {
      //   const id = this.$route.params.id;
      //   await updateDoc(doc(db, "MoneyTracker", id), {
      //     title: this.input_title,
      //     date: this.dateToEpoch(this.input_date),
      //     amount: parseInt(this.input_amount),
      //     mutation: MUTATION[this.input_mutation],
      //     category: this.saveCategory(this.input_mutation, this.input_category),
      //     paymentmethod: PAYMENT_METHOD[this.input_paymentmethod],
      //   });
      // } catch (err) {
      //   console.log(err.message);
      // }
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
