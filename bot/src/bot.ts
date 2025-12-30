import { ApiClient } from "./client.js";

export async function iniciarBot() {
    
    console.log(' 🔍 Consultando particiones abiertas... ');

    const particiones = await ApiClient.get<any[]>('/particiones');

    for (const particion of particiones) {
        console.log(` ➡️ Procesando particion ${particion.id}`);


        // Iniciar cierre
        const cierre = await ApiClient.post<{ id: string }>('/cierres', {
            particion_id: particion.id,
            usuario_autorizador: 'BOT_AUTOMATICO',
            observacion: 'Cierre iniciado por bot',
        });

        console.log(' ✅ Cierre iniciado: ', cierre.id); 

       // Resultado del cierre
       
       await ApiClient.put(`/cierres/${cierre.id}/resultado`, {
        resultado: 'EXITOSO',
        observacion: 'Cierre automatico completado',
       });

       console.log(' 🔒 Cierre completado');
       }

    console.log('🤖 Bot finalizo ejecución');

}

