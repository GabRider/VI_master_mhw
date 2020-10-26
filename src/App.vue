<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png" />
        <Box test="coucou je suis une propriété"></Box>
        <HelloWorld msg="Welcome to Your Vue.js App" />
        <Armors v-model="armorPieces"></Armors>
    </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue"
import Box from "./components/Box.vue"
import Armors from "./components/Armors"

export default {
    name: "App",
    components: {
        HelloWorld,
        Box,
        Armors,
    },
    data() {
        return {
            armorPieces: [],
        };
    },
    watch: {
        armorPieces (armor) {
            console.log(armor)
        },
    },
    beforeCreate: function () {
        let t = this;
        fetch("https://mhw-db.com/armor")
            .then((response) => response.json())
            .then((armorPieces) => {
                t.armorPieces = armorPieces
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
