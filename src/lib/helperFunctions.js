import Cookies from "js-cookie";
export function logOutUser(){
    localStorage.clear();
    Cookies.remove('AuthToken');
    window.location.reload();
}