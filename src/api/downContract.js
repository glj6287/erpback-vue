import fetch from '@/utils/fetch'
import fetchFile from '@/utils/fetchFile'

export function pcDscontractList(query) {
  return fetch({
    url: '/dsController/pcDscontractList',
    method: 'get',
    params: query
  });
}

export function downcontractDetail(dsContractCode) {
  return fetch({
    url: `/dsController/getContractInfo/${dsContractCode}`,
    method: 'get'
  });
}

export function downcontractLogger(dsContractCode) {
  return fetch({
    url: `/dsController/getLoggerInfo/${dsContractCode}`,
    method: 'get'
  });
}

export function submitAudit(aduit) {
  if (aduit.auditresult === 1) {
    return auditSuccess(aduit);
  } else if (aduit.auditresult === 2) {
    return auditRefuse(aduit);
  } else {
    alert("请选择审核结果！");
  }
}

export function auditSuccess(aduit) {
  return fetch({
    url: `/dsController/pass`,
    method: 'post',
    data: { dsContractCode:aduit.dsContractCode, version:aduit.version ,depict:aduit.depict}
  });
}

export function auditRefuse(aduit) {
  return fetch({
    url: `/dsController/turnDown`,
    method: 'post',
    data: { dsContractCode:aduit.dsContractCode, turnDownDepict:aduit.turnDownDepict, version:aduit.version }
  });
}
export function updateRecordStatus(dsContractCode, version) {
  return fetch({
    url: `/dsController/record/${dsContractCode}`,
    method: 'post',
    data: { version: version }
  });
}

export function getDsContract(dsContractCode) {
  return fetch({
    url: `/dsController/getDsContract/${dsContractCode}`,
    method: 'post'
  });
}

export function getPledge(pledgeCode) {
  return fetch({
    url: `/dsController/getPledge/${pledgeCode}`,
    method: 'get'
  });
}

export function getTenantsBill(dsContractCode) {
  return fetch({
    url: `/dsController/getTenantsBill/${dsContractCode}`,
    method: 'get'
  });
}

export function saveAndUpdateDownPledge(downPledgeVo) {
  return fetch({
    url: `/dsController/saveAndUpdateDownPledge`,
    method: 'post',
    data: downPledgeVo
  });
}

export function getDownPledge(dsContractCode) {
  return fetch({
    url: `/dsController/getDownPledge/${dsContractCode}`,
    method: 'get'
  });
}

export function exportDsContract(query){
  return fetchFile({
    url: '/dsController/exportDsContract',
    method: 'get',
    params: query
  });
}
