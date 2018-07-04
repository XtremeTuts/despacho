<template>
    <v-dialog v-model="dialog" persistent max-width="500px">
        <v-btn
        outline
        right
        slot="activator" 
        color="primary">
        <v-icon left>add</v-icon>
        Nuevo contribuyente
        </v-btn>
        <v-form @submit.prevent="onSaveContribuyente">
            <v-card>
                <v-card-title>
                    <span class="headline">Agregar Contribuyente</span>
                </v-card-title>
                <v-card-text>
                    <v-container fluid class="pa-0">
                        <v-layout row wrap>
                            <v-flex xs12 class="pl-2 pr-2">
                                <v-text-field
                                required
                                name="nameContribuyente"
                                autofocus
                                v-model="nombreContribuyente"
                                label="Nombre del contribuyente">
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout row wrap>
                            <v-flex xs12 class="pl-2 pr-2">
                                <v-select
                                required
                                :items="items"
                                v-model="tipoContribuyente"
                                label="Tipo de Contribuyente"></v-select>
                            </v-flex>
                        </v-layout>
                        <v-layout row wrap>
                            <v-flex xs12 class="pl-2 pr-2">
                                <v-text-field
                                name="nitContribuyente"
                                label="NIT del Contribuyente"
                                v-model="nitContribuyente"
                                required></v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout row wrap>
                            <v-flex xs12 class="pl-2 pr-2">
                                <v-text-field
                                name="giroContribuyente"
                                label="Giro del Contribuyente"
                                v-model="giroContribuyente"
                                required></v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout row wrap>
                            <v-flex xs12 class="pl-2 pr-2">
                                <v-select
                                :items="itemsGasto"
                                required
                                v-model="gastoContribuyente"
                                label="Tipo gasto del Contribuyente">
                                </v-select>
                            </v-flex>
                        </v-layout>
                    </v-container> 
                </v-card-text>
                <v-card-actions>
                    <v-btn
                    @click="dialog = false"
                    color="red darken-1"
                    flat
                    block>
                        <v-icon left>cancel</v-icon>
                        Cancelar
                    </v-btn>
                    <v-btn
                    :disabled="!formIsValid"
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
      dialog: false,
      nombreContribuyente: '',
      tipoContribuyente: '',
      nitContribuyente: '',
      giroContribuyente: '',
      gastoContribuyente: '',
      items: ['Cliente', 'Proveedor', 'Cliente/Proveedor', 'Empleado'],
      itemsGasto: [ 'Sueldos y salarios',
        'Arrendamientos',
        'Encomiendas',
        'Mantenimiento Vehículo',
        'Material médico',
        'Gasolina y lubricantes',
        'Cuotas de mantenimiento de clínica',
        'Mantenimiento de local',
        'Parqueo',
        'Internet, teléfono fijo y móvil',
        'Papelería',
        'Indemnizaciones',
        'Aguinaldos',
        'Bono 14',
        'Bonificación incentivo',
        'Gastos diversos (café, papel, higiene, etc.)',
        'Agua pura',
        'Honorarios asesoría, contabilidad y auditoria',
        'Publicidad y promociones',
        'Suscripciones',
        'Compra activos' ]
    }
  },
  methods: {
    onSaveContribuyente () {
      const newContribuyente = {
        nombre: this.nombreContribuyente,
        tipo: this.tipoContribuyente,
        nit: this.nitContribuyente,
        giro: this.giroContribuyente,
        gasto: this.gastoContribuyente
      }
      this.dialog = false
      this.$store.dispatch('createNewContribuyente', newContribuyente)
    }
  },
  computed: {
    formIsValid () {
      return this.nombreContribuyente.trim() !== '' &&
      this.nitContribuyente.trim() !== '' &&
      this.giroContribuyente.trim() !== ''
    }
  }
}
</script>

