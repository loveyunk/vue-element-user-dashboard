<template>
  <el-dialog
    :title="type === 'create' ? '创建用户' : '更新用户'"
    :visible.sync="dialogVisible"
    @close="reset"
  >
    <el-form ref="user" :model="user" :rules="rules" label-width="80px">
      <el-form-item label="名字" prop="name">
        <el-input v-model="user.name" />
      </el-form-item>
      <el-form-item label="昵称" prop="nickName">
        <el-input v-model="user.nickName" />
      </el-form-item>
      <el-form-item label="性别" prop="isMale">
        <el-radio-group v-model="user.isMale">
          <el-radio :label="true">男性</el-radio>
          <el-radio :label="false">女性</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input-number
          v-model="user.age"
          controls-position="right"
          :min="18"
          :max="100"
        />
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="user.phone" />
      </el-form-item>
      <el-form-item label="电子邮件" prop="email">
        <el-input v-model="user.email" />
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" :loading="loading" @click="handleOk"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      required: true
    },
    user: {
      type: Object,
      required: true
    }
  },

  data() {
    const validatePhone = (rule, value, callback) => {
      const regexp = /^1[34578]\d{9}$/;
      if (!regexp.test(value)) {
        callback(new Error('输入无效的手机!'));
      } else {
        callback();
      }
    };

    const validateEmail = (rule, value, callback) => {
      const regexp = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      if (!regexp.test(value)) {
        callback(new Error('输入的电子邮件无效!'));
      } else {
        callback();
      }
    };

    return {
      rules: {
        name: [{ required: true, trigger: 'blur' }],
        nickName: [{ required: true, trigger: 'blur' }],
        isMale: [{ required: true, trigger: 'blur' }],
        age: [{ required: true, trigger: 'blur' }],
        phone: [
          { required: true, trigger: 'blur' },
          { validator: validatePhone, trigger: 'blur' }
        ],
        email: [
          { required: true, trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' }
        ]
      }
    };
  },

  computed: {
    dialogVisible: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit('update:visible', val);
      }
    }
  },

  methods: {
    handleOk() {
      this.$refs.user.validate(valid => {
        if (valid) {
          this.$emit('on-ok', this.user, this.type);
        } else {
          return false;
        }
      });
    },

    reset() {
      this.$refs.user.resetFields();
    }
  }
};
</script>
