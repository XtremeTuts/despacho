<template>
    <v-dialog persistent v-model="addCompraDialog" max-width="580px">
         <v-btn
        outline
        right
        slot="activator" 
        color="primary">
        <v-icon left>add</v-icon>
        Nueva Compra
        </v-btn>
        <v-form @submit.prevent="onSaveCompra">
            <v-card>
                <v-card-title>
                    <span class="headline">Agregar Nueva Compra</span>
                </v-card-title>
                <v-card-text class="pa-0">
                    <v-container grid-list-md class="pa-3">
                        <v-layout wrap>
                            <v-flex xs12 sm6 md3>
                                <v-text-field
                                label="Fecha de emisión"
                                mask="date"
                                v-model="fechaEmision"
                                required>
                                </v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md3>
                                <v-text-field
                                label="Fecha de ingreso"
                                mask="date"
                                v-model="fechaIngreso"
                                required>
                                </v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md3>
                                <v-select
                                required
                                :items="percOptions"
                                label="Percibir IVA"
                                @change="percibir"
                                dense
                                v-model="percIva">
                                </v-select>
                            </v-flex>
                            <v-flex xs12 sm6 md3>
                                <v-select
                                dense
                                :items="tiposCompra"
                                label="Tipo"
                                hint="Tipo de Compra"
                                required
                                v-model="tipo"
                                ></v-select>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field
                                label="Num. Comprobante"
                                required
                                v-model="numComprobante"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md8>
                                <v-select
                                dense
                                label="Proveedor de la compra"
                                required
                                v-model="proveedor"
                                :items="getContribuyentes"></v-select>
                            </v-flex>
                            <v-flex xs12>
                                <h3>Compras Internas</h3>
                                <v-divider></v-divider>
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                                <v-text-field
                                @focus="$event.target.select()"
                                @keyup="handler"
                                label="Importaciones"
                                required
                                v-model="importacionesEx"
                                data-tipo-campo="importacionesEx">
                                </v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                                <v-text-field
                                @focus="$event.target.select()"
                                @keyup="handler"
                                label="Internas"
                                required
                                v-model="internasEx"
                                data-tipo-campo="internasEx">
                                </v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <h3>Compras Grabadas</h3>
                                <v-divider></v-divider>
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                                <v-text-field
                                @focus="$event.target.select()"
                                @keyup="handler"
                                label="Importaciones"
                                required
                                v-model="importacionesGr"
                                data-tipo-campo="importacionesGr">
                                </v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                                <v-text-field
                                @focus="$event.target.select()"
                                @keyup="handler"
                                label="Internas"
                                required
                                v-model="internasGr"
                                data-tipo-campo="internasGr">
                                </v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <h3>Impuesto al Valor Agregado</h3>
                                <v-divider></v-divider>
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                                <v-text-field
                                label="IVA Compras"
                                :value="totalIva"
                                readonly
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                                <v-text-field
                                label="IVA Percibido"
                                v-model="IvaPercibido"
                                readonly
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field
                                label="Total compras"
                                :value="totalCompras"
                                readonly>
                                </v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field
                                @focus="$event.target.select()"
                                @keyup="handler"
                                label="Retención a terceros"
                                required
                                v-model="retTerceros"
                                data-tipo-campo="retTerceros">
                                </v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field
                                @focus="$event.target.select()"
                                @keyup="handler"
                                label="Compras NO Contribuyentes"
                                required
                                v-model="comprasNoContris"
                                data-tipo-campo="comprasNoContris">
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-btn
                    @click="addCompraDialog = false"
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
      addCompraDialog: false,
      contribuyentes: [],
      tiposCompra: ['CF', 'ND', 'NC'],
      percOptions: ['Si', 'No'],
      fechaEmision: '',
      fechaIngreso: '',
      percIva: 'No',
      tipo: '',
      proveedor: '',
      numComprobante: '',
      importacionesEx: (0.00).toFixed(2),
      internasEx: (0.00).toFixed(2),
      importacionesGr: (0.00).toFixed(2),
      internasGr: (0.00).toFixed(2),
      retTerceros: (0.00).toFixed(2),
      comprasNoContris: (0.00).toFixed(2),
      IvaPercibido: (0.00).toFixed(2)
    }
  },
  computed: {
    getContribuyentes () {
      this.$store.getters.contribuyentes.forEach(contri => {
        this.contribuyentes.push({ text: contri.Nombre, value: contri.NIT })
      })
      return this.contribuyentes
    },
    totalIva () {
      return ((parseFloat(this.importacionesGr) + parseFloat(this.internasGr)) * (13.00 / 100)).toFixed(2)
    },
    totalCompras () {
      return (parseFloat(this.importacionesEx) + parseFloat(this.internasEx) + parseFloat(this.internasGr) + parseFloat(this.importacionesGr) - parseFloat(this.IvaPercibido)).toFixed(2)
    }
  },
  methods: {
    onSaveCompra () {
      const newCompra = {
        Fecha_emision: this.fechaEmision,
        Fecha_registro: this.fechaIngreso,
        Num_comprobante: this.numComprobante,
        NRC: this.proveedor,
        Percibir_iva: this.percIva,
        ImportacionEx: this.importacionesEx,
        InternasEx: this.internasEx,
        ImportacionGr: this.importacionesGr,
        InternasGr: this.internasGr,
        Iva_compras: this.totalIva,
        Iva_percibido: this.IvaPercibido,
        Total_compras: this.totalCompras,
        Ret_terceros: this.retTerceros,
        Tipo_doc: this.tipo,
        No_contribuyentes: this.comprasNoContris
      }
      this.$store.dispatch('saveNewCompra', newCompra)
      this.addCompraDialog = false
    },
    checkNumber (event) {
      if (event.target.value === '') {
        let dato = event.target.dataset.tipoCampo
        if (dato === 'internasEx') {
          this.internasEx = (0.00).toFixed(2)
        } else if (dato === 'importacionesEx') {
          this.importacionesEx = (0.00).toFixed(2)
        } else if (dato === 'internasGr') {
          this.internasGr = (0.00).toFixed(2)
        } else if (dato === 'importacionesGr') {
          this.importacionesGr = (0.00).toFixed(2)
        } else if (dato === 'retTerceros') {
          this.retTerceros = (0.00).toFixed(2)
        } else if (dato === 'comprasNoContris') {
          this.comprasNoContris = (0.00).toFixed(2)
        }
      }
    },
    percibir (valor) {
      if (valor === 'Si') {
        this.IvaPercibido = ((parseFloat(this.importacionesGr) + parseFloat(this.internasGr)) * 0.01).toFixed(2)
      } else {
        this.IvaPercibido = (0.00).toFixed(2)
      }
    },
    inputPercibir (event) {
      if (this.percIva === 'Si') {
        this.IvaPercibido = ((parseFloat(this.importacionesGr) + parseFloat(this.internasGr)) * 0.01).toFixed(2)
      } else {
        this.IvaPercibido = (0.00).toFixed(2)
      }
    },
    handler (event) {
      this.checkNumber(event)
      this.inputPercibir(event)
    }
  }
}
</script>

