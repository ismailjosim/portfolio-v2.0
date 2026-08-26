export interface FlatComment {
  _id: string;
  name: string;
  content: string;
  createdAt: string;
  parentId?: string | null;
  likesCount?: number;
  likedByMe?: boolean;
}

export interface CommentNode {
  _id: string;
  name: string;
  content: string;
  createdAt: string;
  parentId: string | null;
  likesCount: number;
  likedByMe: boolean;
  replies: CommentNode[];
}

const newestFirst = (a: CommentNode, b: CommentNode) =>
  new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();

const oldestFirst = (a: CommentNode, b: CommentNode) =>
  new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();

/**
 * Turns the flat comment list from the API into a tree.
 *
 * Top-level comments read newest-first (so a new comment lands at the top, matching the
 * optimistic insert in the thread UI); replies inside a comment read oldest-first, which
 * is the natural order for following a conversation.
 *
 * A reply whose parent is missing is promoted to the top level rather than dropped. The
 * spam cascade means that shouldn't happen, but silently swallowing a comment would be
 * worse than showing it slightly out of place.
 */
export function buildCommentTree(flat: FlatComment[]): CommentNode[] {
  const nodes = new Map<string, CommentNode>();

  for (const comment of flat) {
    nodes.set(comment._id, {
      _id: comment._id,
      name: comment.name,
      content: comment.content,
      createdAt: comment.createdAt,
      parentId: comment.parentId ?? null,
      likesCount: comment.likesCount ?? 0,
      likedByMe: comment.likedByMe ?? false,
      replies: [],
    });
  }

  const roots: CommentNode[] = [];

  for (const node of nodes.values()) {
    const parent = node.parentId ? nodes.get(node.parentId) : undefined;

    if (parent) {
      parent.replies.push(node);
    } else {
      roots.push(node);
    }
  }

  for (const node of nodes.values()) {
    node.replies.sort(oldestFirst);
  }

  return roots.sort(newestFirst);
}

/** Total number of comments in a tree, replies included. */
export function countCommentNodes(nodes: CommentNode[]): number {
  return nodes.reduce((total, node) => total + 1 + countCommentNodes(node.replies), 0);
}
