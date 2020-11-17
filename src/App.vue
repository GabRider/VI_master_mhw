<template>
    <div id="app">
        <PlayerChart :displayed="[this.infoChart.elementaryDefenses]" />
        <ArmorSet :myCurrentArmorSet.sync="myCurrentArmorSet"></ArmorSet>

        <div>
            <div class="row card-columns">
                <WeaponCard
                    v-for="weapon in myCurrentWeapon"
                    v-bind:key="weapon.id"
                    :piece="weapon"
                    :myCurrentWeapon.sync="myCurrentWeapon"
                ></WeaponCard>
            </div>
        </div>

        <SetManager></SetManager>

        <div class="px-3 mb-3">
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
        </div>

        <div class="px-3">
            <div v-if="tab === 'armors'">
                <FiltersArmors
                    :allArmors.sync="allArmors"
                    :filteredArmors.sync="filteredArmors"
                ></FiltersArmors>
                <Armors
                    :armors.sync="filteredArmors"
                    :myCurrentArmorSet.sync="myCurrentArmorSet"
                ></Armors>
            </div>
            <div v-if="tab === 'weapons'">
                <FiltersWeapons
                    :allWeapons.sync="allWeapons"
                    v-on:filteredWeapons="filteredWeapons = $event"
                ></FiltersWeapons>
                <Weapons
                    :weapons.sync="filteredWeapons"
                    :myCurrentWeapon.sync="myCurrentWeapon"
                ></Weapons>
            </div>
        </div>
    </div>
</template>

<script>
import Armors from "./components/Armors"
import Weapons from "./components/Weapons"
import FiltersArmors from "./components/FiltersArmors"
import FiltersWeapons from "./components/FiltersWeapons"
import ArmorSet from "./components/ArmorSet.vue"
import PlayerChart from "./components/PlayerChart.vue"
import * as radarFunc from "./scripts/RadarFunctions"
import * as InstantLoad from "./scripts/dev/InstantLoad"
import WeaponCard from "./components/WeaponCard.vue"
import SetManager from "./components/SetManager.vue"

console.log(InstantLoad.armors, InstantLoad.weapons)

export default {
    name: "App",
    components: {
        Weapons,
        Armors,
        FiltersArmors,
        FiltersWeapons,
        ArmorSet,
        PlayerChart,
        WeaponCard,
        SetManager,
    },
    data() {
        return {
            allArmors: InstantLoad.armors,
            allWeapons: InstantLoad.weapons,
            tab: "armors",
            filteredArmors: [],
            filteredWeapons: [],
            myCurrentArmorSet: [],
            myCurrentWeapon: [],
            infoChart: {},
            savedSets: [],
        }
    },
    watch: {
        myCurrentArmorSet(value) {
            this.infoChart = radarFunc.getInfoForAnyChart(value)
        },
    },
    methods: {
        test(e) {
            console.log("### TEST", e)
        },
    },
    beforeCreate: function () {
        /*
        let t = this
        
        
        fetch("https://mhw-db.com/armor")
            .then(response => response.json())
            .then(armorPieces => {
                t.allArmors = armorPieces
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
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
html,
body {
    max-width: 100%;
    overflow-x: hidden;
}
</style>
