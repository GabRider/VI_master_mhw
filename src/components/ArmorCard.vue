<template>
    <div>
        <div class="card">
            <img :src="piece.assets.imageMale" alt="Avatar"/>
            <div class="container">
                <h4><b>{{ piece.name }}</b></h4>
                <p>type: {{ piece.type }}</p>
                <p>rank: {{ piece.rank }}</p>
                <p>defense: {{ piece.defense.base }} - {{ piece.defense.max }}</p>
                <p>defense: {{ piece.resistances }}</p>
            </div>
        </div>
    </div>
</template>


<script>
/*
### champs utiles:

type : String
rank : Int
defense : Object
    base : Int
    max : Int
    augmented : Int
resistances : Object
    fire : Int
    water : Int
    ice : Int
    thunder : Int
    dragon": Int
name : String
slots : Array
    - rank : Int
    - rank : Int
skills : Object
    skillName : String
    description : String
    modifiers : Object
    level : Int
    (id pour image?)
assets : Object
    imageMale : String url
    imageFemale : String url
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