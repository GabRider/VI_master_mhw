<template>
    <Plotly :data="data" :layout="layout" :display-mode-bar="false"></Plotly>
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
import { Plotly } from 'vue-plotly'

export default {
  name: "PlayerChart",
  components: {
    Plotly
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
  },
  watch: {
    inputData() {
      this.display();
    },
  },
  data(){
    return {
        
        data:[],
    layout:{
      polar: {
    radialaxis: {
      visible: true,
      range: [0, 20]
    }
  },
  showlegend: true
    }
    }
  }
  ,
  methods:{
      display() {
      if (this.inputData.data.length === 0) return;
      this.data = this.inputData.data.map((e) =>
        this.formattingData(e.values, e.setName,this.inputData.labels)
      );
    },
      formattingData(values, label,labels) {
          let hoverSurface =""
        values.forEach((x,i) => (hoverSurface+=labels[i]+" :" + (x < 0 && !this.displayNegatif ? 0 : x)+"<br>"))
        console.log(hoverSurface);
      return {
        type: 'scatterpolar',
        r: values.map((x) => (x < 0 && !this.displayNegatif ? 0 : x)),
        theta: labels,
        text: hoverSurface,
        hovertemplate: 'adadasdas',
        fill: 'toself',
        name: label,
      };
    },
  }
}//https://www.positro   nx.io/create-awesome-charts-in-vue-js-with-chart-js-and-vue-chartjs/
</script>
