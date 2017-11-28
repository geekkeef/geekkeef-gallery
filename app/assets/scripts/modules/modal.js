import $ from 'jquery';

class Modal {
    constructor(){
        this.openModalClick = $('.open-modal');
        this.openLoginClick = $('.open-login-modal');
        this.openRegClick = $('.open-reg-modal');
        this.modalSocial = $('.modal--social');
        this.modalLogin = $('.modal--login');
        this.modalReg = $('.modal--reg');
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
        this.closeModalClick.addClass('modal__close--visible');
        this.modalSocial.html('<object width="100%" height="100%" type="text/html" data="http://localhost:4001/social"></object>');
        return false; // prevent default scroll up functionality in browser fomr '#' link
    }
    openLoginModal() {
        this.modalLogin.addClass('modal--visible');
        this.closeModalClick.addClass('modal__close--visible');
        this.modalLogin.html('<object width="100%" height="100%" type="text/html" data="http://localhost:4001/login"></object>');
        return false;
    }
    openRegModal() {
        this.modalReg.addClass('modal--visible');
        this.closeModalClick.addClass('modal__close--visible');
        this.modalReg.html('<object width="100%" height="100%" type="text/html" data="http://localhost:4001/register"></object>');
        return false;
    }
    closeModal(){
        this.closeModalClick.removeClass('modal__close--visible');
        this.modalSocial.removeClass('modal--visible'); // remove modal class
        this.modalLogin.removeClass('modal--visible'); 
        this.modalReg.removeClass('modal--visible');
        this.modalSocial.html('');
        this.modalLogin.html('');
        this.modalReg.html('');

    }
}

export default Modal;