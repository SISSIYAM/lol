<template>
  <div class="formWap">
    <slot name="formPhone"></slot>
    <slot name="formPwd"></slot>
    <slot name="formCheck"></slot>
    <slot name="formOther"></slot>
  </div>
</template>

<script>
export default {
  name: 'formSuite',
};
</script>

<style scoped>

</style>
