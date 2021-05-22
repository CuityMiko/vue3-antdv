<template>
  <div class="p-4">角色管理详情页{{ rid }}</div>
</template>
<script>
  import { useRoute } from 'vue-router';
  import { defineComponent, onMounted, ref } from 'vue';

  export default defineComponent({
    name: 'RoleDetail',
    setup() {
      const { query } = useRoute();
      const rid = ref(0);
      onMounted(() => {
        const { id } = query;
        console.log(id, '---');
        rid.value = id;
      });
      return {
        rid,
      };
    },
  });
</script>
<style lang="less" scoped></style>
