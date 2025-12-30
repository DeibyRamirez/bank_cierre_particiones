import { config } from "dotenv";

// URL base de la API, usa variable de entorno o localhost por defecto
const API = process.env.API_BASE_URL || "http://localhost:3000"

/**
 * Cliente HTTP para comunicarse con la API
 */
export class ApiClient {

    /**
     * Realiza una solicitud GET
     * @template T - Tipo de dato esperado en la respuesta
     * @param path - Ruta del endpoint
     * @returns Promise con los datos deserializados
     */
    static async get<T>(path: string): Promise<T> {
        const response = await fetch(`${API}${path}`);
        if (!response.ok) {
            throw new Error(`GET ${path} fallo`);
        }
        return response.json();
    }

    /**
     * Realiza una solicitud POST
     * @template T - Tipo de dato esperado en la respuesta
     * @param path - Ruta del endpoint
     * @param body - Datos a enviar en el cuerpo de la solicitud
     * @returns Promise con los datos deserializados
     */
    static async post<T>(path: string, body: unknown): Promise<T> {
        const response = await fetch(`${API}${path}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error (`POST ${path} falló`);
        }
        return response.json();
    }

    /**
     * Realiza una solicitud PUT
     * @template T - Tipo de dato esperado en la respuesta
     * @param path - Ruta del endpoint
     * @param body - Datos a enviar en el cuerpo de la solicitud
     * @returns Promise con los datos deserializados
     */
    static async put<T>(path: string, body: unknown): Promise<T> {
        const response = await fetch(`${API}${path}`, {
           method: 'PUT',
           headers: {'Content-Type': 'application/json'},
           body: JSON.stringify(body), 
        });

        if (!response.ok) {
            throw new Error(`PUT ${path} falló`);
        }
        return response.json();
    }
}