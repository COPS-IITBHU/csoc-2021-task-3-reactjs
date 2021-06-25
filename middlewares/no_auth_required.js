export default function no_auth_required() {
    if (localStorage.getItem("token")) {
        window.location.href = "/";
    }
}