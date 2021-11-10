
<template>
  <div class="user-page" :title="query.id ? '编辑用户' : '添加用户'">
    <el-form hide-required-asterisk	 :rules="rules" ref="form" :model="query" label-width="90px" fit>
      <el-form-item label="姓 名" prop="name">
        <el-input
          v-model="query.name"
          name="name"
          placeholder="输入姓名"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input
          v-model="query.phone"
          type="tel"
          name="phone"
          :disabled="!!data.id"
          placeholder="输入手机号"
        ></el-input>
      </el-form-item>
      <el-form-item label="用户角色" prop="role">
        <el-select v-model="query.role" placeholder="选择用户角色">
          <el-option
            :label="value"
            :value="key"
            v-for="(value, key) in roles"
            :key="key"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('dismiss')">取 消</el-button>
      <el-button type="primary" @click="save">保 存</el-button>
    </div>
  </div>
</template>
<script src="./user.ts" lang="ts"></script>
<style src="./user.scss" lang="scss" scoped></style>
