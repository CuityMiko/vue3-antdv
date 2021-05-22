<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #garbageType="{ text }">
        <span v-if="text === '1'">易腐垃圾</span>
        <span v-if="text === '2'">可回收垃圾</span>
        <span v-if="text === '3'">其他垃圾</span>
      </template>
      <template #quality="{ text }">
        <div class="quality-sec">
          <span class="quality-symbol" :class="{ good: text === '1', normal: text === '2', bad: text === '3' }"></span>
          <span v-if="text === '1'">优秀</span>
          <span v-if="text === '2'">一般</span>
          <span v-if="text === '3'">差</span>
        </div>
      </template>
      <template #checkImg="{ text: imgPath }">
        <a-button class="img-btn" @click="handleImage(imgPath)">查看</a-button>
      </template>
    </BasicTable>
    <div class="display-wrapper">
      <ImagePreview :imageList="imgList" ref="Image" />
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref, nextTick } from 'vue';

  import { BasicTable, useTable } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { ImagePreview } from '/@/components/Preview';
  import { columns, searchFormSchema } from './inspection.data';

  import { getInspectionList } from '/@/services/system';

  const imgList1 = [
    'https://t7.baidu.com/it/u=4198287529,2774471735&fm=193&f=GIF',
    'https://t7.baidu.com/it/u=1821636093,3729533292&fm=193&f=GIF',
  ];

  const imgList2 = [
    'http://img0.bdstatic.com/img/image/wise/1%E6%B8%85%E7%BA%AF%E7%BE%8E%E5%A5%B3.jpg',
    'http://img0.bdstatic.com/img/image/wise/6%E6%B0%94%E8%B4%A8%E7%BE%8E%E5%A5%B3.jpg',
  ];

  export default defineComponent({
    name: 'InspectionData',
    components: { BasicTable, PageWrapper, ImagePreview },
    setup() {
      const [registerTable] = useTable({
        title: '巡检明细列表',
        api: getInspectionList,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        beforeFetch: (res) => {
          console.log('before: ', res);
        },
        afterFetch: (res) => {
          console.log('after: ', res);
        },
      });

      const imgList = ref([]);

      function handleImage(_url) {
        console.log(_url);
        const random = Math.round(Math.random() * (2 - 1)) + 1;
        console.log(random);
        if (random === 1) {
          imgList.value = imgList1;
        } else {
          imgList.value = imgList2;
        }
        nextTick(() => {
          const imgs = Image.value && Image?.value?.$el.getElementsByClassName('ant-image');
          console.log(imgs);
          const imgFirst = Image.value && Image?.value?.$el.getElementsByClassName('ant-image')[0];
          if (!imgFirst) return;
          imgFirst.click();
        });
      }

      const Image = ref(null);

      return {
        registerTable,
        handleImage,
        imgList,
        Image,
      };
    },
  });
</script>

<style lang="less">
  .display-wrapper {
    display: none;
    width: 100%;
    height: 100px;

    img {
      width: 100px;
      height: auto;
    }
  }

  .ant-calendar-picker {
    width: 100%;
  }

  .ant-btn.img-btn {
    color: #1890ff;
    background: none;
    border: none;
    box-shadow: unset;

    &:hover {
      background: none;
    }
  }

  .quality-sec {
    padding: 0 24px;
    line-height: 22px;
    text-align: left;

    .quality-symbol {
      display: inline-block;
      width: 8px;
      height: 8px;
      margin-right: 8px;
      vertical-align: middle;
      background: #e1e2e3;
      border-radius: 50%;

      &.good {
        background: #52c41a;
      }

      &.normal {
        background: #ff9b10;
      }

      &.bad {
        background: #f85359;
      }
    }
  }
</style>
