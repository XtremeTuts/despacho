<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md5>
            <v-form @submit.prevent="logUserIn">
              <v-card class="elevation-3">
                <v-card-text>                  
                    <v-text-field 
                    v-validate="'required'"
                    v-model="user" 
                    autofocus 
                    prepend-icon="person" 
                    name="user" 
                    label="Usuario" 
                    type="text">
                    </v-text-field>
                    <v-text-field 
                    v-validate="'required'"
                    v-model="password" 
                    id="password" 
                    prepend-icon="lock" 
                    name="password" 
                    label="Contraseña" 
                    type="password">
                    </v-text-field>  
                </v-card-text>
                <v-card-actions>
                  <v-btn 
                  color="primary" 
                  :disabled="!isValid" 
                  block 
                  type="submit">Login</v-btn>
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
      user: '',
      password: ''
    }
  },
  methods: {
    logUserIn () {
      this.$store.dispatch('userLogIn', {user: this.user, password: this.password})
    }
  },
  computed: {
    isValid () {
      return this.user.trim() !== '' && this.password.trim() !== ''
    }
  }
}
</script>

