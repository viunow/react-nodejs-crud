import http from '../http-common';

class UsuarioDataService {
  getAll() {
    return http.get("/cadastros");
  }

  get(id) {
    return http.get(`/cadastros/${id}`);
  }

  create(data) {
    return http.post("/cadastros", data);
  }

  update(id, data) {
    return http.put(`/cadastros/${id}`, data);
  }

  delete(id) {
    return http.delete(`/cadastros/${id}`);
  }

  deleteAll() {
    return http.delete(`/cadastros`);
  }

  findOne(nome) {
    return http.get(`/cadastros?nome=${nome}`);
  }

  // upload(file, onUploadProgress) {
  //   let formData = new formData();
    
  //   formData.append("file", file);

  //   return http.post("/cadastros", formData, {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //     onUploadProgress,
  //   });
  // }

  // getFiles() {
  //   return http.get("/cadastros");
  // }

}

export default new UsuarioDataService();