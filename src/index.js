const { app, BrowserWindow, Menu, Tray, nativeImage } = require('electron');
const path = require('path');
const nircmd = require('nircmd');

if (require('electron-squirrel-startup')) {
    app.quit();
}

let tray = null
app.whenReady().then(() => {
    // tray icon
    var iconPath = path.join(__dirname, '/assets/sound_settings_icon.png')
    let trayIcon = nativeImage.createFromPath(iconPath);
    tray = new Tray(trayIcon)

    const contextMenu = Menu.buildFromTemplate([
        { label: 'Sony AUX + Rode', click: () => switchAudioDevices("Headphones Sony AUX", "Microphone RODE NT-USB") },
        { label: 'Sony BT + Rode', click: () => switchAudioDevices("Headphones Sony BT", "Microphone RODE NT-USB") },
        { label: 'Soundbar + Rode', click: () => switchAudioDevices("Soundbar Samsung", "Microphone RODE NT-USB") },
        { label: 'Oculus Quest 2', click: () => switchAudioDevices("Headphones Oculus", "Microphone Oculus") },
        { label: 'Quit', click: app.quit }
    ])
    tray.setContextMenu(contextMenu)
    tray.on('right-click', function(event, bounds) {
        setTimeout(function() {
            tray.popUpContextMenu(contextMenu)
        }, 100)
    })
    tray.on('click', function(event, bounds) {
        tray.popUpContextMenu(contextMenu)
    })
})


function switchAudioDevices(speaker, mic) {
    nircmd(`nircmd setdefaultsounddevice "${speaker}" 1`);
    nircmd(`nircmd setdefaultsounddevice "${speaker}" 2`);

    nircmd(`nircmd setdefaultsounddevice "${mic}" 1`);
    nircmd(`nircmd setdefaultsounddevice "${mic}" 2`);
}