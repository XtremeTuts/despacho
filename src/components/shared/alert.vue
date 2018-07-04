<template>
    <v-alert :value="alert" :type="type" class="mt-0 text-xs-center" transition="scale-transition">
        {{ message }}
    </v-alert>
</template>

<script>
export default {
  props: ['message', 'typeAlert'],
  data () {
    return {
      alert: true
    }
  },
  computed: {
    type () {
      return this.typeAlert
    }
  },
  mounted () {
    setTimeout(() => {
      this.alert = false
    }, 3000)
    setTimeout(() => {
      this.$store.dispatch('clearError')
    }, 3150)
  }
}
</script>

