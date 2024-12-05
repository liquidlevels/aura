Este es un proyecto de [Expo](https://expo.dev) creado con [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Cómo empezar

1. Asegúrate estar dentro de la carpeta frontend (aura/frontend)

2. Asegúrate de tener Node instalado.

    El proyecto se ha ejecutado correctamente utilizando [Node](https://nodejs.org/en) desde la versión 18.17.1 hasta la 22.12.0.

> [!TIP]
Para instalar y gestionar Node, se recomienda usar [nvm](https://github.com/nvm-sh/nvm).

3. Instala las dependencias

   ```bash
   npm install
   ```

4. Ejecuta la app

   ```bash
    npx expo start
   ```

En la salida del comando, encontrarás opciones para abrir la app en:

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), un entorno limitado para probar el desarrollo de apps con Expo.

>[!NOTE]
Para abrir el proyecto en Expo Go desde un dispositivo móvil, asegúrate de que la versión de Expo Go coincida con la versión del proyecto (Expo 52) y que ambos dispositivos estén en la misma red.

>[!NOTE]
>Aunque el único requisito es tener Node instalado, los entornos donde el proyecto se ha ejecutado correctamente son:
>- Fedora 40
>- Ubuntu 24.04, 22.04
>- Windows 10, 11
>- MacOS 15.1

>[!NOTE]
>En Windows puede ser que correr scripts no esté habilitado. En ese caso se puede abrir Powershell como administrador y correr
>
>[`Set-ExecutionPolicy -ExecutionPolicy Unrestricted`](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_execution_policies?view=powershell-7.4)
