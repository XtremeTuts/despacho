<template>
    <v-container fluid class="pa-2">
        <v-layout row class="mb-2" align-center>
            <h2>Libro de Ventas con Factura</h2>
        </v-layout>
        <v-layout row class="mb-1">
            <v-divider></v-divider>
        </v-layout>
        <v-layout row class="mb-3">
            <v-flex xs12 class="text-xs-right">
                <addVentaFacturaDialog />
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
                    <td class="text-xs-left">{{ props.item.Num_caja }}</td>
                    <td class="text-xs-left">{{ props.item.Del_num }}</td>
                    <td class="text-xs-left">{{ props.item.Al_num }}</td>
                    <td class="text-xs-left">{{ props.item.Num_retencion }}</td>
                    <td class="text-xs-left">{{ parseFloat(props.item.Monto_sinret).toFixed(2) }}</td>
                    <td class="text-xs-left">{{ parseFloat(props.item.Venta_exenta).toFixed(2) }}</td>
                    <td class="text-xs-left">{{ parseFloat(props.item.Venta_grabada).toFixed(2) }}</td>
                    <td class="text-xs-left">{{ parseFloat(props.item.Venta_export).toFixed(2) }}</td>
                    <td class="text-xs-left">{{ parseFloat(props.item.Total_venta).toFixed(2) }}</td>
                    <td class="text-xs-left">{{ parseFloat(props.item.Total_retencion ).toFixed(2)}}</td>
                    <td class="justify-center layout px-0">
                        <editVentaFacturaDialog :venta="props.item"/>
                        <v-btn
                        title="Eliminar Registro" 
                        icon 
                        class="mx-0" 
                        @click="deleteVentaFactura(props.item)">
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
        { text: 'N° Caja', sortable: false, align: 'left', value: 'Caja' },
        { text: 'Del Num.', sortable: false, align: 'left', value: 'delNum' },
        { text: 'Al Num.', sortable: false, align: 'left', value: 'alNum' },
        { text: 'Num. Retención', sortable: false, align: 'left', value: 'NumRetencion' },
        { text: 'Monto S/R', sortable: false, align: 'left', value: 'MontoSR' },
        { text: 'Vta. Exenta', sortable: false, align: 'left', value: 'VEx' },
        { text: 'Vta. Gravada', sortable: false, align: 'left', value: 'VGr' },
        { text: 'Vta. Export.', sortable: false, align: 'left', value: 'VExp' },
        { text: 'Total Venta', sortable: false, align: 'left', value: 'totalVta' },
        { text: 'Total Retención', sortable: false, align: 'left', value: 'TotRetencion' },
        { text: 'Acciones', sortable: false, align: 'left', value: 'acciones' }
      ]
    }
  },
  computed: {
    transactions () {
      return this.$store.getters.ventasFactura
    }
  },
  methods: {
    deleteVentaFactura (ventaFactura) {
      if (confirm('¿De verdad desea eliminar la venta?')) {
        this.$store.dispatch('deleteVentaFactura', ventaFactura.Codigo)
      }
    }
  },
  created () {
    this.$store.dispatch('loadAllVentasFactura')
  }
}
</script>

