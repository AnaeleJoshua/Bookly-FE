import {
  Box,
  Stack,
  Input,
  Textarea,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";
import { Field, Fieldset } from "@chakra-ui/react";
import { useMutation, useQuery } from "@apollo/client/react";
import { UPDATE_BOOKS } from "../queries/updateBookMutation";
import { GET_BOOKS,GET_BOOK } from "../queries/queries";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

type UpdateBookResponse = {
  updateBook: {
    id: number;
    title: string;
    description: string;
  };
};
type GetBookResponse = {
  book: {
    id: number;
    title: string;
    description: string;
  };
};


const UpdateBookForm = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const bookId = Number(id);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  /* -------------------- SAFETY CHECK -------------------- */
  if (!bookId) {
    toast.error("Invalid book ID");
    navigate("/books");
    return null;
  }

  /* -------------------- FETCH BOOK BY ID -------------------- */
  const { data, loading: fetching } = useQuery<GetBookResponse>(GET_BOOK, {
    variables: { id: bookId },
  });

  useEffect(() => {
    if (data?.book) {
      setTitle(data.book.title);
      setDescription(data.book.description);
    }
  }, [data]);

  /* -------------------- UPDATE MUTATION -------------------- */
  const [updateBook, { loading }] = useMutation<UpdateBookResponse>(
    UPDATE_BOOKS,
    {
      refetchQueries: [{ query: GET_BOOKS }],
      awaitRefetchQueries: true,
      onCompleted: () => {
        toast.success("Book updated successfully!");
        navigate("/books");
      },
      onError: (err:any) => {
        toast.error(err.message || "Failed to update book");
      },
    }
  );

  /* -------------------- SUBMIT HANDLER -------------------- */
  function updateBookHandler(event: React.FormEvent) {
    event.preventDefault();

    if (!title.trim() && !description.trim()) {
      toast.error("Please update at least one field");
      return;
    }

    updateBook({
      variables: {
        id: bookId,
        title,
        description,
      },
    });
  }

  /* -------------------- LOADING STATE -------------------- */
  if (fetching) {
    return (
      <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
        <Text color="white">Loading book...</Text>
      </Box>
    );
  }

  /* -------------------- UI -------------------- */
  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="rgba(20, 20, 20, 0.8)"
      px={4}
    >
      <Box
        w="full"
        maxW="md"
        bg="rgba(90, 95, 90, 0.3)"
        shadow="md"
        borderRadius="lg"
        p={6}
      >
        {/* Header */}
        <Box mb={6} textAlign="center">
          <Heading size="md" color="white" mb={2}>
            Update Book
          </Heading>
          <Text fontSize="sm" color="gray.200">
            Update an existing book in your collection
          </Text>
        </Box>

        {/* Form */}
        <form onSubmit={updateBookHandler}>
          <Fieldset.Root size="lg">
            <Fieldset.Content>
              <Stack>
                <Field.Root>
                  <Field.Label color="white">Title</Field.Label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    borderColor="white"
                    color="white"
                    _placeholder={{ color: "gray.300" }}
                    _hover={{ borderColor: "blue.400" }}
                    _focus={{
                      borderColor: "blue.400",
                      boxShadow: "0 0 0 1px #63B3ED",
                    }}
                    bg="transparent"
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label color="white">Description</Field.Label>
                  <Field.HelperText color="gray.300">
                    Short summary of the book
                  </Field.HelperText>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    resize="vertical"
                    borderColor="white"
                    color="white"
                    _placeholder={{ color: "gray.300" }}
                    _hover={{ borderColor: "blue.400" }}
                    _focus={{
                      borderColor: "blue.400",
                      boxShadow: "0 0 0 1px #63B3ED",
                    }}
                    bg="transparent"
                  />
                </Field.Root>

                <Button
                  type="submit"
                  colorScheme="blue"
                  size="md"
                  alignSelf="flex-end"
                  loading={loading}
                >
                  Update Book
                </Button>
              </Stack>
            </Fieldset.Content>
          </Fieldset.Root>
        </form>
      </Box>
    </Box>
  );
};

export default UpdateBookForm;
