<template>
    <v-dialog persistent v-model="editVentaFacturaDialog" max-width="580px">
        <v-btn
        slot="activator"
        title="Editar Registro" 
        icon 
        class="mx-0">
        <v-icon color="blue">edit</v-icon>
        </v-btn>
        <v-form @submit.prevent="onEditVentaFactura">
            <v-card>
            <v-card-title>
                <span class="headline">Editar Venta con Factura</span>
            </v-card-title>
            <v-card-text class="pa-2">
                     <v-container grid-list-md>
                        <v-layout wrap>
                        <v-flex xs12 sm6 md3>
                            <v-text-field
                            label="Fecha emisión"
                            mask="date"
                            v-model="fecha"
                            required>
                            </v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md3>
                            <v-text-field
                            v-model="facDelNum"
                            pattern="^([0-9]+)$"
                            label="Del Núm."
                            required>
                            </v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md3>
                           <v-text-field
                           v-model="facAlNum"
                           pattern="^([0-9]+)$"
                           label="Al Núm."
                           required></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md3>
                           <v-select
                            dense
                            :items="tiposVenta"
                            label="Tipo"
                            required
                            v-model="tipo"
                            ></v-select>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                            <v-text-field
                            label="Núm. Caja"
                            v-model="numCaja"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                            <v-text-field
                            label="Núm. Comp. Ret."
                            v-model="numCompRet"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <h3>Ventas Gravadas</h3>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12 sm6 md3>
                            <v-text-field 
                            label="Exentas"
                            v-model="ventasExentas"
                            @keyup="checkNumber"
                            data-tipo-campo="ventasExentas"
                            @focus="$event.target.select()"
                            required></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md3>
                            <v-text-field
                            label="Locales"
                            v-model="ventasLocales"
                            @keyup="checkNumber"
                            data-tipo-campo="ventasLocales"
                            @focus="$event.target.select()"
                            required></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md3>
                            <v-text-field
                            label="Exportación"
                            v-model="ventasExportacion"
                            @keyup="checkNumber"
                            data-tipo-campo="ventasExportacion"
                            @focus="$event.target.select()"
                            required></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md3>
                            <v-text-field
                            label="Total Venta"
                            readonly
                            :value="totalVenta"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <h3>Otros Detalles</h3>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12 sm6>
                            <v-text-field 
                            label="Monto sin retención"
                            v-model="montoSinRet"
                            @keyup="checkNumber"
                            data-tipo-campo="montoSinRet"
                            @focus="$event.target.select()">
                            </v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                            <v-text-field
                            label="Retención"
                            readonly
                            :value="montoRetencion"></v-text-field>
                        </v-flex>
                        </v-layout>
                    </v-container>
            </v-card-text>
            <v-card-actions>
                        <v-btn
                        @click="editVentaFacturaDialog = false"
                        color="red darken-1"
                        flat
                        block>
                            <v-icon left>cancel</v-icon>
                            Cancelar
                        </v-btn>
                        <v-btn
                        block
                        flat
                        color="blue darken-2"
                        type="submit">
                        <v-icon left>save</v-icon>
                        Guardar
                        </v-btn>
                    </v-card-actions>
            </v-card>
        </v-form>
    </v-dialog>    
</template>
<script>
export default {
  props: ['venta'],
  data () {
    return {
      editVentaFacturaDialog: false,
      tiposVenta: ['FA', 'DF'],
      fecha: this.venta.Fecha,
      facDelNum: this.venta.Del_num,
      facAlNum: this.venta.Al_num,
      numCaja: this.venta.Num_caja,
      numCompRet: this.venta.Num_retencion,
      ventasExentas: this.venta.Venta_exenta,
      ventasLocales: this.venta.Venta_grabada,
      ventasExportacion: this.venta.Venta_export,
      retencion: 0.00,
      montoSinRet: this.venta.Monto_sinret,
      tipo: this.venta.Tipo_doc,
      Codigo: this.venta.Codigo
    }
  },
  computed: {
    totalVenta () {
      return (parseFloat(this.ventasExentas) + parseFloat(this.ventasLocales) + parseFloat(this.ventasExportacion)).toFixed(2)
    },
    montoRetencion () {
      return (parseFloat(this.montoSinRet) * 0.01).toFixed(2)
    }
  },
  methods: {
    checkNumber (event) {
      if (event.target.value === '') {
        let dato = event.target.dataset.tipoCampo
        if (dato === 'ventasExentas') {
          this.ventasExentas = 0.00
        } else if (dato === 'ventasLocales') {
          this.ventasLocales = 0.00
        } else if (dato === 'ventasExportacion') {
          this.ventasExportacion = 0.00
        } else if (dato === 'montoSinRet') {
          this.montoSinRet = 0.00
        }
      }
    },
    onEditVentaFactura () {
      const updateVentaFactura = {
        Fecha: this.fecha,
        Num_caja: this.numCaja,
        Del_num: this.facDelNum,
        Al_num: this.facAlNum,
        Num_retencion: this.numCompRet,
        Monto_sinret: this.montoSinRet,
        Venta_exenta: this.ventasExentas,
        Venta_grabada: this.ventasLocales,
        Venta_export: this.ventasExportacion,
        Total_venta: this.totalVenta,
        Total_retencion: this.montoRetencion,
        Tipo_doc: this.tipo,
        Cod: this.Codigo
      }
      this.$store.dispatch('updateVentaFactura', updateVentaFactura)
      this.editVentaFacturaDialog = false
    }
  }
}
</script>
