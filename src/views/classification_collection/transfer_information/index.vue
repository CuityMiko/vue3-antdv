<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <DeptTree class="w-1/4 xl:w-1/6" @select="handleSelect" />
    <BasicTable @register="registerTable" class="w-3/4 xl:w-5/6">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增</a-button>
        <a-button type="default" @click="handleLeadIn">导入</a-button>
        <a-button type="default" @click="handleExport">导出</a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <SiteModal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import SiteModal from './SiteModal.vue';
  import DeptTree from './DeptTree.vue';

  import { columns, searchFormSchema } from './transform.data';

  import { getTransformList } from '/@/services/system';

  export default defineComponent({
    name: 'TransferInformation',
    components: {
      PageWrapper,
      BasicTable,
      TableAction,
      DeptTree,
      SiteModal,
    },
    setup() {
      const [registerModal, { openModal }] = useModal();
      const [registerTable, { reload }] = useTable({
        title: '中转站信息列表',
        api: getTransformList,
        columns,
        formConfig: {
          labelWidth: 20,
          schemas: searchFormSchema,
        },
        useSearchForm: true,
        showTableSetting: false,
        bordered: false,
        pagination: {
          pageSize: 20,
        },
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      function handleSelect(deptId = '') {
        reload({ searchInfo: { deptId } });
      }

      function handleCreate() {
        openModal(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        openModal(true, {
          record,
          isUpdate: true,
        });
      }

      function handleExport() {}

      function handleLeadIn() {}

      function handleDelete(record: Recordable) {
        console.log(record);
      }

      function handleSuccess() {
        reload();
      }

      return {
        registerModal,
        registerTable,
        handleSelect,
        handleCreate,
        handleExport,
        handleLeadIn,
        handleEdit,
        handleDelete,
        handleSuccess,
      };
    },
  });
</script>
<style lang="less" scoped></style>
