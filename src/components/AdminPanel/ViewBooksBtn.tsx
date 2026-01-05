import { useNavigate } from 'react-router-dom';
import { Button} from "@chakra-ui/react"

interface ViewBooksButtonProps {
  children?: React.ReactNode;
}

export const ViewBooksButton = ({ children }: ViewBooksButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // You can add logic here (e.g., analytics) before navigating
    navigate('/books');
  };

  return (
    <Button 
      onClick={handleClick}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
    >
      {children || 'VIEW BOOKS'}
    </Button>
  );
};