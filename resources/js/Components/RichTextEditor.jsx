import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";

const ToolbarButton = ({ active, onClick, title, children }) => (
    <button
        type="button"
        title={title}
        onClick={onClick}
        className={`btn btn-sm ${
            active ? "btn-primary" : "btn-light"
        }`}
    >
        {children}
    </button>
);

export default function RichTextEditor({
    value,
    onChange,
    error,
    placeholder = "Write your article content...",
}) {
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit,
            Underline,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    target: "_blank",
                    rel: "noopener noreferrer",
                },
            }),
            Image.configure({
                inline: false,
                allowBase64: false,
            }),
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            Placeholder.configure({
                placeholder,
            }),
        ],
        content: value || "",
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: "rich-editor-content",
            },
        },
    });

    if (!editor) {
        return (
            <div className="border rounded p-4 text-muted">
                Loading editor...
            </div>
        );
    }

    const addLink = () => {
        const previousUrl = editor.getAttributes("link").href || "";
        const url = window.prompt("Enter the link URL", previousUrl);

        if (url === null) return;

        if (url.trim() === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();
            return;
        }

        editor.chain().focus().extendMarkRange("link").setLink({
            href: url,
        }).run();
    };

    const addImage = () => {
        const url = window.prompt("Enter the image URL");

        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    return (
        <div className={`rich-editor border rounded ${error ? "border-danger" : ""}`}>
            <div className="d-flex flex-wrap gap-1 p-2 border-bottom bg-light">
                <ToolbarButton
                    title="Bold"
                    active={editor.isActive("bold")}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                >
                    <i className="bi bi-type-bold" />
                </ToolbarButton>

                <ToolbarButton
                    title="Italic"
                    active={editor.isActive("italic")}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                    <i className="bi bi-type-italic" />
                </ToolbarButton>

                <ToolbarButton
                    title="Underline"
                    active={editor.isActive("underline")}
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                >
                    <i className="bi bi-type-underline" />
                </ToolbarButton>

                <ToolbarButton
                    title="Strike"
                    active={editor.isActive("strike")}
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                >
                    <i className="bi bi-type-strikethrough" />
                </ToolbarButton>

                <span className="border-start mx-1" />

                <ToolbarButton
                    title="Heading 1"
                    active={editor.isActive("heading", { level: 1 })}
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 1 }).run()
                    }
                >
                    H1
                </ToolbarButton>

                <ToolbarButton
                    title="Heading 2"
                    active={editor.isActive("heading", { level: 2 })}
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 2 }).run()
                    }
                >
                    H2
                </ToolbarButton>

                <ToolbarButton
                    title="Heading 3"
                    active={editor.isActive("heading", { level: 3 })}
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 3 }).run()
                    }
                >
                    H3
                </ToolbarButton>

                <ToolbarButton
                    title="Paragraph"
                    active={editor.isActive("paragraph")}
                    onClick={() =>
                        editor.chain().focus().setParagraph().run()
                    }
                >
                    <i className="bi bi-paragraph" />
                </ToolbarButton>

                <span className="border-start mx-1" />

                <ToolbarButton
                    title="Bullet list"
                    active={editor.isActive("bulletList")}
                    onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                >
                    <i className="bi bi-list-ul" />
                </ToolbarButton>

                <ToolbarButton
                    title="Numbered list"
                    active={editor.isActive("orderedList")}
                    onClick={() =>
                        editor.chain().focus().toggleOrderedList().run()
                    }
                >
                    <i className="bi bi-list-ol" />
                </ToolbarButton>

                <ToolbarButton
                    title="Blockquote"
                    active={editor.isActive("blockquote")}
                    onClick={() =>
                        editor.chain().focus().toggleBlockquote().run()
                    }
                >
                    <i className="bi bi-quote" />
                </ToolbarButton>

                <span className="border-start mx-1" />

                <ToolbarButton
                    title="Align left"
                    active={editor.isActive({ textAlign: "left" })}
                    onClick={() =>
                        editor.chain().focus().setTextAlign("left").run()
                    }
                >
                    <i className="bi bi-text-left" />
                </ToolbarButton>

                <ToolbarButton
                    title="Align center"
                    active={editor.isActive({ textAlign: "center" })}
                    onClick={() =>
                        editor.chain().focus().setTextAlign("center").run()
                    }
                >
                    <i className="bi bi-text-center" />
                </ToolbarButton>

                <ToolbarButton
                    title="Align right"
                    active={editor.isActive({ textAlign: "right" })}
                    onClick={() =>
                        editor.chain().focus().setTextAlign("right").run()
                    }
                >
                    <i className="bi bi-text-right" />
                </ToolbarButton>

                <span className="border-start mx-1" />

                <ToolbarButton
                    title="Insert link"
                    active={editor.isActive("link")}
                    onClick={addLink}
                >
                    <i className="bi bi-link-45deg" />
                </ToolbarButton>

                <ToolbarButton
                    title="Insert image by URL"
                    active={editor.isActive("image")}
                    onClick={addImage}
                >
                    <i className="bi bi-image" />
                </ToolbarButton>

                <span className="border-start mx-1" />

                <ToolbarButton
                    title="Undo"
                    onClick={() => editor.chain().focus().undo().run()}
                >
                    <i className="bi bi-arrow-counterclockwise" />
                </ToolbarButton>

                <ToolbarButton
                    title="Redo"
                    onClick={() => editor.chain().focus().redo().run()}
                >
                    <i className="bi bi-arrow-clockwise" />
                </ToolbarButton>
            </div>

            <EditorContent editor={editor} />

            <div className="border-top px-3 py-2 d-flex justify-content-between text-muted small">
                <span>Rich text editor</span>
                <span>
                    {editor.storage.characterCount?.characters?.() ?? ""}
                </span>
            </div>

            {error && (
                <div className="text-danger small px-3 pb-2">{error}</div>
            )}

            <style>{`
                .rich-editor-content {
                    min-height: 380px;
                    padding: 20px;
                    outline: none;
                    line-height: 1.75;
                }

                .rich-editor-content p {
                    margin-bottom: 1rem;
                }

                .rich-editor-content h1,
                .rich-editor-content h2,
                .rich-editor-content h3 {
                    margin-top: 1.25rem;
                    margin-bottom: .75rem;
                    font-weight: 700;
                }

                .rich-editor-content ul,
                .rich-editor-content ol {
                    padding-left: 1.5rem;
                    margin-bottom: 1rem;
                }

                .rich-editor-content blockquote {
                    border-left: 4px solid #6c757d;
                    padding: .5rem 1rem;
                    margin: 1rem 0;
                    color: #6c757d;
                    background: #f8f9fa;
                }

                .rich-editor-content img {
                    max-width: 100%;
                    height: auto;
                    border-radius: .5rem;
                }

                .rich-editor-content a {
                    color: #0d6efd;
                    text-decoration: underline;
                }

                .rich-editor-content p.is-editor-empty:first-child::before {
                    content: attr(data-placeholder);
                    float: left;
                    color: #adb5bd;
                    pointer-events: none;
                    height: 0;
                }
            `}</style>
        </div>
    );
}