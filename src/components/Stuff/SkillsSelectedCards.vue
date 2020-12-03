<template>
   <div>
      <div class="row border" v-for="skill in skills" :key="skill.id">
         <div class="col-3">{{ skill.name }}</div>
         <div class="col-3">
            <div
               v-for="rank in skill.ranks"
               :key="rank.id"
               class="float-left m-1 border"
               style="display: block; width: 32px; height: 32px"
               :class="{
                  'bg-dark': rank.level <= skill.max,
                  'bg-primary': rank.level > skill.max,
               }"
            ></div>
         </div>
         <div v-if="skill.max-1<skill.ranks.length" class="col-6">{{  skill.ranks[skill.max-1].description }}</div>
            <div v-else class="col-6">{{  skill.ranks[skill.max-1].description }}</div>
      </div>
   </div>
</template>
<script>
export default {
   name: "SkillsSelected",
   props: {
      skills: {
         type: Array,
         default: () => [],
      },
   },
   components: {},
   data() {
      return {}
        
   },
   computed: {},
   watch: {},
   methods: {},
}
</script>
