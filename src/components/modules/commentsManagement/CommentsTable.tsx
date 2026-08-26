'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { Ban, RotateCcw } from 'lucide-react';
import type { AdminComment } from '../../../services/comment-admin';
import type { CommentStatus } from '../../../models/BlogComment';
import DeleteConfirmationDialog from '../../shared/DeleteConfirmationDialog';
import ManagementTable from '../../shared/ManagementTable';
import { DropdownMenuItem } from '../../ui/dropdown-menu';
import { commentColumns } from './commentColumns';

interface CommentsTableProps {
  comments: AdminComment[];
}

interface PendingAction {
  comment: AdminComment;
  status: CommentStatus;
}

const CommentsTable = ({ comments }: CommentsTableProps) => {
  const router = useRouter();
  const [isRefreshing, startTransition] = useTransition();

  const [pending, setPending] = useState<PendingAction | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const confirmStatusChange = async () => {
    if (!pending) return;

    setIsSaving(true);
    try {
      // Relative URL on purpose: the moderation route is guarded by the httpOnly
      // `dashboard_session` cookie, which the browser only attaches same-origin.
      const res = await fetch(`/api/comments/${pending.comment._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: pending.status }),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        toast.error(result.error || `Failed to update comment (HTTP ${res.status})`);
        return;
      }

      // A 200 with nothing modified means the write was silently dropped — that is what a
      // stale Mongoose schema does, and it must not look like success.
      if (result.modifiedCount === 0) {
        toast.error('Nothing was saved. Restart the dev server and try again.');
        return;
      }

      const replies = result.replyCount as number;
      const noun = replies === 1 ? 'reply' : 'replies';
      const scope = replies > 0 ? ` and ${replies} ${noun}` : '';

      toast.success(
        pending.status === 'spam'
          ? `Comment${scope} hidden from the blog`
          : `Comment${scope} restored`
      );

      setPending(null);
      handleRefresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update comment');
    } finally {
      setIsSaving(false);
    }
  };

  const isSpam = pending?.status === 'spam';

  return (
    <>
      <ManagementTable
        data={comments}
        columns={commentColumns}
        getRowKey={(comment) => comment._id}
        emptyMessage="No comments found"
        isRefreshing={isRefreshing}
        // A spam row stays in the table but reads as struck off: line through every cell,
        // dimmed, tinted. Visible at a glance without opening the action menu.
        rowClassName={(comment) =>
          comment.status === 'spam'
            ? 'bg-destructive/5 text-muted-foreground line-through decoration-destructive/60'
            : undefined
        }
        extraActions={(comment) =>
          comment.status === 'visible' ? (
            <DropdownMenuItem
              onClick={() => setPending({ comment, status: 'spam' })}
              className="text-destructive"
            >
              <Ban className="mr-2 h-4 w-4" />
              Mark as spam
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={() => setPending({ comment, status: 'visible' })}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Restore
            </DropdownMenuItem>
          )
        }
      />

      <DeleteConfirmationDialog
        open={!!pending}
        onOpenChange={(open) => !open && setPending(null)}
        onConfirm={confirmStatusChange}
        title={isSpam ? 'Mark comment as spam' : 'Restore comment'}
        description={
          isSpam
            ? `"${pending?.comment.name ?? ''}" and every reply beneath it will be hidden from the blog. Nothing is deleted — you can restore it at any time.`
            : `"${pending?.comment.name ?? ''}" and every reply beneath it will appear on the blog again.`
        }
        confirmLabel={isSpam ? 'Mark as spam' : 'Restore'}
        pendingLabel={isSpam ? 'Hiding...' : 'Restoring...'}
        destructive={isSpam}
        isDeleting={isSaving}
      />
    </>
  );
};

export default CommentsTable;
