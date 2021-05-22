<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="'获取经纬度'" :width="960" @ok="handleSubmit">
    <div ref="wrapRef" style="width: 100%; height: 452px"></div>
  </BasicModal>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { useInitBMap } from '/@/hooks/business/useBMap';

  export default defineComponent({
    name: 'MapModal',
    components: { BasicModal },
    emits: ['success'],
    setup(_, { emit }) {
      const position = ref('');
      const pointed = ref(false);
      const [wrapRef, { initMap, mapClick }] = useInitBMap();
      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        console.log(data);
        setModalProps({ confirmLoading: false });

        if (!pointed.value) {
          initMap(120.367745, 30.430449).then(() => {
            mapClick((res) => {
              const { lng, lat } = res.point;
              position.value = lng + ',' + lat;
              pointed.value = true;
            });
          });
        }
      });

      async function handleSubmit() {
        closeModal();
        emit('success', position);
      }

      return {
        wrapRef,
        initMap,
        mapClick,
        position,
        pointed,
        registerModal,
        handleSubmit,
      };
    },
  });
</script>
