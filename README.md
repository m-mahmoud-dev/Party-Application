# Party Digital Platform Mobile App

Production-ready React Native (Expo) mobile application for the Party Digital Platform.

## Project Overview

This repository is now **mobile-only** and contains the React Native application under the `mobile/` directory. Legacy web implementation files were removed to keep the codebase focused, maintainable, and scalable.

The app is organized by feature layers:
- `screens` for route-level UI
- `components` for reusable UI building blocks
- `navigation` for route registration and flow
- `theme` for design tokens
- `types` for shared navigation contracts

## Tech Stack

- React 19
- React Native 0.79
- Expo SDK 53
- TypeScript
- React Navigation (native stack)
- React Native Gesture Handler
- React Native Safe Area Context
- Expo Vector Icons

## Folder Structure

```text
.
├── ATTRIBUTIONS.md
├── README.md
└── mobile/
  ├── App.tsx
  ├── app.json
  ├── babel.config.js
  ├── package.json
  ├── tsconfig.json
  └── src/
    ├── components/
    │   ├── AppButton.tsx
    │   ├── AppHeader.tsx
    │   ├── AppInput.tsx
    │   ├── BottomNavigation.tsx
    │   ├── BrandMarkCard.tsx
    │   └── StatusBadge.tsx
    ├── navigation/
    │   └── RootNavigator.tsx
    ├── screens/
    │   ├── DocumentsScreen.tsx
    │   ├── ElectoralScreen.tsx
    │   ├── HomeDashboardScreen.tsx
    │   ├── LoginScreen.tsx
    │   ├── MapScreen.tsx
    │   ├── NotificationsScreen.tsx
    │   ├── PaymentScreen.tsx
    │   ├── ProfileScreen.tsx
    │   ├── SettingsScreen.tsx
    │   └── SplashScreen.tsx
    ├── theme/
    │   ├── colors.ts
    │   ├── shadows.ts
    │   └── typography.ts
    └── types/
      └── screens.ts
```

## Architecture Approach

The app follows a **layered, screen-driven architecture**:

1. `App.tsx` initializes providers and navigation container.
2. `navigation/RootNavigator.tsx` defines route graph and screen registration.
3. `screens/*` implements page-level composition and user interactions.
4. `components/*` contains reusable presentation components used by screens.
5. `theme/*` centralizes style tokens for consistency.
6. `types/*` defines shared TypeScript contracts (e.g., route params).

This keeps responsibilities explicit and supports growth without changing runtime behavior.

## Navigation Structure

Navigation is implemented with `@react-navigation/native` + native stack:

- `Splash`
- `Login`
- `Home`
- `Profile`
- `Payments`
- `Documents`
- `Notifications`
- `Map`
- `Electoral`
- `Settings`

All routes are registered in `mobile/src/navigation/RootNavigator.tsx`, and route typing is defined in `mobile/src/types/screens.ts`.

## State Management

Current state management is intentionally lightweight:

- Local component state (`useState`) within screens/components
- Navigation state managed by React Navigation
- No global state library (Redux/Zustand/Recoil) at this stage

This is appropriate for the current scope and keeps complexity low.

## Environment Setup

### Prerequisites

- Node.js LTS (recommended: 18+)
- npm 9+
- Expo CLI (via `npx expo` or global install)
- Android Studio and/or Xcode (for emulator/simulator builds)

### Install

```bash
cd mobile
npm install
```

## How to Run the Project

From `mobile/`:

```bash
npm run start
```

Platform commands:

```bash
npm run android
npm run ios
```

Type checking:

```bash
npm run typecheck
```

## How to Add a New Screen

1. Create a new file in `mobile/src/screens`, e.g. `ExampleScreen.tsx`.
2. Add the route name and params in `mobile/src/types/screens.ts`.
3. Register the screen in `mobile/src/navigation/RootNavigator.tsx`.
4. Trigger navigation using `navigation.navigate('Example')` from existing screens.

Keep screen-level logic in the screen file and reusable UI in `components/`.

## Component Structure Guidelines

- `components/` holds reusable building blocks.
- Components should stay presentation-focused and receive data/actions through props.
- Screen-specific logic should remain in `screens/`.
- Shared styling should consume tokens from `theme/`.

## Dependency Explanation

Key runtime dependencies in `mobile/package.json`:

- `expo`, `react`, `react-native`: core platform and runtime
- `@react-navigation/native`, `@react-navigation/native-stack`: navigation flow
- `react-native-gesture-handler`, `react-native-screens`, `react-native-safe-area-context`: navigation and layout foundations
- `@expo/vector-icons`: iconography
- `expo-font`, `expo-asset`, `expo-linear-gradient`, `expo-status-bar`: UI/runtime support

Development dependency:

- `typescript`: static typing and compile-time safety

## Notes

- The repository has been cleaned to remove legacy web assets and duplicate code paths.
- Mobile runtime logic and screen behavior remain unchanged.
