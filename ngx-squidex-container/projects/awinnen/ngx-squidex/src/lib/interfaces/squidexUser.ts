export interface SquidexUser {
    id: string;
    email: string;
    displayName: string;
    isLocked: boolean;
    permissions: any[];
}