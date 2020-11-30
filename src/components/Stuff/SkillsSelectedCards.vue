<template>
   <div>
      <div class="row border" v-for="skill in testSkill" :key="skill.id">
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
      return {
         testSkill: [
            {
               max: 2,
               id: 1,
               name: "Poison Resistance",
               description: "Reduces damage while poisoned.",
               ranks: [
                  {
                     max: 2,
                     id: 1,
                     skill: 1,
                     level: 1,
                     modifiers: {},
                     description: "Reduces the number of times you take poison damage.",
                     skillName: "Poison Resistance",
                  },
                  {
                     max: 1,
                     id: 2,
                     skill: 1,
                     level: 2,
                     modifiers: {},
                     description: "Greatly reduces the number of times you take poison damage.",
                     skillName: "Poison Resistance",
                  },
                  {
                     max: 1,
                     id: 3,
                     skill: 1,
                     level: 3,
                     modifiers: {},
                     description: "Prevents poison.",
                     skillName: "Poison Resistance",
                  },
               ],
            },
            {
               max: 1,
               id: 2,
               name: "Paralysis Resistance",
               description: "Reduces the duration of paralysis.",
               ranks: [
                  {
                     max: 1,
                     id: 4,
                     skill: 2,
                     level: 1,
                     modifiers: {},
                     description: "Reduces the duration of paralysis by 30%.",
                     skillName: "Paralysis Resistance",
                  },
                  {
                     max: 1,
                     id: 5,
                     skill: 2,
                     level: 2,
                     modifiers: {},
                     description: "Reduces the duration of paralysis by 60%.",
                     skillName: "Paralysis Resistance",
                  },
                  {
                     max: 1,
                     id: 6,
                     skill: 2,
                     level: 3,
                     modifiers: {},
                     description: "Prevents paralysis.",
                     skillName: "Paralysis Resistance",
                  },
               ],
            },
            {
               max: 1,
               id: 3,
               name: "Sleep Resistance",
               description: "Reduces the duration of sleep.",
               ranks: [
                  {
                     max: 1,
                     id: 7,
                     skill: 3,
                     level: 1,
                     modifiers: {},
                     description: "Reduces the duration of sleep by 30%.",
                     skillName: "Sleep Resistance",
                  },
                  {
                     max: 1,
                     id: 8,
                     skill: 3,
                     level: 2,
                     modifiers: {},
                     description: "Reduces the duration of sleep by 60%.",
                     skillName: "Sleep Resistance",
                  },
                  {
                     max: 1,
                     id: 9,
                     skill: 3,
                     level: 3,
                     modifiers: {},
                     description: "Prevents sleep.",
                     skillName: "Sleep Resistance",
                  },
               ],
            },
            {
               max: 1,
               id: 4,
               name: "Stun Resistance",
               description: "Reduces stun duration.",
               ranks: [
                  {
                     max: 1,
                     id: 10,
                     skill: 4,
                     level: 1,
                     modifiers: {},
                     description: "Reduces the duration of stun by 60%.",
                     skillName: "Stun Resistance",
                  },
                  {
                     max: 1,
                     id: 11,
                     skill: 4,
                     level: 2,
                     modifiers: {},
                     description: "Reduces the duration of stun by 90%.",
                     skillName: "Stun Resistance",
                  },
                  {
                     max: 1,
                     id: 12,
                     skill: 4,
                     level: 3,
                     modifiers: {},
                     description: "Prevents stun.",
                     skillName: "Stun Resistance",
                  },
               ],
            },
            {
               max: 1,
               id: 5,
               name: "Muck Resistance",
               description: "Reduces impairments to mobility while stuck in monster muck.",
               ranks: [
                  {
                     max: 1,
                     id: 13,
                     skill: 5,
                     level: 1,
                     modifiers: {},
                     description: "Reduces limits on movement speed and evasion.",
                     skillName: "Muck Resistance",
                  },
               ],
            },
            {
               max: 1,
               id: 6,
               name: "Blast Resistance",
               description: "Grants protection against blastblight.",
               ranks: [
                  {
                     max: 1,
                     id: 14,
                     skill: 6,
                     level: 1,
                     modifiers: {},
                     description: "Delays blastblight and reduces blast damage.",
                     skillName: "Blast Resistance",
                  },
                  {
                     max: 1,
                     id: 15,
                     skill: 6,
                     level: 2,
                     modifiers: {},
                     description: "Greatly delays blastblight and greatly reduces blast damage.",
                     skillName: "Blast Resistance",
                  },
                  {
                     max: 1,
                     id: 16,
                     skill: 6,
                     level: 3,
                     modifiers: {},
                     description: "Prevents blastblight.",
                     skillName: "Blast Resistance",
                  },
               ],
            },
            {
               max: 1,
               id: 7,
               name: "Bleeding Resistance",
               description: "Grants protection against bleeding.",
               ranks: [
                  {
                     max: 1,
                     id: 17,
                     skill: 7,
                     level: 1,
                     modifiers: {},
                     description: "Reduces damage while bleeding.",
                     skillName: "Bleeding Resistance",
                  },
                  {
                     max: 1,
                     id: 18,
                     skill: 7,
                     level: 2,
                     modifiers: {},
                     description: "Greatly reduces damage while bleeding.",
                     skillName: "Bleeding Resistance",
                  },
                  {
                     max: 1,
                     id: 19,
                     skill: 7,
                     level: 3,
                     modifiers: {},
                     description: "Prevents bleeding.",
                     skillName: "Bleeding Resistance",
                  },
               ],
            },
            {
               max: 1,
               id: 8,
               name: "Iron Skin",
               description: "Grants protection against Defense Down.",
               ranks: [
                  {
                     max: 1,
                     id: 20,
                     skill: 8,
                     level: 1,
                     modifiers: {},
                     description: "Reduces the duration of Defense Down by 50%.",
                     skillName: "Iron Skin",
                  },
                  {
                     max: 1,
                     id: 21,
                     skill: 8,
                     level: 2,
                     modifiers: {},
                     description: "Reduces the duration of Defense Down by 75%.",
                     skillName: "Iron Skin",
                  },
                  {
                     max: 1,
                     id: 22,
                     skill: 8,
                     level: 3,
                     modifiers: {},
                     description: "Prevents Defense Down.",
                     skillName: "Iron Skin",
                  },
               ],
            },
            {
               max: 1,
               id: 9,
               name: "Earplugs",
               description: "Grants protection from large monsters' roars.",
               ranks: [
                  {
                     max: 1,
                     id: 23,
                     skill: 9,
                     level: 1,
                     modifiers: {},
                     description: "Slightly reduces the effects of weak monster roars.",
                     skillName: "Earplugs",
                  },
                  {
                     max: 1,
                     id: 24,
                     skill: 9,
                     level: 2,
                     modifiers: {},
                     description: "Reduces the effects of weak monster roars.",
                     skillName: "Earplugs",
                  },
                  {
                     max: 1,
                     id: 25,
                     skill: 9,
                     level: 3,
                     modifiers: {},
                     description: "Nullifies weak monster roars.",
                     skillName: "Earplugs",
                  },
                  {
                     max: 1,
                     id: 410,
                     skill: 9,
                     level: 4,
                     modifiers: {},
                     description:
                        "Nullifies weak monster roars and reduces the effects of strong monster roars.",
                     skillName: "Earplugs",
                  },
                  {
                     max: 1,
                     id: 411,
                     skill: 9,
                     level: 5,
                     modifiers: {},
                     description: "Nullifies weak and strong monster roars.",
                     skillName: "Earplugs",
                  },
               ],
            },
         ],
      }
   },
   computed: {},
   watch: {},
   methods: {},
}
</script>
