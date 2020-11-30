<template>
   <div>
      <table class=" " style="width: 100%; text-align: left">
         <tr>
            <td v-if="type">
               <span class="badge badge-primary">type</span>
               <span class="align-middle"> {{ piece.type }}</span>
            </td>
            <td v-if="rank">
               <span class="badge badge-primary">rank</span>
               <span class="align-middle"> {{ piece.rank }}</span>
            </td>
            <td v-if="rarity">
               <span class="badge badge-primary">rarity</span>
               <span class="align-middle"> {{ piece.rarity }}</span>
            </td>
         </tr>

         <tr>
            <td v-if="defense">
               <span class="badge badge-primary">defense</span>
               <span class="align-middle"> {{ piece.defense.base }}</span>
            </td>
            <td v-if="attack">
               <span class="badge badge-primary">attack</span>
               <span class="align-middle"> {{ piece.attack.display }}</span>
            </td>
            <td v-if="jewels">
               <div v-if="piece.slots.length == 0">
                  <span class="badge badge-primary">jewels</span>
                  <img src="@/assets/empty.png" width="24" height="24" />
               </div>

               <span v-for="lvl in getListRankJewels(piece.slots)" :key="lvl.id" class="pr-1">
                  <img :src="getImgJewel(lvl.rank)" width="24" height="24"
               /></span>
            </td>
         </tr>
         <tr>
            <td v-if="elderseal">
               <span class="badge badge-primary">elderseal</span>
               <span v-if="piece.elderseal !== null" class="align-middle">
                  {{ piece.elderseal }}</span
               >
               <span v-else class="align-middle"> none</span>
            </td>
            <td v-if="elements">
               <div v-if="piece.elements && piece.elements.length > 0" class="align-bottom">
                  <span class="badge badge-primary">elements</span>
                  <img :src="getImg(piece.elements[0].type)" width="32" height="32" />
                  <span class="align-middle">{{ piece.elements[0].damage }}</span>
               </div>
            </td>
         </tr>
      </table>
      <span v-if="resistances" class="badge badge-primary">Elementary resistances</span>
      <table v-if="resistances" style="width: 100%">
         <tr>
            <td v-for="[key, value] in Object.entries(piece.resistances)" :key="key">
               <img :src="getImg(key)" width="32" height="32" />
               <span class="pr-0">{{ value }}</span>
            </td>
         </tr>
      </table>
   </div>
</template>


<script>
export default {
   name: "CorpsCard",
   props: {
      piece: {
         // input
         type: Object,
         required: true,
      },
      displayOptions: {
         type: Array,
         default: () => ["type", "jewels"],
      },
   },
   data() {
      const res = {
         type: false,
         rank: false,
         rarity: false,
         defense: false,
         attack: false,
         jewels: false,
         resistances: false,
         elderseal: false,
         elements: false,
      }
      this.displayOptions.forEach(option => {
         if (option === "type") res.type = true
         else if (option === "rank") res.rank = true
         else if (option === "defense") res.defense = true
         else if (option === "jewels") res.jewels = true
         else if (option === "resistances") res.resistances = true
         else if (option === "rarity") res.rarity = true
         else if (option === "attack") res.attack = true
         else if (option === "elderseal") res.elderseal = true
         else if (option === "elements") res.elements = true
      })
      return res
   },
   computed: {},
   watch: {},
   methods: {
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
