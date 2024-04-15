import { Badge, Card, Stack } from "react-bootstrap";
import { Tag } from "../App";
import { Link } from "react-router-dom";
import styles from "../NoteLists.module.css";

type NoteCardProps = {
  id: string;
  title: string;
  tags: Tag[];
};
function NoteCard({ id, title, tags }: NoteCardProps) {
  return (
    <Card
      className={`h-100 text-reset text-decoration-none ${styles.card}`}
      as={Link}
      to={`${id}`}
    >
      <Card.Body>
        <Stack
          gap={2}
          className="align-items-center justify-content-center h-100"
        >
          <span className="fs-5">{title}</span>
          {tags.length > 0 && (
            <Stack
              direction="horizontal"
              gap={1}
              className="flex-wrap align-items-center justify-content-center"
            >
              {tags.map((tag) => (
                <Badge className="text-truncate" key={tag.id}>
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card>
  );
}

export default NoteCard;
