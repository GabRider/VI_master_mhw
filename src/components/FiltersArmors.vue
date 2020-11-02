<template>
    <div>
        <div v-for="field in fields" v-bind:key="field.name">
            <p>{{ field }}</p>

            <input v-if="field === 'name'" type="search" />
            <div v-else-if="field === 'type'">
                <input
                    type="radio"
                    name="type"
                    value="all"
                    v-model="type"
                    @change="filter()"
                    checked
                />
                <label>All</label>
                <input type="radio" name="type" value="head" v-model="type" @change="filter()" />
                <label>Head</label>
                <input type="radio" name="type" value="chest" v-model="type" @change="filter()" />
                <label>Chest</label>
                <input type="radio" name="type" value="gloves" v-model="type" @change="filter()" />
                <label>Gloves</label>
                <input type="radio" name="type" value="waist" v-model="type" @change="filter()" />
                <label>Waist</label>
                <input type="radio" name="type" value="legs" v-model="type" @change="filter()" />
                <label>Legs</label>
            </div>
            <div v-else-if="field === 'rank'">
                <input
                    type="radio"
                    name="rank"
                    value="all"
                    v-model="rank"
                    @change="filter()"
                    checked
                />
                <label>All</label>
                <input type="radio" name="rank" value="low" v-model="rank" @change="filter()" />
                <label>Low</label>
                <input type="radio" name="rank" value="high" v-model="rank" @change="filter()" />
                <label>High</label>
                <input type="radio" name="rank" value="master" v-model="rank" @change="filter()" />
                <label>Master</label>
            </div>
            <div v-else-if="field === 'slots'">
                <input
                    type="radio"
                    name="slots"
                    value="all"
                    v-model="slots"
                    @change="filter()"
                    checked
                />
                <label>All</label>
                <input
                    type="radio"
                    name="slots"
                    value="0"
                    v-model.number="slots"
                    @change="filter()"
                />
                <label>0</label>
                <input
                    type="radio"
                    name="slots"
                    value="1"
                    v-model.number="slots"
                    @change="filter()"
                />
                <label>1</label>
                <input
                    type="radio"
                    name="slots"
                    value="2"
                    v-model.number="slots"
                    @change="filter()"
                />
                <label>2</label>
                <input
                    type="radio"
                    name="slots"
                    value="3"
                    v-model.number="slots"
                    @change="filter()"
                />
                <label>3</label>
                <input
                    type="radio"
                    name="slots"
                    value="4"
                    v-model.number="slots"
                    @change="filter()"
                />
                <label>4</label>
            </div>
        </div>
    </div>
</template>



<script>
/*
Output events :
    - filteredArmors : send the filter applied to allArmors
*/
export default {
    name: "FiltersArmors",
    props: {
        allArmors: {
            // input
            type: Array,
            default: () => [], // equivalent à 'default: []'
        }
    },
    components: {},
    data() {
        return {
            fields: ["name", "type", "rank", "slots"],
            name: "",
            type: "all",
            rank: "all",
            slots: "all",
        }
    },
    watch: {
        allArmors() {
            // receive parent change
            console.log("allArmors changed in composant", this.$options.name)
        },
    },
    methods: {
        filter() {
            const predicate = e => {
                const type = this.type === "all" ? true : e.type === this.type
                const rank = this.rank === "all" ? true : e.rank === this.rank
                const slots =
                    this.slots === "all" || (this.slots === 0 && e.slots.length == 0)
                        ? true
                        : e.slots.some(s => s.rank === this.slots)
                // optimisation de perf
                if (type && rank && slots)
                    return this.name === "" ? true : e.name.includes(this.name)
                else return false
            }
            const filteredArmors = this.allArmors.filter(predicate)
            console.log("Nb of element:", filteredArmors.length)
            this.$emit("filteredArmors", filteredArmors) // send event output
        },
    },
}
</script>


<style>
p,
label {
    font: 1rem "Fira Sans", sans-serif;
}

input {
    margin: 0.4rem;
}
</style>