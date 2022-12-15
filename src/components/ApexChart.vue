<template>
  <div class="d-flex flex-wrap justify-content-center gap-5">
    <div>
      <h4>Income</h4>
      <apexchart
        width="500"
        type="line"
        :options="optionsIncome"
        :series="seriesIncome"
      ></apexchart>
    </div>
    <div>
      <h4>Outcome</h4>
      <apexchart
        width="500"
        type="line"
        :options="optionsOutcome"
        :series="seriesOutcome"
      ></apexchart>
    </div>
  </div>
</template>

<script>
import { useToolsStore, useCRUDStore } from "../stores/counter";

export default {
  setup() {
    const ToolsStore = useToolsStore();
    const CRUDStore = useCRUDStore();
    return {
      ToolsStore,
      CRUDStore,
    };
  },
  data() {
    return {
      optionsIncome: {
        chart: {
          height: 350,
          type: "line",
          stacked: true,
          animations: {
            enabled: true,
            easing: "linear",
            dynamicAnimation: {
              speed: 500,
            },
          },
          dropShadow: {
            enabled: true,
            opacity: 0.3,
            blur: 5,
          },
          toolbar: {
            enabled: true,
          },
          zoom: {
            enabled: true,
          },
        },
        plotOptions: {
          radialBar: {
            inverseOrder: false,
            hollow: {
              margin: 5,
              size: "48%",
              background: "transparent",
            },
            track: {
              show: true,
              background: "#40475D",
              strokeWidth: "10%",
              opacity: 1,
              margin: 3, // margin is in pixels
            },
          },
        },
        xaxis: {
          categories: [],
          // categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
        title: {
          text: "Income",
          align: "left",
          style: {
            fontSize: "12px",
          },
        },
        legend: {
          show: true,
          position: "left",
          offsetX: -30,
          offsetY: -10,
          formatter: function (val, opts) {
            return val + " - " + opts.w.globals.series[opts.seriesIndex] + "%";
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            type: "horizontal",
            shadeIntensity: 0.5,
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100],
          },
        },
      },
      seriesIncome: [
        {
          name: "income",
          // data: [30, 40, 45, 50, 49, 60, 70, 91],
          data: [],
        },
      ],
      optionsOutcome: {
        chart: {
          height: 350,
          type: "line",
          stacked: true,
          animations: {
            enabled: true,
            easing: "linear",
            dynamicAnimation: {
              speed: 500,
            },
          },
          dropShadow: {
            enabled: true,
            opacity: 0.3,
            blur: 5,
          },
          toolbar: {
            enabled: true,
          },
          zoom: {
            enabled: true,
          },
        },
        plotOptions: {
          radialBar: {
            inverseOrder: false,
            hollow: {
              margin: 5,
              size: "48%",
              background: "transparent",
            },
            track: {
              show: true,
              background: "#40475D",
              strokeWidth: "10%",
              opacity: 1,
              margin: 3, // margin is in pixels
            },
          },
        },
        xaxis: {
          categories: [],
          // categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
        title: {
          text: "Income",
          align: "left",
          style: {
            fontSize: "12px",
          },
        },
        legend: {
          show: true,
          position: "left",
          offsetX: -30,
          offsetY: -10,
          formatter: function (val, opts) {
            return val + " - " + opts.w.globals.series[opts.seriesIndex] + "%";
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            type: "horizontal",
            shadeIntensity: 0.5,
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100],
          },
        },
      },
      seriesOutcome: [
        {
          name: "income",
          // data: [30, 40, 45, 50, 49, 60, 70, 91],
          data: [],
        },
      ],
    };
  },
  beforeMount() {
    this.dynamicGraphic();
  },
  methods: {
    dynamicGraphic() {
      console.log("Change");
      let tempIncomesX = [];
      let tempOutcomesX = [];
      let tempIncomesData = [];
      let tempOutcomesData = [];

      this.CRUDStore.incomes.sort((a, b) => {
        return a.date - b.date;
      });

      this.CRUDStore.outcomes.sort((a, b) => {
        return a.date - b.date;
      });

      this.CRUDStore.outcomes.forEach((item) => {
        tempOutcomesX.push(item.date);
        tempOutcomesData.push(item.amount);
      });

      this.CRUDStore.incomes.forEach((item) => {
        tempIncomesX.push(item.date);
        tempIncomesData.push(item.amount);
      });

      this.optionsIncome = {
        xaxis: {
          categories: tempIncomesX,
        },
      };

      this.seriesIncome[0] = {
        ...this.seriesIncome[0],
        data: tempIncomesData,
      };

      this.optionsOutcome = {
        xaxis: {
          categories: tempOutcomesX,
        },
      };

      this.seriesOutcome[0] = {
        ...this.seriesOutcome[0],
        data: tempOutcomesData,
      };
    },
  },
  watch: {
    "CRUDStore.transactions": function () {
      this.dynamicGraphic();
    },
  },
};
</script>
