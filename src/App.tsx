import { Container } from "react-bootstrap";
import { Navigate, Route, Routes } from "react-router-dom";
import NewNote from "./components/NewNote";
import useLocaleStorage from "./hooks/useLocaleStorage";
import { useMemo } from "react";
import { v4 as uuidv4 } from "uuid";

export type RawNote = {
  id: string;
} & RawNoteData;
export type Tag = {
  id: string;
  label: string;
};

export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
};
export type RawNoteData = {
  title: string;
  markdown: string;
  tagIds: string[];
};

export type Note = {
  id: string;
} & NoteData;

function App() {
  const [notes, setNotes] = useLocaleStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocaleStorage<Tag[]>("TAGS", []);

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return { ...note, tags: tags.filter((t) => note.tagIds.includes(t.id)) };
    });
  }, [notes, tags]);

  const onCreateNoteData = ({ tags, ...data }: NoteData) => {
    setNotes((prevNotes) => {
      return [
        ...prevNotes,
        { ...data, id: uuidv4(), tagIds: tags.map((tagId) => tagId.id) },
      ];
    });
  };
  return (
    <Container>
      <Routes>
        <Route path="/" element={<h1>home</h1>} />
        <Route path="/new" element={<NewNote onSubmit={onCreateNoteData} />} />
        <Route path="/:id">
          <Route index element={<h1>show</h1>} />
          <Route path="/:id/edit" element={<h1>edit</h1>} />
        </Route>
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </Container>
  );
}

export default App;
