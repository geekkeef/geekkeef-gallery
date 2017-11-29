import $ from 'jquery';

class Modal {
    constructor(){
        this.modal = $('.modal');
        this.loginForm = $('#modal__login');
        this.signupForm = $('#modal__register');
        this.formTabs = $('.modal__switcher');
        this.highlight = $('#hr--highlight');
        this.tabLogin = this.formTabs.children('li').eq(0).children('a');
        this.tabSignUp = this.formTabs.children('li').eq(1).children('a');
        this.nav = $('.nav__menu-content');
        this.login = $('.nav--login');
        this.register = $('.nav--register');
        this.events();
    }

    events(){
        this.nav.click(this.openModal.bind(this));
        this.login.click(this.loginSelected.bind(this));
        this.register.click(this.signupSelected.bind(this));
        this.formTabs.click(this.selectTab.bind(this));
        this.modal.click(this.closeModal.bind(this));
        $(document).keyup(this.keyPressHandler.bind(this));
    }

    keyPressHandler(e) {
        if (e.keyCode == 27) {
            this.modal.removeClass('is-visible');
        }
    }
    openModal(e){
        $(e.target).is(this.nav) && this.nav.children('ul').toggleClass('is-visible');
    }
    closeModal(e){
        if ($(e.target).is(this.modal) || $(e.target).is('.modal__close')) {
            this.modal.removeClass('is-visible');
        }
    }

    selectTab(e){
        e.preventDefault();
        ($(event.target).is(this.tabLogin)) ? this.loginSelected() : this.signupSelected();
    }

    loginSelected() {
        this.modal.addClass('is-visible');
        this.loginForm.addClass('is-selected');
        this.signupForm.removeClass('is-selected');
        this.tabLogin.addClass('selected');
        this.highlight.removeClass('register');
    }

    signupSelected() {
        this.modal.addClass('is-visible');
        this.loginForm.removeClass('is-selected');
        this.signupForm.addClass('is-selected');
        this.tabLogin.removeClass('selected');
        this.tabSignUp.addClass('selected');
        this.highlight.addClass('register');
    }
}

export default Modal;