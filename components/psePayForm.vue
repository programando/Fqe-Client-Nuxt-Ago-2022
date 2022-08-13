<template>
 
       <form name="psePayForm" action="https://gateway.payulatam.com/ppp-web-gateway" method="post" id="">

            <input type="hidden" name="description"         id="description"            value = "" />
            <input type="hidden" name="amount"              id="amount"                 value = "" />
            <input type="hidden" name="tax"                 id="tax"                    value = "0" />
            <input type="hidden" name="taxReturnBase"       id="taxReturnBase"          value = "0" />

            <input type="hidden" name="accountId"           id="accountId"      v-model="accountId"         >

            <input type="hidden" name="currency"            id="currency"               value = "COP">
            <input type="hidden" name="payerFullName"       id="payerFullName"             value = "">
            <input type="hidden" name="buyerEmail"          id="buyerEmail"             value = "">
            <input type="hidden" name="payerDocument"       id="payerDocument"          value = "">


           <input type="hidden" name="merchantId"           id="merchantId"         v-model="merchantId" />
           <input type="hidden" name="referenceCode"        id="referenceCode"       value = "" />
           <input type="hidden" name="signature"            id="signature"          value="">

        </form>
   
</template>
<script>
export default {
    data: ()=> ({
            accountId : process.env.ACCOUNT_ID,
            merchantId : process.env.MERCHANT_ID,
    }),

  
}
</script>