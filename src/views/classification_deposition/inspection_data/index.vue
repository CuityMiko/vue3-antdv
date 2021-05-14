<template>
  <div class="wrapper p-4">
    <div class="filter-sec">
      <Form>
        <ARow>
          <ACol :span="8">
            <FormItem label="地区">
              <TreeSelect
                v-modal="distId"
                show-search
                style="width: 100%"
                placeholder="请选择地区"
                :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                allow-clear
                tree-default-expand-all
                :tree-data="treeData"
              />
            </FormItem>
          </ACol>
          <ACol :span="8" />
          <ACol :span="8" />
        </ARow>
      </Form>
    </div>
  </div>
</template>
<script>
  import { Row, Col, Form, TreeSelect } from 'ant-design-vue';

  export default {
    name: 'InspectionData',
    components: {
      [Col.name]: Col,
      [Row.name]: Row,
      Form,
      FormItem: Form.item,
      TreeSelect,
    },
    data() {
      return {
        treeData: [
          {
            title: 'Node1',
            value: '0-0',
            key: '0-0',
            children: [
              {
                title: 'Child Node1',
                value: '0-0-0',
                key: '0-0-0',
              },
            ],
          },
          {
            title: 'Node2',
            value: '0-1',
            key: '0-1',
            children: [
              {
                title: 'Child Node3',
                value: '0-1-0',
                key: '0-1-0',
                disabled: true,
              },
              {
                title: 'Child Node4',
                value: '0-1-1',
                key: '0-1-1',
              },
              {
                title: 'Child Node5',
                value: '0-1-2',
                key: '0-1-2',
              },
            ],
          },
        ],
        distId: '',
      };
    },
  };
</script>
<style lang="less" scoped>
  .wrapper {
    .filter-sec {
      width: 100%;
      height: auto;
      padding: 25px;
      background: #fff;
    }
  }
</style>
