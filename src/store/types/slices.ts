export interface Notification {
    type: 'danger' | 'success' | 'info'
    message: string
}

export interface AppState {
    sidebarShowing: boolean
    notifications: Notification[]
}

export enum Role {
    admin = 'Administrador',
    seller = 'Vendedor',
    customer = 'Cliente',
}

export interface UserState {
    name: string
    lastName: string
    email: string
    role: Role
}
