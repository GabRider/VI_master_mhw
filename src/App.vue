<template>
   <div id="app" class="container-fluid h-100"         
>
      <div
         id="stats"
         class="h-md-100 h-xl-100 h-lg-100"
         :class="{'col-lg-6 col-md-6 col-xl-6 col-sm-12 float-md-left float-lg-left float-xl-left' : !overviewIsSelected,
         'col-12': overviewIsSelected}"
         
      >
         <div class="row w-100">
            <SetManager
               :savedSets.sync="savedSets"
               :myCurrentArmorSet.sync="myCurrentArmorSet"
               :myCurrentWeapon.sync="myCurrentWeapon"
               :myCurrentSetName.sync="myCurrentSetName"
               id="anchorSetManager"
            />
         </div>

         <ChartsNav :infosForCharts="infosForCharts"  v-on:tabIsOverview="overviewIsSelected=$event"></ChartsNav>

         <div class="col-12 " v-if="!this.overviewIsSelected">
            <CurrentSet
               :myCurrentArmorSet.sync="myCurrentArmorSet"
               :myCurrentWeapon.sync="myCurrentWeapon"
               id="anchorSets"
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
                  <li class="nav-item">
                     <a
                        class="nav-link active"
                        id="armors-tab"
                        data-toggle="tab"
                        href="#"
                        role="tab"
                        aria-controls="armors"
                        aria-selected="true"
                        @click="tab = 'armors'"
                        >Armors</a
                     >
                  </li>
                  <li class="nav-item">
                     <a
                        class="nav-link"
                        id="weapons-tab"
                        data-toggle="tab"
                        href="#"
                        role="tab"
                        aria-controls="weapons"
                        aria-selected="false"
                        @click="tab = 'weapons'"
                        >Weapons</a
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
         </div>
      </div>
   </div>
</template>

<script>
/* eslint-disable */
import Armors from "./components/Armors"
import Weapons from "./components/Weapons"
import FiltersArmors from "./components/FiltersArmors"
import FiltersWeapons from "./components/FiltersWeapons"
import CurrentSet from "./components/CurrentSet.vue"
import ChartsNav from "./components/ChartsNav.vue"
import * as radarFunc from "./scripts/RadarFunctions"
import * as InstantLoad from "./scripts/dev/InstantLoad"
import WeaponCard from "./components/WeaponCard.vue"
import SetManager from "./components/SetManager.vue"
import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"

console.log(InstantLoad.armors, InstantLoad.weapons)

export default {
   name: "App",
   components: {
      Weapons,
      Armors,
      FiltersArmors,
      FiltersWeapons,
      CurrentSet,
      ChartsNav,
      WeaponCard,
      SetManager,
   },
   data() {
      return {
         allArmors: InstantLoad.armors.map(info => {
            info.name = info.name.replace("Alpha", "α")
            info.name = info.name.replace("Beta", "β")
            return info
         }),
         allWeapons: InstantLoad.weapons,
         tab: "armors",
         filteredArmors: [],
         filteredWeapons: [],
         myCurrentSetName: "nameless",
         myCurrentArmorSet: [],
         myCurrentWeapon: [],
         savedSets: [],
         overviewIsSelected:false,
      }
   },
   watch: {},
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
            this.savedSets
         )
         console.log("info", info)
         return info
      },
   },
   methods: {},
   beforeCreate: function () {
      /*
      let t = this

      fetch("https://mhw-db.com/armor")
         .then(response => response.json())
         .then(armorPieces => {
            t.allArmors = armorPieces.map(info => {
               info.name = info.name.replace("Alpha", "α")
               info.name = info.name.replace("Beta", "β")
               return info
            })
         })

      fetch("https://mhw-db.com/weapons")
         .then(response => response.json())
         .then(weaponPieces => {
            t.allWeapons = weaponPieces
         })
      */
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
