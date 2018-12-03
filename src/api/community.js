import fetch from '@/utils/fetch'

export function getCommunityList(query) {
    return fetch({
      url: `/community/communityListInfo`,
      method: 'post',
      data: query
    })
  }

  export function submitUserName(name) {
    return fetch({
      url: `/community/saveCommunityInfo`,
      method: 'post',
      data: {
        name
      }
    });
  }

  export function submitChangeName(id, name, version) {
    return fetch({
      url: `/community/updateCommunityInfo`,
      method: 'post',
      data: {
        id,
        name,
        version
      }
    });
  }


  export function deleteMenuBtn(id, version) {
    return fetch({
      url: `/community/deleCommunityInfo`,
      method: 'get',
      params: {
        id: id,
        version: version
      }
    });
  }
