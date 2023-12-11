import React, { useEffect, useState } from 'react';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonRange,
  IonText,
  IonTitle,
  IonToggle,
  IonToolbar,
} from '@ionic/react';
import type { ToggleCustomEvent } from '@ionic/react';
import { personCircle, personCircleOutline, sunny, sunnyOutline } from 'ionicons/icons';

import './Setting.css';

export const Setting: React.FC = () => {
  const [themeToggle, setThemeToggle] = useState(false);

 
  const toggleChange = (ev: ToggleCustomEvent) => {
    const newThemeState = ev.detail.checked;
    setThemeToggle(newThemeState);
    toggleDarkTheme(newThemeState);
    localStorage.setItem('theme', newThemeState ? 'dark' : 'light');
  };

 
  const toggleDarkTheme = (shouldAdd: boolean) => {
    document.body.classList.toggle('dark', shouldAdd);
  };

 
  const initializeDarkTheme = () => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      const isDark = storedTheme === 'dark';
      setThemeToggle(isDark);
      toggleDarkTheme(isDark);
    }
  };

  useEffect(() => {
    
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    initializeDarkTheme();

    prefersDark.addEventListener('change', (mediaQuery) => initializeDarkTheme());

  }, []);
  return (
    <>
    <IonPage>
      <IonHeader class="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton default-href="#"></IonBackButton>
          </IonButtons>
          <IonTitle>Display</IonTitle>
          <IonButtons slot="end">
            <IonButton color="dark">
              <IonIcon slot="icon-only" ios={personCircleOutline} md={personCircle}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonListHeader>Appearance</IonListHeader>
        <IonList inset={true}>
          <IonItem>
            <IonToggle checked={themeToggle} onIonChange={toggleChange} justify="space-between">
              Dark Mode
            </IonToggle>
          </IonItem>
        </IonList>

        <IonList inset={true}>
          <IonItem button={true}>Text Size</IonItem>
          <IonItem>
            <IonToggle justify="space-between">Bold Text</IonToggle>
          </IonItem>
        </IonList>

        <IonListHeader>Brightness</IonListHeader>
        <IonList inset={true}>
          <IonItem>
            <IonRange value={40}>
              <IonIcon icon={sunnyOutline} slot="start"></IonIcon>
              <IonIcon icon={sunny} slot="end"></IonIcon>
            </IonRange>
          </IonItem>
          <IonItem>
            <IonToggle justify="space-between" checked>
              True Tone
            </IonToggle>
          </IonItem>
        </IonList>

        <IonList inset={true}>
          <IonItem button={true}>
            <IonLabel>Night Shift</IonLabel>
            <IonText slot="end" color="medium">
              9:00 PM to 8:00 AM
            </IonText>
          </IonItem>
        </IonList>
      </IonContent>
      </IonPage>
    </>
  );
}
