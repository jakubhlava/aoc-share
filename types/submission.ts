export type SubmissionUser = {
    id: number;
    name: string;
    displayName?: string;
};

export type SubmissionListProp = {
    id: number;
    user: SubmissionUser;
    day: number;
};
