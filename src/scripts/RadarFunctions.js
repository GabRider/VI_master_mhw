function createRadarElementaryDefense( arrObject)
{
    const final={}
    arrObject.forEach(obj => {
        
        let resistances= obj.resistances
        if(resistances!=null)
        {
           
            Object.entries(resistances).forEach(([key,value])=>{
                if(final[key]==null)
                     final[key]=value
                else 
                    final[key]+=value
            })
            
        }
    });
   
    return { "labels":Object.keys(final),  "values":
    {
        "label": 'Elementary Defense',
        "borderWidth": 1,
        "backgroundColor": 'rgba(54, 162, 235, 0.2)', 
        "data":Object.values(final)
    }}
}
function createRadarDefense( arrObject)
{
    const final={}
    arrObject.forEach(obj => {
        
        let defenses= obj.defense
        if(defenses!=null)
        {
           
            Object.entries(defenses).forEach(([key,value])=>{
                if(final[key]==null)
                     final[key]=value
                else 
                    final[key]+=value
            })
            
        }
    });
   
    return { "labels":Object.keys(final),  "values":
    {
        "label": 'Defense',
        "borderWidth": 1,
        "backgroundColor": 'rgba(32, 212, 25, 0.2)', 
        "data":Object.values(final)
    },
    "options":{
         yaxis: {
        max: 20,
        
      },
      responsive: true,
        maintainAspectRatio: false
    }
}
}

export function getInfoForAnyChart(arrObjs)
{
    return {
        "elementaryDefenses": createRadarElementaryDefense(arrObjs),
        "defenses": createRadarDefense(arrObjs)
    }
}