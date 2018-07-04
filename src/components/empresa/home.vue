<template>
    <v-container>
        <v-layout row class="mb-4">
            <v-flex xs12>
                <h2>Bienvenido/a, comencemos a hacer cosas geniales con tus libros de I.V.A.</h2>
                <v-divider></v-divider>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12>
                <h3>Inicio Rápido</h3>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs12 sm6 md4 v-for="(item, index) in quickAccessItems" :key="index" class="pa-1">
                <v-card class="elevation-3" hover @click.native="goTo(item.link)">
                    <v-card-media :src="'/static/libros/' + item.image" height="200px">
                    </v-card-media>
                    <v-card-title primary-title>
                        <div>
                            <h3 class="headline mb-0">{{ item.title }}</h3>
                            <div>{{ item.description }}</div>
                        </div>
                    </v-card-title>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>  
</template>

<script>
export default {
  data () {
    return {
      quickAccessItems: [
        {title: 'Libro de Ventas', description: 'Administra tus ventas a consumidores finales fácilmente.', image: 'ventas.jpeg', link: 'ventas'},
        {title: 'Libro de Ventas con Factura', description: 'Administra tus ventas con fácturas de una manera simple y eficiente.', image: 'ventas_fac.jpeg', link: 'ventasFactura'},
        {title: 'Libro de Compras', description: 'Administra tus compras y mantente informado de los gasto generados.', image: 'compras.jpeg', link: 'libro_compras'}
      ]
    }
  },
  methods: {
    goTo (route) {
      this.$router.push(route)
    }
  },
  computed: {
    getUSerData () {
      return this.$store.getters.user.uId
    }
  },
  mounted () {
    this.$store.dispatch('loadAllContribuyentes', this.getUSerData)
  }
}
</script>

