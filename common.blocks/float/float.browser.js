/* global modules:false */

modules.define('float',
               ['i-bem__dom', 'scrollspy'],
               function(provide, BEMDOM, Scrollspy) {
BEMDOM.decl({block: 'float', baseBlock: Scrollspy}, {
    onSetMod: {
        'js': {
            'inited': function(){
                this.__base.apply(this, arguments);

                this.setFixWidth({
                    start: this.params.fixStart,
                    stop:this.params.fixStop
                });

                this.setFixedPos(
                    this.params.posTop,
                    this.params.posLeft
                );
            },
        }
    },

    beforeSetMod: {
        'state': {
            'fixed': function(){
                this.domElem.css({'top': this._fixPosTop, 'left': this._fixPosLeft});
            }
        }
    },

    setFixWidth: function(pos){
        this.fixStart = pos.start || false;
        this.fixStop = pos.stop || false;
        this.calcOffsets();
    },

    setFixedPos: function(top, left){
        this.calcOffsets();
        // Calc position for fixed state
        if (top !== undefined){
            this._fixPosTop = this.__self.getOffset(top);
        } else {
            this._fixPosTop = 0;
        }
        if (left !== undefined){
            this._fixPosLeft = this.__self.getOffset(left);
        } else {
            this._fixPosLeft = 0;
        }
    },

    calcOffsets: function(){
        this.__base.apply(this, arguments);

        this._oftop = this.fixStart || this._oftop;
        this._ofbottom = this.fixStop || this._ofbottom;
    },

    /**
     * Runs everytime on every block
     * @returns {bool}
     */
    _onScroll: function() {
      var self = this.__self;

      // scrolled down
      //if(self.isForward) {
        var fixStoped = this._ofbottom >= self.scroll;
        if (this._oftop <= self.scroll && (this.fixStop? fixStoped : true)) {
          return this.activate(!fixStoped);
        }

        return this.deactivate();
      //}

    },

    activate: function(){
        if(this.__base.apply(this, arguments)){
            return false;
        }

        this.setMod('state', 'fixed');
    },

    deactivate: function(fixStoped){
        if(this.__base.apply(this, arguments)){
            return false;
        }

        this.setMod('state', fixStoped? 'paused': 'default');
    },
});

provide(BEMDOM);

});

