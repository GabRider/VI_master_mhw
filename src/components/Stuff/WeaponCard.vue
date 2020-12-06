<template>
   <div
      class="card"
      @click="toggleSelect"
      style="max-width: 16rem"
      v-bind:class="{ 'border-dark': !isSelected, 'border-success': isSelected }"
   >
      <div
         class="card-footer"
         v-bind:class="{ 'border-dark': !isSelected, 'bg-success': isSelected }"
      ></div>
      <div>
         <img
            v-if="piece.assets === null"
            :src="getImg(piece.type)"
            :alt="piece.type"
            width="100"
            height="100"
         />
         <img v-else-if="piece.assets.image" :src="piece.assets.image" width="100" height="100" />
      </div>
      <div class="card-header" style="width: 100%">
         <b>{{ piece.name }}</b>
      </div>

      <CorpsCard
         :piece="piece"
         :displayOptions="['type', 'rarity', 'jewels', 'attack', 'elderseal', 'elements']"
      />
       <div class="progress" style="max-width: 100%; min-width: 100px;"> 
                       <div class=" progress-bar"  :style="{width: Math.round(piece.durability[0].red / Object.keys(piece.durability[0]).length)  +'%','background-color':'#CC0000'}"></div>
                       
                       <div class="progress-bar" :style="{width:  Math.round(piece.durability[0].orange/Object.keys(piece.durability[0]).length)+'%','background-color':'#FF8800'}"></div>
                       
                       <div class="progress-bar" :style="{width:  Math.round(piece.durability[0].yellow/Object.keys(piece.durability[0]).length)+'%','background-color':'#FFBB33'}"></div>
                       
                       <div class="progress-bar" :style="{width: Math.round(piece.durability[0].green/Object.keys(piece.durability[0]).length)+'%','background-color':'#00C851'}"></div>
                       
                       <div class="progress-bar" :style="{width:  Math.round(piece.durability[0].blue/Object.keys(piece.durability[0]).length)+'%','background-color':'#0d47a1'}"></div>
                       
                       <div class="progress-bar" :style="{width:  Math.round(piece.durability[0].white/Object.keys(piece.durability[0]).length)+'%','background-color':'white'}"></div>
                       
                       <div class="progress-bar" :style="{width:  Math.round(piece.durability[0].purple/Object.keys(piece.durability[0]).length)+'%','background-color':'#9933CC'}"></div>
                        </div>

   
   </div>
</template>


<script>
/*
### champs utiles:

name : String
type : String
rarity : Int
slots : Array
    - rank : Int
    - rank : Int
assets : Object
    imageMale : String url
    imageFemale : String url
elements
attack
*/
/*
Output events :
    - update:myCurrentWeapon : send new value of myCurrentWeapon
*/
import CorpsCard from "./CorpsCard"
export default {
   name: "WeaponCard",
   props: {
      piece: {
         // input
         type: Object,
      },
      myCurrentWeapon: {
         // input
         type: Array,
      },
   },
   components: {
      CorpsCard,
   },
   data() {
      return {}
   },
   computed: {
      isSelected() {
         return this.myCurrentWeapon.some(e => e.id === this.piece.id)
      },
   },
   watch: {},
   methods: {
      toggleSelect() {
         console.log("toggle Select")
         //this.isSelected = !this.isSelected
         // send event output
         if (this.isSelected) this.$emit("update:myCurrentWeapon", [])
         else this.$emit("update:myCurrentWeapon", [this.piece])
      },
      getListRankJewels(slots) {
         return slots.map((e, i) => {
            e.id = i
            return e
         })
      },
      getImg(name) {
         try {
            return require("@/assets/" + name + ".png")
         } catch (e) {
            console.log(name + ".png note found.")
            return ""
         }
      },
      getImgJewel(lvl) {
         return require("@/assets/joyau-" + lvl + ".png")
      },
   },
}
</script>
