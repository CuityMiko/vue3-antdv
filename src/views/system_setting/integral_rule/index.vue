<template>
  <div class="wrapper p-4">
    <div class="filter-sec">
      <Form ref="formRef" :model="integralData" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
        <p class="rule-title">分类质量对应积分</p>
        <Divider />
        <FormItem ref="good" required label="优秀" name="good">
          <InputNumber
            class="numinput"
            v-model:value="integralData.good"
            :min="-10"
            :max="10"
            :disabled="!isEdit"
            placeholder="请输入分值"
          />
        </FormItem>
        <FormItem required label="一般" name="general">
          <InputNumber
            class="numinput"
            v-model:value="integralData.general"
            :min="-10"
            :max="10"
            :disabled="!isEdit"
            placeholder="请输入分值"
          />
        </FormItem>
        <FormItem required label="差" name="poor" class="lastinput">
          <InputNumber
            class="numinput"
            v-model:value="integralData.poor"
            :min="-10"
            :max="10"
            :disabled="!isEdit"
            placeholder="请输入分值"
          />
        </FormItem>
        <p class="rule-title">积分限额</p>
        <Divider />
        <FormItem label="日积分限额">
          <InputNumber
            class="numinput"
            v-model:value="integralData.daypoint"
            :min="1"
            :disabled="!isEdit"
            placeholder="请输入分值"
          />
        </FormItem>
        <FormItem label="月积分限额">
          <InputNumber
            class="numinput"
            v-model:value="integralData.monthpoint"
            :min="1"
            :disabled="!isEdit"
            placeholder="请输入分值"
          />
        </FormItem>
        <FormItem label="年积分限额">
          <InputNumber
            class="numinput"
            v-model:value="integralData.yearpoint"
            :min="1"
            :disabled="!isEdit"
            placeholder="请输入分值"
          />
        </FormItem>
        <FormItem :wrapper-col="{ span: 14, offset: 2 }">
          <Button v-show="isEdit" type="primary" @click="onSave">保存</Button>
          <Button v-show="!isEdit" type="primary" @click="onEdit">编辑</Button>
        </FormItem>
      </Form>
      <BasicModal class="message-tip" v-model:visible="visible" :title="massage" @ok="handleModelOk">
        <p
          ><ExclamationCircleOutlined
            twoToneColor="#FAAD14"
          />保存后，系统将按此规则为用户赋予积分,不影响历史积分数据。</p
        >
        <p>确认保存吗?</p>
      </BasicModal>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, reactive, onMounted, UnwrapRef } from 'vue';
  import { Form, Button, InputNumber, Divider, Modal } from 'ant-design-vue';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
  // import { getIntegralRule } from '/@/services/system';
  interface IntegralData {
    good: Number;
    general: Number;
    poor: Number;
  }
  export default defineComponent({
    name: 'IntegralRule',
    components: {
      Form,
      Button,
      FormItem: Form.Item,
      InputNumber,
      Divider,
      BasicModal: Modal,
      ExclamationCircleOutlined,
    },
    setup() {
      const formRef = ref();
      const integralData: UnwrapRef<IntegralData> = reactive({
        good: undefined,
        general: undefined,
        poor: undefined,
        daypoint: undefined,
        monthpoint: undefined,
        yearpoint: undefined,
      });
      const rules = {
        good: [{ type: 'number', required: true, message: '请输入分值', trigger: 'blur' }],
        general: [{ type: 'number', required: true, message: '请输入分值', trigger: 'blur' }],
        poor: [{ type: 'number', required: true, message: '请输入分值', trigger: 'blur' }],
      };
      const massage = ref('提示');
      const visible = ref<boolean>(false);
      const isEdit = ref<boolean>(true);

      onMounted(() => {
        console.log('this is onMounted func');
        // 查询积分规则
        // getIntegralRule().then((res) => {
        //   console.log(res);
        //   integralData = res.data;
        // });
      });

      const handleModelOk = () => {
        console.log('handleModelOk');
        formRef.value
          .validate()
          .then(() => {
            // 修改保存积分规则
            isEdit.value = false;
          })
          .catch((error: ValidateErrorEntity<IntegralData>) => {
            console.log('error', error);
          });
        visible.value = false;
      };

      const onSave = () => {
        console.log('submit!', integralData);
        visible.value = true;
      };

      const onEdit = () => {
        console.log('edit!');
        isEdit.value = true;
      };

      return {
        formRef,
        massage,
        integralData,
        labelCol: { span: 2 },
        wrapperCol: { span: 14 },
        rules,
        onSave,
        onEdit,
        visible,
        isEdit,
        handleModelOk,
      };
    },
  });
</script>
<style lang="less" scoped>
  .wrapper {
    .filter-sec {
      width: 100%;
      height: auto;
      padding: 24px 0;
      background: #fff;
      border-radius: 2px;

      .rule-title {
        height: 24px;
        padding: 0 32px;
        font-size: 16px;
        font-weight: bold;
      }

      .numinput {
        width: 328px;
        border-color: #d9d9d9;
      }

      .lastinput {
        margin-bottom: 36px;
      }
    }
  }
</style>

<style>
  .message-tip {
    p {
      margin: 12px 24px;
    }
  }
</style>
