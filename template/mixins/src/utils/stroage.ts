
// App
const sidebarStatusKey = 'sidebar_status'
export const getSidebarStatus = () => localStorage.getItem(sidebarStatusKey)
export const setSidebarStatus = (sidebarStatus: string) => localStorage.setItem(sidebarStatusKey, sidebarStatus)

const sizeKey = 'size'
export const getSize = () => localStorage.getItem(sizeKey)
export const setSize = (size: string) => localStorage.setItem(sizeKey, size)

// User
const tokenKey = 'Authorization'
export const getToken = () => localStorage.getItem(tokenKey)
export const setToken = (token: string) => localStorage.setItem(tokenKey, token)
export const removeToken = () => localStorage.removeItem(tokenKey)
