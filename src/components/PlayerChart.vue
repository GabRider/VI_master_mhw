<script>
import { Radar } from "vue-chartjs";
export default {
  name: "PlayerChart",
  extends: Radar,
  props: ["displayed", "negatifDisplayed"],
  watch: {
    displayed(v) {
      if (v[0] == undefined) return;
      this.chartData.datasets = this.formatValuesRadar(
        v.map((x) => x.values),
        v[0].name
      );
      console.log(this.chartData.datasets);
      this.chartData.labels = v[0].labels;
      this.renderChart(this.chartData, this.options);
    },

    negatifDisplayed(v) {
      this.displayNegatif = v;
      if (this.displayed[0] == undefined) return;
      this.chartData.datasets = this.formatValuesRadar(
        this.displayed.map((x) => x.values),
        this.displayed[0].name
      );
      this.renderChart(this.chartData, this.options);
    },
  },
  data() {
    return {
      backgroundColorRadar: [
        "rgba(255, 0, 0, 0.4)",
        "rgba(0, 0, 255, 0.4)",
        "rgba(60, 179, 113, 0.4)",
        "rgba(255, 255, 0, 0.4)",
        "rgba(0, 0, 0, 0.4)",
      ],
      chartData: {
        labels: [],
        datasets: [],
      },
      displayNegatif: false,
      options: {
        //https://www.chartjs.org/docs/latest/axes/radial/linear.html#tick-options
        responsive: false,
      },
    };
  },
  mounted() {},
  methods: {
    formatValuesRadar(values, label) {
      let final = values.map((data, index) => {
        return {
          label: label + index,
          borderWidth: 1,
          fill: true,
          backgroundColor: this.backgroundColorRadar[index],
          data: data.map((x) => {
            if (x < 0 && !this.displayNegatif) return 0;
            else return x;
          }),
        };
      });
      this.options = {
        pointDot: false,
        tooltips: {
          callbacks: {
            title: function (tooltipItems, data) {
              console.log("tooltip");
              console.log(tooltipItems);
              console.log("data");
              console.log(data);
              if (tooltipItems[0].yLabel != 0)
                return data.labels[tooltipItems[0].index];
 
              let res = "";

              Object.entries(tooltipItems).forEach(
                (key) => {
                  if(!res.includes(data.labels[key[1].index]))
                  res += data.labels[key[1].index]+", "}
              );
               
              
              return res.slice(0, -2);
            },
          },
        },
        legend: {
          labels: {
            fontSize: 14,
          },
        },

        scale: {
          pointLabels: {
            fontSize: 15,
          },
          ticks: {
            min: 0,
            max: 20,
            stepSize: 2,
          },
        },
      };
      return final;
    },
  },
};
//https://www.positronx.io/create-awesome-charts-in-vue-js-with-chart-js-and-vue-chartjs/
</script>
