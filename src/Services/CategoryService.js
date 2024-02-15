import axios from "axios";
import { adminBaseUrl } from "../components/constant";
import { toast } from "react-toastify";

export default class CategoryService {

	static async GetAllCategory() {
		return await axios.get(`${adminBaseUrl}/GetAll`).then((res) => res).catch((error) => {
			console.error(error)
		})
	}

	static async CreateCategory(formData) {
		return await axios.post(`${adminBaseUrl}/UploadImage`, formData).then((res) => res).catch((error) => {
			console.error(error)
		})
	}

	static async UpdateCategory(formData, id) {
		return await axios.put(`${adminBaseUrl}/${id}`, formData).then((res) => res).catch((error) => {
			console.error(error)
		})
	}

	static async DeleteCategory(id) {
		return await axios.delete(`${adminBaseUrl}/${id}`).then((res) => {
			if (res.status === 200) {
				toast.success("Category deleted")
			}
		})
			.catch(() => {
				toast.error('Error! Cannot delete')
			})

	}
}