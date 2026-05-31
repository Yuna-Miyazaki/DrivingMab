import SwiftUI
import SwiftData
import MapKit

struct ContentView: View {
    @State var plotmode: Bool = false
    //gpsの位置を取得する。(現在地取得)
    @StateObject var manager = LocationManager()
    //ユーザートラッキングモードを追従モードにするための変数を定義(地図がユーザを追いかけるようになる)→これは経路設定するまでoffの方がいいかも。経路を決めて走行状態になる→追従モード　がいいかな？
    @State var trackingMode = MapUserTrackingMode.follow
    
    var body: some View {
        ZStack(alignment: .bottomTrailing) {
            //coordinateRegionは、マップの中心座標(緯度軽度)や表示範囲の広さ(m)を保持
            //regionには、現在地の緯度経度と、1km範囲が見れるように拡大って情報が入ってる。それを、$manager.regionとすることにより、ユーザがマップを操作して中心を変えた場合にregionを編集できるようにしてる？って感じっぽい
            Map(coordinateRegion: $manager.region,
                showsUserLocation: true, //マップ上にユーザーの場所を表示するオプションをBool値で指定(地図上に青い現在地マークを表示するかどうか)
                userTrackingMode: $trackingMode)
            .edgesIgnoringSafeArea(.bottom)
            
            //ボタンを押すと、お絵描きモードとマップモードが反転する
            Button(action: {
                plotmode = !plotmode
            }){
                Text("plot mode").fontWeight(.bold)
                    .foregroundColor(.white)
                    .frame(width:100, height: 100)
                    .clipShape(Circle())
            }
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
