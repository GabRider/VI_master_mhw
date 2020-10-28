<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png" />
        <HelloWorld msg="Welcome to Your Vue.js App" />
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
                :allArmorsInput="allArmors"
                :filtredArmorsInput="filteredArmors"
                v-on:filtredArmorsUpdate="filteredArmors = $event"
            ></FiltersArmors>
            <Armors v-model="filteredArmors"></Armors>
        </div>
        <div v-if="displayWeapons">
            <Weapons v-model="allWeapons"></Weapons>
        </div>
    </div>
</template>

<script>
/*eslint no-unused-vars: "off"*/
import HelloWorld from "./components/HelloWorld.vue"
import Armors from "./components/Armors"
import Weapons from "./components/Weapons"
import FiltersArmors from "./components/FiltersArmors"

export default {
    name: "App",
    components: {
        HelloWorld,
        Weapons,
        Armors,
        FiltersArmors,
    },
    data() {
        return {
            allArmors: [],
            allWeapons: [],
            displayArmors: false,
            displayWeapons: false,
            filteredArmors: [],
            filteredWeapons: [],
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
