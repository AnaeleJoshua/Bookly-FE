import LogoutButton from "@/components/Auth/LogoutButton";
import { Table , Flex} from "@chakra-ui/react"
import DeleteBookBtn from "../DeleteBookBtn";
import CreateBookBtn from "../CreateBookBtn";
import UpdateBookBtn from "../UpdateBookBtn";
import { useQuery } from "@apollo/client/react"
import { GET_BOOKS } from "../../queries/queries";

type Book = {
  id: number;
  title: string;
  description: string;
};



function AllBooksPage() {
  const { data, loading, error } = useQuery<{ books: Book[] }>(GET_BOOKS);

  if (loading) return <div>Loading books...</div>;
  if (error) return <div>Error loading books: {error.message}</div>;

  return (
    <div>
      <Flex width="100%" justify="flex-end" alignItems="center"><CreateBookBtn /></Flex>
    <Table.Root size="sm">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>ID</Table.ColumnHeader>
          <Table.ColumnHeader>Title</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="end">Description</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="end"></Table.ColumnHeader>
                    <Table.ColumnHeader textAlign="end"></Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data?.books.map((item: Book) => (
          <Table.Row key={item.id}>
            <Table.Cell>{item.id}</Table.Cell>
            <Table.Cell>{item.title}</Table.Cell>
            <Table.Cell textAlign="end">{item.description}</Table.Cell>
            <Table.Cell textAlign="end"><DeleteBookBtn id={item.id} /></Table.Cell>
            <Table.Cell textAlign="end"><UpdateBookBtn id={item.id} /></Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
    <LogoutButton />
    </div>
    );
}

export default AllBooksPage;