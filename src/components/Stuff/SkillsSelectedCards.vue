<template>
   <div>
      <div class="row border" v-for="skill in skills" :key="skill.id">
         <div class="col-3">{{ skill.name }}</div>
         <div class="col-3">
            <div class="progress" style="max-width: 100%; min-width: 100px;">
   
                
                       <div
                       v-for="rank in skill.ranks"
                        :key="rank.id" 
                       class=" progress-bar border-right border-white" 
                        :style="{width: 100 /Object.keys(skill.ranks).length  +'%','background-color': rank.level <= skill.max ?'#b0c4a5' : '#7f2e65','border-width':'1.5px !important'}"></div>
                       
   
   </div>
           
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
