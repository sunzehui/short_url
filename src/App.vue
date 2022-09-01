<script setup lang="ts">
import { useClipboard } from "@vueuse/core";
import { useMessage } from "./composeabe/useMessage";
import { useServerApi } from "./composeabe/useServerApi";
import { MType } from "./types/message";
import { isValidUrl } from "./utils/tools";
import Loading from "./components/loading.vue";
import { themeChange } from "theme-change";
import { onMounted } from "vue";
import themeList from "@/config/daisyui-theme";

// 切换主题
onMounted(() => themeChange(false));

const longUrl = ref("");
const { showMessage } = useMessage();
const { execute, loading, response } = useServerApi<ShortResponse>(longUrl, {
  onSuccess(data) {
    if (data.status >= 200 && data.status <= 200) {
      showMessage(MType.SUCCESS, "created! 🎉");
    }
  },
  onError(error) {
    showMessage(MType.ERROR, error.message || "error! please retry! 😪");
  },
});

const panelShow = computed(() => !!unref(response));

const createShortUrl = () => {
  if (!isValidUrl(longUrl)) {
    showMessage(MType.ERROR, "please check your input url! 🤭");
    return;
  }
  execute();
};
const { isSupported, copy } = useClipboard();

const copyShortUrl = () => {
  const link = unref(response)?.link;
  if (!link) {
    showMessage(MType.ERROR, "please retry! 😪");
    return;
  }
  copy(link);
  showMessage(MType.SUCCESS, `🥳 copy successfully: ${link}`);
};
</script>

<template>
  <header class="box-border flex justify-end pt-4 pr-4">
    <select data-choose-theme>
      <option value="">Default</option>
      <template v-for="theme in themeList">
        <option :value="theme">{{ theme }}</option>
      </template>
    </select>
  </header>
  <div class="container flex items-center justify-center">
    <div class="flex flex-col -translate-y-12 wrapper">
      <div
        class="transition-all duration-300"
        :class="{ 'set-top': panelShow, 'set-center': !panelShow }"
      >
        <h2 class="mb-2 text-4xl">short url generator 🔗</h2>
        <div class="form-control">
          <div class="h-full input-group">
            <input
              type="text"
              placeholder="url like this http[s]//:baidu.com/ ..."
              class="w-[400px] input input-bordered"
              v-model="longUrl"
            />
            <button class="w-40 btn btn-square" @click="createShortUrl">
              Generate 🙏🏻
            </button>
          </div>
        </div>
      </div>
      <transition name="content">
        <div
          class="self-start w-full transition-transform duration-300 border mockup-window bg-base-300"
          v-show="panelShow"
        >
          <div class="flex flex-col w-full px-4 py-6 gap-y-2 bg-base-200">
            <section>
              <span>short url: </span>
              <a class="link" :href="response?.link">{{ response?.link }}</a>
            </section>
            <section>
              <span>origin url: </span>
              <a class="link" :href="response?.long_url">{{
                response?.long_url
              }}</a>
            </section>
            <section>
              <button
                v-if="isSupported"
                class="btn btn-info btn-sm"
                @click="copyShortUrl"
              >
                Copy Short Url
              </button>
              <a
                class="mt-2 ml-2 btn btn-success btn-sm"
                :href="response?.link ?? '#'"
                target="_blank"
              >
                Open Short Url
              </a>
            </section>
          </div>
        </div>
      </transition>
    </div>
  </div>
  <Loading :loading="loading" />
</template>

<style scoped>
.container {
  height: calc(100% - 58px);
  margin: 0 auto;
}
.set-top {
  @apply -translate-y-8;
}
.set-center {
  @apply translate-y-0;
}

.content-enter-from,
.content-leave-to {
  opacity: 0;
}
.content-enter-active {
  transition: opacity 0.3s ease-in;
}
.content-leave-active {
  transition: opacity 0.3s ease-out;
}
</style>
