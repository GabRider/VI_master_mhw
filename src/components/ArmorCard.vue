<template>
    <div>
        <div
            class="card"
            @click="toggleSelect"
            style="max-width: 13rem"
            v-bind:class="{ 'border-dark': !isSelected, 'border-success': isSelected }"
        >
            <div class="col-auto">
                <img
                    v-if="piece.assets === null"
                    :src="getImgEmpty(piece.type)"
                    width="128"
                    height="128"
                />
                <img
                    v-else-if="piece.assets.imageMale"
                    :src="piece.assets.imageMale"
                    width="128"
                    height="128"
                    class=""
                />
                <img
                    v-else-if="piece.assets.imageFemale"
                    :src="piece.assets.imageFemale"
                    width="128"
                    height="128"
                />
            </div>
            <p class="card-header">
                <b>{{ piece.name }}</b>
            </p>
            <div class="card-body row text-left pr-0 py-1">
                <div class="col-sm-3">
                    <span class="badge badge-primary">type</span>
                </div>
                <span class="col"> {{ piece.type }}</span>
                <div class="w-100"></div>
                <!-- retour à la ligne -->
                <div class="col-sm-3">
                    <span class="badge badge-primary">rank</span>
                </div>
                <span class="col"> {{ piece.rank }}</span>
                <div class="w-100"></div>
                <!-- retour à la ligne -->
                <div class="col-sm-4">
                    <span class="badge badge-primary">defense</span>
                </div>
                <span class="col"> {{ piece.defense.base }}</span>
                <div class="w-100"></div>
                <!-- retour à la ligne -->
                <div class="col-sm-3">
                    <span class="badge badge-primary">jewels</span>
                </div>
                <div class="col">
                    <div class="col row">
                        <div class="" v-for="lvl in getListRankJewels(piece.slots)" :key="lvl.id">
                            <img :src="getImgJewel(lvl.rank)" width="24" height="24" />
                            <span class="pr-2"></span>
                        </div>
                    </div>
                </div>
                <div class="w-100"></div>
                <!-- retour à la ligne -->
                <div class="col-sm-4">
                    <span class="badge badge-primary">resistances</span>
                </div>
                <div class="w-100"></div>
                <!-- retour à la ligne 
                <div class="col-4 mx-0 px-0" v-for="[key, value] in Object.entries(piece.resistances)" :key="key">
                    <img :src="getImg(key)" width="32" height="32" />
                    <span >{{ value }}</span>
                </div> -->
                <!-- retour à la ligne -->
                <div class="col">
                    <div class="col row d-flex justify-content-between">
                        <div v-for="[key, value] in Object.entries(piece.resistances)" :key="key">
                            <img :src="getImg(key)" width="32" height="32" />
                            <span class="pr-0">{{ value }}</span>
                        </div>
                    </div>
                </div>
                <div class="w-100"></div>
                <!-- retour à la ligne -->
            </div>
            <div
                class="card-footer"
                v-bind:class="{ 'border-dark': !isSelected, 'bg-success': isSelected }"
            ></div>
        </div>
    </div>
</template>


<script>
/*
### champs utiles:

name : String
type : String
rank : Int
slots : Array
    - rank : Int
    - rank : Int
assets : Object
    imageMale : String url
    imageFemale : String url
resistances
defense
*/
/*
Output events :
    - selectPiece : send selected armor piece object
    - unselectPiece : send unselected armor piece object
*/
export default {
    name: "ArmorCard",
    props: {
        piece: {
            // input
            type: Object,
            default: () => {},
        },
        myCurrentArmorSetInput: {
            // input
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            myCurrentArmorSet: this.myCurrentArmorSetInput,
        }
    },
    computed: {
        isSelected() {
            return this.myCurrentArmorSet.some(e => e.id === this.piece.id)
        },
    },
    watch: {
        piece() {
            // receive parent change of the piece
            console.log("piece changed in composant", this.$options.name)
        },
        myCurrentArmorSetInput(newSet) {
            this.myCurrentArmorSet = newSet
        },
    },
    methods: {
        toggleSelect() {
            console.log("toggle Select")
            //this.isSelected = !this.isSelected
            // send event output
            if (this.isSelected) this.$emit("unselectPiece", this.piece)
            else this.$emit("selectPiece", this.piece)
        },
        getListRankJewels(slots) {
            return slots.map((e, i) => {
                e.id = i
                return e
            })
        },
        getImgEmpty(name) {
            return require("../assets/no-" + name + ".png")
        },
        getImg(name) {
            return require("../assets/" + name + ".png")
        },
        getImgJewel(lvl) {
            return require("../assets/joyau-" + lvl + ".png")
        },
    },
}
</script>
