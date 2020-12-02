var roleHK = {

    /** @param {Creep} creep **/
    run: function(creep) {
        // this creep is designed to hunt and kill enemy creeps
        var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS)
        if(closestHostile){
            if(creep.attack(closestHostile) == ERR_NOT_IN_RANGE){
                creep.moveTo(closestHostile)
            }
        }
//         var targetRoom = 'W3N7';
//         if(creep.room.name != targetRoom) {
//             const exitDir = Game.map.findExit(creep.room, targetRoom);
//             var exit;
//             if(exitDir > 0) {
//                 exit = creep.pos.findClosestByRange(exitDir);
//                 creep.moveTo(exit);
//             }
//             if (creep.room.name == targetRoom) {
//                 creep.move(RIGHT);
//             }
//         }
//         if(creep.attack(Game.getObjectById("b379c5269625e6b")) == ERR_NOT_IN_RANGE){
//             console.log("!!!")
//             creep.moveTo(Game.getObjectById("b379c5269625e6b"))
//             console.log(creep.moveTo(Game.getObjectById("b379c5269625e6b")))
//         }
        // creep.moveTo(45,38)
    }
}
module.exports = roleHK;