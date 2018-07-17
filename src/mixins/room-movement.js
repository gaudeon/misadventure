export default (superclass) => class extends superclass {
    onEdge (dir) {
        if (dir === 'north')
            this.setY(this.scene.cameras.main.height - this.body.height/2 - 1);
        else if (dir === 'south')
            this.setY(1 + this.body.height/2);
        else if (dir === 'east')
            this.setX(1 + this.body.width/2);
        else if (dir === 'west')
            this.setX(this.scene.cameras.main.width - this.body.width/2 - 1);

        // call exit room after - to allow for the exitRoom to move to some other location
        this.exitRoom(dir);
    }

    exitRoom (dir) {
        console.log(this.constructor.name + " needs to exit room at " + dir);
    }
}