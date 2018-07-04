<template>
    <v-container fluid class="pa-1">
        <v-layout row class="mb-2" align-center>
            <h2>Libro de Compras</h2>
        </v-layout>
        <v-layout row class="mb-1">
            <v-divider></v-divider>
        </v-layout>
        <v-layout row class="mb-3">
            <v-flex xs12 class="text-xs-right">
                <addNuevaCompraDialog />
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12>
                <v-data-table
                :headers="headers"
                :items="transactions"
                class="elevation-3">

                <template slot="items" slot-scope="props">
                    <td class="text-xs-left">{{ props.item.Fecha_registro }}</td>
                    <td class="text-xs-left">{{ props.item.Num_comprobante }}</td>
                    <td class="text-xs-left">{{ props.item.NRC.substring(10) }}</td>
                    <td class="text-xs-left">{{ props.item.ImportacionEx }}</td>
                    <td class="text-xs-left">{{ props.item.InternasEx}}</td>
                    <td class="text-xs-left">{{ parseFloat(props.item.ImportacionGr).toFixed(2) }}</td>
                    <td class="text-xs-left">{{ parseFloat(props.item.InternasGr).toFixed(2) }}</td>
                    <td class="text-xs-left">{{ parseFloat(props.item.Iva_compras).toFixed(2) }}</td>
                    <td class="text-xs-left">{{ parseFloat(props.item.Iva_percibido).toFixed(2) }}</td>
                    <td class="text-xs-left">{{ parseFloat(props.item.Total_compras).toFixed(2) }}</td>
                    <td class="text-xs-left">{{ parseFloat(props.item.Ret_terceros ).toFixed(2)}}</td>
                    <td class="text-xs-left">{{ parseFloat(props.item.No_contribuyentes ).toFixed(2)}}</td>
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
        { text: 'F. Registro', sortable: true, align: 'left', value: 'Fecha' },
        { text: 'N° Comp.', sortable: false, align: 'left', value: 'Num_comprobante' },
        { text: 'Proveedor', sortable: false, align: 'left', value: 'proveedor' },
        { text: 'Import. Ex.', sortable: false, align: 'left', value: 'Importaciones_exentas' },
        { text: 'Int. ex.', sortable: false, align: 'left', value: 'Internas_exentas' },
        { text: 'Import. Grab.', sortable: false, align: 'left', value: 'Importaciones_grabadas' },
        { text: 'Int. Grab.', sortable: false, align: 'left', value: 'Internas_grabadas' },
        { text: 'IVA', sortable: false, align: 'left', value: 'Iva_compras' },
        { text: 'IVA Perc.', sortable: false, align: 'left', value: 'Iva_percibido' },
        { text: 'Total Compras', sortable: false, align: 'left', value: 'totalCompra' },
        { text: 'Ret. 3eros', sortable: false, align: 'left', value: 'Retencion_tercero' },
        { text: 'No. Contrib', sortable: false, align: 'left', value: 'No_contribuyentes' },
        { text: 'Acciones', sortable: false, align: 'left', value: 'acciones' }
      ]
    }
  },
  computed: {
    transactions () {
      return this.$store.getters.compras
    }
  },
  created () {
    this.$store.dispatch('loadAllCompras')
  }
}
</script>

