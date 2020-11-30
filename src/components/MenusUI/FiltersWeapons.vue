<template>
   <div class="input-group">
      <!-- entry filter -->
      <div class="input-group mr-2 my-1" style="min-width: 220px; max-width: 220px">
         <input
            type="search"
            class="form-control"
            placeholder="Search"
            aria-label="Search"
            v-model="name"
         />
         <div class="input-group-append">
            <button class="btn btn-outline-primary" type="button" @click="filter()">Search</button>
         </div>
      </div>

      <!-- type filter -->
      <div class="input-group mr-2 my-1" style="min-width: 190px; max-width: 190px">
         <div class="input-group-prepend">
            <label class="input-group-text" for="selectType">Type</label>
         </div>
         <select class="custom-select" id="selectType" v-model="type" @change="filter()">
            <option v-for="t in type_list" :key="t" :value="t">
               {{ t }}
            </option>
         </select>
      </div>

      <!-- rarity filter -->
      <div class="input-group mr-2 my-1" style="min-width: 130px; max-width: 130px">
         <div class="input-group-prepend">
            <label class="input-group-text" for="selectType">Rarity</label>
         </div>
         <select class="custom-select" id="selectType" v-model="rarity" @change="filter()">
            <option v-for="t in rarity_list" :key="t" :value="t">
               {{ t }}
            </option>
         </select>
      </div>

      <!-- jewels filter -->
      <div class="input-group mr-2 my-1" style="min-width: 165px; max-width: 165px">
         <div class="input-group-prepend">
            <label class="input-group-text" for="selectType">Jewels slot</label>
         </div>
         <select class="custom-select" id="selectType" v-model="slots" @change="filter()">
            <option v-for="t in slots_list" :key="t" :value="t">
               {{ t }}
            </option>
         </select>
      </div>

      <!-- Elements filter -->
      <div class="input-group mr-2 my-1" style="min-width: 200px; max-width: 200px">
         <div class="input-group-prepend">
            <label class="input-group-text" for="selectType">Elements</label>
         </div>
         <select class="custom-select" id="selectType" v-model="elements" @change="filter()">
            <option v-for="t in elements_list" :key="t" :value="t">
               {{ t }}
            </option>
         </select>
      </div>

      <!-- elderseal filter -->
      <div class="input-group mr-2 my-1" style="min-width: 195px; max-width: 195px">
         <div class="input-group-prepend">
            <label class="input-group-text" for="selectType">Elderseal</label>
         </div>
         <select class="custom-select" id="selectType" v-model="elderseal" @change="filter()">
            <option v-for="t in elderseal_list" :key="t" :value="t">
               {{ t }}
            </option>
         </select>
      </div>

      <!-- count to display -->
      <div class="input-group mr-2 my-1" style="min-width: 240px; max-width: 240px">
         <div class="input-group-prepend">
            <label class="input-group-text" for="selectType">Elements displayed</label>
         </div>
         <select class="custom-select" id="selectType" v-model="displayed" @change="filter()">
            <option v-for="t in displayed_list" :key="t" :value="t">
               {{ t }}
            </option>
         </select>
      </div>
   </div>
</template>



<script>
/*
Output events :
    - filteredWeapons : send the filter applied to allWeapons
*/
export default {
   name: "FiltersWeapons",
   props: {
      allWeapons: {
         // input
         type: Array,
         default: () => [], // equivalent à 'default: []'
      },
   },
   components: {},
   data() {
      return {
         name: "",
         type: "all",
         rarity: "all",
         slots: "all",
         elements: "all",
         elderseal: "all",
         displayed: 25,
         type_list: [
            "all",
            "great-sword",
            "long-sword",
            "sword-and-shield",
            "dual-blades",
            "hammer",
            "hunting-horn",
            "lance",
            "gunlance",
            "switch-axe",
            "charge-blade",
            "insect-glaive",
            "light-bowgun",
            "heavy-bowgun",
            "bow",
         ],
         rarity_list: ["all", 0, 1, 2, 3, 4, 5, 6, 7, 8],
         slots_list: ["all", 0, 1, 2, 3, 4],
         elements_list: [
            "all",
            "None",
            "poison",
            "dragon",
            "thunder",
            "ice",
            "water",
            "paralysis",
            "fire",
            "sleep",
            "blast",
         ],
         elderseal_list: ["all", "None", "low", "average", "high"],
         displayed_list: [5, 10, 25, 50, 75, 100, 150, 200, 250],
         // damageType_list: ["sever", null, "blunt", "projectile"]
      }
   },
   watch: {},
   methods: {
      filter() {
         this.name = this.name.toLowerCase()
         const predicate = e => {
            const type = this.type === "all" ? true : e.type === this.type
            const rarity = this.rarity === "all" ? true : e.rarity === this.rarity
            const slots =
               this.slots === "all" || (this.slots === 0 && e.slots.length == 0)
                  ? true
                  : e.slots.some(s => s.rank === this.slots)
            const elements =
               this.elements === "all"
                  ? true
                  : e.elements[0]
                  ? e.elements[0].type === this.elements
                  : false
            const elderseal = this.elderseal === "all" ? true : e.elderseal === this.elderseal
            // optimisation de perf
            if (type && rarity && slots && elements && elderseal)
               return this.name === "" ? true : e.name.toLowerCase().includes(this.name)
            else return false
         }
         const filteredWeapons = this.allWeapons.filter(predicate)
         this.tri(filteredWeapons)
      },
      tri(filtred) {
         let sorted = filtred

         console.log("Nb of element:", sorted.length)

         sorted = sorted.slice(0, this.displayed)

         this.$emit("filteredWeapons", sorted) // send event output
      },
   },
   mounted() {
      this.filter()
   },
}
</script>
