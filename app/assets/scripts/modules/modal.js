import $ from 'jquery';

class Modal {
    constructor(){
        this.openModalClick = $('.open-modal');
        this.closeModalClick = $('.btn__exit');
        this.modal = $('.modal--social', window.parent.document);
        this.events();
    }

    events(){
        this.openModalClick.click(this.openModal.bind(this));
        this.closeModalClick.click(this.closeModal.bind(this));
        $(document).keyup(this.keyPressHandler.bind(this));
    }

    keyPressHandler(e){
        if(e.keyCode==27){
            this.closeModal();
        }
    }

    openModal(){
        this.modal.addClass('modal--visible');
        this.modal.html('<object width="100%" height="100%" type="text/html" data="http://localhost:5001/social"></object>');
        return false; // prevent default functionality in browser for '#' link
    }
    closeModal(){
        this.modal.removeClass('modal--visible');
        this.modal.html('');
    }
}

export default Modal;