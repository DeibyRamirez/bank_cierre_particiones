import type { Request, Response } from 'express';
import { pool } from "../../database.js";

export const getHealth = async (req: Request, res: Response) => {
    try {

        // Ejecutamos una consulta ultra rápida para verificar la DB
        await pool.query('SELECT 1');

        res.status(200).json({
            status: "OK",
            database: "UP",
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        res.status(500).json({
            status: "ERROR",
            database: "DOWN",
            timestamp: new Date().toISOString(),
            detail: error instanceof Error ? error.message : 'Unknown error'
        });
    }

}