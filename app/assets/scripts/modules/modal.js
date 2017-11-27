import $ from 'jquery';

class Modal {
    constructor(){
        this.openModalClick = $('.open-modal');
        this.openLoginClick = $('.open-login-modal');
        this.openRegClick = $('.open-reg-modal');
        this.modalSocial = $('.modal--social');
        this.modalLogin = $('.modal--login');
        this.modalReg = $('.modal--register');
        this.closeModalClick = $('.modal__close');
        this.events();
    }

    events(){
        this.openModalClick.click(this.openSocialModal.bind(this));
        this.openLoginClick.click(this.openLoginModal.bind(this));
        this.openRegClick.click(this.openRegModal.bind(this));
        this.closeModalClick.click(this.closeModal.bind(this));
        $(document).keyup(this.keyPressHandler.bind(this));
    }

    keyPressHandler(e){
        if(e.keyCode==27){
            this.closeModal();
        }
    }

    openSocialModal(){
        this.modalSocial.addClass('modal--visible');
        return false; // prevent default scroll up functionality in browser fomr '#' link
    }
    openLoginModal() {
        this.modalLogin.addClass('modal--visible');
        return false; 
    }
    openRegModal() {
        this.modalReg.addClass('modal--visible');
        return false; 
    }

    closeModal(){
        this.modalSocial.removeClass('modal--visible'); // remove modal class
        this.modalLogin.removeClass('modal--visible'); 
        this.modalReg.removeClass('modal--visible'); 
    }
}

export default Modal;