<template>
   <div class="px-1 my-1 w-100">
      <!-- entry Set -->
      <div class="input-group form-group my-2">
         <div class="input-group-prepend">
            <label class="input-group-text" for="entrySet">Set name</label>
         </div>
         <input
            type="search"
            class="form-control"
            placeholder="Enter your set name"
            v-model="setName"
            id="entrySet"
         />
         <div class="input-group-append">
            <button class="btn btn-outline-success" type="button" @click="addSet">Add</button>
         </div>
         <div class="input-group-append">
            <span class="btn btn-outline-primary btn-file"
               >Import<input type="file" accept=".json" id="importFile" @change="importSet" />
            </span>
         </div>
      </div>

      <!-- select set -->
      <div class="input-group form-group">
         <div class="input-group-prepend">
            <label class="input-group-text" for="savedSet">Saved Sets</label>
         </div>
         <select
            class="custom-select"
            id="savedSet"
            v-model="setNameSelected"
            @change="selectSet()"
         >
            <option v-for="set in savedSets" :key="set.name" :value="set.name">
               {{ set.name }}
            </option>
         </select>
         <!-- Update set -->
         <div class="input-group-append">
            <button class="btn btn-outline-primary" type="button" @click="updateSet">Update</button>
         </div>
         <!-- Delete set -->
         <div class="input-group-append">
            <button class="btn btn-outline-danger" type="button" @click="deleteSet">Delete</button>
         </div>
         <!-- Delete set -->
         <div class="input-group-append">
            <button class="btn btn-outline-primary" type="button" @click="exportSet">Export</button>
         </div>
      </div>
      <a id="downloadAnchorElem" hidden></a>
   </div>
</template>


<script>
/*
SET object: {
    name: String,
    armors: Array<Armor>,
    weapon: Array<Weapon>,
}

*/
export default {
   name: "SetManager",
   props: {
      savedSets: {
         type: Array,
      },
      myCurrentSetName: {
         type: String,
      },
      myCurrentArmorSet: {
         type: Array,
      },
      myCurrentWeapon: {
         type: Array,
      },
      myCurrentSkills: {
         type: Array,
      },
      myCurrentCharm: {
         type: Array,
      },
   },
   data() {
      return {
         setName: "",
         setNameSelected: "",
      }
   },
   watch: {},
   methods: {
      addSet() {
         console.log("addSet")
         if (this.setName === "") {
            console.log("TODO : warning set name empty.")
            return
         }
         if (!this.savedSets.some(e => e.name === this.setName)) {
            const newSet = {
               name: this.setName,
               armors: this.myCurrentArmorSet,
               weapon: this.myCurrentWeapon,
               skills: this.myCurrentSkills,
               charm: this.myCurrentCharm,
            }
            this.savedSets.push(newSet)
            this.setNameSelected = this.setName
            this.$emit("update:myCurrentSetName", this.setNameSelected)
         } else {
            console.log("TODO : warning set name alredy exist.")
         }
      },
      selectSet() {
         console.log("selectSet")
         console.log("TODO : warning current set will be erased by the selected set.")
         const set = this.savedSets.find(e => e.name === this.setNameSelected)
         if (set === undefined) {
            console.log("TODO : warning set not found (app logic error).")
         } else {
            this.setName = set.name
            this.$emit("update:myCurrentSetName", this.setNameSelected)
            this.$emit("update:myCurrentArmorSet", set.armors)
            this.$emit("update:myCurrentWeapon", set.weapon)
            this.$emit("update:myCurrentSkills", set.skills)
            this.$emit("update:myCurrentCharm", set.charm)
         }
      },
      updateSet() {
         console.log("updateSet")
         if (!this.savedSets.some(e => e.name === this.setNameSelected)) {
            console.log("TODO : warning set not found (app logic error).")
            return
         }
         if (this.setName === "") {
            this.setName = this.setNameSelected
         }
         const newSets = this.savedSets.filter(e => !(e.name === this.setNameSelected))

         const newSet = {
            name: this.setName,
            armors: this.myCurrentArmorSet,
            weapon: this.myCurrentWeapon,
            skills: this.myCurrentSkills,
            charm: this.myCurrentCharm,
         }
         newSets.push(newSet)
         this.setNameSelected = this.setName

         this.$emit("update:savedSets", newSets)
         this.$emit("update:myCurrentSetName", this.setNameSelected)
      },
      deleteSet() {
         console.log("deleteSet")
         if (!this.savedSets.some(e => e.name === this.setNameSelected)) {
            console.log("TODO : warning set not found.")
            return
         }
         const newSets = this.savedSets.filter(e => !(e.name === this.setNameSelected))
         this.setNameSelected = ""
         this.setName = ""
         this.$emit("update:savedSets", newSets)
         this.$emit("update:myCurrentSetName", "nameless")
         this.$emit("update:myCurrentArmorSet", [])
         this.$emit("update:myCurrentWeapon", [])
         this.$emit("update:myCurrentSkills", [])
         this.$emit("update:myCurrentCharm", [])

         window.location.href = "#anchorSetManager"
      },
      exportSet() {
         console.log("exportSet")
         //<a href="data:text/json;charset=utf-8, + JSON.stringify(obj) +  download=data.json>download JSON</a>
         const dataStr = encodeURIComponent(
            JSON.stringify({ dataType: "MHW_VI", data: this.savedSets })
         )
         const downloadAnchorNode = document.createElement("a")
         downloadAnchorNode.setAttribute("href", "data:text/json;charset=utf-8," + dataStr)
         downloadAnchorNode.setAttribute("download", "savedSets.json")
         document.body.appendChild(downloadAnchorNode)
         downloadAnchorNode.click()
         downloadAnchorNode.remove()
      },
      importSet() {
         console.log("importSet")
         const t = this
         const file_to_read = document.getElementById("importFile").files[0]
         const fileread = new FileReader()
         fileread.onload = function (e) {
            let content = e.target.result
            content = JSON.parse(content) // Array of Objects.
            console.log("content", content)
            if (content.dataType === "MHW_VI") t.$emit("update:savedSets", content.data)
            else console.log("TODO : warning incorrect json file")
         }
         fileread.onloadend = function () {
            if (t.savedSets.length > 0) {
               t.setNameSelected = t.savedSets[0].name
               t.selectSet()
            }
         }
         fileread.readAsText(file_to_read)
      },
   },
}
</script>

<style>
.btn-file {
   position: relative;
   overflow: hidden;
}
.btn-file input[type="file"] {
   position: absolute;
   top: 0;
   right: 0;
   min-width: 100%;
   min-height: 100%;
   font-size: 100px;
   text-align: right;
   filter: alpha(opacity=0);
   opacity: 0;
   outline: none;
   background: white;
   cursor: inherit;
   display: block;
}
</style>