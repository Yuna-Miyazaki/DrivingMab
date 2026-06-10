import {signUp, confirmSignUp, signIn, signOut, getCurrentUser} from 'aws-amplify/auth';

export const register = async(
    username: string,
    email: string,
    password: string
) => {
    return await signUp({
        username: email,
        password,
        options: {
            userAttributes: {
                email,
                preferred_username: username,
            },
        },
    });
};

export const confirmRegister = async (
    email: string,
    code: string
) => {
    return await confirmSignUp ({
        username: email,
        confirmationCode:code,
    });
};

export const login = async(
    email:string,
    password:string
) => {
    await signIn ({
        username: email,
        password,
    });
    return true;
};

export const logout = async () => {
    await signOut();
};

export const getLoginUser = async () => {
    return await getCurrentUser();
};


//ここからは、自身のusers.csvでログイン管理している場合
//exportをつけると、他のファイルから使えるようになる!!
// export const login = async (email:string, password:string):Promise<boolean> => {
//     const response = await fetch("/users.csv");
// if (!response.ok) {
//     console.error("users.csv が読み込めません");
//     return false;
// }

// const csvText = await response.text();

// const lines = csvText.trim().split("\n");

// const users: UserRow[] = lines.slice(1).map((line) => {
//     const [number,csvname, csvEmail, csvPassword] = line.split(",");

//     return {
//     number: number.trim(),
//     email: csvEmail.trim(),
//     password: csvPassword.trim(),
//     };
// });

// const user = users.find((user) => user.email === email);
// //ユーザが見つからなければfalse
// if (!user) return false;
// //パスワードが見つからなければfalse。そうでなければtrueを返す
// return user.password === password;
// } 

