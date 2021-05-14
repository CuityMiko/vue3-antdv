<template>
  <div class="p-4">
    <div ref="wrapRef" style="width: 100%; height: 100vh"></div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useInitBMap } from '/@/hooks/business/useBMap';

  export default defineComponent({
    name: 'BaiduMap',
    setup() {
      const { wrapRef } = useInitBMap(120.264038, 30.446793);
      return { wrapRef };
    },
  });
</script>
