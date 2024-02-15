
import {FaBoxes, FaUsers} from 'react-icons/fa'
import {IoAnalyticsSharp} from 'react-icons/io5'
import { MdBorderColor,MdOutlineProductionQuantityLimits } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import {AiFillDashboard, AiFillHeart} from "react-icons/ai"


export const SidebarData = [
   

    {
        title: "Dashboard",
        icon: <AiFillDashboard size={24}/>,
        link: "dashboard"
    },
    {
        title : "Categories",
        icon: <BiSolidCategoryAlt size={24}/>,
        link: "category"
    },
    {
        title: "Manage Products",
        icon: <FaBoxes     size={24}/>,
        link: "products"
    },
    {
        title: "Manage Items",
        icon: <AiFillHeart size={24}/>,
        link: "items"
    },
    
    {
        title: "Manage Customers",
        icon: <FaUsers size={24}/>,
        link: "customers"
    },
   
  
    {
        title: "Analytics",
        icon: <IoAnalyticsSharp size={24}/>,
        link: "analytics"
    }

]