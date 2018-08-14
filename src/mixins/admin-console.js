export default (superclass) => class extends superclass {
    setupAdminConsole () {
        // console.log(this);
        if (this.registry.get('allowAdminConsole') && window) {
            // window functions are setup as real function (not arrow functions) just in case arrow functions not supported
            window.admin = {};

            let scene = this;
            window.admin.teleport = function (roomId) {
                let roomInfo = scene.actors.player.getRoomInfo(roomId);

                if (roomInfo) {
                    scene.actors.player.setCurrentRoom(roomId);
                    scene.currentRoom.changeRoom(roomId);
                }
            };
        }
    }
}