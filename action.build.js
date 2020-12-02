var actionBuild = {
    // Action Fill is basically just Action Transfer, except it puts energy into storage rather than out of it. This is used for Harvesters & Corpse Collectors
    run: function(creep){
        list_of_build_sites = creep.room.find(FIND_CONSTRUCTION_SITES)
        if(list_of_build_sites.length != 0){
            closest_build = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if(creep.build(closest_build) == ERR_NOT_IN_RANGE){
                creep.moveTo(closest_build,{visualizePathStyle: {stroke: '#ffaa00'}});
            };
        }
    }
}

module.exports = actionBuild;