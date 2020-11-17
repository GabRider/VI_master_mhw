<template>
    <div class="p-10">
        <div class="row card-columns ml-2">
            <WeaponCard
                v-for="weapon in weapons"
                v-bind:key="weapon.id"
                :piece="weapon"
                :myCurrentWeapon="myCurrentWeapon"
                v-on:update:myCurrentWeapon="updateMyCurrentWeapon"
            ></WeaponCard>
        </div>
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

        return {}
    },
    watch: {
    },
    methods: {
        updateMyCurrentWeapon(event) {
            this.$emit("update:myCurrentWeapon", event) // send event output
        },
    },
}
// this.$emit("input", this.weapons)
</script>