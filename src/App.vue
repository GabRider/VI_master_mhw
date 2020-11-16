<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png" />
        <PlayerChart :displayed="[this.infoChart.elementaryDefenses]" />
        <ArmorSet
            :myCurrentArmorSet.sync="myCurrentArmorSet"
            v-on:selectPiece="handleSelectPiece"
            v-on:unselectPiece="handleUnselectPiece"
        ></ArmorSet>
        
        <div>
            <div class="row card-columns">
                <WeaponCard
                    v-for="weapon in myCurrentWeapon"
                    v-bind:key="weapon.id"
                    :piece="weapon"
                    :myCurrentWeaponInput.sync="myCurrentWeapon"
                    v-on:selectPiece="handleSelectWeapon"
                    v-on:unselectPiece="handleUnselectWeapon"
                ></WeaponCard>
            </div>
        </div>

        <div class="mb-3">
            <div class="form-check form-check-inline">
                <input
                    class="form-check-input"
                    type="checkbox"
                    id="display1"
                    v-model="displayArmors"
                />
                <label class="form-check-label" for="display1">Display Armors</label>
            </div>
            <div class="form-check form-check-inline">
                <input
                    class="form-check-input"
                    type="checkbox"
                    id="display2"
                    v-model="displayWeapons"
                />
                <label class="form-check-label" for="display2">Display Weapons</label>
            </div>
        </div>

        <div class="pl-3 px-3">
            <div v-if="displayArmors">
                <FiltersArmors
                    :allArmors.sync="allArmors"
                    v-on:filteredArmors="filteredArmors = $event"
                ></FiltersArmors>
                <Armors
                    :armors.sync="filteredArmors"
                    :myCurrentArmorSet="myCurrentArmorSet"
                    v-on:selectPiece="handleSelectPiece"
                    v-on:unselectPiece="handleUnselectPiece"
                ></Armors>
            </div>
            <div v-if="displayWeapons">
                <FiltersWeapons
                    :allWeapons.sync="allWeapons"
                    v-on:filteredWeapons="filteredWeapons = $event"
                ></FiltersWeapons>
                <Weapons
                    :weapons.sync="filteredWeapons"
                    :myCurrentWeapon.sync="myCurrentWeapon"
                    v-on:selectPiece="handleSelectWeapon"
                    v-on:unselectPiece="handleUnselectWeapon"
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
    },
    data() {
        return {
            allArmors: InstantLoad.armors,
            allWeapons: InstantLoad.weapons,
            displayArmors: false,
            displayWeapons: false,
            filteredArmors: [],
            filteredWeapons: [],
            myCurrentArmorSet: [],
            myCurrentWeapon: [],
            infoChart: {},
        }
    },
    watch: {
        myCurrentArmorSet(value) {
            
            this.infoChart = radarFunc.getInfoForAnyChart(value)
        },
/*
        allArmors(value) {
            console.log("allArmors change in ", this.$options.name, value)
        },
        allWeapons(value) {
            console.log("allWeapons change in ", this.$options.name, value)
        },
        filteredArmors(value) {
            console.log("filteredArmors change in ", this.$options.name, value)
        },
        */
    },
    methods: {
        handleSelectPiece(piece) {
           // console.log("Selected armor", piece)
            if (!this.myCurrentArmorSet.some(a => a.id === piece.id)) {
                let tmp = this.myCurrentArmorSet.filter(e => e.type !== piece.type)
                tmp.push(piece)
                this.myCurrentArmorSet = tmp
            }
        },
        handleUnselectPiece(piece) {
           // console.log("Unselected armor", piece)
            if (this.myCurrentArmorSet.some(a => a.id === piece.id)) {
                this.myCurrentArmorSet = this.myCurrentArmorSet.filter(a => a.id !== piece.id)
            }
        },
        handleSelectWeapon(piece) {
            this.myCurrentWeapon = [piece]
           // console.log("Selected Weapon", this.myCurrentWeapon)
        },
        handleUnselectWeapon() {
           // console.log("Unselected Weapon", piece)
            this.myCurrentWeapon = []
        },

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
    margin-top: 60px;
}
html,
body {
    max-width: 100%;
    overflow-x: hidden;
}
</style>
