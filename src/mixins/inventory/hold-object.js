export default (superclass) => class extends superclass {
    heldObject () {
        return this.objectCarried;
    }

    holdObject (object) {
        object.holdMe(this);
    }

    dropObject () {
        if (this.heldObject()) this.heldObject().dropMe();
    }

    // NOTE! anything using this mixins will need to call super.preUpdate so we call this function
    // just this mixin does in case it is embedded in other mixins
    preUpdate (time, delta) {
        if (this.carryTarget) {
            this.setPosition(this.carryTarget.x + this.carryRelX, this.carryTarget.y + this.carryRelY);
        }

        if (super.preUpdate) super.preUpdate(time, delta);
    }
}