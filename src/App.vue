<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png" />
        <div>
            <div v-if="myCurrentArmorSet.length"><b>Current Armor SET :</b></div>
            <div class="row card-columns ml-2">
                <ArmorCard
                    v-for="armor in myCurrentArmorSet"
                    v-bind:key="armor.id"
                    :piece="armor"
                    :myCurrentArmorSetInput="myCurrentArmorSet"
                    v-on:selectPiece="handleSelectPiece"
                    v-on:unselectPiece="handleUnselectPiece"
                ></ArmorCard>
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
            <Weapons v-model="allWeapons"></Weapons>
        </div>
    </div>
</template>

<script>
/*eslint no-unused-vars: "off"*/
import Armors from "./components/Armors"
import Weapons from "./components/Weapons"
import FiltersArmors from "./components/FiltersArmors"
import ArmorCard from "./components/ArmorCard.vue"

export default {
    name: "App",
    components: {
        Weapons,
        Armors,
        FiltersArmors,
        ArmorCard,
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
        }
    },
    watch: {
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
