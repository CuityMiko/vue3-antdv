<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <div class="p-4">
      <div class="total-sec p-4 mb-4">
        <div class="tit-sec flex">
          <h1>全镇分类质量分析</h1>
          <div class="opt-sec flex flex-none">
            <Select v-model:value="filterType1" @change="totalHandleType1">
              <SelectOption
                v-for="(item, index) in types"
                :key="'types' + index"
                :value="item.value"
                :label="item.label"
                >{{ item.label }}</SelectOption
              >
            </Select>
            <DatePicker
              v-model:value="analysisParams.tjsj"
              placeholder="请选择"
              v-if="dPickerMode1 === 'date'"
              @change="onChange1"
            />
            <MonthPicker
              v-model:value="analysisParams.tjsj"
              placeholder="请选择"
              v-if="dPickerMode1 === 'month'"
              @change="onChange1"
            />
          </div>
        </div>
        <div class="data-sec flex">
          <div class="left flex">
            <div class="analysis-data p-2" v-for="(item, index) in analysisData" :key="'adata' + index">
              <h5>{{ item.title }}</h5>
              <h1>{{ item.value }}</h1>
              <h3 class="flex">
                <span>环比</span>
                <i :class="percentClass(item.percent)">{{ item.percent }}</i>
              </h3>
            </div>
          </div>
          <div class="right">
            <Table
              :dataSource="analysisList.list"
              :columns="sColumns"
              :pagination="false"
              :loading="scoreTableLoading"
              :rowKey="recordKey"
              :scroll="{ y: 189 }"
              class="score-table"
            >
              <template #percent="{ text: percent }">
                <span class="progress-bar">
                  <span class="progress" :style="{ width: percent }"></span>
                </span>
                <span class="pro-text">{{ percent }}</span>
              </template>
            </Table>
          </div>
        </div>
      </div>
      <div class="classify-sec flex">
        <div class="classify-box">
          <div class="tit-sec pt-4 px-4 flex">
            <h1>垃圾分类红榜</h1>
            <div class="opt-sec flex flex-none">
              <Select v-model:value="filterType2" @change="totalHandleType2">
                <SelectOption
                  v-for="(item, index) in types"
                  :key="'types' + index"
                  :value="item.value"
                  :label="item.label"
                  >{{ item.label }}</SelectOption
                >
              </Select>
              <DatePicker
                v-model:value="classifyParams1.tjsj"
                placeholder="请选择"
                v-if="dPickerMode2 === 'date'"
                @change="onChange2"
              />
              <MonthPicker
                v-model:value="classifyParams1.tjsj"
                placeholder="请选择"
                v-if="dPickerMode2 === 'month'"
                @change="onChange2"
              />
            </div>
          </div>
          <Table
            :dataSource="classifyList1.list"
            :columns="cColumns"
            :pagination="false"
            :loading="classifyTableLoading1"
            :rowKey="recordKey"
            :scroll="{ y: 364 }"
          />
        </div>
        <div class="classify-box">
          <div class="tit-sec pt-4 px-4 flex">
            <h1>垃圾分类黑榜</h1>
            <div class="opt-sec flex flex-none">
              <Select v-model:value="filterType3" @change="totalHandleType3">
                <SelectOption
                  v-for="(item, index) in types"
                  :key="'types' + index"
                  :value="item.value"
                  :label="item.label"
                  >{{ item.label }}</SelectOption
                >
              </Select>
              <DatePicker
                v-model:value="classifyParams2.tjsj"
                placeholder="请选择"
                v-if="dPickerMode3 === 'date'"
                @change="onChange3"
              />
              <MonthPicker
                v-model:value="classifyParams2.tjsj"
                placeholder="请选择"
                v-if="dPickerMode3 === 'month'"
                @change="onChange3"
              />
            </div>
          </div>
          <Table
            :dataSource="classifyList2.list"
            :columns="cColumns"
            :pagination="false"
            :loading="classifyTableLoading2"
            :rowKey="recordKey"
            :scroll="{ y: 364 }"
          />
        </div>
      </div>
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref, reactive, onMounted, nextTick } from 'vue';

  import { Select, DatePicker, Table } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { scoreColumns, classifyColumns } from './quality.data';

  import { getAnalysisList, getClassifyList } from '/@/services/system';

  export default defineComponent({
    name: 'ClassificationQualityAnalysis',
    components: {
      PageWrapper,
      Select,
      DatePicker,
      MonthPicker: DatePicker.MonthPicker,
      SelectOption: Select.Option,
      Table,
    },
    setup() {
      const filterType1 = ref('按日');
      const filterType2 = ref('按日');
      const filterType3 = ref('按日');

      const dPickerMode1 = ref('date');
      const dPickerMode2 = ref('date');
      const dPickerMode3 = ref('date');

      const scoreTableLoading = ref(true);
      const classifyTableLoading1 = ref(true);
      const classifyTableLoading2 = ref(true);

      const analysisParams = ref({ tjsj: '' });
      const classifyParams1 = ref({ tjsj: '', redBlack: 1 });
      const classifyParams2 = ref({ tjsj: '', redBlack: 2 });

      const sColumns = reactive(scoreColumns);
      const cColumns = reactive(classifyColumns);

      const analysisList = reactive({
        list: [],
      });

      const classifyList1 = reactive({
        list: [],
      });
      const classifyList2 = reactive({
        list: [],
      });

      const onChange1 = (date, str) => {
        console.log('onChange:', date);
        console.log('onChange', str);
        analysisParams.value.tjsj = str;
        nextTick(() => {
          getAnalysisDatas();
        });
      };

      const onChange2 = (date, str) => {
        console.log('onChange:', date);
        console.log('onChange', str);
        classifyParams1.value.tjsj = str;
        nextTick(() => {
          getClassifyList(classifyParams1.value).then((res) => {
            classifyList1.list = res.items;
            nextTick(() => [(classifyTableLoading1.value = false)]);
          });
        });
      };

      const onChange3 = (date, str) => {
        console.log('onChange:', date);
        console.log('onChange', str);
        classifyParams2.value.tjsj = str;
        nextTick(() => {
          getClassifyList(classifyParams2.value).then((res) => {
            classifyList2.list = res.items;
            nextTick(() => [(classifyTableLoading2.value = false)]);
          });
        });
      };

      const types = reactive([
        {
          value: '1',
          label: '按日',
        },
        {
          value: '2',
          label: '按月',
        },
      ]);

      const analysisData = reactive([
        {
          title: '巡检次数',
          value: 12000,
          percent: '-1.50%',
        },
        {
          title: '总积分',
          value: 12000,
          percent: '-1.50%',
        },
        {
          title: '分类合格率',
          value: 12000,
          percent: '1.25%',
        },
        {
          title: '优秀（次）',
          value: 12000,
          percent: '-1.50%',
        },
        {
          title: '一般（次）',
          value: 12000,
          percent: '-1.50%',
        },
        {
          title: '差（次）',
          value: 12000,
          percent: '-1.50%',
        },
      ]);

      onMounted(() => {
        getAnalysisDatas();

        getClassifyList(classifyParams1.value).then((res) => {
          classifyList1.list = res.items;
          nextTick(() => [(classifyTableLoading1.value = false)]);
        });

        getClassifyList(classifyParams2.value).then((res) => {
          classifyList2.list = res.items;
          nextTick(() => [(classifyTableLoading2.value = false)]);
        });
      });

      function getAnalysisDatas() {
        getAnalysisList(analysisParams.value).then((res) => {
          console.log(res.items);
          analysisList.list = res.items;
          console.log(analysisList.list);
          nextTick(() => {
            scoreTableLoading.value = false;
          });
        });
      }

      function percentClass(str) {
        return parseInt(str) >= 0 ? '' : 'minus';
      }

      function totalHandleType1(val) {
        if (val === '1') {
          dPickerMode1.value = 'date';
        } else if (val === '2') {
          dPickerMode1.value = 'month';
        }
        analysisParams.value.tjsj = '';
      }

      function totalHandleType2(val) {
        if (val === '1') {
          dPickerMode2.value = 'date';
        } else if (val === '2') {
          dPickerMode2.value = 'month';
        }
        classifyParams1.value.tjsj = '';
      }

      function totalHandleType3(val) {
        if (val === '1') {
          dPickerMode3.value = 'date';
        } else if (val === '2') {
          dPickerMode3.value = 'month';
        }
        classifyParams2.value.tjsj = '';
      }

      function recordKey(record) {
        return 'record' + record.id;
      }

      return {
        filterType1,
        filterType2,
        filterType3,
        dPickerMode1,
        dPickerMode2,
        dPickerMode3,
        types,
        analysisData,
        totalHandleType1,
        totalHandleType2,
        totalHandleType3,
        onChange1,
        onChange2,
        onChange3,
        percentClass,
        analysisParams,
        classifyParams1,
        classifyParams2,
        sColumns,
        cColumns,
        scoreTableLoading,
        classifyTableLoading1,
        classifyTableLoading2,
        analysisList,
        classifyList1,
        classifyList2,
        recordKey,
      };
    },
  });
</script>
<style lang="less" scoped>
  .total-sec {
    width: 100%;
    height: auto;
    background: #fff;

    .data-sec {
      width: 100%;
      justify-content: space-between;

      .left {
        flex: 0 0 63.88%;
        width: 63.88%;
        height: 244px;
        flex-wrap: wrap;

        .analysis-data {
          flex: 0 0 32.61%;
          width: 32.61%;
          height: 118px;
          margin-right: 1.085%;
          margin-bottom: 8px;
          border: 1px solid #f0f0f0;

          &:nth-child(3n + 3) {
            margin-right: 0;
          }

          h5 {
            margin-bottom: 8px;
            font-size: 14px;
            line-height: 22px;
            color: #00000073;
          }

          h1 {
            margin-bottom: 16px;
            font-size: 24px;
            line-height: 32px;
            color: #000000d9;
          }

          h3 {
            justify-content: space-between;

            span {
              margin-bottom: 8px;
              font-size: 14px;
              line-height: 22px;
              color: #00000073;
            }

            i {
              font-size: 14px;
              font-style: normal;
              font-weight: normal;
              color: #52c41aff;

              &.minus {
                color: #ff4d4fff;
              }
            }
          }
        }
      }

      .right {
        flex: 0 0 34.722%;
        width: 34.722%;
        height: 244px;

        .ant-table-wrapper {
          padding: 0;
        }
      }
    }
  }

  .progress-bar {
    position: relative;
    display: inline-block;
    width: 80px;
    height: 8px;
    background: #0000000a;
    border-radius: 4px;

    .progress {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      background: #1890ffff;
      border-radius: 4px;
    }
  }

  .pro-text {
    font-size: 14px;
    color: #00000073;
  }

  .tit-sec {
    width: 100%;
    justify-content: space-between;
    margin-bottom: 16px;

    h1 {
      margin-bottom: 0;
      font-size: 14px;
      font-weight: 500;
      line-height: 32px;
      color: #000;
    }

    .ant-select,
    .ant-calendar-picker {
      flex: 0 0 128px;
      width: 128px;
      margin-left: 8px;
    }
  }

  .classify-sec {
    width: 100%;
    height: 52.06vh;
    justify-content: space-between;

    .classify-box {
      flex: 0 0 49.33%;
      width: 49.33%;
      height: auto;
      background: #fff;
    }
  }
</style>

<style lang="less">
  .right {
    .ant-table-wrapper {
      height: 244px;
      padding: 0;
      overflow: auto;
    }
  }

  .score-table {
    .ant-table-tbody > tr > td:nth-child(4) {
      padding: 16px 0;
    }
  }
</style>
