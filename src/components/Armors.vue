<template>
   <div class="row card-columns ml-2">
      <ArmorCard
         v-for="armor in armors"
         v-bind:key="armor.id"
         :piece="armor"
         :myCurrentArmorSet="myCurrentArmorSet"
         v-on:update:myCurrentArmorSet="updateMyCurrentArmorSet"
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
   watch: {},
   methods: {
      updateMyCurrentArmorSet(event) {
         this.$emit("update:myCurrentArmorSet", event) // send event output
      },
   },
}
// this.$emit("input", this.armors)
</script>