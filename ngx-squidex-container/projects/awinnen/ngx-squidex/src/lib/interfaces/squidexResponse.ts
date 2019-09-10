export interface SquidexResponse<T> {
    items: SquidexItem<T>[];
    statuses: { status: string, color: string }[];
    total: number;
    _links: SquidexItemLinks;
}

export interface SquidexItem<T> {
    id: string;
    createdBy: string;
    lastModifiedBy: string;
    data: T;
    isPending: boolean;
    created: string;
    lastModified: string;
    status: string;
    statusColor: string;
    version: number;
    _links: SquidexItemLinks;
}

export interface SquidexLink {
    href: string;
    method: string;
}
export interface SquidexItemLinks {
    self: SquidexLink;
    prev: SquidexLink;
}