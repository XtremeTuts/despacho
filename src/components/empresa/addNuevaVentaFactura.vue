<template>
    <v-dialog persistent v-model="addVentaFacturaDialog" max-width="580px">
         <v-btn
        outline
        right
        slot="activator" 
        color="primary">
        <v-icon left>add</v-icon>
        Nueva venta
        </v-btn>
        <v-form @submit.prevent="onSaveVentaFactura">
            <v-card>
            <v-card-title>
                <span class="headline">Nueva Venta con Factura</span>
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
                        @click="addVentaFacturaDialog = false"
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
  data () {
    return {
      addVentaFacturaDialog: false,
      tiposVenta: ['FA', 'DF'],
      fecha: '',
      facDelNum: '',
      facAlNum: '',
      numCaja: '',
      numCompRet: '',
      ventasExentas: 0.00,
      ventasLocales: 0.00,
      ventasExportacion: 0.00,
      montoSinRet: 0.00,
      retencion: 0.00,
      tipo: ''
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
    onSaveVentaFactura () {
      const newVentaFactura = {
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
        Tipo_doc: this.tipo
      }
      this.$store.dispatch('saveNewVentaFactura', newVentaFactura)
      this.addVentaFacturaDialog = false
    }
  }
}
</script>
