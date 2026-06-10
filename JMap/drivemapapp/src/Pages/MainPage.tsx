import React, { useState } from 'react';
import CurrentLocation from '../services/CurrentLocation';
import MapPage from './MapPage.tsx';

//AppMode型を設定。これは、3つの状態だけを持つ型だよーん
type AppMode = 'MapMode' | 'DriveMode' | 'RouteCreateMode';
//typeとinterfaceはほぼ同じ。
type Location = {
    latitude: number;
    longitude: number;
};
//React.FC(functioncomponent)は、関数コンポーネント
const MainPage: React.FC = () => {
    //初期値を設定してstateを定義
    const [mode, setMode] = useState<AppMode>('MapMode');
    const [currentLocation, setCurrentLocation] = useState<Location | null>(null);

    //
    const handleLocationSend = (location: Location) => {
        setCurrentLocation(location);
    };

    return (
        <div>
            <h1>現在のモード: {mode}</h1>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <button onClick={() => setMode('DriveMode')}>ドライブモード</button>
                <button onClick={() => setMode('RouteCreateMode')}>ルート作成モード</button>
            </div>

            <div>
                <CurrentLocation onLocationSend={handleLocationSend}/>
                <MapPage currentLocation={currentLocation} />
                <p>
                    現在地：
                    {currentLocation
                        ? `${currentLocation.latitude}, ${currentLocation.longitude}`
                        : '位置情報が取得されていません'}
                </p>
            </div>
        </div>
    );
}

export default MainPage;