<template>
  <div class="wrapper" v-if="getShow">
    <div class="head"></div>
    <div class="form-box px-8">
      <div class="tit">
        <h1 class="enter-x" v-if="step == 1">找回密码</h1>
        <Steps class="enter-x" v-else :current="step - 2">
          <Step title="验证身份" />
          <Step title="重置密码" />
          <Step title="完成" />
        </Steps>
      </div>
      <div class="form-sec">
        <h3 v-if="step != 4" class="text-base mb-4">{{ titList[step - 1] }}</h3>
        <Form
          class="form enter-x"
          ref="formRef"
          :rules="rules"
          :model="formData"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 14 }"
        >
          <div class="enter-x" v-if="step == 1">
            <FormItem name="account" class="enter-x" label="账号名：">
              <Input size="large" v-model:value="formData.account" placeholder="请输入" />
            </FormItem>

            <FormItem name="code" class="enter-x" label="验证码：">
              <Input
                size="large"
                style="width: 294px"
                v-model:value="formData.code"
                :maxlength="4"
                placeholder="请输入"
              />
              <Identify :identifyCode="identifyCode" @click="refreshCode" :contentWidth="104" />
            </FormItem>
          </div>

          <div class="enter-x" v-if="step == 2">
            <FormItem name="mobile" class="enter-x" label="手机号码：">
              <Input size="large" v-model:value="formData.mobile" :maxlength="11" placeholder="请输入" />
            </FormItem>

            <FormItem name="sms" class="enter-x" label="验证码：">
              <CountdownInput
                size="large"
                :send-code-api="sendSms"
                v-model:value="formData.sms"
                :maxlength="6"
                placeholder="请输入"
              />
            </FormItem>
          </div>

          <div class="enter-x" v-if="step == 3">
            <FormItem name="pwd" class="enter-x" label="新的登陆密码：">
              <Input size="large" type="password" v-model:value="formData.pwd" :maxlength="18" placeholder="请输入" />
            </FormItem>

            <FormItem name="pwdConfirm" class="enter-x" label="确认新的登陆密码：">
              <Input
                size="large"
                type="password"
                v-model:value="formData.pwdConfirm"
                :maxlength="18"
                placeholder="请输入"
              />
            </FormItem>
          </div>

          <FormItem v-if="step !== 4" class="btn-item" :wrapper-col="{ span: 17 }">
            <Button class="mr-4" type="primary" @click="handleConfirm">确定</Button>
            <Button type="default" @click="handleCancel">取消</Button>
          </FormItem>
        </Form>

        <div v-if="step == 4" class="suc-sec enter-x mt-8">
          <img src="../../assets/images/icon-success@2x.png" alt="" />
          <h1 class="mb-0\.5">密码重置完成</h1>
          <p @click="handleSucBack">点击返回登录</p>
        </div>
      </div>
    </div>
    <!-- <Form class="form p-4 enter-x" :model="formData" :rules="getFormRules" ref="formRef">
      <FormItem name="account" class="enter-x">
        <Input size="large" v-model:value="formData.account" :placeholder="t('sys.login.userName')" />
      </FormItem>

      <FormItem name="mobile" class="enter-x">
        <Input size="large" v-model:value="formData.mobile" :placeholder="t('sys.login.mobile')" />
      </FormItem>
      <FormItem name="sms" class="enter-x">
        <CountdownInput size="large" v-model:value="formData.sms" :placeholder="t('sys.login.smsCode')" />
      </FormItem>

      <FormItem class="enter-x">
        <Button type="primary" size="large" block @click="handleReset" :loading="loading">
          {{ t('common.resetText') }}
        </Button>
        <Button size="large" block class="mt-4" @click="handleBackLogin">
          {{ t('sys.login.backSignIn') }}
        </Button>
      </FormItem>
    </Form> -->
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref, computed, unref, onMounted } from 'vue';

  import { Form, Input, Button, Steps } from 'ant-design-vue';
  import { CountdownInput } from '/@/components/CountDown';

  import { useI18n } from '/@/hooks/web/useI18n';
  import { useLoginState, useFormRules, LoginStateEnum } from './useLogin';
  import { RuleObject } from 'ant-design-vue/es/form/interface';
  import Identify from './Indetify.vue';

  export default defineComponent({
    name: 'ForgetPasswordForm',
    components: {
      Button,
      Form,
      FormItem: Form.Item,
      Input,
      CountdownInput,
      Steps,
      Step: Steps.Step,
      Identify,
    },
    setup() {
      const { t } = useI18n();
      const { handleBackLogin, getLoginState } = useLoginState();
      const { getFormRules } = useFormRules();

      const formRef = ref();
      const loading = ref(false);

      const step = ref(1);
      const titList = ref([
        '请输入您要找回密码的账户名',
        '手机验证码验证为确认你本人操作，请完成以下验证',
        '手机验证码验证为确认你本人操作，请完成以下验证',
      ]);

      const formData = reactive({
        account: '',
        code: '',
        mobile: '',
        sms: '',
        pwd: '',
        pwdConfirm: '',
      });

      const getShow = computed(() => unref(getLoginState) === LoginStateEnum.RESET_PASSWORD);

      async function handleReset() {
        const form = unref(formRef);
        if (!form) return;
        await form.resetFields();
      }

      const identifyCodes = ref('123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ');
      const identifyCode = ref('');

      const randomNum = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
      };

      const refreshCode = () => {
        identifyCode.value = '';
        makeCode(identifyCodes, 4);
      };

      const makeCode = (o, l) => {
        const oUnref = unref(o);
        if (!oUnref) return;
        for (let i = 0; i < l; i++) {
          identifyCode.value += oUnref[randomNum(0, oUnref.length)];
        }
        // 图形验证码
        console.log(identifyCode);
      };

      const rules = {
        account: [
          {
            required: true,
            trigger: 'blur',
            validator: async (rule: RuleObject, value: string) => {
              console.log(rule, value);
              if (!value) {
                return Promise.reject('请输入账户号');
              }
            },
          },
        ],
        code: [
          {
            required: true,
            trigger: 'blur',
            validator: async (rule: RuleObject, value: string) => {
              console.log(rule, value);
              if (!value || value.length !== 4) {
                return Promise.reject('请输入4位图形验证码');
              } else if (value !== identifyCode.value) {
                return Promise.reject('验证码输入错误');
              }
            },
          },
        ],
        mobile: [
          {
            required: true,
            pattern: '/^1[3456789]\d{9}$/',
            trigger: 'blur',
            validator: async (rule: RuleObject, value: string) => {
              if (!value) {
                return Promise.reject('请输入');
              }
            },
          },
        ],
        sms: [
          {
            required: true,
            trigger: 'blur',
            validator: async (rule: RuleObject, value: string) => {
              if (!value || value.length !== 6) {
                return Promise.reject('请输入6位短信验证码');
              }
            },
          },
        ],
        pwd: [
          {
            required: true,
            trigger: 'blur',
            validator: async (rule: RuleObject, value: string) => {
              if (!value) {
                return Promise.reject('请输入');
              } else {
                if (formData.pwdConfirm !== '') {
                  formRef.value.validateField('pwdConfirm');
                } else {
                  return Promise.resolve();
                }
              }
            },
          },
        ],
        pwdConfirm: [
          {
            required: true,
            trigger: 'blur',
            validator: async (rule: RuleObject, value: string) => {
              if (!value) {
                return Promise.reject('请输入');
              } else if (value !== formData.pwd) {
                return Promise.reject('两次输入密码不一致');
              }
            },
          },
        ],
      };

      async function handleConfirm() {
        console.log(formRef.value);
        formRef.value
          .validate()
          .then(() => {
            console.log('suc');
            // 清空上一步的表单信息
            formRef.value.resetFields();
            step.value++;
          })
          .catch((err) => {
            console.log('error: ', err);
          });
      }

      async function sendSms() {
        if (!formData.mobile) {
          formRef.value.validateField('mobile');
        } else {
          // 请求发送短信
          // suc TODO...
          return Promise.resolve(true);
        }
      }

      async function handleCancel() {
        if (step.value === 1) {
          handleBackLogin();
        } else {
          step.value--;
        }
      }

      async function handleSucBack() {
        step.value = 1;
        handleBackLogin();
      }

      onMounted(() => {
        makeCode(identifyCodes, 4);
      });

      return {
        t,
        formRef,
        formData,
        identifyCodes,
        identifyCode,
        refreshCode,
        rules,
        step,
        titList,
        handleConfirm,
        handleCancel,
        handleSucBack,
        getFormRules,
        handleReset,
        loading,
        handleBackLogin,
        getShow,
        sendSms,
      };
    },
  });
</script>

<style lang="less" scoped>
  .wrapper {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
    width: 100%;
    height: 100%;
    background: #f0f2f5ff;

    .head {
      width: 100%;
      height: 88px;
      background: #fff url('../../assets/images/Logo-lyzh@2x.png') 11.806% center / 160px 36px no-repeat;
    }

    .form-box {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 824px;
      height: 560px;
      margin-top: -280px;
      margin-left: -412px;
      background: #fff;
      border-radius: 10px;

      .tit {
        width: 100%;
        height: 164px;
        padding-top: 1px;

        h1 {
          font-size: 20px;
          font-weight: 500;
          line-height: 164px;
          color: #000000d9;
          text-align: center;
        }

        .ant-steps {
          margin-top: 66px;
        }
      }

      .form-sec {
        width: 100%;
        height: calc(100% - 164px);

        .form {
          padding: 2rem;
          border-top: 1px solid #e9e9e9ff;

          .btn-item {
            text-align: center;
          }
        }
      }

      .suc-sec {
        width: 100%;
        height: calc(100% - 164px);
        text-align: center;

        img {
          display: inline-block;
          width: 72px;
          height: 72px;
          margin-bottom: 24px;
        }

        h1 {
          font-size: 24px;
          font-weight: 500;
          line-height: 32px;
          color: #000000d9;
        }

        p {
          font-size: 14px;
          line-height: 22px;
          color: #1890ffff;
          cursor: pointer;
        }
      }
    }
  }
</style>
