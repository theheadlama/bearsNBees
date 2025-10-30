class GamePad {
    constructor(index) {
        this._index = index;
        this._DEADZONE = 0.3;
        this._ANGLECONSTRAINT = 0.3;
    }

    read() {
        // define bitwise flags
        const FLAG_LEFT = 1;
        const FLAG_RIGHT = 2;
        const FLAG_UP = 4;
        const FLAG_DOWN = 8;
        // buttons can go here but not yet

        // re-fetch state per frame
        const gp = navigator.getGamepads()[this._index];
        //
        let inputFlags = 0;
        if( Math.abs(gp.axes[0]) > this._DEADZONE || Math.abs(gp.axes[1]) > this._DEADZONE) {
            if(gp.axes[0] < 0 - this._ANGLECONSTRAINT ) {
                inputFlags |= FLAG_LEFT;
            }
            if( gp.axes[0] > 0 + this._ANGLECONSTRAINT ) {
                inputFlags |= FLAG_RIGHT;        
            }
            if( gp.axes[1] < 0 - this._ANGLECONSTRAINT ) {
                inputFlags |= FLAG_UP;        
            }
            if( gp.axes[1] > 0 + this._ANGLECONSTRAINT) {
                inputFlags |= FLAG_DOWN;        
            }
        }

         return inputFlags;

      }

}



    
