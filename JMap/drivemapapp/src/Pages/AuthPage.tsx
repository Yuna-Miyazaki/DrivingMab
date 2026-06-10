import React, {useState} from 'react';
import {confirmRegister} from '../services/AuthService';

type Props = {
    email: string;
    onConfirmed: () => void;
};

const AuthPage: React.FC<Props> = ({email, onConfirmed}) => {
    const [code, setCode] = useState('');
    const handleConfirm = async(event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await confirmRegister(email, code);
            alert('認証が完了しました');
            onConfirmed();
        } catch (error) {
            console.error(error);
            alert('認証に失敗しました');
        }
    };

    return (
        <form onSubmit={handleConfirm}>
            <h1>認証コード入力</h1>
            <p>{email}に届いた認証コードを入力してください</p>
            <input type="text" required value={code} onChange={(e) => setCode(e.target.value)}></input>

            <button type="submit">認証する</button>
        </form>

    );
};

export default AuthPage;