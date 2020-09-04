import React, { useCallback, useContext, useState } from 'react';
import { v4 as uuid } from 'uuid';

import ToastContainer from '../components/ToastContainer';

interface ToastContextData {
  addToast: (message: ToastMessageParams) => void;
  removeToast: (id: string) => void;
}

export interface ToastMessage {
  id: string;
  type?: 'info' | 'success' | 'error';
  title: string;
  description?: string;
}

type ToastMessageParams = Omit<ToastMessage, 'id'>;

const ToastContext = React.createContext<ToastContextData>(
  {} as ToastContextData
);

export const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback(
    ({ type, title, description }: ToastMessageParams) => {
      const id = uuid();

      const toast = {
        id,
        type,
        title,
        description,
      };

      setMessages(prevMessages => [...prevMessages, toast]);
    },
    []
  );
  const removeToast = useCallback((id: string) => {
    setMessages(prevMessages =>
      prevMessages.filter(message => message.id !== id)
    );
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};

export function useToast(): ToastContextData {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
}
