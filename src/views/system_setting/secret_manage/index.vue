<template>
  <PageWrapper dense contentFullHeight fixedHeight>
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
              label: '密钥',
              onClick: handleSecret.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>
    <SecretDetailModal @register="registerModal1" @success="handleSuccess" />
    <SecretModal @register="registerModal2" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts">
  // 依赖
  import { defineComponent } from 'vue';
  // 组件
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { useModal } from '/@/components/Modal';
  import SecretDetailModal from './SecretDetailModal.vue';
  import SecretModal from './SecretModal.vue';
  // 服务
  import { getAccountList } from '/@/services/system';
  // 数据
  import { columns, searchFormSchema } from './secret.data';

  export default defineComponent({
    name: 'SceneInfo',
    components: { BasicTable, PageWrapper, TableAction, SecretDetailModal, SecretModal },
    setup() {
      // 声明变量
      /**
       * 参考数组解构赋值
       * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
       */
      const [registerModal1, { openModal: openModal1 }] = useModal();
      const [registerModal2, { openModal: openModal2 }] = useModal();
      const [registerTable, { reload }] = useTable({
        title: '密钥列表',
        api: getAccountList,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        useSearchForm: true,
        showTableSetting: false,
        bordered: false,
      });

      // 密钥弹窗
      function handleCreate() {
        openModal1(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        console.log(record);
        openModal2(true, {
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

      function handleSecret(record: Recordable) {
        openModal2(true, {
          record,
          isUpdate: true,
        });
      }

      return {
        registerTable,
        registerModal1,
        registerModal2,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        handleSelect,
        handleSecret,
      };
    },
  });
</script>
