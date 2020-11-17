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
                    :src="getImg(piece.type)"
                    :alt="piece.type"
                    width="128"
                    height="128"
                />
                <img
                    v-else-if="piece.assets.image"
                    :src="piece.assets.image"
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
                    <span class="badge badge-primary">rarity</span>
                </div>
                <span class="col"> {{ piece.rarity }}</span>
                <div class="w-100"></div>
                <!-- retour à la ligne -->
                <div class="col-sm-3">
                    <span class="badge badge-primary">attack</span>
                </div>
                <span class="col"> {{ piece.attack.display }}</span>
                <div class="w-100"></div>
                <!-- retour à la ligne -->
                <div class="col-sm-4">
                    <span class="badge badge-primary">elderseal</span>
                </div>
                <span class="col" v-if="piece.elderseal === null"> None</span>
                <span class="col" v-else> {{ piece.elderseal }}</span>
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
                    <span class="badge badge-primary">elements</span>
                </div>
                <div v-if="piece.elements && piece.elements.length > 0" class="ml-1">
                    <img :src="getImg(piece.elements[0].type)" width="32" height="32" />
                    <span class="pr-0">{{ piece.elements[0].damage }}</span>
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
rarity : Int
slots : Array
    - rank : Int
    - rank : Int
assets : Object
    imageMale : String url
    imageFemale : String url
elements
attack
*/
/*
Output events :
    - update:myCurrentWeapon : send new value of myCurrentWeapon
*/
export default {
    name: "WeaponCard",
    props: {
        piece: {
            // input
            type: Object,
        },
        myCurrentWeapon: {
            // input
            type: Array,
        },
    },
    data() {
        return {}
    },
    computed: {
        isSelected() {
            return this.myCurrentWeapon.some(e => e.id === this.piece.id)
        },
    },
    watch: {
    },
    methods: {
        toggleSelect() {
            console.log("toggle Select")
            //this.isSelected = !this.isSelected
            // send event output
            if (this.isSelected) this.$emit("update:myCurrentWeapon", [])
            else this.$emit("update:myCurrentWeapon", [this.piece])
        },
        getListRankJewels(slots) {
            return slots.map((e, i) => {
                e.id = i
                return e
            })
        },
        getImg(name) {
            try {
                return require("../assets/" + name + ".png")
            } catch (e) {
                console.log(name + ".png note found.")
                return ""
            }
        },
        getImgJewel(lvl) {
            return require("../assets/joyau-" + lvl + ".png")
        },
    },
}
</script>
