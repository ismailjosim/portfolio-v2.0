"use client"

import { useState } from "react"
import BlogTable, { blogData as initialBlogs, Blog } from "../../../components/modules/blog/blog-table"
import { SectionHeader } from "../../../components/section-header"
import { Button } from "../../../components/ui/button"
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter,
    SheetClose,
} from "../../../components/ui/sheet"
import { Label } from "../../../components/ui/label"
import { Input } from "../../../components/ui/input"
import { Textarea } from "../../../components/ui/textarea"

const BlogPage = () => {
    const [blogs, setBlogs] = useState<Blog[]>(initialBlogs)
    const [sheetOpen, setSheetOpen] = useState(false)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [image, setImage] = useState("")

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault()
        const newBlog: Blog = {
            id: Date.now().toString(),
            image: image || "/placeholder.png",
            title,
            author: "You",
            publishedAt: new Date().toLocaleDateString(),
            status: "Draft",
        }
        setBlogs((prev) => [newBlog, ...prev])
        setTitle("")
        setContent("")
        setImage("")
        setSheetOpen(false)
    }

    return (
        <div className="w-11/12 mx-auto">
            <SectionHeader
                title="All Blogs"
                buttonLabel="Add New Blog"
                onAdd={() => setSheetOpen(true)}
            />
            <BlogTable data={blogs} />

            {/* sheet modal */}
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>New Blog</SheetTitle>
                        <SheetDescription>Write your post using markdown</SheetDescription>
                    </SheetHeader>
                    <form onSubmit={handleAdd} className="space-y-4 p-4">
                        <div className="space-y-1">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="content">Content</Label>
                            <Textarea
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Markdown here..."
                                required
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="image">Image URL</Label>
                            <Input
                                id="image"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            />
                        </div>
                        <SheetFooter>
                            <Button type="submit">Save</Button>
                        </SheetFooter>
                    </form>
                    <SheetClose asChild>
                        <Button variant="ghost" className="absolute top-4 right-4">
                            Close
                        </Button>
                    </SheetClose>
                </SheetContent>
            </Sheet>
        </div >
    )
}

export default BlogPage;
