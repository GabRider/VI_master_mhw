<template>
   <div
      class="card"
      @click="toggleSelect"
      style="max-width: 16rem"
      v-bind:class="{ 'border-dark': !isSelected&& !displaySkill, 'border-success': isSelected,'border-primary':displaySkill }"
       @mouseover="displaySkill=true"
       @mouseleave="displaySkill=false"
   >
   <div
         class="card-footer"
         v-bind:class="{ 'border-dark': !isSelected, 'bg-success': isSelected }"
      ></div>
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
      <div class="card-header" style="width: 100%">
         <b>{{ piece.name }}</b>
      </div>
      <div v-if="displaySkill===false">
      <CorpsCard
         :piece="piece"
         :displayOptions="['type', 'rank', 'jewels', 'defense', 'resistances']"
      />
      </div>
      <div v-if="displaySkill" >
      <SkillArmor :skills="piece.skills" />
      </div>
      
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
import CorpsCard from "./CorpsCard"
import SkillArmor from "./SkillArmor"
export default {
   name: "ArmorCard",
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
   components: {
      CorpsCard,
      SkillArmor
   },
   data() {
      return {
         displaySkill:false,
      }
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
         return require("@/assets/no-" + name + ".png")
      },
      getImg(name) {
         return require("@/assets/" + name + ".png")
      },
      getImgJewel(lvl) {
         return require("@/assets/joyau-" + lvl + ".png")
      },
   },
}
</script>
