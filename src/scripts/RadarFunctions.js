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
   
    return { "labels":Object.keys(final),  "values": Object.values(final),"name": "Elementary Defense set number "}
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
   
    return { "labels":Object.keys(final),  "values": Object.values(final), name:"Defense set number "}
}

export function getInfoForAnyChart(arrObjs)
{
    return {
        "elementaryDefenses": createRadarElementaryDefense(arrObjs),
        "defenses": createRadarDefense(arrObjs)
    }
}