import Api  from "@/config/Axios";
import Csrf from "@/config/Csrf";

export default {
    async getCokie() {
      await Csrf.getCookie();
    },
  
    async register( formData ) {
          return Api.post("register", formData ) ;
      },

      async login ( formData ) {       
          return Api.post('login', formData);
      },

      async logout() {
        return Api.post('logout');
      },

      async auth(){
         return Api.get('user');
      },
      
      async userResetPassword(formData) {
        return Api.post('reset/password', formData);
      },
      async userUpdatePassword(formData) {
        return Api.post('update/password', formData);
      }
}
