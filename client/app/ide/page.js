"use client";

import { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import { useRouter, useSearchParams } from "next/navigation";

const socket = io("http://localhost:4000");

export default function IDE() {
  const editorRef = useRef(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [roomId, setRoomId] = useState("");
  const [userCount, setUserCount] = useState(1);

  useEffect(() => {
    let id = searchParams.get("room");
    if (!id) {
      id = uuidv4();
      router.replace(`/?room=${id}`);
    }
    setRoomId(id);
    socket.emit("join-room", id);

    socket.on("load-code", (code) => {
      if (editorRef.current) {
        editorRef.current.setValue(code);
      }
    });

    socket.on("code-change", (newCode) => {
      if (editorRef.current && newCode !== editorRef.current.getValue()) {
        editorRef.current.setValue(newCode);
      }
    });

    socket.on("user-count", (count) => {
      setUserCount(count);
    });

    return () => socket.disconnect();
  }, []);

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;

    editor.onDidChangeModelContent(() => {
      const code = editor.getValue();
      socket.emit("code-change", { roomId, code });
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Room link copied to clipboard!");
  };

  return (
    <div className="flex flex-col justify-start items-center pt-10 h-screen">
      <div className="w-full max-w-5xl p-4 border">
        <div className="flex justify-between mb-2">
          <button
            onClick={handleShare}
            className="bg-blue-600 text-white px-3 py-2 rounded"
          >
            Share Room
          </button>
          <div>{userCount} user{userCount > 1 ? 's' : ''} online</div>
        </div>
        <Editor
          height="80vh"
          width="100%"
          defaultLanguage="javascript"
          theme="vs-dark"
          defaultValue='console.log("Hello!");'
          onMount={handleEditorDidMount}
        />
      </div>
    </div>
  );
}