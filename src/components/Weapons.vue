<template>
    <div>
        <ul>
            <li v-for="weapon in weapons" v-bind:key="weapon.id">
                <WeaponCard :value="weapon" :key="weapon.id"></WeaponCard>
            </li>
        </ul>
    </div>
</template>



<script>
import WeaponCard from "./WeaponCard.vue"
export default {
    name: "Weapons",
    props: {
        value: { // input
            type: Array,
            default: () => [], // equivalent à 'default: []'
        },
    },
    components: {
        WeaponCard
    },
    data() {
        return {
            weapons: this.value,
        }
    },
    watch: {
        value (value) {
            // receive parent change of the armors list
            console.log("weapons changed in composant", this.$options.name)
            this.weapons = value
        },
    },
    methods: {
        updateParentWeapons(weapons) {
            this.weapons = weapons
            this.$emit("input", this.weapons) // update parent weapons list
        }
    },
}
</script>