<template>
   <div>
      <div v-if="myCurrentArmorSet.length"><b>Current SET :</b></div>
      <div class="row ml-2">
         <!-- Current Armor Set -->
         <div v-for="piece in myCurrentArmorSet" v-bind:key="piece.id" class="border my-1 mx-2">
            <div
               v-if="detailArmor !== piece.id"
               class=""
               @mouseover="mouseOverId = piece.id"
               @mouseleave="mouseOverId = '-1'"
            >
               <!-- TODO: change by an image -->
               <table>
                  <tr>
                     <td class="float-left">
                        <button
                           type="button"
                           class="close"
                           @click="deleteArmorCard(piece.id)"
                           aria-label="Close"
                        >
                           <span aria-hidden="true">&times;</span>
                        </button>
                     </td>
                  </tr>
                  <tr>
                     <td>
                        <img
                           class="mx-auto d-block"
                           v-if="piece.assets === null"
                           :src="getImgEmpty(piece.type)"
                           width="80"
                           height="80"
                        />
                        <img
                           class="mx-auto d-block"
                           v-else-if="piece.assets.imageMale"
                           :src="piece.assets.imageMale"
                           width="80"
                           height="80"
                        />
                        <img
                           class="mx-auto d-block"
                           v-else-if="piece.assets.imageFemale"
                           :src="piece.assets.imageFemale"
                           width="80"
                           height="80"
                        />
                     </td>
                     <td v-if="mouseOverId != piece.id"><b>&#62;</b></td>
                     <td colspan="2" v-if="mouseOverId == piece.id">
                        <table>
                           <tr>
                              <td>
                                 <span class="badge badge-primary">defense:</span>
                                 {{ piece.defense.base }}
                              </td>
                              <td>
                                 <span
                                    v-for="lvl in getListRankJewels(piece.slots)"
                                    :key="lvl.id"
                                    class="pr-1"
                                 >
                                    <img :src="getImgJewel(lvl.rank)" width="24" height="24"
                                 /></span>
                              </td>
                           </tr>
                           <tr>
                              <td colspan="2">
                                 <table>
                                    <tr>
                                       <td
                                          v-for="[key, value] in Object.entries(piece.resistances)"
                                          :key="key"
                                       >
                                          <img :src="getImg(key)" width="32" height="32" />
                                          <span class="pr-0">{{ value }}</span>
                                       </td>
                                    </tr>
                                 </table>
                              </td>
                           </tr>
                        </table>
                     </td>
                  </tr>
                  <tr>
                     <td colspan="2">{{ piece.name }}</td>
                  </tr>
               </table>
               <!--
                  <div>
                  <button
                     type="button"
                     class="close"
                     @click="deleteArmorCard(piece.id)"
                     aria-label="Close"
                  >
                     <span aria-hidden="true">&times;</span>
                  </button>
               </div>

               <div class="col-12 ">
                  <img
                     class=" mx-auto d-block"
                     v-if="piece.assets === null"
                     :src="getImgEmpty(piece.type)"
                     width="80"
                     height="80"
                  />
                  <img
                     class=" mx-auto d-block"
                     v-else-if="piece.assets.imageMale"
                     :src="piece.assets.imageMale"
                     width="80"
                     height="80"
                  />
                  <img
                     class=" mx-auto d-block"
                     v-else-if="piece.assets.imageFemale"
                     :src="piece.assets.imageFemale"
                     width="80"
                     height="80"
                  />
               </div>
                 <div class="col-12">
                  <p>{{ piece.name }}</p>
               </div>
            </div>
            <div class=" mx-auto d-block">
               <p>sssssssssssssss</p>
            </div>
         </div>
 
    --->
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
   components: {},
   data() {
      return {
         mouseOverId: "-1",
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
<style>
.currDiv,
.currset {
   display: block;
   float: left;
}
</style>