
import $ from 'jquery';

class BkgImage {
    constructor(){
        this.imageSrc = $('#photo__main').attr('src');
        this.imageDiv = $('#photo__bkg');
        this.events();

    }
    events(){
        this.imageDiv.css('background', 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("' +this.imageSrc+'") no-repeat center / 100% fixed');

    }
}

export default BkgImage;