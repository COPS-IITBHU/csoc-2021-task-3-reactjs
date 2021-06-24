export default function auth_required(router) {
    if (localStorage.getItem("token")) {
        router.push("/");
        return true;
    }
    return false;
}
