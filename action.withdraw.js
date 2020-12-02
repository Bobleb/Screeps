var actionHarvest = require('action.harvest');
var actionWithdraw = {
    run: function(creep){
        list_containers = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_CONTAINER) && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0}});
        list_storages = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_STORAGE) && structure.store.getUsedCapacity(RESOURCE_ENERGY)> 0}});
        withdraw_priority_queue = [list_containers, list_storages]
        target = ""
        for(i in withdraw_priority_queue){
            if(withdraw_priority_queue.length[i] != 0){
                target = withdraw_priority_queue[i][0]
            }
        }
        if(target != ""){
            if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(target,{visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        if(target == ""){
            console.log("ERROR: "+creep.name+" cannot find structure to WITHDRAW from!")
            actionHarvest.run(creep)
        }
    }
}

module.exports = actionWithdraw;