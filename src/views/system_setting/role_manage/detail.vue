<template>
  <div class="p-4">角色管理详情页</div>
</template>
<script>
  import { useRoute } from 'vue-router';
  import { defineComponent, onMounted } from 'vue';

  export default defineComponent({
    name: 'RoleManageDetail',
    setup() {
      const { query } = useRoute();

      onMounted(() => {
        const { id } = query;
        console.log(id, '---');
      });
    },
  });
</script>
<style lang="less" scoped></style>
