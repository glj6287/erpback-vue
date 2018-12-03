import fetch from '@/utils/fetch'
import fetchFile from '@/utils/fetchFile'

/**
 * 应付账单查询
 * @param query
 */
export function selectPayBillInfo(query) {
  return fetch({
    url: "/upBill/selectPayBillInfo",
    method: "post",
    data: query
  });
}

/**
 * 应付账单导出
 * @param query
 */
export function exportUpPayBill(query) {
  return fetchFile({
    url: "/upBill/exportUpPayBill",
    method: "post",
    data: query
  });
}

/**
 * 上游会员费账单查询
 * @param query
 */
export function selectReceivableBilInfo(query) {
  return fetch({
    url: "/upBill/selectReceivableBilInfo",
    method: "post",
    data: query
  });
}

/**
 * 上游会员费销账
 * @param query
 */
export function receiChargeOffBill(data) {
  return fetch({
    url: "/upBill/receiChargeOffBill",
    method: "post",
    data: data
  });
}

/**
 * 下游/租客账单查询
 * @param query
 */
export function selectTenantBillInfo(query) {
  return fetch({
    url: "/downBill/selectTenantBillInfo",
    method: "post",
    data: query
  });
}

/**
 * 下游/租客账单详情查询
 * @param query
 */
export function tenantBillInfoDetail(query) {
  return fetch({
    url: "/downBill/tenantBillInfoDetail",
    method: "post",
    data: query
  });
}

/**
 * 下游/租客账单详情查询
 * @param query
 */
export function selectTenantsReceRecords(query) {
  return fetch({
    url: "/downBill/selectTenantsReceRecords",
    method: "post",
    data: query
  });
}
/**
 * 下游应收账单销账
 * @param data
 */
export function dsReceiChargeOffBill(data) {
  return fetch({
    url: "/downBill/dsReceiChargeOffBill",
    method: "post",
    data: data
  });
}

/**
 * 上游账单销账（单个销账）
 * @param data
 */
export function saveUpPayableRecord(data) {
  return fetch({
    url: "/upBill/saveUpPayableRecord",
    method: "post",
    data: data
  });
}

/**
 * 上游账单修改应付总额
 * @param data
 */
export function updateUpPayableMoney(data) {
  return fetch({
    url: "/upBill/updateUpPayableMoney",
    method: "post",
    data: data
  });
}

/**
 * 下游获取所有的支付方名称
 */
export function selectPayNameAll() {
  return fetch({
    url: "/downBill/selectPayNameAll",
    method: "get"
  });
}
