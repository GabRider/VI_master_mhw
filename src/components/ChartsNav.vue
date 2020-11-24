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
                  :class="{'active': name === active}"
                  >{{ name }}</a
               >
            </li>
         </ul>
      </div>

      <PlayerChart
         v-if="isDefenseActive"
         :inputData="infosForCharts.all.allSetsStats.defense"
         :range="[0, 1000]"
      />

      <PlayerChart
         v-else-if="isElementaryActive"
         :inputData="infosForCharts.all.allSetsStats.elementaryDefenses"
         :range="[0, 20]"
      />

      <PlayerChart
         v-else-if="isAttackActive"
         :inputData="infosForCharts.all.allSetsStats.attack"
         :range="[0, 1000]"
      />
   </div>
</template>



<script>
/*
Output events :
*/
import PlayerChart from "./PlayerChart.vue"
export default {
   name: "ChartsNav",
   props: {
      infosForCharts: {
         // input
         type: Object,
      },
   },
   components: {
      PlayerChart,
   },
   data() {
      return {
         tabsNames: ["Defense", "Elementary defense", "Attack"],
         active: "Elementary defense"
      }
   },
   watch: {},
   methods: {},
   computed: {
      isDefenseActive() {
         const isElementInInfos = this.infosForCharts.all.allSetsStats.defense !== undefined
         const isActive = "Defense" === this.active
         return isActive && isElementInInfos
      },
      isElementaryActive() {
         const isElementInInfos = this.infosForCharts.all.allSetsStats.elementaryDefenses !== undefined
         const isActive = "Elementary defense" === this.active
         return isActive && isElementInInfos
      },
      isAttackActive() {
         const isElementInInfos = this.infosForCharts.all.allSetsStats.attack !== undefined
         const isActive = "Attack" === this.active
         return isActive && isElementInInfos
      }
   }
}
</script>