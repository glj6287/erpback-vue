import fetch from '@/utils/fetch';

/**
 * 租客账单计算
 * @param query
 */
export function getBill(query) {
  return fetch({
    url: "/common/getBill",
    method: "post",
    data: query
  });
}

/**
 * 上游账单
 * @param query
 */
export function getUpBill(query) {
  return fetch({
    // headers: {
    //   'Content-Type': 'application/json'
    // },
    url: "/common/getUpBill",
    method: "post",
    data: query
  });
}
