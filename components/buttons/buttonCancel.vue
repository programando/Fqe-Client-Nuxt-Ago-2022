<template>
  <nuxt-link
    :to="to"
    class="px-2 py-1 border rounded-lg bg-primary text-white border-primary flex justify-center"
    :class="width"
  >
    {{ text }}</nuxt-link
  >
</template>

<script>
export default {
  name: "ButtonCancel",
  props: {
    text: String,
    to: String,
    width: String
  }
};
</script>

<style></style>
