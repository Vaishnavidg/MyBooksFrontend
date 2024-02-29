import axios, { AxiosResponse } from "axios";
import { Key } from "react";

export interface IBook {
    // map(arg0: (book: any, index: any) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode;
    _id: string | null | undefined
    title: string;
    author: string;
    publishYear: number;
  
}
interface FormData {
    title: string;
    author: string;
    publishYear: number; 
  }

export interface Book {
    title: string;
    author: string;
    publishYear: number;
    createdAt:string;
    updatedAt:string;
    // description: string;
}

const apiUrl = 'http://localhost:8000/'

class BookApi {
    async getAllBookDetails() {
        try {
            // Perform the GET request for get Books Details
            const response = await axios.get<IBook[]>(`${apiUrl}books`);
            // console.log(response);
            return response.data;
        } catch (error: any) {
            console.log(error.message);
            throw error; 
        }
    }

    async AddBookDetails(FormData: FormData) {
        try {
            // Perform the GET request for get Books Details
            const response = await axios.post(`${apiUrl}books`,FormData);
            console.log(response);
            return response.data;
        } catch (error: any) {
            console.log(error.message);
            throw error; 
        }
    }
    async UpdateBookDetail(FormData: FormData,id:string | null | undefined) {
        try {
            // Perform the GET request for get Books Details
            const response = await axios.put(`${apiUrl}books/${id}`,FormData);
            console.log(response);
            return response.data;
        } catch (error: any) {
            console.log(error.message);
            throw error; 
        }
    }
    async  getBookDetails(id: string): Promise<IBook[]> {
        try {
          const response = await axios.get<IBook[]>(`${apiUrl}books/${id}`);
          return response.data;
        } catch (error: any) {
          console.log(error.message);
          throw error;
        }
      }
      async DeletBook(id: string | null | undefined) {
        try {
            // Perform the GET request for get Books Details
            const response = await axios.delete(`${apiUrl}books/${id}`);
            console.log(response);
            return response.data;
        } catch (error: any) {
            console.log(error.message);
            throw error; 
        }
    }
}
export const bookApi = new BookApi();