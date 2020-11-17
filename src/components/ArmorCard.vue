<template>
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
    - update:myCurrentArmorSet : send new value of myCurrentArmorSet
*/
export default {
    name: "ArmorCard",
    props: {
        piece: {
            // input
            type: Object,
            default: () => {},
        },
        myCurrentArmorSet: {
            // input
            type: Array,
        },
    },
    data() {
        return {}
    },
    computed: {
        isSelected() {
            return this.myCurrentArmorSet.some(e => e.id === this.piece.id)
        },
    },
    watch: {
    },
    methods: {
        toggleSelect() {
            console.log("toggle Select")
            if (this.isSelected) this.unselectPiece()
            else this.selectPiece()
        },
        selectPiece() {
            // console.log("Selected armor", this.piece)
            if (!this.myCurrentArmorSet.some(a => a.id === this.piece.id)) {
                let newArmorSet = this.myCurrentArmorSet.filter(e => e.type !== this.piece.type)
                newArmorSet.push(this.piece)
                this.$emit("update:myCurrentArmorSet", newArmorSet)
            }
        },
        unselectPiece() {
            // console.log("Unselected armor", this.piece)
            if (this.myCurrentArmorSet.some(a => a.id === this.piece.id)) {
                const newArmorSet = this.myCurrentArmorSet.filter(a => a.id !== this.piece.id)
                this.$emit("update:myCurrentArmorSet", newArmorSet)
            }
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
