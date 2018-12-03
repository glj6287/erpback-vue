import fetch from '@/utils/fetch'

export function downList(query) {
  return fetch({
    url: '/taskagent/downlistbypage',
    method: 'get',
    params: query
  });
}

