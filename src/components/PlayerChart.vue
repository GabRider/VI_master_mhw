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
import { Radar } from "vue-chartjs"

export default {
    name: "PlayerChart",
    extends: Radar,
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
            this.display()
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
                labels: this.inputData.labels,
                datasets: [],
            },
            options: {
                title: {
                    display: true,
                    text: this.inputData.title,
                },
                pointDot: false,
                tooltips: {
                    callbacks: {
                        title: function (tooltipItems, data) {
                            if (tooltipItems[0].yLabel != 0)
                                return data.labels[tooltipItems[0].index]

                            let res = ""

                            Object.entries(tooltipItems).forEach(key => {
                                if (!res.includes(data.labels[key[1].index]))
                                    res += data.labels[key[1].index] + ", "
                            })

                            return res.slice(0, -2)
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
                        stepSize: 4,
                    },
                },
            },
        }
    },
    methods: {
        display() {
            if (this.inputData.data.length === 0) return

            this.chartData.datasets = this.inputData.data.map((e, i) =>
                this.formattingData(e.values, e.setName, this.backgroundColorRadar[i])
            )
            this.renderChart(this.chartData, this.options)
        },
        formattingData(values, label, color) {
            return {
                label: label,
                borderWidth: 1,
                fill: true,
                backgroundColor: color,
                data: values.map(x => (x < 0 && !this.displayNegatif ? 0 : x)),
            }
        },
    },
    mounted() {
        this.display()
    },
}
//https://www.positronx.io/create-awesome-charts-in-vue-js-with-chart-js-and-vue-chartjs/
</script>
