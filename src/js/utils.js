import { Capacitor } from '@capacitor/core';

const platform = Capacitor.getPlatform();
export const isApp = navigator.standalone || platform === 'ios';