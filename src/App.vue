<template>
  <v-app>
    <v-navigation-drawer
      temporary
      v-model="drawer"
      enable-resize-watcher
      app
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      class="elevation-2 primary"
      dark
    >
      <v-toolbar-side-icon 
      @click.stop="drawer = !drawer"
      class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title >
        <img src="@/assets/logo_sepymes.png" alt="" width="125px">
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only" v-if="userIsLoggedIn">
        <v-btn flat to="/empresa/home">
          <v-icon left>home</v-icon>
          Inicio
        </v-btn>

        <v-menu open-on-hover botton offset-y>
          <v-btn slot="activator" flat>
            <v-icon left>library_books</v-icon>
            Libros de IVA</v-btn>
          <v-list class="primary">
            <v-list-tile v-for="(item, index) in itemsLibros" :key="index" class="white--text" :to="item.link">
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>

        <v-menu open-on-hover botton offset-y>
          <v-btn slot="activator" flat>
            <v-icon left>assignment</v-icon>
            Reportes</v-btn>
          <v-list class="primary">
            <v-list-tile v-for="(item, index) in itemsReportes" :key="index" class="white--text">
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>

        <v-btn flat @click="logOut">
          <v-icon left>exit_to_app</v-icon>
          Salir
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-progress-linear :indeterminate="loading" class="mt-0 mb-0" color="info"></v-progress-linear>
      <app-alert :message="error.message" v-if="error" :type-alert="error.type"></app-alert>
      <transition name="slide-fade" mode="out-in">
        <router-view/>
      </transition>
    </v-content>
    <v-footer height="auto" class="" v-if="userIsLoggedIn">
    <v-layout row wrap justify-center>
      <v-btn
        v-for="link in links"
        :key="link"
        color=""
        flat
      >
        {{ link }}
      </v-btn>
      <v-flex xs12 py-3 text-xs-center>
        &copy; {{ new Date().getFullYear() }} — <strong>SEDCOI S.A. de C.V.</strong>
      </v-flex>
    </v-layout>
  </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      drawer: false,
      alert: true,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire'
      }],
      itemsLibros: [
        {title: 'Contribuyentes', link: '/empresa/contribuyentes'},
        {title: 'Libro de Ventas', link: '/empresa/ventas'},
        {title: 'Ventas con Fact.', link: '/empresa/ventasFactura'},
        {title: 'Libro de Compras', link: '/empresa/libro_compras'}
      ],
      itemsReportes: [
        {title: 'Contribuyentes'},
        {title: 'Libro de Ventas'},
        {title: 'Libro de Compras'},
        {title: 'Declaración de IVA'},
        {title: 'Declaración de ISR Trimestral'},
        {title: 'Costos y gastos trimestrales'}
      ],
      links: ['Inicio', 'Condiciones de Uso', 'Política de Privacidad', 'SEDCOI.com']
    }
  },
  computed: {
    userIsLoggedIn () {
      if (this.$store.getters.user) {
        if (this.$store.getters.user.registered === 1) {
          return true
        }
      } else {
        return false
      }
    },
    loading () {
      return this.$store.getters.loading
    },
    error () {
      return this.$store.getters.error
    },
    userIsRegistered () {
      return this.$store.getters.user
    }
  },
  methods: {
    logOut () {
      this.$store.dispatch('logOut')
    }
  },
  watch: {
    userIsRegistered (value) {
      if (value) {
        if (value.registered !== 1) {
          this.$router.push('/user/signup')
        } else if (value.registered === 1) {
          this.$router.push('/empresa/home')
        }
      } else {
        this.$router.push('/')
      }
    }
  },
  name: 'App'
}
</script>

<style scoped>
  .slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to{
  transform: translateX(10px);
  opacity: 0;
}
</style>

