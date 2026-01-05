import { Box, Stack, Input, Textarea, Button, Heading, Text } from "@chakra-ui/react";
import { Field, Fieldset } from "@chakra-ui/react";
import { useMutation } from "@apollo/client/react";
import { CREATE_BOOKS } from "../queries/mutation";
import { useState } from "react";
import { GET_BOOKS } from "../queries/queries";
 import { useNavigate } from "react-router-dom";
 import toast from "react-hot-toast";
type Book = {
  title: string;
  description: string;
};

const CreateBookForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
 

    const navigate = useNavigate();
      // Apollo mutation
  const [createBook, { loading, error }] = useMutation<{ createBook: Book }>(CREATE_BOOKS, {
    refetchQueries: [{ query: GET_BOOKS }],
     awaitRefetchQueries: true,
    onCompleted: (data) => {
      console.log("Book created:", data.createBook);
      setTitle("");
      setDescription("");
      toast.success("Book created successfully!");
      navigate("/books");
    },
    onError: (err) => {
      console.error("Error creating book:", err);
       toast.error(err.message || "Failed to create book");
    },
  });

  function createBookHandler(event: React.FormEvent) {
    event.preventDefault();
    createBook({ variables: { title, description } });
  }

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
            Create Book
          </Heading>
          <Text fontSize="sm" color="gray.200">
            Add a new book to your collection
          </Text>
        </Box>

        {/* Form */}
        <form onSubmit={createBookHandler}>
          <Fieldset.Root size="lg">
            <Fieldset.Content>
              <Stack >
                <Field.Root>
                  <Field.Label color="white">Title</Field.Label>
                  <Input
                    name="title"
                    placeholder="Enter book title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    borderColor="white"
                    color="white"
                    _placeholder={{ color: "gray.300" }}
                    _hover={{ borderColor: "blue.400" }}
                    _focus={{ borderColor: "blue.400", boxShadow: "0 0 0 1px #63B3ED" }}
                    bg="transparent"
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label color="white">Description</Field.Label>
                  <Field.HelperText color="gray.300">
                    Short summary of the book
                  </Field.HelperText>
                  <Textarea
                    name="description"
                    placeholder="Write a brief description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    resize="vertical"
                    borderColor="white"
                    color="white"
                    _placeholder={{ color: "gray.300" }}
                    _hover={{ borderColor: "blue.400" }}
                    _focus={{ borderColor: "blue.400", boxShadow: "0 0 0 1px #63B3ED" }}
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
                  Create Book
                </Button>

                {error && <Text color="red.400">Failed to create book: {error.message}</Text>}
              </Stack>
            </Fieldset.Content>
          </Fieldset.Root>
        </form>
      </Box>
    </Box>
  );
};

export default CreateBookForm;
