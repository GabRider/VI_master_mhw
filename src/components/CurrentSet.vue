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

            <div v-else>



               <div
                  class="card border-dark"
                  style="max-width: 16rem"
               >
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
                        <td>
                           <span class="badge badge-primary">defense:</span>
                           {{ piece.defense.base }}
                        </td>
                        <td>
                           <div v-if="piece.slots.length == 0">
                              <span class="badge badge-primary">jewels: </span>
                              <img src="../assets/empty.png" width="24" height="24" />
                           </div>

                           <span
                              v-for="lvl in getListRankJewels(piece.slots)"
                              :key="lvl.id"
                              class="pr-1"
                           >
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
                     class="card-footer border-dark"
                  ></div>
               </div>
            </div>
            
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
    - update:myCurrentArmorSet 
    - update:myCurrentWeapon 
*/


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
      getListRankJewels(slots) {
         return slots.map((e, i) => {
            e.id = i
            return e
         })
      },
      getImgJewel(lvl) {
         return require("../assets/joyau-" + lvl + ".png")
      },
   },
}
</script>