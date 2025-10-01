import { useState } from "react";

import { useNavigate } from "react-router-dom";

import NoteCard from "../../components/NoteCard/NoteCard";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import DropDown from "../../components/DropDown/DropDown";

export default function DashboardPage() {
  const navigate = useNavigate();

  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Shopping list",
      content: "Buy milk, eggs, bread",
      tags: ["shopping", "urgent"],
      createdAt: "2025-10-01T10:00:00Z",
      updatedAt: "2025-10-01T12:00:00Z",
    },
    {
      id: 2,
      title: "Morning routine",
      content: "Wake up, exercise, breakfast",
      tags: ["morning", "healthy"],
      createdAt: "2025-10-01T07:00:00Z",
      updatedAt: "2025-10-01T07:30:00Z",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newTags, setNewTags] = useState("");
  const [filterTag, setFilterTag] = useState("");

  const handleEdit = (id: number) => navigate(`/note/${id}`);
  const handleDelete = (id: number) =>
    setNotes(notes.filter((note) => note.id !== id));

  const handleAddNote = () => {
    if (!newTitle.trim() || !newContent.trim()) return;

    const newNote = {
      id: notes.length ? notes[notes.length - 1].id + 1 : 1,
      title: newTitle,
      content: newContent,
      tags: newTags.split(",").map((t) => t.trim().toLowerCase()),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setNotes([newNote, ...notes]);
    setNewTitle("");
    setNewContent("");
    setNewTags("");
    setIsModalOpen(false);
  };

  const allTags = Array.from(new Set(notes.flatMap((note) => note.tags)));

  const filteredNotes = filterTag
    ? notes.filter((note) => note.tags.includes(filterTag))
    : notes;

  return (
    <div className="bg-gray-900 w-full min-h-screen p-6 flex flex-col gap-4 relative">
      <div className="flex justify-between items-center mb-4">
        <div className="w-full flex items-center justify-center gap-7">
          <div className="w-5/12 h-10 ">
            <DropDown
              allTags={allTags}
              filterTag={filterTag}
              setFilterTag={setFilterTag}
            />
          </div>
          <div className="h-full w-5/12">
            <Button handleClick={() => setIsModalOpen(true)}>Add Note</Button>
          </div>
        </div>
      </div>

      {filteredNotes.map((note) => (
        <NoteCard
          key={note.id}
          id={note.id}
          title={note.title}
          content={note.content}
          tags={note.tags}
          createdAt={note.createdAt}
          updatedAt={note.updatedAt}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-xl w-6/12 flex flex-col gap-4 relative">
            <h2 className="text-white text-xl font-semibold">Add New Note</h2>

            <Input
              placeholder="Title"
              value={newTitle}
              change={(e) => setNewTitle(e.target.value)}
              type="text"
              id="newTitle"
            />
            <Input
              placeholder="Content"
              value={newContent}
              change={(e) => setNewContent(e.target.value)}
              type="text"
              id="newContent"
            />
            <Input
              placeholder="Tags (comma separated)"
              value={newTags}
              change={(e) => setNewTags(e.target.value)}
              type="text"
              id="newTags"
            />

            <div className="flex gap-2">
              <Button handleClick={handleAddNote}>Save</Button>
              <Button
                variation="delete"
                handleClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
