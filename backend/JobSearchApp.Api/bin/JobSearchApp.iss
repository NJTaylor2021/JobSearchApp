#define MyAppName "Job Search App"
#define MyAppVersion "1.0.0"
#define MyAppExe "JobSearchApp.Api.exe"

[Setup]
AppId={{2DD7020E-F676-422B-AEF7-6CF85736AD27}}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
DefaultDirName={localappdata}\{#MyAppName}
DisableProgramGroupPage=yes
PrivilegesRequired=lowest
OutputDir=.
OutputBaseFilename=Setup
Compression=lzma2
SolidCompression=yes
WizardStyle=modern

[Files]
Source: "bin\Release\net9.0\win-x64\publish\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs

[Icons]
Name: "{autoprograms}\{#MyAppName}"; Filename: "{app}\{#MyAppExe}"
Name: "{autodesktop}\{#MyAppName}"; Filename: "{app}\{#MyAppExe}"

[Run]
Filename: "{app}\{#MyAppExe}"; Description: "Launch {#MyAppName}"; Flags: nowait postinstall skipifsilent