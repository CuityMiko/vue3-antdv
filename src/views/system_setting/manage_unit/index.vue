<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增</a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '修改',
              onClick: handleEdit.bind(null, record),
            },
            {
              label: '删除',
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
    <AccountModal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts">
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getAccountList } from '/@/services/system';
  import { PageWrapper } from '/@/components/Page';

  import { useModal } from '/@/components/Modal';
  import AccountModal from './AccountModal.vue';

  import { columns, searchFormSchema } from './manage.data';
  export default {
    name: 'ManageUnit',
    components: { BasicTable, PageWrapper, AccountModal, TableAction },
    setup() {
      const [registerModal, { openModal }] = useModal();
      const [registerTable, { reload }] = useTable({
        title: '单位列表',
        api: getAccountList,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        useSearchForm: true,
        bordered: true,
        actionColumn: {
          width: 160,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      function handleCreate() {
        openModal(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        console.log(record);
        openModal(true, {
          record,
          isUpdate: true,
        });
      }

      function handleDelete(record: Recordable) {
        console.log(record);
      }

      function handleSuccess() {
        reload();
      }

      function handleSelect(deptId = '') {
        reload({ searchInfo: { deptId } });
      }

      return {
        registerTable,
        registerModal,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        handleSelect,
      };
    },
  };
</script>
<style lang="less" scoped></style>
