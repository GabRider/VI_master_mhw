<template>
   <div
      class="card"
      @click="toggleSelect"
      style="max-width: 16rem"
      v-bind:class="{ 'border-dark': !isSelected, 'border-success': isSelected }"
   >
      <div class="card-header" style="width: 100%">
         <b>{{ piece.name }}</b>
      </div>

      <div v-for="lvl in piece.ranks" v-bind:key="lvl.id" class="px-2" style="text-align: left">
         <span class="badge badge-primary">{{ lvl.name }}</span>
         <span> {{ lvl.skills[0].description }}</span>
         
      </div>

   </div>
</template>


<script>
/*
### champs utiles:

name : String
description : String
ranks : Array
    - skill : Int
    - level : Int
    - description : String
    - skillName : String
*/
/*
Output events :
    - update:myCurrentCharms : send new value of myCurrentCharms
*/
export default {
   name: "CharmsCard",
   props: {
      piece: {
         // input
         type: Object,
         default: () => {},
      },
      myCurrentCharms: {
         // input
         type: Array,
      },
   },
   components: {},
   data() {
      return {}
   },
   computed: {
      isSelected() {
         return this.myCurrentCharms.some(e => e.id === this.piece.id)
      },
   },
   watch: {},
   methods: {
      toggleSelect() {
         console.log("toggle Select")
         if (this.isSelected) this.unselectPiece()
         else this.selectPiece()
      },
      selectPiece() {
         // console.log("Selected armor", this.piece)
         if (!this.myCurrentCharms.some(a => a.id === this.piece.id)) {
            let newArmorSet = this.myCurrentCharms.filter(e => e.type !== this.piece.type)
            newArmorSet.push(this.piece)
            this.$emit("update:myCurrentCharms", newArmorSet)
         }
      },
      unselectPiece() {
         // console.log("Unselected armor", this.piece)
         if (this.myCurrentCharms.some(a => a.id === this.piece.id)) {
            const newArmorSet = this.myCurrentCharms.filter(a => a.id !== this.piece.id)
            this.$emit("update:myCurrentCharms", newArmorSet)
         }
      },
   },
}
</script>
