<template>
    <div>
        <ul>
            <li v-for="weapon in weapons" v-bind:key="weapon.id">
                <WeaponCard :value="weapon" :key="weapon.id"></WeaponCard>
            </li>
        </ul>
        <p></p>
    </div>
</template>



<script>
import WeaponCard from "./WeaponCard.vue"
export default {
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
            console.log("weapons changed in composant")
            this.weapons = value
        },
    },
    methods: {
        updateParentArmors(weapons) {
            this.weapons = weapons
            this.$emit("input", this.weapons) // update parent armors list
        }
    },
}
// this.$emit("input", this.armors)
</script>