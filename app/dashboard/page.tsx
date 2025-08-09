"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Plus, Grid, List } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { NoteCard } from "@/components/note-card"
import { NoteForm } from "@/components/note-form"
import { DeleteNoteDialog } from "@/components/delete-note-dialog"
import { useToast } from "@/hooks/use-toast"

interface Note {
  _id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { toast } = useToast()

  const [notes, setNotes] = useState<Note[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [editingNote, setEditingNote] = useState<Note | undefined>()
  const [deletingNote, setDeletingNote] = useState<Note | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  useEffect(() => {
    if (session) {
      fetchNotes()
    }
  }, [session])

  const fetchNotes = async () => {
    try {
      const response = await fetch("/api/notes")
      if (!response.ok) {
        throw new Error("Failed to fetch notes")
      }
      const data = await response.json()
      setNotes(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load notes",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateNote = () => {
    setEditingNote(undefined)
    setIsFormOpen(true)
  }

  const handleEditNote = (note: Note) => {
    setEditingNote(note)
    setIsFormOpen(true)
  }

  const handleDeleteNote = (note: Note) => {
    setDeletingNote(note)
    setIsDeleteDialogOpen(true)
  }

  const handleNoteSaved = (savedNote: Note) => {
    if (editingNote) {
      // Update existing note
      setNotes(notes.map((note) => (note._id === savedNote._id ? savedNote : note)))
    } else {
      // Add new note
      setNotes([savedNote, ...notes])
    }
  }

  const handleNoteDeleted = (noteId: string) => {
    setNotes(notes.filter((note) => note._id !== noteId))
  }

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Notes</h1>
            <p className="mt-2 text-gray-600">
              {notes.length} {notes.length === 1 ? "note" : "notes"}
            </p>
          </div>

          <div className="mt-4 sm:mt-0 flex items-center space-x-3">
            <div className="flex rounded-md shadow-sm">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            <Button onClick={handleCreateNote}>
              <Plus className="h-4 w-4 mr-2" />
              New Note
            </Button>
          </div>
        </div>

        {notes.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto h-24 w-24 text-gray-400">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No notes yet</h3>
            <p className="mt-2 text-gray-500">Get started by creating your first note.</p>
            <Button onClick={handleCreateNote} className="mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Create your first note
            </Button>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"
            }
          >
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} onEdit={handleEditNote} onDelete={handleDeleteNote} />
            ))}
          </div>
        )}
      </main>

      <NoteForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} note={editingNote} onSave={handleNoteSaved} />

      <DeleteNoteDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        note={deletingNote}
        onDelete={handleNoteDeleted}
      />
    </div>
  )
}
