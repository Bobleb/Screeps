var actionWithdraw = require('action.withdraw');
var actionTransfer = require('action.transfer');
var actionFill = require('action.fill');
var actionHarvest = require('action.harvest');
var actionRepair = require('action.repair');
var actionBuild = require('action.build');
var roleTurret = {

    /** @param {Creep} creep **/
    run: function(tower) {
        // console.log(JSON.stringify(tower.memory))
        enemies = tower.room.find(FIND_HOSTILE_CREEPS);
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(enemies.length == 0){
            if(tower.store.getUsedCapacity(RESOURCE_ENERGY) > 500){
                repairs_spawns = tower.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_SPAWN) && structure.hits < structure.hitsMax;}});
                repairs_extensions = tower.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_EXTENSION) && structure.hits < structure.hitsMax;}});
                repairs_tower = tower.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_TOWER) && structure.hits < structure.hitsMax;}});
                repairs_storage = tower.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_STORAGE) && structure.hits < structure.hitsMax;}});
                repairs_container = tower.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_CONTAINER) && structure.hits < structure.hitsMax;}});
                repairs_lab = tower.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_LAB) && structure.hits < structure.hitsMax;}});
                repairs_road = tower.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_ROAD) && structure.hits < structure.hitsMax;}});
                repairs_rampart = tower.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_RAMPART) && structure.hits < structure.hitsMax;}});
                repairs_wall = tower.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_WALL) && structure.hits < structure.hitsMax;}});
                repair_priority_queue = [repairs_spawns,repairs_extensions,repairs_tower,repairs_storage,repairs_container,repairs_lab, repairs_road];
                // if(tower.store.getFreeCapacity(RESOURCE_ENERGY) == 0){
                //     repair_priority_queue = [repairs_spawns,repairs_extensions,repairs_tower,repairs_storage,repairs_container,repairs_lab,repairs_rampart,repairs_wall];
                // }
                for(i in repair_priority_queue){
                    repair_priority_queue[i].sort(function(a, b){return (b.hitsMax - b.hits)-(a.hitsMax - a.hits)});
                };
                for(i in repair_priority_queue){
                    if(repair_priority_queue[i].length != 0){
                        tower.repair(repair_priority_queue[i][0]);
                        break;
                    };
                };
            };
        };
        if(closestHostile){
            tower.attack(closestHostile);
        };
    }
};




module.exports = roleTurret;