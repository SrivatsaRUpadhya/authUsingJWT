import Link from "next/link";
import Router from "next/router";

const { default: axios } = require("axios");
const { useState } = require("react");

export default function LoginForm() {
    const [Phone, SetPhone] = useState("");
    const [Password, SetPassword] = useState("");

    function Login(e) {
        e.preventDefault();
        axios.post(`auth/login`, {
            phone: Phone,
            password: Password
        }, {headers:{'Access-Control-Allow-Origin': '*'}, withCredentials:true}).then((result)=>{
            if(result.data.message === "success"){
                Router.push("/")
            }
        })
    }

    return (
        <div>
            <form onSubmit={(e) => Login(e)}>
                <label>Phone</label>
                <input type="number" onChange={(e) => SetPhone(e.target.value)}></input>

                <label>Password</label>
                <input type="password" onChange={(e) => SetPassword(e.target.value)}></input>

                <button type="submit">Login</button>
            </form>
            <br></br>
            <Link href={"/register"}>Register</Link>
        </div>
    )
}