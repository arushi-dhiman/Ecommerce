import axios from "axios"
import { userBaseUrl } from "../components/constant"
import { toast } from "react-toastify"

export default class CartService{
    static async GetCartItemsByUserId(userId) {
		return await axios.get(`${userBaseUrl}/GetCartItems?userId=${userId}`).then((res) => res).catch((error) => {
			console.error(error)
		})
	}
    static async AddItemsToCart(products) {
		return await axios.post(`${userBaseUrl}/AddToCart`, products).then((res) => res).catch((error) => {
			console.error(error)
		})
	}
    static async RemoveFromCart(id) {
		return await axios.delete(`${userBaseUrl}/RemoveFromCart?id=${id}`).then((res) => res).catch((error) => {
			console.error(error)
		})
	}
    
    static async UpdateQuantity(id, quantity) {

		return await axios.put(`${userBaseUrl}/UpdateQuantity?id=${id}`,quantity).then((res)  => res).catch(() => {
				toast.error('Not able to update')
			})
	}
}