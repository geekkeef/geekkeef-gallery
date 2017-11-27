import MobileMenu from './modules/mobileMenu';
import DateDisplay from './modules/dateDisplay';
import Modal from './modules/modal';
import BkgImage from './modules/bkgImage';

var mobileMenu = new MobileMenu();
var dateDisplay = new DateDisplay();
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
