<script lang="ts" setup>
import { MType } from "@/types/message";
let state = reactive({
  show: false,
  content: "加载中",
  type: MType.SUCCESS,
});

const setState = (newState: typeof state) => {
  state.show = newState.show;
  state.content = newState.content;
  state.type = newState.type;
  console.log(state.type);
};
defineExpose({
  setState,
});
</script>
<template>
  <transition name="message">
    <div
      v-show="state.show"
      class="fixed right-0 text-white translate-x-0 shadow-lg animated w-96 top-8 alert"
      :class="{ [`alert-${state.type}`]: true }"
    >
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="flex-shrink-0 w-6 h-6 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{{ state.content }}</span>
      </div>
    </div>
  </transition>
</template>

<style scoped lang="scss">
.message-enter-from,
.message-leave-to {
  opacity: 0;
}
.message-enter-active {
  transition: opacity 0.3s ease-in;
}
.message-leave-active {
  transition: opacity 0.3s ease-out;
}

.alert-error {
  @extend .alert-error;
}
.alert-success {
  @extend .alert-success;
}
</style>
