<script setup lang="ts">
import { generateRandomIdentifyCode } from '../utils/generate'
import { useClipboard } from "@vueuse/core";

const { copy,copied } = useClipboard();
const genStr = ref(generateRandomIdentifyCode());

const genLength = ref<15|18>(18);
const onGenerateAndCopy = () => {
  genStr.value = generateRandomIdentifyCode(genLength.value);
  copy(genStr.value);
}
const onCopy = () => {
  copy(genStr.value);
}
</script>

<template>
  <el-card>
    <div class="flex items-center mb-2">
      <el-text>身份证号码：</el-text>
      <el-radio-group v-model="genLength">
        <el-radio :value="18">18位</el-radio>
        <el-radio :value="15">15位</el-radio>
      </el-radio-group>
    </div>
    
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