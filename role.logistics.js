var actionWithdraw = require('action.withdraw');
var actionTransfer = require('action.transfer');
var actionFill = require('action.fill');
var actionHarvest = require('action.harvest');
var actionRepair = require('action.repair')
var actionBuild = require('action.build')
var roleLogistics = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0){
            creep.memory.action = "collecting"
        }
        if(creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0){
            creep.memory.action = "acting"
        }
	    if(creep.memory.action == "collecting"){
	        actionWithdraw.run(creep)
	    }
        if(creep.memory.action =="acting") {
            actionTransfer.run(creep)
        }
    }
}

module.exports = roleLogistics;