import { Button, } from "@chakra-ui/react";
import { useMutation } from "@apollo/client/react";
import { DELETE_BOOK } from "../queries/deleteMutation";
 import toast from "react-hot-toast";
function DeleteBookBtn({ id }: { id: number }) {
 

  const [deleteBook, { loading }] = useMutation(DELETE_BOOK, {
    variables: { id },

    // ✅ Refresh books table
    refetchQueries: ["GetBooks"],
    awaitRefetchQueries: true,

    // ✅ Success feedback
    onCompleted: () => {
      toast.success("Book deleted successfully!");
    },

    // ❌ Error feedback
    onError: (error) => {
      toast.error(error.message || "Failed to delete book");
    },
  });

  const handleClick = () => {
    deleteBook();
  };

  return (
    <Button
      colorScheme="red"
      size="sm"
      onClick={handleClick}
      isLoading={loading}
      loadingText="Deleting"
    >
      DELETE BOOK
    </Button>
  );
}

export default DeleteBookBtn;
