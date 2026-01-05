import { Button} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom";

function CreateBookBtn() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/create-book");
  }

  return (
    <Button onClick={handleClick} >
      {'CREATE BOOK'}
    </Button>
  );
}

export default CreateBookBtn;