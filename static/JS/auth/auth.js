let loginInfo = sessionStorage.getItem('userInitials');
let curr = "http://127.0.0.1:5000";

if (!loginInfo) {
    window.location.replace(`/login`);
}