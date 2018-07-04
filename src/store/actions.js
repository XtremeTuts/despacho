import $axios from '../helpers/axios'

export default {
  userLogIn ({commit}, payload) {
    commit('setLoading', true)
    $axios.post(`${process.env.API}/login`, payload)
    .then(userData => {
      console.log(userData.data)
      if (!userData.data.error) {
        const user = {
          uId: userData.data.datos.uId,
          userType: userData.data.datos.userType,
          token: userData.data.token,
          registered: userData.data.datos.registered
        }
        let localUser = JSON.stringify(user)
        localStorage.setItem('s3pymses', localUser)
        commit('setUser', user)
        commit('setLoading', false)
      } else {
        commit('setError', { message: userData.data.message, type: 'error' })
        commit('setLoading', false)
      }
    })
    .catch(error => {
      console.log(error)
      commit('setLoading', false)
      commit('setError', { message: error.message, type: 'error' })
    })
  },
  autoSignIn ({commit}, payload) {
    commit('setUser', payload)
  },
  saveNewData ({commit}, payload) {
    commit('setLoading', true)
    let userId = JSON.parse(localStorage.getItem('s3pymses'))
    let Id = userId.uId
    $axios.put(`${process.env.API}/signup/${Id}`, payload)
    .then((userNewData) => {
      if (!userNewData.data.error) {
        commit('setError', { message: userNewData.data.message, type: 'success' })
        commit('setUser', null)
        localStorage.removeItem('s3pymses')
      } else {
        commit('setError', { message: userNewData.data.message, type: 'error' })
      }
      commit('setLoading', false)
    })
    .catch(error => {
      commit('setError', { message: error.message, type: 'error' })
      commit('setLoading', false)
    })
  },
  createNewContribuyente ({commit, state}, payload) {
    const contribuyente = {
      userId: state.user.uId,
      nombre: payload.nombre,
      tipo: payload.tipo,
      nit: payload.nit,
      giro: payload.giro,
      gasto: payload.gasto
    }
    $axios.post(`${process.env.API}/addcontribuyente`, contribuyente)
    .then(contriData => {
      if (!contriData.error) {
        const newContribuyente = {
          Codigo: contriData.data.Id,
          Nombre: payload.nombre,
          Tipo: payload.tipo,
          NIT: contriData.data.nit,
          Giro: payload.giro,
          Tipo_gasto: payload.gasto
        }
        commit('addNewContribuyente', newContribuyente)
        commit('setError', { message: contriData.data.message, type: 'success' })
      } else {
        commit('setError', { message: contriData.data.message, type: 'error' })
      }
      console.log(contriData.data)
    })
    .catch(error => {
      console.log(error)
      commit('setError', { message: error.message, type: 'error' })
    })
  },
  deleteContribuyente ({commit, state}, payload) {
    commit('setLoading', true)
    $axios.delete(`${process.env.API}/deletecontribuyente/${payload}/${state.user.uId}`)
    .then(deleteContriData => {
      if (!deleteContriData.data.error) {
        commit('deleteContribuyente', payload)
        commit('setError', { message: deleteContriData.data.message, type: 'success' })
        commit('setLoading', false)
      } else {
        commit('setError', { message: deleteContriData.data.message, type: 'error' })
        commit('setLoading', false)
      }
    })
    .catch(error => {
      console.log(error)
      commit('setError', { message: error.message, type: 'error' })
      commit('setLoading', false)
    })
  },
  updateContribuyente ({commit, state}, payload) {
    commit('setLoading', true)
    const updatedContri = {}
    if (payload.Nombre) {
      updatedContri.Nombre = payload.Nombre
    }
    if (payload.Tipo) {
      updatedContri.Tipo = payload.Tipo
    }
    if (payload.NIT) {
      updatedContri.NIT = payload.NIT
    }
    if (payload.Giro) {
      updatedContri.Giro = payload.Giro
    }
    if (payload.Tipo_gasto) {
      updatedContri.Tipo_gasto = payload.Tipo_gasto
    }
    $axios.put(`${process.env.API}/updatecontribuyente/${payload.Codigo}/${state.user.uId}`, updatedContri)
    .then((updatedContriData) => {
      if (!updatedContriData.data.error) {
        payload.NIT = updatedContriData.data.nit
        commit('updateContribuyente', payload)
        commit('setLoading', false)
        commit('setError', { message: updatedContriData.data.message, type: 'success' })
      } else {
        commit('setError', { message: updatedContriData.data.message, type: 'error' })
      }
      console.log(updatedContriData.data)
    })
    .catch(error => {
      commit('setLoading', false)
      commit('setError', { message: error.message, type: 'error' })
      console.log(error)
    })
  },
  loadAllContribuyentes ({commit, state}) {
    commit('setLoading', true)
    $axios.get(`${process.env.API}/getallcontribuyentes/${state.user.uId}`)
    .then(contrisData => {
      commit('loadAllContribuyentes', contrisData.data)
      commit('setLoading', false)
    })
    .catch(error => {
      commit('setLoading', false)
      commit('setError', { message: error.message, type: 'error' })
    })
  },
  saveNewVenta ({commit, state}, payload) {
    commit('setLoading', true)
    $axios.post(`${process.env.API}/addnewventa/${state.user.uId}`, payload)
    .then(newVentaData => {
      console.log(newVentaData.data)
      if (!newVentaData.data.error) {
        const venta = {
          Codigo: newVentaData.data.Id,
          Fecha: payload.Fecha,
          Num_comprobante: payload.Num_comprobante,
          NRC: payload.NRC,
          Vent_int_ex: payload.Vent_int_ex,
          Vent_int_gra: payload.Vent_int_gra,
          Valor_iva: payload.Valor_iva,
          Retencion_iva: payload.Retencion_iva,
          Percepcion_iva: payload.Percepcion_iva,
          Total_venta: payload.Total_venta,
          Total_cf: payload.Total_cf,
          Retener_iva: payload.Retener_iva,
          Tipo_doc: payload.Tipo_doc,
          Percibir_iva: payload.Percibir_iva
        }
        commit('setError', { message: newVentaData.data.message, type: 'success' })
        commit('addNewVenta', venta)
        commit('setLoading', false)
      } else {
        commit('setError', { message: newVentaData.data.message, type: 'error' })
        commit('setLoading', false)
      }
    })
    .catch(error => {
      commit('setError', { message: error.message, type: 'error' })
      commit('setLoading', false)
    })
  },
  editVenta ({commit, state}, payload) {
    commit('setLoading', true)
    const updatedVenta = {}
    if (payload.Fecha) {
      updatedVenta.Fecha = payload.Fecha
    }
    if (payload.Num_comprobante) {
      updatedVenta.Num_comprobante = payload.Num_comprobante
    }
    if (payload.NRC) {
      updatedVenta.NRC = payload.NRC
    }
    if (payload.Vent_int_ex) {
      updatedVenta.Vent_int_ex = payload.Vent_int_ex
    }
    if (payload.Vent_int_gra) {
      updatedVenta.Vent_int_gra = payload.Vent_int_gra
    }
    if (payload.Valor_iva) {
      updatedVenta.Valor_iva = payload.Valor_iva
    }
    if (payload.Retencion_iva) {
      updatedVenta.Retencion_iva = payload.Retencion_iva
    }
    if (payload.Percepcion_iva) {
      updatedVenta.Percepcion_iva = payload.Percepcion_iva
    }
    if (payload.Total_venta) {
      updatedVenta.Total_venta = payload.Total_venta
    }
    if (payload.Total_cf) {
      updatedVenta.Total_cf = payload.Total_cf
    }
    if (payload.Retener_iva) {
      updatedVenta.Retener_iva = payload.Retener_iva
    }
    if (payload.Tipo_doc) {
      updatedVenta.Tipo_doc = payload.Tipo_doc
    }
    if (payload.Percibir_iva) {
      updatedVenta.Percibir_iva = payload.Percibir_iva
    }
    $axios.put(`${process.env.API}/updateventas/${payload.Codigo}/${state.user.uId}`, updatedVenta)
    .then(updatedVentaData => {
      console.log(updatedVentaData.data)
      if (!updatedVentaData.data.error) {
        commit('updateVenta', payload)
        commit('setLoading', false)
        commit('setError', { message: updatedVentaData.data.message, type: 'success' })
      } else {
        commit('setError', { message: updatedVentaData.data.message, type: 'error' })
        commit('setLoading', false)
      }
    })
    .catch(error => {
      commit('setError', { message: error.message, type: 'error' })
      commit('setLoading', false)
    })
  },
  deleteVenta ({commit, state}, payload) {
    commit('setLoading', true)
    $axios.delete(`${process.env.API}/deleteventa/${payload}/${state.user.uId}`)
    .then(deleteVentaData => {
      if (!deleteVentaData.data.error) {
        commit('deleteVenta', payload)
        commit('setError', { message: deleteVentaData.data.message, type: 'success' })
        commit('setLoading', false)
      } else {
        commit('setError', { message: deleteVentaData.data.message, type: 'error' })
        commit('setLoading', false)
      }
    })
    .catch(error => {
      console.log(error)
      commit('setError', { message: error.message, type: 'error' })
      commit('setLoading', false)
    })
  },
  loadAllVentas ({commit, state}) {
    commit('setLoading', true)
    $axios.get(`${process.env.API}/getallventas/${state.user.uId}`)
    .then(ventasData => {
      console.log(ventasData.data)
      commit('loadAllVentas', ventasData.data)
      commit('setLoading', false)
    })
    .catch(error => {
      commit('setLoading', false)
      commit('setError', { message: error.message, type: 'error' })
    })
  },
  saveNewVentaFactura ({commit, state}, payload) {
    commit('setLoading', true)
    $axios.post(`${process.env.API}/addnewventafactura/${state.user.uId}`, payload)
    .then(newVentaFacturaData => {
      console.log(newVentaFacturaData.data)
      if (!newVentaFacturaData.data.error) {
        const newVentaFactura = {
          Codigo: newVentaFacturaData.data.Id,
          Fecha: payload.Fecha,
          Num_caja: payload.Num_caja,
          Del_num: payload.Del_num,
          Al_num: payload.Al_num,
          Num_retencion: payload.Num_retencion,
          Monto_sinret: payload.Monto_sinret,
          Venta_exenta: payload.Venta_exenta,
          Venta_grabada: payload.Venta_grabada,
          Venta_export: payload.Venta_export,
          Total_venta: payload.Total_venta,
          Total_retencion: payload.Total_retencion,
          Tipo_doc: payload.Tipo_doc
        }
        commit('addNewVentaFactura', newVentaFactura)
        commit('setError', { message: newVentaFacturaData.data.message, type: 'success' })
        commit('setLoading', false)
      } else {
        commit('setError', { message: newVentaFacturaData.data.message, type: 'error' })
        commit('setLoading', false)
      }
    })
    .catch(error => {
      commit('setError', { message: error.message, type: 'error' })
      commit('setLoading', false)
      console.log(error.message)
    })
  },
  loadAllVentasFactura ({commit, state}) {
    commit('setLoading', true)
    $axios.get(`${process.env.API}/getallventasfactura/${state.user.uId}`)
    .then(allVentasFacturasData => {
      commit('loadAllVentasFactura', allVentasFacturasData.data)
      commit('setLoading', false)
    })
    .catch(error => {
      commit('setError', { message: error.message, type: 'error' })
      commit('setLoading', false)
      console.log(error.message)
    })
  },
  updateVentaFactura ({commit, state}, payload) {
    commit('setLoading', true)
    const updatedVentaFactura = {}
    if (payload.Fecha) {
      updatedVentaFactura.Fecha = payload.Fecha
    }
    if (payload.Num_caja) {
      updatedVentaFactura.Num_caja = payload.Num_caja
    }
    if (payload.Del_num) {
      updatedVentaFactura.Del_num = payload.Del_num
    }
    if (payload.Al_num) {
      updatedVentaFactura.Al_num = payload.Al_num
    }
    if (payload.Num_retencion) {
      updatedVentaFactura.Num_retencion = payload.Num_retencion
    }
    if (payload.Monto_sinret) {
      updatedVentaFactura.Monto_sinret = payload.Monto_sinret
    }
    if (payload.Venta_exenta) {
      updatedVentaFactura.Venta_exenta = payload.Venta_exenta
    }
    if (payload.Venta_grabada) {
      updatedVentaFactura.Venta_grabada = payload.Venta_grabada
    }
    if (payload.Venta_export) {
      updatedVentaFactura.Venta_export = payload.Venta_export
    }
    if (payload.Total_venta) {
      updatedVentaFactura.Total_venta = payload.Total_venta
    }
    if (payload.Total_retencion) {
      updatedVentaFactura.Total_retencion = payload.Total_retencion
    }
    if (payload.Tipo_doc) {
      updatedVentaFactura.Tipo_doc = payload.Tipo_doc
    }
    if (payload.Cod) {
      updatedVentaFactura.Cod = payload.Cod
    }

    $axios.put(`${process.env.API}/editventafactura/${payload.Cod}/${state.user.uId}`, updatedVentaFactura)
    .then(updatedVentaFacturaData => {
      console.log(updatedVentaFacturaData)
      if (!updatedVentaFacturaData.data.error) {
        updatedVentaFactura.Codigo = updatedVentaFacturaData.data.Codigo
        commit('updateVentaFactura', updatedVentaFactura)
        commit('setLoading', false)
        commit('setError', { message: updatedVentaFacturaData.data.message, type: 'success' })
      } else {
        commit('setError', { message: updatedVentaFacturaData.data.message, type: 'error' })
        commit('setLoading', false)
      }
    })
    .catch(error => {
      commit('setError', { message: error.message, type: 'error' })
      commit('setLoading', false)
      console.log(error.message)
    })
  },
  deleteVentaFactura ({commit, state}, payload) {
    commit('setLoading', true)
    $axios.delete(`${process.env.API}/deleteventafactura/${payload}/${state.user.uId}`)
    .then(deletedVentaFactura => {
      commit('deleteVentaFactura', payload)
      commit('setError', { message: deletedVentaFactura.data.message, type: 'success' })
      commit('setLoading', false)
    })
    .catch(error => {
      commit('setError', { message: error.message, type: 'error' })
      commit('setLoading', false)
      console.log(error.message)
    })
  },
  saveNewCompra ({commit, state}, payload) {
    commit('setLoading', true)
    $axios.post(`${process.env.API}/addnewcompra/${state.user.uId}`, payload)
    .then(newCompraData => {
      console.log(newCompraData.data)
      if (!newCompraData.data.error) {
        const compra = {
          Codigo: newCompraData.data.Id,
          Fecha_emision: payload.Fecha_emision,
          Fecha_registro: payload.Fecha_registro,
          Num_comprobante: payload.Num_comprobante,
          NRC: payload.NRC,
          Percibir_iva: payload.Percibir_iva,
          ImportacionEx: payload.ImportacionEx,
          InternasEx: payload.InternasEx,
          ImportacionGr: payload.ImportacionGr,
          InternasGr: payload.InternasGr,
          Iva_compras: payload.Iva_compras,
          Iva_percibido: payload.Iva_percibido,
          Total_compras: payload.Total_compras,
          Ret_terceros: payload.Ret_terceros,
          Tipo_doc: payload.Tipo_doc,
          No_contribuyentes: payload.No_contribuyentes
        }
        commit('addNewCompra', compra)
        commit('setError', { message: newCompraData.data.message, type: 'success' })
        commit('setLoading', false)
      } else {
        commit('setError', { message: newCompraData.data.message, type: 'error' })
        commit('setLoading', false)
      }
    })
    .catch(error => {
      commit('setError', { message: error.message, type: 'error' })
      commit('setLoading', false)
      console.log(error.message)
    })
  },
  loadAllCompras ({commit, state}) {
    commit('setLoading', true)
    $axios.get(`${process.env.API}/getallcompras/${state.user.uId}`)
    .then(allCompras => {
      commit('setLoading', false)
      commit('loadAllCompras', allCompras.data)
    })
    .catch(error => {
      commit('setError', { message: error.message, type: 'error' })
      commit('setLoading', false)
      console.log(error.message)
    })
  },
  logOut ({commit}) {
    localStorage.removeItem('s3pymses')
    commit('setUser', null)
  },
  clearError ({commit}) {
    commit('setError', null)
  }
}
