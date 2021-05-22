<template>
  <div class="login-wrapper" v-show="getShow">
    <h1>登录</h1>
    <Form class="p-4 enter-x" :model="formData" :rules="getFormRules" ref="formRef">
      <h3>账号</h3>
      <FormItem name="account" class="enter-x" style="margin-bottom: 15px">
        <Input size="large" v-model:value="formData.account" placeholder="请输入账号..." />
      </FormItem>
      <h3>密码</h3>
      <FormItem name="password" class="enter-x" style="margin-bottom: 15px">
        <InputPassword size="large" visibilityToggle v-model:value="formData.password" placeholder="请输入密码..." />
      </FormItem>

      <FormItem :rules="codeRules" class="enter-x" name="code">
        <Input
          size="large"
          style="width: 192px; margin-right: 8px"
          v-model:value="formData.code"
          placeholder="请输入验证码"
        />
        <Identify :identifyCode="identifyCode" @click="refreshCode" :contentWidth="104" />
      </FormItem>

      <FormItem class="enter-x" style="margin-bottom: 8px">
        <Button type="primary" size="large" block @click="handleLogin" :loading="loading"> 登 录 </Button>
      </FormItem>

      <ARow class="enter-x">
        <!-- <ACol :span="12">
          <FormItem>
            <Checkbox v-model:checked="rememberMe" size="small"> 记住我 </Checkbox>
          </FormItem>
        </ACol> -->
        <ACol :span="24">
          <FormItem :style="{ 'text-align': 'right', 'margin-bottom': '0px' }">
            <Button type="link" size="small" @click="setLoginState(LoginStateEnum.RESET_PASSWORD)"> 忘记密码？ </Button>
          </FormItem>
        </ACol>
      </ARow>
    </Form>
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref, toRaw, unref, computed, onMounted } from 'vue';

  import { Form, Input, Row, Col, Button } from 'ant-design-vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { useUserStore } from '/@/store/modules/user';
  import { LoginStateEnum, useLoginState, useFormRules, useFormValid } from './useLogin';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { onKeyStroke } from '@vueuse/core';

  import Identify from './Indetify.vue';

  export default defineComponent({
    name: 'LoginForm',
    components: {
      [Col.name]: Col,
      [Row.name]: Row,
      Button,
      Form,
      FormItem: Form.Item,
      Input,
      InputPassword: Input.Password,
      Identify,
    },
    setup() {
      const { t } = useI18n();
      const { notification } = useMessage();
      const { prefixCls } = useDesign('login');
      const userStore = useUserStore();

      const { setLoginState, getLoginState } = useLoginState();
      const { getFormRules } = useFormRules();

      const formRef = ref();
      const loading = ref(false);
      const rememberMe = ref(false);

      const formData = reactive({
        account: 'lyzh',
        password: '123456',
        code: '',
      });

      const codeRules = [
        {
          required: true,
          trigger: 'blur',
          validator: async (rule, value) => {
            // console.log(rule, value)
            if (!value) {
              return Promise.reject('请输入图形验证码');
            } else if (value !== identifyCode.value) {
              return Promise.reject('验证码输入错误');
            }
          },
        },
      ];

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

      const { validForm } = useFormValid(formRef);

      onKeyStroke('Enter', handleLogin);

      const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN);

      async function handleLogin() {
        const data = await validForm();
        if (!data) return;
        try {
          loading.value = true;
          const userInfo = await userStore.login(
            toRaw({
              password: data.password,
              username: data.account,
            })
          );
          if (userInfo) {
            notification.success({
              message: t('sys.login.loginSuccessTitle'),
              description: `${t('sys.login.loginSuccessDesc')}: ${userInfo.realName}`,
              duration: 3,
            });
          }
        } finally {
          loading.value = false;
        }
      }

      onMounted(() => {
        makeCode(identifyCodes, 4);
      });

      return {
        t,
        prefixCls,
        identifyCodes,
        identifyCode,
        refreshCode,
        formRef,
        formData,
        getFormRules,
        codeRules,
        rememberMe,
        handleLogin,
        loading,
        setLoginState,
        LoginStateEnum,
        getShow,
      };
    },
  });
</script>

<style lang="less" scoped>
  .login-wrapper {
    width: 364px;
    height: auto;
    padding: 32px 30px 13px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 4px;

    h1 {
      margin-bottom: 5.556vh;
      font-size: 2.963vh;
      line-height: 3.519vh;
      text-align: center;
    }
  }
</style>
