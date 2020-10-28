<template>
    <div>
        <div class="card">
            <img v-if="piece.assets === null" />
            <img
                v-else-if="piece.assets.image"
                :src="piece.assets.image"
            />
            <div class="container">
                <h4>
                    <b>{{ piece.name }}</b>
                </h4>
                <p>type: {{ piece.type }}</p>
                <p>rarity: {{ piece.rarity }}</p>
                <p>attack: {{ piece.attack.display }}</p>
                <p>elements: {{ piece.elements }}</p>
                <p>elderseal: {{ piece.elderseal }}</p>
            </div>
        </div>
    </div>
</template>


<script>
/*
### champs utiles:

name : String
type : String
rarity : Int
attack : Object
    display : Int
    raw : Int
elements : Array<Object>
    type : String
    damage : Int
    hidden : Boolean
slots : Array
    - rank : Int
    - rank : Int
durability : Array<Object>
    red : Int
    orange : Int
    yellow : Int
    green : Int
    blue : Int
    white : Int
    purple : Int
assets : Object
    icon : String url
    image : String url
elderseal : null
*/
export default {
    props: {
        value: {
            // input
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            piece: this.value,
        };
    },
    watch: {
        value(value) {
            // receive parent change of the piece
            console.log("armors changed in composant");
            this.piece = value;
        },
    },
};
</script>


<style>
.card {
    /* Add shadows to create the "card" effect */
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
}

/* On mouse-over, add a deeper shadow */
.card:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

/* Add some padding inside the card container */
.container {
    padding: 2px 16px;
}
</style>