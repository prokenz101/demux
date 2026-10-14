
export interface Base {
    id: string;
    label: string;
}

export interface Branch extends Base {
    type: 'branch';
    isArray: boolean;
    childCount: number;
    children: TreeNode[];
}

export interface Leaf extends Base {
    type: 'leaf';
    value: string;
}

export type TreeNode = Leaf | Branch;

export function buildJSONTree(data: unknown, label = 'media', path = 'root'): TreeNode {
export function buildJsonTree(data: unknown, label = 'media', path = 'root'): TreeNode | null {
    if (data === null || typeof (data) !== 'object') {
        // label = label.replaceAll("_", " ");
        // label = label.replaceAll(/\B([A-Z])/g, ` $1`);

        return {
            id: path,
            label,
            type: 'leaf',
            value: String(data)
        }
    } //* Breaking out of the recursion here for simple values

    const isArray = Array.isArray(data);
    const entries = isArray
        ? data.map((item, id) => [`[${id}]`, item] as const) //* Map array as list in string
        : Object.entries(data as Record<string, unknown>) //* Map values to nested list

    //* Making a unique ID for any specific element
    //* Because there are so many of the same keys across different fields in MediaInfo's JSON
    const children = entries.map(([key, value], id) => buildJSONTree(value, key, `${path}.${id}_${key}`));

    return {
        id: path,
        label,
        type: 'branch',
        isArray,
        childCount: children.length,
        children
    }
}

export function formatJsonTree(tree: TreeNode | null): TreeNode | null {
    if (tree) {
        if (tree.type == "branch") {
            //* Changing from array ID to the stream's type value
            for (const treenode of tree.children) {
                if (treenode && (treenode.type == "leaf" && treenode.label == "@type")) {
                    tree.label = treenode.value + " " + tree.label;
                }

                if (treenode && treenode.type == "leaf") {
                    const child = tree.children.find(child => child?.id === treenode.id);
                    if (child && child.type === "leaf") {
                        const config = getMediaFieldConfig(child);
                        child.label = config.displayName!;
                    }
                } else {
                    formatJsonTree(treenode);
                }
            }
        }

        return tree;
    }

    return null;
}

export function getAllBranchIDs(node: TreeNode | null): string[] {
    if (node) {
        if (node.type === 'leaf') return [];

        const childBranchIds = node.children.flatMap(getAllBranchIDs);
    }
    return [];
}

export function createTreeCopy(node: TreeNode | null): TreeNode | null {
    if (node === null) return null;

    if (node.type === 'leaf') {
        return { ...node };
    }

    return {
        ...node,
        children: node.children.map(createTreeCopy)
    };
}