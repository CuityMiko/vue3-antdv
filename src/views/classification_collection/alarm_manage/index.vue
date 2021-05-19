<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <div class="top-data p-4 m-4 mb-0 flex">
      <div class="data-box" v-for="(item, index) in warnDatas" :key="'warn' + index">
        <p class="m-0">{{ item.title }}</p>
        <h1 class="m-0">{{ item.value }}</h1>
      </div>
    </div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="default" @click="handleExport">导出</a-button>
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
  import { defineComponent, reactive, ref, nextTick } from 'vue';

  import { BasicTable, useTable } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { ImagePreview } from '/@/components/Preview';

  import { getAlarmList } from '/@/services/system';
  import { columns, searchFormSchema } from './alarm.data';

  const imgList1 = [
    'https://t7.baidu.com/it/u=4198287529,2774471735&fm=193&f=GIF',
    'https://t7.baidu.com/it/u=1821636093,3729533292&fm=193&f=GIF',
  ];

  const imgList2 = [
    'http://img0.bdstatic.com/img/image/wise/1%E6%B8%85%E7%BA%AF%E7%BE%8E%E5%A5%B3.jpg',
    'http://img0.bdstatic.com/img/image/wise/6%E6%B0%94%E8%B4%A8%E7%BE%8E%E5%A5%B3.jpg',
  ];

  export default defineComponent({
    name: 'AlarmManage',
    components: {
      PageWrapper,
      BasicTable,
      ImagePreview,
    },
    setup() {
      const warnDatas = reactive([
        {
          title: '今日报警',
          value: 5,
        },
        {
          title: '本月报警',
          value: 150,
        },
        {
          title: '本年报警',
          value: 1500,
        },
        {
          title: '累计未响应',
          value: 50,
        },
      ]);

      const [registerTable] = useTable({
        title: '报警列表',
        api: getAlarmList,
        columns,
        formConfig: {
          labelWidth: 80,
          schemas: searchFormSchema,
        },
        useSearchForm: true,
        showTableSetting: false,
        bordered: true,
      });

      const imgList = ref([]);

      const Image = ref(null);

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
          imgFirst.click();
        });
      }

      function handleExport() {
        console.log('export');
      }

      return {
        warnDatas,
        imgList,
        handleImage,
        Image,
        registerTable,
        handleExport,
      };
    },
  });
</script>
<style lang="less" scoped>
  .display-wrapper {
    display: none;
    width: 100%;
    height: 100px;

    img {
      width: 100px;
      height: auto;
    }
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

  .top-data {
    width: 100%;
    height: auto;
    background: #fff;
    justify-content: space-between;

    .data-box {
      position: relative;
      flex: 0 0 25%;
      width: 25%;
      text-align: center;

      &::after {
        position: absolute;
        top: 50%;
        right: 0;
        display: block;
        width: 1px;
        height: 40px;
        background: #f0f0f0ff;
        content: ' ';
        transform: translateY(-50%);
      }

      &:last-child::after {
        content: none;
      }

      p {
        font-size: 14px;
        line-height: 22px;
        color: #00000073;
      }

      h1 {
        font-size: 24px;
        line-height: 32px;
        color: #000000d9;
      }
    }
  }
</style>
