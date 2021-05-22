<template>
  <div class="bg-white m-4 mr-0 overflow-hidden">
    <BasicTree
      :toolbar="false"
      :search="false"
      :clickRowToExpand="false"
      :treeData="treeData"
      :replaceFields="{ key: 'id', title: 'deptName' }"
      @select="handleSelect"
    >
      <template #headerTitle>
        <span>行政区划</span>
      </template>
      <template #headerTools>
        <div>
          <Button style="width: 100%">
            <template #icon><PlusOutlined /></template>
            新增
          </Button>
        </div>
      </template>
    </BasicTree>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import { BasicTree, TreeItem } from '/@/components/Tree';
  import { Button } from 'ant-design-vue';
  import { PlusOutlined } from '@ant-design/icons-vue';
  import { getDeptList } from '/@/services/system';

  export default defineComponent({
    name: 'DeptTree',
    components: {
      BasicTree,
      Button,
      PlusOutlined,
    },
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

      return {
        treeData,
        handleSelect,
      };
    },
  });
</script>
