

var actionLoot = {
    // Action Fill is basically just Action Transfer, except it puts energy into storage rather than out of it. This is used for Harvesters & Corpse Collectors
    run: function(creep){
        // var targets = creep.room.find(FIND_TOMBSTONES, {filter: (tombstone) => {return (tombstone.energy > 0);}});
        target = ""
        var targets = creep.room.find(FIND_TOMBSTONES)
        if(targets.length != 0){
            var total_value = {}
            for(i in targets){
                total_value[i] = 0
                for(j in RESOURCES_ALL){
                    total_value[i] += targets[i].store.getUsedCapacity(RESOURCES_ALL[j])
                }
            }
        }
        // console.log(JSON.stringify(total_value))
        for(i in total_value){
            if(total_value[i] != 0){
                target = targets[i]
                break
            }
        }
        if(target != ""){
            // if(creep.withdraw(target, RESOURCES_ALL) == ERR_NOT_IN_RANGE){
            //     creep.moveTo(target)
            // }
            
            
            
            if(creep.pos.inRangeTo(target,1) != true){
                creep.moveTo(target)
            }
            else{
                for(i in RESOURCES_ALL){
                    if(target.creep.store.getUsedCapacity(RESOURCES_ALL[i]) != 0){
                        creep.withdraw(target,RESOURCES_ALL[i])
                        break
                    }
                }
                
            }
        }
        else{
            creep.memory.action = "acting"
        }
        
        
        
            
            
            
            
            
            
        //     if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
        //         creep.moveTo(target)
        //     }
        // }
        // else{
        //     var targets = creep.room.find(FIND_DROPPED_RESOURCES)
        //     if(targets.length != 0){
        //         target = creep.pos.findClosestByPath(targets)
        //         if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
        //             creep.moveTo(target)
        //         }
        //     }
        //     else{
        //         creep.memory.action = "acting"
        //     }
            
        // }
        
        
        
        
        
        
        
        
        
        
        
        
        // if(targets.length != 0){
        //     // console.log(targets)
        //     target = creep.pos.findClosestByPath(targets)
        //     if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
        //         creep.moveTo(target)
        //     }
        // }
        // else{
        //     var targets = creep.room.find(FIND_DROPPED_RESOURCES)
        //     if(targets.length != 0){
        //         target = creep.pos.findClosestByPath(targets)
        //         if(target.resourceType == RESOURCE_ENERGY){
        //             if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
        //                 creep.moveTo(target)
        //             }
        //         }
        //     }
        //     else{
        //         creep.memory.action = "acting"
        //     }
        // }
    }
}

module.exports = actionLoot;