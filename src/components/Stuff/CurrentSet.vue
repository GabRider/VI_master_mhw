<template>
   <div>
      <div v-if="myCurrentArmorSet.length"><b>Current SET :</b></div>
      <div class="row ml-2">
         <!-- Current Armor Set -->
         <div v-for="piece in myCurrentArmorSet" v-bind:key="piece.id" class="border my-1 mx-2">
            <div
               v-if="details !== 'a' + piece.id"
               @mouseover="mouseOverId = 'a' + piece.id"
               class="card border-dark"
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
                     <td colspan="2">{{ piece.name }}</td>
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
                     <td v-if="mouseOverId != 'a' + piece.id"><b>&#62;</b></td>
                     <td colspan="2" v-if="mouseOverId == 'a' + piece.id">
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
         <div v-for="weapon in myCurrentWeapon" v-bind:key="weapon.id" class="border my-1 mx-2">
            <div
               v-if="details !== 'w' + weapon.id"
               @mouseover="mouseOverId = 'w' + weapon.id"
               class="card border-dark"
            >
               <table>
                  <tr>
                     <td class="float-left">
                        <button
                           type="button"
                           class="close"
                           @click="deleteWeaponCard"
                           aria-label="Close"
                        >
                           <span aria-hidden="true">&times;</span>
                        </button>
                     </td>
                  </tr>
                  <tr>
                     <td colspan="2">{{ weapon.name }}</td>
                  </tr>
                  <tr>
                     <td>
                        <img
                           v-if="weapon.assets === null"
                           :src="getImg(weapon.type)"
                           :alt="weapon.type"
                           width="80"
                           height="80"
                        />
                        <img
                           v-else-if="weapon.assets.image"
                           :src="weapon.assets.image"
                           width="80"
                           height="80"
                        />
                     </td>
                     <td v-if="mouseOverId != 'w' + weapon.id"><b>&#62;</b></td>
                     <td colspan="2" v-if="mouseOverId == 'w' + weapon.id">
                        <table>
                           <tr>
                              <td>
                                 <span class="badge badge-primary">attack:</span>
                                 {{ weapon.attack.display }}
                              </td>
                              <td>
                                 <span
                                    v-for="lvl in getListRankJewels(weapon.slots)"
                                    :key="lvl.id"
                                    class="pr-1"
                                 >
                                    <img :src="getImgJewel(lvl.rank)" width="24" height="24"
                                 /></span>
                              </td>
                           </tr>
                           <tr>
                              <td>
                                 <span class="badge badge-primary">elderseal</span>
                                 <span v-if="weapon.elderseal === null">none</span
                                 ><span v-else>{{ weapon.elderseal }}</span>
                              </td>

                              <td>
                                 <span class="badge badge-primary">elements</span>
                                 <span v-if="weapon.elements.length === 0">none</span
                                 ><span v-else>
                                    <img
                                       :src="getImg(weapon.elements[0].type)"
                                       :alt="weapon.elements[0].type"
                                       width="32"
                                       height="32"
                                    />{{ weapon.elements[0].damage }}</span
                                 >
                              </td>
                           </tr>
                        </table>
                     </td>
                  </tr>
                  <tr>
                     <td colspan="2">
                        <div class="progress" style="max-width: 100%; min-width: 100px;"> 
                       <div class=" progress-bar"  :style="{width: Math.round(weapon.durability[0].red / Object.keys(weapon.durability[0]).length)  +'%','background-color':'red'}"></div>
                       
                       <div class="progress-bar" :style="{width:  Math.round(weapon.durability[0].orange/Object.keys(weapon.durability[0]).length)+'%','background-color':'orange'}"></div>
                       
                       <div class="progress-bar" :style="{width:  Math.round(weapon.durability[0].yellow/Object.keys(weapon.durability[0]).length)+'%','background-color':'yellow'}"></div>
                       
                       <div class="progress-bar" :style="{width: Math.round(weapon.durability[0].green/Object.keys(weapon.durability[0]).length)+'%','background-color':'green'}"></div>
                       
                       <div class="progress-bar" :style="{width:  Math.round(weapon.durability[0].blue/Object.keys(weapon.durability[0]).length)+'%','background-color':'blue'}"></div>
                       
                       <div class="progress-bar" :style="{width:  Math.round(weapon.durability[0].white/Object.keys(weapon.durability[0]).length)+'%','background-color':'white'}"></div>
                       
                       <div class="progress-bar" :style="{width:  Math.round(weapon.durability[0].purple/Object.keys(weapon.durability[0]).length)+'%','background-color':'purple'}"></div>
                        </div>
                     </td>
                  </tr>
               </table>
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
         details: "-1",
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
         this.details = id
         this.detailWeapon = false
      },
      showWeaponDetails() {
         console.log("DSK")
         this.details = "-1"
         this.detailWeapon = true
      },
      getImgEmpty(name) {
         return require("@/assets/no-" + name + ".png")
      },
      getImg(name) {
         return require("@/assets/" + name + ".png")
      },
      getListRankJewels(slots) {
         return slots.map((e, i) => {
            e.id = i
            return e
         })
      },
      getImgJewel(lvl) {
         return require("@/assets/joyau-" + lvl + ".png")
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