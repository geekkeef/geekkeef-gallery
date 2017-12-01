import MobileMenu from './modules/mobileMenu';
import DateDisplay from './modules/dateDisplay';
import BkgImage from './modules/bkgImage';
import Modal from './modules/modalDisplay';
import PodSnack from './modules/podSnackAdjust';
import Scroll from './modules/scrollPage';

var mobileMenu = new MobileMenu();
var dateDisplay = new DateDisplay();
var podSnack    =  new PodSnack();
var scroll = new Scroll();
var modal = new Modal();

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
