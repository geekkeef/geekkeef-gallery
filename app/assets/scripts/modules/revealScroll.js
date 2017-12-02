import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class RevealScroll {
    constructor(els,offset){
        this.revealItems = els;
        this.offsetNumber = offset;
        this.hide();
        this.createWaypoints();
    }
    hide(){
        this.revealItems.addClass('reveal-item');
    }
    createWaypoints() {
        var that = this;
        this.revealItems.each(function(){
            var item = this;
            new Waypoint({
                element: item,
                handler: function(){
                    $(item).addClass('reveal-item--visible');
                },
                offset: that.offsetNumber
            });
        });
    }
}

export default RevealScroll;