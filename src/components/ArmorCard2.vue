<template>
   <div
      class="card"
      @click="toggleSelect"
      style="max-width: 16rem"
      v-bind:class="{ 'border-dark': !isSelected, 'border-success': isSelected }"
   >
      <img v-if="piece.assets === null" :src="getImgEmpty(piece.type)" width="100" height="100" />
      <img
         v-else-if="piece.assets.imageMale"
         :src="piece.assets.imageMale"
         width="100"
         height="100"
         class=""
      />
      <img
         v-else-if="piece.assets.imageFemale"
         :src="piece.assets.imageFemale"
         width="100"
         height="100"
      />
      <div class="card-header" style="height: 5rem; width: 100%">
         <b>{{ piece.name }}</b>
      </div>
      <table class=" " style="width: 100%; text-align: left">
         <tr>
            <td><span class="badge badge-primary">type:</span> {{ piece.type }}</td>
            <td><span class="badge badge-primary">rank:</span> {{ piece.rank }}</td>
         </tr>

         <tr>
            <td>
               <span class="badge badge-primary">defense:</span>
               {{ piece.defense.base }}
            </td>
            <td>
               <div v-if="piece.slots.length == 0">
                  <span class="badge badge-primary">jewels: </span>
                  <img src="../assets/empty.png" width="24" height="24" />
               </div>

               <span v-for="lvl in getListRankJewels(piece.slots)" :key="lvl.id" class="pr-1">
                  <img :src="getImgJewel(lvl.rank)" width="24" height="24"
               /></span>
            </td>
         </tr>
      </table>
      <span class="badge badge-primary">Elementary resistances</span>
      <table style="width: 100%">
         <tr>
            <td v-for="[key, value] in Object.entries(piece.resistances)" :key="key">
               <img :src="getImg(key)" width="32" height="32" />
               <span class="pr-0">{{ value }}</span>
            </td>
         </tr>
      </table>

      <div
         class="card-footer"
         v-bind:class="{ 'border-dark': !isSelected, 'bg-success': isSelected }"
      ></div>
   </div>
</template>


<script>
/*
### champs utiles:

name : String
type : String
rank : Int
slots : Array
    - rank : Int
    - rank : Int
assets : Object
    imageMale : String url
    imageFemale : String url
resistances
defense
*/
/*
Output events :
    - update:myCurrentArmorSet : send new value of myCurrentArmorSet
*/
export default {
   name: "ArmorCard2",
   props: {
      piece: {
         // input
         type: Object,
         default: () => {},
      },
      myCurrentArmorSet: {
         // input
         type: Array,
      },
   },
   data() {
      return {}
   },
   computed: {
      isSelected() {
         return this.myCurrentArmorSet.some(e => e.id === this.piece.id)
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
         if (!this.myCurrentArmorSet.some(a => a.id === this.piece.id)) {
            let newArmorSet = this.myCurrentArmorSet.filter(e => e.type !== this.piece.type)
            newArmorSet.push(this.piece)
            this.$emit("update:myCurrentArmorSet", newArmorSet)
         }
      },
      unselectPiece() {
         // console.log("Unselected armor", this.piece)
         if (this.myCurrentArmorSet.some(a => a.id === this.piece.id)) {
            const newArmorSet = this.myCurrentArmorSet.filter(a => a.id !== this.piece.id)
            this.$emit("update:myCurrentArmorSet", newArmorSet)
         }
      },
      getListRankJewels(slots) {
         return slots.map((e, i) => {
            e.id = i
            return e
         })
      },
      getImgEmpty(name) {
         return require("../assets/no-" + name + ".png")
      },
      getImg(name) {
         return require("../assets/" + name + ".png")
      },
      getImgJewel(lvl) {
         return require("../assets/joyau-" + lvl + ".png")
      },
   },
}
</script>
