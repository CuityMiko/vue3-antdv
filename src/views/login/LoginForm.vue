<template>
  <div class="login-wrapper">
    <h1>登录</h1>
    <Form class="p-4 enter-x" :model="formData" :rules="getFormRules" ref="formRef" v-show="getShow">
      <h3>账号</h3>
      <FormItem name="account" class="enter-x" style="margin-bottom: 15px">
        <Input size="large" v-model:value="formData.account" placeholder="请输入账号..." />
      </FormItem>
      <h3>密码</h3>
      <FormItem name="password" class="enter-x" style="margin-bottom: 15px">
        <InputPassword size="large" visibilityToggle v-model:value="formData.password" placeholder="请输入密码..." />
      </FormItem>

      <ARow class="enter-x" style="margin-bottom: 15px" :justify="'space-between'">
        <ACol :span="15">
          <Input size="large" v-model:value="formData.code" placeholder="请输入验证码" />
        </ACol>
        <ACol :span="8">
          <img src="" alt="" />
        </ACol>
      </ARow>

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
  import { defineComponent, reactive, ref, toRaw, unref, computed } from 'vue';

  import { Form, Input, Row, Col, Button } from 'ant-design-vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { useUserStore } from '/@/store/modules/user';
  import { LoginStateEnum, useLoginState, useFormRules, useFormValid } from './useLogin';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { onKeyStroke } from '@vueuse/core';

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

      return {
        t,
        prefixCls,
        formRef,
        formData,
        getFormRules,
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
