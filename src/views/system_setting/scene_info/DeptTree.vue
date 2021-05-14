<template>
  <div class="bg-white m-4 mr-0 overflow-hidden">
    <BasicTree
      toolbar
      search
      :clickRowToExpand="false"
      :treeData="treeData"
      :replaceFields="{ key: 'id', title: 'deptName' }"
      @select="handleSelect"
    >
      <template #headerTitle>
        <span>部门列表</span>
      </template>
      <template #headerTools>
        <div>
          <Button class="mr-4">
            <template #icon><PlusOutlined /></template>
            新 增
          </Button>
          <Button>
            <EditOutlined />
            编 辑
          </Button>
        </div>
      </template>
    </BasicTree>
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import { Button } from 'ant-design-vue';
  import { PlusOutlined, EditOutlined } from '@ant-design/icons-vue';
  import { BasicTree, TreeItem } from '/@/components/Tree';
  import { getDeptList } from '/@/services/system';

  export default defineComponent({
    name: 'DeptTree',
    components: { BasicTree, Button, PlusOutlined, EditOutlined },

    emits: ['select'],
    setup(_, { emit }) {
      const treeData = ref<TreeItem[]>([]);

      async function fetch() {
        treeData.value = (await getDeptList()) as unknown as TreeItem[];
      }

      function handleSelect(keys: string, e) {
        emit('select', keys[0]);
        console.log(keys, e);
      }

      onMounted(() => {
        fetch();
      });
      return { treeData, handleSelect };
    },
  });
</script>
