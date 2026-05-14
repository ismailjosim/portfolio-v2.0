'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';

import AddProjectModal from './ProjectFormDialog';
import DeleteConfirmationDialog from '../../shared/DeleteConfirmationDialog';
import ManagementTable from '../../shared/ManagementTable';

import ProjectViewDetailDialog from './ProjectViewDetailDialog';

import { IProject } from '@/src/types/project.interface';
import projectColumns from './projectColumns';
import { deleteProject } from '@/src/services/project-management';

interface ProjectsTableProps {
  projects: IProject[];
}

const ProjectsTable = ({ projects }: ProjectsTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const [deletingProject, setDeletingProject] = useState<IProject | null>(null);
  const [viewingProject, setViewingProject] = useState<IProject | null>(null);
  const [editingProject, setEditingProject] = useState<IProject | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // handle functions
  // * refresh data
  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  //* view
  const handleView = (Project: IProject) => {
    setViewingProject(Project);
  };

  // * Edit
  const handleEdit = (Project: IProject) => {
    setEditingProject(Project);
  };

  // * Delete
  const handleDelete = (Project: IProject) => {
    setDeletingProject(Project);
  };

  const confirmDelete = async () => {
    if (!deletingProject) return;
    setIsDeleting(true);
    const result = await deleteProject(deletingProject.slug as string);
    setIsDeleting(false);
    if (result.success) {
      toast.success(result.message || 'Project deleted successfully');
      setDeletingProject(null);
      handleRefresh();
    } else {
      toast.error(result.message || 'Failed to delete Project');
    }
  };

  return (
    <>
      <ManagementTable
        data={projects}
        columns={projectColumns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getRowKey={(Project) => Project._id!}
        emptyMessage="No Projects found"
      />

      {/* Edit Project Form Dialog */}
      <AddProjectModal
        open={!!editingProject}
        onClose={() => setEditingProject(null)}
        project={editingProject!}
        onSuccess={() => {
          setEditingProject(null);
          handleRefresh();
        }}
      />

      {/* view Project details dialog */}
      <ProjectViewDetailDialog
        open={!!viewingProject}
        onClose={() => setViewingProject(null)}
        project={viewingProject}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingProject}
        onOpenChange={(open) => !open && setDeletingProject(null)}
        onConfirm={confirmDelete}
        title="Delete Project"
        description={`Are you sure you want to delete "${deletingProject?.title}"? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default ProjectsTable;
