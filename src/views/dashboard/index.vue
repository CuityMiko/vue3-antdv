<template>
  <div class="p-4">
    <div class="dashboard-container">
      <img src="../../assets/images/logo-2x.png" class="logo" />
      <div class="title-container">
        <div class="title">许村镇垃圾分类</div>
        <br />
        <div class="title">智慧管理平台</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'DashboardIndex',
  };
</script>
<style lang="less" scoped>
  .p-4 {
    height: 100%;
  }

  .dashboard-container {
    display: flex;
    height: 100%;
    background-image: url('/@/assets/images/login_bg.png');
    flex-direction: column;
    align-items: center;

    .logo {
      position: absolute;
      top: 118px;
      height: 140px;
    }

    .title-container {
      position: absolute;
      top: 277px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .title {
        font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
        font-size: 50px;
        font-weight: bold;
        line-height: 66px;
        letter-spacing: 9px;
        color: #fff;
      }
    }
  }
</style>
