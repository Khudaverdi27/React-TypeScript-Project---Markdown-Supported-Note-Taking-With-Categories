import { FormEvent, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelectCreatable from "react-select/creatable";
import { NoteData, Tag } from "../App";

export type NoteFromProps = {
  onSubmit: (data: NoteData) => void;
};

function NoteForm({ onSubmit }: NoteFromProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: [],
    });
    console.log(selectedTags);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <ReactSelectCreatable
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
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="markdown">
          <Form.Label>Body</Form.Label>
          <Form.Control ref={markdownRef} required as={"textarea"} rows={15} />
        </Form.Group>
      </Stack>
      <Stack direction="horizontal" gap={2} className="justify-content-end">
        <Button type="submit">Save</Button>
        <Link to={".."}>
          <Button type="button" variant="outline-secondary">
            Cancel
          </Button>
        </Link>
      </Stack>
    </Form>
  );
}

export default NoteForm;
