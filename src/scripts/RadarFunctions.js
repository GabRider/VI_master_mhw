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
   if (sets.length > 0 && sets[0].armors.length > 0) {
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

export function getInfoForAnyChart(currentName, currentArmors, currentWeapon, savedSets) {

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
         defense: sumDefense([currentSet])
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
      }
   }

   return {
      armors: armors,
      weapon: weapon,
      all: all,
   }
}