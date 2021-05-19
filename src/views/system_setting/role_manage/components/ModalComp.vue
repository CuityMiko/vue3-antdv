<template>
  <BasicModal v-bind="$attrs" title="Modal Title" @ok="handleModelOk"> Modal Info. </BasicModal>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicModal } from '/@/components/Modal';
  export default defineComponent({
    components: { BasicModal },
    setup() {
      // 弹窗点击确定
      const handleModelOk = () => {
        console.log('handleModelOk');
      };
      return {
        handleModelOk,
      };
    },
  });
</script>
