<template>
  <div class="p-4 role-operate">
    <div class="role-form-wraper pb-8">
      <h2 class="role-title">基础信息</h2>
      <Form :label-col="labelCol" :wrapper-col="wrapperCol" ref="formRef" :rules="rules" :model="formState">
        <FormItem label="角色名称" name="jsmc">
          <Input v-model:value="formState.jsmc" />
        </FormItem>
        <FormItem label="描述" name="jsms">
          <Input v-model:value="formState.jsms" />
        </FormItem>
      </Form>
      <h2 class="role-title">权限设置</h2>
      <div class="role-card text-left pl-32px flex">
        <Card style="width: 300px; margin-right: 32px" :headStyle="headStyle" :bodyStyle="bodyStyle">
          <template #title>
            <span class="role-card-square"></span>
            <span class="role-card-title">菜单权限</span>
          </template>
          <Tree
            checkable
            :tree-data="treeData"
            v-model:expandedKeys="expandedKeys"
            v-model:selectedKeys="selectedKeys"
            v-model:checkedKeys="checkedKeys"
          />
        </Card>
        <Card style="width: 300px" :headStyle="headStyle" :bodyStyle="bodyStyle">
          <template #title>
            <span class="role-card-square"></span>
            <span class="role-card-title">App权限</span>
          </template>
          <Tree
            checkable
            :tree-data="treeData"
            v-model:expandedKeys="expandedKeys"
            v-model:selectedKeys="selectedKeys"
            v-model:checkedKeys="checkedKeys"
          />
        </Card>
      </div>
      <div class="role-operate-button">
        <Button type="primary" class="mr-8px" @click="handleOperate">保存</Button>
        <Button @click="$router.push('role_manage')">取消</Button>
      </div>
    </div>
  </div>
</template>
<script>
  import { Tree, Card, Button, Form, Input } from 'ant-design-vue';
  import { defineComponent, reactive, ref, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';

  export default defineComponent({
    name: 'RoleOperate',
    components: { Tree, Card, Button, Form, FormItem: Form.Item, Input },
    setup() {
      const router = useRouter();
      const route = useRoute();
      const query = ref(route.query.name);
      const formRef = ref();
      // 数据
      // 卡片配置
      const headStyle = reactive({
        paddingLeft: '12px',
      });
      const bodyStyle = reactive({
        paddingLeft: '12px',
      });
      // 表单配置
      const labelCol = reactive({
        require: true,
        flex: '100px',
      });
      const wrapperCol = reactive({
        require: true,
        flex: '328px',
      });
      const rules = reactive({
        jsmc: [{ required: true, trigger: 'blur', message: '请输入角色名称' }],
        jsms: [{ required: true, trigger: 'blur', message: '请输入角色描述' }],
      });
      // 表单字段
      const formState = reactive({
        jsmc: '',
        jsms: '',
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
              disabled: true,
              children: [
                { title: 'leaf', key: '0-0-0-0', disableCheckbox: true },
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
      const expandedKeys = ref(['0-0-0', '0-0-1']);
      const selectedKeys = ref(['0-0-0', '0-0-1']);
      const checkedKeys = ref(['0-0-0', '0-0-1']);
      // 监听
      // watch(expandedKeys, () => {
      //   console.log('expandedKeys', expandedKeys);
      // });
      // watch(selectedKeys, () => {
      //   console.log('selectedKeys', selectedKeys);
      // });
      // watch(checkedKeys, () => {
      //   console.log('checkedKeys', checkedKeys);
      // });
      // methods
      const handleOperate = () => {
        formRef.value
          .validate()
          .then(() => {
            console.log(formState, checkedKeys, '保存了');
            router.push('role_manage');
          })
          .catch((err) => {
            console.log('error', err);
          });
      };
      // const resetForm = () => {
      //   console.log('重置表单');
      //   router.push('role_manage');
      // };
      // 计算属性
      // 生命周期
      onMounted(() => {});
      return {
        headStyle,
        treeData,
        labelCol,
        wrapperCol,
        expandedKeys,
        selectedKeys,
        checkedKeys,
        bodyStyle,
        handleOperate,
        formState,
        rules,
        // resetForm,
        query,
        formRef,
      };
    },
  });
</script>
<style lang="less" scoped>
  .role-operate {
    height: 100%;

    .role-form-wraper {
      height: 100%;
      padding-right: 16px;
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
