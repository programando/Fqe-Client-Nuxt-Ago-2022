<template>
  <div class="grid mx-4 sm:grid-cols-2">
    <label class="flex justify-center md:justify-start md:ml-4 lg:text-lg">{{ text }}</label>
    <div class="flex justify-center">
      <input 
        v-model="localValue"
      class="w-48 px-2 py-1 border rounded-lg sm:w-56" type="text" disabled>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputDisabled',
  props: {
    value: {
      required: true
    },
    text: String,
  },
  data () {
    return {
      localValue: this.value,
    }
  },
  watch: {
     localValue (newValue) {
       this.$emit('input', newValue)
     },
     value (newValue) {
       this.localValue = newValue
     }
  }
}
</script>