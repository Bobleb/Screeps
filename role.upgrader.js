var actionWithdraw = require('action.withdraw');
var actionTransfer = require('action.transfer');
var actionFill = require('action.fill');
var actionHarvest = require('action.harvest');
var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0){
            creep.memory.action = "collecting"
        }
        if(creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0){
            creep.memory.action = "acting"
            creep.memory["target_source"] = "N/A"
        }
	    if(creep.memory.action == "collecting"){
	        actionWithdraw.run(creep)
	    };
	   if(creep.memory.action == "acting"){
	       creep.memory["target_source"] = "N/A"
	       if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE){
	           creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
	       }
	   }
	}
};

module.exports = roleUpgrader;