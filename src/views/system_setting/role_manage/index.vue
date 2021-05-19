<template>
  <div class="p-4">
    <p>角色管理</p>
    <Button @click="handleClick">跳转详情页</Button>
    <Button class="ml-1" @click="handleOpenModel">打开弹窗</Button>
    <ModalComp @register="registerModel" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted } from 'vue';
  import { Button } from 'ant-design-vue';
  import { useGo } from '/@/hooks/web/usePage';
  import { useModal } from '/@/components/Modal';
  import ModalComp from './components/ModalComp.vue';

  export default defineComponent({
    name: 'RoleManage',
    components: {
      Button,
      ModalComp,
    },
    setup() {
      const go = useGo();
      const [registerModel, { openModal }] = useModal();

      onMounted(() => {
        console.log('this is onMounted func');
        // emit('closeModel', handleCloseModel);
      });

      // 点击跳转
      const handleClick = () => {
        go('/system_setting/role_manage_detail?id=123');
      };

      // 打开弹窗
      const handleOpenModel = () => {
        openModal();
      };

      // const handleCloseModel = () => {
      //   openModal(false);
      // };

      return {
        registerModel,
        handleClick,
        handleOpenModel,
      };
    },
  });
</script>
<style lang="less" scoped></style>
