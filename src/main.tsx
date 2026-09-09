import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { AudienceProvider } from './context/AudienceContext.tsx';
import './index.css';

// Prevent browser translation tools (Google Translate, Yandex Translate) from crashing React DOM reconciliation
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    if (!event || event.message === 'Script error.' || !event.message || (event.filename && event.filename.includes('translate.google'))) {
      event.stopImmediatePropagation();
      event.preventDefault();
      return true;
    }
  }, true);

  window.addEventListener('unhandledrejection', (event) => {
    if (event && event.reason) {
      const msg = String(event.reason?.message || event.reason);
      if (msg.includes('Script error')) {
        event.preventDefault();
      }
    }
  });

  if (typeof Node === 'function' && Node.prototype) {
    const originalRemoveChild = Node.prototype.removeChild;
    Node.prototype.removeChild = function <T extends Node>(child: T): T {
      if (child.parentNode !== this) {
        return child;
      }
      return originalRemoveChild.call(this, child) as T;
    };

    const originalInsertBefore = Node.prototype.insertBefore;
    Node.prototype.insertBefore = function <T extends Node>(newNode: T, referenceNode: Node | null): T {
      if (referenceNode && referenceNode.parentNode !== this) {
        return newNode;
      }
      return originalInsertBefore.call(this, newNode, referenceNode) as T;
    };
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AudienceProvider>
      <App />
    </AudienceProvider>
  </StrictMode>,
);

