import { useContext } from 'react';
import { SettingsContext, SettingsContextType } from '../components/settings.provider';

export const useSettingsContext = () => useContext(SettingsContext) as SettingsContextType;
