import { getMediaFieldConfig } from "../media";

export interface Base {
    id: string;
    label: string;
    displayName: string;
    displayPath: string[];
}

export interface Branch extends Base {
    type: 'branch';
    isArray: boolean;
    childCount: number;
    children: (TreeNode | null)[];
}

export interface Leaf extends Base {
    type: 'leaf';
    value: string;
}

export type TreeNode = Leaf | Branch;

export const nodesMap = new Map<string, TreeNode>();

export function buildJsonTree(data: unknown, label = "media", path = ["root"]): TreeNode | null {
    const arraysEqual = <T,>(a: T[], b: T[]): boolean => {
        if (a.length !== b.length) return false;
        return a.every((val, index) => val === b[index]);
    };

    if (arraysEqual(path, ["root"])) {
        nodesMap.clear();
    }

    if (data === null || typeof (data) !== "object") {
        const leaf: Leaf = {
            id: path.join("."),
            label: label,
            displayName: label,
            displayPath: [],
            type: "leaf",
            value: String(data)
        }
        nodesMap.set(path.join("."), leaf);
        return leaf;
    } //* Breaking out of the recursion here for simple values

    const isArray = Array.isArray(data);
    const entries = isArray
        ? data.map((item, id) => [`[${id}]`, item] as const) //* Map array as list in string
        : Object.entries(data as Record<string, unknown>) //* Map values to nested list

    //* Making a unique ID for any specific element
    //* Because there are so many of the same keys across different fields in MediaInfo's JSON
    const children = entries.map(([key, value], id) => buildJsonTree(value, key, [...path, id.toString(), key]));

    if (children.length === 0 && !arraysEqual(path, ["root"])) {
        return null;
    }

    const branch: Branch = {
        id: path.join("."),
        label,
        displayName: label,
        displayPath: [],
        type: "branch",
        isArray,
        childCount: children.length,
        children
    }
    nodesMap.set(path.join("."), branch);
    return branch;
}

export function formatJsonTree(tree: TreeNode | null): TreeNode | null {
    const formatNode = (node: TreeNode, parentPath: string[], siblings: (TreeNode | null)[] = []): void => {
        if (node.type === "leaf") {
            const config = getMediaFieldConfig(node);
            node.displayName = config.displayName ?? node.label;
            node.displayPath = [...parentPath, node.displayName];
            return;
        }

        node.displayName = node.label;
        let streamType: string | undefined;
        let language: string | undefined;
        for (const child of node.children) {
            if (child?.type === "leaf" && child.label === "@type") {
                streamType = child.value;
            }
            if (child?.type === "leaf" && child.label === "Language_String3") {
                language = child.value;
            }
        }

        node.displayName = streamType ?? node.label;
        const duplicateStreamType = streamType && siblings.some(sibling =>
            sibling !== node && sibling?.type === "branch" && sibling.children.some(
                child => child?.type === "leaf" && child.label === "@type" && child.value === streamType
            )
        );
        if (duplicateStreamType) {
            node.displayName = `${streamType} ${node.label}`;
        }

        if (language && (streamType === "Text" || streamType === "Audio")) {
            node.displayName = `${streamType} (${language})${duplicateStreamType ? ` ${node.label}` : ""}`;
        }

        node.displayPath = [...parentPath, node.displayName];
        for (const child of node.children) {
            if (child) {
                formatNode(child, node.displayPath, node.children);
            }
        }
    };

    if (tree) {
        formatNode(tree, []);
    }

    return tree;
}

export function getAllBranchIDs(node: TreeNode | null): string[] {
    if (node) {
        if (node.type === "leaf") return [];

        const childBranchIds = node.children.flatMap(getAllBranchIDs);
        return [node.id, ...childBranchIds];
    }
    return [];
}
