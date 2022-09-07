<template>
  <div class="m-4">
    <h1 class="pb-1 text-2xl text-black">Facturas de proveedor</h1>

    <table class="flex flex-row flex-no-wrap w-full my-1 overflow-hidden rounded-lg sm:bg-white sm:shadow-lg">
			<thead class="text-white">
				<tr class="flex flex-col mb-2 bg-primary rounded-l-lg flex-no wrap sm:table-row sm:rounded-none sm:mb-0">
					<th class="p-3 text-left" width="150px">Fecha</th>
					<th class="p-3 text-left" width="80px">Factura</th>
          <th class="p-3 text-left" width="80px">Proveedor</th>
					<th class="p-3 text-left" width="60px">Total</th>
					<th class="p-3 text-left" width="60px">Acuse</th>
					<th class="p-3 text-left" width="60px">Recibo</th>
					<th class="p-3 text-left" width="60px">Aceptación</th>
					<th class="p-3 text-left" width="60px">Rechazo</th>
					 
				</tr>

			</thead>
			<tbody class="flex-1 sm:flex-none">
 
        <tr v-for="(Factura) in Facturas" :key="Factura.idregistro"
          class="flex flex-col mb-1 text-xs flex-no wrap sm:table-row sm:mb-0" >		
					<td class="p-1 border border-grey-light hover:bg-gray-100">{{ Factura['fecha'] | FechaLarga }} </td>
					<td class="p-1 truncate border border-grey-light hover:bg-gray-100">{{ Factura['prefijo'] }}-{{ Factura['folio']}} </td>
					<td class="p-1 truncate border border-grey-light hover:bg-gray-100">{{ Factura['emisor'] }} </td>
          <td class="p-1 truncate border border-grey-light hover:bg-gray-100"> {{ Factura['total'] | NumeroEntero }}</td>

					<td class="p-1 truncate border border-grey-light hover:bg-gray-100">

                <button v-if="Factura['acuse_030']==false" class="inline-flex items-center p-0 text-xs leading-none text-pink-600 bg-white rounded-full shadow"
                    @click="acuseRecibo(Factura)" >       
                      <span class="inline-flex items-center justify-center h-5 py-3 px-3 text-white bg-green-600 rounded-full">Ok</span>  
                </button>
                
                <span v-else class="inline-flex items-center justify-center h-5 py-3 px-3 ">
                   <img  class="w-6 h-6 " src="/chulo.png" alt="" />
                </span> 
          </td>

					<td class="p-1 truncate border border-grey-light hover:bg-gray-100">
                <button v-if="Factura['recibo_032']==false" class="inline-flex items-center p-0 text-xs leading-none text-pink-600 bg-white rounded-full shadow"
                    @click="reciboBienServicio(Factura)" >          
                      <span class="inline-flex items-center justify-center h-5 py-3 px-3 text-white bg-green-600 rounded-full">Ok</span>  
                </button>
                <span v-else class="inline-flex items-center justify-center h-5 py-3 px-3 ">
                  <img  class="w-6 h-6 " src="/chulo.png" alt="" />
                </span> 
          </td>

					<td class="p-1 truncate border border-grey-light hover:bg-gray-100">
                <button v-if="Factura['aceptacion_033']==false" class="inline-flex items-center p-0 text-xs leading-none text-pink-600 bg-white rounded-full shadow" 
                        @click="acepacionExpresa(Factura )" >         
                      <span class="inline-flex items-center justify-center h-5 py-3 px-3 text-white bg-green-600 rounded-full">Ok</span>  
                </button>
                 <span v-else class="inline-flex items-center justify-center h-5 py-3 px-3 ">
                  <img  class="w-6 h-6 " src="/chulo.png" alt="" />
                 </span> 
          </td>


					<td class="p-1 truncate border border-grey-light hover:bg-gray-100">
                <button v-if="Factura['rechazo_031']==false" class="inline-flex items-center p-0 text-xs leading-none text-pink-600 bg-white rounded-full shadow"
                      >       
                      <span class="inline-flex items-center justify-center h-5 py-3 px-3 text-white bg-red-600 rounded-full">Ok</span>  
                </button>
                <span v-if="Factura['rechazo_031']==true" class="inline-flex items-center justify-center h-5 py-3 px-3 ">Ok</span> 
          </td>
	
				</tr>
        <tr>
 
        </tr>
 

			</tbody>
		</table>

  </div>
</template>


<script>

import Facturas        from "@/models/Facturas";
import Messages        from "@/mixins/sweetalert2";
import DocsElectronicos from "@/models/DocumentosElectronicos";


export default {
  name: 'UltimasFacturasCreadas',
  layout :'admin-layout',
    data: () => ({
      Facturas    : [],
 
    }),
  
    
     mounted() {
          this.getFacturas();
     },
      mixins: [Messages ], 

      methods:  {
              getFacturas (  ) {
                    Facturas.facturasProveedores (  )
                    .then (response => {
                      this.Facturas      = response.data;
                    })
                    .catch( error => {
                        //this.errors = error.response.data.error;                         
                    })
              }, 

            acuseRecibo(  Factura) {
              DocsElectronicos.factProveedores030AcuseRecibo( Factura['cufe'] ) 
              .then( () => {
                  Factura['acuse_030']=true;
                  this.Message("Evento 030" ,  'Acuse de recibo generado con éxito!' , 'success', 'Cerrar' ); 
              })
            },
            reciboBienServicio(  Factura) {
              DocsElectronicos.factProveedores032ReciboBienServicio( Factura['cufe'] ) 
              .then( () => {
                  Factura['recibo_032']=true;
                  this.Message("Evento 032" ,  'Recibo del bien o servicio generado con éxito!' , 'success', 'Cerrar' );     
              })
            },
            
            acepacionExpresa(  Factura) {
              DocsElectronicos.factProveedores033AceptacionExpresa( Factura['cufe'] ) 
              .then( () => {
                  Factura['aceptacion_033']=true;
                  this.Message("Evento 033" ,  'Aceptación expresa generada con éxito!' , 'success', 'Cerrar' );   
              })
            },

            acuseReciboAceptacion(  Factura) {
              DocsElectronicos.factProveedoresTodosLosEventos( Factura['cufe'] ) 
              .then( () => {
                  Factura['acuse_030']=true;
                  Factura['aceptacion_033']=true;
                  Factura['recibo_032']=true;
                  this.Message("Eventos" ,  '(030)Acuse, (032)recibo del bien o servcio y (033)aceptación expresa se han generado con éxito.' , 'success', 'Cerrar' );   
              })
            },

        },


    }  

 
</script>



<style scoped>


  @media (min-width: 640px) {
    table {
      display: inline-table !important;
    }

    thead tr:not(:first-child) {
      display: none;
    }
  }
  
  td:not(:last-child) {
    border-bottom: 0;
  }

  th:not(:last-child) {
    border-bottom: 5px solid rgba(0, 0, 0, .1);
  }
 
</style>
