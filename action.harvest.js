var actionHarvest = {
    run: function(creep){
	   if(creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0){
            var targets = creep.room.find(FIND_SOURCES, {filter: (source) => {return (source.energy > 0);}});
	        if(targets.length > 0){
	            target = creep.pos.findClosestByPath(targets)
	            if(creep.harvest(target) == ERR_NOT_IN_RANGE){
	                creep.moveTo(target)
	            }
	        }
        }
    }
}

module.exports = actionHarvest;