export default function auth_required() {
    if (!localStorage.getItem("token")) {
        window.location.href = "/login/";
    }
}
