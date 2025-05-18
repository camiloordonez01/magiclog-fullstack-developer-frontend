/**
 * Reemplaza los parámetros dinámicos en una ruta.
 * @param path Ruta con parámetros dinámicos (ej. "/productos/:id/editar")
 * @param params Objeto con los valores a reemplazar (ej. { id: 123 })
 * @returns Ruta con los valores reemplazados (ej. "/productos/123/editar")
 */
export function resolvePathParams(path: string, params: Record<string, string | number>): string {
    return Object.entries(params).reduce((resolvedPath, [key, value]) => {
        return resolvedPath.replace(`:${key}`, String(value))
    }, path)
}
