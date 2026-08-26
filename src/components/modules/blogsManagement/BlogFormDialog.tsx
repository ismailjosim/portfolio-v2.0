'use client';
import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { useForm, Controller, useWatch } from 'react-hook-form';
import MDEditor from '@uiw/react-md-editor';
import { FileUp, Loader2, Upload } from 'lucide-react';
import { useTheme } from 'next-themes';

// shadcn ui
import { Input } from '../../ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../../ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form';
import {
  Select as SelectElement,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
import { Button } from '../../ui/button';
import CreatableSelect from 'react-select/creatable';
import { toast } from 'sonner';
import { BlogStatus, IBlog, IBlogTag } from '../../../types/blog.interface';
import { createBlog, updateBlog, IBlogPayload } from '../../../services/blog-management';
import { uploadImage } from '@/src/services/upload.action';
import { blogCategories, blogTags as TAG_OPTIONS_ARRAY } from '../../../constants/blogTaxonomy';

// ─── Constants ─────────────────────────────────────────────

const CATEGORIES = Array.from(blogCategories);
const CATEGORY_OPTIONS = CATEGORIES.map((c) => ({ value: c, label: c }));

const TAG_OPTIONS = Array.from(TAG_OPTIONS_ARRAY).map((tag) => ({
  value: tag,
  label: tag,
}));

export const BLOG_STATUS_OPTIONS = [
  { value: 'draft', label: 'Draft' },
  { value: 'review', label: 'In Review' },
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'published', label: 'Published' },
  { value: 'archived', label: 'Archived' },
];
// ─── Types ─────────────────────────────────────────────────

interface BlogFormValues {
  title: string;
  category: string;
  content: string;
  tags: IBlogTag[];
  coverImage: string | null;
  coverImagePreview?: string;
  status: BlogStatus;
  summary?: string;
  scheduledPublishDate?: string;
}

interface IBlogDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  blog?: IBlog;
}

// ─── Component ─────────────────────────────────────────────

const BlogFormDialog = ({ open, onClose, onSuccess, blog }: IBlogDialogProps) => {
  const coverInputRef = useRef<HTMLInputElement>(null);
  const mdFileInputRef = useRef<HTMLInputElement>(null);
  const coverFileRef = useRef<File | null>(null);

  const isEdit = !!blog?.slug;

  const { theme } = useTheme();

  const form = useForm<BlogFormValues>({
    defaultValues: {
      title: '',
      category: '',
      coverImage: null,
      coverImagePreview: '',
      tags: [],
      content: '',
      status: 'draft',
      summary: '',
      scheduledPublishDate: '',
    },
  });

  // Populate form when blog prop changes (edit mode)
  useEffect(() => {
    if (blog) {
      form.reset({
        title: blog.title,
        category: blog.category,
        coverImage: null,
        coverImagePreview: blog.coverImage ?? '',
        tags: (blog.tags || []).map((tag) =>
          typeof tag === 'string' ? { value: tag, label: tag } : tag
        ),
        content: blog.content,
        status: (blog.status as BlogStatus) || 'draft',
        summary: blog.summary ?? '',
        scheduledPublishDate: blog.scheduledPublishDate
          ? new Date(blog.scheduledPublishDate).toISOString().slice(0, 16)
          : '',
      });
    } else {
      form.reset({
        title: '',
        category: '',
        coverImage: null,
        coverImagePreview: '',
        tags: [],
        content: '',
        status: 'draft',
        summary: '',
        scheduledPublishDate: '',
      });
    }
  }, [blog, form]);

  const coverPreview = useWatch({
    control: form.control,
    name: 'coverImagePreview',
  });

  const status = useWatch({
    control: form.control,
    name: 'status',
  });

  // ─── Handlers ──────────────────────────────────────────

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;

    // Store the file for later upload on submit
    coverFileRef.current = file;

    // Show local preview immediately
    const localPreview = URL.createObjectURL(file);
    form.setValue('coverImagePreview', localPreview);
    // Clear the coverImage so it won't use old URL
    form.setValue('coverImage', null);
  };

  const handleMdUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.name.endsWith('.md')) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      if (typeof ev.target?.result === 'string') {
        form.setValue('content', ev.target.result);
      }
    };
    reader.readAsText(file);
  };

  const handleClose = () => {
    if (form.formState.isSubmitting) return;
    coverFileRef.current = null;
    form.reset();
    onClose();
  };

  const onSubmit = async (data: BlogFormValues) => {
    try {
      let coverImageUrl = data.coverImage;

      // Upload cover image if a new file was selected
      if (coverFileRef.current) {
        const formData = new FormData();
        formData.append('image', coverFileRef.current);

        const result = await uploadImage(formData);

        if (!result.success) {
          toast.error('Image upload failed');
          return;
        }

        coverImageUrl = result.url!;
        // Update preview with the Cloudinary URL
        form.setValue('coverImagePreview', coverImageUrl);
      }

      const payload: IBlogPayload = {
        title: data.title,
        category: data.category,
        content: data.content,
        tags: data.tags.map((item) => item.value),
        coverImage: coverImageUrl || undefined,
        status: data.status,
        summary: data.summary || undefined,
        scheduledPublishDate:
          data.status === 'scheduled' && data.scheduledPublishDate
            ? new Date(data.scheduledPublishDate)
            : undefined,
      };

      let result;
      if (isEdit && blog?.slug) {
        result = await updateBlog(blog.slug, payload);
      } else {
        result = await createBlog(payload);
      }

      if (!result.success) {
        toast.error(result.message || 'Failed to save blog');
        return;
      }

      toast.success(isEdit ? 'Blog updated successfully' : 'Blog created successfully');

      // Reset the file ref after successful upload
      coverFileRef.current = null;

      onSuccess();
      handleClose();
    } catch (error) {
      console.error('AddBlogModal submit', error);
      toast.error('Something went wrong while saving blog');
    }
  };

  // ─── UI ────────────────────────────────────────────────

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-none! w-11/12 md:w-4/5 max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>{isEdit ? 'Edit Blog Post' : 'Create New Blog Post'}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Update your blog post content below.'
              : 'Write your content with markdown support.'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          {/* handleSubmit is wired up inside the event handler, not during render, so the
              ref reads in onSubmit stay outside the render phase. */}
          <form
            onSubmit={(event) => void form.handleSubmit(onSubmit)(event)}
            className="flex flex-col flex-1 min-h-0"
          >
            <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                rules={{ required: 'Title is required' }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="My awesome blog post" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Summary */}
              <FormField
                control={form.control}
                name="summary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Summary (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Brief description of your blog post (max 500 characters)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Category + Tags */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                {/* Category */}
                {/* Category */}
                <FormItem className="w-full">
                  <FormLabel>Category</FormLabel>
                  <Controller
                    control={form.control}
                    name="category"
                    rules={{ required: 'Category is required' }}
                    render={({ field }) => (
                      <CreatableSelect
                        isClearable
                        unstyled
                        options={CATEGORY_OPTIONS}
                        value={field.value ? { value: field.value, label: field.value } : null}
                        onChange={(selected) => field.onChange(selected ? selected.value : '')}
                        classNames={{
                          control: ({ isFocused }) =>
                            `rounded-lg border px-2 py-1 bg-secondary transition-colors ${
                              isFocused ? 'border-blue-500' : 'border-input hover:border-blue-500'
                            }`,
                          menu: () =>
                            'mt-1 rounded-lg border border-secondary bg-secondary shadow-lg z-50',
                          menuList: () => 'py-1',
                          option: ({ isFocused, isSelected }) =>
                            `px-3 py-2 cursor-pointer text-secondary-foreground transition-colors ${
                              isSelected
                                ? 'bg-blue-600 text-white'
                                : isFocused
                                  ? 'bg-accent text-accent-foreground'
                                  : 'bg-transparent'
                            }`,
                          placeholder: () => 'text-muted-foreground',
                          input: () => 'text-secondary-foreground',
                          singleValue: () => 'text-secondary-foreground text-sm',
                          indicatorsContainer: () => 'text-muted-foreground',
                          clearIndicator: ({ isFocused }) =>
                            `p-1 rounded transition-colors ${isFocused ? 'text-foreground' : ''}`,
                          dropdownIndicator: ({ isFocused }) =>
                            `p-1 transition-colors ${isFocused ? 'text-foreground' : ''}`,
                        }}
                        placeholder="Select or create category"
                      />
                    )}
                  />
                  {form.formState.errors.category && (
                    <p className="text-[0.8rem] font-medium text-destructive">
                      {form.formState.errors.category.message}
                    </p>
                  )}
                </FormItem>
                {/* status */}
                <FormField
                  control={form.control}
                  name="status"
                  rules={{ required: 'Status is required' }}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Status</FormLabel>
                      <SelectElement onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent className="bg-secondary">
                          {BLOG_STATUS_OPTIONS.map((s) => (
                            <SelectItem key={s.value} value={s.value}>
                              {s.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </SelectElement>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Tags */}
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <Controller
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <CreatableSelect
                        isClearable
                        isMulti
                        unstyled
                        options={TAG_OPTIONS}
                        classNames={{
                          control: ({ isFocused }) =>
                            `rounded-lg border px-2 py-1 bg-secondary transition-colors ${
                              isFocused ? 'border-blue-500' : 'border-input hover:border-blue-500'
                            }`,
                          menu: () =>
                            'mt-1 rounded-lg border border-secondary bg-secondary shadow-lg',
                          menuList: () => 'py-1',
                          option: ({ isFocused, isSelected }) =>
                            `px-3 py-2 cursor-pointer text-secondary-foreground transition-colors ${
                              isSelected
                                ? 'bg-blue-600 text-white'
                                : isFocused
                                  ? 'bg-accent text-accent-foreground'
                                  : 'bg-transparent'
                            }`,
                          multiValue: () =>
                            'inline-flex items-center gap-1 bg-primary/10 border border-primary/30 rounded-sm mx-1 px-2 py-0.5',
                          multiValueLabel: () => 'text-foreground text-sm font-medium leading-none',
                          multiValueRemove: ({ isFocused }) =>
                            `ml-0.5 rounded transition-all duration-150 text-muted-foreground hover:bg-destructive hover:text-white ${
                              isFocused ? 'bg-destructive text-white' : ''
                            }`,
                          placeholder: () => 'text-muted-foreground',
                          input: () => 'text-secondary-foreground',
                          indicatorsContainer: () => 'text-muted-foreground',
                          clearIndicator: ({ isFocused }) =>
                            `p-1 rounded transition-colors ${isFocused ? 'text-foreground' : ''}`,
                          dropdownIndicator: ({ isFocused }) =>
                            `p-1 transition-colors ${isFocused ? 'text-foreground' : ''}`,
                        }}
                        {...field}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </FormItem>
              </div>

              {/* Scheduled Date */}
              {status === 'scheduled' && (
                <FormField
                  control={form.control}
                  name="scheduledPublishDate"
                  rules={{ required: 'Scheduled date and time is required' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Scheduled Publish Date & Time</FormLabel>
                      <FormControl>
                        <Input type="datetime-local" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Cover Image */}
              <FormItem className="w-full grid grid-cols-2 justify-between items-center">
                <div>
                  <FormLabel>Cover Image</FormLabel>
                  <FormControl>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full justify-start gap-2 mt-3"
                      onClick={() => coverInputRef.current?.click()}
                      disabled={form.formState.isSubmitting}
                    >
                      <Upload className="h-4 w-4" />
                      {coverPreview ? 'Change Cover Image' : 'Upload Cover Image'}
                    </Button>
                  </FormControl>
                </div>

                <div>
                  {coverPreview && (
                    <Image
                      src={coverPreview}
                      alt="Cover preview"
                      width={400}
                      height={96}
                      unoptimized
                      className="h-24 w-full rounded-sm object-cover border"
                    />
                  )}
                  <input
                    ref={coverInputRef}
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleCoverUpload}
                  />
                </div>
              </FormItem>

              {/* Markdown Upload */}
              <div>
                <div className="flex w-full justify-end">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
                    onClick={() => mdFileInputRef.current?.click()}
                    disabled={form.formState.isSubmitting}
                  >
                    <span>Upload .md</span>
                    <FileUp className="h-4 w-4" />
                  </Button>
                </div>
                <input
                  ref={mdFileInputRef}
                  type="file"
                  hidden
                  accept=".md"
                  onChange={handleMdUpload}
                />
              </div>

              {/* Content */}
              <FormField
                control={form.control}
                name="content"
                rules={{ required: 'Content is required' }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <div data-color-mode={theme === 'dark' ? 'dark' : 'light'}>
                        <MDEditor {...field} height={300} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Form Actions */}
            <div className="w-full flex justify-end gap-2 px-6 mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={form.formState.isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                {form.formState.isSubmitting
                  ? isEdit
                    ? 'Updating...'
                    : 'Publishing...'
                  : isEdit
                    ? 'Update Post'
                    : 'Publish Post'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BlogFormDialog;
