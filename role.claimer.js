var roleClaimer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        // this creep is designed claim
        if(creep.claimController(Game.getObjectById("6af807747624b8f")) == ERR_NOT_IN_RANGE) {
            creep.moveTo(Game.getObjectById("6af807747624b8f"), {visualizePathStyle: {stroke: '#ffffff'}});
        }
        // console.log(creep.claimController(Game.getObjectById("6af807747624b8f")))
        // if(creep.claimController(Game.getObjectById("6af807747624b8f")) == -7) {
        var targetRoom = 'W3N7';
            if(creep.room.name != targetRoom) {
                const exitDir = Game.map.findExit(creep.room, targetRoom);
                var exit;
                if(exitDir > 0) {
                    exit = creep.pos.findClosestByRange(exitDir);
                    creep.moveTo(exit);
                }
                if (creep.room.name == targetRoom) {
                    creep.move(RIGHT);
                }
            }
        // }
        
        
    }
}
module.exports = roleClaimer;