var actionTransfer = {
    run: function(creep){
        deposit_spawns = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_SPAWN) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;}});
        deposit_extensions = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_EXTENSION) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;}});
        deposit_tower = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_TOWER) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;}});
        deposit_lab = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_LAB) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;}});
        deposit_priority_queue = [deposit_spawns, deposit_extensions, deposit_lab, deposit_tower]
        target = ""
        for(i in deposit_priority_queue){
            if(deposit_priority_queue[i].length != 0){
                target = creep.pos.findClosestByPath(deposit_priority_queue[i])
                break
            }
        }
        if(target != ""){
            if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(target,{visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        if(target == ""){
            console.log("ERROR: "+creep.name+" cannot find structure to TRANSFER to in room "+creep.pos.roomName)
        }
    }
}

module.exports = actionTransfer;