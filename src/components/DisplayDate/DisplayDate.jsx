import { format, parseISO } from "date-fns";

function DisplayDate({date}) {
    const parseDate = parseISO(date)
    const formatDate = format(parseDate,"dd/MM/yyyy")
    return  <>
        {formatDate}
    </> ;
}

export default DisplayDate;