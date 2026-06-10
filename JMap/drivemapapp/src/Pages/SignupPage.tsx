import React, {useState} from 'react';
import { register } from '../services/AuthService';
type SignupPageProps = {
    onSignupSuccess: (email: string) => void;
}

const SignupPage: React.FC<SignupPageProps> = ({onSignupSuccess}) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const registerUser = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await register(username, email, password);
            alert("登録しました。メールに届いた確認コードを入力してください。");
            onSignupSuccess(email);
        } catch (error) {
            alert("登録に失敗しました");
        }
        
    };

    return (
        <form onSubmit={registerUser}>
            <h1>新規登録</h1>
            <label>ユーザ名
                <input type="username" required onChange={(e)=>setUsername(e.target.value)}></input>
            </label>
            <br/>
            <label>メールアドレス
                <input type="email" required onChange={(e)=>setEmail(e.target.value)}></input>
            </label>
            <br/>
            <label>パスワード
                <input type="password" required onChange={(e) => setPassword(e.target.value)}></input>
            </label>
            <br/>
            <button type="submit" >登録</button>
        </form>
        
    )
};

export default SignupPage;