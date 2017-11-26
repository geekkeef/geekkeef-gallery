import $ from 'jquery';

class MobileMenu {
    constructor() {
        this.menuIcon = $('.nav__menu-icon');
        this.menuContent = $('.nav__menu-content');
        this.appWindow = $(window);
        this.events();
    }

    events(){
        this.menuIcon.click(this.toggleTheMenu.bind(this)); // bind(this) ---> this.menuIcon
        this.appWindow.resize(this.checkWindow.bind(this));
    }

    toggleTheMenu(){
        this.menuContent.toggleClass('nav__menu-content--visible');
    }

    checkWindow(){
        if (window.matchMedia('(min-width: 992px)').matches){
            this.menuContent.removeClass('nav__menu-content--visible');
        }
    }
}

export default MobileMenu;