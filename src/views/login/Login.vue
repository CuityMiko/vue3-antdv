<template>
  <div :class="prefixCls" class="relative w-full h-full px-4">
    <div class="container relative h-full mx-auto sm:px-10">
      <div class="flex h-full" style="position: relative">
        <div :class="`${prefixCls}-center`" class="h-full xl:h-auto py-5 xl:py-0 xl:my-0 w-full xl:w-7/12">
          <!-- <AppLogo :alwaysShowTitle="true" /> -->
          <div class="logo-sec mb-8">
            <div class="cen-logo">
              <img src="../../assets/images/logo-2x.png" />
            </div>
            <p>{{ tit1 }}</p>
            <p>{{ tit2 }}</p>
          </div>
          <div :class="`${prefixCls}-form flex justify-center`" class="">
            <LoginForm />
          </div>
          <div class="copyright mt-8"
            >技术支持：浙江联运知慧科技有限公司 地址：浙江省杭州市余杭经济开发区五洲路98号</div
          >
        </div>
      </div>
    </div>
    <ForgetPasswordForm />
  </div>
</template>
<script lang="ts">
  import { defineComponent, computed, onMounted } from 'vue';

  import LoginForm from './LoginForm.vue';
  import ForgetPasswordForm from './ForgetPasswordForm.vue';

  import { useGlobSetting } from '/@/hooks/setting';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useLocaleStore } from '/@/store/modules/locale';
  import { getIndexRPro } from '/@/services/system';

  export default defineComponent({
    name: 'Login',
    components: {
      LoginForm,
      ForgetPasswordForm,
    },
    setup() {
      const globSetting = useGlobSetting();
      const { prefixCls } = useDesign('login');
      const { t } = useI18n();
      const localeStore = useLocaleStore();

      const exampleRequest = () => {
        getIndexRPro().then((res) => {
          console.log(res);
        });
      };

      onMounted(() => {
        exampleRequest();
      });

      return {
        t,
        prefixCls,
        title: computed(() => globSetting?.title ?? ''),
        tit1: computed(() => globSetting?.title.slice(0, 7) ?? ''),
        tit2: computed(() => globSetting?.title.slice(7) ?? ''),
        showLocale: localeStore.getShowPicker,
      };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-login';
  @logo-prefix-cls: ~'@{namespace}-app-logo';
  @countdown-prefix-cls: ~'@{namespace}-countdown-input';
  @dark-bg: #293146;

  html[data-theme='dark'] {
    .@{prefix-cls} {
      background-color: @dark-bg;

      &::before {
        background-image: url(/@/assets/svg/login-bg-dark.svg);
      }

      .ant-input,
      .ant-input-password {
        background-color: #232a3b;
      }

      .ant-btn:not(.ant-btn-link):not(.ant-btn-primary) {
        border: 1px solid #4a5569;
      }

      &-form {
        background: transparent !important;
      }

      .app-iconify {
        color: #fff;
      }
    }
  }

  .@{prefix-cls} {
    padding-top: 10.185vh;
    overflow: hidden;
    background: url('/@/assets/images/login-bg.png');
    @media (max-width: @screen-xl) {
      // background-color: #293146;

      .@{prefix-cls}-form {
        background-color: #fff;
      }
    }

    .logo-sec {
      width: 100%;
      height: auto;

      .cen-logo {
        width: 100%;
        height: 12.963vh;
        margin-bottom: 1.852vh;
        text-align: center;

        img {
          display: inline-block;
          width: 12.963vh;
        }
      }

      p {
        width: 100%;
        margin-bottom: 0;
        font-size: 4.629vh;
        font-weight: 600;
        line-height: 6.111vh;
        letter-spacing: 0.2em;
        color: #fff;
        text-align: center;
      }
    }

    // .@{prefix-cls}-form {
    //   justify-content: center;
    // }

    &-center {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }

    .copyright {
      width: 100%;
      font-size: 16px;
      line-height: 22px;
      color: #fff;
      text-align: center;
    }

    .@{logo-prefix-cls} {
      top: 12px;

      &__title {
        font-size: 16px;
        color: #fff;
      }

      img {
        width: 32px;
      }
    }

    .container {
      .@{logo-prefix-cls} {
        width: 100%;
        height: auto;

        &__title {
          color: #fff;
        }
      }
    }

    &-sign-in-way {
      .anticon {
        font-size: 22px;
        color: #888;
        cursor: pointer;

        &:hover {
          color: @primary-color;
        }
      }
    }

    input:not([type='checkbox']) {
      width: 100%;
    }

    .@{countdown-prefix-cls} input {
      min-width: unset;
    }

    .ant-divider-inner-text {
      font-size: 12px;
      color: @text-color-secondary;
    }
  }
</style>
