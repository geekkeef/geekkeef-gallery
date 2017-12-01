import $ from 'jquery';

class PodSnack {
    constructor(){
        this.pod = $('#pod');
        this.win = $(window);
        this.events();
    }
    events(){
        this.win.resize(this.windowSize.bind(this));
        this.win.ready(this.windowSize.bind(this));
    } 
    windowSize(){
        var windowSize = this.win.width();
        if (windowSize<=992){
            this.pod.html('<div class="widget--music" class="col--12"><iframe style="border:none" src="https://s3.amazonaws.com/files.podsnack.com/iframe/embed.html?hash=avhfvsyy&t=1512046612" width="'+ (windowSize * 0.77) + '" height="415" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe></div>');
        }else{
            this.pod.html('<div class="widget--music" class="col--12"><iframe style="border:none" src="https://s3.amazonaws.com/files.podsnack.com/iframe/embed.html?hash=avhfvsyy&t=1512046612" width="310" height="415" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe></div>');
        }
    }
}

export default PodSnack;