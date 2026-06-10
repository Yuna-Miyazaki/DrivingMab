//もらった情報から、生合成を図り、true or falseで返す
type userdata ={
    number:string;
    email: string;
    password:string;
};

export async function login (
    email:string, 
    password:string
): Promise<boolean> {
    const response = await fetch('users.csv');
    if(!response.ok){
        console.error("users.csv が読み込めません");
        return false;
    }
    const csvText = await response.text();
    const lines = csvText.trim().split("\n");
    const users:userdata[] = lines.slice(1).map((line) => {
        const [number, csvEmail, csvPassword] = line.split(",");

        return {
        number: number.trim(),
        email: csvEmail.trim(),
        password: csvPassword.trim(),
        };
    });

    const user = users.find((user) => user.email === email)
    if (!user) return false;
    //パスワードが見つからなければfalse。そうでなければtrueを返す
    return user.password === password;

};

export default login;

