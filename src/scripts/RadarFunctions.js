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

function sumElementaryDefense(setsOfArmors) {
    if (setsOfArmors.length > 0 && setsOfArmors[0].armors.length > 0) {
        const setsSum = setsOfArmors.map(set => {
            return { "name": set.name, "final": sumSameSubAttribut(set.armors, "resistances") }
        })
        return {
            "title": "Elementary defense",
            "labels": Object.keys(setsSum[0].final),
            "data": setsSum.map(set => { return { "setName": set.name, "values": Object.values(set.final) } })
        }
    }
    else
        return undefined
}
function sumDefense(setsOfArmors) {
    if (setsOfArmors.length > 0 && setsOfArmors[0].armors.length > 0) {
        const setsSum = setsOfArmors.map(set => {
            return { "name": set.name, "final": sumSameSubAttribut(set.armors, "defense") }
        })
        return {
            "title": "Defense",
            "labels": Object.keys(setsSum[0].final),
            "data": setsSum.map(set => { return { "setName": set.name, "values": Object.values(set.final) } })
        }
    }
    else
        return undefined
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
    const armors = {
        currentStats: {
            elementaryDefenses: sumElementaryDefense([currentSet]),
            defense: sumDefense([currentSet])
        },
        allSetsStats: {
            elementaryDefenses: sumElementaryDefense(savedSets),
            defense: sumDefense(savedSets),
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