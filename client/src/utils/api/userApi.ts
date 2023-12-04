import axios from "axios";
import { IResponse } from "../../types/types";



export const login = async (email: string, password: string): Promise<IResponse> => {
   try {
      const { data } = await axios.post('http://localhost:8000/auth/login', { email, password })
      localStorage.setItem('token', data.token)
      return data
   } catch (error) {
      console.log(error)
      throw error
   }
}

export const registration = async (email: string, password: string): Promise<IResponse> => {
   try {
      const { data } = await axios.post('http://localhost:8000/auth/registration', { email, password })
      localStorage.setItem('token', data.token)
      return data
   } catch (error) {
      throw error
   }
}


export const auth = async (): Promise<IResponse> => {
   try {
      const { data } = await axios.get('http://localhost:8000/auth/auth', {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
      localStorage.setItem('token', data.token)
      return data
   } catch (error) {
      throw error
   }
}