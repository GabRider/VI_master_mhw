<template>
   <div class="row card-columns ml-2">
      <CharmCard
         v-for="charm in charms"
         v-bind:key="charm.id"
         :piece="charm"
         :myCurrentCharms="myCurrentCharms"
         v-on:update:myCurrentCharms="updateMyCurrentCharms"
      ></CharmCard>
   </div>
</template>



<script>
/*
Output events :
    - selectPiece : send selected armor piece object
    - unselectPiece : send unselected armor piece object
*/
import CharmCard from "./CharmCard.vue"
export default {
   name: "Charms",
   props: {
      charms: {
         // input
         type: Array,
         default: () => [], // equivalent à 'default: []'
      },
      myCurrentCharms: {
         type: Array,
         default: () => [],
      },
   },
   components: {
      CharmCard,
   },
   data() {
      return {}
   },
   watch: {},
   methods: {
      updateMyCurrentCharms(event) {
         this.$emit("update:myCurrentCharms", event) // send event output
      },
   },
}
// this.$emit("input", this.armors)
</script>