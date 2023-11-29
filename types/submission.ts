export type SubmissionListProp = {
    id: number;
    user: {
        id: number;
        name: string;
        displayName?: string;
    };
    day: number;
};
