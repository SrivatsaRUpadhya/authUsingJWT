import Router from "next/router";

const { default: axios } = require("axios");
const { useState } = require("react");

export default function RegisterForm() {
    const [Name, SetName] = useState("");
    const [Phone, SetPhone] = useState("");
    const [Password, SetPassword] = useState("");

    function Register(e) {
        e.preventDefault();
        axios.post(`/auth/register`, {
            name: Name,
            phone: Phone,
            password: Password
        }, {
            headers: { 'Access-Control-Allow-Origin': '*' },
            withCredentials:true
        }).then((result) => {
            if (result.data.message === "success") {
            //     // console.log(result.headers);

            //     // window.localStorage.setItem("accessToken", result.data.accessToken)
                Router.push("/");
            }
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div>
            <form onSubmit={(e) => Register(e)}>
                <label>Username</label>
                <input type="text" onChange={(e) => SetName(e.target.value)}></input>

                <label>Phone</label>
                <input type="number" onChange={(e) => SetPhone(e.target.value)}></input>

                <label>Password</label>
                <input type="password" onChange={(e) => SetPassword(e.target.value)}></input>

                <button type="submit">Register</button>
            </form>
        </div>
    )
}