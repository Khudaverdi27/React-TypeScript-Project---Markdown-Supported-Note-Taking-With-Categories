import NoteForm, { NoteFromProps } from "./NoteForm";

function NewNote({ onSubmit }: NoteFromProps) {
  return (
    <>
      <h1 className="mb-4">New Note</h1>
      <NoteForm onSubmit={onSubmit} />
    </>
  );
}

export default NewNote;
