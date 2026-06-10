import React from 'react';
import Login from './Pages/LoginPage';
import { login } from './services/AuthService';
import { useState } from 'react';
import MainPage from './Pages/MainPage';
import SignupPage from './Pages/SignupPage.tsx'
import AuthPage from './Pages/AuthPage.tsx';

//const user = await getCurrentUser();で、現在ログイン中のユーザ取得できる


//外からデータ(Props)を渡さないので、()の中身は空。矢印の先にある{}の中に、ログイン状態の管理や画面の見た目が全て詰まってる
const App: React.FC = () => {
  //ログイン状態の管理
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [signupEmail, setSignupEmail] = useState('');
  //ログイン処理 handlesubmitは、emailとpasswordを受け取って、
  const loginUser = async ( email: string, password: string) => {
      try {
        await login(email, password);
        setIsLoggedIn(true);
      } catch(error) {
        console.error(error);
        alert('メールアドレスまたはパスワードが違います');
      }
  };

  //新規登録ボタンが押されたら、Signup状態をtrueにする。
  const showSignup = () => {
    setIsSignup(true);
  };

  //ログインがうまくいったら、ログイン済みの画面を表示する。そうでなければ、ログイン画面を表示する。
  if (isLoggedIn) {
    return <MainPage />;
  }
  if(isConfirming) {
    return(
      <AuthPage email={signupEmail} onConfirmed = {() => {
        setIsConfirming(false);
        setIsSignup(false);
      }}
      />
    );
  }

  if (isSignup) {
    return (
      <SignupPage onSignupSuccess = {(email) => {
        setSignupEmail(email);
        setIsConfirming(true);
      }}
      />
    );
  }
  //毎回loginUserをonLoginとして私、Loginコンポーネントを実行させる
  //1. Loginコンポーネントを実行させる。2. onLoginが実行されたら、こっちのLoginUserを実行してもらう
  return <Login onLogin={loginUser} onSignup={showSignup} />;

};
export default App;