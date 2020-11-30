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
    - update:filteredCharms : send the filter applied to allCharms
*/
export default {
   name: "FiltersCharms",
   props: {
      allCharms: {
         // input
         type: Array,
         default: () => [], // equivalent à 'default: []'
      },
      filteredCharms: {
         type: Array,
         default: () => [], // equivalent à 'default: []'
      },
   },
   components: {},
   data() {
      return {
         name: "",
         displayed: 25,
         displayed_list: [5, 10, 25, 50, 75, 100, 150, 200, 250],
      }
   },
   watch: {},
   methods: {
      filter() {
         console.log("this.allCharms:", this.allCharms)
         this.name = this.name.toLowerCase()
         const predicate = e => {
            return this.name === "" ? true : e.name.toLowerCase().includes(this.name)
         }
         const filteredArmors = this.allCharms.filter(predicate)
         this.tri(filteredArmors)
      },
      tri(filtred) {
         let sorted = filtred

         console.log("Nb of element:", sorted.length)

         sorted = sorted.slice(0, this.displayed)

         this.$emit("update:filteredCharms", sorted) // send event output
      },
   },
   mounted() {
      this.filter()
   },
}
</script>
