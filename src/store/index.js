import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: null,
    loading: false,
    error: null,
    contribuyentes: [],
    ventas: [],
    ventasFactura: [],
    compras: []
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    loadAllContribuyentes (state, payload) {
      state.contribuyentes = payload
    },
    addNewContribuyente (state, payload) {
      state.contribuyentes.push(payload)
    },
    deleteContribuyente (state, payload) {
      const contribuyentes = state.contribuyentes
      contribuyentes.splice(contribuyentes.findIndex(contri => contri.Codigo === payload), 1)
    },
    updateContribuyente (state, payload) {
      const contribuyente = state.contribuyentes.find(contri => {
        return contri.Codigo === payload.Codigo
      })
      if (payload.Nombre) {
        contribuyente.Nombre = payload.Nombre
      }
      if (payload.Tipo) {
        contribuyente.Tipo = payload.Tipo
      }
      if (payload.NIT) {
        contribuyente.NIT = payload.NIT
      }
      if (payload.Giro) {
        contribuyente.Giro = payload.Giro
      }
      if (payload.Tipo_gasto) {
        contribuyente.Tipo_gasto = payload.Tipo_gasto
      }
    },
    loadAllVentas (state, payload) {
      state.ventas = payload
    },
    addNewVenta (state, payload) {
      state.ventas.push(payload)
    },
    updateVenta (state, payload) {
      const venta = state.ventas.find(venta => {
        return venta.Codigo === payload.Codigo
      })
      if (payload.Fecha) {
        venta.Fecha = payload.Fecha
      }
      if (payload.Num_comprobante) {
        venta.Num_comprobante = payload.Num_comprobante
      }
      if (payload.NRC) {
        venta.NRC = payload.NRC
      }
      if (payload.Vent_in_ex) {
        venta.Vent_int_ex = payload.Vent_int_ex
      }
      if (payload.Vent_in_gr) {
        venta.Vent_int_gra = payload.Vent_int_gra
      }
      if (payload.Valor_iva) {
        venta.Valor_iva = payload.Valor_iva
      }
      if (payload.Retencion_iva) {
        venta.Retencion_iva = payload.Retencion_iva
      }
      if (payload.Percepcion_iva) {
        venta.Percepcion_iva = payload.Percepcion_iva
      }
      if (payload.Total_venta) {
        venta.Total_venta = payload.Total_venta
      }
      if (payload.Total_cf) {
        venta.Total_cf = payload.Total_cf
      }
      if (payload.Retener_iva) {
        venta.Retener_iva = payload.Retener_iva
      }
      if (payload.Tipo_doc) {
        venta.Tipo_doc = payload.Tipo_doc
      }
      if (payload.Percibir_iva) {
        venta.Percibir_iva = payload.Percibir_iva
      }
    },
    deleteVenta (state, payload) {
      const ventas = state.ventas
      ventas.splice(ventas.findIndex(contri => contri.Codigo === payload), 1)
    },
    addNewVentaFactura (state, payload) {
      state.ventasFactura.push(payload)
    },
    loadAllVentasFactura (state, payload) {
      state.ventasFactura = payload
    },
    updateVentaFactura (state, payload) {
      const ventaFactura = state.ventasFactura.find(venta => {
        return venta.Codigo === payload.Cod
      })
      if (payload.Fecha) {
        ventaFactura.Fecha = payload.Fecha
      }
      if (payload.Num_caja) {
        ventaFactura.Num_caja = payload.Num_caja
      }
      if (payload.Del_num) {
        ventaFactura.Del_num = payload.Del_num
      }
      if (payload.Al_num) {
        ventaFactura.Al_num = payload.Al_num
      }
      if (payload.Num_retencion) {
        ventaFactura.Num_retencion = payload.Num_retencion
      }
      if (payload.Monto_sinret) {
        ventaFactura.Monto_sinret = payload.Monto_sinret
      }
      if (payload.Venta_exenta) {
        ventaFactura.Venta_exenta = payload.Venta_exenta
      }
      if (payload.Venta_grabada) {
        ventaFactura.Venta_grabada = payload.Venta_grabada
      }
      if (payload.Venta_export) {
        ventaFactura.Venta_export = payload.Venta_export
      }
      if (payload.Total_venta) {
        ventaFactura.Total_venta = payload.Total_venta
      }
      if (payload.Total_retencion) {
        ventaFactura.Total_retencion = payload.Total_retencion
      }
      if (payload.Tipo_doc) {
        ventaFactura.Tipo_doc = payload.Tipo_doc
      }
      if (payload.Codigo) {
        ventaFactura.codigo = payload.Codigo
      }
    },
    deleteVentaFactura (state, payload) {
      const ventasFactura = state.ventasFactura
      ventasFactura.splice(ventasFactura.findIndex(contri => contri.Codigo === payload), 1)
    },
    addNewCompra (state, payload) {
      state.compras.push(payload)
    },
    loadAllCompras (state, payload) {
      state.compras = payload
    }
  },
  actions,
  getters: {
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    },
    contribuyentes (state) {
      return state.contribuyentes
    },
    ventas (state) {
      return state.ventas
    },
    ventasFactura (state) {
      return state.ventasFactura
    },
    compras (state) {
      return state.compras
    }
  }
})
