# Calendar App - React Native

Android-приложение календаря с поддержкой Material Design 3 и динамических цветов Monet.

## Технологический стек

- **React Native** - основной фреймворк
- **TypeScript** - типизация
- **React Native Paper v5+** - Material Design 3 компоненты
- **Zustand** - управление состоянием
- **React Navigation v6** - навигация
- **React Native Calendars** - компонент календаря
- **React Native Reanimated** - анимации
- **Material You (Monet)** - динамические цвета

## Возможности

- ✅ Создание, редактирование и удаление событий
- ✅ Календарный интерфейс с поддержкой месячного и дневного видов
- ✅ Material Design 3 интерфейс
- ✅ Поддержка светлой и темной тем
- ✅ Интеграция с динамическими цветами Android 12+ (Monet)
- ✅ TypeScript для типобезопасности
- ✅ Модульная архитектура

## Установка и запуск

```bash
# Установка зависимостей
npm install
# или
yarn install

# Для Android
npm run android
# или
yarn android

# Для iOS (если понадобится)
npm run ios
# или  
yarn ios
```

## Структура проекта

Проект организован по модульному принципу с разделением по функциональности:

- `src/features/events/` - модуль управления событиями
- `src/features/settings/` - модуль настроек
- `src/features/theme/` - модуль темизации и Monet
- `src/components/` - переиспользуемые компоненты
- `src/navigation/` - настройка навигации
- `src/store/` - центральный Zustand стор

## Архитектура

Приложение использует:
- **Zustand** для централизованного управления состоянием
- **React Native Paper** для реализации Material Design 3
- **React Navigation** для навигации между экранами
- **Модульную архитектуру** для лучшей организации кода