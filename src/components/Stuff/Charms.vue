<template>
   <div class="row card-columns ml-2">
      <CharmCard
         v-for="charm in charms"
         v-bind:key="charm.id"
         :piece="charm"
         :myCurrentCharm="myCurrentCharm"
         v-on:update:myCurrentCharm="updateMyCurrentCharm"
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
      myCurrentCharm: {
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
      updateMyCurrentCharm(event) {
         this.$emit("update:myCurrentCharm", event) // send event output
      },
   },
}
// this.$emit("input", this.armors)
</script>