<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm7 md5>
                <h2>Ingresa tus nuevos datos de ingreso</h2>
                <v-divider class="mb-2"></v-divider>       
                <v-form @submit.prevent="saveNewData">
                    <v-card class="elevation-3">
                        <v-card-text>
                            <v-text-field
                            name="newUser"
                            requireds
                            label="Nuevo Usuario"
                            autofocus
                            v-model="newUser">
                            </v-text-field>
                            <v-text-field
                            name="newPassword"
                            required
                            label="Nueva Contraseña"
                            type="password"
                            v-model="newPassword"
                            hint="Por lo menos 8 caracteres"
                            min="8">
                            </v-text-field>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn
                            :disabled="!isValid"
                            block 
                            class="primary" 
                            type="submit"
                            title="Guardar">
                                <v-icon left>save</v-icon>
                                Guardar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-form>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
export default {
  data () {
    return {
      newUser: '',
      newPassword: ''
    }
  },
  methods: {
    saveNewData () {
      this.$store.dispatch('saveNewData', {newUser: this.newUser, newPassword: this.newPassword})
    }
  },
  computed: {
    isValid () {
      return this.newUser.trim() !== '' && this.newPassword.trim() !== '' && this.newPassword.length >= 8
    }
  }
}
</script>
