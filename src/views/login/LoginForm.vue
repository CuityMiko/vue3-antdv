<template>
  <LoginFormTitle v-show="getShow" class="enter-x" />
  <Form class="p-4 enter-x" :model="formData" :rules="getFormRules" ref="formRef" v-show="getShow">
    <FormItem name="account" class="enter-x">
      <Input size="large" v-model:value="formData.account" placeholder="请输入账号..." />
    </FormItem>
    <FormItem name="password" class="enter-x">
      <InputPassword size="large" visibilityToggle v-model:value="formData.password" placeholder="请输入密码..." />
    </FormItem>

    <ARow class="enter-x">
      <ACol :span="12">
        <FormItem>
          <Checkbox v-model:checked="rememberMe" size="small"> 记住我 </Checkbox>
        </FormItem>
      </ACol>
      <ACol :span="12">
        <FormItem :style="{ 'text-align': 'right' }">
          <Button type="link" size="small" @click="setLoginState(LoginStateEnum.RESET_PASSWORD)"> 忘记密码？ </Button>
        </FormItem>
      </ACol>
    </ARow>

    <FormItem class="enter-x">
      <Button type="primary" size="large" block @click="handleLogin" :loading="loading"> 登 录 </Button>
    </FormItem>
  </Form>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref, toRaw, unref, computed } from 'vue';

  import { Checkbox, Form, Input, Row, Col, Button } from 'ant-design-vue';
  import LoginFormTitle from './LoginFormTitle.vue';
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
      Checkbox,
      Button,
      Form,
      FormItem: Form.Item,
      Input,
      LoginFormTitle,
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
