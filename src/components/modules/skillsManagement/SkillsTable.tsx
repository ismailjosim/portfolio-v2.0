'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';

import SkillFormDialog from './SkillFormDialog';
import DeleteConfirmationDialog from '../../shared/DeleteConfirmationDialog';
import ManagementTable from '../../shared/ManagementTable';

import SkillViewDetailDialog from './SkillViewDetailDialog';

import { ISkill } from '@/src/models/Skill';
import skillColumns from './skillColumns';
import { deleteSkill } from '@/src/services/skill-management';

interface SkillsTableProps {
  skills: ISkill[];
}

const SkillsTable = ({ skills }: SkillsTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const [deletingSkill, setDeletingSkill] = useState<ISkill | null>(null);
  const [viewingSkill, setViewingSkill] = useState<ISkill | null>(null);
  const [editingSkill, setEditingSkill] = useState<ISkill | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // handle functions
  // * refresh data
  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  //* view
  const handleView = (skill: ISkill) => {
    setViewingSkill(skill);
  };

  // * Edit
  const handleEdit = (skill: ISkill) => {
    setEditingSkill(skill);
  };

  // * Delete
  const handleDelete = (skill: ISkill) => {
    setDeletingSkill(skill);
  };

  const confirmDelete = async () => {
    if (!deletingSkill?._id) return;
    setIsDeleting(true);
    const result = await deleteSkill(deletingSkill._id.toString());
    setIsDeleting(false);
    if (result.success) {
      toast.success(result.message || 'Skill deleted successfully');
      setDeletingSkill(null);
      handleRefresh();
    } else {
      toast.error(result.message || 'Failed to delete skill');
    }
  };

  return (
    <>
      <ManagementTable
        data={skills}
        columns={skillColumns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getRowKey={(skill) => skill._id!.toString()}
        emptyMessage="No skills found"
      />

      {/* Edit Skill Form Dialog */}
      <SkillFormDialog
        open={!!editingSkill}
        onClose={() => setEditingSkill(null)}
        skill={editingSkill!}
        onSuccess={() => {
          setEditingSkill(null);
          handleRefresh();
        }}
      />

      {/* view skill details dialog */}
      <SkillViewDetailDialog
        open={!!viewingSkill}
        onClose={() => setViewingSkill(null)}
        skill={viewingSkill}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingSkill}
        onOpenChange={(open) => !open && setDeletingSkill(null)}
        onConfirm={confirmDelete}
        title="Delete Skill"
        description={`Are you sure you want to delete "${deletingSkill?.name}"? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default SkillsTable;
