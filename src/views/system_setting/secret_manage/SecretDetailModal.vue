<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="密钥" @ok="handleSubmit">
    <Form :label-col="labelCol" :wrapper-col="wrapperCol" ref="FormRef" :rules="Rules" :model="FormState">
      <FormItem label="appid" name="appid">
        <Input v-model:value="FormState.appid" placeholder="请输入" />
      </FormItem>
      <FormItem label="key" name="key">
        <Select placeholder="请选择" v-model:value="FormState.glxm">
          <SelectOption v-for="item in SelectOption" :key="item.key" :value="item.key">
            {{ item.name }}
          </SelectOption>
        </Select>
      </FormItem>
      <FormItem label="">
        <Button>获取</Button>
        <Button>复制</Button>
      </FormItem>
    </Form>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, reactive } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Form, Input, Button } from 'ant-design-vue';

  export default defineComponent({
    name: 'SecretDetailModal',
    components: { BasicModal, Form, FormItem: Form.Item, Input, Button },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const FormRef = ref();
      interface FormType {
        appid?: string;
        key?: number;
      }
      const FormState: UnwrapRef<FormType> = reactive({
        appid: '',
        key: '',
      });
      // 下拉框
      const SelectOption = reactive([
        {
          key: 1,
          name: '账号1',
        },
        {
          key: 2,
          name: '账号2',
        },
        {
          key: 3,
          name: '账号3',
        },
        {
          key: 4,
          name: '账号4',
        },
      ]);
      const Rules = reactive({
        appid: [{ required: true, trigger: 'blur', message: '请输入appid' }],
        key: [{ type: 'number', required: true, trigger: 'blur', message: '请选择key' }],
      });
      const [registerModal, { setModalProps, closeModal }] = useModalInner(async () => {
        setModalProps({ confirmLoading: false });
      });

      async function handleSubmit() {
        try {
          setModalProps({ confirmLoading: true });
          closeModal();
          emit('success');
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return {
        registerModal,
        FormState,
        Rules,
        handleSubmit,
        SelectOption,
        FormRef,
      };
    },
  });
</script>
<style lang="less" scoped></style>
<style lang="less">
  .screct-card {
    .ant-card-head {
      width: 363px;
      height: 40px;
      min-height: 40px;
    }

    .ant-card-head-title {
      height: 40px;
      padding: 0;
      line-height: 40px;
    }
  }
</style>
