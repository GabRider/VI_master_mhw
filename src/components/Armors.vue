<template>
    <div>
        <ul>
            <li v-for="armor in armors" v-bind:key="armor.id">
                <ArmorCard :value="armor" :key="armor.id"></ArmorCard>
            </li>
        </ul>
    </div>
</template>



<script>
import ArmorCard from "./ArmorCard.vue"
export default {
    name: "Armors",
    props: {
        value: { // input
            type: Array,
            default: () => [], // equivalent à 'default: []'
        },
    },
    components: {
        ArmorCard
    },
    data() {
        return {
            armors: this.value,
        }
    },
    watch: {
        value (value) {
            // receive parent change of the armors list
            console.log("armors changed in composant", this.$options.name)
            this.armors = value
        },
    },
    methods: {  },
}
// this.$emit("input", this.armors)
</script>