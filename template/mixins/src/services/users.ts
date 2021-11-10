
import { Http } from '@/http'
export class UsersService {

  static login(data) {
    // return Http.post('login', data)
    return Promise.resolve('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNjYjFiZGZjLWQwYjQtNDFiNC04MTBhLTkwZGU0OWQ1YTU5NiIsIm5hbWUiOiLmgLvmoKHplb8iLCJwaG9uZSI6IjE4ODg4ODg4ODg4Iiwicm9sZSI6IueuoeeQhuWRmCIsInJvbGVDb2RlIjoiOCIsImNvbGxlZ2VJZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCIsImZhY3VsdHlJZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCIsImNsYXNzSWQiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAiLCJjb2xsZWdlTmFtZSI6IiIsImZhY3VsdHlOYW1lIjoiIiwiY2xhc3NOYW1lIjoiIiwiZXhwIjoxNjM1ODM1MTU3fQ.wRxqGf-fm0hdf58CwgGGV0gdzKzVapQmXX1Ce8Y2FX8')
  }

  static items(data) {
    // return Http.get('User/pages', data)
    return Promise.resolve({ "recordCount": 14, "data": [{  "id": "5a374833-3dbf-4ff1-a8a5-59a6c7de1755", "name": "小平", "phone": "13333333333", "role": 3, "roleName": "admin",  "createTime": "2021-10-21 12:12:17", "enable": 1 }, {  "id": "fa42a90f-fd17-428e-b1d1-8b23599d0e69", "name": "汪CV", "phone": "18812345678", "role": 6, "roleName": "viewer", "createTime": "2021-10-16 22:24:38", "enable": 1 }, { "id": "1218ab8e-99c6-434e-9192-9e6b698bf13c", "name": "李小A3", "phone": "13688777777", "role": 2, "roleName": "editor", "collegeId": "22e6de49-ad8e-4634-9561-2978dff876fd", "facultyId": "dadf13c2-f596-4f77-bc3a-59230e318001", "classId": "96e23295-9e54-4c63-b0b0-906e67b81a20", "createTime": "2021-10-14 11:03:56", "enable": 1 }, {  "id": "d6634fbe-7018-4e91-b17a-b11de196373d", "name": "李小A2", "phone": "13688666666", "role": 3, "roleName": "admin", "createTime": "2021-10-14 10:55:12", "enable": 1 }, { "power": "三信学院挖掘机工程", "id": "d63d702a-66f4-4fe0-aee4-ec9b65d407c8", "name": "李小A", "phone": "13955668855", "role": 3, "roleName": "admin", "collegeId": "45ee0c73-be69-4ecb-8f16-34f068291269", "facultyId": "66dca3ba-3dc5-4ae0-83fb-8021d385ceb2", "classId": "00000000-0000-0000-0000-000000000000", "createTime": "2021-10-14 10:50:06", "enable": 1 }, {"id": "f9aefc32-1ea2-436b-b9d5-fd1070940c56", "name": "李AB", "phone": "15255468861", "role": 5, "roleName": "agent", "collegeId": "fef9ef60-68e9-4bbc-b608-f2e7c2dcc5d1", "facultyId": "00000000-0000-0000-0000-000000000000", "classId": "00000000-0000-0000-0000-000000000000", "createTime": "2021-10-14 10:41:48", "enable": 1 }, {  "id": "b1a5cfeb-c56c-4fb8-bd84-9cc46974a8af", "name": "张AA", "phone": "15255468860", "role": 2, "roleName": "editor",  "createTime": "2021-10-07 09:57:59", "enable": 1 }, {  "id": "f6cd1b99-e569-470b-a885-82bd6d0ae21b", "name": "李小B", "phone": "16666666666", "role": 4, "roleName": "auditor", "createTime": "2021-10-06 22:05:12", "enable": 1 }, {  "id": "80442fdc-11e3-4251-9452-16e5e40c17c3", "name": "张三", "phone": "13855556666", "role": 2, "roleName": "editor", "createTime": "2021-10-05 08:37:16", "enable": 1 }, { "power": "七星学院化学专业化学一班【19届】", "id": "c5a11f49-f9af-4750-b6ec-862e48beac9c", "name": "editor", "phone": "12345678912", "role": 3, "roleName": "admin", "collegeId": "18573b89-6d70-443f-ae57-890c84707df9", "facultyId": "7546fe0e-c168-47ef-aa28-03a0f332a243", "classId": "1fd24ea8-a7fe-4e2b-acf7-16d405e337db", "createTime": "2021-10-04 02:39:52", "enable": 1 }], "pageIndex": 1, "pageCount": 2, "pageSize": 10 })
  }

  static update(item: any) {
    return Http.post('User/Account', item)
  }

  static setState(id, state) {
    return Promise.resolve({ id, state })
  }
}
