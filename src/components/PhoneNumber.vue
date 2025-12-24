<script setup lang="ts">
import { generateRandomPhoneNumber } from '../utils/generate'
import { useClipboard } from "@vueuse/core";

const { copy,copied } = useClipboard();
const genStr = ref(generateRandomPhoneNumber());

const onGenerateAndCopy = () => {
  genStr.value = generateRandomPhoneNumber();
  copy(genStr.value);
}
const onCopy = () => {
  copy(genStr.value);
}
</script>

<template>
  <el-card>
    <el-text >手机号码：</el-text>
    <div class="flex items-center">
      <el-input v-model="genStr"/>
      <el-button-group class="w-[320px] ml-[10px]">
        <el-button type="primary" @click="onGenerateAndCopy">生成并复制</el-button>
        <el-button @click="onCopy">复制</el-button>
      </el-button-group>
      <div class="w-[90px]">
        <span v-show="copied" class="ml-2 text-green-500">成功</span>
      </div>
    </div>
  </el-card>
</template>