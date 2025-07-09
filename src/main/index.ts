/* eslint-disable prettier/prettier */

import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { getNotes, readNote, writeNote, createNote, deleteNote } from './lib'
import { CreateNote, GetNotes, ReadNote, WriteNote, DeleteNote } from 'src/shared/types'

let mainWindow: BrowserWindow | null = null

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    center: true,
    title: "Notemark",
    frame: false,
    transparent: true,
    backgroundColor: '#00000000',
    titleBarStyle: 'hidden',
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: true,
      contextIsolation: true,
      backgroundThrottling: false,
      nodeIntegration: false
    },
    ...(process.platform === 'linux' ? { icon } : {}),
  })
  
  mainWindow.on('ready-to-show', () => {
    mainWindow?.show()
  })

  // Window control event handlers
  mainWindow.on('maximize', () => {
    mainWindow?.webContents.send('window-maximized')
  })

  mainWindow.on('unmaximize', () => {
    mainWindow?.webContents.send('window-unmaximized')
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')
  
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // Note-related IPC handlers
  ipcMain.handle('getNotes', (_, ...args: Parameters<GetNotes>)=> getNotes(...args))
  ipcMain.handle('readNote', (_, ...args: Parameters<ReadNote>)=> readNote(...args))
  ipcMain.handle('writeNote', (_, ...args: Parameters<WriteNote>)=> writeNote(...args))
  ipcMain.handle('createNote', (_, ...args: Parameters<CreateNote>)=> createNote(...args))
  ipcMain.handle('deleteNote', (_, ...args: Parameters<DeleteNote>)=> deleteNote(...args))

  // Window control IPC handlers
  ipcMain.handle('window-minimize', () => {
    mainWindow?.minimize()
  })

  ipcMain.handle('window-maximize', () => {
    mainWindow?.maximize()
  })

  ipcMain.handle('window-restore', () => {
    mainWindow?.restore()
  })

  ipcMain.handle('window-close', () => {
    mainWindow?.close()
  })

  ipcMain.handle('window-is-maximized', () => {
    return mainWindow?.isMaximized() || false
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})