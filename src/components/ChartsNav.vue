<template>
   <div>
      <div class="px-3 mb-3">
         <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li v-for="name in tabsNames" v-bind:key="name" class="nav-item">
               <a
                  class="nav-link"
                  id="armors-tab"
                  data-toggle="tab"
                  href="#"
                  role="tab"
                  @click="active = name"
                  :class="{ active: name === active }"
                  >{{ name }}</a
               >
            </li>
         </ul>
      </div>
      <div v-if="this.active !== 'Overview'">
         <BarChart
            v-if="isDefenseActive"
            :inputData="infosForCharts.all.allSetsStats.defense"
            :range="[0, 1000]"
         />

         <RadarChart
            v-else-if="isElementaryActive"
            :inputData="infosForCharts.all.allSetsStats.elementaryDefenses"
            :range="[0, 20]"
         />

         <BarChart
            v-else-if="isAttackActive"
            :inputData="infosForCharts.all.allSetsStats.attack"
            :range="[0, 1000]"
         />
      </div>
      <div v-if="this.active === 'Overview'">
         <div class="row">
            <div class="col-xl-4 col-lg-4 col-md-4">
               <BarChart :inputData="infosForCharts.all.allSetsStats.defense" :range="[0, 1000]" />
            </div>
            <div class="col-xl-4 col-lg-4 col-md-4">
               <RadarChart
                  :inputData="infosForCharts.all.allSetsStats.elementaryDefenses"
                  :range="[0, 20]"
               />
            </div>
            <div class="col-xl-4 col-lg-4 col-md-4"   >
               <BarChart :inputData="infosForCharts.all.allSetsStats.attack" :range="[0, 1000]" />
            </div>
         </div>
      </div>
   </div>
</template>



<script>
/*
Output events :

attack : attack, tranchant, affinité, seau des anciens, element

*/
import RadarChart from "./RadarChart.vue"
import BarChart from "./BarChart.vue"

export default {
   name: "ChartsNav",
   props: {
      infosForCharts: {
         // input
         type: Object,
      },
   },
   components: {
      RadarChart,
      BarChart,
   },
   data() {
      return {
         tabsNames: ["Overview", "Defense", "Elementary defense", "Attack"],
         active: "Elementary defense",
      }
   },
   watch: {
      active(v) {
         this.$emit("tabIsOverview", v === "Overview")
      },
   },
   methods: {},
   computed: {
      isDefenseActive() {
         const isElementInInfos = this.infosForCharts.all.allSetsStats.defense !== undefined
         const isActive = "Defense" === this.active || "Overview" === this.active

         return isActive && isElementInInfos
      },
      isElementaryActive() {
         const isElementInInfos =
            this.infosForCharts.all.allSetsStats.elementaryDefenses !== undefined
         const isActive = "Elementary defense" === this.active || "Overview" === this.active
         console.log(isActive)
         return isActive && isElementInInfos
      },
      isAttackActive() {
         const isElementInInfos = this.infosForCharts.all.allSetsStats.attack !== undefined
         const isActive = "Attack" === this.active || "Overview" === this.active
         return isActive && isElementInInfos
      },
   },
}
</script>