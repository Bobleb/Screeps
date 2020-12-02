var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleClaimer = require('role.claimer');
var roleTurret = require('role.turret');
var roleLogistics = require('role.logistics');
var roleHK = require('role.HK');
var roleCorpseCollector = require('role.corpseCollector')

module.exports.loop = function () {
    var spawn_targets = {
        "W1N7":{
            "harvesters":8, "builders":1, "upgraders":3,"logistics":2,"corpseCollector":1
        },
        "W2N7":{
            "harvesters":3, "builders":1, "upgraders":1,"logistics":1,"corpseCollector":1
        }
    }
    for(spawner in Game.spawns){
        // console.log(spawner)
        spawning_new = false
        spawn_room = Game.spawns[spawner].pos.roomName;
        var harvesters = 0;
        var builders = 0;
        var upgraders = 0;
        var logistics = 0;
        var HK = 0;
        var corpseCollector = 0;
        for(i in Game.creeps){
            creep_room = Game.creeps[i].pos.roomName;
            if (Game.creeps[i].memory.role == "upgrader" && creep_room == spawn_room){upgraders += 1;};
            if (Game.creeps[i].memory.role == "builder" && creep_room == spawn_room){builders += 1;};
            if (Game.creeps[i].memory.role == "harvester" && creep_room == spawn_room){harvesters += 1;};
            if (Game.creeps[i].memory.role == "logistics" && creep_room == spawn_room){logistics += 1;};
            if (Game.creeps[i].memory.role == "HK" && creep_room == spawn_room){HK += 1;};
            if (Game.creeps[i].memory.role == "corpseCollector" && creep_room == spawn_room){corpseCollector += 1;};
        };
        logistics_target = 3
        harvester_target = 8
        builders_target = 2
        upgraders_target = 3
        corpseCollector_target = 0
        storage_room = Game.spawns[spawner].room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_STORAGE)}})[0];
        // console.log(storage_room.store.getUsedCapacity(RESOURCE_ENERGY))
        if(storage_room.store.getUsedCapacity(RESOURCE_ENERGY) > 10000){
            upgraders_target = 4
            corpseCollector_target = 1
        }
        if(Game.spawns[spawner].room.energyCapacityAvailable >= 800){
        // if(Game.spawns[spawner].room.name == "W1N7"){
            if(spawning_new == false){
                if(logistics < logistics_target){
                    var newName = "Logistics"+Game.time.toString();
                    spawning_new = true
                    // 400
                    Game.spawns[spawner].spawnCreep([CARRY ,CARRY ,CARRY ,CARRY ,MOVE ,MOVE ,MOVE ,MOVE], newName,{memory: {role: 'logistics', target_source:"N/A" ,action:"collecting"}});
                };
            }
            if(spawning_new == false){
                if(harvesters < harvester_target){
                    var newName = "Harvester"+Game.time.toString();
                    spawning_new = true
                    // 800
                    Game.spawns[spawner].spawnCreep([WORK, WORK ,WORK ,WORK, WORK, CARRY ,CARRY ,CARRY ,MOVE , MOVE, MOVE ,MOVE], newName,{memory: {role: 'harvester', target_source:"N/`A" ,action:"collecting"}});
                };
            }
            if(spawning_new == false){
                if(builders < builders_target){
                    var newName = "Builder"+Game.time.toString();
                    spawning_new = true
                    // 800
                    Game.spawns[spawner].spawnCreep([WORK, WORK ,WORK ,WORK, WORK, CARRY ,CARRY ,CARRY ,MOVE , MOVE, MOVE], newName,{memory: {role: 'builder', target_source:"N/`A" ,action:"collecting", target:""}});
                };
            }
            if(spawning_new == false){
                if(upgraders < upgraders_target){
                    var newName = "Upgrader"+Game.time.toString();
                    spawning_new = true
                    // 800
                    Game.spawns[spawner].spawnCreep([WORK, WORK ,WORK ,WORK, WORK, CARRY ,CARRY ,CARRY ,MOVE , MOVE, MOVE], newName,{memory: {role: 'upgrader', target_source:"N/`A" ,action:"collecting"}});
                };
            }
            if(spawning_new == false){
                if(corpseCollector < 0){
                    var newName = "corpseCollector"+Game.time.toString();
                    spawning_new = true
                    // 400
                    Game.spawns[spawner].spawnCreep([CARRY ,CARRY ,CARRY ,CARRY ,MOVE ,MOVE ,MOVE ,MOVE], newName,{memory: {role: 'corpseCollector', target_source:"N/A" ,action:"collecting"}});
                };
            }
            
            
            
            var closestHostile = Game.spawns[spawner].pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(closestHostile){
                if(HK < 1){
                    var newName = "HK"+Game.time.toString();
                    // ranged
                    // Game.spawns["Spawn1"].spawnCreep([RANGED_ATTACK ,RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, MOVE ,MOVE ,MOVE ,MOVE], newName,{memory: {role: 'HK', target_source:"N/A" ,action:"defend"}})
                    // melee
                    Game.spawns[spawner].spawnCreep([TOUGH ,TOUGH ,TOUGH ,TOUGH ,TOUGH ,TOUGH ,TOUGH ,TOUGH ,TOUGH ,TOUGH ,MOVE ,MOVE ,MOVE ,MOVE ,MOVE ,MOVE ,MOVE ,ATTACK ,ATTACK ,ATTACK ,ATTACK ,ATTACK ,ATTACK ,ATTACK ,ATTACK ,ATTACK ,ATTACK ,MOVE], newName,{memory: {role: 'HK', target_source:"N/A" ,action:"defend"}});
                };
            };
        }
        if(Game.spawns[spawner].room.name == "W2N7"){
            // max 550
            if(logistics < 1){
                // 300
                var newName = "Logistics"+Game.time.toString();
                Game.spawns[spawner].spawnCreep([CARRY ,CARRY ,CARRY ,CARRY ,MOVE ,MOVE], newName,{memory: {role: 'logistics', target_source:"N/A" ,action:"collecting"}});
            };
            if(harvesters < 4){
                // 300
                var newName = "Harvester"+Game.time.toString();
                Game.spawns[spawner].spawnCreep([WORK ,CARRY ,CARRY , MOVE], newName,{memory: {role: 'harvester', target_source:"N/`A" ,action:"collecting"}});
            };
            if(builders < 0){
                // 550
                var newName = "Builder"+Game.time.toString();
                Game.spawns[spawner].spawnCreep([WORK ,WORK, WORK ,CARRY ,CARRY ,MOVE , MOVE, MOVE], newName,{memory: {role: 'builder', target_source:"N/`A" ,action:"collecting"}});
            };
            if(upgraders < 1){
                // 550
                var newName = "Upgrader"+Game.time.toString();
                Game.spawns[spawner].spawnCreep([WORK ,WORK, WORK ,CARRY ,CARRY ,MOVE , MOVE, MOVE], newName,{memory: {role: 'upgrader', target_source:"N/`A" ,action:"collecting"}});
            };
            if(corpseCollector < 0){
                var newName = "corpseCollector"+Game.time.toString();
                // 400
                // Game.spawns[spawner].spawnCreep([CARRY ,CARRY ,CARRY ,CARRY ,MOVE ,MOVE ,MOVE ,MOVE], newName,{memory: {role: 'corpseCollector', target_source:"N/A" ,action:"collecting"}});
            };
        }
        
        
        
        
        
        
        
        
    }

// WORK 100
// MOVE  50
// CARRY 50
// max 1300
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.spawning == false){
            if(creep.memory.role == 'upgrader') {roleUpgrader.run(creep);};
            if(creep.memory.role == 'builder') {roleBuilder.run(creep);};
            if(creep.memory.role == 'harvester') {roleHarvester.run(creep);};
            if(creep.memory.role == 'claimer') {roleClaimer.run(creep);};
            if(creep.memory.role == 'claimer') {roleClaimer.run(creep);};
            if(creep.memory.role == 'logistics') {roleLogistics.run(creep);};
            if(creep.memory.role == 'HK') {roleHK.run(creep);};
            if(creep.memory.role == 'corpseCollector') {roleCorpseCollector.run(creep);};
        }
    };
    for(var name in Game.structures){
        if (Game.structures[name].structureType == STRUCTURE_TOWER){roleTurret.run(Game.structures[name]);};
    };
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        };
    };
    
    // roads = Game.spawns["Spawn1"].room.find(FIND_STRUCTURES,{
    //                 filter: (structure) => {
    //                     return (structure.structureType == STRUCTURE_ROAD)
    //                 }
    //         })
    // console.log(roads.length)
    
    // emergency harvester button
    // for(name in Game.creeps){
    //     Game.creeps[name].memory.role = "harvester"
    // }

};