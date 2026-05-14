'use client';
import { Plus } from 'lucide-react';
import ManagementPageHeader from '../../shared/ManagementPageHeader';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import ProjectFormDialog from './ProjectFormDialog';

const ProjectManagementHeader = () => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  //force remount to reset state of form
  const [dialogKey, setDialogKey] = useState(0);

  const handleOpenDialog = () => {
    setDialogKey((prev) => prev + 1);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleSuccess = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <>
      <ProjectFormDialog
        key={dialogKey}
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onSuccess={handleSuccess}
      />

      <ManagementPageHeader
        title="All Projects"
        description="Manage All Projects"
        action={{
          label: 'Add Project',
          icon: Plus,
          onClick: handleOpenDialog,
        }}
      />
    </>
  );
};

export default ProjectManagementHeader;
