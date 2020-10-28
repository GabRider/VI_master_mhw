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
            <Armors v-if="displayArmors" v-model="armorPieces"></Armors>
            <Weapons v-if="displayWeapons" v-model="weaponPieces"></Weapons>
    </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Armors from "./components/Armors";
import Weapons from "./components/Weapons";

export default {
    name: "App",
    components: {
        HelloWorld,
        Weapons,
        Armors,
    },
    data() {
        return {
            armorPieces: [],
            weaponPieces: [],
            displayArmors: false,
            displayWeapons: false,
        };
    },
    watch: {
        armorPieces(armor) {
            console.log(armor);
        },
    },
    beforeCreate: function () {
        let t = this;
        fetch("https://mhw-db.com/armor")
            .then((response) => response.json())
            .then((armorPieces) => {
                t.armorPieces = armorPieces;
            });
        fetch("https://mhw-db.com/weapons")
            .then((response) => response.json())
            .then((weaponPieces) => {
                t.weaponPieces = weaponPieces;
            });
    },
};
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
