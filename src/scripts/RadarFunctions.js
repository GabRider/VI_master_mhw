/* eslint-disable no-unused-vars */

function sumSameSubAttribut(array, attribut) {
   const final = {}
   array.forEach(o => {
      if (o[attribut] != null) {
         Object.entries(o[attribut]).forEach(([key, value]) => {
            if (final[key] == null)
               final[key] = value
            else
               final[key] += value
         })

      }
   })
   return final
}

function formattingSum(sets, setField, title, attribut) {
   if (sets.length > 0 && sets[0][setField].length > 0) {
      const setsSum = sets.map(set => {
         return { "name": set.name, "final": sumSameSubAttribut(set[setField], attribut) }
      })
      return {
         "title": title,
         "labels": Object.keys(setsSum[0].final),
         "data": setsSum.map(set => { return { "setName": set.name, "values": Object.values(set.final) } })
      }
   }
   else
      return undefined
}

function sumElementaryDefense(sets) {
   return formattingSum(sets, "armors", "Elementary defense", "resistances")
}
function sumDefense(sets) {
   return formattingSum(sets, "armors", "Defense", "defense")
}
function sumAttack(sets) {
   return formattingSum(sets, "weapon", "Attack", "attack")
}
function sumSlots(sets, setField) {
   if (sets.length > 0 && sets[0][setField].length > 0) {
      const setsSum = sets.map(set => set[setField]
         .flatMap(e => e.slots)
         .reduce(
            (accumulator, currentValue) => {
               if (currentValue.rank)
                  accumulator.final[currentValue.rank.toString()] += 1
               return accumulator
            },
            { "name": set.name, "final": { "4": 0, "3": 0, "2": 0, "1": 0 } })
      )
      return {
         "title": "Jewels slots",
         "labels": Object.keys(setsSum[0].final),
         "data": setsSum.map(set => { return { "setName": set.name, "values": Object.values(set.final) } })
      }
   }
   else
      return undefined
}
function sumSkills(sets, allSkills, setField) {
   if (sets.length > 0 && sets[0][setField].length > 0) {
      const setsSkills = sets.map(set => {
         return {
            "setName": set.name,
            "values": set[setField]
               .flatMap(e => e.skills)
               .reduce((acc, skill, i) => {
                  const skillInAcc = acc.find(s => s.skill === skill.skill)
                  if (skillInAcc) skillInAcc.level += skill.level
                  else acc.push({ "id": skill.skill, "level": skill.level })
                  return acc
               }, [])
               .map(s => {
                  let cpt = s.id - 5 // optimisation de recherche
                  if (cpt < 0) cpt = 0
                  while (cpt < allSkills.length) {
                     if (allSkills[cpt].id === s.id) {
                        const skill = allSkills[cpt]
                        if (skill.ranks.length < s.level) skill.max = s.level
                        else skill.max = skill.ranks.length
                        return skill
                     }
                     cpt = cpt + 1
                  }
                  console.log("Optimisation Recherche Skill échoué")
                  const skill = allSkills.find(s2 => s2.id === s.id)
                  skill.max = s.level
                  return skill
               })
         }
      })

      return {
         "title": "Skills",
         "labels": Array.from(new Set(setsSkills.flatMap(set => set.values.map(s => s.name)))),
         "data": setsSkills
      }
   }
   else
      return undefined
}
function getWeaponAffinity(sets) {
   if (sets.length > 0 && sets[0].weapon.length > 0) {
      const affPerSet = sets.map(set => {
         if (set.length > 0 && set.weapon[0].attributes.affinity) {
            return { "setName": set.name, "values": set.weapon[0].attributes.affinity }
         }
         else
            return { "setName": set.name, "values": 0 }
      })
      return {
         "title": "Affinity",
         "labels": ["affinity"],
         "data": affPerSet
      }
   }
   else
      return undefined
}
function getWeaponTranchant(sets) {
   if (sets.length > 0 && sets[0].weapon.length > 0) {
      const setsSum = sets.map(set => {
         const d = {
            "name": set.name,
            "values": {
               "red": 0,
               "orange": 0,
               "yellow": 0,
               "green": 0,
               "blue": 0,
               "white": 0,
               "purple": 0
            }
         }
         if (set.weapon.length > 0 && set.weapon[0].durability)
            d.values = set.weapon[0].durability[0]
         return d
      })
      return {
         "title": "Tranchant",
         "labels": Object.keys(setsSum[0].values),
         "data": setsSum.map(set => { return { "setName": set.name, "values": Object.values(set.values) } })
      }
   }
   else
      return undefined
}
export function getInfoForAnyChart(
   currentName,
   currentArmors,
   currentWeapon,
   currentSkills,
   currentCharm,
   savedSets,
   allSkills,
) {

   /*
   return
   {
      "armors": {
         allSetsStats: {
            elementaryDefenses: {
               title: String
               labels: Array<String>
               data: Array<Object> [
                  {
                     setName: String,
                     values: Array<Number>
                  }, 
                  {...}
               ]
            },
            defense: {...},
         },
         currentStats: {...},
      },
      "weapon": {...},
      "all": {...},
   },
   */

   const currentSet = {
      name: currentName,
      armors: currentArmors,
      weapon: currentWeapon,
      skills: currentSkills,
      charm: currentCharm,
   }

   function cloneAndAddOrNothing(sets) {
      // clone and add the not saved currentSet
      if (!sets.some(set => set.name === currentName)) {
         let shallowClone = [...sets]
         shallowClone.unshift(currentSet)
         return shallowClone
      }
      return sets // Nothing
   }
   const tmp = cloneAndAddOrNothing(savedSets)
   const workingSets = tmp.map(set => (set.name === currentName) ? currentSet : set)

   const armors = {
      currentStats: {
         elementaryDefenses: sumElementaryDefense([currentSet]),
         defense: sumDefense([currentSet]),
      },
      allSetsStats: {
         elementaryDefenses: sumElementaryDefense(workingSets),
         defense: sumDefense(workingSets),
      },
   }

   const weapon = {
      currentStats: {
         attack: sumAttack([currentSet])
      },
      allSetsStats: {
         attack: sumAttack(workingSets)
      }
   }

   const slots = sumSlots(workingSets, "armors")
   const tranchant = getWeaponTranchant(workingSets)
   const affinity = getWeaponAffinity(workingSets)
   const skills = sumSkills(workingSets, allSkills, "armors")

   const all = {
      currentStats: {
         elementaryDefenses: armors.currentStats.elementaryDefenses,
         defense: armors.currentStats.defense,
         attack: weapon.currentStats.attack,
      },
      allSetsStats: {
         elementaryDefenses: armors.allSetsStats.elementaryDefenses,
         defense: armors.allSetsStats.defense,
         attack: weapon.allSetsStats.attack,
         tranchant: tranchant,
         affinity: affinity,
         skills: skills,
         slots: slots,
      }
   }

   return {
      armors: armors,
      weapon: weapon,
      all: all,
   }
}
