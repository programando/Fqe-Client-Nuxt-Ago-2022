<template>
  <div class="mx-10 mt-4">

    <HeaderLogos></HeaderLogos>

    <div class="flex items-center justify-center mt-8 md:mt-14">
      <div class="px-10 py-4 border border-primary">
        <div
          class="pb-4 text-lg sm:text-xl lg:text-2xl text-primary "
        >
          <h1 class="text-center">Pago de Libre Registro.</h1>
        </div>
        <div class="grid mx-4 sm:grid-cols-2">
          <label class="flex justify-center md:justify-start md:ml-4 lg:text-lg">(*) Identificación :</label>
          <div class="flex justify-center">
            <input
              v-model="formUser.nro_identif"
              class="w-48 px-2 py-1 border rounded-lg focus:outline-none sm:w-56"
              type="text"
            />
          </div>
 
        </div>
        <div class="grid mx-4 mt-2 sm:grid-cols-2">
          <label class="flex justify-center md:justify-start md:ml-4 lg:text-lg">(*) Cliente : </label>
          <div class="flex justify-center">
            <input
              v-model="formUser.nom_full"
              class="w-48 px-2 py-1 border rounded-lg focus:outline-none sm:w-56"
              type="text"
            />
          </div>
 
        </div>
        <div class="grid mx-4 mt-2 sm:grid-cols-2">
          <label class="flex justify-center md:justify-start md:ml-4 lg:text-lg">(*) Email :</label>
          <div class="flex justify-center">
            <input
              v-model="formUser.email"
              class="w-48 px-2 py-1 border rounded-lg focus:outline-none sm:w-56"
              type="text"
            />
          </div>
 
        </div>
        <div class="grid mx-4 mt-2 sm:grid-cols-2">
          <label class="flex justify-center md:justify-start md:ml-4 lg:text-lg">(*) Vr. a pagar</label>
          <div class="flex justify-center">
            <input
               v-model="formUser.valor_pagar"
               v-on:keypress="numberFormat"
              class="w-48 px-2 py-1 text-right border rounded-lg focus:outline-none sm:w-56"
              type="text"
              id="valor"
            />
          </div>
 
        </div>
        

        <div class="flex justify-center mt-4">
          <ButtonCancel text="Cancelar" to="/" width="w-28"></ButtonCancel>
          <div class="ml-2">
            
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
  

export default {
  components: { InputDisable, ButtonCancel, FormPsePay },
  mixins: [Messages , formValid, PayuLatamSendForm],
  data: () => ({
        formUser : {
            nro_identif:'',
            nom_full:'',
            email:'',
            valor_pagar:'',
            referenceCode:'',
        },
  }),
    methods: {

          psePay() {
            let getErrors= this.dataValidation();
            if ( getErrors === true  ) {
              return ;
            }
            this.PayuLatamSendForm( this.formUser, 'LIBRE'+this.formUser.nro_identif, this.signatureMD5() );     // It's a mixin
          },

         signatureMD5( ) {
            let valorPIN = parseInt(this.formUser.valor_pagar.replace(/\./g, '') ) ;
            let signature = process.env.SIGNATURE + this.formUser.referenceCode +"~" + valorPIN+  "~COP"; 
            return md5( signature);         
          },

             dataValidation() {
               this.formUser.referenceCode = Math.floor(Math.random() * (100000 - 1000 + 1)) + 1000;
               console.log( this.formUser.referenceCode);
               this.formUser.nom_full = this.formUser.nom_full.replace(/[^a-zA-Z ]/g, " ")
               let getError = this.formValidate ( this.formUser, this.formUser.nro_identif);
              return getError;
         },
         
         numberFormat ( ) {
            var separador = document.getElementById('valor');

            separador.addEventListener('input', (e) => {
                var entrada = e.target.value.split(','),
                  parteEntera = entrada[0].replace(/\./g, ''),
                  parteDecimal = entrada[1],
                  salida = parteEntera.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
                  
                e.target.value = salida + (parteDecimal !== undefined ? ',' + parteDecimal : '');
            }, false);
         }
    },
 
};
</script>
