import { ref, nextTick, unref, onMounted } from 'vue';
import { useScript } from '/@/hooks/web/useScript';

const BAI_DU_MAP_URL = 'https://api.map.baidu.com/getscript?v=3.0&ak=xBn5HPIkUrXlh0G9cbjjBSxWm6Sd6uoN';

/**
 * 初始化麦度地图
 * @param lng 经度
 * @param lat 维度
 * @returns
 */
export function useInitBMap(lng, lat) {
  const wrapRef = ref(null);
  const { toPromise } = useScript({ src: BAI_DU_MAP_URL });
  async function initMap() {
    await toPromise();
    await nextTick();
    const wrapEl = unref(wrapRef);
    if (!wrapEl) return;
    const BMap = (window as any).BMap;
    const map = new BMap.Map(wrapEl);
    const point = new BMap.Point(lng, lat);
    map.centerAndZoom(point, 15);
    map.enableScrollWheelZoom(true);
  }

  onMounted(() => {
    initMap();
  });

  return { wrapRef };
}
