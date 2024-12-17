

import { ref } from 'vue';

interface ToastState {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  show: boolean;
}

export function useToast() {
  const toast = ref<ToastState>({
    message: '',
    type: 'info',
    show: false
  });

  const showToast = (message: string, type: ToastState['type'] = 'info') => {
    toast.value = {
      message,
      type,
      show: true
    };

    setTimeout(() => {
      toast.value.show = false;
    }, 3000);
  };

  return {
    toast,
    showToast
  };
}