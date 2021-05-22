import { ref, nextTick, unref, onBeforeMount, Ref } from 'vue';
import { useScript } from '/@/hooks/web/useScript';
import { error } from '/@/utils/log';

const BAI_DU_MAP_URL = 'https://api.map.baidu.com/getscript?v=3.0&ak=xBn5HPIkUrXlh0G9cbjjBSxWm6Sd6uoN';

/**
 * 初始化百度地图
 * @param lng 经度
 * @param lat 维度
 * @returns
 */
export function useInitBMap() {
  const wrapRef = ref(null);
  const { toPromise } = useScript({ src: BAI_DU_MAP_URL });
  const mapRef: Ref<any | null> = ref(null);
  async function loadMap() {
    await toPromise();
    await nextTick();
    // const wrapEl = unref(wrapRef);
    // if (!wrapEl) return;
    // const BMap = (window as any).BMap;
    // mapRef.value = new BMap.Map(wrapEl);
    // const mapInstance = getMapInstance();
    // const point = new BMap.Point(lng, lat);
    // mapInstance.centerAndZoom(point, 15);
    // mapInstance.enableScrollWheelZoom(true);
  }

  function getMapInstance() {
    const map = unref(mapRef);
    if (!map) {
      error('The map instance has not been Inited.');
    }
    return map;
  }

  onBeforeMount(() => {
    // loadMap();
  });

  const methods: any = {
    initMap: async (lng, lat) => {
      if (!(window as any).BMap) {
        await loadMap();
      }
      const wrapEl = unref(wrapRef);
      if (!wrapEl) return;
      const BMap = (window as any).BMap;
      mapRef.value = new BMap.Map(wrapEl);
      const mapInstance = getMapInstance();
      const point = new BMap.Point(lng, lat);
      mapInstance.centerAndZoom(point, 15);
      mapInstance.enableScrollWheelZoom(true);
      return Promise.resolve();
    },
    mapClick: async (callback?: Fn) => {
      const mapInstance = getMapInstance();
      mapInstance.addEventListener(
        'click',
        function (e) {
          // console.log(e)
          const BMap = (window as any).BMap;
          const geoc = new BMap.Geocoder({ extensions_town: true });
          mapInstance.clearOverlays();
          const point = new BMap.Point(e.point.lng, e.point.lat);
          const Icon = new BMap.Icon('/src/assets/images/locate-icon.png', new BMap.Size(34, 34), {
            anchor: new BMap.Size(17, 30),
          });
          const marker = new BMap.Marker(point, { icon: Icon });
          mapInstance.addOverlay(marker);
          geoc.getLocation(point, function (rs) {
            const address = rs.addressComponents;
            callback && callback({ point: e.point, address });
          });
        },
        false
      );
    },
    centerToPoint: async (lng, lat) => {
      const mapInstance = getMapInstance();
      mapInstance.clearOverlays();
      const BMap = (window as any).BMap;
      const point = new BMap.Point(lng, lat);
      const marker = new BMap.Marker(point);
      mapInstance.addOverlay(marker);
      mapInstance.centerAndZoom(point, 15);
    },
    localSearch: async (key?: string, callback?: Fn, range = 5000) => {
      const mapInstance = getMapInstance();
      const options = {
        pageCapacity: 50,
        onSearchComplete: (results) => {
          if (local.getStatus() == '0') {
            callback && callback(results.Hr);
          }
        },
      };
      const BMap = (window as any).BMap;
      const local = new BMap.LocalSearch(mapInstance, options);
      const centerPoint = mapInstance.getCenter();
      local.searchNearby(key, centerPoint, range);
    },
    siteOverlays: async (points: []) => {
      const mapInstance = getMapInstance();
      const BMap = (window as any).BMap;
      unref(points).forEach((item) => {
        const Point = new BMap.Point(item.lng, item.lat);
        const Icon = new BMap.Icon('/src/assets/images/site-icon2x.png', new BMap.Size(34, 34), {
          anchor: new BMap.Size(17, 0),
        });
        const Marker = new BMap.Marker(Point, { icon: Icon });
        mapInstance.addOverlay(Marker);

        const Label = new BMap.Label(item.title, {
          offset: new BMap.Size(-16, 34),
          position: Point,
        });
        Label.setStyle({
          color: '#fff',
          borderRadius: '6px',
          borderColor: 'transparent',
          backgroundColor: '#00000080',
          padding: '8px',
          fontSize: '12px',
          width: '66px',
          height: 'auto',
          textAlign: 'center',
          lineHeight: '20px',
          whiteSpace: 'normal',
          fontFamily: 'PingFangSC-Regular, PingFang SC',
        });
        Marker.setLabel(Label);

        const contentDOM = `<p>所属地区：${item.district}</p>
          <p>中转站名称：${item.title}</p>
          <p>中转站类型：${item.type}</p>
          <p>设计转运量：${item.amount}</p>
          <p>设施状态：${item.status === 1 ? '运行中' : '在建'}</p>
          <p>管理单位：${item.chargeUnit}</p>`;

        const InfoWindow = new BMap.InfoWindow(contentDOM, {
          width: 300,
          height: 180,
          maxWidth: 360,
        });

        Marker.addEventListener(
          'click',
          () => {
            mapInstance.openInfoWindow(InfoWindow, Point);
          },
          false
        );
      });
    },
  };

  return [wrapRef, methods];
}
