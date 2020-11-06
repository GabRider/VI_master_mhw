<template>
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
</template>



<script>
/*
Output events :
    - selectPiece : send selected armor piece object
    - unselectPiece : send unselected armor piece object
*/
import ArmorCard from "./ArmorCard.vue"
export default {
    name: "ArmorSet",
    props: {
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
</script>