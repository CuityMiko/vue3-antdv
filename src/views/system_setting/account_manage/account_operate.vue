<template>
  <div class="p-4 account-operate">
    <div class="role-form-wraper pt-8 pb-8">
      <Form
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        ref="firstFormRef"
        :rules="firstRules"
        :model="firstFormState"
        v-if="!isNext"
      >
        <FormItem label="账号" name="yhzh">
          <Input v-model:value="firstFormState.yhzh" placeholder="请输入" />
        </FormItem>
        <FormItem label="姓名" name="zsxm">
          <Input v-model:value="firstFormState.zsxm" placeholder="请输入" />
        </FormItem>
        <FormItem label="账号状态" name="zhzt">
          <RadioGroup v-model:value="firstFormState.zhzt">
            <Radio value="1">激活</Radio>
            <Radio value="2">锁定</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="账号类型" name="yhzhlx">
          <Select placeholder="请选择" v-model:value="firstFormState.yhzhlx">
            <SelectOption v-for="item in SelectOption" :key="item.key" :value="item.key">
              {{ item.name }}
            </SelectOption>
          </Select>
        </FormItem>
        <FormItem label="手机号码" name="sjhm">
          <Input v-model:value="firstFormState.sjhm" placeholder="请输入请输入11位手机号码" />
        </FormItem>
        <FormItem label="大屏分辨率" name="fbl">
          <RadioGroup v-model:value="firstFormState.fbl">
            <Radio value="1">16:9</Radio>
            <Radio value="2">32:9</Radio>
            <Radio value="3">非标屏</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="角色名称" name="jsmc">
          <Input v-model:value="firstFormState.jsmc" placeholder="请输入" />
        </FormItem>
        <FormItem label="关联角色" name="tenantroleIdList">
          <Card style="width: 328px" :bodyStyle="bodyStyle">
            <Tree
              checkable
              :tree-data="treeData"
              v-model:expandedKeys="expandedKeys"
              v-model:checkedKeys="firstFormState.tenantroleIdList"
            />
          </Card>
        </FormItem>
      </Form>
      <div v-else>
        <h2 class="role-title">数据权限</h2>
        <Form
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          ref="secondFormRef"
          :rules="secondRules"
          :model="secondFormState"
        >
          <FormItem label="GIS定位" name="gis">
            <Input v-model:value="secondFormState.gis" placeholder="请输入" />
          </FormItem>
          <FormItem label="行政区划" name="xzqh">
            <Input v-model:value="secondFormState.xzqh" placeholder="请输入" />
          </FormItem>
        </Form>
      </div>
      <div class="role-operate-button">
        <Button class="mr-8px" @click="handleCancel">取消</Button>
        <Button type="primary" @click="handleOperate">{{ isNext ? '确定' : '下一步' }}</Button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { Tree, Card, Button, Form, Input, Radio, Select } from 'ant-design-vue';
  import { defineComponent, reactive, ref, watch, onMounted, UnwrapRef } from 'vue';
  import { useRouter, useRoute } from 'vue-router';

  export default defineComponent({
    name: 'AccountOperate',
    components: {
      Tree,
      Card,
      Button,
      Form,
      FormItem: Form.Item,
      Input,
      Radio,
      RadioGroup: Radio.Group,
      Select,
      SelectOption: Select.Option,
    },
    setup() {
      interface FormState {
        yhzh?: string;
        zsxm?: string;
        zhzt?: string;
        sjhm?: string;
        yhzhlx?: number;
        jsmc?: string;
        fbl?: string;
        tenantroleIdList: string[];
      }
      interface Formstatetwo {
        gis?: string;
        xzqh?: string;
      }
      const router = useRouter();
      const route = useRoute();
      const query = ref(route.query.name);
      // 数据
      const isNext = ref(false);
      // 卡片配置
      const bodyStyle = reactive({
        padding: '6px 16px',
      });
      const labelCol = reactive({
        flex: '100px',
      });
      const wrapperCol = reactive({
        flex: '328px',
      });
      // 表单字段
      const firstFormRef = ref();
      const secondFormRef = ref();
      const firstFormState: UnwrapRef<FormState> = reactive({
        yhzh: '',
        zsxm: '',
        zhzt: '1',
        sjhm: '',
        yhzhlx: 1,
        jsmc: '',
        fbl: '1',
        tenantroleIdList: [],
      });
      const secondFormState: UnwrapRef<Formstatetwo> = reactive({
        gis: '',
        xzqh: '',
      });
      const phoneRule = async (_, value: string) => {
        if (!value) {
          return Promise.reject(new Error('请输入手机号!'));
        } else {
          if (!/^1[3456789]\d{9}$/.test(value)) {
            return Promise.reject(new Error('手机号格式不正确!'));
          } else {
            return Promise.resolve();
          }
        }
      };
      const firstRules = reactive({
        yhzh: [{ required: true, trigger: 'blur', message: '请输入账号' }],
        zsxm: [{ required: true, trigger: 'blur', message: '请输入姓名' }],
        zhzt: [{ required: true, trigger: 'blur', message: '请选择账号状态' }],
        yhzhlx: [{ type: 'number', required: true, trigger: 'blur', message: '请输入账号类型' }],
        sjhm: [{ validator: phoneRule, trigger: 'blur' }],
        fbl: [{ required: true, trigger: 'blur', message: '请选择分辨率' }],
        jsmc: [{ required: true, trigger: 'blur', message: '请输入角色名称' }],
        tenantroleIdList: [{ type: 'array', required: true, trigger: 'blur', message: '请选择关联角色' }],
      });
      const secondRules = reactive({
        gis: [{ required: true, trigger: 'blur', message: '请输入GIS' }],
        xzqh: [{ required: true, trigger: 'blur', message: '请输入行政区划' }],
      });
      // 表单配置
      // 账号类型下拉框
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
      // 树
      const treeData = [
        {
          title: 'parent 1',
          key: '0-1',
        },
        {
          title: 'parent 2',
          key: '0-2',
        },
        {
          title: 'parent 3',
          key: '0-3',
        },
        {
          title: 'parent 4',
          key: '0-4',
        },
      ];
      const expandedKeys = ref([]);
      const checkedKeys = ref([]);
      // 监听
      watch(expandedKeys, () => {
        console.log('expandedKeys', expandedKeys);
      });
      watch(firstFormState.tenantroleIdList, (o: string[], n: string[]) => {
        console.log('checkedKeys', o, n);
      });
      // methods
      const handleOperate = () => {
        if (isNext.value) {
          secondFormRef.value
            .validate()
            .then(() => {
              console.log(firstFormState, secondFormState, '保存');
              secondFormRef.value.clearValidate();
            })
            .catch((err) => {
              console.log('error', err);
            });
        } else {
          firstFormRef.value.validate().then(() => {
            console.log(firstFormState, '下一步');
            firstFormRef.value.clearValidate();
            isNext.value = true;
          });
        }
      };
      const handleCancel = () => {
        if (isNext.value) {
          secondFormRef.value.clearValidate();
          isNext.value = false;
        } else {
          // firstFormRef.value.clearValidate();
          // firstFormRef.value.resetFields();
          router.push('account_manage');
        }
      };
      // 重置表单
      //  const resetForm = (name) => {
      //     formRef[name].value.resetFields();
      //    };
      // const errorInfos = computed(() => {
      //   return mergeValidateInfo(toArray(validateInfos));
      // });
      // 计算属性
      // 生命周期
      onMounted(() => {
        console.log(isNext.value, 'isnext');
      });
      return {
        treeData,
        labelCol,
        wrapperCol,
        expandedKeys,
        checkedKeys,
        bodyStyle,
        handleOperate,
        firstFormState,
        secondFormState,
        firstRules,
        secondRules,
        handleCancel,
        query,
        SelectOption,
        isNext,
        firstFormRef,
        secondFormRef,
      };
    },
  });
</script>
<style lang="less" scoped>
  .account-operate {
    height: 100%;

    .role-form-wraper {
      height: 100%;
      padding-right: 16px;
      overflow: auto;
      background: #fff;

      .role-card {
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
      }

      .role-operate-button {
        margin: 32px 0 0 32px;
      }
    }

    .role-title {
      padding: 16px 0 16px 32px;
      margin-bottom: 30px;
      font-size: 16px;
      line-height: 24px;
      color: #000;
      border-bottom: 1px solid #e9e9e9;
    }
  }
</style>
<style lang="less">
  .account-operate {
    .ant-tree li span.ant-tree-switcher.ant-tree-switcher-noop {
      display: none;
    }
  }
</style>
