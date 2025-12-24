<script setup lang="ts">
import IdentifyNumber from "@/components/IdentifyNumber.vue";
import CompanyName from "@/components/CompanyName.vue";
import ChineseName from "@/components/ChineseName.vue";
import Address from "@/components/Address.vue";
import PhoneNumber from "@/components/PhoneNumber.vue";
import CreditCode from "@/components/CreditCode.vue";
import Email from "@/components/Email.vue";
</script>

<template>
  <div class="flex flex-col gap-2">
    <PhoneNumber />
    <IdentifyNumber />
    <CreditCode />
    <CompanyName />
    <ChineseName />
    <Address />
    <Email />
  </div>
</template>