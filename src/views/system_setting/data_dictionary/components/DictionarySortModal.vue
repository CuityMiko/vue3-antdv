<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
    <div class="tip">
      <div class="icon-box">
        <InfoCircleOutlined twoToneColor="#1890FF" :style="{ color: '#1890FF' }" />
      </div>
      <p class="txt">
        编码只能输入英文字符（大小写均可）及下划线，输入规则为：“分类名称拼音首字母+type”，例如：垃圾类型：ljlxtype;
      </p>
    </div>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { sortFormSchema } from '../dictionary.data';
  import { getDeptList } from '/@/services/system';
  import { InfoCircleOutlined } from '@ant-design/icons-vue';

  export default defineComponent({
    name: 'DictionarySortModal',
    components: { BasicModal, BasicForm, InfoCircleOutlined },
    props: {
      isUpdate: {
        type: Boolean,
        default: false,
      },
    },
    emits: ['success', 'register'],
    setup(props, { emit }) {
      const isUpdate = ref(true);

      const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
        labelWidth: 100,
        schemas: sortFormSchema,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
          });
        }

        const treeData = await getDeptList();
        updateSchema([
          {
            field: 'pwd',
            show: !unref(props.isUpdate),
          },
          {
            field: 'dept',
            componentProps: { treeData },
          },
        ]);
      });

      const getTitle = computed(() => (!unref(props.isUpdate) ? '字典分类新增' : '字典分类编辑'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          // TODO custom api
          console.log(values);
          closeModal();
          emit('success');
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { registerModal, registerForm, getTitle, handleSubmit };
    },
  });
</script>
<style lang="less" scoped>
  .tip {
    display: flex;
    width: 363px;
    height: 84px;
    margin-left: 100px;
    background: #e6f7ff;
    border: 1px solid #91d5ff;
    border-radius: 2px;

    .icon-box {
      width: 40px;
      text-align: center;

      .icon {
        display: inline-block;
        width: 14px;
        height: 14px;
      }
    }

    .txt {
      font-size: 14px;
      line-height: 22px;
    }
  }
</style>
