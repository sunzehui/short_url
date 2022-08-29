<script lang="ts" setup>
const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
});
const status = ref(false);
let timeId: NodeJS.Timer | null = null;
watch(
  () => props.loading,
  (val) => {
    if (val) {
      timeId = setInterval(() => {
        status.value = !status.value;
        console.log(status.value);
      }, 1000);
    } else {
      if (timeId) clearInterval(timeId);
    }
  },
  { immediate: true }
);
onBeforeUnmount(() => {
  if (timeId) clearInterval(timeId);
});
</script>
<template>
  <label
    v-show="props.loading"
    class="fixed -translate-x-1/2 -translate-y-1/2 top-1/3 left-1/2 swap swap-flip text-9xl"
  >
    <input type="checkbox" hidden v-show="false" v-model="status" />
    <div class="swap-on">😈</div>
    <div class="swap-off">😇</div>
  </label>
</template>
