<template>
    <div class="font-robo">
        <div class="containter m-6 mt-5">
            <h3 class="   text-xl font-bold"> Facturas clientes - Gestión de eventos</h3>
            <div class="data-container border-spacing-1 border-2 max-h-80 mt-2" >
                <div class="overflow-auto rounded-lg shadow">
                    <table class="table">
			            <thead class="bg-gray-50 borderb-2 border-gray-200 ">
                            <tr class="">
                                <th clas=" table-titulos ">#</th>
                                <th clas=" table-titulos ">Fecha</th>
                                <th clas=" table-titulos ">Factura</th>
                                <th clas=" table-titulos ">Cliente</th>
                                <th clas=" table-titulos ">Acu.Recibo</th>
                                <th clas=" table-titulos ">Recibo bien</th>
                                <th clas=" table-titulos ">Acep. Expresa</th>
                                <th clas=" table-titulos ">Rechazo factura</th>
                            </tr>
                        </thead>
                            <tbody class="divide-y mt-24">
                                <tr v-for="( Factura) in Facturas " :key="Factura.id_fact_elctrnca" class="mt-4">
                                    <td class=" table-celdas-left"> {{ Factura.id_fact_elctrnca+1}}</td>
                                    <td class=" table-celdas-left"> {{ Factura.fcha_dcmnto |FechaCorta}}</td>
                                    <td class=" table-celdas-left"> {{ Factura.prfjo_dcmnto}} {{ Factura.nro_dcmnto}}</td>
                                    <td class=" table-celdas-left"> 
                                        
                                         {{ Factura['customer']['name'] }} <br>
                                        <span>{{ Factura['customer']['email']  }}</span> 
                                         
                                    </td>
                                    <td class=" table-celdas-center"> 
                                        <span v-if="Factura.response_code_030.length>0" class="span-ok ">{{Factura.response_code_030}}</span> 
                                        <span v-else> {{'---'}}</span>
                                    </td>

                                    <td class=" table-celdas-center"> 
                                        <span v-if="Factura.response_code_031.length>0" class="span-ok ">{{Factura.response_code_031}}</span> 
                                        <span v-else> {{'---'}}</span>
                                    </td>
                                    <td class=" table-celdas-center"> 
                                        <span v-if="Factura.response_code_032.length>0" class="span-ok ">{{Factura.response_code_032}}</span> 
                                        <span v-else> {{'---'}}</span>
                                    </td>
                                    <td class=" table-celdas-center"> 
                                        <span v-if="Factura.response_code_033.length>0" class="span-ok ">{{Factura.response_code_033}}</span> 
                                        <span v-else> {{'---'}}</span>
                                    </td>

                                </tr>

                            </tbody>
                       
                    </table>
                   
                </div>
            </div>
        </div>
    </div>
</template>

<script>
 
import Facturas        from "@/models/Facturas";

export default {
  name: 'StatusEventosFacturas',
    data: () => ({
      Facturas    : [],
     }),
 
     mounted() {
         this.getStatusEventos();
     },

     methods: {
       async  getStatusEventos () {
           let data = await  Facturas.StatusEventos() ;
           
            this.Facturas = data;
           //console.log(this.Facturas[0]['customer']['name']);
        }
     }
    }
    </script>