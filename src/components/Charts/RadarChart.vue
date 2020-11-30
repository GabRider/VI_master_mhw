<template>
   <div>
      <Plotly :data="data" :layout="layout" :display-mode-bar="false"></Plotly>
   </div>
</template>
<script>
/*
Input inputData Object format :
{
    title: String
    labels: Array<String>
    data: Array<Object> [
        {
        setName: String,
        values: Array<Number>
        }, 
        {...}
    ]
}
*/
import { Plotly } from "vue-plotly"

export default {
   name: "RadarChart",
   components: {
      Plotly,
   },
   props: {
      inputData: {
         // input
         type: Object,
      },
      displayNegatif: {
         type: Boolean,
         default: false,
      },
      range: {
         type: Array,
      },
   },
   watch: {
      inputData() {
         this.display()
      },
   },
   data() {
      return {
         data: [],
         layout: {
            title:{
               text:"undefined"
            },
            margin: {
               l: 50,
               r: 50,
               b: 50,
               t: 50,
               pad: 4,
            },
            polar: {
               radialaxis: {
                  visible: true,
                  range: this.range,
               },
            },
            showlegend: true,
         },
      }
   },
   methods: {
      display() {
         if (this.inputData.data.length === 0) return
         this.layout.title.text= this.inputData.title
         this.layout.polar.radialaxis.range = this.range
         this.data = this.inputData.data.map(e =>
            this.formattingData(e.values, e.setName, this.inputData.labels)
         )
      },
      formattingData(values, label, labels) {
         let hoverSurface = ""
         values.forEach(
            (x, i) =>
               (hoverSurface += labels[i] + " :" + (x < 0 && !this.displayNegatif ? 0 : x) + "<br>")
         )
         return {
            type: "scatterpolar",
            r: values.map(x => (x < 0 && !this.displayNegatif ? 0 : x)),
            theta: labels,
            text: hoverSurface,
            hovertemplate: "%{theta} : %{r}",
            fill: "toself",
            name: label,
         }
      },
   },
   mounted() {
      this.display()
   },
} //https://www.positro   nx.io/create-awesome-charts-in-vue-js-with-chart-js-and-vue-chartjs/
</script>
