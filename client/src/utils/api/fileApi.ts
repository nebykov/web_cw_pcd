import axios from "axios"
import { IFile, IUploadFile } from "../../types/types"
import { AppDispatch } from '../../store';
import { addFile, setFiles } from "../../store/reducers/fileSlice";
import { addUploadFile, changeUploadFile, showUploader } from "../../store/reducers/uploadSlice";
import { setUser } from "../../store/reducers/userSlice";



export const getFiles = (dirId: string, sortBy: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            let url = 'http://localhost:8000/files';
            if (sortBy) {
               url = `http://localhost:8000/files?sort=${sortBy}` 
            } 
            if (dirId) {
                url = `http://localhost:8000/files?parent=${dirId}`
            }
            if (dirId && sortBy) {
                url = `http://localhost:8000/files?parent=${dirId}&sort=${sortBy}`
            }
            const { data } = await axios.get(url, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
            return dispatch(setFiles(data))
        } catch (e) {
            throw e
        }
    }
}

export const createDir = async (name: string, dirId: string): Promise<IFile> => {
    try {
        const { data } = await axios.post('http://localhost:8000/files/create', {name, parent_id: dirId}, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
        return data
    } catch (e) {
        throw e
    }
}


export const uploadFile = (file: File, dirId: string) => {
      return async (dispatch: AppDispatch) => {
        try {
            const formData = new FormData()
            formData.append('file', file);
            if (dirId) {
                formData.append('parent_id', dirId)
            }

            const fileObject: IUploadFile = {id: Date.now(), name: file.name , progress: 0}
            dispatch(addUploadFile(fileObject))
            dispatch(showUploader())
            console.log(dirId, localStorage.getItem('token'))
            const { data } = await axios.post('http://localhost:8000/files/upload', 
            formData, 
            {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
            onUploadProgress: (progresEvent) => {
                if (progresEvent.total) {
                    const loadProgress = Math.round((progresEvent.loaded / progresEvent?.total) * 100)
                    const progressObject = {...fileObject, progress: loadProgress}
                    dispatch(changeUploadFile(progressObject))
                }
            }
        })

        

            dispatch(addFile(data))
        } catch (e) {
            throw e
        }
      }
}

export const setAvatar = (avatar: File, loading: Function) => {
      return async (dispatch: AppDispatch) => {
        loading(true)
        try {
            const formData = new FormData()
            formData.append('avatar', avatar)
           const {data} = await axios.post(`http://localhost:8000/files/avatar`, formData, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
           dispatch(setUser(data))
        } catch (e) {
            throw e
        }
        loading(false)
      }
}

export const downloadFile = async (file: IFile) => {
    await axios.get(`http://localhost:8000/files/download/${file.id}`, 
    {responseType: 'blob', headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
    .then((res) => {
     const url = window.URL.createObjectURL(new Blob([res.data]));
     const link = document.createElement('a');
     link.href = url
     link.setAttribute('download', file.name)
     document.body.appendChild(link)
     link.click()
    }).catch(e => {
        throw e
    })
}


export const deleteFile = async (file: IFile)=> {
  try {
    const {data} = await axios.delete(`http://localhost:8000/files/delete/${file.id}`, 
    {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
    return data
  } catch(e) {
    throw e
  }
}


export const searchFiles = (query: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            const {data} = await axios.get(`http://localhost:8000/files/search?query=${query}`, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
            dispatch(setFiles(data))
       } catch (e) {
          throw e
       }
    }
}