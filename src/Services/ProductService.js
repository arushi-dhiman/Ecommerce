import axios from "axios";
import { adminBaseUrl } from "../components/constant";
import { toast } from "react-toastify";

export default class ProductService {
	static async GetAllProductById(currentPage, id) {
		return await axios.get(`${adminBaseUrl}/GetProducts?PageNumber=${currentPage}&PageSize=10&CategoryId=${id}`).then((res) => res)
	}

	static async GetAllProduct(currentPage) {
		return await axios.get(`${adminBaseUrl}/GetProducts?PageNumber=${currentPage}&PageSize=10`).then((res) => res)
	}

	static async GetProducts(){
		return await axios.get(`${adminBaseUrl}/GetProducts`).then((res)=>res).catch((error)=>{
			console.log(error)
		})
	}
	static async CreateProduct(formData) {
		return await axios.post(`${adminBaseUrl}/Products`, formData).then((res) => res).catch(() => {
			toast.error('Not able to update')
		})
	}
	static async UpdateProduct(formData, id) {
		return await axios.put(`${adminBaseUrl}/UpdateProducts/${id}`, formData).then((res) => res)
			.catch(() => {
				toast.error('Not able to update')
			})
	}
	static async DeleteProduct(id) {
		return await axios.delete(`${adminBaseUrl}/Products/${id}`).then((res) => {
			if (res.status === 200) {
				toast.success("Product deleted")
			}
		})
			.catch(() => {
				toast.error('Error! Cannot delete')
			})
		}
		static async SearchProductById(searchTerm, catId) {
			return await axios.get(`${adminBaseUrl}/GetProducts?SearchTerm=${searchTerm}&CategoryId=${catId}`).then((res) => res)
			.catch(() => {
				toast.error('No product found')
			})
		}
		static async SearchProduct(searchTerm) {
			return await axios.get(`${adminBaseUrl}/GetProducts?SearchTerm=${searchTerm}`).then((res) => res)
			.catch(() => {
				toast.error('No product found')
			})
		}
	

}