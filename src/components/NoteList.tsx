import { useMemo, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Note, Tag } from "../App";
import NoteCard from "./NoteCard";

type NoteListProps = {
  availableTags: Tag[];
  notes: Note[];
};

function NoteList({ availableTags, notes }: NoteListProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");
  const filtredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      );
    });
  }, [title, selectedTags, notes]);
  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>Notes</h1>
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to={"/new"}>
              <Button>Create</Button>
            </Link>
            <Button variant="outline-secondary">Edit</Button>
          </Stack>
        </Col>
        <Form>
          <Row className="mb-4">
            <Col>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="tags">
                <Form.Label>Tags</Form.Label>
                <ReactSelect
                  value={selectedTags.map((t) => {
                    return {
                      label: t.label,
                      value: t.id,
                    };
                  })}
                  onChange={(tags) => {
                    setSelectedTags(
                      tags.map((t) => {
                        return { label: t.label, id: t.value };
                      })
                    );
                  }}
                  isMulti
                  options={availableTags.map((tag) => {
                    return { label: tag.label, value: tag.id };
                  })}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Row>
      <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
        {filtredNotes.map((note) => (
          <Col key={note.id}>
            <NoteCard id={note.id} title={note.title} tags={note.tags} />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default NoteList;
