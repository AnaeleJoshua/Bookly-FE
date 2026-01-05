import { Button} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom";



function UpdateBookBtn(props: { id: number }) {
const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/update-book/${props.id}`);
  }


  return (
    <Button onClick={handleClick}>
      {'UPDATE BOOK'}
    </Button>
  );
}

export default UpdateBookBtn;