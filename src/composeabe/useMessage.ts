import message from "@/components/message.vue";
import type { MType } from "@/types/message";
import { createApp } from "vue";

export function useMessage() {
  const messageComponent = createApp(message);
  const fragment = document.createDocumentFragment();
  const vm = messageComponent.mount(fragment as any);
  document.body.appendChild(fragment);

  let timeId: null | number = null;
  return {
    showMessage(type: MType, content: string, time = 2000) {
      if (timeId) clearTimeout(timeId);
      // @ts-ignore
      vm.setState({
        show: true,
        content,
        type,
      });
      // @ts-ignore
      timeId = setTimeout(() => vm.setState({ show: false }), time);
    },
  };
}
