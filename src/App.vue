<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png" />
        <PlayerChart :displayed="this.infoChart.elementaryDefenses"/>
        <ArmorSet
            :myCurrentArmorSet.sync="myCurrentArmorSet"
            v-on:selectPiece="handleSelectPiece"
            v-on:unselectPiece="handleUnselectPiece"
        ></ArmorSet>
        <div>
            <div><b>Current Weapon :</b></div>
            <div class="row card-columns ml-2">
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

        <div>
            <p>display Armors :</p>
            <input type="checkbox" v-model="displayArmors" />
        </div>
        <div>
            <p>display Weapons :</p>
            <input type="checkbox" v-model="displayWeapons" />
        </div>

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
            <Weapons
                :weapons.sync="allWeapons"
                :myCurrentWeapon.sync="myCurrentWeapon"
                v-on:selectPiece="handleSelectWeapon"
                v-on:unselectPiece="handleUnselectWeapon"
            ></Weapons>
        </div>
    </div>
</template>

<script>
/*eslint no-unused-vars: "off"*/
import Armors from "./components/Armors"
import Weapons from "./components/Weapons"
import FiltersArmors from "./components/FiltersArmors"
import ArmorSet from "./components/ArmorSet.vue"
import PlayerChart from "./components/PlayerChart.vue"
import * as radarFunc from "./scripts/RadarFunctions"
import WeaponCard from "./components/WeaponCard.vue"

export default {
    name: "App",
    components: {
        Weapons,
        Armors,
        FiltersArmors,
        ArmorSet,
        PlayerChart,
        WeaponCard,
    },
    data() {
        return {
            allArmors: [],
            allWeapons: [],
            displayArmors: false,
            displayWeapons: false,
            filteredArmors: [],
            filteredWeapons: [],
            myCurrentArmorSet: [],
            myCurrentWeapon: [],
            infoChart: {}
        }
    },
    watch: {
        myCurrentArmorSet(value){
           this.infoChart= radarFunc.getInfoForAnyChart(value)
        },
        
        allArmors(value) {
            console.log("allArmors change in ", this.$options.name, value)
        },
        allWeapons(value) {
            console.log("allWeapons change in ", this.$options.name, value)
        },
        filteredArmors(value) {
            console.log("filteredArmors change in ", this.$options.name)
        },
    },
    methods: {
        handleSelectPiece(piece) {
            console.log("Selected armor", piece)
            if (!this.myCurrentArmorSet.some(a => a.id === piece.id)) {
                let tmp = this.myCurrentArmorSet.filter(e => e.type !== piece.type)
                tmp.push(piece)
                this.myCurrentArmorSet = tmp
            }
        },
        handleUnselectPiece(piece) {
            console.log("Unselected armor", piece)
            if (this.myCurrentArmorSet.some(a => a.id === piece.id)) {
                this.myCurrentArmorSet = this.myCurrentArmorSet.filter(a => a.id !== piece.id)
            }
        },
        handleSelectWeapon(piece) {
            this.myCurrentWeapon = [piece]
            console.log("Selected Weapon", this.myCurrentWeapon)
        },
        handleUnselectWeapon(piece) {
            console.log("Unselected Weapon", piece)
            this.myCurrentWeapon = []
        },

        test(e) {
            console.log("### TEST", e)
        },
    },
    beforeCreate: function () {
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
</style>
