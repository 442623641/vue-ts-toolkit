import request from './http'

export class Http {
  static get(url: string, body?: any, showMessage?): Promise<any> {
    return request(<any>{
      url: url,
      method: 'get',
      params: body || {},
      showMessage
    })
  }

  static request(url: string, method: any, body?: any) {
    return request(<any>{
      url: url,
      method: method || 'post',
      data: body || {}
    })
  }

  static post(url: string, body?: any): Promise<any> {
    return this.request(url, 'post', body)
  }

  static put(url: string, body?: any): Promise<any> {
    return this.request(url, 'put', body)
  }

  static delete(url: string, body?: any): Promise<any> {
    return this.request(url, 'delete', body)
  }
  static download(url, body, fileName) {
    return request({
      method: 'get',
      url,
      params: body || {},
      responseType: 'blob'
    }).then((res: any) => {
      if (!res) {
        return
      }
      let url = window.URL.createObjectURL(new Blob([res]))
      let link = document.createElement('a')
      // link.style.display = 'none'
      link.href = url
      link.setAttribute('download', fileName)
      // document.body.appendChild(link)
      link.click()
      window.URL.revokeObjectURL(url);
    })
  }
}
