import React, { useState } from 'react';

//useStateは変数が変わったら画面も更新する。
//propsは親から受け取るものを表してる。<Login onLogin={loginUser}>なので、loginUserを受け取ってる
type LoginProps ={ 
    //Appの方では、loginUser関数がonLoginに入ってるため、loginUserを
    onLogin: (email: string, password: string) => void
    onSignup: () => void;
}

const Login: React.FC<LoginProps> = (props) => {
    //const [現在の値が入ってる変数, 値を変える関数]=初期値
    const [email, setEmail] = useState(''); //=useState('')により、最初は空文字列
    const [password, setPassword] = useState('');

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();//フォーム送信イベントの際にページ再読み込みをさせないようにする
        props.onLogin(email, password);
    };
    //submitのボタンが押されたときに、handleSubmit関数が呼び出される。
    return(
        <form onSubmit={handleFormSubmit}>
            <h1>ログイン</h1>
            <label>
                メールアドレス
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <br />
            <label>
                パスワード
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button type="submit">ログイン</button>
            <br />
            <br />
            <label>新規登録はこちらから
                <button type="button" onClick={props.onSignup}>新規登録</button>
            </label>
        </form>
        
    );
};

export default Login;