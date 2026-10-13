
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

export function formatJsonTree(tree: TreeNode) {
    let node = tree.id;

    //* Changing from array ID to the stream's type value
    if (tree.type == "branch") {
        for (const treenode of tree.children) {
            if (treenode.type == "leaf" && treenode.label == "@type") {
                tree.label = treenode.value + " " + tree.label;
                break;
            } else {
                formatJsonTree(treenode);
            }
        }
    }

    return tree;
}

export function getAllBranchIDs(node: TreeNode): string[] {
    if (node.type === 'leaf') return [];

    const childBranchIds = node.children.flatMap(getAllBranchIDs);
    return [node.id, ...childBranchIds];
}