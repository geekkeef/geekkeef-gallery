import MobileMenu from './modules/mobileMenu';
import DateDisplay from './modules/dateDisplay';
import BkgImage from './modules/bkgImage';
import Modal from './modules/modalDisplay';
import PodSnack from './modules/podSnackAdjust';
import Scroll from './modules/scrollPage';
import RevealScroll from './modules/revealScroll';
import $ from 'jquery';

var mobileMenu = new MobileMenu();
var dateDisplay = new DateDisplay();
var podSnack    =  new PodSnack();
var scroll = new Scroll();
var modal = new Modal();
new RevealScroll($('.about__image'), '80%');
new RevealScroll($('.about__panel'), '80%');
new RevealScroll($('.links__section'), '70%');

checkPage();
function checkPage(){
    var pathName = window.location.pathname;
    if (pathName.startsWith('/gallery')){
        var urlEnd = pathName.substr(pathName.lastIndexOf('y') + 2);
        if(urlEnd){
            var bkgImage = new BkgImage();
        }
    }
}
