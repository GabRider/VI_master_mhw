<template>
    <div class="row card-columns ml-2">
        <WeaponCard
            v-for="weapon in weapons"
            v-bind:key="weapon.id"
            :piece="weapon"
            :myCurrentWeaponInput="myCurrentWeapon"
            v-on:selectPiece="handleSelectPiece"
            v-on:unselectPiece="handleUnselectPiece"
        ></WeaponCard>
    </div>
</template>



<script>
/*
Output events :
    - selectPiece : send selected armor piece object
    - unselectPiece : send unselected armor piece object
*/
import WeaponCard from "./WeaponCard.vue"
export default {
    name: "Weapons",
    props: {
        weapons: {
            // input
            type: Array,
            default: () => [], // equivalent à 'default: []'
        },
        myCurrentWeapon: {
            type: Array,
        },
    },
    components: {
        WeaponCard,
    },
    data() {
            console.log("data this.myCurrentWeapon", this.$options.name, this.myCurrentWeapon)

            
        return {}
    },
    watch: {
        weapons() {
            // receive parent change of the armors list
            console.log("weapons changed in composant", this.$options.name)
        },
    },
    methods: {
        handleSelectPiece(event) {
            this.$emit("selectPiece", event) // send event output
        },
        handleUnselectPiece(event) {
            this.$emit("unselectPiece", event) // send event output
        },
    },
}
// this.$emit("input", this.weapons)
</script>