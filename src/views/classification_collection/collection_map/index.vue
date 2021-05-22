<template>
  <div class="p-4">
    <div ref="wrapRef" style="width: 100%; height: calc(100vh - 86px - 2rem)"></div>
    <div class="search-wrapper">
      <InputSearch
        placeholder="请输入搜索关键字"
        allowClear
        v-model:value="searchWords"
        enter-button="搜索"
        size="large"
        @search="startSearch"
        @change="changeSearchWord"
      />
      <List class="result-list py-2 m-0" v-if="showResultPanel" :data-source="searchResults" :loading="searching">
        <template #renderItem="{ item }">
          <ListItem class="item" @click="moveTo(item)">{{ item.title }}</ListItem>
        </template>
      </List>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { useInitBMap } from '/@/hooks/business/useBMap';

  import { Input, List } from 'ant-design-vue';

  const sites = [
    {
      title: '许村镇中转站1',
      district: '越城区',
      type: '分拣中心',
      amount: '200t',
      status: 1,
      chargeUnit: 'xxx管理单位',
      lng: '120.367745',
      lat: '30.430449',
    },
    {
      title: '许村镇中转站2',
      district: '越城区',
      type: '分拣中心',
      amount: '200t',
      status: 1,
      chargeUnit: 'xxx管理单位1',
      lng: '120.377065',
      lat: '30.442404',
    },
    {
      title: '许村镇中转站3',
      district: '越城区',
      type: '分拣中心',
      amount: '200t',
      status: 1,
      chargeUnit: 'xxx管理单位2',
      lng: '120.361611',
      lat: '30.458247',
    },
  ];

  export default defineComponent({
    name: 'BaiduMap',
    components: {
      InputSearch: Input.Search,
      List,
      ListItem: List.Item,
    },
    setup() {
      const sitesList = ref([]);
      sitesList.value = sites;

      const [wrapRef, { initMap, mapClick, localSearch, centerToPoint, siteOverlays }] = useInitBMap();

      const searching = ref(false);
      const showResultPanel = ref(false);
      const searchWords = ref('');
      const searchResults = ref([]);

      function changeSearchWord(e) {
        if (!e.srcElement.value) {
          showResultPanel.value = false;
          searchResults.value = [];
        }
      }

      function startSearch(e) {
        console.log(e);
        searching.value = true;
        showResultPanel.value = true;
        localSearch(e, (res) => {
          console.log(res);
          searchResults.value = res;
          console.log(searchResults);
          setTimeout(() => {
            searching.value = false;
          }, 1000);
        });
      }

      const moveTo = (obj) => {
        console.log(obj);
        const { lng = '', lat = '' } = obj.point;
        centerToPoint(lng, lat);
      };

      const mapClickCallback = (e) => {
        console.log(e);
      };

      onMounted(() => {
        initMap(120.367745, 30.430449).then(() => {
          siteOverlays(sitesList);
          mapClick((res) => {
            console.log(res);
          });
        });
      });

      return {
        wrapRef,
        initMap,
        mapClick,
        localSearch,
        centerToPoint,
        siteOverlays,
        searching,
        showResultPanel,
        searchWords,
        searchResults,
        sitesList,
        startSearch,
        changeSearchWord,
        moveTo,
        mapClickCallback,
      };
    },
  });
</script>

<style lang="less" scoped>
  .search-wrapper {
    position: absolute;
    top: 16px;
    left: 16px;
    z-index: 99;
  }
</style>

<style lang="less">
  .result-list {
    width: 100%;
    height: 300px;
    overflow: scroll;
    text-align: center;
    background: #fff;

    .item {
      padding: 0.5rem 1rem;
      text-align: left;
      border-bottom: 1px solid #e1e2e3;
    }
  }
</style>
