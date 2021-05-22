<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增账号</a-button>
      </template>
      <template #status="{ text }">
        <span :class="text == 1 ? 'activate-color' : 'lock-color'"></span>
        <span class="status-text">{{ text == 1 ? '激活' : '锁定' }}</span>
      </template>
      <template #action="{ record }">
        <Button type="link" size="small" @click="handleEdit(record)" :disabled="record.status == 0"> 修改 </Button>
        <Divider type="vertical" />
        <Button type="link" size="small" @click="handleDelete(record)"> 删除 </Button>
        <Divider type="vertical" />
        <Button type="link" size="small" @click="handleResetPass(record)"> 重置密码 </Button>
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { Button, Divider, Modal } from 'ant-design-vue';
  // import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { BasicTable, useTable } from '/@/components/Table';
  import { getAccountList } from '/@/services/system';
  import { PageWrapper } from '/@/components/Page';
  import { columns, searchFormSchema } from './account.data';
  import { useRouter } from 'vue-router';

  export default defineComponent({
    name: 'AccountManage',
    components: { BasicTable, PageWrapper, Button, Divider },
    setup() {
      // 路由
      const router = useRouter();
      const [registerTable, { reload }] = useTable({
        title: '账号列表',
        api: getAccountList,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        useSearchForm: true,
        showTableSetting: false,
        showIndexColumn: false,
        bordered: false,
        // actionColumn: {
        //   width: 220,
        //   title: '操作',
        //   fixed: 'right',
        //   align: 'left',
        //   dataIndex: 'action',
        //   slots: { customRender: 'action' },
        // },
      });
      // methods

      function handleCreate() {
        router.push({
          path: 'account_operate',
        });
      }

      function handleEdit(record: Recordable) {
        console.log(record);
        router.push({
          path: 'account_operate',
          query: {
            name: record.role,
          },
        });
      }

      function handleDelete(record: Recordable) {
        console.log(record);
        // 弹出框
        Modal.confirm({
          title: '提示',
          // icon: createVNode(ExclamationCircleOutlined),
          width: 384,
          okButtonProps: {
            type: 'danger',
          },
          content: '确定要删除吗？',
          okText: '确定',
          okType: 'danger',
          cancelText: '取消',
          centered: true,
          // dialogStyle:{

          // },
          onOk() {
            console.log('OK');
          },

          onCancel() {
            console.log('Cancel');
          },
        });
      }

      function handleSuccess() {
        reload();
      }
      function handleResetPass(record: Recordable) {
        // 弹出框
        Modal.confirm({
          title: '提示',
          // icon: createVNode(ExclamationCircleOutlined),
          width: 384,
          okButtonProps: {
            type: 'danger',
          },
          content: '是否重置密码？重置后的密码是123456',
          okText: '确定',
          okType: 'danger',
          cancelText: '取消',
          centered: true,
          // dialogStyle:{

          // },
          onOk() {
            console.log('OK');
          },

          onCancel() {
            console.log('Cancel');
          },
        });
        console.log(record);
      }
      function handleSelect(deptId = '') {
        reload({ searchInfo: { deptId } });
      }

      return {
        registerTable,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        handleSelect,
        handleResetPass,
      };
    },
  });
</script>
<style lang="less" scoped>
  .activate-color,
  .lock-color {
    display: inline-block;
    width: 8px;
    height: 8px;
    margin-right: 8px;
    border-radius: 50%;
  }

  .activate-color {
    background: #52c41a;
  }

  .lock-color {
    background: #f85359;
  }
</style>
