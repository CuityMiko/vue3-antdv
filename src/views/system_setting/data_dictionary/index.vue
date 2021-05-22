<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <DeptTree class="w-1/4 xl:w-1/6" @select="handleSelect" />
    <BasicTable @register="registerTable" class="w-3/4 xl:w-5/6">
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
              onClick: handleDelete.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>
    <DictionaryDataModal @register="registerModal" @success="handleSuccess" :isUpdate="isUpdate" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Modal } from 'ant-design-vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getAccountList } from '/@/services/system';
  import { PageWrapper } from '/@/components/Page';
  import DeptTree from './components/DeptTree.vue';

  import { useModal } from '/@/components/Modal';
  import DictionaryDataModal from './components/DictionaryDataModal.vue';

  import { columns, searchFormSchema } from './dictionary.data';

  export default defineComponent({
    name: 'DataDictionary',
    components: { BasicTable, PageWrapper, DeptTree, DictionaryDataModal, TableAction },
    setup() {
      const isUpdate = ref(false);
      const [registerModal, { openModal }] = useModal();
      const [registerTable, { reload }] = useTable({
        title: '数据字典列表',
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
        actionColumn: {
          width: 150,
          title: '操作',
          align: 'left',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      function handleCreate() {
        isUpdate.value = false;
        console.log(isUpdate, 'ISUPDATA');
        openModal(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        isUpdate.value = true;
        console.log(isUpdate);
        console.log(record);
        openModal(true, {
          record,
          isUpdate: true,
        });
      }

      function handleDelete(record: Recordable) {
        // console.log(record);
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
          onOk() {
            console.log(record, 'OK');
          },

          onCancel() {
            console.log('Cancel');
          },
        });
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
        isUpdate,
      };
    },
  });
</script>
