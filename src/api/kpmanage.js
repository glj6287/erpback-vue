import fetch from "@/utils/fetch";
import fetchFile from "@/utils/fetchFile";

export function selectByKpTotal(query) {
  return fetch({
    url: "/kptotal/selectByKpTotal",
    method: "post",
    data: query
  });
}

export function modifyKpTotal(data) {
  return fetch({
    url: "/kptotal/modifyKpTotal",
    method: "post",
    data: data
  });
}

export function delKpTotal(id) {
  return fetch({
    url: "/kptotal/delKpTotal",
    method: "post",
    params: {
      id: id
    }
  });
}

export function addKpTotal(data) {
  return fetch({
    url: "/kptotal/addKpTotal",
    method: "post",
    data: data
  });
}
export function houseImport(query) {
  return fetch({
    url: "/kptotal/houseCodeImport",
    method: "post",
    data: query
  });
}

export function checkPass(id) {
  return fetch({
    url: "/kptotal/checkPass",
    method: "post",
    params: {
      id: id
    }
  });
}

export function checkRefuse(id) {
  return fetch({
    url: "/kptotal/checkRefuse",
    method: "post",
    params: {
      id: id
    }
  });
}

export function exportKpTotal(query) {
  return fetchFile({
    url: "/kptotal/export",
    method: "post",
    data: query
  });
}

// 开票明细页面接口

export function selectByKpMxTotal(query) {
  return fetch({
    url: "/kpdetails/selectByKpDetails",
    method: "post",
    data: {
      houseCode: query.houseCode,
      company: query.company,
      kpState: query.kpState,
      areaname: query.areaname,
      wuyeAddress: query.wuyeAddress,
      kpdayBegin: query.kpdayBegin,
      kpdayEnd: query.kpdayEnd,
      page: query.page,
      pageSize: query.pageSize
    }
  });
}

/**
 * 导出开票明细功能
 */
export function exportExcelDetail(query) {
  return fetchFile({
    url: `/anchor/exportAnchor`,
    method: "get",
    params: query
  });
}

//下载开票明细
export function downloadFileTable(ids, kpstyle) {
  return fetchFile({
    url: "/kpdetails/downKpDetails",
    method: "post",
    data: {
      ids: ids,
      kpstyle: kpstyle
    }
  });
}

//下载付款通知书
export function downloadFkFileTable(ids, kpstyle) {
  return fetchFile({
    url: "/kpdetails/downPayNotice",
    method: "post",
    data: {
      ids: ids,
      kpstyle: kpstyle
    }
  });
}

//下载快递明细
export function downloadKdFileTable(ids, kpstyle) {
  return fetchFile({
    url: "/kpdetails/downSend",
    method: "post",
    data: {
      ids: ids,
      kpstyle: kpstyle
    }
  });
}

//查看row当前行的详情内容
export function examineDetails(rowId) {
  return fetch({
    url: "/kpdetails/selectById",
    method: "post",
    data: {
      id: rowId
    }
  });
}

//应开票日期修改
export function fnOughtDay(ids, kpdays) {
  return fetch({
    url: "/kpdetails/modifyKpday",
    method: "post",
    data: {
      id: ids,
      kpday: kpdays
    }
  });
}

//修改发票
export function fnChangekpdetails(ids, query) {
  return fetch({
    url: "/kpdetails/modifyFpNum",
    method: "post",
    data: {
      id: ids,
      fpNum: query.fpNum,
      realKpday: query.realKpday
    }
  });
}

//退租
export function fnChangeTzdetails(query) {
  return fetch({
    url: "/kpdetails/modifyExit",
    method: "post",
    data: {
      houseCode: query.houseCode,
      kpfirst: query.kpfirst,
      exitdate: query.exitdate,
      permonth: query.permonth,
      realpermonth: query.realpermonth,
      firstdate: query.firstdate
    }
  });
}
//修改类别接口
export function fnGetUpdateList() {
  return fetch({
    url: "/kpdetails/kpModifyItems",
    method: "post"
    // data
  });
}

// 开票明细-修改开票详情信息
export function fnModificationPort(query) {
  return fetch({
    url: "/kpdetails/modifyKpDetails",
    method: "post",
    data: {
      houseCode: query.houseCode,
      kpfirst: query.kpfirst,
      modifyItem: query.modifyItem,
      modifyVal: query.modifyVal,
      modifyType: query.modifyType
    }
  });
}

// 下载模板
export function downTemplate(type) {
  return fetchFile({
    url: "/kpdetails/downTemplate",
    method: "get",
    params: {
      type: type
    }
  });
}
