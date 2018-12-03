import fetch from "@/utils/fetch";

//更新金蝶核算项目
export function getJdUpdateList(year) {
  return fetch({
    url: "/kingdee/updateKingdeeCode",
    method: "get",
    params: {
      year: year
    }
  });
}

//金蝶数据库名设置-查询
export function getDataNameConfig(year) {
  return fetch({
    url: "/kingdee/queryDbName",
    method: "post",
    data: {
      year: year
    }
  });
}
//金蝶数据库名设置-新增
export function fnAddBaseUpdate(user) {
  return fetch({
    url: "/kingdee/addDbName",
    method: "post",
    data: {
      year: user.year,
      name: user.name
    }
  });
}

//凭证下载-计提主营业务成本
export function exportMainBussCost(voucherDate) {
  return fetch({
    url: "/voucher/exportMainBussCost",
    method: "get",
    params: {
      voucherDate: voucherDate
    }
  });
}
