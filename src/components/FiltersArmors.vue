<template>
    <div class="form-row">
        <div class="input-group form-group col-sm-4">
            <input
                type="search"
                class="form-control"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="basic-addon2"
                v-model="name"
            />
            <div class="input-group-append">
                <button class="btn btn-outline-success" type="button" @click="filter()">
                    Search
                </button>
            </div>
        </div>

        <!-- type filter -->
        <div class="input-group form-group col-sm-4">
            <div class="input-group-prepend">
                <label class="input-group-text" for="selectType">Type</label>
            </div>
            <select class="custom-select" id="selectType" v-model="type" @change="filter()">
                <option v-for="t in type_list" :key="t" :value="t">
                    {{ t }}
                </option>
            </select>
        </div>

        <!-- rank filter -->
        <div class="input-group form-group col-sm-4">
            <div class="input-group-prepend">
                <label class="input-group-text" for="selectType">Rank</label>
            </div>
            <select class="custom-select" id="selectType" v-model="rank" @change="filter()">
                <option v-for="t in rank_list" :key="t" :value="t">
                    {{ t }}
                </option>
            </select>
        </div>

        <!-- jewels filter -->
        <div class="input-group form-group col-sm-4">
            <div class="input-group-prepend">
                <label class="input-group-text" for="selectType">Jewels slot</label>
            </div>
            <select class="custom-select" id="selectType" v-model="slots" @change="filter()">
                <option v-for="t in slots_list" :key="t" :value="t">
                    {{ t }}
                </option>
            </select>
        </div>

        <!-- resistances filter -->
        <div class="input-group form-group col-sm-4">
            <div class="input-group-prepend">
                <label class="input-group-text" for="selectType">Elemental resistances</label>
            </div>
            <select class="custom-select" id="selectType" v-model="resistances" @change="filter()">
                <option v-for="t in resistances_list" :key="t" :value="t">
                    {{ t }}
                </option>
            </select>
        </div>

        <!-- count to display -->
        <div class="input-group form-group col-sm-4">
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
    - update:filteredArmors : send the filter applied to allArmors
*/
export default {
    name: "FiltersArmors",
    props: {
        allArmors: {
            // input
            type: Array,
            default: () => [], // equivalent à 'default: []'
        },
        filteredArmors: {
            type: Array,
            default: () => [], // equivalent à 'default: []'
        },
    },
    components: {},
    data() {
        return {
            name: "",
            type: "all",
            rank: "all",
            slots: "all",
            resistances: "all",
            displayed: 25,
            type_list: ["all", "head", "chest", "gloves", "waist", "legs"],
            rank_list: ["all", "low", "high", "master"],
            slots_list: ["all", 0, 1, 2, 3, 4],
            resistances_list: ["all", "fire", "water", "ice", "thunder", "dragon"],
            displayed_list: [5, 10, 25, 50, 75, 100, 150, 200, 250],
        }
    },
    watch: {
    },
    methods: {
        filter() {
            this.name = this.name.toLowerCase()
            const predicate = e => {
                const type = this.type === "all" ? true : e.type === this.type
                const rank = this.rank === "all" ? true : e.rank === this.rank
                const slots =
                    this.slots === "all" || (this.slots === 0 && e.slots.length == 0)
                        ? true
                        : e.slots.some(s => s.rank === this.slots)
                // optimisation de perf
                if (type && rank && slots)
                    return this.name === "" ? true : e.name.toLowerCase().includes(this.name)
                else return false
            }
            const filteredArmors = this.allArmors.filter(predicate)
            this.tri(filteredArmors)
        },
        tri(filtred) {
            let sorted = filtred

            if (this.resistances !== "all") {
                // tri plus grand au plus petit
                const resistances = this.resistances
                const predicat = (a, b) => b.resistances[resistances] - a.resistances[resistances]
                sorted = sorted.sort(predicat)
            }

            console.log("Nb of element:", sorted.length)

            sorted = sorted.slice(0, this.displayed)

            this.$emit("update:filteredArmors", sorted) // send event output
        },
    },
    mounted() {
        this.filter()
    },
}
</script>
