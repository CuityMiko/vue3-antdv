<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <Form :label-col="labelCol" :wrapper-col="wrapperCol" ref="FormRef" :rules="Rules" :model="FormState">
      <FormItem label="字段名称" name="zdmc">
        <Input v-model:value="FormState.zdmc" placeholder="请输入" />
      </FormItem>
      <FormItem label="显示顺序" name="xssx">
        <Input v-model:value="FormState.xssx" placeholder="请输入" />
      </FormItem>
      <FormItem label="备注说明" name="mark">
        <Input v-model:value="FormState.mark" placeholder="请输入" />
      </FormItem>
      <FormItem label="图片上传" name="fileId">
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          list-type="picture-card"
          class="avatar-uploader"
          @preview="handlePreview"
          v-model:file-list="FormState.fileId"
        >
          <div v-if="fileList.length < 2">
            <PlusOutlined />
            <div class="ant-upload-text">Upload</div>
          </div>
        </Upload>
        <Modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
          <img alt="example" style="width: 100%" :src="previewImage" />
        </Modal>
      </FormItem>
    </Form>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref, reactive, watch } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  // import { getDeptList } from '/@/services/system';
  import { PlusOutlined } from '@ant-design/icons-vue';
  import { Form, Input, Upload, Modal, message } from 'ant-design-vue';

  // function getBase64(file) {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);

  //     reader.onload = () => resolve(reader.result);

  //     reader.onerror = (error) => reject(error);
  //   });
  // }
  function getBase64(img: Blob, callback: (base64Url: string) => void) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  }

  export default defineComponent({
    name: 'DictionaryDataModal',
    components: { BasicModal, Form, FormItem: Form.Item, Upload, Input, PlusOutlined, Modal },
    // props:['isUpdate'],
    props: {
      isUpdate: {
        type: Boolean,
        default: false,
      },
    },
    setup(props) {
      interface FormType {
        zdmc?: string;
        xssx?: number;
        mark?: string;
        fileId: string[];
      }
      const FormState: UnwrapRef<FormType> = reactive({
        zdmc: '',
        xssx: '',
        mark: '',
        fileId: [],
      });
      const [registerModal] = useModalInner();
      const getTitle = computed(() => (!unref(props.isUpdate) ? '新增字典数据' : '编辑字典数据'));

      const labelCol = reactive({
        flex: '100px',
      });
      const wrapperCol = reactive({
        flex: '328px',
      });
      const imgRule = async (_, value: string[]) => {
        // if (!value) {
        //   return Promise.reject(new Error('请输入手机号!'));
        // } else {
        if (value.length > 1) {
          return Promise.reject(new Error('只能上传一张图片'));
        } else {
          return Promise.resolve();
        }
        // }
      };
      const Rules = reactive({
        zdmc: [{ required: true, trigger: 'blur', message: '请输入字段名称' }],
        xssx: [{ required: true, trigger: 'blur', message: '请输入显示顺序' }],
        fileId: [{ type: 'array', validator: imgRule, trigger: 'change' }],
      });
      // 图片上传
      const previewVisible = ref(false);
      const previewImage = ref('');
      const fileList = ref([
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
      ]);
      // 监听
      watch(fileList, () => {
        FormState.fileId = fileList;
      });
      const handleCancel = () => {
        previewVisible.value = false;
      };

      const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }

        previewImage.value = file.url || file.preview;
        previewVisible.value = true;
      };
      const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

        if (!isJpgOrPng) {
          message.error('图片格式不正确!');
        }

        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isLt2M) {
          message.error('图片不能超过2MB!');
        }

        return isJpgOrPng && isLt2M;
      };
      const handleChange = ({ fileList: newFileList }) => {
        fileList.value = newFileList;
      };

      function handleSubmit() {
        //  try {
        console.log(FormState, 'biaodanshuju');
        // const values = await validate();
        // setModalProps({ confirmLoading: true });
        // TODO custom api
        // console.log(values);
        //  closeModal();
        //  emit('success');
        //  } finally {
        //  setModalProps({ confirmLoading: false });
        //  }
      }

      return {
        registerModal,
        getTitle,
        handleSubmit,
        FormState,
        labelCol,
        wrapperCol,
        Rules,
        previewVisible,
        previewImage,
        fileList,
        handleCancel,
        handlePreview,
        handleChange,
        beforeUpload,
      };
    },
  });
</script>
<style lang="less" scoped>
  .tip {
    display: flex;
    width: 363px;
    height: 84px;
    margin-left: 100px;
    background: #e6f7ff;
    border: 1px solid #91d5ff;
    border-radius: 2px;

    .icon-box {
      width: 40px;
      text-align: center;

      .icon {
        display: inline-block;
        width: 14px;
        height: 14px;
      }
    }

    .txt {
      font-size: 14px;
      line-height: 22px;
    }
  }

  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
</style>
