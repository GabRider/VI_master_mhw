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
   const setsweapons = formattingSum(sets, "weapon", "Attack", "attack")
   if (setsweapons) {
      let i = 0
      setsweapons.data.forEach(set => {
         if (sets[i].weapon.length > 0)
            set.metadata = sets[i].weapon[0].type
         i++
      })
   }
   return setsweapons
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

   let setsSkills = undefined
   function predicatGetSkillInfo(PartialSkill) {
      let cpt = PartialSkill.id - 5 // optimisation de recherche temps constant O(1 à 5)
      if (cpt < 0) cpt = 0
      while (cpt < allSkills.length) {
         if (allSkills[cpt].id === PartialSkill.id) {
            const skillO = allSkills[cpt]
            const skill = { ...skillO } // copie clone de la 1ere couche
            if (skill.ranks.length > PartialSkill.level) skill.max = PartialSkill.level
            else skill.max = skill.ranks.length
            return skill
         }
         cpt++
      }
      console.log("Optimisation Recherche Skill échoué", PartialSkill)
      const skill = allSkills.find(s2 => s2.id === PartialSkill.id)
      if (skill.ranks.length > PartialSkill.level) skill.max = PartialSkill.level
      else skill.max = skill.ranks.length
      return skill
   }

   if (sets.length > 0 && setField === "armors" && sets[0][setField].length > 0) {
      const setsSkills2 = sets.map(set => {
         return {
            "setName": set.name,
            "values": set[setField]
               .flatMap(e => e.skills) // [skills, ...] => [skill,...]
               .reduce((acc, skill, i) => {
                  const skillInAcc = acc.find(s => s.id === skill.skill)
                  if (skillInAcc) skillInAcc.level += skill.level
                  else acc.push({ "id": skill.skill, "level": skill.level })
                  return acc
               }, [])
               .map(predicatGetSkillInfo)
         }
      })
      setsSkills = setsSkills2
   }
   else if (sets.length > 0 && setField === "charm" && sets[0][setField].length > 0) {
      const setsSkills2 = sets.map(set => {
         return {
            "setName": set.name,
            "values": set[setField]
               .flatMap(e => {
                  const skills = e.ranks[e.ranks.length - 1].skills // get max level of charm
                  return skills.map(skill => { return { "id": skill.skill, "level": skill.level } })
               })
               .map(predicatGetSkillInfo)
         }
      })
      setsSkills = setsSkills2
   }
   else
      return undefined

   return {
      "title": "Skills",
      "labels": Array.from(new Set(setsSkills.flatMap(set => set.values.map(s => s.name)))),
      "data": setsSkills
   }
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

function mergeSetsSlots(sets1_in_out, sets2) {
   // modifie l'objet sets1_in_out
   if (sets1_in_out === undefined) { sets1_in_out = sets2; return }
   if (sets2 === undefined) return
   let i = 0
   while (i < sets1_in_out.data.length) {
      let j = 0
      while (j < sets1_in_out.data[i].values.length) {
         sets1_in_out.data[i].values[j] += sets2.data[i].values[j]
         j++
      }
      i++
   }
}

function mergeSetsSkills(sets1_in_out, sets2) {
   // modifie l'objet sets1_in_out
   if (sets1_in_out === undefined) { sets1_in_out = sets2; return }
   if (sets2 === undefined) return

   let i = 0
   while (i < sets1_in_out.data.length) {
      sets2.data[i].values.forEach(skill => {
         const skillFind = sets1_in_out.data[i].values.find(s => s.id === skill.id)
         if (skillFind) {
            if (skillFind.max + skill.max < skillFind.ranks.length) skillFind.max += skill.max
            else skillFind.max = skillFind.ranks.length
         } else {
            if (!sets1_in_out.labels.some(name => name === skill.name))
               sets1_in_out.labels.push(skill.name)
            sets1_in_out.data[i].values.push(skill)
         }
      })
      i++
   }
}

function calcAffinity(setsAffinity, setsSkills) {

   if (setsAffinity === undefined) return
   if (setsSkills === undefined) return

   let i = 0
   while (i < setsAffinity.data.length) {
      const value = setsSkills.data[i].values.reduce(((value, skill) =>
         skill.ranks[skill.max - 1].modifiers.affinity ? value + skill.ranks[skill.max - 1].modifiers.affinity : value
      ), 0)
      setsAffinity.data[i].values += value
      i++
   }
}

function calcAttack(setsAttack, setsSkills) {

   /*
      Hammer (x 5.2)
      Great Sword (x 4.8)
      Hunting Horn (x 4.2)
      Charge Blade (x 3.6)
      Switch Axe (x 3.5)
      Long Sword (x 3.3)
      Insect Glaive (x 3.1)
      Lance (x 2.3)
      Gunlance (x 2.3)
      Heavy Bowgun (x 1.5)
      Sword and Shield (x 1.4)
      Dual Blades (x 1.4)
      Light Bowgun (x 1.3)
      Bow (x 1.2)
   */
   const type_list = [
      { name: "great-sword", coeff: 4.8 },
      { name: "long-sword", coeff: 3.3 },
      { name: "sword-and-shield", coeff: 1.4 },
      { name: "dual-blades", coeff: 1.4 },
      { name: "hammer", coeff: 5.2 },
      { name: "hunting-horn", coeff: 4.2 },
      { name: "lance", coeff: 2.3 },
      { name: "gunlance", coeff: 2.3 },
      { name: "switch-axe", coeff: 3.5 },
      { name: "charge-blade", coeff: 3.6 },
      { name: "insect-glaive", coeff: 3.1 },
      { name: "light-bowgun", coeff: 1.3 },
      { name: "heavy-bowgun", coeff: 1.5 },
      { name: "bow", coeff: 1.2 },
   ]
   if (setsAttack === undefined) return
   if (setsSkills === undefined) return

   let i = 0
   while (i < setsAttack.data.length) {
      if (setsAttack.data[i].values.length === 2) {
         const value = setsSkills.data[i].values.reduce(((value, skill) =>
            skill.ranks[skill.max - 1].modifiers.attack ? value + skill.ranks[skill.max - 1].modifiers.attack : value
         ), 0)
         setsAttack.data[i].values[1] += value // attack raw
         const type = type_list.find(e => e.name === setsAttack.data[i].metadata)
         setsAttack.data[i].values[0] += Math.round(value * type.coeff) // attack display
      }
      i++
   }
}

function calcTranchant(setsTranchant, setsSkills) {

}

function calcElementary(setsElementary, setsSkills) {

}

function calcDefense(setsDefense, setsSkills) {
   if (setsDefense === undefined) return
   if (setsSkills === undefined) return

   let i = 0
   while (i < setsDefense.data.length) {
      if (setsSkills.data[i].setName == "DSK") console.log("DSK", i, setsSkills.data[i])
      if (setsSkills.data[i].setName == "completeSet1") console.log("completeSet1", i, setsSkills.data[i])
      const avant = setsDefense.data[i].values
      const value = setsSkills.data[i].values.reduce(((value, skill) =>
         skill.ranks[skill.max - 1].modifiers.defense ? value + skill.ranks[skill.max - 1].modifiers.defense : value
      ), 0)
      setsDefense.data[i].values = setsDefense.data[i].values.map(v => v + value)
      const apres = setsDefense.data[i].values
      if (value != 0) {
         console.log("avant", setsDefense.data[i].setName, value)
         console.log("après", setsDefense.data[i].setName, value)
      }
      i++
   }
}


/*
      ####################### EXPORT ##################################
*/

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
      "all": {
         allSetsStats: {
            elementaryDefenses: {
               title: String
               labels: Array<String>
               data: Array<Object> [
                  {
                     setName: String,
                     values: Array<>
                  }, 
                  {...}
               ]
            },
            defense: {...},
            attack: {...},
            tranchant: {...},
            affinity: {...},
            skills: {...},
            slots: {...},
         },
         currentStats: {...},
      },
      "armors": {...},
      "weapon": {...},
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

   const elementaryDefenses = sumElementaryDefense(workingSets)
   const currElementaryDefenses = sumElementaryDefense([currentSet])
   const defense = sumDefense(workingSets)
   const currDefense = sumDefense([currentSet])
   const tranchant = getWeaponTranchant(workingSets)
   const currTranchant = getWeaponTranchant([currentSet])
   const affinity = getWeaponAffinity(workingSets)
   const currAffinity = getWeaponAffinity([currentSet])
   const attack = sumAttack(workingSets)
   const currAttack = sumAttack([currentSet])
   const slotsA = sumSlots(workingSets, "armors")
   const slotsW = sumSlots(workingSets, "weapon")
   const currSlotsA = sumSlots([currentSet], "armors")
   const currSlotsW = sumSlots([currentSet], "weapon")
   const skillsA = sumSkills(workingSets, allSkills, "armors")
   const skillsC = sumSkills(workingSets, allSkills, "charm")
   const currSkillA = sumSkills([currentSet], allSkills, "armors")
   const currSkillC = sumSkills([currentSet], allSkills, "charm")

   mergeSetsSlots(slotsA, slotsW)
   mergeSetsSlots(currSlotsA, currSlotsW)
   mergeSetsSkills(skillsA, skillsC)
   mergeSetsSkills(currSkillA, currSkillC)

   const slots = slotsA // slotsA was modified IN OUT by mergeSetsSlots()
   const skills = skillsA // skillsA was modified IN OUT by mergeSetsSkills()
   const currSlots = currSlotsA
   const currSkill = currSkillA

   calcTranchant(tranchant, skills)
   calcAffinity(affinity, skills)
   calcAttack(attack, skills)
   calcDefense(defense, skills)
   calcTranchant(currTranchant, currSkill)
   calcAffinity(currAffinity, currSkill)
   calcAttack(currAttack, currSkill)
   calcDefense(currDefense, currSkill)


   const all = {
      currentStats: {
         elementaryDefenses: currElementaryDefenses,
         defense: currDefense,
         attack: currAttack,
         tranchant: currTranchant,
         affinity: currAffinity,
         skills: currSkill,
         slots: currSlots,
      },
      allSetsStats: {
         elementaryDefenses: elementaryDefenses,
         defense: defense,
         attack: attack,
         tranchant: tranchant,
         affinity: affinity,
         skills: skills,
         slots: slots,
      }
   }

   return {
      all: all,
   }
}
