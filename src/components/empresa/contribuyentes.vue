<template>
    <v-container>
        <v-layout row class="mb-2" align-center>
            <h2>Administrar Contribuyentes</h2>
        </v-layout>
        <v-layout row class="mb-1">
            <v-divider></v-divider>
        </v-layout>
        <v-layout row class="mb-3">
            <v-flex xs12 class="text-xs-right">
                <v-spacer></v-spacer>
                <addcontribuyenteDialog></addcontribuyenteDialog>
            </v-flex>
        </v-layout>
        <v-layout row v-if="!loading">
            <v-flex xs12>
                <v-data-table
                :headers="headers"
                :items="getContribuyentes"
                hide-actions
                class="elevation-3"
                >
                <template slot="items" slot-scope="props">
                    <td class="text-xs-left">{{ props.item.Nombre }}</td>
                    <td class="text-xs-left">{{ props.item.Tipo }}</td>
                    <td class="text-xs-left">{{ props.item.NIT.substring(10) }}</td>
                    <td class="text-xs-left">{{ props.item.Giro }}</td>
                    <td class="text-xs-left">{{ props.item.Tipo_gasto }}</td>
                    <td class="justify-center layout px-0">
                        <editcontribuyenteDialog :contribuyente="props.item"/>
                        <v-btn
                        title="Eliminar Registro" 
                        icon 
                        class="mx-0" 
                        @click="deleteItem(props.item)">
                            <v-icon color="red">delete</v-icon>
                        </v-btn>
                    </td>
                </template>
                <template slot="no-data">
                <v-alert :value="true" color="error" icon="warning" class="text-xs-center">
                    ¡Ups! Parece que no hay datos por el momento. ¡Vamos! agrega uno nuevo :)
                </v-alert>
                </template>
                </v-data-table>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
export default {
  data () {
    return {
      tipoContribuyente: '',
      nombreContribuyente: '',
      gastoContribuyente: '',
      giroContribuyente: '',
      nitContribuyente: '',
      headers: [
        { text: 'Nombre', sortable: true, align: 'left', value: 'Nombre' },
        { text: 'Tipo', sortable: false, align: 'left', value: 'Tipo' },
        { text: 'N.I.T.', sortable: false, align: 'left', value: 'NIT' },
        { text: 'Giro', sortable: false, align: 'left', value: 'Giro' },
        { text: 'Tipo de Gasto', sortable: false, align: 'left', value: 'Tipo_gasto' },
        { text: 'Acciones', sortable: false, align: 'left', value: 'acciones' }
      ]
    }
  },
  computed: {
    getContribuyentes () {
      return this.$store.getters.contribuyentes
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    deleteItem (item) {
      if (confirm(`De verdad desea eliminar al contribuyente ${item.Nombre}`)) {
        this.$store.dispatch('deleteContribuyente', item.Codigo)
      }
    }
  }
}
</script>

