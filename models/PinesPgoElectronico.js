import Api  from "@/config/Axios";
 

export default {

      async buscarPin ( nro_pin ) {
        return Api.get('/pin', { params: { nro_pin } });
  },
  
  async buscarPedido(id_ped) {
     return Api.get('/pedido', { params: { id_ped } })
    },
 
   async buscarFactura(prfjo_rslcion, num_fact) {
     return Api.get('/factura', { params: { prfjo_rslcion, num_fact } })
    }
 
 
}
