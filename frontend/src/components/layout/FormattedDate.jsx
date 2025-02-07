import { format } from "date-fns";

const FormattedDate = ({date}) => {
  return (
    <p className="text-xs opacity-70">{format(new Date(date), "dd-MM-yyyy HH:mm")}</p>
  )
}

export default FormattedDate