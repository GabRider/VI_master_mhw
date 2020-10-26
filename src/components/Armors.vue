<template>
    <div>
        <ul>
            <li v-for="armor in armors" v-bind:key="armor.id">
                <p>{{ armor.id }} - {{ armor.name }}</p>
            </li>
        </ul>
        <p></p>
    </div>
</template>



<script>
export default {
    props: {
        value: { // input
            type: Array,
            default: () => [], // equivalent à 'default: []'
        },
    },
    data() {
        return {
            armors: this.value,
        }
    },
    watch: {
        value (value) {
            // receive parent change of the armors list
            console.log("armors changed in composant")
            this.armors = value
        },
    },
    methods: {
        updateParentArmors(armors) {
            this.armors = armors
            this.$emit("input", this.armors) // update parent armors list
        }
    },
}
// this.$emit("input", this.armors)
</script>