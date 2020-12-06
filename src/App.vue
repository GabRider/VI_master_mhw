<template>
   <div id="app" class="container-fluid h-100">
      <div
         id="stats"
         class="h-md-100 h-xl-100 h-lg-100"
         :class="{
            'col-lg-6 col-md-6 col-xl-6 col-sm-12 float-md-left float-lg-left float-xl-left': !overviewIsSelected,
            'col-12': overviewIsSelected,
         }"
      >
         <div class="row w-100">
            <SetManager
               :savedSets.sync="savedSets"
               :myCurrentSetName.sync="myCurrentSetName"
               :myCurrentArmorSet.sync="myCurrentArmorSet"
               :myCurrentWeapon.sync="myCurrentWeapon"
               :myCurrentSkills.sync="myCurrentSkills"
               :myCurrentCharm.sync="myCurrentCharm"
               id="anchorSetManager"
            />
         </div>

         <ChartsNav
            :infosForCharts="infosForCharts"
            v-on:tabIsOverview="overviewIsSelected = $event"
         ></ChartsNav>

         <div class="col-12" v-if="!this.overviewIsSelected">
            <CurrentSet
               :myCurrentArmorSet.sync="myCurrentArmorSet"
               :myCurrentWeapon.sync="myCurrentWeapon"
            />
         </div>
      </div>

      <div
         id="overviewItems"
         class="col-lg-6 col-md-6 col-xl-6 col-sm-12 h-100 float-md-left float-lg-left float-xl-left h-100"
         v-if="!this.overviewIsSelected"
      >
         <div id="itemsFilters" class="row h-20">
            <div class="px-3 mb-3 row">
               <ul class="nav nav-tabs" id="myTab" role="tablist">
                  <li class="nav-item" v-for="t in tabList" v-bind:key="t">
                     <a
                        class="nav-link"
                        :id="t + '-tab'"
                        data-toggle="tab"
                        href="#"
                        role="tab"
                        :aria-controls="t"
                        :aria-selected="t === tab"
                        :class="{ active: t === tab }"
                        @click="tab = t"
                        >{{ t }}</a
                     >
                  </li>
               </ul>
               <FiltersArmors
                  v-if="tab === 'armors'"
                  :allArmors.sync="allArmors"
                  :filteredArmors.sync="filteredArmors"
               />
               <FiltersWeapons
                  v-if="tab === 'weapons'"
                  :allWeapons.sync="allWeapons"
                  v-on:filteredWeapons="filteredWeapons = $event"
               />
               <FiltersSkills
                  v-if="tab === 'skills'"
                  :allSkills.sync="allSkills"
                  :filteredSkills.sync="filteredSkills"
               />
               <FiltersCharms
                  v-if="tab === 'charms'"
                  :allCharms.sync="allCharms"
                  :filteredCharms.sync="filteredCharms"
               />
            </div>
         </div>

         <div id="itemsDisplay" class="row h-80">
            <Armors
               v-if="tab === 'armors'"
               :armors.sync="filteredArmors"
               :myCurrentArmorSet.sync="myCurrentArmorSet"
            />
            <Weapons
               v-if="tab === 'weapons'"
               :weapons.sync="filteredWeapons"
               :myCurrentWeapon.sync="myCurrentWeapon"
            />
            <Skills
               v-if="tab === 'skills'"
               :skills.sync="filteredSkills"
               :myCurrentSkills.sync="myCurrentSkills"
            />
            <Charms
               v-if="tab === 'charms'"
               :charms.sync="filteredCharms"
               :myCurrentCharm.sync="myCurrentCharm"
            />
         </div>
      </div>
   </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import Armors from "./components/Stuff/Armors"
import Weapons from "./components/Stuff/Weapons"
import Skills from "./components/Stuff/Skills"
import Charms from "./components/Stuff/Charms"
import SelectedSkills from "./components/Stuff/SkillsSelectedCards"
import CurrentSet from "./components/Stuff/CurrentSet"
import FiltersArmors from "./components/MenusUI/FiltersArmors"
import FiltersWeapons from "./components/MenusUI/FiltersWeapons"
import FiltersSkills from "./components/MenusUI/FiltersSkills"
import FiltersCharms from "./components/MenusUI/FiltersCharms"
import SetManager from "./components/MenusUI/SetManager"
import ChartsNav from "./components/Charts/ChartsNav"
import * as radarFunc from "./scripts/RadarFunctions"
import * as InstantLoad from "./scripts/dev/InstantLoad"
import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"

console.log(InstantLoad.armors, InstantLoad.weapons)

export default {
   name: "App",
   components: {
      Weapons,
      Armors,
      Skills,
      Charms,
      FiltersArmors,
      FiltersWeapons,
      FiltersSkills,
      FiltersCharms,
      CurrentSet,
      ChartsNav,
      SetManager,
      SelectedSkills,
   },
   data() {
      return {
         allArmors: InstantLoad.armors.map(info => {
            info.name = info.name.replace("Alpha", "α")
            info.name = info.name.replace("Beta", "β")
            return info
         }),
         allWeapons: InstantLoad.weapons,
         allSkills: [],
         allCharms: [],
         tabList: ["armors", "weapons", "skills", "charms"],
         tab: "armors",
         filteredArmors: [],
         filteredWeapons: [],
         filteredSkills: [],
         filteredCharms: [],
         myCurrentSetName: "nameless",
         myCurrentArmorSet: [],
         myCurrentWeapon: [],
         myCurrentSkills: [],
         myCurrentCharm: [],
         savedSets: [],
         overviewIsSelected: false,
      }
   },
   watch: {
      allSkills(value) {
         console.log("allSkills", value)
      },
   },
   computed: {
      infosForCharts() {
         /*
            return object of type:
                "armors": {
                    allSetsStats: {
                        elementaryDefenses: {
                            title: String
                            labels: Array<String>
                            data: Array<Object> [
                                {
                                    setName: String,
                                    values: Array<Number>
                                }, 
                                {...}
                            ]
                        },
                        defense: {...},
                    },
                    currentStats: {...},
                },
                "weapon": {...},
                "all": {...},
            */
         const info = radarFunc.getInfoForAnyChart(
            this.myCurrentSetName,
            this.myCurrentArmorSet,
            this.myCurrentWeapon,
            this.myCurrentSkills,
            this.myCurrentCharm,
            this.savedSets,
            this.allSkills
         )
         console.log("info", info)
         return info
      },
   },
   methods: {},
   beforeCreate: function () {
      let t = this
      /*
      fetch("https://mhw-db.com/armor")
         .then(response => response.json())
         .then(armorPieces => {
            t.allArmors = armorPieces.map(info => {
               info.name = info.name.replace("Alpha", "α")
               info.name = info.name.replace("Beta", "β")
               return info
            })
            console.log("allArmors", t.allArmors)
         })

      fetch("https://mhw-db.com/weapons")
         .then(response => response.json())
         .then(weaponPieces => {
            t.allWeapons = weaponPieces
            console.log("weaponPieces", weaponPieces)
         })
      */

      fetch("https://mhw-db.com/skills")
         .then(response => response.json())
         .then(skills => {
            t.allSkills = skills
            console.log("skills", skills)
         })

      fetch("https://mhw-db.com/charms")
         .then(response => response.json())
         .then(charms => {
            t.allCharms = charms
            console.log("charms", charms)
         })
   },
}
</script>

<style>
html,
body {
   width: 100%;
   height: 100%;
}
#app {
   width: 100%;
   height: 100%;
   font-family: Avenir, Helvetica, Arial, sans-serif;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
   text-align: center;
   color: #2c3e50;
}

#itemsDisplay {
   height: 80%;
   overflow-y: auto;
   overflow-x: hidden;
}
</style>
