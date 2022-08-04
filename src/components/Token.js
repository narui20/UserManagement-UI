export function getToken() {
    let token = "Bearer " + localStorage.getItem("token")
    let header = {
        headers: {
            Authorization: token
        }
    }
    return header;
}
