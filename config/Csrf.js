import Api      from "@/config/Axios";
 

 
export default {
    getCookie () {
       return  Api.get('sanctum/csrf-cookie')
    }
}
