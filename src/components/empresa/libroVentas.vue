<template>
    <v-container fluid class="pa-2">
        <v-layout row class="mb-2" align-center>
            <h2>Libro de Ventas</h2>
        </v-layout>
        <v-layout row class="mb-1">
            <v-divider></v-divider>
        </v-layout>
        <v-layout row class="mb-3">
            <v-flex xs12 class="text-xs-right">
                <addVentaDialog />
                <addcontribuyenteDialog />
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12>
                <v-data-table
                :headers="headers"
                :items="transactions"
                rows-per-page-text="Registros por página"
                class="elevation-3">

                <template slot="items" slot-scope="props">
                    <td class="text-xs-left">{{ props.item.Fecha }}</td>
                    <td class="text-xs-left">{{ props.item.Num_comprobante }}</td>
                    <td class="text-xs-left">{{ props.item.NRC.substring(10) }}</td>
                    <td class="text-xs-left">{{ parseFloat(props.item.Vent_int_ex).toFixed(2) }}</td>
                    <td class="text-xs-left">{{ parseFloat(props.item.Vent_int_gra).toFixed(2) }}</td>
                    <td class="text-xs-left">{{ parseFloat(props.item.Valor_iva).toFixed(2) }}</td>
                    <td class="text-xs-left">{{ parseFloat(props.item.Retencion_iva).toFixed(2) }}</td>
                    <td class="text-xs-left">{{ parseFloat(props.item.Percepcion_iva).toFixed(2) }}</td>
                    <td class="text-xs-left">{{ parseFloat(props.item.Total_venta ).toFixed(2)}}</td>
                    <td class="text-xs-left">{{ parseFloat(props.item.Total_cf).toFixed(2) }}</td>
                    <td class="justify-center layout px-0">
                        <editVentaDialog :venta="props.item"/>
                        <v-btn
                        title="Eliminar Registro" 
                        icon 
                        class="mx-0" 
                        @click="deleteVenta(props.item)">
                            <v-icon color="red">delete</v-icon>
                        </v-btn>
                    </td>
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
      headers: [
        { text: 'Fecha', sortable: true, align: 'left', value: 'Fecha' },
        { text: 'Num. Comprob.', sortable: false, align: 'left', value: 'Num_comprobante' },
        { text: 'Cliente.', sortable: false, align: 'left', value: 'cliente' },
        { text: 'Ventas Exentas', sortable: false, align: 'left', value: 'Vent_in_ex' },
        { text: 'Ventas Gravadas', sortable: false, align: 'left', value: 'Vent_in_gr' },
        { text: 'IVA', sortable: false, align: 'left', value: 'Valor_iva' },
        { text: 'Ret. IVA', sortable: false, align: 'left', value: 'Retencion_iva' },
        { text: 'Perc. IVA', sortable: false, align: 'left', value: 'Percepcion_iva' },
        { text: 'Total Venta', sortable: false, align: 'left', value: 'Total_venta' },
        { text: 'Total IVA', sortable: false, align: 'left', value: 'Total_iva' },
        { text: 'Acciones', sortable: false, align: 'left', value: 'acciones' }
      ]
    }
  },
  computed: {
    transactions () {
      return this.$store.getters.ventas
    }
  },
  methods: {
    deleteVenta (venta) {
      if (confirm('¿De verdad desea eliminar esta venta de su libro?')) {
        this.$store.dispatch('deleteVenta', venta.Codigo)
      }
    }
  },
  created () {
    this.$store.dispatch('loadAllVentas')
  }
}
</script>
