
<template>
  <div class="profile-page" title="修改密码" style="width: 330px">
    <el-form :rules="rules" ref="form" :model="query" label-width="1px" fit>
      <el-form-item prop="pwd">
        <el-input
          show-password
          v-model="query.pwd"
          name="pwd"
          placeholder="输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item prop="repwd">
        <el-input
          show-password
          v-model="query.repwd"
          name="repwd"
          placeholder="输入确认密码"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('dismiss')">取 消</el-button>
      <el-button
        type="primary"
        :disabled="query.pwd.length < 6 || query.pwd != query.repwd"
        @click="save"
        >修改密码</el-button
      >
    </div>
  </div>
</template>
<script src="./password.ts" lang="ts"></script>
