
import axios from 'axios'

const defaultConfig = {
  timeout: 2500,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
}

function interceptorRequestSuccess(config) {
  return config;
}

function interceptorRequestError(error) {
  return Promise.reject(error);
}

function interceptorResponseSuccess(response) {
  return response;
}

function interceptorResponseError(error) {
  return Promise.reject(error);
}

function uploadProgress(progressEvent) {

}

function downloadProgress(progressEvent) {

}

const getInstance = (config = defaultConfig) => {

  let _instance = axios.create({
    ...config,
    onUploadProgress: uploadProgress,
    onDownloadProgress: downloadProgress
  })

  _instance.interceptors.request.use(interceptorRequestSuccess, interceptorRequestError);
  _instance.interceptors.response.use(interceptorResponseSuccess, interceptorResponseError);

  return _instance
}

export const instance = getInstance;