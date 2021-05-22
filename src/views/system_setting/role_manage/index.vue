<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable" class="p-4">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增角色</a-button>
      </template>
      <template #action="{ record }">
        <Button type="link" size="small" @click="handleEdit(record)" :disabled="record.status == 0"> 修改 </Button>
        <Divider type="vertical" />
        <Button type="link" size="small" @click="handleDelete(record)"> 删除 </Button>
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { Button, Divider, Modal } from 'ant-design-vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { getAccountList } from '/@/services/system'; //,getRoleList角色列表
  import { PageWrapper } from '/@/components/Page';
  import { columns } from './role.data';

  export default defineComponent({
    name: 'RoleManage',
    components: { BasicTable, PageWrapper, Divider, Button },
    setup() {
      // 路由
      const router = useRouter();
      const [registerTable, { reload }] = useTable({
        title: '角色列表',
        // api: getRoleList,
        api: getAccountList,
        columns,
        showTableSetting: false,
        showIndexColumn: false,
        bordered: false,
      });

      function handleCreate() {
        router.push({
          path: 'role_operate',
        });
      }

      function handleEdit(record: Recordable) {
        console.log(record);
        router.push({
          path: 'role_operate',
          query: {
            name: record.role,
          },
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
      onMounted(() => {
        // getRoleList().then(res=>{
        //   console.log(res,'====')
        // })
      });
      return {
        registerTable,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        handleSelect,
      };
    },
  });
</script>
