import { useEffect, useState } from 'react';

//location型を定義。locationは緯度と経度を持つオブジェクト。
type Location = {
    latitude: number;
    longitude: number;
};

//親からonLocationSend関数を呼ばれた時は、こっちでonLocationSend関数が呼ばれた時の中身を返す
interface CurrentLocationProps {
    onLocationSend: (location: Location) => void;
}

//CurrentLocationという関数コンポーネントを定義。
//<currentLocation />を見つけると、çurrentLocation()を呼ぶ
function CurrentLocation(props: CurrentLocationProps) {
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isWatching, setIsWatching] = useState<boolean>(false);
    //useEffect(関数);らしい。
    //useEffect(() =>{})は、引数なし関数。()=>{}は、()を受け取り、{}を返す関数
    useEffect(() => {//コンポーネントがマウントされたときに実行される。位置情報の監視を開始する。
        if (!navigator.geolocation) {//位置情報が使えない場合は、エラーメッセージを表示して終了する。
            setErrorMessage("位置情報が使えません");
            return;
        }

        setIsWatching(true);
        //watchPositionは、GPSの監視を開始する関数。監視を開始し、位置情報が更新されたらlocationオブジェクトを生成して親に返す.
        //watchIDは、watchPositionの戻り値で、監視識別番号を返している。
        const watchId = navigator.geolocation.watchPosition(
            //位置情報を受け取り、locationオブジェクトを作成して親に返す関数
            (position) => {//位置情報の取得に成功した場合、latitudeとlongitudeに位置情報を保存。
                const location = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                };

                props.onLocationSend(location);//親から渡されたonLocationSend関数を呼び出して、位置情報を渡す。
                setErrorMessage("");
            },
            () => {//位置情報の取得に失敗した場合。
                setErrorMessage("位置情報の取得に失敗しました");
            },
            {//位置情報の取得に関するオプション。
                enableHighAccuracy: true,//高精度な位置情報を取得するためのオプション。trueにすると、GPSなどの高精度な位置情報を使用するようになる。
                maximumAge: 0,//位置情報のキャッシュを使用しないようにするオプション。0にすると、常に最新の位置情報を取得するようになる。
                timeout: 10000,//10秒以内に位置情報が取得できない場合にエラーとするオプション。10000にすると、10秒以内に位置情報が取得できない場合にエラーとするようになる。
            }
        );

        return () => {//ブラウザが終わった時に実行される
            navigator.geolocation.clearWatch(watchId);//位置情報の監視を停止する。
            setIsWatching(false);//監視状態をfalseにする
        };
    }, []);

    return (
        <div>
            <p>{isWatching ? "現在地を監視中" : "監視していません"}</p>
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
}

export default CurrentLocation;