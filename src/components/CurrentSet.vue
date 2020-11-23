<template>
   <div>
      <div v-if="myCurrentArmorSet.length"><b>Current SET :</b></div>
      <div class="row ml-2">
         <!-- Current Armor Set -->
         <div v-for="piece in myCurrentArmorSet" v-bind:key="piece.id" class="border my-1 mx-2">
            <div v-if="detailArmor !== piece.id">
               <p @click="deleteArmorCard(piece.id)">❌</p>
               <img
                  :src="getImg('icon_expand')"
                  width="12"
                  height="12"
                  @click="showArmorDetails(piece.id)"
               />
               <!-- TODO: change by an image -->
               <div class="w-100"></div>
               <img
                  v-if="piece.assets === null"
                  :src="getImgEmpty(piece.type)"
                  width="100"
                  height="100"
               />
               <img
                  v-else-if="piece.assets.imageMale"
                  :src="piece.assets.imageMale"
                  width="100"
                  height="100"
               />
               <img
                  v-else-if="piece.assets.imageFemale"
                  :src="piece.assets.imageFemale"
                  width="100"
                  height="100"
               />
               <p>{{ piece.name }}</p>
            </div>

            <ArmorCard v-else :piece="piece" :myCurrentArmorSet="myCurrentArmorSet"></ArmorCard>
         </div>

         <!-- Current Armor Set -->
         <div v-for="piece in myCurrentWeapon" v-bind:key="piece.id" class="border my-1 mx-2">
            <div v-if="!detailWeapon">
               <p @click="deleteWeaponCard()">❌</p>
               <!-- TODO: change by an image -->
               <img
                  v-if="piece.assets === null"
                  :src="getImg(piece.type)"
                  :alt="piece.type"
                  width="100"
                  height="100"
               />
               <img
                  v-else-if="piece.assets.image"
                  :src="piece.assets.image"
                  width="100"
                  height="100"
               />
               <p>{{ piece.name }}</p>
            </div>
         </div>
      </div>
   </div>
</template>



<script>
/*
Output events :
    - update:myCurrentArmorSet : send update of myCurrentArmorSet
*/
import ArmorCard from "./ArmorCard2.vue"

export default {
   name: "CurrentSet",
   props: {
      myCurrentArmorSet: {
         type: Array,
         default: () => [],
      },
      myCurrentWeapon: {
         type: Array,
         default: () => [],
      },
   },
   components: {
      ArmorCard,
   },
   data() {
      return {
         detailArmor: "-1",
         detailWeapon: false,
      }
   },
   watch: {},
   methods: {
      handler() {},
      deleteArmorCard(id) {
         const newSet = this.myCurrentArmorSet.filter(set => !(set.id === id))
         this.$emit("update:myCurrentArmorSet", newSet) // send event output
      },
      deleteWeaponCard() {
         this.$emit("update:myCurrentWeapon", []) // send event output
      },
      showArmorDetails(id) {
         console.log("DSK")
         this.detailArmor = id
         this.detailWeapon = false
      },
      showWeaponDetails() {
         console.log("DSK")
         this.detailArmor = "-1"
         this.detailWeapon = true
      },
      getImgEmpty(name) {
         return require("../assets/no-" + name + ".png")
      },
      getImg(name) {
         return require("../assets/" + name + ".png")
      },
   },
}
</script>