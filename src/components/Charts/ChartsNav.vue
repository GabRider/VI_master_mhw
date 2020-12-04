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
         <SkillsSelectedCards v-else-if="isSkillsActive" :skills="infosForCharts.all.currentStats.skills.data[0].values" />
      </div>
      <div v-if="this.active === 'Overview'">
         <div class="row">
            <div class="col-xl-4 col-lg-4 col-md-4 h-10" style="height: 10px">
               <BarChart :inputData="infosForCharts.all.allSetsStats.defense" :range="[0, 1000]" />
            </div>
            <div class="col-xl-4 col-lg-4 col-md-4">
               <RadarChart
                  :inputData="infosForCharts.all.allSetsStats.elementaryDefenses"
                  :range="[0, 20]"
               />
            </div>
            <div class="col-xl-4 col-lg-4 col-md-4">
               <h3>Skills</h3>
               <div class="row h-20">
                  <div class="px-3 mb-3 row">
                     <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item" v-for="t in infosForCharts.all.allSetsStats.skills.data" v-bind:key="t.setName">
                           <a
                              class="nav-link"
                              :id="t.setName + '-tab-skill'"
                              data-toggle="tab"
                              href="#"
                              role="tab"
                              :aria-controls="t.setName"
                              :aria-selected="t === tab"
                              :class="{ active: t === tab }"
                              @click="tab = t"
                              >{{ t.setName }}</a
                           >
                        </li>
                     </ul>
                  </div>
               </div>
               <SkillsSelectedCards :skills="this.tab.values" />
            </div>
         </div>
         <div class="row">
            <div class="col-xl-4 col-lg-4 col-md-4">
               <div></div>
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
import SkillsSelectedCards from "../Stuff/SkillsSelectedCards.vue"
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
      SkillsSelectedCards,
   },
   data() {
      return {
         tabsNames: ["Overview", "Defense", "Elementary defense", "Attack", "Skills"],
         active: "Elementary defense",
         tab:"",
         
      }
   },
   watch: {
      active(v) {
         this.$emit("tabIsOverview", v === "Overview")
         if (v === "Overview") 
            this.tab = this.infosForCharts.all.allSetsStats.skills.data[0]
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
      isSkillsActive() {
         const isActive = "Skills" === this.active || "Overview" === this.active
         return isActive
      },
      
   },
}
</script>