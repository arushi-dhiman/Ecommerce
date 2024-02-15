import axios from "axios";
import { adminBaseUrl } from "../components/constant";
import { toast } from "react-toastify";

export default class ItemService {
	static async GetAllItemsById(currentPage, id) {
		return await axios.get(`${adminBaseUrl}/GetProductItems?PageNumber=${currentPage}&PageSize=5&ProductId=${id}`).then((res) => res)
	}

	static async GetAllItems(currentPage) {
		return await axios.get(`${adminBaseUrl}/GetProductItems?PageNumber=${currentPage}&PageSize=5`).then((res) => res)
	}

	static async CreateItem(formData) {
		return await axios.post(`${adminBaseUrl}/ProductItems`, formData).then((res) => res).catch(() => {
			toast.error('Not able to update')
		})
	}
	static async UpdateItem(formData, id) {
		return await axios.put(`${adminBaseUrl}/UpdateItems/${id}`, formData).then((res) => res)
			.catch(() => {
				toast.error('Not able to update')
			})
	}
	static async DeleteItem(id) {
		return await axios.delete(`${adminBaseUrl}/Items/${id}`).then((res) => {
			if (res.status === 200) {
				toast.success("Item deleted")
			}
		})
			.catch(() => {
				toast.error('Error! Cannot delete')
			})
		}
		static async SearchItemById(searchTerm, prodId) {
			return await axios.get(`${adminBaseUrl}/GetProductItems?SearchTerm=${searchTerm}&ProductId=${prodId}`).then((res) => res)
			.catch(() => {
				toast.error('No Item found')
			})
		}
		static async SearchItem(searchTerm) {
			return await axios.get(`${adminBaseUrl}/GetProductItems?SearchTerm=${searchTerm}`).then((res) => res)
			.catch(() => {
				toast.error('No Item found')
			})
		}
	

}