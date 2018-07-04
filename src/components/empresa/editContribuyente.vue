<template>
    <v-dialog v-model="editContriDialog" persistent max-width="500px">
        <v-btn
        slot="activator"
        title="Editar Registro" 
        icon 
        class="mx-0">
        <v-icon color="blue">edit</v-icon>
        </v-btn>
        <v-form @submit.prevent="onEditContribuyente">
            <v-card>
                <v-card-title>
                    <span class="headline">Editar Contribuyente</span>
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
                    @click="editContriDialog = false"
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
  props: ['contribuyente'],
  data () {
    return {
      editContriDialog: false,
      nombreContribuyente: this.contribuyente.Nombre,
      tipoContribuyente: this.contribuyente.Tipo,
      nitContribuyente: this.contribuyente.NIT.substring(10),
      giroContribuyente: this.contribuyente.Giro,
      gastoContribuyente: this.contribuyente.Tipo_gasto,
      codigoContribuyente: this.contribuyente.Codigo,
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
    onEditContribuyente () {
      this.editContriDialog = false
      const dataContri = {
        Codigo: this.codigoContribuyente,
        Nombre: this.nombreContribuyente,
        Tipo: this.tipoContribuyente,
        NIT: this.nitContribuyente,
        Giro: this.giroContribuyente,
        Tipo_gasto: this.gastoContribuyente
      }
      this.$store.dispatch('updateContribuyente', dataContri)
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
