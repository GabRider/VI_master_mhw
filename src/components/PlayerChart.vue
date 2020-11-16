<script>
import {Radar} from "vue-chartjs"
export default {
    name:"PlayerChart",
    extends: Radar,
    props:["displayed"],
    watch:
    {
        displayed(v){
          
          if (v[0]==undefined)
            return
            console.log(v.map(x=>x.values));
            this.chartData.datasets=this.formatValuesRadar(v.map(x=>x.values),v[0].name);
            this.chartData.labels=v[0].labels;
             this.renderChart(this.chartData,this.options)
        }
    },
    data () {
      return {
        backgroundColorRadar:['rgba(54, 162, 235, 0.2)','rgba(54, 162, 235, 0.2)','rgba(255, 189, 189, 0.64)'],
        chartData: {
          labels: [],
          datasets: []
        },
        options: {
          //https://www.chartjs.org/docs/latest/axes/radial/linear.html#tick-options
          responsive: false,
          
      }
    }
    },
    mounted () {
    }
    ,
    methods:{
      formatValuesRadar(values,label){
          let final=values.map((data,index)=>
        {
return {
  "label":label+index,
        "borderWidth": 1,
        "backgroundColor":this.backgroundColorRadar[index], 
        "data":data
        }

        })
        this.options={
          gridLines:{
            zeroLineWidth:2000
          },
         scale: {
            ticks: {
                min: 0,
                max: 20,
                stepSize:2

            }
        }
    }
    return final;
      }
    }
  }
  //https://www.positronx.io/create-awesome-charts-in-vue-js-with-chart-js-and-vue-chartjs/
</script>
