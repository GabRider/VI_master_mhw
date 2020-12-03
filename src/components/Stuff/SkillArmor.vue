<template>
   <div >
      <div v-for="skill in skills" :key="skill.id">
               <div
               class="float-left"
                  style="display: block;"><span class="badge badge-primary">{{ skill.skillName }}</span></div>
               <div
                  v-for="index in skill.level"
                  :key="index"
                  class="float-left m-1 border bg-dark"
                  style="display: block; width: 15px; height: 15px"
               ></div>
            <span>{{ skill.description }}</span>         
      </div>
   </div>
</template>
<script>
export default {
   name: "SkillArmor",
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
