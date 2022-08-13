module.exports = {
  methods: {
      Message(Titulo, Message, icon) {
                this.$swal.fire({
                  title: Titulo,
                  text: Message,
                  icon: icon ,
                }) 
       },
    }, 


  }
