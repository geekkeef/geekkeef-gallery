import $ from 'jquery';

class Scroll {
    constructor() {
        this.pageURL = $(location).attr('href');
        this.link = $('a');
        this.event();
    }
    event(){
        this.link.click(this.checkPage.bind(this));
    }
    checkPage(e){

        var href = $(e.target).attr('href');
        var pageURL = this.pageURL;
        href = href.substring(href.indexOf("#"));
        
        if (href === "#about") {

            if (pageURL.includes('/home')) {
                e.preventDefault();
                this.scrollPage(href,pageURL);
            }

        } else if (href === "#contact") {
            this.scrollPage(href,pageURL);
        }
    }
    scrollPage(h,url){

        if (url.includes('/login') || url.includes('/register')){
            return true;
        }else{
            $('html, body').animate({
                scrollTop: $(h).offset().top
            }, 800, function () {

                window.location.href = h;
            });
            return false;
        }
    }
}

export default Scroll;