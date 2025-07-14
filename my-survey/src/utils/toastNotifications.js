// my-survey/src/utils/toastNotifications.js
import { toast } from 'react-hot-toast';

export const showSuccess = (message) => {
  toast.success(message, {
    style: {
      background: '#D1FAE5',
      color: '#065F46',
      border: '1px solid #10B981',
    },
    iconTheme: {
      primary: '#10B981',
      secondary: '#ECFDF5',
    },
  });
};

export const showError = (message) => {
  toast.error(message, {
    style: {
      background: '#FEE2E2',
      color: '#991B1B',
      border: '1px solid #EF4444',
    },
    iconTheme: {
      primary: '#EF4444',
      secondary: '#FEF2F2',
    },
  });
};

export const showWarning = (message) => {
  toast(message, {
    icon: '⚠️',
    style: {
      background: '#FEF3C7',
      color: '#92400E',
      border: '1px solid #F59E0B',
    },
  });
};
