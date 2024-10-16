# Qualgo Assignment

See [assignment.md](./assignment.md) for the assignment details.

## How to run the project

Assuming you already have React Native development environment setup, follow the steps below to run the project.

Install the dependencies by running `yarn` at the root of the project.

### iOS

Run `yarn nx run mobile:pod-install` to install pods.

Run `yarn nx run mobile:run-ios` to build and run the iOS application.

### Android

Run `yarn nx run mobile:run-android` to build and run the Android application.

## Run tasks

To see all available targets to run for a project, run:

```sh
npx nx show project mobile
```

## Add new stuffs

To generate a new library, use:

```sh
npx nx g @nx/react:lib mylib
```
