<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <DeptTree class="w-1/4 xl:w-1/6" @select="handleSelect" />
    <div class="form-wrapper p-4 m-4 pt-2 w-3/4 xl:w-5/6">
      <h1 class="pl-8 text-lg">节点说明</h1>
      <Form :label-col="labelCol" :wrapper-col="wrapperCol">
        <FormItem label="节点名称：" v-bind="validateInfos.siteName">
          <Input placeholder="请输入" v-model:value="modelRef.siteName" />
        </FormItem>
        <FormItem label="地区编号：" v-bind="validateInfos.areaCode">
          <Input placeholder="请输入" v-model:value="modelRef.areaCode" />
        </FormItem>
        <FormItem label="顺序编号：" v-bind="validateInfos.sortCode">
          <Input placeholder="请输入" v-model:value="modelRef.sortCode" />
        </FormItem>
        <FormItem label="地区经纬度：" v-bind="validateInfos.position">
          <Input
            style="width: 91%; border-right: none"
            v-model:value="modelRef.position"
            readonly
            placeholder="请输入"
          />
          <Button style="width: 9%; padding: 0" type="default" @click.prevent="openMap">
            <EnvironmentOutlined style="color: #1890ffff" />
          </Button>
        </FormItem>
        <FormItem :wrapper-col="{ span: 11, offset: 3 }">
          <Button class="mr-4" type="primary">编辑</Button>
          <Button class="mr-4" type="primary" @click.prevent="onSubmit">保存</Button>
          <Button type="default">取消</Button>
        </FormItem>
      </Form>
    </div>
    <MapModal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script>
  import { defineComponent, ref, reactive, unref } from 'vue';

  import { PageWrapper } from '/@/components/Page';
  import { useModal } from '/@/components/Modal';
  import DeptTree from './DeptTree.vue';
  import MapModal from './MapModal.vue';

  import { Form, Input, Button } from 'ant-design-vue';
  import { EnvironmentOutlined } from '@ant-design/icons-vue';
  import { useForm } from '@ant-design-vue/use';

  export default defineComponent({
    name: 'RegionMaintenance',
    components: {
      PageWrapper,
      DeptTree,
      MapModal,
      Form,
      FormItem: Form.Item,
      Input,
      Button,
      EnvironmentOutlined,
    },
    setup() {
      const [registerModal, { openModal }] = useModal();
      const chargeUnitId = ref('');
      const modelRef = reactive({
        siteName: '',
        areaCode: '',
        sortCode: '',
        position: '',
      });
      const rulesRef = reactive({
        siteName: [{ required: true, trigger: 'blur', message: '请输入节点名称' }],
        areaCode: [{ required: true, trigger: 'blur', message: '请输入地区编号' }],
        sortCode: [{ required: true, trigger: 'blur', message: '请输入顺序编号' }],
        position: [{ required: true, trigger: 'blur', message: '请选择点位' }],
      });

      const { validate, validateInfos } = useForm(modelRef, rulesRef);

      const onSubmit = () => {
        validate().then(() => {});
      };

      function openMap() {
        openModal(true, {
          isUpdate: false,
        });
      }

      function handleSuccess(value) {
        console.log(value);
        modelRef.position = unref(value);
      }

      function handleSelect(deptId = '') {
        chargeUnitId.value = deptId;
      }

      return {
        chargeUnitId,
        modelRef,
        labelCol: { span: 3 },
        wrapperCol: { span: 10 },
        validate,
        validateInfos,
        onSubmit,
        registerModal,
        openMap,
        handleSuccess,
        handleSelect,
      };
    },
  });
</script>
<style lang="less" scoped>
  .form-wrapper {
    background: #fff;
  }
</style>
