<template>
    <div class="container">
      <h1 class="pb-1 text-2xl text-black">Facturas emitidas </h1>
  
      <table class="flex flex-row flex-no-wrap w-full my-1 overflow-hidden rounded-lg sm:bg-white sm:shadow-lg">
              <thead class="text-white">
                  <tr class="flex flex-col mb-2 bg-green-800 rounded-l-lg flex-no wrap sm:table-row sm:rounded-none sm:mb-0">
                      <th class="p-3 text-left">Fecha</th>
                      <th class="p-3 text-left">Factura</th>
                      <th class="p-3 text-left">Cliente</th>
                      <th class="p-3 text-left">Dian</th>
                      <th class="p-3 text-left" width="50px">Pdf</th>
                      <th class="p-3 text-left" width="50px">Xml</th> 
                      <th class="p-3 text-left" width="50px">Email</th> 
                  </tr>
              </thead>
              <tbody class="flex-1 sm:flex-none">
   
          <tr v-for="(Factura, index) in Facturas" :key="Factura.id_fact_elctrnca"
            class="flex flex-col mb-1 text-xs flex-no wrap sm:table-row sm:mb-0" >		
                      <td class="p-1 border border-grey-light hover:bg-gray-100">{{ Factura.fcha_dcmnto |FechaCorta}} </td>
                      <td class="p-1 truncate border border-grey-light hover:bg-gray-100">{{ Factura.prfjo_dcmnto }}{{ Factura.number}} </td>
                      <td class="p-1 truncate border border-grey-light hover:bg-gray-100">{{ Factura['customer']['name'] }} </td>
                      <td class="p-1 truncate border border-grey-light hover:bg-gray-100">
                  <div class="inline-flex items-center p-0 text-xs leading-none text-pink-600 bg-white rounded-full shadow">
                       <span v-if="Factura['is_valid']===1"
                          class="inline-flex items-center justify-center h-5 px-3 text-white bg-green-600 rounded-full">Recibida</span>
                       <span v-else
                           class="inline-flex items-center justify-center h-5 px-3 text-white bg-red-600 rounded-full">Pendiente</span>
                  </div>
            </td>
            
            <td  class="p-1 text-sm text-center border border-grey-light hover:bg-gray-100" > 
                <img v-if="Factura['is_valid'] === 1"
                      @click="downloadFiles($event, Factura.id_fact_elctrnca, index, 'pdf')"
                      class="w-6 cursor-pointer" src="/pdf.png"    /> 
            </td>
  
              <td  class="p-1 text-xl text-center border border-grey-light hover:bg-gray-100" > 
                <img v-if="Factura['is_valid'] === 1"
                      @click="downloadFiles($event, Factura.id_fact_elctrnca, index, 'xml')"
                      class="w-6 cursor-pointer" src="/xml.jpg"    /> 
              </td>

          <td  class="p-1 text-sm text-center border border-grey-light hover:bg-gray-100" > 
                <img v-if="Factura['is_valid'] === 1"
                      @click="SendEmail(Factura.id_fact_elctrnca)"
                      class="w-6 cursor-pointer" src="/email.png"    /> 
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
  import { address  }    from '@/config/address'
 
  export default {
    name: 'UltimasFacturasCreadas',
    layout :'admin-layout',
      data: () => ({
        Facturas    : [],
      }),
       
      
       created() {
            this.getFacturas();
       },
        
  
        methods:  {
                getFacturas (url  ) {
                      Facturas.getFacturas ( url  )
                      .then (response => {
                        this.Facturas      = response.data;
                      })
                }, 
  
                downloadFiles ( e,id_fact_elctrnca, index, filetype   ) { 
                  let Url       = address.apiUrl+`invoices/download/${filetype}/${id_fact_elctrnca}`;
                  window.open(Url, '_blank');
                },

            SendEmail(id_fact_elctrnca ) {
                         Facturas.sendFiles ( id_fact_elctrnca  )
                      .then (response => {
                         alert('Reenviando documentos por correo electrónico....')
                      })                   
              }
 
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
   .container {
    width: 97%;
    margin: auto;
   }
  </style>