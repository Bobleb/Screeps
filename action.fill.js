var actionWithdraw = require('action.withdraw');
var actionTransfer = require('action.transfer');
var actionFill = {
    // Action Fill is basically just Action Transfer, except it puts energy into storage rather than out of it. This is used for Harvesters & Corpse Collectors
    run: function(creep){
        resource_types = []
        if(creep.store.getFreeCapacity() != (creep.store.getCapacity() - creep.store.getUsedCapacity(RESOURCE_ENERGY))){
            for(i in RESOURCES_ALL){
                if(creep.store.getUsedCapacity(RESOURCES_ALL[i])!= 0){
                    resource_types.push(RESOURCES_ALL[i])
                }
            }
            console.log("Creep "+creep.name+" Has "+resource_types+" in inventory!")
            console.log(creep.store.getUsedCapacity(RESOURCE_ENERGY))
            console.log(creep.store.getUsedCapacity(RESOURCES_ALL))
            console.log(creep.store.getCapacity() - creep.store.getUsedCapacity(RESOURCE_ENERGY))
        }
        
        
        
        deposit_storage = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_STORAGE) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;}});
        deposit_container = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_CONTAINER) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;}});
        deposit_priority_queue = [deposit_storage,deposit_container]
        target = ""
        for(i in deposit_priority_queue){
            if(deposit_priority_queue[i].length != 0){
                target = deposit_priority_queue[i][0]
                break
            }
        }
        if(target != ""){
            if(creep.store.getUsedCapacity(RESOURCE_ENERGY) != 0){
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(target,{visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
        if(target == ""){
            console.log("ERROR: "+creep.name+" cannot find structure to FILL in room "+creep.pos.roomName)
            actionTransfer.run(creep)
        }
    }
}

module.exports = actionFill;