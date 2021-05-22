<template>
  <div class="bg-white m-4 mr-0 overflow-hidden">
    <BasicTree
      toolbar
      show-line
      :clickRowToExpand="false"
      :treeData="treeData"
      :replaceFields="{ key: 'id', title: 'deptName' }"
      @select="handleSelect"
    >
      <template #headerTitle>
        <span>数据字典分类</span>
      </template>
      <template #headerTools>
        <div>
          <Button class="mr-4" @click="handleCreate">
            <template #icon><PlusOutlined /></template>
            新 增
          </Button>
          <Button @click="handleEdit">
            <EditOutlined />
            编 辑
          </Button>
        </div>
      </template>
    </BasicTree>
  </div>
  <DictionarySortModal @register="registerModal" @success="handleSuccess" :isUpdate="isUpdate" />
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import { Button } from 'ant-design-vue';
  import { PlusOutlined, EditOutlined } from '@ant-design/icons-vue';
  import { BasicTree, TreeItem } from '/@/components/Tree';
  import { getDeptList } from '/@/services/system';
  import DictionarySortModal from './DictionarySortModal.vue';
  import { useModal } from '/@/components/Modal';

  export default defineComponent({
    name: 'DeptTree',
    components: { BasicTree, Button, PlusOutlined, EditOutlined, DictionarySortModal },
    emits: ['select'],
    setup(_, { emit }) {
      const isUpdate = ref(false);
      const [registerModal, { openModal }] = useModal();
      const treeData = ref<TreeItem[]>([]);
      async function fetch() {
        treeData.value = (await getDeptList()) as unknown as TreeItem[];
      }

      function handleSelect(keys: string, e) {
        emit('select', keys[0]);
        console.log(keys, e);
      }
      function handleCreate() {
        isUpdate.value = false;
        openModal(true);
        console.log('新增字典分类');
      }
      function handleEdit() {
        isUpdate.value = true;
        openModal(true);
        console.log('编辑字典分类');
      }
      onMounted(() => {
        fetch();
      });
      return {
        treeData,
        handleSelect,
        handleCreate,
        handleEdit,
        registerModal,
        isUpdate,
      };
    },
  });
</script>
