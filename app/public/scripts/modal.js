
jQuery(document).ready(function ($) {

    var modal = $('.modal'),
        loginForm = $('#modal__login'),
        signupForm = $('#modal__register'),
        formTabs = $('.modal__switcher'),
        highlight = $('#hr--highlight'),
        tabLogin = formTabs.children('li').eq(0).children('a'),
        tabSignUp = formTabs.children('li').eq(1).children('a'),
        nav = $('.nav__menu-content');

        console.log(formTabs);
    console.log(formTabs.children('li').eq(0).children('a'));
    console.log(formTabs.children('li').eq(1).children('a'));

    nav.on('click', function (event) {
        $(event.target).is(nav) && nav.children('ul').toggleClass('is-visible');
    });

    nav.on('click', '.modal--register', signup_selected);
    nav.on('click', '.modal--signin', login_selected);

    modal.on('click', function (event) {
        if ($(event.target).is(modal) || $(event.target).is('.modal__close')) {
            modal.removeClass('is-visible');
        }
    });

    $(document).keyup(function (event) {
        if (event.which == '27') {
            modal.removeClass('is-visible');
        }
    });

    formTabs.on('click', function (event) {
        event.preventDefault();
        ($(event.target).is(tabLogin)) ? login_selected() : signup_selected();
    });

    function login_selected() {
        modal.addClass('is-visible');
        loginForm.addClass('is-selected');
        signupForm.removeClass('is-selected');
        tabLogin.addClass('selected');
        highlight.removeClass('register');
    }

    function signup_selected() {
        modal.addClass('is-visible');
        loginForm.removeClass('is-selected');
        signupForm.addClass('is-selected');
        tabLogin.removeClass('selected');
        tabSignUp.addClass('selected');
        highlight.addClass('register');
    }
    
});