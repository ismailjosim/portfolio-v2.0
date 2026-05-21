'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { Upload, Plus, X } from 'lucide-react';
import CreatableSelect from 'react-select/creatable';
import { toast } from 'sonner';

// shadcn ui
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../../ui/dialog';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form';

import { Button } from '../../ui/button';

import { uploadImage } from '@/src/services/upload.action';

import {
  createProject,
  updateProject,
  IProjectPayload,
} from '../../../services/project-management';

import { IProject } from '../../../types/project.interface';

interface ProjectFormValues {
  name: string;
  subtitle: string;
  title: string;
  type: string;

  image: string | null;
  imagePreview?: string;

  demoImages: string[];
  demoImagesPreview?: string[];

  description: string;

  technologies: { label: string; value: string }[];
  features: string;

  githubUrl: string;
  liveUrl: string;
  caseStudyUrl: string;
}

const MAX_DEMO_IMAGES = 10;

interface IProjectDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  project?: IProject;
}

// technologies
const TECHNOLOGY_OPTIONS = [
  // Frontend
  { label: 'React.js', value: 'React.js' },
  { label: 'Next.js', value: 'Next.js' },
  { label: 'TypeScript', value: 'TypeScript' },
  { label: 'Redux Toolkit', value: 'Redux Toolkit' },
  { label: 'TanStack Query', value: 'TanStack Query' },
  { label: 'React Router', value: 'React Router' },
  { label: 'React Hook Form', value: 'React Hook Form' },
  { label: 'Tailwind CSS', value: 'Tailwind CSS' },
  { label: 'Material UI', value: 'Material UI' },
  { label: 'Shadcn UI', value: 'Shadcn UI' },
  { label: 'Ant Design', value: 'Ant Design' },

  // Backend
  { label: 'Node.js', value: 'Node.js' },
  { label: 'Express.js', value: 'Express.js' },
  { label: 'REST API', value: 'REST API' },
  { label: 'JWT', value: 'JWT' },
  { label: 'OAuth', value: 'OAuth' },
  { label: 'RBAC', value: 'RBAC' },
  { label: 'Stripe', value: 'Stripe' },
  { label: 'SSLCommerz', value: 'SSLCommerz' },
  { label: 'Nodemailer', value: 'Nodemailer' },
  { label: 'Cloudinary', value: 'Cloudinary' },
  { label: 'Multer', value: 'Multer' },
  { label: 'Redis', value: 'Redis' },
  { label: 'Node-Cron', value: 'Node-Cron' },

  // Database
  { label: 'MongoDB', value: 'MongoDB' },
  { label: 'Mongoose', value: 'Mongoose' },
  { label: 'PostgreSQL', value: 'PostgreSQL' },
  { label: 'Prisma', value: 'Prisma' },

  // Tools
  { label: 'Git', value: 'Git' },
  { label: 'GitHub', value: 'GitHub' },
  { label: 'Linux', value: 'Linux' },
  { label: 'VS Code', value: 'VS Code' },
  { label: 'ESLint', value: 'ESLint' },
  { label: 'Prettier', value: 'Prettier' },
  { label: 'Firebase', value: 'Firebase' },
  { label: 'Vercel', value: 'Vercel' },
  { label: 'Netlify', value: 'Netlify' },
];

const ProjectFormDialog = ({ open, onClose, onSuccess, project }: IProjectDialogProps) => {
  const coverInputRef = useRef<HTMLInputElement>(null);
  const demoImagesInputRef = useRef<HTMLInputElement>(null);
  const coverFileRef = useRef<File | null>(null);
  const demoFilesRef = useRef<File[]>([]);

  const isEdit = !!project?.slug;

  const form = useForm<ProjectFormValues>({
    defaultValues: {
      name: '',
      subtitle: '',
      title: '',
      type: '',
      image: null,
      imagePreview: '',
      demoImages: [],
      demoImagesPreview: [],
      description: '',
      technologies: [],
      features: '',
      githubUrl: '',
      liveUrl: '',
      caseStudyUrl: '',
    },
  });

  useEffect(() => {
    if (project) {
      form.reset({
        name: project.name,
        subtitle: project.subtitle,
        title: project.title,
        type: project.type,
        image: null,
        imagePreview: project.image,
        demoImages: project.demoImages || [],
        demoImagesPreview: project.demoImages || [],
        description: project.description || '',
        technologies: project.technologies.map((item) => ({
          label: item,
          value: item,
        })),
        features: (project.features || []).join('\n'),
        githubUrl: project.githubUrl || '',
        liveUrl: project.liveUrl || '',
        caseStudyUrl: project.caseStudyUrl || '',
      });
      demoFilesRef.current = [];
    } else {
      form.reset();
      demoFilesRef.current = [];
    }
  }, [project, form]);

  const imagePreview = useWatch({
    control: form.control,
    name: 'imagePreview',
  });
  const demoImagesPreview =
    useWatch({
      control: form.control,
      name: 'demoImagesPreview',
    }) || [];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    coverFileRef.current = file;

    const localPreview = URL.createObjectURL(file);
    form.setValue('imagePreview', localPreview);
    form.setValue('image', null);
  };

  const handleDemoImagesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    const totalImages = demoImagesPreview.length + newFiles.length;

    if (totalImages > MAX_DEMO_IMAGES) {
      toast.error(`Maximum ${MAX_DEMO_IMAGES} images allowed`);
      return;
    }

    demoFilesRef.current = [...demoFilesRef.current, ...newFiles];

    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    const updatedPreviews = [...demoImagesPreview, ...newPreviews];

    form.setValue('demoImagesPreview', updatedPreviews);
  };

  const handleRemoveDemoImage = (index: number) => {
    const updatedPreviews = demoImagesPreview.filter((_, i) => i !== index);
    form.setValue('demoImagesPreview', updatedPreviews);

    // Remove from files array if it's a newly uploaded file
    if (index < demoFilesRef.current.length) {
      demoFilesRef.current = demoFilesRef.current.filter((_, i) => i !== index);
    }
  };

  const handleClose = () => {
    coverFileRef.current = null;
    demoFilesRef.current = [];
    form.reset();
    onClose();
  };

  const onSubmit = async (data: ProjectFormValues) => {
    try {
      let imageUrl = data.image;

      if (coverFileRef.current) {
        const formData = new FormData();
        formData.append('image', coverFileRef.current);

        const result = await uploadImage(formData);

        if (!result.success) {
          toast.error('Image upload failed');
          return;
        }

        imageUrl = result.url!;
      }

      // Handle demo images upload
      let demoImagesUrls: string[] = [];

      // If we're editing, keep existing URLs that weren't removed
      if (isEdit && project?.demoImages) {
        demoImagesUrls = data.demoImages || [];
      }

      // Upload new demo image files
      if (demoFilesRef.current.length > 0) {
        for (const file of demoFilesRef.current) {
          const formData = new FormData();
          formData.append('image', file);

          const result = await uploadImage(formData);

          if (!result.success) {
            toast.error(`Failed to upload image: ${file.name}`);
            return;
          }

          demoImagesUrls.push(result.url!);
        }
      }

      const payload: IProjectPayload = {
        name: data.name,
        subtitle: data.subtitle,
        title: data.title,
        type: data.type,
        image: imageUrl || '',
        demoImages: demoImagesUrls.length > 0 ? demoImagesUrls : undefined,
        description: data.description,
        technologies: data.technologies.map((item) => item.value),
        features: data.features
          .split('\n')
          .map((item) => item.trim())
          .filter(Boolean),
        githubUrl: data.githubUrl || undefined,
        liveUrl: data.liveUrl || undefined,
        caseStudyUrl: data.caseStudyUrl || undefined,
      };

      let result;

      if (isEdit && project?.slug) {
        result = await updateProject(project.slug, payload);
      } else {
        result = await createProject(payload);
      }

      if (!result.success) {
        toast.error(result.message || 'Failed to save project');
        return;
      }

      toast.success(isEdit ? 'Project updated successfully' : 'Project created successfully');

      onSuccess();
      handleClose();
    } catch {
      toast.error('Something went wrong');
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Project' : 'Create New Project'}</DialogTitle>

          <DialogDescription>Add your portfolio project details</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          {/* eslint-disable-next-line react-hooks/refs */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col flex-1 min-h-0">
            <div className="flex-1 overflow-y-auto space-y-4 px-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Project Name */}
                <FormField
                  control={form.control}
                  name="name"
                  rules={{ required: 'Project Name is Required' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="TRAVELER" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* subtitle */}
                <FormField
                  control={form.control}
                  name="subtitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subtitle</FormLabel>
                      <FormControl>
                        <Input placeholder="Tour Management" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* title */}
                <FormField
                  control={form.control}
                  name="title"
                  rules={{ required: 'Required' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Traveler — Tour Management System" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {/* type */}
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <FormControl>
                        <Input placeholder="Full Stack Web Application" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              {/* Technologies */}
              <FormItem>
                <FormLabel>Technologies</FormLabel>

                <Controller
                  control={form.control}
                  name="technologies"
                  render={({ field }) => (
                    <CreatableSelect
                      isMulti
                      unstyled
                      options={TECHNOLOGY_OPTIONS}
                      placeholder="React, Node.js..."
                      value={field.value}
                      onChange={field.onChange}
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
                    />
                  )}
                />
              </FormItem>

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea rows={4} placeholder="Short project summary..." {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Features */}
              <FormField
                control={form.control}
                name="features"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Features</FormLabel>
                    <FormControl>
                      <Textarea rows={6} placeholder="One feature per line" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* Links */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
                <FormField
                  control={form.control}
                  name="githubUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GitHub URL</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="https://github.com/your-rep-link" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {/* Todo: IF repo is more then one */}
                {/* <FormField
                  control={form.control}
                  name="githubUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GitHub URL</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="https://github.com/your-rep-link" />
                      </FormControl>
                    </FormItem>
                  )}
                /> */}

                <FormField
                  control={form.control}
                  name="liveUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Live URL</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="http://localhost:3000" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="caseStudyUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Case Study URL</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="http://localhost:3000" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-5">
              {/* Image */}
              <FormItem>
                <FormLabel>Project Image</FormLabel>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => coverInputRef.current?.click()}
                  className="w-full justify-start gap-2"
                >
                  <Upload className="h-4 w-4" />
                  Upload Image
                </Button>

                <input
                  hidden
                  type="file"
                  accept="image/*"
                  ref={coverInputRef}
                  onChange={handleImageUpload}
                />

                {imagePreview && (
                  <Image
                    src={imagePreview}
                    alt="Project preview"
                    width={600}
                    height={144}
                    unoptimized
                    className="h-36 w-full object-cover rounded-md border mt-3"
                  />
                )}
              </FormItem>
              {/* Demo Images */}
              <FormItem>
                <FormLabel>
                  Demo Images ({demoImagesPreview.length}/{MAX_DEMO_IMAGES})
                </FormLabel>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => demoImagesInputRef.current?.click()}
                  disabled={demoImagesPreview.length >= MAX_DEMO_IMAGES}
                  className="w-full justify-start gap-2"
                >
                  <Upload className="h-4 w-4" />
                  Upload Demo Images
                </Button>

                <input
                  hidden
                  type="file"
                  accept="image/*"
                  multiple
                  ref={demoImagesInputRef}
                  onChange={handleDemoImagesUpload}
                />

                {demoImagesPreview.length > 0 && (
                  <div className="grid grid-cols-3 gap-3 mt-3">
                    {demoImagesPreview.map((preview, index) => (
                      <div key={index} className="relative group">
                        <Image
                          src={preview}
                          alt={`Demo ${index + 1}`}
                          width={240}
                          height={96}
                          unoptimized
                          className="h-24 w-full object-cover rounded-md border"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveDemoImage(index)}
                          className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </FormItem>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>

              <Button type="submit">
                <Plus className="h-4 w-4 mr-2" />
                {isEdit ? 'Update Project' : 'Create Project'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectFormDialog;
