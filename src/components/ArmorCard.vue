<template>
    <div>
        <div class="card">
            <img
                v-if="piece.assets === null && piece.type === 'chest'"
                src="https://assets.mhw-db.com/armor/31274503eeadb6cb37266a2f578db8c92456a984.70b16041b1e6483321cdd0ad72e8ce6f.png"
            />
            <img
                v-else-if="piece.assets === null && piece.type === 'gloves'"
                src="https://assets.mhw-db.com/armor/9b6875e88ccce560567805a05013c9dc7442da62.b20183ce896973506ff2e7efefb83017.png"
            />
            <img
                v-else-if="piece.assets === null && piece.type === 'head'"
                src="https://assets.mhw-db.com/armor/9e9e2c421697e3deb8fc8d362a7f2b8f911fa511.7284b9666abcf7560ace82a4e4a72f1d.png"
            />
            <img
                v-else-if="piece.assets === null && piece.type === 'legs'"
                src="https://assets.mhw-db.com/armor/c5c55c125f9ac5c9c2e074fcf171bdffd20af8e9.f428ae0c7a70bdccec78a78641054669.png"
            />
            <img
                v-else-if="piece.assets === null && piece.type === 'waist'"
                src="https://assets.mhw-db.com/armor/9f04b4887ee16b009d6403a676b73b79c51ee191.ef72cb09966c41a20ef3dbea3797f081.png"
            />
            <img
                v-else-if="piece.assets.imageMale"
                :src="piece.assets.imageMale"
            />
            <img
                v-else-if="piece.assets.imageFemale"
                :src="piece.assets.imageFemale"
            />
            <div class="container">
                <h4>
                    <b>{{ piece.name }}</b>
                </h4>
                <p>type: {{ piece.type }}</p>
                <p>rank: {{ piece.rank }}</p>
                <p>defense: {{ piece.defense.base }}</p>
                <p>resistances: {{ piece.resistances }}</p>
            </div>
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