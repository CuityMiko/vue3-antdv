<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <!-- <BasicForm @register="registerForm" /> -->
    <Form :label-col="labelCol" :wrapper-col="wrapperCol" ref="FormRef" :rules="Rules" :model="FormState">
      <FormItem label="单位名称" name="dwmc">
        <Input v-model:value="FormState.zdmc" placeholder="请输入" />
      </FormItem>
      <FormItem label="单位类型" name="dwlx">
        <Select placeholder="请选择" v-model:value="FormState.dwlx">
          <SelectOption v-for="item in SelectOption" :key="item.key" :value="item.key">
            {{ item.name }}
          </SelectOption>
        </Select>
      </FormItem>
      <FormItem label="关联项目" name="glxm">
        <Select placeholder="请选择" v-model:value="FormState.glxm">
          <SelectOption v-for="item in SelectOption" :key="item.key" :value="item.key">
            {{ item.name }}
          </SelectOption>
        </Select>
      </FormItem>
      <FormItem label="联系人" name="lxr">
        <Input v-model:value="FormState.mark" placeholder="请输入" />
      </FormItem>
      <FormItem label="联系方式" name="lxfs">
        <Input v-model:value="FormState.mark" placeholder="请输入" />
      </FormItem>
      <FormItem label="详细地址" name="xxdz">
        <Input v-model:value="FormState.xxdz" placeholder="请输入" />
      </FormItem>
      <FormItem label="接口权限" name="jkqx">
        <Card style="width: 363px" :headStyle="headStyle" :bodyStyle="bodyStyle" class="screct-card">
          <template #title>
            <span class="role-card-square"></span>
            <span class="role-card-title">接口权限</span>
          </template>
          <Tree
            checkable
            :tree-data="treeData"
            v-model:expandedKeys="expandedKeys"
            v-model:selectedKeys="selectedKeys"
            v-model:checkedKeys="FormState.jkqx"
          />
        </Card>
      </FormItem>
    </Form>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, reactive, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Form, Input, Card, Tree, Select } from 'ant-design-vue';
  export default defineComponent({
    name: 'SecretModal',
    components: { BasicModal, Form, FormItem: Form.Item, Input, Card, Tree, Select, SelectOption: Select.Option },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      interface FormType {
        dwmc?: string;
        dwlx?: number;
        glxm?: number;
        lxr: string;
        lxfs: string;
        xxdz: string;
        jkqx: string[];
      }
      const FormState: UnwrapRef<FormType> = reactive({
        dwmc: '',
        dwlx: 1,
        glxm: 2,
        lxr: '',
        lxfs: '',
        jkqx: [],
      });
      const labelCol = reactive({
        flex: '100px',
      });
      const wrapperCol = reactive({
        flex: '328px',
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
      // 卡片配置
      const headStyle = reactive({});
      const bodyStyle = reactive({
        padding: '6px 16px',
      });
      // 树
      const treeData = [
        {
          title: 'parent 1',
          key: '0-0',
          children: [
            {
              title: 'parent 1-0',
              key: '0-0-0',
              children: [
                { title: 'leaf', key: '0-0-0-0' },
                { title: 'leaf', key: '0-0-0-1' },
              ],
            },
            {
              title: 'parent 1-1',
              key: '0-0-1',
              children: [{ key: '0-0-1-0', slots: { title: 'title0010' } }],
            },
          ],
        },
      ];
      const phoneRule = async (_, value: string) => {
        // if (!value) {
        //   return Promise.reject(new Error('请输入手机号!'));
        // } else {
        if (!/^1[3456789]\d{9}$/.test(value)) {
          return Promise.reject(new Error('手机号格式不正确!'));
        } else {
          return Promise.resolve();
        }
        // }
      };
      const Rules = reactive({
        dwmc: [{ required: true, trigger: 'blur', message: '请输入单位名称' }],
        dwlx: [{ required: true, trigger: 'blur', message: '请选择单位类型' }],
        lxfs: [{ validator: phoneRule, trigger: 'blur' }],
        xxdz: [{ required: true, trigger: 'blur', message: '请输入详细地址' }],
        jkqx: [{ type: 'array', required: true, trigger: 'blur', message: '请选择接口权限' }],
      });
      const expandedKeys = ref([]);
      const selectedKeys = ref([]);
      const checkedKeys = ref(['0-0-0', '0-0-1']);
      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        // if (unref(isUpdate)) {}
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '修改'));

      async function handleSubmit() {
        try {
          // const values = await validate();
          setModalProps({ confirmLoading: true });
          // TODO custom api
          // console.log(values);
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
        getTitle,
        handleSubmit,
        headStyle,
        bodyStyle,
        labelCol,
        wrapperCol,
        treeData,
        expandedKeys,
        selectedKeys,
        checkedKeys,
        SelectOption,
      };
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

  .role-card-square,
  .role-card-title {
    display: inline-block;
    vertical-align: middle;
  }

  .role-card-square {
    width: 16px;
    height: 16px;
    margin-right: 10px;
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 2px;
  }

  .role-card-title {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.65);
  }
</style>
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
