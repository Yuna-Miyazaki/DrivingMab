# React、typeScriptを学ぶ上で得た知識
多分すぐ忘れて後で苦しむので、今回の制作で得た知見をここに記す。


# わからない単語
1. コンポーネント

2. レンダリング
画面に表示する内容をReactが計算し、把握するプロセス(関数コンポーネントの呼び出し)を指す。

3. Hook
基本：useState, useEffect
useStateを使うと、関数コンポーネントの中でstateを扱えるようになる。
usestateからは、現在の状態と、それを更新する関数の2つを取得することができる。例)const [pin, setPin] = useState(1);現在の状態pin, 更新する関数setPin、初期状態pin=1

useEffectは、コンポーネントのレンダリング後に実行されるものを扱う。

# 構文リスト目次
1. type型
2. interface型
3. const MainPage: React.FC = () => {}
4. export 

# 構文リスト
## type
type Pin = {
  lat: number;
  lng: number;
  name: string;
};
このデータ構造はこういう形ですよ~と定義する。以下の例で言うと、Pin型のオブジェクトはnumber型のlat, lng、string型のnameを持つ。
const pin:Pin = {
    lat: 35,
    lng: 130,
    name: "tokyo",
};
これは、変数名がpinで、型名がPinの、オブジェクト。こうやってtypeで定義したデータ構造を使う。
const pinは、pinという名前の変数を作り、:Pinで、pinはPin型ということを示してる。ただ、reactでは、pin:Pinみたいな書き方ではなく、
const[pins, setPins] = useState<Pin[]>([]);みたいな感じでかける。
これは、Pin型のオブジェクトを複数保存するためのstate（配列）を作る
setPins([
  ...pins,
  {
    lat: e.latlng.lat,
    lng: e.latlng.lng,
    name: "新しいピン"
  }
]);こういうので、新しいデータを得たときどんどん追加していくみたいな感じにできる。これは、Pin型のオブジェクトを複数保存するためのstate（配列）を作る

実務ではこう書くこともあるらしい
setPins(prevPins => [
  ...prevPins,
  {
    lat: e.latlng.lat,
    lng: e.latlng.lng,
    name: "新しいピン"
  }
]);

## interface
さっきのtypeとほとんど同じ。下の書き方で、同様の使い方ができる。
interface Pin {
  lat: number;
  lng: number;
  name: string;
};
継承の時の書き方がわかりやすいとかかなあ。
継承の時は、interface superPin extends 継承先のやつ {
}で行ける
なんかほとんどがtypeで行けるみたい


## const MainPage: React.FC = () => {}
const MainPageはMainPageという名前のReactコンポーネントを作ってる。
:React.FCは、Reactの関数コンポーネント型。


## export 
これをコンポーネントの前につけると、他のファイルからも使えるようになる

## async
関数の中でawaitを使う場合に必要。 





## https化
ターミナルで
- npm install -D @vitejs/plugin-basic-ssl
- npm run dev -- --host 0.0.0.0

vite.config.tsで

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig({
  plugins: [react(), basicSsl()],
  server: {
    host: '0.0.0.0',
    https: true,
  },
});


## AWS cognito
drivemap-app-usersって名前のアプリにした