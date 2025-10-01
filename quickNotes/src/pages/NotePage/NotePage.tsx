import { useState, useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";

import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

export default function NotePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const mockNote = {
      title: "Example Note",
      content: "This is a note content",
      tags: "work,important",
    };

    setTitle(mockNote.title);
    setContent(mockNote.content);
    setTags(mockNote.tags);
  }, [id]);

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      setError("Title and content cannot be empty");
      return;
    }

    console.log("Saving note:", { id, title, content, tags });

    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-900 p-6">
      <div className="flex flex-col gap-4 bg-gray-800 p-6 rounded-xl w-6/12">
        <h1 className="text-white text-xl font-semibold">Edit Note</h1>

        <Input
          placeholder="Title"
          value={title}
          change={(e) => setTitle(e.target.value)}
          type="text"
          id={""}
        />

        <textarea
          className="bg-gray-700 text-white p-2 rounded-md"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
        />

        <Input
          placeholder="Tags (comma separated)"
          value={tags}
          change={(e) => setTags(e.target.value)}
          type="text"
          id={""}
        />

        {error && <span className="text-red-500 text-sm">{error}</span>}

        <div className="flex gap-2">
          <Button handleClick={handleSave}>Save</Button>
          <Button handleClick={() => navigate("/dashboard")} variation="delete">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
