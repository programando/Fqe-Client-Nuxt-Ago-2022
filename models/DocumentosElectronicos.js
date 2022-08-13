import Api  from "@/config/Axios";
 

export default {

        async BuscarFacturaPorUuid( UIID ) {
          return await Api.post('/invoices/search-document-by-uuid', {'uuid' : UIID } ) ;
      },
      
        async factProveedores030AcuseRecibo( UIID ) {
          return await Api.post('/proveedores/set/030/acuse', {'uuid' : UIID } ) ;
      },

      async factProveedores032ReciboBienServicio( UIID ) {
        return await Api.post('/proveedores/set/032/recibo-bien-servicio', {'uuid' : UIID } ) ;
      },

      async factProveedores033AceptacionExpresa( UIID ) {
        return await Api.post('/proveedores/set/033/aceptacion-expresa', {'uuid' : UIID } ) ;
      },
      async factProveedoresTodosLosEventos( UIID ) {
        return await Api.post('/proveedores/set/all', {'uuid' : UIID } ) ;
      },


 
}
