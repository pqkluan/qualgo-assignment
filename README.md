# Qualgo Assignment

See [assignment.md](./docs/assignment.md) for the assignment details.

## How to run the project

This monorepo is created and managed by Nx. To run the project, you need to have Nx installed globally.

```
npm add --global nx@latest
```

Assuming you already have React Native development environment setup, follow the steps below to run the project.

Install the dependencies by running `yarn` at the root of the project.

### iOS

Run `yarn nx run mobile:pod-install` to install pods.

Run `yarn nx run mobile:run-ios` to build and run the iOS application.

### Android

Run `yarn nx run mobile:run-android` to build and run the Android application.

## Test

### Unit Test

Run `yarn nx run mobile:test` to run the unit tests.
