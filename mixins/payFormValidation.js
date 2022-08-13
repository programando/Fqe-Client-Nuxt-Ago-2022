module.exports = {
  methods: {
      formValidate( form, keyField ) {
          let getError=false;
          if ( keyField.length == 0) {
                getError = true;
            }

            if ( form.nro_identif.length==0){
                getError = true;
            }
            if ( form.nom_full.length==0){
                getError = true;
            }   
            if ( form.email.length==0){
                getError = true;
            }    
            if ( form.valor_pagar.length==0){
                getError = true;            
          }
          if (getError == true) {
              this.$swal('Error!', 'Todos los datos de este formulario son obligatorios.', 'error');
          }
      return getError;
      
       },
    
        formatNumber(value) {
              let val = (value/1).toFixed(0).replace('.', ',')
              return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
          },

                   
    }, 


  }
