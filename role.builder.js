var actionWithdraw = require('action.withdraw');
var actionTransfer = require('action.transfer');
var actionFill = require('action.fill');
var actionHarvest = require('action.harvest');
var actionRepair = require('action.repair')
var actionBuild = require('action.build')
var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0){
            creep.memory.action = "collecting";
            creep.memory.target = ""
        };
        if((creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) && creep.memory.action != "repairing"){
            creep.memory.action = "acting";
        };
	    if(creep.memory.action == "collecting"){
            actionWithdraw.run(creep)
	    };
        if(creep.memory.action == "acting"){
            list_of_build_sites = creep.room.find(FIND_CONSTRUCTION_SITES)
            if(list_of_build_sites != 0){
                actionBuild.run(creep)
            }
            else{
                actionRepair.run(creep)
            }
        };
	}
};

module.exports = roleBuilder;