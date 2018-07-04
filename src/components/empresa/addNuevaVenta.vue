<template>
    <v-dialog persistent v-model="addVentaDialog" max-width="580px">
         <v-btn
        outline
        right
        slot="activator" 
        color="primary">
        <v-icon left>add</v-icon>
        Nueva venta
        </v-btn>
        <v-form @submit.prevent="onSaveVenta" id="frm_addVenta">
            <v-card>
                <v-card-title>
                    <span class="headline">Agregar Nueva Venta</span>
                </v-card-title>
                <v-card-text class="pa-2">
                    <v-container grid-list-md>
                        <v-layout wrap>
                        <v-flex xs12 sm6 md3>
                            <v-text-field
                            label="Fecha de emisión"
                            mask="date"
                            v-model="fecha"
                            required>
                            </v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md3>
                            <v-text-field
                            v-model="numComprobante"
                            pattern="^([0-9]+)$"
                            label="Comprobante">
                            </v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md3>
                            <v-select
                            required
                            :items="retOptions"
                            label="Retener IVA"
                            @change="retener"
                            dense
                            v-model="retIva">
                            </v-select>
                        </v-flex>
                        <v-flex xs12 sm6 md3>
                            <v-select
                            required
                            :items="percOptions"
                            label="Percibir IVA"
                            dense
                            @change="percibir"
                            v-model="percIva">
                            </v-select>
                        </v-flex>
                        <v-flex xs12 sm6 md2>
                            <v-select
                            dense
                            :items="tiposVenta"
                            label="Tipo"
                            hint="Tipo de Venta"
                            required
                            v-model="tipo"
                            ></v-select>
                        </v-flex>
                        <v-flex xs12 sm6 md10>
                            <v-select
                            dense
                            :items="getContribuyentes"
                            label="Cliente de la venta"
                            required
                            v-model="cliente"
                            ></v-select>
                        </v-flex>
                        <v-flex xs12>
                            <h3>Ventas Internas</h3>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field 
                            label="Exentas"
                            v-model="ventasExentas"
                            @keyup="checkNumber"
                            data-tipo-campo="ventasExentas"
                            @focus="$event.target.select()"
                            required></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field
                            label="Gravadas"
                            v-model="ventasGravadas"
                            @keyup="handler"
                            data-tipo-campo="ventasGravadas"
                            @focus="$event.target.select()"
                            required></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field
                            label="Total Ventas Netas"
                            @keyup="checkNumber"
                            :value="totalVenta"
                            readonly
                            data-tipo-campo="ventasNetas"
                            @focus="$event.target.select()"
                            required></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <h3>Impuesto al valor agregado</h3>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12 sm6 md3>
                            <v-text-field 
                            label="IVA débito fiscal"
                            :value="totalIva"
                            readonly>
                            </v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md3>
                            <v-text-field
                            label="IVA Retención"
                            readonly
                            v-model="IvaRetenido"></v-text-field>
                        </v-flex>
                         <v-flex xs12 sm6 md3>
                            <v-text-field
                            label="IVA Percepción"
                            readonly
                            v-model="IvaPercibido"></v-text-field>
                        </v-flex>
                         <v-flex xs12 sm6 md3>
                            <v-text-field
                            label="Total CF"
                            readonly
                            :value="totalCF"></v-text-field>
                        </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                        <v-btn
                        @click="addVentaDialog = false"
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
      addVentaDialog: false,
      tiposVenta: ['CF', 'ND', 'NC'],
      retOptions: ['Si', 'No'],
      percOptions: ['Si', 'No'],
      contribuyentes: [],
      ventasExentas: 0.00,
      ventasGravadas: 0.00,
      ventasNetas: 0.00,
      servOpEx: 0.00,
      tipo: '',
      cliente: '',
      fecha: '',
      numComprobante: '',
      retIva: 'No',
      percIva: 'No',
      IvaRetenido: 0.00,
      IvaPercibido: 0.00
    }
  },
  computed: {
    getContribuyentes () {
      this.$store.getters.contribuyentes.forEach(contri => {
        this.contribuyentes.push({ text: contri.Nombre, value: contri.NIT })
      })
      return this.contribuyentes
    },
    totalVenta () {
      return (parseFloat(this.ventasExentas) + parseFloat(this.ventasGravadas)).toFixed(2)
    },
    totalIva () {
      return (parseFloat(this.ventasGravadas) * (13.00 / 100)).toFixed(2)
    },
    totalCF () {
      return ((parseFloat(this.ventasExentas) + parseFloat(this.IvaPercibido) + parseFloat(this.ventasGravadas) + parseFloat(this.totalIva)) - parseFloat(this.IvaRetenido)).toFixed(2)
    }
  },
  methods: {
    checkNumber (event) {
      if (event.target.value === '') {
        let dato = event.target.dataset.tipoCampo
        if (dato === 'ventasExentas') {
          this.ventasExentas = 0.00
        } else if (dato === 'ventasGravadas') {
          this.ventasGravadas = 0.00
        } else if (dato === 'ventasNetas') {
          this.bienOpEx = 0.00
        } else if (dato === 'servOpEx') {
          this.servOpEx = 0.00
        }
      }
    },
    onSaveVenta (event) {
      const newVenta = {
        Fecha: this.fecha,
        Num_comprobante: this.numComprobante,
        NRC: this.cliente,
        Vent_int_ex: this.ventasExentas,
        Vent_int_gra: this.ventasGravadas,
        Valor_iva: this.totalIva,
        Retencion_iva: this.IvaRetenido,
        Percepcion_iva: this.IvaPercibido,
        Total_venta: this.totalVenta,
        Total_cf: this.totalCF,
        Retener_iva: this.retIva,
        Tipo_doc: this.tipo,
        Percibir_iva: this.percIva
      }
      this.$store.dispatch('saveNewVenta', newVenta)
      this.addVentaDialog = false
      event.target.reset()
    },
    retener (valor) {
      if (valor === 'Si') {
        this.IvaRetenido = (parseFloat(this.ventasGravadas) * 0.01).toFixed(2)
      } else {
        this.IvaRetenido = 0.00
      }
    },
    inputRetener (event) {
      if (this.retIva === 'Si') {
        this.IvaRetenido = (parseFloat(event.target.value) * 0.01).toFixed(2)
      } else {
        this.IvaRetenido = 0.00
      }
    },
    percibir (valor) {
      if (valor === 'Si') {
        this.IvaPercibido = (parseFloat(this.ventasGravadas) * 0.01).toFixed(2)
      } else {
        this.IvaPercibido = 0.00
      }
    },
    inputPercibir (event) {
      if (this.percIva === 'Si') {
        this.IvaPercibido = (parseFloat(event.target.value) * 0.01).toFixed(2)
      } else {
        this.IvaPercibido = 0.00
      }
    },
    handler (event) {
      this.checkNumber(event)
      this.inputRetener(event)
      this.inputPercibir(event)
    }
  }
}
</script>

