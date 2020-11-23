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

function formattingSum(setsOfArmors, title, attribut) {
   if (setsOfArmors.length > 0 && setsOfArmors[0].armors.length > 0) {
      const setsSum = setsOfArmors.map(set => {
         return { "name": set.name, "final": sumSameSubAttribut(set.armors, attribut) }
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

function sumElementaryDefense(setsOfArmors) {
   return formattingSum(setsOfArmors, "Elementary defense", "resistances")
}
function sumDefense(setsOfArmors) {
   return formattingSum(setsOfArmors, "Defense", "defense")
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
      currentStats: {},
      allSetsStats: {}
   }

   const all = {
      currentStats: {
         elementaryDefenses: armors.currentStats.elementaryDefenses,
         defense: armors.currentStats.defense
      },
      allSetsStats: {
         elementaryDefenses: armors.allSetsStats.elementaryDefenses,
         defense: armors.allSetsStats.defense
      }
   }

   return {
      armors: armors,
      weapon: weapon,
      all: all,
   }
}