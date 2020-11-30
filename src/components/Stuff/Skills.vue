<template>
   <div class="row card-columns ml-2">
      <SkillCard
         v-for="skill in skills"
         v-bind:key="skill.id"
         :piece="skill"
         :myCurrentSkills="myCurrentSkills"
         v-on:update:myCurrentSkills="updateMyCurrentSkills"
      ></SkillCard>
   </div>
</template>



<script>
/*
Output events :
    - selectPiece : send selected armor piece object
    - unselectPiece : send unselected armor piece object
*/
import SkillCard from "./SkillCard.vue"
export default {
   name: "Skills",
   props: {
      skills: {
         // input
         type: Array,
         default: () => [], // equivalent à 'default: []'
      },
      myCurrentSkills: {
         type: Array,
         default: () => [],
      },
   },
   components: {
      SkillCard,
   },
   data() {
      return {}
   },
   watch: {},
   methods: {
      updateMyCurrentSkills(event) {
         this.$emit("update:myCurrentSkills", event) // send event output
      },
   },
}
// this.$emit("input", this.armors)
</script>