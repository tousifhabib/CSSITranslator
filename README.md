# Introduction
Hello there, this is the CSSI translation app. Currently this webapp supports 
English to French translation and vice versa (This functionality can be 
easily extended by changing a few lines of code as the app has access to
all supported languages of the google translate cloud API). Here are 
the instructions to run this app:

## Aquiring Google Cloud Platform Translation Authenticatiion Secrets JSON File
1. In order to run this web app, it is required to have a google service account
with access to the translation API service. 
2. Then the JSON containing the API secrets has to placed into 
the `CSSITranslatorApp` folder.
3. Then in the `Translators.cs` file, all instances of the project-id should
be set to your project id which can be acquired from google cloud platform

## Starting The App
1. Navigate to the folder that contains the `CCSITranslatorApp.csproj` file
2. Open the console at this location and run the following commands
3. ```
   dotnet restore
   ```
4. ```
   npm install
    ```
5. ```
    dotnet build
    ```
6.  ```
    dotnet run
    ```
7. In the browser go navigate to `https://localhost:7116`
8. The app should be started.