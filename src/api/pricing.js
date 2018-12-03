import fetch from "@/utils/fetch";

export function pricingList(qeury) {
  return fetch({
    url: "/pricing/findPricingInfo",
    method: "post",
    data: qeury
  });
}
