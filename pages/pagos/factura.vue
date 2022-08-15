<template>
  <div class="mx-10 mt-4">
  
  <HeaderLogos></HeaderLogos>
  
    <div class="flex items-center justify-center mt-8 md:mt-14">
      <div class="px-10 py-4 border border-primary">
        <div
          class="pb-4 text-lg sm:text-xl lg:text-2xl text-primary "
        >
          <h1 class="text-center">Pago con número de factura</h1>
        </div>
        <div class="grid mx-4 sm:grid-cols-2">
          <label class="flex justify-center lg:text-lg md:justify-start md:ml-4">Número de factura</label>
          <div class="flex justify-center">
            <input
              class="w-12 px-2 py-1 text-center border rounded-lg focus:outline-none sm:w-16 "
              type="text" v-model="prfjo_rslcion" 
            />
            <input
              class="px-2 py-1 text-right border rounded-lg w-36 focus:outline-none sm:w-40"
              type="text" v-model="num_fact" v-on:keyup.enter="buscarFactura"
            />
          </div>
        </div>
        
       <div class="mt-2">
          <InputDisable v-model="formUser.nro_identif" text="Identificación :" ></InputDisable>
        </div> 

          <div class="mt-2">
          <InputDisable text="Cliente :" v-model="formUser.nom_full"></InputDisable>
        </div>
        <div class="mt-2">
           <InputDisable text="Email :" v-model="formUser.email"></InputDisable>
        </div>
      
        <div class="mt-2 text-right">
          <InputDisable text="Vr. a pagar:" v-model="formUser.valor_pagar"></InputDisable>
        </div>    

        <div class="flex justify-center mt-4">
          <ButtonCancel text="Cancelar" to="/" width="w-28"></ButtonCancel>
          <div v-if="mostrarBuscar" class="ml-2">       
            <button class="px-2 py-1 text-white border rounded-lg w-28 bg-primary border-primary" @click.prevent="buscarFactura  ">
              Buscar
            </button>
          </div>
          <div v-else class="ml-2">       
            <button class="px-2 py-1 text-white border rounded-lg w-28 bg-primary border-primary" @click.prevent="psePay">
              Pagar
            </button>
          </div>
        </div>

      </div>
    </div>
        <FormPsePay></FormPsePay>
  </div>
</template>


<script>
  import ButtonCancel         from "@/components/buttons/buttonCancel";
  import FormPsePay           from   "@/components/psePayForm";
  import formValid            from "@/mixins/payFormValidation";
  import InputDisable         from "@/components/inputs/inputDisable";
  import md5                  from "md5";
  import Messages             from "@/mixins/sweetalert2";
  import PayuLatamSendForm    from "@/mixins/payuLatamForm";
  import PinesPgoElectronico  from "@/models/PinesPgoElectronico";

export default {
  components: { InputDisable, ButtonCancel,FormPsePay },
  mixins: [Messages, formValid, PayuLatamSendForm],
  data: ()=>  ({
     
        prfjo_rslcion :'',
        num_fact:'',
          formUser : {
              nro_identif:'',
              nom_full:'',
              email:'',
              valor_pagar:'',
              referenceCode:''
               
          },
        pinError: '',
        mostrarBuscar: true,
        
  }),

    methods: {
          buscarFactura() {
               this.pinError = '';
                if ( this.num_fact.length == 0 ) {
                   this.Message('Error!','Debe registrar un número de factura','error' );
                    return ;               
                }
               PinesPgoElectronico.buscarFactura ( this.prfjo_rslcion, this.num_fact)
              .then( response => {
                  if (!response.data || response.data.length == 0) {
                      this.Message('Error!','Número de factura no registrado','error' );
                  }
                  let Data = response.data[0];
                  this.formUser.nro_identif = Data.nro_identif;
                  this.formUser.nom_full    = Data.nom_full;
                  this.formUser.email       = Data.email;
                  this.formUser.valor_pagar = this.formatNumber( Data.valor_pagar);
                  this.formUser.referenceCode    = this.prfjo_rslcion+this.num_fact;
                  // alternar el valor de los botones
                  this.mostrarBuscar = false;
                   
              })  
          },
          
          psePay() {
            let getErrors= this.dataValidation();
            if ( getErrors === true  ) {
              return ;
            }
            this.PayuLatamSendForm( this.formUser, this.prfjo_rslcion+this.num_fact, this.signatureMD5() );     // It's a mixin    

          },
         signatureMD5( ) {
            let valorPIN = parseInt(this.formUser.valor_pagar.replace(/\./g, '') ) ;
            let signature = process.env.SIGNATURE + this.formUser.referenceCode +"~" + valorPIN+  "~COP"; 
            return md5( signature);         
          },

 
            formatNumber(value) {
              let val = (value/1).toFixed(0).replace('.', ',')
              return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
          },

             dataValidation() {
               this.formUser.nom_full = this.formUser.nom_full.replace(/[^a-zA-Z ]/g, " ")
               let getError = this.formValidate ( this.formUser, this.num_fact );
              return getError;
         },
         

    },
}
</script>