import Api from "@/config/Axios";

export default {

  async getFacturas(url) {
    if (url == undefined) {
      return Api.get('invoices/list');
    } else {
      return Api.get(url);
    }
  },
  
  async sendFiles(IdFactura) {
    return Api.get(`invoices/pdf/${IdFactura}`);
  },

  async downloadFiles(IdFactura, filetype) {
    return Api.get(`invoices/download/${filetype}/${IdFactura}`);
  },

  async facturasProveedores( ) {
    return Api.get('proveedores/facturas/recibidas');
  }

}
