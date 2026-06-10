import React from 'react';
import MainPage from './pages/MainPage.tsx'
import { useState } from 'react';
import Login from './pages/LoginPage.tsx'
import login from './Auth.ts'
//ログインページを作るよ

const App: React.FC = () => {
  const [isLoginned, setisLoginned] = useState(false);
  const loginchecker = async (email:string, password:string) => {
    const result = await login(email, password);
    if(result){
      setisLoginned(true);
    }
    else {
        alert('メールアドレスまたはパスワードが違います');
      }


  }

  if (isLoginned){
    return <MainPage />;
  }
  else {
    return <Login onLogin={loginchecker}/>;
  }

};

export default App;
