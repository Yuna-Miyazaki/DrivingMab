import MapKit
import Combine
//位置情報を管理するクラス
//ObservableObjectは、中の値（今回は@publishedがついてるregion）が変わったらswiftUIに知らせれるクラス
class LocationManager: NSObject, ObservableObject, CLLocationManagerDelegate {
    let manager = CLLocationManager()//iphoneのgps、位置情報を使うためのおまじない
    // 追加 地図を表示するための領域を保持
    // 更新のたびに変化するので@Publishedを付与して観測
    @Published var region =  MKCoordinateRegion()//現在地中心に更新される
    override init() {//locationmanagerが作られた瞬間に実行される。locationmanagerの初期設定みたいなもん
        super.init()// スーパクラスのイニシャライザを実行
        self.manager.delegate = self// 自身をデリゲートプロパティに設定(位置情報が更新されたらこのクラスに知らせろよなーってやつ)
        self.manager.requestWhenInUseAuthorization()// 位置情報を利用許可をリクエスト
        self.manager.desiredAccuracy = kCLLocationAccuracyBest// 最高精度の位置情報を要求(ドライブ時なので、km単位や10m単位の精度じゃなくて最高精度)
        self.manager.distanceFilter = 2 //位置情報の更新距離(m)
        self.manager.startUpdatingLocation()
    }
    
    
    // 現在地が更新されるたびに自動で呼ばれる関数(これはgpsの位置情報が変わると呼ばれる)
    func locationManager(_ manager: CLLocationManager,
                         didUpdateLocations locations: [CLLocation]) {
        // 配列の最後に最新のロケーションが格納される
        // map関数を使って全要素にアクセス map{ $0←要素に参照 }
        locations.last.map { location in
            let center = CLLocationCoordinate2D( //centerに緯度と軽度の情報を与えてる
                latitude: location.coordinate.latitude,
                longitude: location.coordinate.longitude)
            //regionに、さっき埋め込んだ全部の要素を詰め込み
            region = MKCoordinateRegion(
                center: center,
                latitudinalMeters: 1000.0,
                longitudinalMeters: 1000.0
            )
        }
        
    }
    
}
