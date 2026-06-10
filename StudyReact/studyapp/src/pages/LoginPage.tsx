import React from 'react';
import {useState} from 'react';

type Props = {
    onLogin: (email: string, password: string) => void;
};

const Login:React.FC<Props> = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //eventを検知して行う?
    const handleformSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.onLogin(email, password);
    }

    return (
        <form onSubmit={handleformSubmit}>
            <h1>ログイン画面</h1>
            <div>メールアドレス
            <input type="email" required value="email" onChange={(e) => setEmail(e.target.value)}></input>
            </div>
            <br />
            <div>パスワード
            <input type="password" required value="password" onChange = {(e) => setPassword(e.target.value)}></input>
            </div>

            <button type="submit">ログイン</button>
        </form>
    );

};

export default Login;