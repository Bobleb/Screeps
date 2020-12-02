var actionRepair = {
    run: function(creep){
        // if there is no target to repair, have to find a target
        if((creep.memory.target == "") || (creep.memory.target == undefined) || (creep.memory.target == null)){
            repairs_spawns = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_SPAWN) && structure.hits < structure.hitsMax;}});
            repairs_extensions = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_EXTENSION) && structure.hits < structure.hitsMax;}});
            repairs_tower = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_TOWER) && structure.hits < structure.hitsMax;}});
            repairs_storage = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_STORAGE) && structure.hits < structure.hitsMax;}});
            repairs_container = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_CONTAINER) && structure.hits < structure.hitsMax;}});
            repairs_lab = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_LAB) && structure.hits < structure.hitsMax;}});
            repairs_rampart = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_RAMPART) && structure.hits < structure.hitsMax;}});
            repairs_wall = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_WALL) && structure.hits < structure.hitsMax;}});
            repair_priority_queue = [repairs_spawns,repairs_extensions,repairs_tower,repairs_storage,repairs_container,repairs_lab,repairs_rampart,repairs_wall];
            for(i in repair_priority_queue){
                repair_priority_queue[i].sort(function(a, b){
                    return (b.hitsMax - b.hits)-(a.hitsMax - a.hits)
                })
            }
            // console.log(repair_priority_queue)
            // for(i in repair_priority_queue){
            //     for(j in repair_priority_queue[i]){
            //         console.log(""+repair_priority_queue[i][j].hits+repair_priority_queue[i][j].structureType)
            //     }
            // }
            
            
            for(i in repair_priority_queue){
                if(repair_priority_queue[i].length != 0){
                    creep.memory.target = repair_priority_queue[i][0];
                    break;
                };
            };
        }
        // check that there is infact now a target to repair
        if((creep.memory.target != "") || (creep.memory.target != undefined)){
            targets = Game.rooms[creep.room.name].lookForAt('structure', creep.memory.target.pos.x, creep.memory.target.pos.y);
            target = ""
            for(i in targets){
                if(targets[i].id == creep.memory.target.id){
                    creep.memory.target = targets[i]
                    break
                }
            }
            target = creep.memory.target
            if(target.hits == target.hitsMax){
                creep.memory.target = ""
            }
            // console.log(creep.repair(target))
            if(creep.repair(target) == ERR_NOT_IN_RANGE){
                creep.moveTo(target)
            }
        }
    }
}

module.exports = actionRepair;