import http from "k6/http";
import { sleep, check } from "k6";

export let options = {
    vus: 500, // virtual users
    duration: "1m", // duration of the test
};

export default function () {
    let res = http.get("https://crm-erp-2dc5c3c9fd8b.herokuapp.com/");
    check(res, {
        "status was 200": (r) => r.status === 200,
    });
    sleep(1);
}
