<script setup lang="ts">
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>
  <el-button>点击</el-button>
  <div class="card">
    <button type="button" @click="count++">
      count is {{ count }}
    </button>
    <p>
      Edit
      <code>src/components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://github.com/crxjs/create-crxjs" target="_blank">create-crxjs</a>, the official starter
  </p>

  <p class="read-the-docs">
    Click on the Vite, Vue and CRXJS logos to learn more
  </p>

  <!-- Tailwind CSS 居中效果 Demo -->
  <div class="mt-8 space-y-6">
    <!-- 方法1: flex 居中 -->
    <div class="flex h-48 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500">
      <div class="text-center text-white">
        <p class="text-2xl font-bold">Flex 居中</p>
        <p class="text-sm">水平垂直都居中</p>
      </div>
    </div>

    <!-- 方法2: grid 居中 -->
    <div class="grid h-48 place-items-center rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
      <div class="text-center text-white">
        <p class="text-2xl font-bold">Grid 居中</p>
        <p class="text-sm">使用 place-items-center</p>
      </div>
    </div>

    <!-- 方法3: absolute 居中 -->
    <div class="relative h-48 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500">
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="text-center text-white">
          <p class="text-2xl font-bold">Absolute 居中</p>
          <p class="text-sm">使用 inset-0 + flex</p>
        </div>
      </div>
    </div>

    <!-- 方法4: 文本居中 + padding -->
    <div class="rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 py-12 text-center text-white">
      <p class="text-2xl font-bold">Text 居中</p>
      <p class="text-sm">简单的文本水平居中</p>
    </div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
