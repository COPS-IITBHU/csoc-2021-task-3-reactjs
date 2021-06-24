export default function auth_required(router) {
    if (!localStorage.getItem("token")) {
        router.push("/login/");
        return true;
    }
    return false;
}
