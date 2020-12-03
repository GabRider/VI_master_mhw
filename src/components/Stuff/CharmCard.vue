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
      myCurrentCharm: {
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
         return this.myCurrentCharm.some(e => e.id === this.piece.id)
      },
   },
   watch: {},
   methods: {
      toggleSelect() {
         console.log("toggle Select")
         if (this.isSelected) this.$emit("update:myCurrentCharm", [])
         else this.$emit("update:myCurrentCharm", [this.piece])
      },
   },
}
</script>
