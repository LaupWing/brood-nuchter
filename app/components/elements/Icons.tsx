import type { IconType } from "react-icons"
import { AiOutlineInfoCircle } from "react-icons/ai"
import { BsTrashFill } from "react-icons/bs"

export const IconInfo:IconType = (props) => (
   <AiOutlineInfoCircle
      {...props} 
   />
)

export const IconTrashcan:IconType = (props) => (
   <BsTrashFill
      {...props} 
   />
)