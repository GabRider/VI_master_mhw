<script>
import {Radar} from "vue-chartjs"
export default {
    name:"PlayerChart",
    extends: Radar,
    props:["displayed"],
    watch:
    {
        displayed(v){
          
          if (v==null)
            return
            console.log(v.values);
            this.chartData.datasets=[v.values];
            this.chartData.labels=v.labels;
             if(v.options!=undefined)
            {
               this.options=v.options;
                
            }
             this.renderChart(this.chartData,this.options)
        }
    },
    data () {
      return {
        chartData: {
          labels: [],
          datasets: []
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    mounted () {
    }
  }
  //https://www.positronx.io/create-awesome-charts-in-vue-js-with-chart-js-and-vue-chartjs/
</script>
