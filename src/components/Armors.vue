<template>
    <div class="row card-columns ml-2">
        <ArmorCard
            v-for="armor in armors"
            v-bind:key="armor.id"
            :piece="armor"
            :myCurrentArmorSetInput="myCurrentArmorSet"
            v-on:selectPiece="handleSelectPiece"
            v-on:unselectPiece="handleUnselectPiece"
        ></ArmorCard>
    </div>
</template>



<script>
/*
Output events :
    - selectPiece : send selected armor piece object
    - unselectPiece : send unselected armor piece object
*/
import ArmorCard from "./ArmorCard.vue"
export default {
    name: "Armors",
    props: {
        armors: {
            // input
            type: Array,
            default: () => [], // equivalent à 'default: []'
        },
        myCurrentArmorSet: {
            type: Array,
            default: () => [],
        },
    },
    components: {
        ArmorCard,
    },
    data() {
        return {}
    },
    watch: {
        armors() {
            // receive parent change of the armors list
            console.log("armors changed in composant", this.$options.name)
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
// this.$emit("input", this.armors)
</script>